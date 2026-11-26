// Tableros MEC: pantalla principal. Une el estado, el plano 2D, la vista 3D y los diálogos.
import * as S from './store.js';
import { evaluar, acomodar, MODOS, fmt, colocarItem, quitarItem, ubicacionDe, listaMateriales, materialesCSV, compDe, geometria } from './layout.js';
import { PRESELECCIONES, agregarItem, agregarRiel } from './plantillas.js';
import { GRUPOS } from './catalogo.js';
import { crearVista2D } from './vista2d.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const num = (v, def = 0) => { const n = parseFloat(String(v).replace(',', '.')); return Number.isFinite(n) ? n : def; };
const plural = (n, uno, muchos) => `${n} ${n === 1 ? uno : muchos}`;
const ancha = () => window.matchMedia('(min-width: 1000px)').matches;

const ui = { vista: '2d', sel: null, zoom: 1, ev: null, v3d: null, v3dCargando: false, instalar: null, hojaAbierta: false };
const dlg = $('#dlg');
const svg = $('#plano');

const vista2d = crearVista2D(svg, {
  alSeleccionar: (id) => seleccionar(id),
  alSoltar: (id, riel, indice) => {
    S.cambiar((t) => colocarItem(t, id, riel, indice));
    ui.sel = id;
    render();
  },
  esBandeja: (x, y) => {
    const b = $('#bandeja');
    if (b.hidden) return false;
    const r = b.getBoundingClientRect();
    return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  },
});

// ---------------------------------------------------------------------------
// Pintado
// ---------------------------------------------------------------------------
function miniatura(comp, clase = '') {
  const u = S.urlFoto(comp.foto);
  return u ? `<img ${clase ? `class="${clase}"` : ''} src="${esc(u)}" alt="" loading="lazy">` : `<span class="cuad ${clase}" style="background:${esc(comp.color || '#ddd')}"></span>`;
}

function render() {
  const t = S.tablero();
  if (!t) return;
  if (ui.sel && !t.items[ui.sel]) ui.sel = null;
  ui.ev = evaluar(t, S.catalogo());
  pintarBarra(t);
  pintarResumen(t);
  vista2d.dibujar(t, ui.ev, ui.sel);
  ajustarZoom();
  pintarBandeja(t);
  pintarRieles(t);
  pintarDerecha(t);
  pintarHoja(t);
  pintarImpresion(t);
}

function pintarBarra(t) {
  $('#nombre').textContent = t.nombre;
  const n = Object.keys(t.items).length;
  $('#sub').textContent = `${fmt(t.placa.ancho)} × ${fmt(t.placa.alto)} mm · ${plural(t.rieles.length, 'riel', 'rieles')} · ${plural(n, 'aparato', 'aparatos')}`;
  $('#btnDeshacer').disabled = !S.puedeDeshacer();
  $('#btnRehacer').disabled = !S.puedeRehacer();
  document.title = `${t.nombre} · Tableros MEC`;
}

function pintarResumen(t) {
  const ev = ui.ev;
  const c = ev.cuenta;
  const sin = ev.sinUbicar.length;
  let clase = 'ok';
  let titulo = 'Entra todo con lugar';
  let detalle = `${plural(ev.totalAparatos, 'aparato', 'aparatos')} en ${plural(t.rieles.length, 'riel', 'rieles')}.`;
  const general = ev.avisos.find((a) => a.estado === 'pasado');
  if (c.pasado > 0 || general) {
    clase = 'pasado';
    titulo = c.pasado > 0 ? `${plural(c.pasado, 'aparato no entra', 'aparatos no entran')}` : 'El tablero no entra en la placa';
    detalle = c.pasado > 0 ? 'Están en rojo. Agrandá la placa, agregá un riel o movelos.' : general.texto;
  } else if (sin > 0) {
    clase = 'justo';
    titulo = `${plural(sin, 'aparato sin ubicar', 'aparatos sin ubicar')}`;
    detalle = 'Tocá “Acomodar” o ponelos a mano en un riel.';
  } else if (c.justo > 0) {
    clase = 'justo';
    titulo = 'Entra, pero queda justo';
    detalle = `${plural(c.justo, 'lugar en amarillo', 'lugares en amarillo')}: revisá si alcanza.`;
  }
  const r = $('#resumen');
  r.className = `resumen ${clase}`;
  r.innerHTML = `<div class="texto"><b>${esc(titulo)}</b><span>${esc(detalle)}</span></div>
    <div class="botones"><button id="btnAgregar" title="Agregar componente">＋<span class="solo-ancho"> Componente</span></button><button id="btnAcomodar" class="primario">Acomodar</button></div>`;
}

function pintarBandeja() {
  const b = $('#bandeja');
  const sin = ui.ev.sinUbicar;
  b.hidden = sin.length === 0;
  if (!sin.length) { b.innerHTML = ''; return; }
  b.innerHTML = `<h4>Sin ubicar (${sin.length}) · tocá uno para elegir el riel</h4><div class="fichas">${sin.map((e) => `
    <button class="ficha" data-id="${esc(e.id)}">${miniatura(e.comp)}<span>${esc((e.it && e.it.etiqueta) || e.comp.nombre)} <small>${fmt(e.comp.ancho)} mm</small></span></button>`).join('')}</div>`;
}

function pintarRieles(t) {
  const ev = ui.ev;
  const partes = [];
  if (t.medidasEstimadas) {
    partes.push('<div class="avisos"><div style="background:#fff4d1;border-color:#ecd28a;color:#6b4a00">Las medidas de esta placa son <b>estimadas a partir de fotos</b>. <button class="chico" data-acc="medidas">Cargar las medidas reales</button></div></div>');
  }
  if (ev.avisos.length) partes.push(`<div class="avisos">${ev.avisos.map((a) => `<div>${esc(a.texto)}</div>`).join('')}</div>`);
  ev.rieles.forEach((r) => {
    const pct = r.largo > 0 ? Math.min(100, (r.ocupado / r.largo) * 100) : 100;
    const libre = r.libre < -0.05 ? `se pasa ${fmt(-r.libre)} mm` : `libre ${fmt(Math.max(0, r.libre))} mm`;
    partes.push(`<div class="riel-fila ${r.estado}">
      <div class="cab"><b>${r.indice + 1} · ${esc(r.nombre)}</b><span>${fmt(r.ocupado)} / ${fmt(r.largo)} mm · ${libre}</span></div>
      <div class="barra-ocup"><i style="width:${pct.toFixed(1)}%"></i></div>
      ${r.mensajes.length ? `<div class="msg">${esc(r.mensajes.join(' '))}</div>` : ''}
    </div>`);
  });
  $('#rieles').innerHTML = partes.join('');
}

