// Lógica del tablero, sin pantalla: geometría, control de "entra / queda justo / no entra"
// y acomodado automático. Todas las medidas en mm.
import { ORDEN_GRUPOS } from './catalogo.js';

const EPS = 0.05;

export const fmt = (mm) => {
  const v = Math.round(mm * 10) / 10;
  return Number.isInteger(v) ? String(v) : v.toFixed(1).replace('.', ',');
};

const COMP_DESCONOCIDO = { id: '?', nombre: 'Componente desconocido', marca: '', ref: '', ancho: 18, alto: 85, prof: 70, grupo: 'otros', color: '#bbbbbb', medida: 'estimada', desconocido: true };

const propia = (o, k) => Object.prototype.hasOwnProperty.call(o, k);

export function compDe(cat, id) {
  // solo claves propias: un id como "constructor" no tiene que devolver algo heredado
  return (typeof id === 'string' && propia(cat, id) && cat[id]) || { ...COMP_DESCONOCIDO, id };
}

// ---------------------------------------------------------------------------
// Geometría: dónde queda cada riel y cada cablecanal dentro de la placa
// ---------------------------------------------------------------------------
export function geometria(t) {
  const c = Math.max(0, t.canal.ancho);
  const m = Math.max(0, t.margen);
  const n = t.rieles.length;
  const canalesH = n === 0 ? 0 : n + (t.canalAbajo ? 1 : 0);
  const altoFila = n ? (t.placa.alto - 2 * m - canalesH * c) / n : 0;
  const x0Auto = m + c;
  const largoAuto = Math.max(0, t.placa.ancho - 2 * (m + c));

  const rieles = t.rieles.map((r, i) => {
    const yCanal = m + i * (c + altoFila);
    const y0 = yCanal + c;
    // El último riel, si no lleva canal debajo, queda fuera del marco: usa todo el ancho de la placa.
    const fueraDelMarco = !t.canalAbajo && n > 1 && i === n - 1;
    const largo = r.largo != null ? r.largo : fueraDelMarco ? Math.max(0, t.placa.ancho - 2 * m) : largoAuto;
    // Un riel con largo cargado a mano que no entra entre los canales verticales se centra en la placa.
    const x0 = r.x0 != null ? r.x0 : fueraDelMarco ? m : largo <= largoAuto + EPS ? x0Auto : Math.max(0, (t.placa.ancho - largo) / 2);
    return { id: r.id, nombre: r.nombre, indice: i, x0, largo, y0, alto: altoFila, yCentro: y0 + altoFila / 2, yCanal, fueraDelMarco, largoAuto: r.largo == null };
  });

  const canales = [];
  rieles.forEach((r) => {
    // canal horizontal encima de la fila
    if (c > 0) canales.push({ tipo: 'h', x: m, y: r.yCanal, w: t.placa.ancho - 2 * m, h: c, fila: r.indice });
    // tramos verticales a los costados de la fila (solo si el riel no ocupa ese lugar)
    if (c > 0 && r.alto > 0) {
      if (r.x0 >= m + c - EPS) canales.push({ tipo: 'v', x: m, y: r.y0, w: c, h: r.alto, fila: r.indice });
      if (r.x0 + r.largo <= t.placa.ancho - m - c + EPS) canales.push({ tipo: 'v', x: t.placa.ancho - m - c, y: r.y0, w: c, h: r.alto, fila: r.indice });
    }
  });
  if (n && t.canalAbajo && c > 0) {
    canales.push({ tipo: 'h', x: m, y: m + n * (c + altoFila), w: t.placa.ancho - 2 * m, h: c, fila: n });
  }
  return { altoFila, largoAuto, x0Auto, rieles, canales, c, m };
}

// ---------------------------------------------------------------------------
// Evaluación: estado de cada aparato y de cada riel
//   ok     = entra con lugar
//   justo  = entra, pero queda apretado (amarillo)
//   pasado = no entra (rojo)
// ---------------------------------------------------------------------------
/** mm libres por debajo de los cuales un riel se considera justo: el mayor entre el umbral fijo y la reserva pedida. */
export function umbralDe(t, largo) {
  return Math.max(t.umbralJusto || 0, (largo * (t.reserva || 0)) / 100);
}

