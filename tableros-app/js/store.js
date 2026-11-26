// Estado de la app: tableros guardados en este dispositivo, catálogo propio, deshacer y compartir.
import { CATALOGO_BASE } from './catalogo.js';
import { generarDesdePreseleccion, clonarTablero, nuevoId } from './plantillas.js';
import { acomodar } from './layout.js';

const CLAVE = 'tablerosMEC.v1';
const MAX_HISTORIA = 60;

const oyentes = new Set();
let guardarPendiente = null;

export const estado = {
  tableros: {},
  orden: [],
  actual: null,
  catalogo: {}, // componentes propios y correcciones a los del catálogo base
  preselecciones: [], // tableros guardados como modelo: { id, nombre, tablero }
  ajustes: { modo: 'equilibrado', vista: '3d', bienvenida: true },
};

const historia = { pasado: [], futuro: [] };

export function alCambiar(fn) { oyentes.add(fn); return () => oyentes.delete(fn); }
function avisar(motivo) { oyentes.forEach((fn) => fn(motivo)); }

// ------------------------------- catálogo -------------------------------
let catCache = null;
export function catalogo() {
  if (!catCache) {
    catCache = {};
    CATALOGO_BASE.forEach((c) => { catCache[c.id] = c; });
    Object.values(estado.catalogo).forEach((c) => { catCache[c.id] = { ...(catCache[c.id] || {}), ...c }; });
  }
  return catCache;
}
export function listaCatalogo() { return Object.values(catalogo()); }
export function guardarComponente(comp) {
  const id = comp.id || nuevoId('c');
  estado.catalogo[id] = { ...comp, id };
  catCache = null;
  guardar();
  avisar('catalogo');
  return id;
}
export function esComponenteBase(id) { return CATALOGO_BASE.some((c) => c.id === id); }
export function restaurarComponente(id) {
  delete estado.catalogo[id];
  catCache = null;
  guardar();
  avisar('catalogo');
}

// ------------------------------- tableros -------------------------------
export function tablero() { return estado.tableros[estado.actual] || null; }
export function listaTableros() { return estado.orden.map((id) => estado.tableros[id]).filter(Boolean); }

export function agregarTablero(t, seleccionar = true) {
  estado.tableros[t.id] = t;
  estado.orden.unshift(t.id);
  if (seleccionar) seleccionarTablero(t.id);
  else { guardar(); avisar('tableros'); }
  return t;
}

export function seleccionarTablero(id) {
  if (!estado.tableros[id]) return;
  estado.actual = id;
  historia.pasado = [];
  historia.futuro = [];
  guardar();
  avisar('tablero');
}

export function borrarTablero(id) {
  delete estado.tableros[id];
  estado.orden = estado.orden.filter((x) => x !== id);
  if (estado.actual === id) {
    estado.actual = estado.orden[0] || null;
    historia.pasado = [];
    historia.futuro = [];
  }
  guardar();
  avisar('tablero');
}

export function crearDesdePreseleccion(id, params) {
  const t = generarDesdePreseleccion(id, params);
  acomodar(t, catalogo(), estado.ajustes.modo);
  return agregarTablero(t);
}

export function duplicarTablero(id, nombre) {
  const o = estado.tableros[id];
  if (!o) return null;
  return agregarTablero(clonarTablero(o, nombre));
}

/** Aplica un cambio al tablero actual. Guarda el estado anterior para poder deshacer. */
export function cambiar(fn, { deshacer = true, motivo = 'tablero' } = {}) {
  const t = tablero();
  if (!t) return;
  const antes = JSON.stringify(t);
  fn(t);
  const despues = JSON.stringify(t);
  if (antes === despues) return;
  if (deshacer) {
    historia.pasado.push(antes);
    if (historia.pasado.length > MAX_HISTORIA) historia.pasado.shift();
    historia.futuro = [];
  }
  guardar();
  avisar(motivo);
}

