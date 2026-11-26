// Pruebas de las funciones tomadas de otros programas de tableros.
import test from 'node:test';
import assert from 'node:assert/strict';
import { CATALOGO_BASE } from '../js/catalogo.js';
import { generarDesdePreseleccion, tableroBase, agregarRiel, agregarItem } from '../js/plantillas.js';
import { evaluar, acomodar, geometria, compDe } from '../js/layout.js';
import { listaDeCorte, placaMinima, tirasDeCarteles, ocupacion, modulosLibres, costo, agregarUnidad, puedeAgregarUnidad, materialesDeMontaje, textoPedido, renumerar, placasPorRieles } from '../js/extras.js';

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
  // 2 verticales que cubren las 4 filas del marco; arriba y abajo, 2 horizontales a todo el ancho (680);
  // los 3 horizontales del medio van entre los verticales (680 menos dos anchos de canal)
  const h = lc.canal.piezas.find((p) => p.largo === 680);
  assert.equal(h.cantidad, 2);
  const medio = lc.canal.piezas.find((p) => p.largo === 600);
  assert.equal(medio.cantidad, 3);
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

test('un aparato fijado no cambia de riel al acomodar, en ningún modo', () => {
  for (const modo of ['equilibrado', 'compacto', 'aprovechar']) {
    const t = generarDesdePreseleccion('enfriador', { unidades: 5 });
    acomodar(t, cat, 'equilibrado');
    // se lleva un relé de control al riel de contactores y se lo fija ahí, con separación
    const origen = t.rieles.findIndex((r) => r.items.some((id) => t.items[id].comp === 'baw-ptd2'));
    const id = t.rieles[origen].items.find((x) => t.items[x].comp === 'baw-ptd2');
    const destino = origen === 3 ? 2 : 3;
    t.rieles[origen].items = t.rieles[origen].items.filter((x) => x !== id);
    t.rieles[destino].items.push(id);
    t.items[id].fijo = true;
    t.items[id].sep = 6;
    const antes = Object.keys(t.items).length;
    const res = acomodar(t, cat, modo);
    assert.ok(t.rieles[destino].items.includes(id), `${modo}: sigue en su riel`);
    assert.equal(t.items[id].sep, 6, `${modo}: conserva su separación`);
    assert.equal(res.fijados, 1);
    // no se pierde ni se duplica ningún aparato
    const ubicados = t.rieles.flatMap((r) => r.items).concat(t.sinUbicar);
    assert.equal(ubicados.length, antes);
    assert.equal(new Set(ubicados).size, antes);
    // el resto se acomoda contando el lugar que ocupa el fijado: nada se pasa
    assert.equal(evaluar(t, cat).cuenta.pasado, 0, `${modo}: no se pasa ningún riel`);
  }
});

test('sin el fijado, acomodar lo devuelve con los de su función', () => {
  const t = generarDesdePreseleccion('enfriador', { unidades: 5 });
  acomodar(t, cat, 'equilibrado');
  const origen = t.rieles.findIndex((r) => r.items.some((id) => t.items[id].comp === 'baw-ptd2'));
  const id = t.rieles[origen].items.find((x) => t.items[x].comp === 'baw-ptd2');
  t.rieles[origen].items = t.rieles[origen].items.filter((x) => x !== id);
  t.rieles[origen === 3 ? 2 : 3].items.push(id);
  acomodar(t, cat, 'equilibrado');
  assert.ok(t.rieles[origen].items.includes(id));
});

test('un fijado que no está en ningún riel se acomoda como cualquiera', () => {
  const t = generarDesdePreseleccion('enfriador', { unidades: 2 });
  const id = Object.keys(t.items)[0];
  t.rieles.forEach((r) => { r.items = r.items.filter((x) => x !== id); });
  if (!t.sinUbicar.includes(id)) t.sinUbicar.push(id);
  t.items[id].fijo = true;
  const res = acomodar(t, cat, 'equilibrado');
  assert.equal(res.fijados, 0);
  assert.ok(t.rieles.some((r) => r.items.includes(id)));
});

