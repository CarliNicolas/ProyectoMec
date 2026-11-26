// Pruebas de la lógica del tablero. Correr con:  cd tableros-app && npm test
import test from 'node:test';
import assert from 'node:assert/strict';
import { CATALOGO_BASE } from '../js/catalogo.js';
import { generarDesdePreseleccion, tableroBase, agregarRiel, agregarItem, PRESELECCIONES } from '../js/plantillas.js';
import { geometria, evaluar, acomodar, moverItem, quitarItem, ubicacionDe, indiceEnX, listaMateriales, materialesCSV, MODOS, fmt } from '../js/layout.js';

const cat = Object.fromEntries(CATALOGO_BASE.map((c) => [c.id, c]));
const enRieles = (t) => t.rieles.reduce((s, r) => s + r.items.length, 0);
const total = (t) => Object.keys(t.items).length;

test('el catálogo tiene medidas positivas y sin ids repetidos', () => {
  assert.equal(new Set(CATALOGO_BASE.map((c) => c.id)).size, CATALOGO_BASE.length);
  CATALOGO_BASE.forEach((c) => {
    assert.ok(c.ancho > 0 && c.alto > 0 && c.prof > 0, c.id);
  });
});

test('todas las preselecciones usan componentes que existen', () => {
  PRESELECCIONES.forEach((p) => {
    const t = p.generar({});
    Object.values(t.items).forEach((it) => assert.ok(cat[it.comp], `${p.id}: ${it.comp}`));
    assert.ok(t.rieles.length > 0);
  });
});

test('enfriador de 5 unidades: cantidades por unidad', () => {
  const t = generarDesdePreseleccion('enfriador', { unidades: 5 });
  const cuenta = (c) => Object.values(t.items).filter((i) => i.comp === c).length;
  assert.equal(cuenta('gv2me08'), 5);
  assert.equal(cuenta('lc1e0910'), 10);
  assert.equal(cuenta('logo-230rce'), 5);
  assert.equal(cuenta('rxm-zocalo'), 6);
  assert.equal(cuenta('tvps1-40c'), 5);
  assert.equal(cuenta('ag-cn3r'), 5);
  assert.equal(cuenta('bornes-unidad'), 5);
  assert.equal(t.rieles.length, 5);
  assert.deepEqual(t.placa, { ancho: 700, alto: 950 });
});

test('enfriador de 5: acomodado por función entra completo y sin rojos', () => {
  const t = generarDesdePreseleccion('enfriador', { unidades: 5 });
  const r = acomodar(t, cat, 'equilibrado');
  const ev = evaluar(t, cat);
  assert.equal(enRieles(t), total(t));
  assert.equal(t.sinUbicar.length, 0);
  assert.equal(ev.cuenta.pasado, 0, r.texto);
  assert.ok(r.ok);
  // la cabecera y los guardamotores quedan en el primer riel, la bornera en el último
  const comps = (i) => t.rieles[i].items.map((id) => t.items[id].comp);
  assert.ok(comps(0).includes('easy9-mcb-4p') && comps(0).includes('gv2me08'));
  assert.ok(comps(4).every((c) => cat[c].grupo === 'bornera'));
  assert.ok(comps(1).includes('logo-230rce'));
});

test('enfriador de 2 y de 4: entra todo', () => {
  [2, 4].forEach((n) => {
    const t = generarDesdePreseleccion('enfriador', { unidades: n });
    acomodar(t, cat, 'equilibrado');
    const ev = evaluar(t, cat);
    assert.equal(ev.cuenta.pasado, 0, `${n} unidades`);
    assert.equal(t.sinUbicar.length, 0);
  });
});

test('si la placa es chica, los últimos aparatos quedan en rojo y avisa cuánto falta', () => {
  const t = generarDesdePreseleccion('enfriador', { unidades: 5 });
  t.placa.ancho = 500;
  const r = acomodar(t, cat, 'equilibrado');
  const ev = evaluar(t, cat);
  assert.equal(r.ok, false);
  assert.ok(ev.cuenta.pasado > 0);
  assert.equal(ev.estado, 'pasado');
  assert.match(r.texto, /no entra/);
  // en cada riel pasado, los rojos son los del final
  ev.rieles.filter((x) => x.estado === 'pasado').forEach((x) => {
    const estados = x.items.map((e) => e.estado === 'pasado');
    const primero = estados.indexOf(true);
    if (primero >= 0) assert.ok(estados.slice(primero).every(Boolean));
  });
});