export function puedeDeshacer() { return historia.pasado.length > 0; }
export function puedeRehacer() { return historia.futuro.length > 0; }
export function deshacer() {
  const t = tablero();
  if (!t || !historia.pasado.length) return;
  historia.futuro.push(JSON.stringify(t));
  estado.tableros[t.id] = JSON.parse(historia.pasado.pop());
  guardar();
  avisar('tablero');
}
export function rehacer() {
  const t = tablero();
  if (!t || !historia.futuro.length) return;
  historia.pasado.push(JSON.stringify(t));
  estado.tableros[t.id] = JSON.parse(historia.futuro.pop());
  guardar();
  avisar('tablero');
}

// --------------------------- preselecciones propias ---------------------------
export function guardarComoPreseleccion(nombre) {
  const t = tablero();
  if (!t) return;
  estado.preselecciones.unshift({ id: nuevoId('p'), nombre, tablero: JSON.parse(JSON.stringify(t)) });
  guardar();
  avisar('preselecciones');
}
export function borrarPreseleccion(id) {
  estado.preselecciones = estado.preselecciones.filter((p) => p.id !== id);
  guardar();
  avisar('preselecciones');
}
export function crearDesdePropia(id, nombre) {
  const p = estado.preselecciones.find((x) => x.id === id);
  if (!p) return null;
  return agregarTablero(clonarTablero(p.tablero, nombre || p.nombre));
}

// ------------------------------- guardado -------------------------------
export function guardar() {
  clearTimeout(guardarPendiente);
  guardarPendiente = setTimeout(guardarYa, 250);
}
export function guardarYa() {
  clearTimeout(guardarPendiente);
  try {
    localStorage.setItem(CLAVE, JSON.stringify({ ...estado, v: 1 }));
    return true;
  } catch (e) {
    console.warn('No se pudo guardar', e);
    avisar('error-guardado');
    return false;
  }
}

export function cargar() {
  let datos = null;
  try { datos = JSON.parse(localStorage.getItem(CLAVE) || 'null'); } catch (e) { datos = null; }
  if (datos && datos.tableros) {
    estado.tableros = datos.tableros;
    estado.orden = (datos.orden || Object.keys(datos.tableros)).filter((id) => datos.tableros[id]);
    estado.actual = datos.tableros[datos.actual] ? datos.actual : estado.orden[0] || null;
    estado.catalogo = datos.catalogo || {};
    estado.preselecciones = datos.preselecciones || [];
    estado.ajustes = { ...estado.ajustes, ...(datos.ajustes || {}) };
    catCache = null;
  }
  if (!estado.actual) {
    // Primera vez: arranca con el tablero de 5 unidades ya acomodado, como ejemplo para tocar.
    const t = generarDesdePreseleccion('enfriador', { unidades: 5 });
    acomodar(t, catalogo(), 'equilibrado');
    estado.tableros[t.id] = t;
    estado.orden = [t.id];
    estado.actual = t.id;
    guardarYa();
  }
}

// ------------------------------- fotos propias (IndexedDB) -------------------------------
const fotos = new Map(); // clave -> dataURL
let bd = null;
function abrirBD() {
  if (bd) return bd;
  bd = new Promise((ok, mal) => {
    if (!('indexedDB' in globalThis)) { mal(new Error('sin IndexedDB')); return; }
    const req = indexedDB.open('tablerosMEC', 1);
    req.onupgradeneeded = () => req.result.createObjectStore('fotos');
    req.onsuccess = () => ok(req.result);
    req.onerror = () => mal(req.error);
  });
  return bd;
}
async function tx(modo, fn) {
  const db = await abrirBD();
  return new Promise((ok, mal) => {
    const t = db.transaction('fotos', modo);
    const r = fn(t.objectStore('fotos'));
    t.oncomplete = () => ok(r && r.result);
    t.onerror = () => mal(t.error);
  });
}
export async function guardarFoto(dataURL) {
  const clave = `idb:${nuevoId('f')}`;
  fotos.set(clave, dataURL);
  try { await tx('readwrite', (s) => s.put(dataURL, clave)); } catch (e) { console.warn('Foto solo en memoria', e); }
  return clave;
}
export async function borrarFoto(clave) {
  if (!clave || !clave.startsWith('idb:')) return;
  fotos.delete(clave);
  try { await tx('readwrite', (s) => s.delete(clave)); } catch (e) { /* nada */ }
}
/** Devuelve la dirección para mostrar una foto ya cargada ('' si todavía no está en memoria). */
export function urlFoto(ref) {
  if (!ref) return '';
  if (ref.startsWith('idb:')) return fotos.get(ref) || '';
  return ref;
}
export async function precargarFotos() {
  const claves = new Set();
  Object.values(estado.tableros).forEach((t) => { if (t.foto && t.foto.startsWith('idb:')) claves.add(t.foto); });
  Object.values(estado.catalogo).forEach((c) => { if (c.foto && c.foto.startsWith('idb:')) claves.add(c.foto); });
  let nuevas = 0;
  for (const k of claves) {
    if (fotos.has(k)) continue;
    try {
      const v = await tx('readonly', (s) => s.get(k));
      if (v) { fotos.set(k, v); nuevas += 1; }
    } catch (e) { /* nada */ }
  }
  if (nuevas) avisar('fotos');
}