function pintarHoja(t) {
  const hoja = $('#hoja');
  const id = ui.sel;
  if (!id || !t.items[id]) { hoja.hidden = true; hoja.innerHTML = ''; return; }
  const it = t.items[id];
  const comp = compDe(S.catalogo(), it.comp);
  const e = ui.ev.porItem[id];
  const ub = ubicacionDe(t, id);
  const estado = e ? e.estado : 'pasado';
  const motivos = e ? (e.motivos.length ? e.motivos : ['Entra bien.']) : ['Todavía no está en ningún riel.'];
  const opciones = S.listaCatalogo().sort((a, b) => a.nombre.localeCompare(b.nombre)).map((c) => `<option value="${esc(c.id)}"${c.id === comp.id ? ' selected' : ''}>${esc(c.nombre)} · ${fmt(c.ancho)} mm</option>`).join('');
  const enRiel = ub && ub.riel >= 0;
  hoja.className = `hoja ${estado}`;
  hoja.hidden = false;
  hoja.innerHTML = `
    <div class="cab">${miniatura(comp)}
      <div class="dat"><b>${esc(it.etiqueta || comp.nombre)}</b>
        <span>${esc(comp.nombre)}${comp.marca ? ` · ${esc(comp.marca)}` : ''}${comp.ref ? ` ${esc(comp.ref)}` : ''}</span>
        <span>${fmt(comp.ancho)} × ${fmt(comp.alto)} × ${fmt(comp.prof)} mm${comp.medida === 'estimada' ? ' <span class="insignia">medir</span>' : ''}${enRiel ? ` · riel ${ub.riel + 1}` : ''}</span>
      </div>
      <button class="plano chico" data-acc="cerrar" aria-label="Cerrar">✕</button>
    </div>
    <div class="motivos">${motivos.map(esc).join('<br>')}</div>
    <details class="mas"${ui.hojaAbierta ? ' open' : ''}><summary>Etiqueta, separación y modelo</summary>
      <div class="campos">
        <div><label for="hEtiqueta">Etiqueta</label><input id="hEtiqueta" type="text" value="${esc(it.etiqueta || '')}" maxlength="24" autocomplete="off"></div>
        <div><label for="hSep">Separación antes (mm)</label><input id="hSep" type="number" min="0" step="1" inputmode="decimal" value="${fmt(it.sep || 0).replace(',', '.')}"></div>
      </div>
      <div class="campo" style="margin-top:8px"><label for="hComp">Componente</label><select id="hComp">${opciones}</select></div>
    </details>
    ${enRiel ? `<div class="acciones">
        <button data-acc="izq" title="Mover a la izquierda">◀</button>
        <button data-acc="der" title="Mover a la derecha">▶</button>
        <button data-acc="arriba" title="Al riel de arriba" ${ub.riel === 0 ? 'disabled' : ''}>▲ riel</button>
        <button data-acc="abajo" title="Al riel de abajo" ${ub.riel === t.rieles.length - 1 ? 'disabled' : ''}>▼ riel</button>
        <button data-acc="duplicar" class="ancha">Duplicar</button>
        <button data-acc="sacar">Sacar</button>
        <button data-acc="eliminar" class="peligro">Borrar</button>
      </div>` : `<label style="margin-top:10px">Poner en el riel</label>
      <div class="rieles-dest">${ui.ev.rieles.map((r) => `<button data-acc="poner" data-riel="${r.indice}" class="${comp.ancho <= r.libre + 0.05 ? '' : 'peligro'}">${r.indice + 1} · ${esc(r.nombre)} <small>(libre ${fmt(Math.max(0, r.libre))})</small></button>`).join('')}</div>
      <div class="acciones"><button data-acc="duplicar" class="ancha">Duplicar</button><button data-acc="eliminar" class="peligro ancha">Borrar</button></div>`}`;
}

function pintarDerecha(t) {
  const v = ancha() && ui.vista === '2d' ? '3d' : ui.vista;
  $('#v3d').hidden = v !== '3d';
  $('#vfoto').hidden = v !== 'foto';
  $('#vlista').hidden = v !== 'lista';
  $$('.pestanas button').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.vista === (ancha() ? v : ui.vista))));
  if (v === '3d') pintar3D(t);
  if (v === 'foto') pintarFoto(t);
  if (v === 'lista') pintarLista(t);
}

async function pintar3D(t) {
  if (!ui.v3d) {
    if (ui.v3dCargando) return;
    ui.v3dCargando = true;
    try {
      const m = await import('./vista3d.js');
      ui.v3d = m.crearVista3D($('#lienzo3d'), { alSeleccionar: (id) => seleccionar(id) });
    } catch (e) {
      console.warn('Sin 3D', e);
      $('#sin3d').hidden = false;
      $('#lienzo3d').hidden = true;
      $('.flotante').hidden = true;
      return;
    } finally { ui.v3dCargando = false; }
  }
  ui.v3d.redimensionar();
  ui.v3d.actualizar(S.tablero() || t, ui.ev, ui.sel);
}

function pintarFoto(t) {
  const u = S.urlFoto(t.foto);
  $('#vfoto').innerHTML = u
    ? `<img class="foto-ref" src="${esc(u)}" alt="Foto del tablero">
       <p class="nota" style="margin-top:8px">${t.fotoPropia ? 'Foto cargada en este dispositivo.' : 'Foto de referencia de un tablero real de este modelo.'}</p>
       <div class="barra-foto"><button data-acc="foto-cambiar">Cambiar foto</button><button data-acc="foto-quitar" class="peligro">Quitar foto</button></div>`
    : `<p><b>Este tablero todavía no tiene foto.</b></p><p class="nota">Sacale una foto de frente a la placa o al tablero terminado y queda guardada junto al plano.</p>
       <div class="barra-foto"><button data-acc="foto-cambiar" class="primario">Agregar foto</button></div>`;
}

function pintarLista(t) {
  const filas = listaMateriales(t, S.catalogo());
  const total = filas.reduce((s, f) => s + f.cantidad, 0);
  $('#vlista').innerHTML = `
    <div class="barra-foto" style="margin-top:0"><button data-acc="agregar" class="primario">＋ Agregar componente</button><button data-acc="csv">Lista en planilla</button><button data-acc="catalogo">Catálogo</button></div>
    <p class="nota">${plural(total, 'aparato', 'aparatos')} en este tablero. Con − y + se cambia la cantidad de cada uno.</p>
    ${filas.map((f) => `<div class="item-lista">${miniatura(f.comp)}
      <div class="dat"><b>${esc(f.comp.nombre)}</b><span>${esc([f.comp.marca, f.comp.ref].filter(Boolean).join(' '))}</span>
        <span>${fmt(f.comp.ancho)} × ${fmt(f.comp.alto)} × ${fmt(f.comp.prof)} mm${f.comp.medida === 'estimada' ? ' <span class="insignia">medir</span>' : ''}</span></div>
      <div class="cant"><button class="chico" data-acc="menos" data-comp="${esc(f.comp.id)}" aria-label="Quitar uno">−</button><b>${f.cantidad}</b><button class="chico" data-acc="mas" data-comp="${esc(f.comp.id)}" aria-label="Agregar uno">+</button></div>
    </div>`).join('') || '<p>No hay componentes. Agregá el primero.</p>'}`;
}