test('riel justo: amarillo cuando sobra menos de un módulo', () => {
  const t = tableroBase();
  t.placa = { ancho: 300, alto: 300 };
  agregarRiel(t);
  const cap = geometria(t).rieles[0].largo; // 300 - 2*(10+40) = 200
  assert.equal(cap, 200);
  const a = agregarItem(t, 'modulo-72');
  const b = agregarItem(t, 'modulo-72');
  const c = agregarItem(t, 'modulo-36');
  [a, b, c].forEach((it) => moverItem(t, it.id, 0, null));
  let ev = evaluar(t, cat); // 180 de 200: sobran 20 -> ok
  assert.equal(ev.rieles[0].estado, 'ok');
  assert.equal(ev.rieles[0].libre, 20);
  const d = agregarItem(t, 'modulo-18');
  moverItem(t, d.id, 0, null);
  ev = evaluar(t, cat); // 198 de 200: sobran 2 -> justo
  assert.equal(ev.rieles[0].estado, 'justo');
  assert.equal(ev.porItem[d.id].estado, 'justo');
  assert.equal(ev.porItem[a.id].estado, 'ok');
  const e = agregarItem(t, 'modulo-18');
  moverItem(t, e.id, 0, null);
  ev = evaluar(t, cat); // 216 de 200: se pasa 16 -> rojo solo el último
  assert.equal(ev.rieles[0].estado, 'pasado');
  assert.equal(ev.porItem[e.id].estado, 'pasado');
  assert.equal(ev.porItem[d.id].estado, 'ok');
  assert.match(ev.porItem[e.id].motivos[0], /se pasa 16 mm/);
});

test('la separación manual cuenta en la ocupación', () => {
  const t = tableroBase();
  t.placa = { ancho: 300, alto: 300 };
  agregarRiel(t);
  const a = agregarItem(t, 'modulo-72');
  moverItem(t, a.id, 0, 0);
  t.items[a.id].sep = 25;
  const ev = evaluar(t, cat);
  assert.equal(ev.rieles[0].ocupado, 97);
  assert.equal(ev.porItem[a.id].x, 25);
});

test('alto: choca con el cablecanal en rojo, cerca en amarillo', () => {
  const t = tableroBase();
  t.placa = { ancho: 400, alto: 180 }; // fila: 180 - 20 - 80 = 80 mm
  agregarRiel(t);
  assert.equal(geometria(t).altoFila, 80);
  const alto = agregarItem(t, 'logo-230rce'); // 90 de alto -> no entra
  const justo = agregarItem(t, 'lc1e0910'); // 74 -> quedan 3 mm por lado
  const bien = agregarItem(t, 'bornes-unidad'); // 50 -> 15 por lado
  [alto, justo, bien].forEach((it) => moverItem(t, it.id, 0, null));
  const ev = evaluar(t, cat);
  assert.equal(ev.porItem[alto.id].estado, 'pasado');
  assert.equal(ev.porItem[justo.id].estado, 'justo');
  assert.equal(ev.porItem[bien.id].estado, 'ok');
});

test('profundidad: avisa si no cierra la puerta', () => {
  const t = tableroBase();
  agregarRiel(t);
  t.profUtil = 90;
  const gm = agregarItem(t, 'gv2me08'); // 97 de profundidad
  const ct = agregarItem(t, 'lc1e0910'); // 80
  [gm, ct].forEach((it) => moverItem(t, it.id, 0, null));
  const ev = evaluar(t, cat);
  assert.equal(ev.porItem[gm.id].estado, 'pasado');
  assert.equal(ev.porItem[ct.id].estado, 'ok');
});

test('mover, reordenar y quitar', () => {
  const t = tableroBase();
  agregarRiel(t); agregarRiel(t);
  const [a, b, c] = ['modulo-18', 'modulo-36', 'modulo-72'].map((x) => agregarItem(t, x));
  [a, b, c].forEach((it) => moverItem(t, it.id, 0, null));
  assert.deepEqual(t.rieles[0].items, [a.id, b.id, c.id]);
  moverItem(t, a.id, 0, 3); // al final del mismo riel
  assert.deepEqual(t.rieles[0].items, [b.id, c.id, a.id]);
  moverItem(t, c.id, 1, 0); // a otro riel
  assert.deepEqual(t.rieles[1].items, [c.id]);
  assert.deepEqual(ubicacionDe(t, c.id), { riel: 1, indice: 0 });
  moverItem(t, b.id, -1, null); // de vuelta a "sin ubicar"
  assert.deepEqual(t.sinUbicar, [b.id]);
  quitarItem(t, a.id);
  assert.equal(t.items[a.id], undefined);
  assert.deepEqual(t.rieles[0].items, []);
  const ev = evaluar(t, cat);
  assert.equal(indiceEnX(ev.rieles[1], 10), 0);
  assert.equal(indiceEnX(ev.rieles[1], 60), 1);
});

