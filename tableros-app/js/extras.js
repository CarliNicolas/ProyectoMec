// Funciones tomadas de lo que hacen los programas de tableros existentes:
// lista de corte, placa mínima necesaria, tiras de carteles a escala real, ocupación y costo.
// Todo en mm, sin pantalla.
import { geometria, evaluar, acomodar, compDe, fmt } from './layout.js';
import { agregarItem } from './plantillas.js';

export const MODULO = 18; // ancho comercial de un módulo de riel DIN

/** Cuántos módulos de 18 mm entran en un espacio libre. */
export const modulosLibres = (mm) => Math.max(0, Math.floor((mm + 0.05) / MODULO));

// ---------------------------------------------------------------------------
// Ocupación general del tablero
// ---------------------------------------------------------------------------
export function ocupacion(ev) {
  const capacidad = ev.rieles.reduce((s, r) => s + r.largo, 0);
  const ocupado = ev.rieles.reduce((s, r) => s + Math.min(r.ocupado, r.largo), 0);
  const libre = Math.max(0, capacidad - ocupado);
  return {
    capacidad, ocupado, libre,
    porcentaje: capacidad > 0 ? (ocupado / capacidad) * 100 : 0,
    reserva: capacidad > 0 ? (libre / capacidad) * 100 : 0,
    modulos: ev.rieles.reduce((s, r) => s + modulosLibres(Math.max(0, r.libre)), 0),
  };
}

// ---------------------------------------------------------------------------
// Lista de corte de riel DIN y cablecanal, con aprovechamiento de barras
// ---------------------------------------------------------------------------
function enBarras(piezas, largoBarra) {
  // "First fit decreasing": las piezas más largas primero, cada una en la primera barra donde entra.
  const barras = [];
  [...piezas].sort((a, b) => b.largo - a.largo).forEach((p) => {
    if (p.largo > largoBarra) { barras.push({ usado: p.largo, piezas: [p], excede: true }); return; }
    let b = barras.find((x) => !x.excede && x.usado + p.largo <= largoBarra + 0.05);
    if (!b) { b = { usado: 0, piezas: [] }; barras.push(b); }
    b.piezas.push(p);
    b.usado += p.largo;
  });
  return barras.map((b) => ({ ...b, sobrante: Math.max(0, largoBarra - b.usado) }));
}

function agrupar(piezas) {
  const m = new Map();
  piezas.forEach((p) => {
    const k = `${Math.round(p.largo * 10)}`;
    const g = m.get(k) || { largo: p.largo, cantidad: 0, donde: [] };
    g.cantidad += 1;
    g.donde.push(p.donde);
    m.set(k, g);
  });
  return [...m.values()].sort((a, b) => b.largo - a.largo);
}

/**
 * Cortes de riel y de cablecanal para armar la placa.
 * cantidad = cuántos tableros iguales se van a armar (para cortar toda la serie junta).
 */
export function listaDeCorte(t, { largoBarra = 2000, cantidad = null } = {}) {
  const geo = geometria(t);
  const veces = Math.max(1, Math.round(cantidad ?? t.cantidad ?? 1));
  const riel = [];
  const canal = [];
  for (let k = 0; k < veces; k += 1) {
    geo.rieles.forEach((r) => { if (r.largo > 0) riel.push({ largo: r.largo, donde: `Riel ${r.indice + 1} · ${r.nombre}` }); });
    // tramos verticales contiguos del mismo lado se cortan como una sola pieza
    const lados = new Map();
    geo.canales.forEach((c) => {
      if (c.tipo === 'h') { canal.push({ largo: c.w, donde: `Horizontal ${c.fila + 1}` }); return; }
      const lado = c.x < t.placa.ancho / 2 ? 'izquierdo' : 'derecho';
      const lista = lados.get(lado) || [];
      lista.push(c);
      lados.set(lado, lista);
    });
    lados.forEach((lista, lado) => {
      lista.sort((a, b) => a.y - b.y);
      let ini = null;
      let fin = null;
      const cerrar = () => { if (ini != null) canal.push({ largo: fin - ini, donde: `Vertical ${lado}` }); };
      lista.forEach((c) => {
        // dos tramos seguidos están separados solo por el canal horizontal: van en una pieza
        if (ini != null && c.y - fin <= geo.c + 0.5) { fin = c.y + c.h; return; }
        cerrar();
        ini = c.y;
        fin = c.y + c.h;
      });
      cerrar();
    });
  }
  const total = (ps) => ps.reduce((s, p) => s + p.largo, 0);
  return {
    cantidad: veces, largoBarra,
    riel: { piezas: agrupar(riel), total: total(riel), barras: enBarras(riel, largoBarra) },
    canal: { piezas: agrupar(canal), total: total(canal), barras: enBarras(canal, largoBarra) },
  };
}