test('materiales de montaje y pedido', () => {
  const t = generarDesdePreseleccion('enfriador', { unidades: 5 });
  acomodar(t, cat, 'equilibrado');
  const m = materialesDeMontaje(t);
  assert.equal(m.length, 2);
  assert.equal(m[0].cantidad, listaDeCorte(t).riel.barras.length);
  assert.equal(m[1].cantidad, listaDeCorte(t).canal.barras.length);
  const pedido = textoPedido(t, cat);
  assert.match(pedido, /Montaje:/);
  assert.match(pedido, /Riel DIN 35 mm/);
  assert.match(pedido, /Cablecanal 40 × 60 mm/);
  // para una serie de 3 tableros las barras se calculan para los 3
  t.cantidad = 3;
  assert.ok(materialesDeMontaje(t)[0].cantidad >= m[0].cantidad * 2);
});

// ---------------------------------------------------------------------------
// Casos que encontró la revisión del código
// ---------------------------------------------------------------------------
test('los cortes de cablecanal no se pisan: suman lo mismo que lo dibujado', () => {
  for (const unidades of [1, 2, 3, 5, 8]) {
    const t = generarDesdePreseleccion('enfriador', { unidades });
    const g = geometria(t);
    const dibujado = g.canales.reduce((s, c) => s + (c.tipo === 'h' ? c.w : c.h), 0);
    // cada vertical unido pasa por encima de los horizontales que cruza: ahí se cuenta una sola vez
    const lc = listaDeCorte(t);
    const cruces = g.canales.filter((c) => c.tipo === 'h').length;
    assert.ok(lc.canal.total <= dibujado + cruces * 2 * g.c + 0.01, `${unidades} unidades: no sobra canal`);
    lc.canal.piezas.forEach((p) => assert.ok(p.largo > 0));
  }
});

test('sin ubicar: dos aparatos no cuentan el mismo hueco', () => {
  const t = tableroBase('prueba');
  t.placa = { ancho: 300, alto: 300 };
  agregarRiel(t, 'Riel 1');
  const g = geometria(t);
  const largo = g.rieles[0].largo;
  // se llena el riel dejando lugar para un solo guardamotor de 45 mm
  let usado = 0;
  while (usado + 18 <= largo - 50) { const it = agregarItem(t, 'jieli-c2'); t.rieles[0].items.push(it.id); t.sinUbicar = t.sinUbicar.filter((x) => x !== it.id); usado += 18; }
  agregarItem(t, 'gv2me08');
  agregarItem(t, 'gv2me08');
  const ev = evaluar(t, cat);
  assert.equal(ev.sinUbicar.length, 2);
  assert.equal(ev.sinUbicar.filter((e) => e.entra).length, 1, 'solo uno de los dos entra');
  assert.equal(ev.afuera, 1);
  assert.equal(ev.estado, 'pasado');
});

test('la placa mínima no depende de la reserva guardada y cumple la que se pide', () => {
  const pedir = (guardada) => {
    const t = generarDesdePreseleccion('enfriador', { unidades: 5 });
    acomodar(t, cat, 'equilibrado');
    t.reserva = guardada;
    return placasPorRieles(t, cat, { reserva: 20 }).map((o) => `${o.ancho}x${o.alto}`).join(' ');
  };
  assert.equal(pedir(0), pedir(20));
  assert.equal(pedir(0), pedir(30));
  // al usar la propuesta, todos los rieles con aparatos dejan el 20 % libre
  const t = generarDesdePreseleccion('enfriador', { unidades: 5 });
  const o = placasPorRieles(t, cat, { reserva: 20 }).find((x) => x.actual);
  t.placa.ancho = o.ancho;
  t.reserva = 20;
  acomodar(t, cat, 'equilibrado');
  const ev = evaluar(t, cat);
  assert.equal(ev.sinUbicar.length, 0);
  ev.rieles.forEach((r) => { if (r.items.length) assert.ok(r.libre >= r.largo * 0.2 - 0.05, `riel ${r.indice + 1}: ${r.libre} de ${r.largo}`); });
  // y 10 mm menos ya no alcanza
  const menos = placaMinima(t, cat, { reserva: 20 });
  assert.equal(menos.ancho, o.ancho);
});