const PEOR = { ok: 0, justo: 1, pasado: 2 };
const peor = (a, b) => (PEOR[a] >= PEOR[b] ? a : b);

export function evaluar(t, cat) {
  const geo = geometria(t);
  const cuenta = { ok: 0, justo: 0, pasado: 0 };
  const avisos = [];
  const porItem = {};

  if (t.rieles.length && geo.altoFila < 40) {
    avisos.push({ estado: 'pasado', texto: `Los rieles no entran en el alto de la placa: quedan ${fmt(Math.max(0, geo.altoFila))} mm por fila. Agrandá la placa o sacá un riel.` });
  }

  const rieles = t.rieles.map((r, i) => {
    const g = geo.rieles[i];
    let x = 0;
    let estadoRiel = 'ok';
    const items = r.items.map((id) => {
      const it = t.items[id];
      const comp = compDe(cat, it ? it.comp : '?');
      const sep = Math.max(0, (it && it.sep) || 0);
      x += sep;
      const e = { id, it, comp, x, ancho: comp.ancho, alto: comp.alto, prof: comp.prof, estado: 'ok', motivos: [], causas: [] };
      x += comp.ancho;

      if (comp.desconocido) {
        e.estado = peor(e.estado, 'justo');
        e.motivos.push('Este componente no está en el catálogo: se dibuja con medidas genéricas.');
      }
      const exceso = e.x + e.ancho - g.largo;
      if (exceso > EPS) {
        e.estado = 'pasado';
        e.causas.push('largo');
        e.motivos.push(`No entra en el riel: se pasa ${fmt(exceso)} mm.`);
      } else if (g.x0 + e.x + e.ancho > t.placa.ancho + EPS) {
        e.estado = 'pasado';
        e.causas.push('largo');
        e.motivos.push('Queda fuera de la placa.');
      }
      if (g.alto > 0) {
        const libreV = (g.alto - comp.alto) / 2;
        if (libreV < -EPS) {
          e.estado = 'pasado';
          e.causas.push('alto');
          e.motivos.push(`Choca con el cablecanal: mide ${fmt(comp.alto)} mm de alto y entre canales hay ${fmt(g.alto)} mm.`);
        } else if (libreV < t.holguraCanal - EPS) {
          e.estado = peor(e.estado, 'justo');
          e.motivos.push(`Queda a ${fmt(Math.max(0, libreV))} mm del cablecanal (mínimo pedido: ${fmt(t.holguraCanal)} mm).`);
        }
      }
      if (t.profUtil > 0) {
        const libreP = t.profUtil - comp.prof;
        if (libreP < -EPS) {
          e.estado = 'pasado';
          e.causas.push('prof');
          e.motivos.push(`No cierra la puerta: mide ${fmt(comp.prof)} mm de profundidad y hay ${fmt(t.profUtil)} mm.`);
        } else if (libreP < 5) {
          e.estado = peor(e.estado, 'justo');
          e.motivos.push(`Queda a ${fmt(libreP)} mm de la puerta.`);
        }
      }
      return e;
    });

    const ocupado = x;
    const libre = g.largo - ocupado;
    const mensajes = [];
    if (libre < -EPS) {
      estadoRiel = 'pasado';
      mensajes.push(`Se pasa ${fmt(-libre)} mm.`);
    } else if (items.length && libre < umbralDe(t, g.largo) - EPS) {
      estadoRiel = 'justo';
      const pedida = (g.largo * (t.reserva || 0)) / 100;
      mensajes.push(pedida > (t.umbralJusto || 0) ? `Queda justo: sobran ${fmt(Math.max(0, libre))} mm y la reserva pedida es de ${fmt(pedida)} mm.` : `Queda justo: sobran ${fmt(Math.max(0, libre))} mm.`);
      const ult = items[items.length - 1];
      if (ult.estado !== 'pasado') {
        ult.estado = peor(ult.estado, 'justo');
        ult.motivos.unshift(`El riel queda justo: sobran ${fmt(Math.max(0, libre))} mm.`);
      }
    }
    if (g.x0 + g.largo > t.placa.ancho + EPS || g.x0 < -EPS) {
      estadoRiel = 'pasado';
      mensajes.push('El riel es más largo que la placa.');
    }
    items.forEach((e) => {
      cuenta[e.estado] += 1;
      porItem[e.id] = e;
      estadoRiel = peor(estadoRiel, e.estado === 'pasado' ? 'pasado' : estadoRiel);
    });
    return { id: r.id, nombre: r.nombre, indice: i, geo: g, largo: g.largo, ocupado, libre, estado: estadoRiel, mensajes, items };
  });

  const libres = rieles.map((r) => Math.max(0, r.libre));
  const sinUbicar = t.sinUbicar.map((id) => {
    const it = t.items[id];
    const comp = compDe(cat, it ? it.comp : '?');
    return { id, it, comp, entra: false };
  });
  // Se reparten en el lugar libre de mayor a menor: dos aparatos no pueden contar el mismo hueco.
  const resto = [...libres];
  [...sinUbicar].sort((a, b) => b.comp.ancho - a.comp.ancho).forEach((e) => {
    const k = resto.findIndex((l) => e.comp.ancho <= l + EPS);
    if (k >= 0) { resto[k] -= e.comp.ancho; e.entra = true; }
  });
  // aparatos sin ubicar que no caben en el lugar libre de ningún riel
  const afuera = sinUbicar.filter((e) => !e.entra).length;
  const causas = { largo: 0, alto: 0, prof: 0 };
  Object.values(porItem).forEach((e) => { if (e.estado === 'pasado') e.causas.forEach((c) => { causas[c] += 1; }); });

  let estado = 'ok';
  rieles.forEach((r) => { estado = peor(estado, r.estado); });
  avisos.forEach((a) => { estado = peor(estado, a.estado); });
  if (cuenta.pasado > 0 || afuera > 0) estado = 'pasado';
  else if (cuenta.justo > 0 || sinUbicar.length > 0) estado = peor(estado, 'justo');
  const totalAparatos = rieles.reduce((s, r) => s + r.items.length, 0);
  return { geo, rieles, sinUbicar, cuenta, avisos, porItem, estado, totalAparatos, afuera, causas, noEntran: cuenta.pasado + afuera };
}