// ---------------------------------------------------------------------------
// Placa mínima: el ancho y el alto más chicos donde entra todo, con la reserva pedida
// ---------------------------------------------------------------------------
function entraCon(t, cat, ancho, modo, reserva) {
  const p = JSON.parse(JSON.stringify(t));
  p.placa.ancho = ancho;
  // los largos manuales dejan de valer: se recalculan con el ancho que se prueba
  p.rieles.forEach((r) => { r.largo = null; delete r.x0; });
  acomodar(p, cat, modo);
  const ev = evaluar(p, cat);
  if (ev.sinUbicar.length) return false;
  return ev.rieles.every((r) => r.libre >= -0.05 && (!r.items.length || r.libre >= r.largo * (reserva / 100) - 0.05));
}

/**
 * Calcula la placa más chica para los componentes y la cantidad de rieles del tablero.
 * reserva = porcentaje de cada riel que tiene que quedar libre (los programas de fabricantes usan 20 a 30 %).
 */
export function placaMinima(t, cat, { modo = 'equilibrado', reserva = 0, redondeo = 10 } = {}) {
  const n = t.rieles.length;
  if (!n) return null;
  const comps = Object.values(t.items).map((it) => compDe(cat, it.comp));
  if (!comps.length) return null;
  const fijo = 2 * (t.margen + t.canal.ancho);
  const masAncho = Math.max(...comps.map((c) => c.ancho));
  let bajo = fijo + masAncho;
  let alto = fijo + comps.reduce((s, c) => s + c.ancho, 0) * (1 + reserva / 100) + masAncho + 50;
  if (!entraCon(t, cat, alto, modo, reserva)) {
    // caso raro: se agranda hasta que entre
    let tope = alto;
    for (let i = 0; i < 6 && !entraCon(t, cat, tope, modo, reserva); i += 1) tope *= 1.5;
    alto = tope;
  }
  for (let i = 0; i < 24 && alto - bajo > 0.5; i += 1) {
    const medio = (bajo + alto) / 2;
    if (entraCon(t, cat, medio, modo, reserva)) alto = medio; else bajo = medio;
  }
  const arriba = (v) => Math.ceil((v - 0.01) / redondeo) * redondeo;
  const anchoMin = arriba(alto);
  // alto: cada fila necesita el aparato más alto más la distancia mínima al cablecanal de cada lado
  const masAlto = Math.max(...comps.map((c) => c.alto));
  const canalesH = n + (t.canalAbajo ? 1 : 0);
  const altoMin = arriba(2 * t.margen + canalesH * t.canal.ancho + n * (masAlto + 2 * t.holguraCanal));
  return {
    ancho: anchoMin, alto: altoMin, reserva, rieles: n,
    anchoActual: t.placa.ancho, altoActual: t.placa.alto,
    sobraAncho: t.placa.ancho - anchoMin, sobraAlto: t.placa.alto - altoMin,
    texto: `Con ${n} ${n === 1 ? 'riel' : 'rieles'}${reserva ? ` y ${fmt(reserva)} % libre en cada uno` : ''}, la placa más chica es de ${fmt(anchoMin)} × ${fmt(altoMin)} mm.`,
  };
}

// ---------------------------------------------------------------------------
// Tiras de carteles: una por riel, cada cartel con el ancho exacto de su aparato
// ---------------------------------------------------------------------------
export function tirasDeCarteles(ev) {
  return ev.rieles.map((r) => ({
    riel: r.indice + 1,
    nombre: r.nombre,
    largo: Math.max(r.largo, r.ocupado),
    carteles: r.items.map((e) => ({
      x: e.x, ancho: e.ancho,
      texto: (e.it && e.it.etiqueta) || '',
      detalle: e.comp.nombre,
      grupo: e.comp.grupo,
    })),
  })).filter((tira) => tira.carteles.length);
}

// ---------------------------------------------------------------------------
// Costo de materiales (si los componentes tienen precio cargado)
// ---------------------------------------------------------------------------
export function costo(t, cat) {
  let total = 0;
  let sinPrecio = 0;
  let conPrecio = 0;
  Object.values(t.items).forEach((it) => {
    const c = compDe(cat, it.comp);
    if (c.hueco) return;
    const p = Number(c.precio);
    if (Number.isFinite(p) && p > 0) { total += p; conPrecio += 1; } else sinPrecio += 1;
  });
  const veces = Math.max(1, Math.round(t.cantidad || 1));
  return { total, sinPrecio, conPrecio, cantidad: veces, totalSerie: total * veces };
}

// ---------------------------------------------------------------------------
// Agregar una unidad más a un tablero hecho con la preselección "enfriador"
// ---------------------------------------------------------------------------
export function puedeAgregarUnidad(t) {
  return !!(t.preseleccion && t.preseleccion.id === 'enfriador' && t.preseleccion.unidades >= 1);
}

