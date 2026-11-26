// Pruebas de las funciones tomadas de otros programas de tableros.
import test from 'node:test';
import assert from 'node:assert/strict';
import { CATALOGO_BASE } from '../js/catalogo.js';
import { generarDesdePreseleccion, tableroBase, agregarRiel, agregarItem } from '../js/plantillas.js';
import { evaluar, acomodar, geometria } from '../js/layout.js';
import { listaDeCorte, placaMinima, tirasDeCarteles, ocupacion, modulosLibres, costo, agregarUnidad, puedeAgregarUnidad } from '../js/extras.js';

const cat = Object.fromEntries(CATALOGO_BASE.map((c) => [c.id, c]));

test('módulos libres', () => {
  assert.equal(modulosLibres(38), 2);
  assert.equal(modulosLibres(17.9), 0);
  assert.equal(modulosLibres(18), 1);
  assert.equal(modulosLibres(-5), 0);
});

test('lista de corte del tablero de 5 unidades', () => {
  const t = generarDesdePreseleccion('enfriador', { unidades: 5 });
  const lc = listaDeCorte(t);
  // 4 rieles de 600 dentro del marco y 1 de 680 para la bornera
  assert.deepEqual(lc.riel.piezas.map((p) => [p.largo, p.cantidad]), [[680, 1], [600, 4]]);
  assert.equal(lc.riel.total, 3080);
  assert.equal(lc.riel.barras.length, 2); // 3080 mm no entran en una barra de 2 m
  // 5 tramos horizontales de 680 y 2 verticales que cubren las 4 filas del marco
  const h = lc.canal.piezas.find((p) => p.largo === 680);
  assert.equal(h.cantidad, 5);
  const g = geometria(t);
  const vertical = 4 * g.altoFila + 3 * 40;
  const v = lc.canal.piezas.find((p) => Math.abs(p.largo - vertical) < 0.01);
  assert.ok(v, 'tramo vertical único por lado');
  assert.equal(v.cantidad, 2);
  // serie de 3 tableros: todo por tres
  const lc3 = listaDeCorte(t, { cantidad: 3 });
  assert.equal(lc3.riel.total, 3080 * 3);
  assert.ok(lc3.riel.barras.every((b) => b.usado <= 2000.05));
});

test('una pieza más larga que la barra queda señalada', () => {
  const t = tableroBase();
  t.placa = { ancho: 2600, alto: 300 };
  agregarRiel(t);
  const lc = listaDeCorte(t);
  assert.ok(lc.riel.barras[0].excede);
});

test('placa mínima: entra todo y con un poco menos ya no', () => {
  const t = generarDesdePreseleccion('enfriador', { unidades: 5 });
  acomodar(t, cat, 'equilibrado');
  const pm = placaMinima(t, cat);
  assert.ok(pm.ancho <= 700, `ancho mínimo ${pm.ancho}`);
  assert.ok(pm.ancho >= 600);
  const prueba = (ancho) => {
    const p = JSON.parse(JSON.stringify(t));
    p.placa.ancho = ancho;
    acomodar(p, cat, 'equilibrado');
    return evaluar(p, cat).cuenta.pasado;
  };
  assert.equal(prueba(pm.ancho), 0);
  assert.ok(prueba(pm.ancho - 20) > 0);
  // con reserva hace falta una placa más ancha
  const pr = placaMinima(t, cat, { reserva: 20 });
  assert.ok(pr.ancho > pm.ancho);
  // no modifica el tablero original
  assert.equal(t.placa.ancho, 700);
});

test('placa mínima: el alto alcanza para el aparato más alto', () => {
  const t = generarDesdePreseleccion('enfriador', { unidades: 2 });
  const pm = placaMinima(t, cat);
  const p = JSON.parse(JSON.stringify(t));
  p.placa.alto = pm.alto;
  const g = geometria(p);
  assert.ok(g.altoFila >= 90 + 2 * p.holguraCanal - 0.01);
});

test('tiras de carteles: un cartel por aparato con su ancho', () => {
  const t = generarDesdePreseleccion('enfriador', { unidades: 2 });
  acomodar(t, cat, 'equilibrado');
  const ev = evaluar(t, cat);
  const tiras = tirasDeCarteles(ev);
  assert.equal(tiras.length, 3);
  assert.equal(tiras.reduce((s, x) => s + x.carteles.length, 0), Object.keys(t.items).length);
  const gm = tiras[0].carteles.find((c) => c.texto === 'SOP1');
  assert.equal(gm.ancho, 45);
});

test('ocupación y costo', () => {
  const t = generarDesdePreseleccion('enfriador', { unidades: 5 });
  acomodar(t, cat, 'equilibrado');
  const o = ocupacion(evaluar(t, cat));
  assert.equal(o.capacidad, 3080);
  assert.ok(o.porcentaje > 80 && o.porcentaje < 95);
  assert.ok(Math.abs(o.porcentaje + o.reserva - 100) < 0.001);
  const conPrecio = { ...cat, lc1e0910: { ...cat.lc1e0910, precio: 100 } };
  const c = costo(t, conPrecio);
  assert.equal(c.total, 1000);
  assert.equal(c.conPrecio, 10);
});