// ---------------------------------------------------------------------------
// Acomodado automático
// ---------------------------------------------------------------------------
export const MODOS = [
  { id: 'equilibrado', nombre: 'Por función, repartido', detalle: 'Mantiene juntos los aparatos de la misma función y reparte el lugar libre entre los rieles. Recomendado.' },
  { id: 'compacto', nombre: 'Por función, llenando de arriba hacia abajo', detalle: 'Completa cada riel antes de pasar al siguiente. Deja libres los últimos rieles.' },
  { id: 'aprovechar', nombre: 'Máximo aprovechamiento', detalle: 'Ignora la función y busca que entre todo. Sirve cuando el lugar no alcanza.' },
];

/** Todos los aparatos del tablero en orden: primero por función y, dentro de cada una, en el orden actual. */
export function ordenFuncional(t, cat) {
  const actuales = [];
  t.rieles.forEach((r) => r.items.forEach((id) => actuales.push(id)));
  t.sinUbicar.forEach((id) => actuales.push(id));
  const pos = new Map(actuales.map((id, i) => [id, i]));
  // Un tablero puede traer su propio orden de funciones (por ejemplo, contactores antes que guardamotores).
  const orden = Array.isArray(t.ordenGrupos) && t.ordenGrupos.length ? t.ordenGrupos : ORDEN_GRUPOS;
  const grupoIdx = (id) => {
    const g = compDe(cat, t.items[id].comp).grupo;
    const k = orden.indexOf(g);
    return k < 0 ? orden.length + Math.max(0, ORDEN_GRUPOS.indexOf(g)) : k;
  };
  // Dentro de un grupo: los componentes iguales van juntos, en el orden en que apareció cada modelo
  // y, entre iguales, en el orden en que fueron cargados.
  const alta = new Map(Object.keys(t.items).map((id, i) => [id, i]));
  const primera = new Map();
  Object.values(t.items).forEach((it) => { if (!primera.has(it.comp)) primera.set(it.comp, alta.get(it.id)); });
  // Los contactores van intercalados por unidad (SOP1, BOM1, SOP2...): se ordenan por el número de la etiqueta.
  const numero = (id) => { const m = /(\d+)\s*$/.exec(t.items[id].etiqueta || ''); return m ? Number(m[1]) : Infinity; };
  const intercalar = (id) => compDe(cat, t.items[id].comp).grupo === 'contactor';
  return actuales.filter((id) => t.items[id]).sort((a, b) => grupoIdx(a) - grupoIdx(b)
    || (primera.get(t.items[a].comp) - primera.get(t.items[b].comp))
    || (intercalar(a) && intercalar(b) ? numero(a) - numero(b) : 0)
    || (alta.get(a) - alta.get(b)) || (pos.get(a) - pos.get(b)));
}

