// Plano 2D del tablero en SVG (unidades: mm). Dibuja placa, cablecanal, rieles y aparatos,
// pinta en amarillo lo que queda justo y en rojo lo que no entra, y permite arrastrar los aparatos.
import { fmt, indiceEnX } from './layout.js';
import { urlFoto } from './store.js';

const NS = 'http://www.w3.org/2000/svg';
const COLOR = { ok: '#16a34a', justo: '#f2a900', pasado: '#dc2626' };

function el(tag, attrs = {}, texto = null) {
  const e = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([k, v]) => { if (v != null) e.setAttribute(k, v); });
  if (texto != null) e.textContent = texto;
  return e;
}

/** Texto negro o blanco según el fondo. */
function contraste(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
  if (!m) return '#111';
  const n = parseInt(m[1], 16);
  const l = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return l > 0.55 ? '#111' : '#fff';
}

export function crearVista2D(svg, { alSeleccionar, alSoltar, esBandeja, estaBloqueado }) {
  let t = null;
  let ev = null;
  let sel = null;
  let op = {};
  let arrastre = null;
  let capaArrastre = null;
  let saltarClick = false; // el click que llega justo después de soltar un arrastre no debe cambiar la selección

  function aMM(e) {
    const p = svg.createSVGPoint();
    p.x = e.clientX; p.y = e.clientY;
    const m = svg.getScreenCTM();
    return m ? p.matrixTransform(m.inverse()) : { x: 0, y: 0 };
  }

  function dibujar(tablero, evaluacion, seleccion, opciones = {}) {
    t = tablero; ev = evaluacion; sel = seleccion; op = opciones;
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    if (!t) return;
    const { geo } = ev;
    const W = t.placa.ancho;
    const H = t.placa.alto;
    const extremo = Math.max(W, ...ev.rieles.map((r) => r.geo.x0 + Math.max(r.ocupado, r.largo)));
    const pad = Math.max(10, W * 0.02);
    const fuente = Math.max(7, Math.min(15, W / 55));
    // con las cotas a la vista se deja lugar alrededor de la placa
    const mIzq = op.cotas ? fuente * 3.4 : 0;
    const mArr = op.cotas ? fuente * 3.4 : 0;
    const mDer = op.cotas ? fuente * 7 : 0;
    const vb = [-pad - mIzq, -pad - mArr, extremo + 2 * pad + mIzq + mDer, H + 2 * pad + mArr];
    svg.setAttribute('viewBox', vb.join(' '));
    svg.style.aspectRatio = `${vb[2]} / ${vb[3]}`;

    const defs = el('defs');
    defs.innerHTML = `
      <pattern id="rayas" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <rect width="8" height="8" fill="rgba(220,38,38,.30)"/><rect width="3.2" height="8" fill="rgba(220,38,38,.75)"/>
      </pattern>
      <pattern id="ranuras" width="12" height="12" patternUnits="userSpaceOnUse">
        <rect width="12" height="12" fill="#a3a9b1"/><rect x="4" width="3" height="12" fill="#8d949c"/>
      </pattern>
      <linearGradient id="chapa" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#d7dce1"/><stop offset=".5" stop-color="#c3c9cf"/><stop offset="1" stop-color="#d2d7dc"/>
      </linearGradient>`;
    svg.appendChild(defs);

    // placa
    svg.appendChild(el('rect', { x: 0, y: 0, width: W, height: H, rx: 3, fill: 'url(#chapa)', stroke: '#7c838b', 'stroke-width': 1.2 }));

    // cablecanal
    geo.canales.forEach((c) => {
      svg.appendChild(el('rect', { x: c.x, y: c.y, width: c.w, height: c.h, fill: c.tipo === 'v' ? 'url(#ranuras)' : '#9ba1a9', stroke: '#7a8189', 'stroke-width': 0.6 }));
      if (c.tipo === 'h') svg.appendChild(el('rect', { x: c.x, y: c.y + c.h * 0.12, width: c.w, height: c.h * 0.76, fill: '#aab0b7' }));
    });

    ev.rieles.forEach((r) => {
      const g = r.geo;
      // riel DIN
      svg.appendChild(el('rect', { x: g.x0, y: g.yCentro - 17.5, width: g.largo, height: 35, fill: '#b9bfc6', stroke: '#868d95', 'stroke-width': 0.6, class: 'riel' }));
      svg.appendChild(el('line', { x1: g.x0, y1: g.yCentro, x2: g.x0 + g.largo, y2: g.yCentro, stroke: '#9aa1a9', 'stroke-width': 4, 'stroke-dasharray': '6 10' }));
      // lugar que se pidió dejar libre
      if (t.reserva > 0 && g.largo > 0) {
        const ar = (g.largo * t.reserva) / 100;
        svg.appendChild(el('rect', { x: g.x0 + g.largo - ar, y: g.yCentro - 24, width: ar, height: 48, fill: 'rgba(242,169,0,.14)', stroke: '#c98a00', 'stroke-width': 0.7, 'stroke-dasharray': '4 3' }));
      }
      // tramo que se pasa del riel
      if (r.ocupado > r.largo + 0.05) {
        svg.appendChild(el('rect', { x: g.x0 + g.largo, y: g.y0, width: r.ocupado - r.largo, height: Math.max(g.alto, 35), fill: 'url(#rayas)' }));
        svg.appendChild(el('line', { x1: g.x0 + g.largo, y1: g.y0, x2: g.x0 + g.largo, y2: g.y0 + Math.max(g.alto, 35), stroke: COLOR.pasado, 'stroke-width': 1.6 }));
      }
      // encabezado de la fila sobre el canal de arriba
      if (geo.c >= 18) {
        const y = g.yCanal + geo.c / 2;
        const tx = el('text', { x: geo.m + 6, y, 'font-size': fuente, 'dominant-baseline': 'central', fill: '#fff', 'font-weight': 600, class: 'rotulo' }, `${r.indice + 1} · ${r.nombre}`);
        svg.appendChild(tx);
        const txt = r.libre < -0.05 ? `se pasa ${fmt(-r.libre)} mm` : `libre ${fmt(Math.max(0, r.libre))} mm`;
        const ancho = txt.length * fuente * 0.56 + fuente;
        const x2 = W - geo.m - 6;
        svg.appendChild(el('rect', { x: x2 - ancho, y: y - fuente * 0.8, width: ancho, height: fuente * 1.6, rx: fuente * 0.8, fill: COLOR[r.estado] }));
        svg.appendChild(el('text', { x: x2 - ancho / 2, y, 'font-size': fuente * 0.95, 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: r.estado === 'justo' ? '#111' : '#fff', 'font-weight': 700 }, txt));
      }
      if (!r.items.length) {
        svg.appendChild(el('text', { x: g.x0 + g.largo / 2, y: g.yCentro, 'font-size': fuente, 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: '#59616b' }, 'Riel vacío'));
      }

      // aparatos
      r.items.forEach((e) => {
        const x = g.x0 + e.x;
        const y = g.yCentro - e.alto / 2;
        const grupo = el('g', { class: `ap ${e.estado}${e.id === sel ? ' sel' : ''}`, transform: `translate(${x} ${y})`, 'data-id': e.id });
        if (e.comp.hueco) grupo.appendChild(el('rect', { width: e.ancho, height: e.alto, rx: 1.5, fill: 'rgba(255,255,255,.45)', stroke: '#6b7280', 'stroke-width': 0.9, 'stroke-dasharray': '4 3' }));
        else grupo.appendChild(el('rect', { width: e.ancho, height: e.alto, rx: 1.5, fill: e.comp.color || '#ddd', stroke: 'rgba(0,0,0,.45)', 'stroke-width': 0.6 }));
        const foto = urlFoto(e.comp.foto);
        if (foto) {
          const im = el('image', { width: e.ancho, height: e.alto, preserveAspectRatio: 'none' });
          im.setAttribute('href', foto);
          grupo.appendChild(im);
        }
        const etiqueta = (e.it && e.it.etiqueta) || '';
        if (etiqueta) {
          if (e.ancho >= 26) {
            const ah = Math.min(13, e.alto * 0.2);
            const fs = Math.min(ah * 0.78, (e.ancho - 4) / (etiqueta.length * 0.6));
            grupo.appendChild(el('rect', { x: 2, y: e.alto - ah - 3, width: e.ancho - 4, height: ah, rx: 1, fill: '#ffe500', stroke: 'rgba(0,0,0,.35)', 'stroke-width': 0.4 }));
            grupo.appendChild(el('text', { x: e.ancho / 2, y: e.alto - ah / 2 - 3, 'font-size': fs, 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: '#111', 'font-weight': 700 }, etiqueta));
          } else {
            const fs = Math.min(e.ancho * 0.62, (e.alto - 6) / (etiqueta.length * 0.6));
            const tx = el('text', { x: 0, y: 0, 'font-size': fs, 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: '#111', 'font-weight': 700, stroke: '#ffe500', 'stroke-width': fs * 0.35, 'paint-order': 'stroke', transform: `translate(${e.ancho / 2} ${e.alto / 2}) rotate(-90)` }, etiqueta);
            grupo.appendChild(tx);
          }
        } else if (!foto) {
          const nombre = e.comp.nombre || '';
          const fs = Math.min(8, (e.alto - 6) / (nombre.length * 0.58), e.ancho * 0.6);
          if (fs >= 2.5) grupo.appendChild(el('text', { 'font-size': fs, 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: contraste(e.comp.color), transform: `translate(${e.ancho / 2} ${e.alto / 2}) rotate(-90)` }, nombre));
        }
        if (e.estado !== 'ok') {
          grupo.appendChild(el('rect', { width: e.ancho, height: e.alto, rx: 1.5, fill: e.estado === 'pasado' ? 'url(#rayas)' : 'rgba(255,196,0,.40)', stroke: COLOR[e.estado], 'stroke-width': 2.4, class: 'marca' }));
        }
        if (t.armado && t.armado[e.id]) {
          // ya está montado en el tablero real
          const rr = Math.max(3, Math.min(7.5, e.ancho * 0.3));
          const cx = e.ancho - rr - 1.5;
          const cy = rr + 1.5;
          grupo.appendChild(el('circle', { cx, cy, r: rr, fill: '#16a34a', stroke: '#fff', 'stroke-width': 1 }));
          grupo.appendChild(el('path', { d: `M${cx - rr * 0.45} ${cy} l${rr * 0.32} ${rr * 0.36} l${rr * 0.6} ${-rr * 0.72}`, fill: 'none', stroke: '#fff', 'stroke-width': rr * 0.28, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }));
        }
        grupo.appendChild(el('rect', { x: -1.5, y: -1.5, width: e.ancho + 3, height: e.alto + 3, rx: 2.5, fill: 'none', class: 'borde-sel' }));
        const titulo = el('title', {}, `${etiqueta ? `${etiqueta} · ` : ''}${e.comp.nombre} · ${fmt(e.ancho)} × ${fmt(e.alto)} mm${e.motivos.length ? `\n${e.motivos.join('\n')}` : ''}`);
        grupo.appendChild(titulo);
        svg.appendChild(grupo);
      });
    });

    if (op.cotas) {
      const azul = '#1d4ed8';
      const gc = el('g', { class: 'cotas', 'pointer-events': 'none' });
      const linea = (x1, y1, x2, y2) => gc.appendChild(el('line', { x1, y1, x2, y2, stroke: azul, 'stroke-width': 0.8 }));
      const texto = (x, y, txt, extra = {}) => gc.appendChild(el('text', { x, y, 'font-size': fuente * 1.05, fill: azul, 'font-weight': 700, 'text-anchor': 'middle', 'dominant-baseline': 'central', ...extra }, txt));
      // ancho de la placa
      const ya = -mArr * 0.5;
      linea(0, ya, W, ya); linea(0, ya - 4, 0, 0); linea(W, ya - 4, W, 0);
      texto(W / 2, ya - fuente * 0.85, `${fmt(W)} mm`);
      // alto de la placa
      const xa = -mIzq * 0.5;
      linea(xa, 0, xa, H); linea(xa - 4, 0, 0, 0); linea(xa - 4, H, 0, H);
      gc.appendChild(el('text', { 'font-size': fuente * 1.05, fill: azul, 'font-weight': 700, 'text-anchor': 'middle', 'dominant-baseline': 'central', transform: `translate(${xa - fuente * 0.85} ${H / 2}) rotate(-90)` }, `${fmt(H)} mm`));
      // por riel: altura del eje desde el borde de arriba, inicio desde la izquierda y largo
      const xt = extremo + pad * 0.6;
      ev.rieles.forEach((r) => {
        const g = r.geo;
        linea(g.x0 + g.largo, g.yCentro, xt, g.yCentro);
        texto(xt + 2, g.yCentro - fuente * 1.3, `eje a ${fmt(g.yCentro)}`, { 'text-anchor': 'start' });
        texto(xt + 2, g.yCentro, `inicio ${fmt(g.x0)}`, { 'text-anchor': 'start', 'font-weight': 500 });
        texto(xt + 2, g.yCentro + fuente * 1.3, `largo ${fmt(g.largo)}`, { 'text-anchor': 'start', 'font-weight': 500 });
      });
      svg.appendChild(gc);
    }

    capaArrastre = el('g', { class: 'capa-arrastre', 'pointer-events': 'none' });
    svg.appendChild(capaArrastre);
  }

  // ------------------------------------------------------------------
  // Arrastre: se suelta en un riel (en la posición más cercana) o en la bandeja "sin ubicar"
  // ------------------------------------------------------------------
  function destino(e) {
    if (esBandeja && esBandeja(e.clientX, e.clientY)) return { riel: -1, indice: null };
    const p = aMM(e);
    let mejor = null;
    ev.rieles.forEach((r) => {
      const d = Math.abs(p.y - r.geo.yCentro);
      if (!mejor || d < mejor.d) mejor = { d, r };
    });
    if (!mejor) return null;
    const { r } = mejor;
    const indice = indiceEnX(r, p.x - r.geo.x0, arrastre.id);
    let x = 0;
    let k = 0;
    for (const it of r.items) {
      if (it.id === arrastre.id) continue;
      if (k >= indice) break;
      x += ((it.it && it.it.sep) || 0) + it.ancho;
      k += 1;
    }
    return { riel: r.indice, indice, r, x, p };
  }

  function pintarArrastre(e) {
    const d = destino(e);
    while (capaArrastre.firstChild) capaArrastre.removeChild(capaArrastre.firstChild);
    const p = aMM(e);
    const comp = arrastre.comp;
    capaArrastre.appendChild(el('rect', { x: p.x - comp.ancho / 2, y: p.y - comp.alto / 2, width: comp.ancho, height: comp.alto, rx: 2, fill: 'rgba(11,107,255,.25)', stroke: '#0b6bff', 'stroke-width': 1.5, 'stroke-dasharray': '5 3' }));
    if (d && d.r) {
      const g = d.r.geo;
      const libre = d.r.largo - d.r.ocupado + (ev.porItem[arrastre.id] && d.r.items.some((i) => i.id === arrastre.id) ? comp.ancho : 0);
      const entra = comp.ancho <= libre + 0.05;
      capaArrastre.appendChild(el('rect', { x: g.x0, y: g.y0, width: g.largo, height: Math.max(g.alto, 35), fill: entra ? 'rgba(22,163,74,.12)' : 'rgba(220,38,38,.14)' }));
      capaArrastre.appendChild(el('line', { x1: g.x0 + d.x, y1: g.y0 + 2, x2: g.x0 + d.x, y2: g.y0 + Math.max(g.alto, 35) - 2, stroke: entra ? '#0b6bff' : COLOR.pasado, 'stroke-width': 3.2, 'stroke-linecap': 'round' }));
    }
    arrastre.destino = d;
  }

  function empezar(id, comp, e) {
    arrastre = { id, comp, x0: e.clientX, y0: e.clientY, activo: false, destino: null, bloqueado: !!(estaBloqueado && estaBloqueado()) };
  }

  function terminar(soltar) {
    if (!arrastre) return;
    const a = arrastre;
    arrastre = null;
    svg.classList.remove('arrastrando');
    document.body.classList.remove('arrastrando');
    if (capaArrastre) while (capaArrastre.firstChild) capaArrastre.removeChild(capaArrastre.firstChild);
    const g = svg.querySelector(`.ap[data-id="${a.id}"]`);
    if (g) g.classList.remove('fantasma');
    if (a.activo) { saltarClick = true; setTimeout(() => { saltarClick = false; }, 400); }
    if (soltar && a.activo && a.destino) alSoltar(a.id, a.destino.riel, a.destino.indice);
  }

  function mover(e) {
    if (!arrastre || arrastre.bloqueado) return;
    if (!arrastre.activo) {
      if (Math.hypot(e.clientX - arrastre.x0, e.clientY - arrastre.y0) < 7) return;
      arrastre.activo = true;
      svg.classList.add('arrastrando');
      document.body.classList.add('arrastrando');
      const g = svg.querySelector(`.ap[data-id="${arrastre.id}"]`);
      if (g) g.classList.add('fantasma');
    }
    e.preventDefault();
    pintarArrastre(e);
  }

  svg.addEventListener('pointerdown', (e) => {
    if (e.button != null && e.button > 0) return;
    const g = e.target.closest && e.target.closest('.ap');
    if (!g) return;
    const id = g.getAttribute('data-id');
    const info = ev && ev.porItem[id];
    if (!info) return;
    // Con el dedo solo se arrastra el aparato ya seleccionado: así deslizar para desplazar la pantalla no mueve nada.
    if (e.pointerType === 'touch' && id !== sel) return;
    empezar(id, info.comp, e);
    try { svg.setPointerCapture(e.pointerId); } catch (err) { /* nada */ }
  });
  svg.addEventListener('pointermove', mover);
  svg.addEventListener('pointerup', (e) => {
    if (arrastre && arrastre.activo) pintarArrastre(e);
    terminar(true);
  });
  svg.addEventListener('pointercancel', () => terminar(false));
  // En pantallas táctiles, evita que la página se desplace mientras se arrastra un aparato.
  svg.addEventListener('touchmove', (e) => { if (arrastre) e.preventDefault(); }, { passive: false });
  // La selección se hace en el "click" y no al levantar el dedo: si no, ese mismo toque
  // terminaba apretando un botón de la ficha que aparece debajo.
  svg.addEventListener('click', (e) => {
    if (saltarClick) { saltarClick = false; return; }
    const g = e.target.closest && e.target.closest('.ap');
    alSeleccionar(g ? g.getAttribute('data-id') : null);
  });

  /** Arrastre iniciado fuera del plano (desde la bandeja "sin ubicar"), solo con mouse. */
  function arrastrarDesdeAfuera(id, comp, e) {
    empezar(id, comp, e);
    const alMover = (m) => mover(m);
    const alSubir = (m) => {
      window.removeEventListener('pointermove', alMover);
      window.removeEventListener('pointerup', alSubir);
      if (arrastre && arrastre.activo) pintarArrastre(m);
      terminar(true);
    };
    window.addEventListener('pointermove', alMover);
    window.addEventListener('pointerup', alSubir);
  }

  return { dibujar, arrastrarDesdeAfuera };
}