test('agregar una unidad más', () => {
  const t = generarDesdePreseleccion('enfriador', { unidades: 4 });
  assert.ok(puedeAgregarUnidad(t));
  const antes = Object.keys(t.items).length;
  const r = agregarUnidad(t);
  assert.equal(r.unidad, 5);
  assert.equal(Object.keys(t.items).length, antes + 10);
  assert.equal(t.preseleccion.unidades, 5);
  assert.match(t.nombre, /5 unidades/);
  const cuenta = (c) => Object.values(t.items).filter((i) => i.comp === c).length;
  assert.equal(cuenta('lc1e0910'), 10);
  assert.equal(cuenta('logo-230rce'), 5);
  assert.equal(puedeAgregarUnidad(tableroBase()), false);
});

test('renumerar en orden de lectura, por componente y prefijo', async () => {
  const { renumerar } = await import('../js/extras.js');
  const { colocarItem } = await import('../js/layout.js');
  const t = generarDesdePreseleccion('enfriador', { unidades: 3 });
  acomodar(t, cat, 'equilibrado');
  // se invierte el orden de los guardamotores
  const gms = t.rieles[0].items.filter((id) => t.items[id].comp === 'gv2me08');
  const pos = t.rieles[0].items.indexOf(gms[0]);
  colocarItem(t, gms[2], 0, pos);
  assert.deepEqual(t.rieles[0].items.filter((id) => t.items[id].comp === 'gv2me08').map((id) => t.items[id].etiqueta), ['SOP3', 'SOP1', 'SOP2']);
  const cambios = renumerar(t);
  assert.equal(cambios, 3);
  assert.deepEqual(t.rieles[0].items.filter((id) => t.items[id].comp === 'gv2me08').map((id) => t.items[id].etiqueta), ['SOP1', 'SOP2', 'SOP3']);
  // los contactores SOP conservan su propia numeración
  const cont = Object.values(t.items).filter((i) => i.comp === 'lc1e0910' && /^SOP/.test(i.etiqueta)).map((i) => i.etiqueta).sort();
  assert.deepEqual(cont, ['SOP1', 'SOP2', 'SOP3']);
  assert.equal(renumerar(t), 0);
});

test('placa necesaria con un riel menos, igual y uno más', async () => {
  const { placasPorRieles, conRieles } = await import('../js/extras.js');
  const t = generarDesdePreseleccion('enfriador', { unidades: 5 });
  acomodar(t, cat, 'equilibrado');
  const ops = placasPorRieles(t, cat);
  assert.deepEqual(ops.map((o) => o.rieles), [4, 5, 6]);
  assert.ok(ops[0].ancho > ops[1].ancho && ops[1].ancho > ops[2].ancho, 'menos rieles, placa más ancha');
  assert.ok(ops[0].alto < ops[1].alto && ops[1].alto < ops[2].alto, 'menos rieles, placa más baja');
  assert.ok(ops[1].actual);
  const p = conRieles(t, 6);
  assert.equal(p.rieles.length, 6);
  assert.equal(p.rieles[5].nombre, 'Bornera');
  assert.equal(conRieles(t, 3).rieles.length, 3);
  assert.equal(t.rieles.length, 5);
});

test('texto del pedido agrupado por marca y multiplicado por la serie', async () => {
  const { textoPedido } = await import('../js/extras.js');
  const t = generarDesdePreseleccion('enfriador', { unidades: 2 });
  t.cantidad = 3;
  const txt = textoPedido(t, cat);
  assert.match(txt, /3 tableros/);
  assert.match(txt, /Schneider:/);
  assert.match(txt, /12 × Contactor 9 A/);
});

test('reserva de espacio: amarillo aunque sobre más de un módulo', async () => {
  const { umbralDe } = await import('../js/layout.js');
  const t = generarDesdePreseleccion('enfriador', { unidades: 5 });
  acomodar(t, cat, 'equilibrado');
  assert.equal(evaluar(t, cat).estado, 'ok');
  t.reserva = 20;
  assert.equal(umbralDe(t, 600), 120);
  const ev = evaluar(t, cat);
  assert.equal(ev.estado, 'justo');
  assert.equal(ev.cuenta.pasado, 0);
  assert.match(ev.rieles[0].mensajes[0], /reserva pedida es de 120 mm/);
});

test('agregar una unidad deja juntos los componentes iguales al acomodar', () => {
  const t = generarDesdePreseleccion('enfriador', { unidades: 4 });
  acomodar(t, cat, 'equilibrado');
  agregarUnidad(t);
  t.placa = { ancho: 700, alto: 950 };
  acomodar(t, cat, 'equilibrado');
  const etiquetas = (c) => t.rieles.flatMap((r) => r.items).filter((id) => t.items[id].comp === c).map((id) => t.items[id].etiqueta);
  assert.deepEqual(etiquetas('gv2me08'), ['SOP1', 'SOP2', 'SOP3', 'SOP4', 'SOP5']);
  assert.deepEqual(etiquetas('lc1e0910'), ['SOP1', 'BOM1', 'SOP2', 'BOM2', 'SOP3', 'BOM3', 'SOP4', 'BOM4', 'SOP5', 'BOM5']);
  assert.equal(evaluar(t, cat).cuenta.pasado, 0);
});