function menor(a, b) {
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] < b[i] - 1e-9) return true;
    if (a[i] > b[i] + 1e-9) return false;
  }
  return false;
}

/**
 * Reparte una lista ordenada de aparatos en los rieles, sin cambiar el orden.
 * Minimiza, en este orden: mm que no entran, rieles que quedan justos, grupos partidos, el riel más cargado
 * y, a igualdad, el reparto más parejo.
 */
function repartir(ids, anchos, grupos, comps, caps, umbrales) {
  const M = ids.length;
  const R = caps.length;
  const pre = new Array(M + 1).fill(0);
  for (let i = 0; i < M; i += 1) pre[i + 1] = pre[i] + anchos[i];
  const corte = (i) => {
    // costo de cortar entre el aparato i-1 y el i
    if (i <= 0 || i >= M) return 0;
    if (comps[i - 1] === comps[i]) return 2;
    if (grupos[i - 1] === grupos[i]) return 1;
    return 0;
  };
  const INF = [Infinity, Infinity, Infinity, Infinity, Infinity];
  const mejor = Array.from({ length: R + 1 }, () => new Array(M + 1).fill(INF));
  const desde = Array.from({ length: R + 1 }, () => new Array(M + 1).fill(-1));
  mejor[0][0] = [0, 0, 0, 0, 0];
  for (let k = 1; k <= R; k += 1) {
    const cap = caps[k - 1];
    for (let i = 0; i <= M; i += 1) {
      // de mayor a menor: a igualdad de costo se llenan primero los rieles de arriba
      for (let j = i; j >= 0; j -= 1) {
        const ant = mejor[k - 1][j];
        if (ant[0] === Infinity) continue;
        const carga = pre[i] - pre[j];
        const pasa = Math.max(0, carga - cap);
        const justo = carga > 0 && pasa <= EPS && cap - carga < umbrales[k - 1] - EPS ? 1 : 0;
        const lleno = cap > 0 ? carga / cap : carga > 0 ? 9 : 0;
        const c = [ant[0] + pasa, ant[1] + justo, ant[2] + (j < i ? corte(j) : 0), Math.max(ant[3], lleno), ant[4] + lleno * lleno];
        if (menor(c, mejor[k][i])) {
          mejor[k][i] = c;
          desde[k][i] = j;
        }
      }
    }
  }
  const filas = new Array(R).fill(null).map(() => []);
  let i = M;
  for (let k = R; k >= 1; k -= 1) {
    const j = desde[k][i];
    filas[k - 1] = ids.slice(j < 0 ? i : j, i);
    i = j < 0 ? i : j;
  }
  return filas;
}

