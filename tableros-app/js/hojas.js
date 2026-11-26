// Pantallas y hojas imprimibles tomadas de lo que hacen otros programas de tableros:
// problemas, placa necesaria, lista de corte, carteles a escala real, referencias para la puerta,
// armado paso a paso, pedido de materiales y carpeta del tablero.
import * as S from './store.js';
import { evaluar, acomodar, fmt, compDe, listaMateriales } from './layout.js';
import { listaDeCorte, placasPorRieles, conRieles, tirasDeCarteles, ocupacion, modulosLibres, costo, renumerar, textoPedido, materialesDeMontaje, MODULO } from './extras.js';
import { GRUPOS } from './catalogo.js';
import { crearVista2D } from './vista2d.js';

const COLOR_GRUPO = { cabecera: '#c8e6c9', guardamotor: '#ffcdd2', fases: '#d1c4e9', termica: '#bbdefb', plc: '#c5cae9', control: '#b2ebf2', rele: '#f8bbd0', contactor: '#ffe0b2', bornera: '#e0e0e0', otros: '#ffffff' };
// Ancho real de un texto, en "em": se mide con la misma tipografía con que se imprime.
let medidor = null;
function emDe(texto, peso) {
  try {
    if (!medidor) medidor = document.createElement('canvas').getContext('2d');
    medidor.font = `${peso} 100px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`;
    return medidor.measureText(texto).width / 100;
  } catch (e) { return texto.length * 0.8; }
}
const dinero = (v) => `$ ${v.toLocaleString('es-AR', { maximumFractionDigits: 2 })}`;