function pintarImpresion(t) {
  const filas = listaMateriales(t, S.catalogo());
  $('#impresion').innerHTML = `<h1>${esc(t.nombre)}</h1>
    <p>Placa ${fmt(t.placa.ancho)} × ${fmt(t.placa.alto)} mm · ${plural(t.rieles.length, 'riel', 'rieles')}${t.medidasEstimadas ? ' · medidas estimadas' : ''}</p>
    <table class="bom"><thead><tr><th class="num">Cant.</th><th>Componente</th><th>Marca y referencia</th><th class="num">Ancho × alto × prof. (mm)</th><th>Etiquetas</th></tr></thead><tbody>
    ${filas.map((f) => `<tr><td class="num">${f.cantidad}</td><td>${esc(f.comp.nombre)}</td><td>${esc([f.comp.marca, f.comp.ref].filter(Boolean).join(' '))}</td><td class="num">${fmt(f.comp.ancho)} × ${fmt(f.comp.alto)} × ${fmt(f.comp.prof)}</td><td>${esc(f.etiquetas.join(' '))}</td></tr>`).join('')}
    </tbody></table>`;
}

// ---------------------------------------------------------------------------
// Zoom del plano
// ---------------------------------------------------------------------------
function ajustarZoom() {
  const lienzo = $('#lienzo');
  const vb = svg.viewBox.baseVal;
  if (!vb || !vb.width) return;
  const anchoDisp = Math.max(120, lienzo.clientWidth - 12);
  const altoDisp = Math.max(220, window.innerHeight * (ancha() ? 0.62 : 0.56));
  const base = Math.min(anchoDisp, altoDisp * (vb.width / vb.height));
  svg.style.width = `${Math.round(base * ui.zoom)}px`;
  svg.style.marginInline = base * ui.zoom < anchoDisp ? 'auto' : '0';
}

// ---------------------------------------------------------------------------
// Acciones
// ---------------------------------------------------------------------------
let avisoT = null;
function aviso(texto, tipo = '') {
  const a = $('#aviso');
  a.textContent = texto;
  a.className = `aviso ${tipo}`;
  a.hidden = false;
  clearTimeout(avisoT);
  avisoT = setTimeout(() => { a.hidden = true; }, 4200);
}

function seleccionar(id) {
  if (ui.sel === id) return;
  ui.sel = id;
  const t = S.tablero();
  vista2d.dibujar(t, ui.ev, ui.sel);
  ajustarZoom();
  pintarHoja(t);
  if (ui.v3d && !$('#v3d').hidden) ui.v3d.actualizar(t, ui.ev, ui.sel);
}

function cambiarVista(v) {
  ui.vista = v;
  document.body.dataset.vista = v;
  S.estado.ajustes.vista = v;
  S.guardar();
  render();
}

/** Agrega un componente y lo ubica en el primer riel donde entra (primero, junto a los de su misma función). */
function agregarYUbicar(compId, etiqueta = '') {
  let dondeFue = null;
  let nuevo = null;
  S.cambiar((t) => {
    const cat = S.catalogo();
    const comp = compDe(cat, compId);
    nuevo = agregarItem(t, compId, etiqueta);
    const ev = evaluar(t, cat);
    const entra = (r) => comp.ancho <= r.libre + 0.05;
    const mismos = ev.rieles.filter((r) => entra(r) && r.items.some((e) => e.comp.grupo === comp.grupo));
    const destino = mismos[mismos.length - 1] || ev.rieles.find(entra);
    if (destino) {
      let k = t.rieles[destino.indice].items.length;
      const ids = t.rieles[destino.indice].items;
      for (let i = ids.length - 1; i >= 0; i -= 1) {
        if (compDe(cat, t.items[ids[i]].comp).grupo === comp.grupo) { k = i + 1; break; }
      }
      colocarItem(t, nuevo.id, destino.indice, k);
      dondeFue = destino.indice;
    }
  });
  const comp = compDe(S.catalogo(), compId);
  if (dondeFue != null) aviso(`${comp.nombre}: agregado en el riel ${dondeFue + 1}.`, 'ok');
  else aviso(`${comp.nombre} no entra en ningún riel. Quedó en “Sin ubicar”.`, 'pasado');
  return nuevo;
}

function quitarUno(compId) {
  S.cambiar((t) => {
    const cand = t.sinUbicar.filter((id) => t.items[id].comp === compId);
    let id = cand[cand.length - 1];
    if (!id) {
      for (let i = t.rieles.length - 1; i >= 0 && !id; i -= 1) {
        const en = t.rieles[i].items.filter((x) => t.items[x].comp === compId);
        id = en[en.length - 1];
      }
    }
    if (id) quitarItem(t, id);
  });
}

function accionHoja(acc, boton) {
  const id = ui.sel;
  const t0 = S.tablero();
  if (!id || !t0.items[id]) return;
  if (acc === 'cerrar') { seleccionar(null); return; }
  const ub = ubicacionDe(t0, id);
  if (acc === 'eliminar') { S.cambiar((t) => quitarItem(t, id)); ui.sel = null; render(); return; }
  if (acc === 'duplicar') {
    let nuevo = null;
    S.cambiar((t) => {
      const o = t.items[id];
      nuevo = agregarItem(t, o.comp, o.etiqueta);
      if (ub && ub.riel >= 0) colocarItem(t, nuevo.id, ub.riel, ub.indice + 1);
    });
    ui.sel = nuevo ? nuevo.id : id;
    render();
    return;
  }
  S.cambiar((t) => {
    if (acc === 'izq') colocarItem(t, id, ub.riel, ub.indice - 1);
    if (acc === 'der') colocarItem(t, id, ub.riel, ub.indice + 1);
    if (acc === 'arriba' && ub.riel > 0) colocarItem(t, id, ub.riel - 1, null);
    if (acc === 'abajo' && ub.riel < t.rieles.length - 1) colocarItem(t, id, ub.riel + 1, null);
    if (acc === 'sacar') colocarItem(t, id, -1, null);
    if (acc === 'poner') colocarItem(t, id, Number(boton.dataset.riel), null);
  });
  render();
}