function llenar(ids, anchos, grupos, caps) {
  // Completa cada riel en orden. Se prueban dos formas y se elige la que menos se pasa:
  // pasando al riel siguiente cuando una función entera no entra en lo que queda, o aparato por aparato.
  const R = caps.length;
  const ancho = new Map(ids.map((id, i) => [id, anchos[i]]));
  const sePasa = (filas) => filas.reduce((s, f, k) => s + Math.max(0, f.reduce((a, id) => a + ancho.get(id), 0) - caps[k]), 0);
  const armar = (porFuncion) => {
    const filas = new Array(R).fill(null).map(() => []);
    let k = 0;
    let usado = 0;
    let i = 0;
    while (i < ids.length) {
      let f = i;
      let anchoGrupo = 0;
      while (f < ids.length && grupos[f] === grupos[i]) { anchoGrupo += anchos[f]; f += 1; }
      if (porFuncion && k < R - 1 && usado > 0 && usado + anchoGrupo > caps[k] + EPS && anchoGrupo <= caps[k + 1] + EPS) { k += 1; usado = 0; }
      for (let j = i; j < f; j += 1) {
        if (k < R - 1 && usado + anchos[j] > caps[k] + EPS) {
          // pasa al primer riel siguiente donde el aparato entra; si no entra en ninguno, al que sigue
          let n = k + 1;
          for (let q = k + 1; q < R; q += 1) if (anchos[j] <= caps[q] + EPS) { n = q; break; }
          k = n;
          usado = 0;
        }
        filas[k].push(ids[j]);
        usado += anchos[j];
      }
      i = f;
    }
    return filas;
  };
  const a = armar(true);
  const b = armar(false);
  return sePasa(a) <= sePasa(b) + EPS ? a : b;
}

/** Busca, con vuelta atrás y un tope de intentos, un reparto donde entren todos. Devuelve el riel de cada uno o null. */
function empacarTodo(orden, anchos, caps, tope = 60000) {
  const R = caps.length;
  const resto = [...caps];
  const riel = new Array(orden.length).fill(-1);
  let intentos = 0;
  const ir = (p) => {
    if (p === orden.length) return true;
    intentos += 1;
    if (intentos > tope) return false;
    const a = anchos[orden[p]];
    const vistos = new Set();
    for (let r = 0; r < R; r += 1) {
      if (a > resto[r] + EPS) continue;
      const clave = Math.round(resto[r] * 100);
      if (vistos.has(clave)) continue; // dos rieles con el mismo lugar libre dan lo mismo
      vistos.add(clave);
      resto[r] -= a;
      riel[p] = r;
      if (ir(p + 1)) return true;
      resto[r] += a;
      riel[p] = -1;
      if (intentos > tope) return false;
    }
    return false;
  };
  return ir(0) ? riel : null;
}

function aprovechar(ids, anchos, comps, caps) {
  // Los más anchos primero. Se prueba cada uno en el primer riel donde entra y, si así queda alguno afuera,
  // en el riel donde menos lugar sobra y con una búsqueda con vuelta atrás; se elige lo que deja menos afuera.
  const orden = ids.map((id, i) => i).sort((a, b) => anchos[b] - anchos[a] || comps[a].localeCompare(comps[b]) || a - b);
  const R = caps.length;
  const intentar = (mejorAjuste) => {
    const filas = new Array(R).fill(null).map(() => []);
    const usado = new Array(R).fill(0);
    const sobran = [];
    orden.forEach((i) => {
      let k = -1;
      for (let r = 0; r < R; r += 1) {
        if (usado[r] + anchos[i] > caps[r] + EPS) continue;
        if (!mejorAjuste) { k = r; break; }
        if (k < 0 || caps[r] - usado[r] < caps[k] - usado[k]) k = r;
      }
      if (k < 0) { sobran.push(i); return; }
      filas[k].push(i);
      usado[k] += anchos[i];
    });
    return { filas, sobran, afuera: sobran.reduce((t, i) => t + anchos[i], 0) };
  };
  let mejor = intentar(false);
  if (mejor.sobran.length) {
    const otro = intentar(true);
    if (otro.afuera < mejor.afuera - EPS) mejor = otro;
  }
  if (mejor.sobran.length && orden.reduce((t, i) => t + anchos[i], 0) <= caps.reduce((t, c) => t + c, 0) + EPS) {
    const riel = empacarTodo(orden, anchos, caps);
    if (riel) {
      const filas = new Array(R).fill(null).map(() => []);
      orden.forEach((i, p) => filas[riel[p]].push(i));
      mejor = { filas, sobran: [], afuera: 0 };
    }
  }
  // dentro de cada riel, juntar los iguales
  const res = mejor.filas.map((f) => f.sort((a, b) => comps[a].localeCompare(comps[b]) || a - b).map((i) => ids[i]));
  return { filas: res, sobran: mejor.sobran.map((i) => ids[i]) };
}