export function crearHojas(ctx) {
  const { abrir, cerrar, aviso, render, esc, num, plural, seleccionar, $, $$ } = ctx;
  const cat = () => S.catalogo();

  // -------------------------------------------------------------------------
  // Ocupación general (renglón sobre la lista de rieles)
  // -------------------------------------------------------------------------
  function htmlOcupacion(t, ev) {
    const o = ocupacion(ev);
    const pedida = t.reserva > 0 ? ` · reserva pedida ${fmt(t.reserva)} %` : '';
    return `<div class="ocupacion"><b>Ocupación ${fmt(Math.round(o.porcentaje))} %</b> · libre ${fmt(Math.round(o.reserva))} % (${plural(o.modulos, 'módulo', 'módulos')} de ${MODULO} mm)${pedida}</div>`;
  }
  const textoLibre = (r) => (r.libre < -0.05 ? `se pasa ${fmt(-r.libre)} mm` : `libre ${fmt(Math.max(0, r.libre))} mm · ${plural(modulosLibres(r.libre), 'módulo', 'módulos')}`);

  // -------------------------------------------------------------------------
  // Problemas: todo lo rojo y lo amarillo en una lista; tocar lleva al aparato
  // -------------------------------------------------------------------------
  function listaProblemas(t, ev) {
    const out = [];
    ev.avisos.forEach((a) => out.push({ estado: a.estado, titulo: 'Tablero', texto: a.texto }));
    ev.rieles.forEach((r) => {
      if (r.estado === 'pasado' && r.mensajes.length && !r.items.some((e) => e.estado === 'pasado')) {
        out.push({ estado: 'pasado', titulo: `Riel ${r.indice + 1} · ${r.nombre}`, texto: r.mensajes.join(' ') });
      }
      r.items.forEach((e) => {
        if (e.estado === 'ok') return;
        out.push({ estado: e.estado, id: e.id, titulo: `${(e.it && e.it.etiqueta) || e.comp.nombre} · riel ${r.indice + 1}`, texto: e.motivos.join(' ') });
      });
    });
    ev.sinUbicar.forEach((e) => out.push({ estado: e.entra ? 'justo' : 'pasado', id: e.id, titulo: (e.it && e.it.etiqueta) || e.comp.nombre, texto: e.entra ? 'Todavía no está en ningún riel.' : 'Está sin ubicar y no queda lugar libre para todos los que faltan.' }));
    const vistos = new Set();
    Object.values(t.items).forEach((it) => {
      const c = compDe(cat(), it.comp);
      if (c.medida === 'estimada' && !c.hueco && !vistos.has(c.id)) { vistos.add(c.id); out.push({ estado: 'dato', comp: c.id, titulo: c.nombre, texto: 'Sus medidas son estimadas: conviene medirlo con calibre y corregirlo en el catálogo.' }); }
    });
    const orden = { pasado: 0, justo: 1, dato: 2 };
    return out.sort((a, b) => orden[a.estado] - orden[b.estado]);
  }

  function dlgProblemas() {
    const t = S.tablero();
    const ev = evaluar(t, cat());
    const lista = listaProblemas(t, ev);
    const nombre = { pasado: 'No entra', justo: 'Queda justo', dato: 'Dato a verificar' };
    abrir('Revisión del tablero', lista.length ? `
      <p class="nota">Tocá un renglón para ver el aparato en el plano.</p>
      ${lista.map((p, i) => `<button type="button" class="problema ${p.estado}" data-i="${i}"><i class="p ${p.estado === 'dato' ? 'dato' : p.estado}"></i><span><b>${esc(nombre[p.estado])} · ${esc(p.titulo)}</b><span>${esc(p.texto)}</span></span></button>`).join('')}`
      : '<p><b>No hay nada para corregir.</b> Entra todo con lugar y las medidas están verificadas.</p>',
    '<button value="ok" class="primario">Listo</button>', (d) => {
      $$('.problema', d).forEach((b) => b.addEventListener('click', () => {
        const p = lista[Number(b.dataset.i)];
        cerrar();
        if (p.id) seleccionar(p.id);
        else if (p.comp) ctx.dlgComponente(p.comp);
      }));
    });
  }

  // -------------------------------------------------------------------------
  // ¿Qué placa necesito?
  // -------------------------------------------------------------------------
  function dlgPlaca() {
    const t = S.tablero();
    let reserva = t.reserva || 0;
    const tarjetas = () => placasPorRieles(t, cat(), { modo: S.estado.ajustes.modo, reserva }).map((o) => `<div class="tarjeta" style="cursor:default"><span style="flex:1"><b>${fmt(o.ancho)} × ${fmt(o.alto)} mm · ${plural(o.rieles, 'riel', 'rieles')}${o.actual ? ' (como ahora)' : ''}</b>
          <span>${o.actual ? (o.sobraAncho >= 0 && o.sobraAlto >= 0 ? `La placa actual alcanza: sobran ${fmt(o.sobraAncho)} mm de ancho y ${fmt(o.sobraAlto)} mm de alto.` : `La placa actual queda chica: ${o.sobraAncho < 0 ? `faltan ${fmt(-o.sobraAncho)} mm de ancho` : ''}${o.sobraAncho < 0 && o.sobraAlto < 0 ? ' y ' : ''}${o.sobraAlto < 0 ? `faltan ${fmt(-o.sobraAlto)} mm de alto` : ''}.`) : 'Reparte los mismos componentes en otra cantidad de rieles.'}</span></span>
          <button type="button" class="chico primario" data-usar="${o.rieles}" data-ancho="${o.ancho}" data-alto="${o.alto}">Usar</button></div>`).join('');
    abrir('¿Qué placa necesito?', `<p class="nota">La placa más chica donde entran todos los componentes de este tablero, probando con un riel menos, los mismos y uno más. Placa actual: <b>${fmt(t.placa.ancho)} × ${fmt(t.placa.alto)} mm</b>.</p>
        <div class="campo"><label for="pReserva">Lugar libre que tiene que quedar en cada riel (%)</label>
          <div class="atajos"><input id="pReserva" type="number" inputmode="decimal" min="0" max="60" value="${reserva}" style="max-width:110px">${[0, 10, 20, 30].map((v) => `<button type="button" class="chico" data-res="${v}">${v} %</button>`).join('')}</div></div>
        <div class="tarjetas" id="pTarjetas">${tarjetas()}</div>
        <p class="nota" style="margin-top:10px">El alto considera el aparato más alto más ${fmt(t.holguraCanal)} mm de aire contra el cablecanal de cada lado. Los rieles con largo cargado a mano acompañan el cambio de ancho. “Usar” cambia la placa y vuelve a acomodar; con ↶ se deshace.</p>`,
    '<button value="ok">Cerrar</button>', (d) => {
      // Solo se rehacen las tarjetas, y mientras se escribe: al tocar "Usar" ya están al día y el toque no se pierde.
      let espera = null;
      const recalcular = () => { reserva = Math.max(0, Math.min(60, num($('#pReserva', d).value, 0))); $('#pTarjetas', d).innerHTML = tarjetas(); };
      $('#pReserva', d).addEventListener('input', () => { clearTimeout(espera); espera = setTimeout(recalcular, 200); });
      $$('[data-res]', d).forEach((b) => b.addEventListener('click', () => { clearTimeout(espera); $('#pReserva', d).value = b.dataset.res; recalcular(); }));
      $('#pTarjetas', d).addEventListener('click', (e) => {
        const b = e.target.closest('[data-usar]');
        if (!b) return;
        clearTimeout(espera);
        const pedida = Math.max(0, Math.min(60, num($('#pReserva', d).value, 0)));
        if (pedida !== reserva) { recalcular(); aviso('Cambió la reserva: revisá las medidas y volvé a tocar “Usar”.', 'justo'); return; }
        const k = Number(b.dataset.usar);
        S.cambiar((x) => {
          const nuevo = conRieles(x, k);
          x.rieles = nuevo.rieles;
          x.sinUbicar = nuevo.sinUbicar;
          const delta = Number(b.dataset.ancho) - x.placa.ancho;
          x.rieles.forEach((r) => { if (r.largo != null) r.largo = Math.max(0, r.largo + delta); });
          x.placa.ancho = Number(b.dataset.ancho);
          x.placa.alto = Number(b.dataset.alto);
          x.reserva = reserva;
          x.medidasEstimadas = false;
          acomodar(x, cat(), S.estado.ajustes.modo);
        });
        cerrar();
        render();
        aviso(`Placa de ${b.dataset.ancho} × ${b.dataset.alto} mm con ${plural(k, 'riel', 'rieles')}.`, evaluar(S.tablero(), cat()).estado);
      });
    });
  }

  // -------------------------------------------------------------------------
  // Lista de corte
  // -------------------------------------------------------------------------
  function htmlCorte(t, opciones = {}) {
    const lc = listaDeCorte(t, opciones);
    const tabla = (titulo, x) => `<h3>${titulo}</h3>
      <table class="bom"><thead><tr><th class="num">Cant.</th><th class="num">Largo (mm)</th><th>Para</th></tr></thead><tbody>
      ${x.piezas.map((p) => `<tr><td class="num">${p.cantidad}</td><td class="num"><b>${fmt(p.largo)}</b></td><td>${esc([...new Set(p.donde)].join(', '))}</td></tr>`).join('')}
      </tbody></table>
      <p class="nota">Total ${fmt(x.total / 1000)} m · ${plural(x.barras.length, 'barra', 'barras')} de ${fmt(lc.largoBarra / 1000)} m${x.barras.some((b) => b.excede) ? ' · <b>hay piezas más largas que la barra</b>' : ''}.</p>
      <ol class="barras">${x.barras.map((b) => `<li>${b.piezas.map((p) => fmt(p.largo)).join(' + ')}${b.excede ? '' : ` · sobra ${fmt(b.sobrante)} mm`}</li>`).join('')}</ol>`;
    return `${lc.cantidad > 1 ? `<p><b>Para ${lc.cantidad} tableros iguales.</b></p>` : ''}${tabla('Riel DIN', lc.riel)}${tabla(`Cablecanal de ${fmt(t.canal.ancho)} mm`, lc.canal)}`;
  }

  function dlgCorte() {
    const t = S.tablero();
    let cantidad = t.cantidad || 1;
    let barra = 2000;
    abrir('Lista de corte', `
      <div class="fila"><div><label for="cCant">Tableros iguales a armar</label><input id="cCant" type="number" inputmode="numeric" min="1" max="99" value="${cantidad}"></div>
        <div><label for="cBarra">Largo de la barra (mm)</label><input id="cBarra" type="number" inputmode="numeric" min="200" value="${barra}"></div></div>
      <div id="cTabla">${htmlCorte(t, { cantidad, largoBarra: barra })}</div>
      <p class="nota">Salen de las medidas cargadas en “Medidas del tablero”. Si la placa tiene medidas estimadas, los cortes también lo son. Los cablecanales verticales van de una pieza y los horizontales del medio se cortan entre ellos.</p>`,
    '<button value="ok">Cerrar</button><button type="button" id="cImprimir" class="primario" data-sin-enter>Imprimir</button>', (d) => {
      const leer = () => { cantidad = Math.max(1, Math.min(999, Math.round(num($('#cCant', d).value, 1)))); barra = Math.max(200, num($('#cBarra', d).value, 2000)); };
      const recalcular = () => { leer(); $('#cTabla', d).innerHTML = htmlCorte(S.tablero(), { cantidad, largoBarra: barra }); };
      ['#cCant', '#cBarra'].forEach((q) => $(q, d).addEventListener('input', recalcular));
      // la cantidad queda guardada en el tablero (sirve para el pedido y los materiales), salvo que esté bloqueado
      $('#cCant', d).addEventListener('change', () => {
        leer();
        if (!ctx.bloqueado() && cantidad !== (S.tablero().cantidad || 1)) S.cambiar((x) => { x.cantidad = cantidad; }, { deshacer: false, motivo: 'campo' });
      });
      $('#cImprimir', d).addEventListener('click', () => { leer(); cerrar(); imprimir(encabezado(S.tablero(), 'Lista de corte') + htmlCorte(S.tablero(), { cantidad, largoBarra: barra })); });
    });
  }

  // -------------------------------------------------------------------------
  // Carteles a escala real: una tira por riel, cada cartel con el ancho de su aparato
  // -------------------------------------------------------------------------
  function htmlCarteles(ev, { alto = 25, anchoHoja = 180, color = true, funcion = true } = {}) {
    const tiras = tirasDeCarteles(ev);
    const partes = [];
    tiras.forEach((tira) => {
      // se corta en tramos que entren en la hoja, siempre entre dos carteles
      const tramos = [];
      let actual = [];
      let usado = 0;
      let cursor = 0;
      tira.carteles.forEach((c) => {
        const hueco = Math.max(0, c.x - cursor);
        const necesita = hueco + c.ancho;
        if (actual.length && usado + necesita > anchoHoja) { tramos.push(actual); actual = []; usado = 0; }
        if (hueco > 0.05 && actual.length) { actual.push({ vacio: true, ancho: hueco }); usado += hueco; }
        actual.push(c);
        usado += c.ancho;
        cursor = c.x + c.ancho;
      });
      if (actual.length) tramos.push(actual);
      tramos.forEach((tr, i) => {
        partes.push(`<div class="tira-titulo">Riel ${tira.riel} · ${esc(tira.nombre)}${tramos.length > 1 ? ` · tramo ${i + 1} de ${tramos.length}` : ''}</div>
          <div class="tira" style="height:${alto}mm">${tr.map((c) => {
    if (c.vacio) return `<div class="cartel vacio" style="width:${c.ancho}mm"></div>`;
    const texto = c.texto || '';
    const lineas = funcion && c.ancho >= 30 ? 2 : 1;
    const fs = Math.max(1.2, Math.min(alto * (lineas === 2 ? 0.3 : 0.42), (c.ancho - 1.5) / Math.max(1.24, emDe(texto, 'bold'))));
    const fs2 = Math.max(1.1, Math.min(alto * 0.16, (c.ancho - 1.5) / Math.max(2, emDe(c.detalle, 'normal'))));
    return `<div class="cartel" style="width:${c.ancho}mm;${color ? `background:${COLOR_GRUPO[c.grupo] || '#fff'}` : ''}"><b style="font-size:${fs.toFixed(2)}mm">${esc(texto)}</b>${lineas === 2 ? `<span style="font-size:${fs2.toFixed(2)}mm">${esc(c.detalle)}</span>` : ''}</div>`;
  }).join('')}</div>`);
      });
    });
    return `<div class="carteles">
      <div class="regla"><i></i><span>Control de escala: esta línea tiene que medir exactamente 100 mm. Si no, imprimí al 100 % (sin “ajustar a la página”).</span></div>
      ${partes.join('')}</div>`;
  }

  function csvCarteles(t, ev) {
    const q = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const veces = Math.max(1, Math.round(t.cantidad || 1));
    const lineas = [['Riel', 'Posición', 'Etiqueta', 'Componente', 'Ancho mm', 'Cantidad'].map(q).join(';')];
    tirasDeCarteles(ev).forEach((tira) => tira.carteles.forEach((c, i) => lineas.push([tira.riel, i + 1, c.texto, c.detalle, fmt(c.ancho), veces].map(q).join(';'))));
    return `﻿${lineas.join('\r\n')}\r\n`;
  }

  function dlgCarteles() {
    const o = { alto: 25, anchoHoja: 180, color: true, funcion: true };
    const t = S.tablero();
    const ev = evaluar(t, cat());
    abrir('Carteles y etiquetas', `
        <p class="nota">Una tira por riel, con cada cartel del ancho exacto de su aparato, para pegar sobre la tapa del cablecanal. Se imprime a tamaño real.</p>
        <div class="fila"><div><label for="kAlto">Alto de la tira (mm)</label><input id="kAlto" type="number" inputmode="decimal" min="8" max="60" value="${o.alto}"></div>
          <div><label for="kHoja">Ancho útil de la hoja (mm)</label><select id="kHoja"><option value="180" selected>A4 vertical (180)</option><option value="265">A4 apaisada (265)</option></select></div></div>
        <label class="opcion"><input id="kColor" type="checkbox" checked>Color según la función</label>
        <label class="opcion"><input id="kFuncion" type="checkbox" checked>Agregar el nombre del componente debajo de la etiqueta</label>
        <h3>Vista previa</h3>
        <div class="previa" id="kPrevia">${htmlCarteles(ev, o)}</div>`,
    '<button type="button" id="kCsv">Planilla para la rotuladora</button><button type="button" id="kImprimir" class="primario" data-sin-enter>Imprimir a escala real</button>', (d) => {
      const leer = () => { o.alto = Math.max(8, Math.min(60, num($('#kAlto', d).value, 25))); o.anchoHoja = Number($('#kHoja', d).value); o.color = $('#kColor', d).checked; o.funcion = $('#kFuncion', d).checked; };
      const recalcular = () => { leer(); $('#kPrevia', d).innerHTML = htmlCarteles(ev, o); };
      $('#kAlto', d).addEventListener('input', recalcular);
      ['#kHoja', '#kColor', '#kFuncion'].forEach((q) => $(q, d).addEventListener('change', recalcular));
      $('#kCsv', d).addEventListener('click', () => ctx.descargar(`${ctx.nombreArchivo(t)}-etiquetas.csv`, csvCarteles(t, ev), 'text/csv;charset=utf-8'));
      $('#kImprimir', d).addEventListener('click', () => { leer(); cerrar(); imprimir(encabezado(t, 'Carteles') + htmlCarteles(evaluar(S.tablero(), cat()), o), o.anchoHoja > 200 ? 'apaisada' : ''); });
    });
  }

  // -------------------------------------------------------------------------
  // Hojas de la carpeta
  // -------------------------------------------------------------------------
  function encabezado(t, titulo) {
    return `<div class="hoja-cab"><h1>${esc(t.nombre)}</h1><span>${esc(titulo)} · placa ${fmt(t.placa.ancho)} × ${fmt(t.placa.alto)} mm${t.medidasEstimadas ? ' (medidas estimadas)' : ''} · ${new Date().toLocaleDateString('es-AR')}</span></div>`;
  }

  function htmlMateriales(t) {
    const filas = listaMateriales(t, cat()).filter((f) => !f.comp.hueco);
    const veces = Math.max(1, Math.round(t.cantidad || 1));
    const c = costo(t, cat());
    const hayPrecios = c.conPrecio > 0;
    return `<table class="bom"><thead><tr><th class="num">Cant.</th><th>Componente</th><th>Marca y referencia</th><th class="num">Medidas (mm)</th>${hayPrecios ? '<th class="num">Precio</th><th class="num">Subtotal</th>' : ''}<th>Etiquetas</th></tr></thead><tbody>
      ${filas.map((f) => {
    const p = Number(f.comp.precio);
    const tiene = Number.isFinite(p) && p > 0;
    return `<tr><td class="num">${f.cantidad * veces}</td><td>${esc(f.comp.nombre)}</td><td>${esc([f.comp.marca, f.comp.ref].filter(Boolean).join(' '))}</td><td class="num">${fmt(f.comp.ancho)} × ${fmt(f.comp.alto)} × ${fmt(f.comp.prof)}</td>${hayPrecios ? `<td class="num">${tiene ? dinero(p) : '—'}</td><td class="num">${tiene ? dinero(p * f.cantidad * veces) : '—'}</td>` : ''}<td>${esc(f.etiquetas.join(' '))}</td></tr>`;
  }).join('')}
      </tbody></table>
      ${veces > 1 ? `<p class="nota">Cantidades para ${veces} tableros iguales.</p>` : ''}
      ${(() => { const mm = materialesDeMontaje(t); return mm.length ? `<h3>Para el montaje</h3><table class="bom"><tbody>${mm.map((x) => `<tr><td class="num">${x.cantidad}</td><td>${esc(x.unidad)}</td><td>${esc(x.nombre)}</td><td>${esc(x.detalle)}</td></tr>`).join('')}</tbody></table>` : ''; })()}
      ${hayPrecios ? `<p><b>Total de materiales: ${dinero(c.totalSerie)}</b>${c.sinPrecio ? ` <span class="nota">(${plural(c.sinPrecio, 'aparato sin precio cargado', 'aparatos sin precio cargado')} por tablero)</span>` : ''}</p>` : ''}`;
  }

  function htmlLeyenda(t, ev) {
    return `<table class="bom"><thead><tr><th>Etiqueta</th><th>Componente</th><th>Marca y referencia</th><th>Riel</th><th class="num">Posición</th></tr></thead><tbody>
      ${ev.rieles.map((r) => r.items.filter((e) => !e.comp.hueco).map((e, i) => `<tr><td><b>${esc((e.it && e.it.etiqueta) || '—')}</b></td><td>${esc(e.comp.nombre)}</td><td>${esc([e.comp.marca, e.comp.ref].filter(Boolean).join(' '))}</td><td>${r.indice + 1} · ${esc(r.nombre)}</td><td class="num">${i + 1}</td></tr>`).join('')).join('')}
      </tbody></table>`;
  }

  /** Imprime solo las hojas indicadas. Los <svg data-plano> se completan con el plano acotado. */
  function imprimir(html, clase = '') {
    const imp = $('#impresion');
    imp.innerHTML = html;
    const t = S.tablero();
    const ev = evaluar(t, cat());
    $$('svg[data-plano]', imp).forEach((svg) => {
      crearVista2D(svg, { alSeleccionar: () => {}, alSoltar: () => {} }).dibujar(t, ev, null, { cotas: true });
      svg.style.width = '100%';
    });
    document.body.classList.add('imprimiendo');
    if (clase) document.body.classList.add(clase);
    const fin = () => {
      document.body.classList.remove('imprimiendo', 'apaisada');
      window.removeEventListener('afterprint', fin);
    };
    window.addEventListener('afterprint', fin);
    setTimeout(() => window.print(), 300);
  }

  function htmlCarpeta(t, ev, hojas) {
    const partes = [];
    if (hojas.plano) partes.push(`${encabezado(t, 'Plano con medidas')}<svg data-plano xmlns="http://www.w3.org/2000/svg"></svg>
      <table class="bom" style="margin-top:4mm"><thead><tr><th>Riel</th><th class="num">Eje desde arriba</th><th class="num">Inicio desde la izquierda</th><th class="num">Largo</th><th class="num">Ocupado</th><th class="num">Libre</th></tr></thead><tbody>
      ${ev.rieles.map((r) => `<tr><td>${r.indice + 1} · ${esc(r.nombre)}</td><td class="num">${fmt(r.geo.yCentro)}</td><td class="num">${fmt(r.geo.x0)}</td><td class="num">${fmt(r.largo)}</td><td class="num">${fmt(r.ocupado)}</td><td class="num">${r.libre < 0 ? `se pasa ${fmt(-r.libre)}` : fmt(r.libre)}</td></tr>`).join('')}</tbody></table>
      ${t.notas ? `<p class="nota-taller" style="margin-top:4mm"><b>Notas del taller:</b> ${esc(t.notas)}</p>` : ''}`);
    if (hojas.materiales) partes.push(`${encabezado(t, 'Lista de materiales')}${htmlMateriales(t)}`);
    if (hojas.corte) partes.push(`${encabezado(t, 'Lista de corte')}${htmlCorte(t)}`);
    if (hojas.leyenda) partes.push(`${encabezado(t, 'Referencias para la puerta')}${htmlLeyenda(t, ev)}`);
    if (hojas.carteles) partes.push(`${encabezado(t, 'Carteles a escala real')}${htmlCarteles(ev)}`);
    return partes.map((p) => `<section class="pagina">${p}</section>`).join('');
  }

  function dlgCarpeta() {
    const hojas = { plano: true, materiales: true, corte: true, leyenda: true, carteles: false };
    const nombres = { plano: 'Plano con medidas', materiales: 'Lista de materiales', corte: 'Lista de corte de riel y cablecanal', leyenda: 'Referencias para pegar en la puerta', carteles: 'Carteles a escala real' };
    abrir('Imprimir la carpeta del tablero', `
      <p class="nota">Elegí qué hojas salen. Desde la pantalla de impresión también se puede guardar como PDF.</p>
      ${Object.keys(hojas).map((k) => `<label class="opcion"><input type="checkbox" data-hoja="${k}" ${hojas[k] ? 'checked' : ''}>${nombres[k]}</label>`).join('')}`,
    '<button value="cancelar">Cancelar</button><button type="button" id="gImprimir" class="primario">Imprimir</button>', (d) => {
      $('#gImprimir', d).addEventListener('click', () => {
        $$('[data-hoja]', d).forEach((i) => { hojas[i.dataset.hoja] = i.checked; });
        if (!Object.values(hojas).some(Boolean)) { aviso('Elegí al menos una hoja.', 'pasado'); return; }
        cerrar();
        const t = S.tablero();
        imprimir(htmlCarpeta(t, evaluar(t, cat()), hojas));
      });
    });
  }

  /** Lo que sale si se usa "Imprimir" del navegador sin pasar por el menú. */
  function prepararImpresionBasica() {
    if (document.body.classList.contains('imprimiendo')) return;
    const t = S.tablero();
    const ev = evaluar(t, cat());
    const imp = $('#impresion');
    imp.innerHTML = htmlCarpeta(t, ev, { plano: true, materiales: true });
    $$('svg[data-plano]', imp).forEach((svg) => {
      crearVista2D(svg, { alSeleccionar: () => {}, alSoltar: () => {} }).dibujar(t, ev, null, { cotas: true });
      svg.style.width = '100%';
    });
  }

  // -------------------------------------------------------------------------
  // Renumerar etiquetas
  // -------------------------------------------------------------------------
  function dlgRenumerar() {
    abrir('Renumerar etiquetas', `<p>Recorre los rieles de arriba hacia abajo y de izquierda a derecha, y vuelve a numerar las etiquetas que terminan en número (SOP1, SOP2, BOM1…), componente por componente.</p>
      <p class="nota">Las etiquetas sin número no se tocan. Con ↶ se deshace.</p>`,
    '<button value="cancelar">Cancelar</button><button type="button" id="rHacer" class="primario">Renumerar</button>', (d) => {
      $('#rHacer', d).addEventListener('click', () => {
        let n = 0;
        S.cambiar((x) => { n = renumerar(x); });
        cerrar();
        render();
        aviso(n ? `${plural(n, 'etiqueta cambiada', 'etiquetas cambiadas')}.` : 'Las etiquetas ya estaban en orden.', 'ok');
      });
    });
  }

  // -------------------------------------------------------------------------
  // Pedido de materiales para mandar al proveedor
  // -------------------------------------------------------------------------
  async function pedido() {
    const t = S.tablero();
    const texto = textoPedido(t, cat());
    try {
      if (navigator.share) { await navigator.share({ title: `Pedido · ${t.nombre}`, text: texto }); return; }
      await navigator.clipboard.writeText(texto);
      aviso('Pedido copiado. Pegalo en WhatsApp o en un mail.', 'ok');
    } catch (e) {
      if (e && e.name === 'AbortError') return;
      abrir('Pedido de materiales', `<p class="nota">Copiá el texto y mandalo al proveedor.</p><textarea rows="14" readonly style="font-size:14px">${esc(texto)}</textarea>`, '<button value="ok" class="primario">Listo</button>');
    }
  }

  // -------------------------------------------------------------------------
  // Armado paso a paso: tildar cada aparato a medida que se monta en el tablero real
  // -------------------------------------------------------------------------
  function pintarArmar(t, ev) {
    const total = ev.rieles.reduce((s, r) => s + r.items.filter((e) => !e.comp.hueco).length, 0);
    const hechos = ev.rieles.reduce((s, r) => s + r.items.filter((e) => !e.comp.hueco && t.armado && t.armado[e.id]).length, 0);
    const pct = total ? (hechos / total) * 100 : 0;
    return `${t.notas ? `<div class="nota-taller"><b>Notas:</b> ${esc(t.notas)}</div>` : ''}<div class="armar-cab"><b>Montados ${hechos} de ${total}</b>
        <div class="barra-ocup"><i style="width:${pct.toFixed(1)}%"></i></div>
        <p class="nota">Tildá cada aparato cuando lo colocás en el tablero real. En el plano queda marcado con un tilde verde. La posición es desde el inicio del riel.</p>
        ${hechos ? '<button class="chico" data-acc="armar-reiniciar">Empezar de nuevo</button>' : ''}</div>
      ${ev.rieles.map((r) => {
    const items = r.items.filter((e) => !e.comp.hueco);
    if (!items.length) return '';
    const listos = items.filter((e) => t.armado && t.armado[e.id]).length;
    return `<h3>Riel ${r.indice + 1} · ${esc(r.nombre)} <small>(${listos}/${items.length})</small> ${listos < items.length ? `<button class="chico" data-acc="armar-riel" data-riel="${r.indice}">Marcar todo</button>` : ''}</h3>
        ${items.map((e) => `<label class="paso ${t.armado && t.armado[e.id] ? 'hecho' : ''} ${e.estado}"><input type="checkbox" data-armar="${esc(e.id)}" ${t.armado && t.armado[e.id] ? 'checked' : ''}>${ctx.miniatura(e.comp)}
          <span class="dat"><b>${esc((e.it && e.it.etiqueta) || e.comp.nombre)}</b><span>${esc(e.comp.nombre)}</span><span>a ${fmt(e.x)} mm · ancho ${fmt(e.ancho)} mm${e.estado === 'pasado' ? ' · <b style="color:#dc2626">no entra</b>' : ''}</span></span></label>`).join('')}`;
  }).join('') || '<p>Todavía no hay aparatos en los rieles.</p>'}`;
  }

  return { htmlOcupacion, textoLibre, dlgProblemas, dlgPlaca, dlgCorte, dlgCarteles, dlgCarpeta, dlgRenumerar, pedido, pintarArmar, prepararImpresionBasica, htmlMateriales, GRUPOS };
}