export function agregarUnidad(t) {
  if (!puedeAgregarUnidad(t)) return null;
  const n = t.preseleccion.unidades + 1;
  const nuevos = [
    agregarItem(t, 'gv2me08', `SOP${n}`),
    agregarItem(t, 'pln6-c10', `BOMBA ${n}`),
    agregarItem(t, 'jieli-c2', `DREN. ${n}`),
    agregarItem(t, 'logo-230rce', `PLC ${n}`),
    agregarItem(t, 'tvps1-40c', `BOM${n}`),
    agregarItem(t, 'ag-cn3r', `NIVEL ${n}`),
    agregarItem(t, 'rxm-zocalo', `DREN. ${n}`),
    agregarItem(t, 'lc1e0910', `SOP${n}`),
    agregarItem(t, 'lc1e0910', `BOM${n}`),
    agregarItem(t, 'bornes-unidad', `UNIDAD ${n}`),
  ];
  t.preseleccion.unidades = n;
  t.nombre = t.nombre.replace(/·\s*\d+\s+unidad(es)?/i, `· ${n} unidades`);
  return { unidad: n, ids: nuevos.map((x) => x.id) };
}

// ---------------------------------------------------------------------------
// Renumerar etiquetas en orden de lectura (riel por riel, de izquierda a derecha)
// ---------------------------------------------------------------------------
export function renumerar(t) {
  const orden = [];
  t.rieles.forEach((r) => r.items.forEach((id) => orden.push(id)));
  t.sinUbicar.forEach((id) => orden.push(id));
  const contadores = new Map();
  let cambios = 0;
  orden.forEach((id) => {
    const it = t.items[id];
    const m = /^(.*?)(\d+)$/.exec(it.etiqueta || '');
    if (!m) return;
    const clave = `${it.comp}|${m[1]}`;
    const n = (contadores.get(clave) || 0) + 1;
    contadores.set(clave, n);
    const nueva = `${m[1]}${n}`;
    if (nueva !== it.etiqueta) { it.etiqueta = nueva; cambios += 1; }
  });
  return cambios;
}

// ---------------------------------------------------------------------------
// Placa necesaria probando con un riel menos, los mismos y uno más
// ---------------------------------------------------------------------------
export function conRieles(t, k) {
  const p = JSON.parse(JSON.stringify(t));
  const n = p.rieles.length;
  if (k === n) return p;
  const dedicado = !p.canalAbajo && n > 1;
  if (k > n) {
    for (let i = n; i < k; i += 1) {
      const r = { id: `r${Date.now().toString(36)}${i}${Math.floor(Math.random() * 1e6).toString(36)}`, nombre: `Riel ${i + 1}`, largo: null, items: [] };
      if (dedicado) p.rieles.splice(p.rieles.length - 1, 0, r); else p.rieles.push(r);
    }
  } else {
    while (p.rieles.length > Math.max(1, k)) {
      const idx = dedicado && p.rieles.length > 1 ? p.rieles.length - 2 : p.rieles.length - 1;
      const [fuera] = p.rieles.splice(idx, 1);
      p.sinUbicar.push(...fuera.items);
    }
  }
  return p;
}

export function placasPorRieles(t, cat, { modo = 'equilibrado', reserva = 0 } = {}) {
  const n = t.rieles.length;
  const res = [];
  [n - 1, n, n + 1].filter((k) => k >= 1).forEach((k) => {
    const pm = placaMinima(conRieles(t, k), cat, { modo, reserva });
    if (pm) res.push({ ...pm, actual: k === n });
  });
  return res;
}

// ---------------------------------------------------------------------------
// Texto del pedido de materiales, agrupado por marca, para mandar por WhatsApp o mail
// ---------------------------------------------------------------------------
export function textoPedido(t, cat) {
  const veces = Math.max(1, Math.round(t.cantidad || 1));
  const porMarca = new Map();
  Object.values(t.items).forEach((it) => {
    const c = compDe(cat, it.comp);
    if (c.hueco) return;
    const marca = c.marca || 'Sin marca';
    const m = porMarca.get(marca) || new Map();
    const f = m.get(c.id) || { comp: c, cantidad: 0 };
    f.cantidad += veces;
    m.set(c.id, f);
    porMarca.set(marca, m);
  });
  const lineas = [`Pedido de materiales · ${t.nombre}${veces > 1 ? ` · ${veces} tableros` : ''}`, ''];
  [...porMarca.keys()].sort().forEach((marca) => {
    lineas.push(`${marca}:`);
    [...porMarca.get(marca).values()].sort((a, b) => a.comp.nombre.localeCompare(b.comp.nombre)).forEach((f) => {
      lineas.push(`  ${f.cantidad} × ${f.comp.nombre}${f.comp.ref ? ` (${f.comp.ref})` : ''}`);
    });
    lineas.push('');
  });
  return lineas.join('\n').trim();
}