/**
 * Acomoda todos los aparatos del tablero en los rieles. Modifica el tablero recibido.
 * Devuelve un resumen para mostrarle al usuario.
 */
export function acomodar(t, cat, modo = 'equilibrado') {
  if (!t.rieles.length) return { ok: false, texto: 'El tablero no tiene rieles.' };
  const ids = ordenFuncional(t, cat);
  const comps = ids.map((id) => t.items[id].comp);
  const anchos = comps.map((c) => compDe(cat, c).ancho);
  const grupos = comps.map((c) => compDe(cat, c).grupo);
  const geo = geometria(t);
  const caps = geo.rieles.map((r) => r.largo);

  const R = caps.length;
  // Los aparatos fijados por el usuario no cambian de riel: se descuenta el lugar que ocupan y se acomoda el resto.
  const rielDe = new Map();
  t.rieles.forEach((r, k) => r.items.forEach((id) => rielDe.set(id, k)));
  const fijoEn = ids.map((id) => (t.items[id].fijo && rielDe.has(id) ? rielDe.get(id) : -1));
  const ocupFijo = new Array(R).fill(0);
  ids.forEach((id, i) => { if (fijoEn[i] >= 0) ocupFijo[fijoEn[i]] += anchos[i] + (t.items[id].sep || 0); });
  const fijados = fijoEn.filter((k) => k >= 0).length;
  const libres = caps.map((c, k) => Math.max(0, c - ocupFijo[k])); // lugar que queda para los que sí se mueven
  const umbrales = caps.map((c) => umbralDe(t, c));
  const todos = ids.map((_, i) => i).filter((i) => fijoEn[i] < 0);
  const de = (arr, idx) => idx.map((i) => arr[i]);
  const armar = (idx, capsX, umbX) => {
    if (modo === 'compacto') return { filas: llenar(de(ids, idx), de(anchos, idx), de(grupos, idx), capsX), sobran: [] };
    if (modo === 'aprovechar') return aprovechar(de(ids, idx), de(anchos, idx), de(comps, idx), capsX);
    return { filas: repartir(de(ids, idx), de(anchos, idx), de(grupos, idx), de(comps, idx), capsX, umbX), sobran: [] };
  };
  const anchoDe = new Map(ids.map((id, i) => [id, anchos[i]]));
  // mm que no entran: lo que se pasa de cada riel más lo que quedó sin ubicar
  const falta = (r) => r.filas.reduce((s, f, k) => s + Math.max(0, f.reduce((a, id) => a + anchoDe.get(id), 0) - libres[k]), 0)
    + r.sobran.reduce((a, id) => a + anchoDe.get(id), 0);

  // Una preselección puede fijar en qué riel va cada función (t.rielDeGrupo). Se respeta si así entra todo.
  const porMapa = () => {
    const mapa = t.rielDeGrupo;
    if (!mapa || modo === 'aprovechar') return null;
    const filas = new Array(R).fill(null).map(() => []);
    for (const i of todos) {
      const k = mapa[grupos[i]];
      if (!Number.isInteger(k) || k < 0 || k >= R) return null;
      filas[k].push(ids[i]);
    }
    return { filas, sobran: [] };
  };
  const porFuncion = porMapa();

  // Si el último riel está fuera del marco de cablecanal (riel de bornera), se reserva para los bornes...
  const esBorne = grupos.map((g) => g === 'bornera');
  const dedicado = R > 1 && geo.rieles[R - 1].fueraDelMarco && esBorne.some(Boolean);
  let res;
  if (dedicado) {
    res = armar(todos.filter((i) => !esBorne[i]), libres.slice(0, R - 1), umbrales.slice(0, R - 1));
    res.filas.push(de(ids, todos.filter((i) => esBorne[i])));
    if (res.sobran.length) {
      let usado = res.filas[R - 1].reduce((a, id) => a + anchoDe.get(id), 0);
      res.sobran = res.sobran.filter((id) => {
        if (usado + anchoDe.get(id) <= libres[R - 1] + EPS) { res.filas[R - 1].push(id); usado += anchoDe.get(id); return false; }
        return true;
      });
    }
    // ...pero si así algo no entra, se usa también el lugar libre de ese riel (o de los otros para los bornes).
    if (falta(res) > EPS) {
      const libre = armar(todos, libres, umbrales);
      if (falta(libre) < falta(res) - EPS) res = libre;
    }
  } else {
    res = armar(todos, libres, umbrales);
  }
  if (porFuncion && falta(porFuncion) <= falta(res) + EPS) res = porFuncion;

  // Los fijados vuelven a su riel, intercalados con el resto en el orden del acomodado.
  const ordenDe = new Map(ids.map((id, i) => [id, i]));
  const compDeId = new Map(ids.map((id, i) => [id, comps[i]]));
  const comparar = modo === 'aprovechar'
    ? (a, b) => compDeId.get(a).localeCompare(compDeId.get(b)) || ordenDe.get(a) - ordenDe.get(b)
    : (a, b) => ordenDe.get(a) - ordenDe.get(b);
  ids.forEach((id, i) => { if (fijoEn[i] < 0) t.items[id].sep = 0; });
  t.rieles.forEach((r, k) => {
    const fila = res.filas[k] || [];
    const fijos = ids.filter((id, i) => fijoEn[i] === k);
    r.items = fijos.length ? [...fila, ...fijos].sort(comparar) : fila;
  });
  t.sinUbicar = res.sobran;

  const ev = evaluar(t, cat);
  const total = anchos.reduce((s, a) => s + a, 0);
  const capTotal = caps.reduce((s, a) => s + a, 0);
  const noEntran = ev.noEntran;
  const partes = [];
  if (noEntran > 0) {
    partes.push(`${noEntran} ${noEntran === 1 ? 'aparato no entra' : 'aparatos no entran'}.`);
    if (ev.causas.largo + ev.afuera > 0) {
      const faltan = Math.max(0, total - capTotal);
      partes.push(faltan > 0 ? `Faltan ${fmt(faltan)} mm de riel: agrandá la placa, agregá un riel o sacá componentes.` : 'El largo total alcanza: probá con otro modo de acomodado o mové alguno a mano.');
    }
    if (ev.causas.alto > 0) partes.push(`${ev.causas.alto} ${ev.causas.alto === 1 ? 'choca' : 'chocan'} con el cablecanal: hace falta más alto de placa o un riel menos.`);
    if (ev.causas.prof > 0) partes.push(`${ev.causas.prof} no ${ev.causas.prof === 1 ? 'deja' : 'dejan'} cerrar la puerta: hace falta más profundidad.`);
  } else if (ev.cuenta.justo > 0) {
    partes.push('Entra todo, pero hay lugares que quedan justos (en amarillo).');
  } else {
    partes.push('Entra todo con lugar.');
  }
  if (fijados > 0) partes.push(`${fijados === 1 ? 'El aparato fijado quedó' : `Los ${fijados} aparatos fijados quedaron`} en su riel.`);
  return { ok: noEntran === 0, texto: partes.join(' '), total, capTotal, noEntran, justos: ev.cuenta.justo, estado: ev.estado, fijados };
}