test('los tres modos ubican todo cuando el lugar alcanza', () => {
  MODOS.forEach((m) => {
    const t = generarDesdePreseleccion('enfriador', { unidades: 5 });
    acomodar(t, cat, m.id);
    const ev = evaluar(t, cat);
    assert.equal(enRieles(t) + t.sinUbicar.length, total(t), m.id);
    assert.equal(ev.cuenta.pasado, 0, m.id);
  });
});

test('máximo aprovechamiento deja sin ubicar lo que no entra en ningún riel', () => {
  const t = tableroBase();
  t.placa = { ancho: 200, alto: 300 }; // riel de 100 mm
  agregarRiel(t);
  ['modulo-72', 'modulo-72', 'modulo-18'].forEach((x) => agregarItem(t, x));
  const r = acomodar(t, cat, 'aprovechar');
  assert.equal(t.rieles[0].items.length, 2); // 72 + 18
  assert.equal(t.sinUbicar.length, 1);
  assert.equal(r.ok, false);
});

test('riel fuera del marco usa todo el ancho de la placa', () => {
  const t = generarDesdePreseleccion('enfriador', { unidades: 5 });
  const g = geometria(t);
  assert.equal(g.rieles[0].largo, 600);
  assert.equal(g.rieles[4].largo, 680);
  assert.ok(g.rieles[4].fueraDelMarco);
  assert.ok(g.altoFila > 100);
});

test('lista de materiales y CSV', () => {
  const t = generarDesdePreseleccion('enfriador', { unidades: 2 });
  const lm = listaMateriales(t, cat);
  assert.equal(lm.find((f) => f.comp.id === 'lc1e0910').cantidad, 4);
  assert.equal(lm.reduce((s, f) => s + f.cantidad, 0), total(t));
  const csv = materialesCSV(t, cat);
  assert.ok(csv.includes('"Contactor 9 A"'));
  assert.equal(fmt(17.5), '17,5');
  assert.equal(fmt(72), '72');
});

// ---------------------------------------------------------------------------
// Casos encontrados en la revisión de la app
// ---------------------------------------------------------------------------
test('lo que queda sin ubicar y no entra en ningún riel cuenta como "no entra"', () => {
  const t = tableroBase();
  t.placa = { ancho: 200, alto: 300 }; // riel de 100 mm
  agregarRiel(t);
  ['modulo-72', 'modulo-72', 'modulo-18'].forEach((x) => agregarItem(t, x));
  const r = acomodar(t, cat, 'aprovechar');
  const ev = evaluar(t, cat);
  assert.equal(t.sinUbicar.length, 1);
  assert.equal(ev.afuera, 1);
  assert.equal(ev.estado, 'pasado');
  assert.equal(r.ok, false);
  assert.equal(r.estado, 'pasado');
  assert.match(r.texto, /1 aparato no entra/);
  // si hay lugar para ubicarlo a mano, queda en amarillo y no en rojo
  const t2 = tableroBase();
  agregarRiel(t2);
  agregarItem(t2, 'modulo-18');
  const ev2 = evaluar(t2, cat);
  assert.equal(ev2.afuera, 0);
  assert.equal(ev2.estado, 'justo');
});

test('el modo "llenando" no amontona en el último riel lo que entra en orden', () => {
  const t = generarDesdePreseleccion('enfriador', { unidades: 5 });
  t.placa.ancho = 660;
  acomodar(t, cat, 'compacto');
  assert.equal(evaluar(t, cat).cuenta.pasado, 0);
  const m = generarDesdePreseleccion('motores', { motores: 7 });
  acomodar(m, cat, 'compacto');
  assert.equal(evaluar(m, cat).cuenta.pasado, 0);
});