/** Achica una imagen elegida por el usuario y la devuelve como dataURL JPEG. */
export function achicarImagen(archivo, lado = 1400, calidad = 0.8) {
  return new Promise((ok, mal) => {
    const url = URL.createObjectURL(archivo);
    const img = new Image();
    img.onload = () => {
      const k = Math.min(1, lado / Math.max(img.naturalWidth, img.naturalHeight));
      const c = document.createElement('canvas');
      c.width = Math.max(1, Math.round(img.naturalWidth * k));
      c.height = Math.max(1, Math.round(img.naturalHeight * k));
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      ok(c.toDataURL('image/jpeg', calidad));
    };
    img.onerror = () => { URL.revokeObjectURL(url); mal(new Error('No se pudo leer la imagen')); };
    img.src = url;
  });
}

// ------------------------------- compartir por enlace o archivo -------------------------------
const aB64 = (bytes) => {
  let s = '';
  bytes.forEach((b) => { s += String.fromCharCode(b); });
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};
const deB64 = (txt) => {
  const s = atob(txt.replace(/-/g, '+').replace(/_/g, '/'));
  const out = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i += 1) out[i] = s.charCodeAt(i);
  return out;
};
async function pasar(bytes, Clase) {
  const flujo = new Blob([bytes]).stream().pipeThrough(new Clase('deflate-raw'));
  return new Uint8Array(await new Response(flujo).arrayBuffer());
}

/** Paquete para compartir: el tablero y los componentes propios que usa. Las fotos propias no viajan. */
export function paquete(t) {
  const copia = JSON.parse(JSON.stringify(t));
  if (copia.foto && copia.foto.startsWith('idb:')) copia.foto = null;
  const usados = new Set(Object.values(copia.items).map((i) => i.comp));
  const comps = Object.values(estado.catalogo).filter((c) => usados.has(c.id)).map((c) => ({ ...c, foto: c.foto && c.foto.startsWith('idb:') ? undefined : c.foto }));
  return { app: 'tableros-mec', v: 1, tablero: copia, componentes: comps };
}

export async function enlaceDe(t) {
  const bytes = new TextEncoder().encode(JSON.stringify(paquete(t)));
  let hash;
  if ('CompressionStream' in globalThis) hash = `z=${aB64(await pasar(bytes, CompressionStream))}`;
  else hash = `j=${aB64(bytes)}`;
  return `${location.origin}${location.pathname}#${hash}`;
}