// ---------------------------------------------------------------------------
// Operaciones manuales (modifican el tablero recibido)
// ---------------------------------------------------------------------------
export function ubicacionDe(t, id) {
  for (let i = 0; i < t.rieles.length; i += 1) {
    const k = t.rieles[i].items.indexOf(id);
    if (k >= 0) return { riel: i, indice: k };
  }
  const k = t.sinUbicar.indexOf(id);
  return k >= 0 ? { riel: -1, indice: k } : null;
}

function sacar(t, id) {
  t.rieles.forEach((r) => { r.items = r.items.filter((x) => x !== id); });
  t.sinUbicar = t.sinUbicar.filter((x) => x !== id);
}

/** Mueve un aparato a un riel (por índice de riel; -1 = "sin ubicar") y a una posición dentro de él. */
export function moverItem(t, id, riel, indice) {
  if (!t.items[id]) return;
  const antes = ubicacionDe(t, id);
  let destino = indice;
  if (antes && antes.riel === riel && antes.indice < indice) destino -= 1;
  sacar(t, id);
  const lista = riel < 0 ? t.sinUbicar : t.rieles[riel].items;
  const k = Math.max(0, Math.min(lista.length, destino == null ? lista.length : destino));
  lista.splice(k, 0, id);
}

export function quitarItem(t, id) {
  sacar(t, id);
  delete t.items[id];
}