function descargar(nombre, contenido, tipo) {
  const url = URL.createObjectURL(new Blob([contenido], { type: tipo }));
  const a = document.createElement('a');
  a.href = url;
  a.download = nombre;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
const nombreArchivo = (t) => (t.nombre || 'tablero').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase() || 'tablero';

async function compartir() {
  const t = S.tablero();
  const url = await S.enlaceDe(t);
  try {
    if (navigator.share) { await navigator.share({ title: t.nombre, text: `Tablero: ${t.nombre}`, url }); return; }
    await navigator.clipboard.writeText(url);
    aviso('Enlace copiado. Pegalo en WhatsApp o en un mail.', 'ok');
  } catch (e) {
    if (e && e.name === 'AbortError') return;
    abrir('Compartir', `<p>Copiá este enlace y mandalo. Quien lo abra ve este mismo tablero.</p><textarea rows="5" readonly style="font-size:13px">${esc(url)}</textarea>`, '<button value="ok" class="primario">Listo</button>');
  }
}

async function elegirFoto() {
  const input = $('#archivoFoto');
  input.value = '';
  input.onchange = async () => {
    const f = input.files && input.files[0];
    if (!f) return;
    try {
      const data = await S.achicarImagen(f, 1600, 0.8);
      const clave = await S.guardarFoto(data);
      const vieja = S.tablero().foto;
      S.cambiar((t) => { t.foto = clave; t.fotoPropia = true; }, { deshacer: false });
      S.borrarFoto(vieja);
      render();
      aviso('Foto guardada.', 'ok');
    } catch (e) { aviso('No se pudo leer la foto.', 'pasado'); }
  };
  input.click();
}

// ---------------------------------------------------------------------------
// Diálogos
// ---------------------------------------------------------------------------
function abrir(titulo, cuerpo, pie = '', alMontar = null) {
  dlg.innerHTML = `<form method="dialog" class="cont">
    <header><h2>${esc(titulo)}</h2><button value="cerrar" class="plano" aria-label="Cerrar">✕</button></header>
    <div class="cuerpo">${cuerpo}</div>
    ${pie ? `<footer>${pie}</footer>` : ''}</form>`;
  if (!dlg.open) dlg.showModal();
  $('.cuerpo', dlg).scrollTop = 0;
  if (alMontar) alMontar(dlg);
}
const cerrar = () => { if (dlg.open) dlg.close(); };

// --- nuevo tablero desde una preselección ---
function dlgNuevo() {
  let elegido = { tipo: 'base', id: 'enfriador' };
  const valores = {};
  const tocado = new Set();
  const propias = S.estado.preselecciones;

  const campos = () => {
    if (elegido.tipo !== 'base') {
      const p = propias.find((x) => x.id === elegido.id);
      return `<div class="campo"><label for="pNombre">Nombre del tablero nuevo</label><input id="pNombre" type="text" value="${esc(p ? p.nombre : '')}"></div>`;
    }
    const pre = PRESELECCIONES.find((x) => x.id === elegido.id);
    pre.campos.forEach((c) => { if (valores[c.id] === undefined && c.tipo !== 'opcion') valores[c.id] = c.def; });
    pre.campos.filter((c) => c.tipo === 'opcion').forEach((c) => { if (!tocado.has(c.id)) valores[c.id] = c.auto ? !!c.auto(valores) : false; });
    return pre.campos.map((c) => {
      if (c.tipo === 'numero') {
        return `<div class="campo"><label for="p_${c.id}">${esc(c.nombre)}</label><input id="p_${c.id}" data-campo="${c.id}" type="number" inputmode="numeric" min="${c.min}" max="${c.max}" value="${valores[c.id]}">
          ${c.atajos ? `<div class="atajos">${c.atajos.map((a) => `<button type="button" class="chico" data-atajo="${c.id}" data-valor="${a}">${a}</button>`).join('')}</div>` : ''}</div>`;
      }
      if (c.tipo === 'texto') return `<div class="campo"><label for="p_${c.id}">${esc(c.nombre)}</label><input id="p_${c.id}" data-campo="${c.id}" type="text" value="${esc(valores[c.id])}"></div>`;
      return `<label class="opcion"><input type="checkbox" data-campo="${c.id}" ${valores[c.id] ? 'checked' : ''}>${esc(c.nombre)}</label>`;
    }).join('');
  };

  const cuerpo = () => `
    <p class="nota">Elegí para qué máquina es. La app carga todos los componentes que lleva y los acomoda sola; después se puede cambiar todo.</p>
    <div class="tarjetas">${PRESELECCIONES.map((p) => `<button type="button" class="tarjeta" data-pre="base:${p.id}" aria-pressed="${elegido.tipo === 'base' && elegido.id === p.id}">
        ${p.foto ? `<img src="${esc(p.foto)}" alt="">` : '<span class="cuad"></span>'}<span><b>${esc(p.nombre)}</b><span>${esc(p.descripcion)}</span></span></button>`).join('')}
      ${propias.length ? '<h3>Mis preselecciones</h3>' : ''}
      ${propias.map((p) => `<button type="button" class="tarjeta" data-pre="propia:${p.id}" aria-pressed="${elegido.tipo === 'propia' && elegido.id === p.id}">
        <span class="cuad"></span><span><b>${esc(p.nombre)}</b><span>${plural(Object.keys(p.tablero.items).length, 'aparato', 'aparatos')} · placa ${fmt(p.tablero.placa.ancho)} × ${fmt(p.tablero.placa.alto)} mm</span></span></button>`).join('')}
    </div>
    <h3>Datos</h3><div id="camposPre">${campos()}</div>
    ${elegido.tipo === 'propia' ? '<button type="button" class="chico peligro" id="borrarPre">Borrar esta preselección</button>' : ''}`;

  const montar = () => abrir('Tablero nuevo', cuerpo(), '<button value="cancelar">Cancelar</button><button type="button" id="crear" class="primario">Crear tablero</button>', (d) => {
    const leer = () => $$('[data-campo]', d).forEach((i) => { valores[i.dataset.campo] = i.type === 'checkbox' ? i.checked : i.type === 'number' ? num(i.value, 1) : i.value; });
    $$('[data-pre]', d).forEach((b) => b.addEventListener('click', () => {
      const [tipo, id] = b.dataset.pre.split(':');
      elegido = { tipo, id };
      montar();
    }));
    $$('[data-atajo]', d).forEach((b) => b.addEventListener('click', () => { leer(); valores[b.dataset.atajo] = Number(b.dataset.valor); $('#camposPre', d).innerHTML = campos(); enlazarCampos(); }));
    function enlazarCampos() {
      $$('#camposPre input[type="checkbox"]', d).forEach((i) => i.addEventListener('change', () => { tocado.add(i.dataset.campo); }));
      $$('#camposPre input[type="number"]', d).forEach((i) => i.addEventListener('change', () => { leer(); $('#camposPre', d).innerHTML = campos(); enlazarCampos(); }));
      $$('[data-atajo]', d).forEach((b) => { b.onclick = () => { leer(); valores[b.dataset.atajo] = Number(b.dataset.valor); $('#camposPre', d).innerHTML = campos(); enlazarCampos(); }; });
    }
    enlazarCampos();
    const borrar = $('#borrarPre', d);
    if (borrar) borrar.addEventListener('click', () => { S.borrarPreseleccion(elegido.id); elegido = { tipo: 'base', id: 'enfriador' }; montar(); });
    $('#crear', d).addEventListener('click', () => {
      if (elegido.tipo === 'propia') {
        S.crearDesdePropia(elegido.id, $('#pNombre', d).value.trim());
        aviso('Tablero creado a partir de tu preselección.', 'ok');
      } else {
        leer();
        S.crearDesdePreseleccion(elegido.id, { ...valores });
        const ev = evaluar(S.tablero(), S.catalogo());
        aviso(ev.estado === 'ok' ? 'Tablero creado: entra todo con lugar.' : ev.estado === 'justo' ? 'Tablero creado: entra, pero queda justo en algunos lugares.' : 'Tablero creado: hay aparatos que no entran (en rojo).', ev.estado);
      }
      ui.sel = null; ui.zoom = 1;
      cerrar();
    });
  });
  montar();
}

// --- acomodar ---
function dlgAcomodar() {
  const actual = S.estado.ajustes.modo || 'equilibrado';
  abrir('Acomodar los componentes', `
    <p class="nota">Reubica todos los aparatos en los rieles. Después se puede corregir a mano, y con ↶ se vuelve atrás.</p>
    <div class="tarjetas">${MODOS.map((m) => `<label class="tarjeta" style="cursor:pointer"><input type="radio" name="modo" value="${m.id}" ${m.id === actual ? 'checked' : ''} style="width:22px;height:22px;flex-shrink:0">
      <span><b>${esc(m.nombre)}</b><span>${esc(m.detalle)}</span></span></label>`).join('')}</div>`,
  '<button value="cancelar">Cancelar</button><button type="button" id="hacer" class="primario">Acomodar</button>', (d) => {
    $('#hacer', d).addEventListener('click', () => {
      const modo = ($('input[name="modo"]:checked', d) || {}).value || 'equilibrado';
      let res = null;
      S.estado.ajustes.modo = modo;
      S.cambiar((t) => { res = acomodar(t, S.catalogo(), modo); });
      if (!res) res = { texto: 'Ya estaba acomodado así.' };
      const ev = evaluar(S.tablero(), S.catalogo());
      ui.sel = null;
      cerrar();
      render();
      aviso(res.texto, ev.estado);
    });
  });
}

// --- medidas de la placa y rieles ---
function dlgMedidas() {
  const t = S.tablero();
  const g = geometria(t);
  const filaRiel = (r, i) => `<div class="riel-edit" data-riel="${esc(r.id)}">
      <input type="text" data-r="nombre" value="${esc(r.nombre)}" aria-label="Nombre del riel ${i + 1}">
      <input type="number" data-r="largo" inputmode="decimal" min="0" step="1" value="${r.largo == null ? '' : r.largo}" placeholder="auto: ${fmt(g.rieles[i] ? g.rieles[i].largo : g.largoAuto)}" aria-label="Largo útil del riel ${i + 1}">
      <button type="button" class="chico peligro" data-r="borrar" aria-label="Quitar riel ${i + 1}">✕</button></div>`;
  abrir('Medidas del tablero', `
    <div class="campo"><label for="mNombre">Nombre</label><input id="mNombre" type="text" value="${esc(t.nombre)}"></div>
    <h3>Placa de montaje</h3>
    <div class="fila"><div><label for="mAncho">Ancho (mm)</label><input id="mAncho" type="number" inputmode="decimal" min="50" value="${t.placa.ancho}"></div>
      <div><label for="mAlto">Alto (mm)</label><input id="mAlto" type="number" inputmode="decimal" min="50" value="${t.placa.alto}"></div></div>
    <div class="fila"><div><label for="mProf">Profundidad libre hasta la puerta (mm)</label><input id="mProf" type="number" inputmode="decimal" min="0" value="${t.profUtil || ''}" placeholder="sin controlar"></div>
      <div><label for="mMargen">Borde de placa a cablecanal (mm)</label><input id="mMargen" type="number" inputmode="decimal" min="0" value="${t.margen}"></div></div>
    <h3>Cablecanal</h3>
    <div class="fila"><div><label for="mCanal">Ancho (mm)</label><input id="mCanal" type="number" inputmode="decimal" min="0" value="${t.canal.ancho}"></div>
      <div><label for="mCanalAlto">Alto (mm)</label><input id="mCanalAlto" type="number" inputmode="decimal" min="0" value="${t.canal.alto}"></div></div>
    <label class="opcion"><input id="mAbajo" type="checkbox" ${t.canalAbajo ? 'checked' : ''}>Cablecanal también debajo del último riel</label>
    <p class="nota">Si no se marca, el último riel queda fuera del marco y usa todo el ancho de la placa (como el riel de bornera).</p>
    <h3>Rieles</h3>
    <p class="nota">Nombre y largo útil. Si el largo queda vacío, se calcula solo con el ancho de la placa.</p>
    <div id="mRieles">${t.rieles.map(filaRiel).join('')}</div>
    <button type="button" id="mMasRiel" class="chico">＋ Agregar riel</button>
    <h3>Avisos</h3>
    <div class="fila"><div><label for="mJusto">Amarillo si sobran menos de (mm)</label><input id="mJusto" type="number" inputmode="decimal" min="0" value="${t.umbralJusto}"></div>
      <div><label for="mHolgura">Distancia mínima al cablecanal (mm)</label><input id="mHolgura" type="number" inputmode="decimal" min="0" value="${t.holguraCanal}"></div></div>
    <p class="nota">18 mm es el ancho de un módulo: por debajo de eso no entra ni una térmica más.</p>`,
  '<button value="cancelar">Cancelar</button><button type="button" id="mGuardar" class="primario">Guardar</button>', (d) => {
    let nuevos = 0;
    $('#mMasRiel', d).addEventListener('click', () => {
      nuevos += 1;
      const n = $$('#mRieles .riel-edit', d).length;
      $('#mRieles', d).insertAdjacentHTML('beforeend', filaRiel({ id: `nuevo${nuevos}`, nombre: `Riel ${n + 1}`, largo: null }, n));
    });
    $('#mRieles', d).addEventListener('click', (e) => {
      const b = e.target.closest('[data-r="borrar"]');
      if (b) b.closest('.riel-edit').remove();
    });
    $('#mGuardar', d).addEventListener('click', () => {
      const filas = $$('#mRieles .riel-edit', d).map((f) => ({ id: f.dataset.riel, nombre: $('[data-r="nombre"]', f).value.trim(), largo: $('[data-r="largo"]', f).value.trim() }));
      if (!filas.length) { aviso('El tablero necesita al menos un riel.', 'pasado'); return; }
      S.cambiar((x) => {
        const antes = `${x.placa.ancho}x${x.placa.alto}`;
        x.nombre = $('#mNombre', d).value.trim() || x.nombre;
        x.placa.ancho = Math.max(50, num($('#mAncho', d).value, x.placa.ancho));
        x.placa.alto = Math.max(50, num($('#mAlto', d).value, x.placa.alto));
        x.profUtil = Math.max(0, num($('#mProf', d).value, 0));
        x.margen = Math.max(0, num($('#mMargen', d).value, x.margen));
        x.canal.ancho = Math.max(0, num($('#mCanal', d).value, x.canal.ancho));
        x.canal.alto = Math.max(0, num($('#mCanalAlto', d).value, x.canal.alto));
        x.canalAbajo = $('#mAbajo', d).checked;
        x.umbralJusto = Math.max(0, num($('#mJusto', d).value, x.umbralJusto));
        x.holguraCanal = Math.max(0, num($('#mHolgura', d).value, x.holguraCanal));
        if (antes !== `${x.placa.ancho}x${x.placa.alto}`) x.medidasEstimadas = false;
        const viejos = new Map(x.rieles.map((r) => [r.id, r]));
        const quedan = [];
        filas.forEach((f, i) => {
          let r = viejos.get(f.id);
          if (r) viejos.delete(f.id);
          else r = agregarRiel({ rieles: [] }, '');
          r.nombre = f.nombre || `Riel ${i + 1}`;
          const largoAntes = r.largo;
          r.largo = f.largo === '' ? null : Math.max(0, num(f.largo, 0));
          if (r.largo !== largoAntes && r.x0 != null) delete r.x0;
          quedan.push(r);
        });
        // lo que estaba en rieles borrados vuelve a "sin ubicar"
        viejos.forEach((r) => { x.sinUbicar.push(...r.items); });
        x.rieles = quedan;
      });
      cerrar();
      render();
      const ev = ui.ev;
      aviso(ev.estado === 'ok' ? 'Medidas guardadas: entra todo.' : ev.estado === 'justo' ? 'Medidas guardadas: queda justo en algunos lugares.' : 'Medidas guardadas: hay aparatos que no entran.', ev.estado);
    });
  });
}

// --- catálogo: agregar componentes al tablero y editar sus medidas ---
function dlgCatalogo() {
  let filtro = '';
  const lista = () => {
    const f = filtro.trim().toLowerCase();
    const comps = S.listaCatalogo().filter((c) => !f || `${c.nombre} ${c.marca} ${c.ref}`.toLowerCase().includes(f));
    return GRUPOS.map((g) => {
      const del = comps.filter((c) => c.grupo === g.id);
      if (!del.length) return '';
      return `<h3>${esc(g.nombre)}</h3>${del.map((c) => `<div class="item-lista">${miniatura(c)}
        <div class="dat"><b>${esc(c.nombre)}</b><span>${esc([c.marca, c.ref].filter(Boolean).join(' '))}</span>
          <span>${fmt(c.ancho)} × ${fmt(c.alto)} × ${fmt(c.prof)} mm${c.medida === 'estimada' ? ' <span class="insignia">medir</span>' : ''}</span></div>
        <button type="button" class="chico" data-editar="${esc(c.id)}">Editar</button>
        <button type="button" class="chico primario" data-sumar="${esc(c.id)}">＋</button></div>`).join('')}`;
    }).join('') || '<p>No hay componentes con ese nombre.</p>';
  };
  abrir('Catálogo de componentes', `
    <div class="buscador"><input id="cBuscar" type="text" placeholder="Buscar por nombre, marca o referencia" autocomplete="off">
      <p class="nota" style="margin:6px 0 0">＋ agrega uno al tablero. Los marcados <span class="insignia">medir</span> tienen medidas estimadas: conviene corregirlas con calibre.</p></div>
    <div id="cLista">${lista()}</div>`,
  '<button type="button" id="cNuevo">Componente nuevo</button><button value="ok" class="primario">Listo</button>', (d) => {
    $('#cBuscar', d).addEventListener('input', (e) => { filtro = e.target.value; $('#cLista', d).innerHTML = lista(); });
    $('#cLista', d).addEventListener('click', (e) => {
      const s = e.target.closest('[data-sumar]');
      const ed = e.target.closest('[data-editar]');
      if (s) { agregarYUbicar(s.dataset.sumar); render(); }
      if (ed) dlgComponente(ed.dataset.editar);
    });
    $('#cNuevo', d).addEventListener('click', () => dlgComponente(null));
  });
}

function dlgComponente(id) {
  const base = id ? compDe(S.catalogo(), id) : { nombre: '', marca: '', ref: '', ancho: 18, alto: 85, prof: 70, grupo: 'otros', color: '#e0e0dc', medida: 'medida' };
  let foto = base.foto || null;
  const modificado = id && S.esComponenteBase(id) && S.estado.catalogo[id];
  abrir(id ? 'Editar componente' : 'Componente nuevo', `
    <div class="campo"><label for="eNombre">Nombre</label><input id="eNombre" type="text" value="${esc(base.nombre)}" placeholder="Por ejemplo: Contactor 12 A"></div>
    <div class="fila"><div><label for="eMarca">Marca</label><input id="eMarca" type="text" value="${esc(base.marca)}"></div>
      <div><label for="eRef">Referencia</label><input id="eRef" type="text" value="${esc(base.ref)}"></div></div>
    <h3>Medidas (mm)</h3>
    <div class="fila tres"><div><label for="eAncho">Ancho sobre el riel</label><input id="eAncho" type="number" inputmode="decimal" min="1" step="0.1" value="${base.ancho}"></div>
      <div><label for="eAlto">Alto</label><input id="eAlto" type="number" inputmode="decimal" min="1" step="0.1" value="${base.alto}"></div>
      <div><label for="eProf">Profundidad</label><input id="eProf" type="number" inputmode="decimal" min="1" step="0.1" value="${base.prof}"></div></div>
    <p class="nota">Tomadas con calibre son las que valen. Al guardar, el componente deja de figurar como “medir”.</p>
    <div class="fila"><div><label for="eGrupo">Función</label><select id="eGrupo">${GRUPOS.map((g) => `<option value="${g.id}"${g.id === base.grupo ? ' selected' : ''}>${esc(g.nombre)}</option>`).join('')}</select></div>
      <div><label for="eColor">Color</label><input id="eColor" type="color" value="${esc(/^#[0-9a-f]{6}$/i.test(base.color || '') ? base.color : '#e0e0dc')}" style="padding:4px;height:44px"></div></div>
    <h3>Foto del frente</h3>
    <div class="item-lista"><span id="eVista">${miniatura({ ...base, foto })}</span><div class="dat"><span>Se usa en el plano y en el 3D.</span></div>
      <button type="button" class="chico" id="eFoto">Elegir foto</button><button type="button" class="chico peligro" id="eSinFoto">Quitar</button></div>`,
  `${modificado ? '<button type="button" id="eRestaurar">Volver al original</button>' : ''}<button type="button" id="eCancelar">Cancelar</button><button type="button" id="eGuardar" class="primario">Guardar</button>`, (d) => {
    $('#eFoto', d).addEventListener('click', () => {
      const input = $('#archivoFoto');
      input.value = '';
      input.onchange = async () => {
        const f = input.files && input.files[0];
        if (!f) return;
        try {
          foto = await S.guardarFoto(await S.achicarImagen(f, 420, 0.82));
          $('#eVista', d).innerHTML = miniatura({ color: '#ddd', foto });
        } catch (e) { aviso('No se pudo leer la foto.', 'pasado'); }
      };
      input.click();
    });
    $('#eSinFoto', d).addEventListener('click', () => { foto = null; $('#eVista', d).innerHTML = miniatura({ color: $('#eColor', d).value, foto: null }); });
    $('#eCancelar', d).addEventListener('click', dlgCatalogo);
    const rest = $('#eRestaurar', d);
    if (rest) rest.addEventListener('click', () => { S.restaurarComponente(id); render(); dlgCatalogo(); });
    $('#eGuardar', d).addEventListener('click', () => {
      const nombre = $('#eNombre', d).value.trim();
      if (!nombre) { aviso('Falta el nombre.', 'pasado'); return; }
      S.guardarComponente({
        ...(id ? base : {}), id: id || undefined, nombre, marca: $('#eMarca', d).value.trim(), ref: $('#eRef', d).value.trim(),
        ancho: Math.max(1, num($('#eAncho', d).value, 18)), alto: Math.max(1, num($('#eAlto', d).value, 85)), prof: Math.max(1, num($('#eProf', d).value, 70)),
        grupo: $('#eGrupo', d).value, color: $('#eColor', d).value, medida: 'medida', foto: foto || undefined, desconocido: undefined,
      });
      render();
      dlgCatalogo();
      aviso('Componente guardado.', 'ok');
    });
  });
}

// --- mis tableros ---
function dlgTableros() {
  const lista = S.listaTableros();
  abrir('Mis tableros', `
    <p class="nota">Guardados en este dispositivo. Para verlos en otro, usá “Compartir” en el menú.</p>
    ${lista.map((t) => {
    const ev = evaluar(t, S.catalogo());
    return `<div class="item-lista"><span class="p ${ev.estado}" style="width:14px;height:44px;border-radius:5px;flex-shrink:0"></span>
        <div class="dat"><b>${esc(t.nombre)}${t.id === S.estado.actual ? ' <span class="insignia" style="background:#dbeafe;color:#1e40af">abierto</span>' : ''}</b>
          <span>${fmt(t.placa.ancho)} × ${fmt(t.placa.alto)} mm · ${plural(Object.keys(t.items).length, 'aparato', 'aparatos')}</span></div>
        <button type="button" class="chico" data-abrir="${esc(t.id)}">Abrir</button>
        <button type="button" class="chico" data-copiar="${esc(t.id)}">Copiar</button>
        <button type="button" class="chico peligro" data-borrar="${esc(t.id)}" aria-label="Borrar">✕</button></div>`;
  }).join('')}`,
  '<button type="button" id="tNuevo" class="primario">＋ Tablero nuevo</button>', (d) => {
    d.querySelector('.cuerpo').addEventListener('click', (e) => {
      const a = e.target.closest('[data-abrir]');
      const c = e.target.closest('[data-copiar]');
      const b = e.target.closest('[data-borrar]');
      if (a) { ui.sel = null; ui.zoom = 1; S.seleccionarTablero(a.dataset.abrir); cerrar(); }
      if (c) { ui.sel = null; S.duplicarTablero(c.dataset.copiar); cerrar(); aviso('Copia creada: es un tablero igual, listo para modificar.', 'ok'); }
      if (b) {
        if (S.listaTableros().length <= 1) { aviso('Tiene que quedar al menos un tablero.', 'pasado'); return; }
        const t = S.estado.tableros[b.dataset.borrar];
        if (window.confirm(`¿Borrar “${t.nombre}”? No se puede deshacer.`)) { S.borrarTablero(b.dataset.borrar); dlgTableros(); }
      }
    });
    $('#tNuevo', d).addEventListener('click', dlgNuevo);
  });
}

// --- menú ---
function dlgMenu() {
  const item = (acc, titulo, detalle) => `<button type="button" data-menu="${acc}"><span><b>${esc(titulo)}</b><small>${esc(detalle)}</small></span></button>`;
  abrir('Menú', `<div class="lista-menu">
    ${item('nuevo', 'Tablero nuevo', 'Elegir una preselección: para tal máquina, tales componentes')}
    ${item('tableros', 'Mis tableros', 'Abrir, copiar o borrar')}
    ${item('medidas', 'Medidas del tablero', 'Placa, rieles, cablecanal y avisos')}
    ${item('catalogo', 'Catálogo de componentes', 'Agregar al tablero, corregir medidas, cargar fotos')}
    ${item('preseleccion', 'Guardar como preselección', 'Para hacer más tableros iguales a este')}
    ${item('compartir', 'Compartir', 'Mandar este tablero por enlace a otro celular, tablet o computadora')}
    ${item('exportar', 'Guardar en un archivo', 'Copia de seguridad de este tablero')}
    ${item('importar', 'Abrir un archivo', 'Cargar un tablero guardado')}
    ${item('csv', 'Lista de materiales en planilla', 'Archivo para Excel')}
    ${item('imprimir', 'Imprimir o guardar como PDF', 'Plano y lista de materiales')}
    ${item('instalar', 'Instalar en este dispositivo', 'Queda como una app y funciona sin conexión')}
  </div>
  <p class="nota" style="margin-top:14px">Tableros MEC · Las medidas marcadas “medir” y las de las placas de ejemplo son estimadas. La app ayuda a distribuir: no reemplaza la verificación del tablero.</p>`, '', (d) => {
    d.querySelector('.lista-menu').addEventListener('click', async (e) => {
      const b = e.target.closest('[data-menu]');
      if (!b) return;
      const acc = b.dataset.menu;
      const t = S.tablero();
      if (acc === 'nuevo') dlgNuevo();
      else if (acc === 'tableros') dlgTableros();
      else if (acc === 'medidas') dlgMedidas();
      else if (acc === 'catalogo') dlgCatalogo();
      else if (acc === 'preseleccion') {
        const nombre = window.prompt('Nombre de la preselección:', t.nombre);
        if (nombre && nombre.trim()) { S.guardarComoPreseleccion(nombre.trim()); cerrar(); aviso('Guardada. Aparece en “Tablero nuevo”.', 'ok'); }
      } else if (acc === 'compartir') { cerrar(); compartir(); }
      else if (acc === 'exportar') { cerrar(); descargar(`${nombreArchivo(t)}.json`, JSON.stringify(S.paquete(t), null, 1), 'application/json'); }
      else if (acc === 'importar') {
        cerrar();
        const input = $('#archivoJson');
        input.value = '';
        input.onchange = async () => {
          const f = input.files && input.files[0];
          if (!f) return;
          try { S.importarPaquete(JSON.parse(await f.text())); aviso('Tablero abierto.', 'ok'); } catch (err) { aviso(err.message || 'No se pudo abrir el archivo.', 'pasado'); }
        };
        input.click();
      } else if (acc === 'csv') { cerrar(); descargar(`${nombreArchivo(t)}-materiales.csv`, materialesCSV(t, S.catalogo()), 'text/csv;charset=utf-8'); }
      else if (acc === 'imprimir') { cerrar(); ui.zoom = 1; ajustarZoom(); setTimeout(() => window.print(), 150); }
      else if (acc === 'instalar') {
        if (ui.instalar) { cerrar(); ui.instalar.prompt(); ui.instalar = null; }
        else abrir('Instalar', '<p><b>En iPhone o iPad:</b> abrí esta página en Safari, tocá el botón Compartir y elegí “Agregar a inicio”.</p><p><b>En Android o en la computadora (Chrome o Edge):</b> abrí el menú del navegador y elegí “Instalar app” o “Agregar a la pantalla principal”.</p><p class="nota">Una vez instalada funciona sin conexión. Los tableros quedan guardados en cada dispositivo.</p>', '<button value="ok" class="primario">Entendido</button>');
      }
    });
  });
}

// ---------------------------------------------------------------------------
// Eventos
// ---------------------------------------------------------------------------
$('#btnMenu').addEventListener('click', dlgMenu);
$('#btnNombre').addEventListener('click', dlgTableros);
$('#btnDeshacer').addEventListener('click', () => S.deshacer());
$('#btnRehacer').addEventListener('click', () => S.rehacer());
$('#resumen').addEventListener('click', (e) => {
  if (e.target.closest('#btnAcomodar')) dlgAcomodar();
  if (e.target.closest('#btnAgregar')) dlgCatalogo();
});
$$('.pestanas button').forEach((b) => b.addEventListener('click', () => cambiarVista(b.dataset.vista)));
$('#zMas').addEventListener('click', () => { ui.zoom = Math.min(5, ui.zoom * 1.4); ajustarZoom(); });
$('#zMenos').addEventListener('click', () => { ui.zoom = Math.max(1, ui.zoom / 1.4); ajustarZoom(); });
$('#zAjustar').addEventListener('click', () => { ui.zoom = 1; ajustarZoom(); });
$('#b3dFrente').addEventListener('click', () => ui.v3d && ui.v3d.encuadrar(true));
$('#b3dPersp').addEventListener('click', () => ui.v3d && ui.v3d.encuadrar(false));

$('#bandeja').addEventListener('click', (e) => {
  const f = e.target.closest('.ficha');
  if (f) seleccionar(f.dataset.id);
});
$('#bandeja').addEventListener('pointerdown', (e) => {
  const f = e.target.closest('.ficha');
  if (!f || e.pointerType !== 'mouse') return;
  const t = S.tablero();
  const it = t.items[f.dataset.id];
  if (it) vista2d.arrastrarDesdeAfuera(it.id, compDe(S.catalogo(), it.comp), e);
});
$('#rieles').addEventListener('click', (e) => { if (e.target.closest('[data-acc="medidas"]')) dlgMedidas(); });

$('#hoja').addEventListener('click', (e) => {
  const b = e.target.closest('[data-acc]');
  if (b) accionHoja(b.dataset.acc, b);
});
$('#hoja').addEventListener('toggle', (e) => { if (e.target.matches && e.target.matches('details.mas')) ui.hojaAbierta = e.target.open; }, true);
$('#hoja').addEventListener('change', (e) => {
  const id = ui.sel;
  if (!id) return;
  if (e.target.id === 'hEtiqueta') S.cambiar((t) => { t.items[id].etiqueta = e.target.value.trim(); });
  if (e.target.id === 'hSep') S.cambiar((t) => { t.items[id].sep = Math.max(0, num(e.target.value, 0)); });
  if (e.target.id === 'hComp') S.cambiar((t) => { t.items[id].comp = e.target.value; });
});

$('#vfoto').addEventListener('click', (e) => {
  const b = e.target.closest('[data-acc]');
  if (!b) return;
  if (b.dataset.acc === 'foto-cambiar') elegirFoto();
  if (b.dataset.acc === 'foto-quitar') {
    const vieja = S.tablero().foto;
    S.cambiar((t) => { t.foto = null; t.fotoPropia = false; }, { deshacer: false });
    S.borrarFoto(vieja);
    render();
  }
});
$('#vlista').addEventListener('click', (e) => {
  const b = e.target.closest('[data-acc]');
  if (!b) return;
  const acc = b.dataset.acc;
  if (acc === 'agregar' || acc === 'catalogo') dlgCatalogo();
  if (acc === 'csv') { const t = S.tablero(); descargar(`${nombreArchivo(t)}-materiales.csv`, materialesCSV(t, S.catalogo()), 'text/csv;charset=utf-8'); }
  if (acc === 'mas') { agregarYUbicar(b.dataset.comp); render(); }
  if (acc === 'menos') { quitarUno(b.dataset.comp); render(); }
});

document.addEventListener('keydown', (e) => {
  const enCampo = /^(INPUT|TEXTAREA|SELECT)$/.test((e.target && e.target.tagName) || '');
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') { e.preventDefault(); if (e.shiftKey) S.rehacer(); else S.deshacer(); }
  else if (!enCampo && !dlg.open && ui.sel && e.key === 'Delete') accionHoja('eliminar');
  else if (!enCampo && !dlg.open && ui.sel && e.key === 'ArrowLeft') accionHoja('izq');
  else if (!enCampo && !dlg.open && ui.sel && e.key === 'ArrowRight') accionHoja('der');
  else if (!dlg.open && e.key === 'Escape') seleccionar(null);
});

let redim = null;
window.addEventListener('resize', () => {
  clearTimeout(redim);
  redim = setTimeout(() => { ajustarZoom(); pintarDerecha(S.tablero()); }, 120);
});
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); ui.instalar = e; });
window.addEventListener('pagehide', () => S.guardarYa());
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') S.guardarYa(); });

S.alCambiar((motivo) => {
  if (motivo === 'error-guardado') { aviso('No hay lugar para guardar en este dispositivo. Borrá tableros o fotos viejas.', 'pasado'); return; }
  render();
});

// ---------------------------------------------------------------------------
// Arranque
// ---------------------------------------------------------------------------
async function iniciar() {
  S.cargar();
  ui.vista = ancha() ? (S.estado.ajustes.vista === '2d' ? '3d' : S.estado.ajustes.vista || '3d') : '2d';
  document.body.dataset.vista = ui.vista;
  render();
  S.precargarFotos();
  if (/^#[zj]=/.test(location.hash)) {
    try {
      const p = await S.leerEnlace(location.hash);
      history.replaceState(null, '', location.pathname + location.search);
      if (p) { S.importarPaquete(p); aviso('Se abrió el tablero compartido.', 'ok'); }
    } catch (e) { aviso('El enlace no se pudo abrir.', 'pasado'); }
  }
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || ['localhost', '127.0.0.1'].includes(location.hostname))) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
}
iniciar();