test('la placa mínima respeta los rieles con largo cargado a mano', () => {
  // en el enfriador de 2 unidades el tercer riel se extiende sobre el cablecanal izquierdo
  const t = generarDesdePreseleccion('enfriador', { unidades: 2 });
  acomodar(t, cat, 'equilibrado');
  assert.equal(evaluar(t, cat).noEntran, 0);
  assert.ok(t.rieles.some((r) => r.largo != null));
  const o = placasPorRieles(t, cat, { reserva: 0 }).find((x) => x.actual);
  assert.ok(o.sobraAncho >= 0, `la placa actual alcanza (sobran ${o.sobraAncho})`);
});

test('renumerar: un prefijo compartido por modelos distintos se numera de corrido', () => {
  const t = tableroBase('prueba');
  agregarRiel(t, 'Riel 1');
  const poner = (comp, etiqueta) => { const it = agregarItem(t, comp, etiqueta); t.sinUbicar = t.sinUbicar.filter((x) => x !== it.id); t.rieles[0].items.push(it.id); return it; };
  const q = [poner('easy9-mcb-4p', 'Q1'), poner('pln6-c10', 'Q2'), poner('jieli-c2', 'Q3'), poner('jieli-c4', 'Q4')];
  const k = [poner('lc1e0910', 'K4'), poner('cmb025', 'K7'), poner('lc1e0910', 'K9')];
  const sueltos = [poner('jieli-c2', 'C2'), poner('pln6-c10', 'FUENTE 24')];
  renumerar(t);
  assert.deepEqual(q.map((x) => x.etiqueta), ['Q1', 'Q2', 'Q3', 'Q4']);
  assert.deepEqual(k.map((x) => x.etiqueta), ['K1', 'K2', 'K3']);
  assert.deepEqual(sueltos.map((x) => x.etiqueta), ['C2', 'FUENTE 24'], 'los rótulos únicos con número no se tocan');
  // el mismo rótulo en dos modelos (guardamotor y su contactor) se sigue numerando por modelo
  const e = generarDesdePreseleccion('enfriador', { unidades: 3 });
  acomodar(e, cat, 'equilibrado');
  assert.equal(renumerar(e), 0);
});

test('un id con nombre heredado de Object no pasa por componente', () => {
  for (const id of ['constructor', 'toString', '__proto__', 'hasOwnProperty']) {
    const c = compDe(cat, id);
    assert.equal(c.desconocido, true);
    assert.equal(typeof c.ancho, 'number');
  }
});

test('máximo aprovechamiento encuentra el reparto cuando existe', () => {
  const t = tableroBase('prueba');
  t.placa = { ancho: 260, alto: 700 };
  t.margen = 10; t.canal = { ancho: 40, alto: 60 };
  ['Riel 1', 'Riel 2', 'Riel 3'].forEach((n) => agregarRiel(t, n));
  const largo = geometria(t).rieles[0].largo;
  assert.equal(largo, 160);
  const propio = { ...cat };
  [72, 72, 54, 45, 45, 36, 36, 35, 18, 18, 18].forEach((ancho, i) => {
    propio[`x${i}`] = { id: `x${i}`, nombre: `X${i}`, marca: '', ref: '', ancho, alto: 80, prof: 60, grupo: 'otros', color: '#ccc', medida: 'medida' };
    agregarItem(t, `x${i}`);
  });
  const res = acomodar(t, propio, 'aprovechar');
  assert.equal(t.sinUbicar.length, 0, res.texto);
  assert.equal(evaluar(t, propio).noEntran, 0);
});

test('llenando de arriba hacia abajo saltea un riel donde el aparato no entra', () => {
  const t = tableroBase('prueba');
  t.placa = { ancho: 600, alto: 600 };
  ['Riel 1', 'Riel 2', 'Riel 3'].forEach((n) => agregarRiel(t, n));
  t.rieles[1].largo = 60;
  for (let i = 0; i < 5; i += 1) agregarItem(t, 'gv2me08');
  for (let i = 0; i < 4; i += 1) agregarItem(t, 'logo-230rce');
  acomodar(t, cat, 'compacto');
  assert.equal(evaluar(t, cat).noEntran, 0);
});