/** Índice donde cae un aparato soltado en la posición x (mm desde el inicio del riel). */
export function indiceEnX(evRiel, x, ignorarId = null) {
  let k = 0;
  for (const e of evRiel.items) {
    if (e.id === ignorarId) continue;
    if (x > e.x + e.ancho / 2) k += 1;
  }
  return k;
}

// ---------------------------------------------------------------------------
// Lista de materiales
// ---------------------------------------------------------------------------
export function listaMateriales(t, cat) {
  const filas = new Map();
  Object.values(t.items).forEach((it) => {
    const comp = compDe(cat, it.comp);
    const f = filas.get(comp.id) || { comp, cantidad: 0, etiquetas: [] };
    f.cantidad += 1;
    if (it.etiqueta) f.etiquetas.push(it.etiqueta);
    filas.set(comp.id, f);
  });
  const orden = (g) => { const k = ORDEN_GRUPOS.indexOf(g); return k < 0 ? 99 : k; };
  return [...filas.values()].sort((a, b) => orden(a.comp.grupo) - orden(b.comp.grupo) || a.comp.nombre.localeCompare(b.comp.nombre));
}

export function materialesCSV(t, cat) {
  const q = (s) => `"${String(s ?? '').replace(/"/g, '""')}"`;
  const lineas = [['Cantidad', 'Componente', 'Marca', 'Referencia', 'Ancho mm', 'Alto mm', 'Profundidad mm', 'Etiquetas'].map(q).join(';')];
  listaMateriales(t, cat).forEach((f) => {
    lineas.push([f.cantidad, f.comp.nombre, f.comp.marca, f.comp.ref, fmt(f.comp.ancho), fmt(f.comp.alto), fmt(f.comp.prof), f.etiquetas.join(' ')].map(q).join(';'));
  });
  return `﻿${lineas.join('\r\n')}\r\n`;
}

/** Coloca un aparato en un riel (-1 = "sin ubicar") en la posición dada, contada sin el propio aparato. */
export function colocarItem(t, id, riel, indice) {
  if (!t.items[id]) return;
  sacar(t, id);
  const lista = riel < 0 ? t.sinUbicar : t.rieles[riel].items;
  const k = Math.max(0, Math.min(lista.length, indice == null ? lista.length : indice));
  lista.splice(k, 0, id);
}

/** Posición x (mm desde el inicio del riel) donde quedaría un aparato insertado en el índice dado. */
export function xDeIndice(evRiel, indice, ignorarId = null) {
  let x = 0;
  let k = 0;
  for (const e of evRiel.items) {
    if (e.id === ignorarId) continue;
    if (k >= indice) break;
    x += ((e.it && e.it.sep) || 0) + e.ancho;
    k += 1;
  }
  return x;
}