export async function leerEnlace(hash) {
  const h = (hash || '').replace(/^#/, '');
  if (!h.startsWith('z=') && !h.startsWith('j=')) return null;
  let bytes = deB64(h.slice(2));
  if (h.startsWith('z=')) bytes = await pasar(bytes, DecompressionStream);
  return JSON.parse(new TextDecoder().decode(bytes));
}

// Lo que llega por enlace o archivo no es de confianza: se copia campo por campo y se descarta lo raro.
const texto = (v, max = 80) => String(v ?? '').replace(/[\u0000-\u001f]/g, ' ').slice(0, max);
const numero = (v, def, min = 0, max = 100000) => { const n = Number(v); return Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : def; };
const fotoSegura = (v) => (typeof v === 'string' && /^img\/[a-z0-9/_-]+\.(jpg|png|webp)$/i.test(v) && !v.includes('..') ? v : undefined);
const colorSeguro = (v) => (typeof v === 'string' && /^#[0-9a-f]{6}$/i.test(v) ? v : '#dddddd');
const idSeguro = (v) => (typeof v === 'string' && /^[\w.-]{1,60}$/.test(v) ? v : null);

function sanearComponente(c) {
  const id = idSeguro(c && c.id);
  if (!id) return null;
  return {
    id, nombre: texto(c.nombre) || 'Componente', marca: texto(c.marca, 40), ref: texto(c.ref, 60),
    ancho: numero(c.ancho, 18, 1, 2000), alto: numero(c.alto, 85, 1, 2000), prof: numero(c.prof, 70, 1, 2000),
    grupo: texto(c.grupo, 20) || 'otros', color: colorSeguro(c.color), medida: c.medida === 'catalogo' ? 'catalogo' : c.medida === 'medida' ? 'medida' : 'estimada',
    foto: fotoSegura(c.foto),
  };
}

function sanearTablero(o) {
  if (!o || !Array.isArray(o.rieles) || typeof o.items !== 'object' || !o.items) throw new Error('El archivo no es un tablero de esta app.');
  const items = {};
  Object.values(o.items).slice(0, 3000).forEach((it) => {
    const id = idSeguro(it && it.id);
    const comp = idSeguro(it && it.comp);
    if (id && comp) items[id] = { id, comp, etiqueta: texto(it.etiqueta, 24), sep: numero(it.sep, 0, 0, 5000) };
  });
  const usados = new Set();
  const lista = (arr) => (Array.isArray(arr) ? arr : []).filter((id) => items[id] && !usados.has(id) && usados.add(id));
  const rieles = o.rieles.slice(0, 40).map((r, i) => {
    const riel = { id: idSeguro(r && r.id) || nuevoId('r'), nombre: texto(r && r.nombre, 40) || `Riel ${i + 1}`, largo: r && r.largo != null ? numero(r.largo, null, 0, 20000) : null, items: lista(r && r.items) };
    if (r && r.x0 != null) riel.x0 = numero(r.x0, 0, 0, 20000);
    return riel;
  });
  const sinUbicar = lista(o.sinUbicar);
  Object.keys(items).forEach((id) => { if (!usados.has(id)) sinUbicar.push(id); });
  const placa = o.placa || {};
  const canal = o.canal || {};
  return {
    id: nuevoId('t'), version: 1, nombre: texto(o.nombre, 80) || 'Tablero',
    placa: { ancho: numero(placa.ancho, 600, 50, 20000), alto: numero(placa.alto, 600, 50, 20000) },
    canal: { ancho: numero(canal.ancho, 40, 0, 500), alto: numero(canal.alto, 60, 0, 500) },
    margen: numero(o.margen, 10, 0, 500), umbralJusto: numero(o.umbralJusto, 18, 0, 1000), holguraCanal: numero(o.holguraCanal, 10, 0, 500),
    profUtil: numero(o.profUtil, 0, 0, 5000), canalAbajo: o.canalAbajo !== false, rieles, items, sinUbicar,
    foto: fotoSegura(o.foto) || null, fotoPropia: false, preseleccion: null, medidasEstimadas: !!o.medidasEstimadas, notas: texto(o.notas, 2000),
  };
}

/** Incorpora un paquete recibido (por enlace o archivo) como tablero nuevo. */
export function importarPaquete(p) {
  if (!p || p.app !== 'tableros-mec' || !p.tablero) throw new Error('El archivo no es un tablero de esta app.');
  const t = sanearTablero(p.tablero);
  (Array.isArray(p.componentes) ? p.componentes : []).slice(0, 500).forEach((c) => {
    const limpio = sanearComponente(c);
    // nunca pisa un componente que ya existe en este dispositivo
    if (limpio && !catalogo()[limpio.id]) estado.catalogo[limpio.id] = limpio;
  });
  catCache = null;
  return agregarTablero(t);
}