test('el modo recomendado usa el lugar libre del riel de bornera si hace falta', () => {
  [660, 650].forEach((ancho) => {
    const t = generarDesdePreseleccion('enfriador', { unidades: 5 });
    t.placa.ancho = ancho;
    const r = acomodar(t, cat, 'equilibrado');
    assert.equal(evaluar(t, cat).noEntran, 0, `ancho ${ancho}: ${r.texto}`);
  });
  // y los bornes que no entran en su riel pasan a los otros
  const b = tableroBase();
  b.placa = { ancho: 300, alto: 500 };
  b.canalAbajo = false;
  for (let i = 0; i < 3; i += 1) agregarRiel(b);
  for (let i = 0; i < 4; i += 1) agregarItem(b, 'bornes-unidad');
  acomodar(b, cat, 'equilibrado');
  assert.equal(evaluar(b, cat).noEntran, 0);
});

test('riel con largo cargado a mano: se centra y no avisa de más', () => {
  const t = tableroBase();
  t.placa = { ancho: 600, alto: 600 };
  for (let i = 0; i < 3; i += 1) agregarRiel(t);
  t.rieles[0].largo = 600;
  const g = geometria(t);
  assert.equal(g.rieles[0].x0, 0);
  assert.equal(g.rieles[1].x0, 50);
  let ev = evaluar(t, cat);
  assert.equal(ev.rieles[0].estado, 'ok');
  t.rieles[0].largo = 560;
  assert.equal(geometria(t).rieles[0].x0, 20);
  t.rieles[0].largo = 650; // más largo que la placa: ahí sí avisa
  ev = evaluar(t, cat);
  assert.equal(ev.rieles[0].estado, 'pasado');
  assert.equal(ev.estado, 'pasado');
});

test('preselección de motores: cada función en el riel de su nombre, para cualquier cantidad', () => {
  [4, 6, 9, 12].forEach((m) => {
    const t = generarDesdePreseleccion('motores', { motores: m });
    acomodar(t, cat, 'equilibrado');
    const ev = evaluar(t, cat);
    assert.equal(ev.noEntran, 0, `${m} motores`);
    const grupos = (i) => new Set(t.rieles[i].items.map((id) => cat[t.items[id].comp].grupo));
    assert.ok(grupos(2).has('guardamotor') && grupos(2).size === 1, `${m}: riel de guardamotores`);
    assert.ok(grupos(1).has('contactor') && !grupos(1).has('guardamotor'));
    assert.ok(grupos(3).has('bornera') && grupos(3).size === 1);
  });
});

test('con pocas funciones se llenan primero los rieles de arriba', () => {
  const t = tableroBase();
  for (let i = 0; i < 3; i += 1) agregarRiel(t);
  agregarItem(t, 'easy9-mcb-4p');
  for (let i = 0; i < 4; i += 1) agregarItem(t, 'jieli-c2');
  acomodar(t, cat, 'equilibrado');
  assert.ok(t.rieles[0].items.length > 0);
  assert.equal(t.rieles[2].items.length, 0);
});

test('enfriador de 1 y 2 unidades entra con cualquier combinación de opciones', () => {
  for (const n of [1, 2]) for (const fases of [false, true]) for (const shelly of [false, true]) for (const barraPE of [false, true]) for (const alarma of [false, true]) {
    const t = generarDesdePreseleccion('enfriador', { unidades: n, fases, shelly, barraPE, alarma });
    acomodar(t, cat, 'equilibrado');
    assert.equal(evaluar(t, cat).noEntran, 0, JSON.stringify({ n, fases, shelly, barraPE, alarma }));
  }
});

test('el mensaje distingue largo, alto y profundidad', () => {
  const t = generarDesdePreseleccion('enfriador', { unidades: 5 });
  t.profUtil = 90;
  const r = acomodar(t, cat, 'equilibrado');
  assert.match(r.texto, /no dejan cerrar la puerta/);
  assert.doesNotMatch(r.texto, /otro modo/);
  const a = tableroBase();
  a.placa = { ancho: 600, alto: 400 };
  for (let i = 0; i < 5; i += 1) agregarRiel(a);
  agregarItem(a, 'jieli-c2');
  const ra = acomodar(a, cat, 'equilibrado');
  assert.match(ra.texto, /choca con el cablecanal/);
});

test('acomodar nunca pierde ni duplica aparatos', () => {
  for (const n of [1, 3, 5, 8]) for (const m of MODOS) for (const ancho of [300, 500, 700]) {
    const t = generarDesdePreseleccion('enfriador', { unidades: n });
    t.placa.ancho = ancho;
    t.rieles.forEach((r) => { r.largo = null; delete r.x0; });
    acomodar(t, cat, m.id);
    const todos = [...t.rieles.flatMap((r) => r.items), ...t.sinUbicar];
    assert.equal(todos.length, Object.keys(t.items).length);
    assert.equal(new Set(todos).size, todos.length);
  }
});
