// Preselecciones: "para tal máquina van todos estos componentes".
// Cada preselección arma un tablero completo (placa, rieles y lista de componentes) a partir de pocos datos.
// Las medidas de placa son ESTIMADAS a partir de fotos: hay que reemplazarlas por las reales.

let contador = 0;
export function nuevoId(prefijo = 'i') {
  contador += 1;
  return `${prefijo}${Date.now().toString(36)}${contador.toString(36)}${Math.floor(Math.random() * 1296).toString(36)}`;
}

/** Tablero vacío con valores por defecto. */
export function tableroBase(nombre = 'Tablero nuevo') {
  return {
    id: nuevoId('t'),
    version: 1,
    nombre,
    placa: { ancho: 600, alto: 600 },
    canal: { ancho: 40, alto: 60 },
    margen: 10, // mm entre el borde de la placa y el cablecanal
    umbralJusto: 18, // si sobran menos mm que esto en un riel, avisa en amarillo (18 mm = un módulo)
    reserva: 0, // porcentaje de cada riel que tiene que quedar libre; por debajo avisa en amarillo
    cantidad: 1, // cuántos tableros iguales se van a armar (para compras y cortes)
    armado: {}, // aparatos ya montados en el tablero real: { idDelAparato: true }
    holguraCanal: 10, // mm mínimos entre un aparato y el cablecanal, arriba y abajo
    profUtil: 0, // profundidad libre hasta la puerta; 0 = no controlar
    canalAbajo: true, // cablecanal debajo del último riel
    rieles: [],
    items: {},
    sinUbicar: [],
    foto: null,
    fotoPropia: false,
    preseleccion: null,
    medidasEstimadas: false,
    notas: '',
  };
}

export function agregarRiel(t, nombre, largo = null) {
  const r = { id: nuevoId('r'), nombre: nombre || `Riel ${t.rieles.length + 1}`, largo, items: [] };
  t.rieles.push(r);
  return r;
}

/** Agrega un componente a la lista "sin ubicar" del tablero. */
export function agregarItem(t, comp, etiqueta = '') {
  const it = { id: nuevoId('i'), comp, etiqueta, sep: 0 };
  t.items[it.id] = it;
  t.sinUbicar.push(it.id);
  return it;
}

function varios(t, comp, n, etiqueta) {
  for (let i = 1; i <= n; i += 1) agregarItem(t, comp, typeof etiqueta === 'function' ? etiqueta(i) : etiqueta);
}

// ---------------------------------------------------------------------------
// Enfriador evaporativo MEC: por cada unidad, soplador + bomba + drenaje + nivel + PLC
// ---------------------------------------------------------------------------
function enfriador(p) {
  const n = Math.max(1, Math.min(12, Math.round(p.unidades || 1)));
  const chico = n <= 2;
  const op = {
    fases: p.fases ?? !chico,
    shelly: p.shelly ?? !chico,
    alarma: p.alarma ?? chico,
    barraPE: p.barraPE ?? !chico,
  };
  const t = tableroBase(`Enfriador evaporativo · ${n} ${n === 1 ? 'unidad' : 'unidades'}`);
  t.preseleccion = { id: 'enfriador', unidades: n, ...op };
  t.medidasEstimadas = true;

  // --- componentes, en orden de función ---
  agregarItem(t, 'easy9-mcb-4p', 'GENERAL');
  agregarItem(t, 'easy9-rccb-4p', 'DIFERENCIAL');
  agregarItem(t, 'jieli-407', 'DISTRIB.');
  varios(t, 'gv2me08', n, (i) => `SOP${i}`);
  if (op.fases) {
    agregarItem(t, 'c60n-4p', 'FASES');
    agregarItem(t, 'rut34', 'REL. FASES');
    agregarItem(t, 'cmb025', 'CONT.');
  }
  varios(t, 'pln6-c10', n, (i) => `BOMBA ${i}`);
  varios(t, 'jieli-c2', n, (i) => `DREN. ${i}`);
  agregarItem(t, 'jieli-c4', 'MANDO');
  if (op.alarma) agregarItem(t, 'jieli-c2', 'ALARMA');
  varios(t, 'logo-230rce', n, (i) => `PLC ${i}`);
  agregarItem(t, 'baw-ptd2', 'TEMP.');
  varios(t, 'tvps1-40c', n, (i) => `BOM${i}`);
  varios(t, 'ag-cn3r', n, (i) => `NIVEL ${i}`);
  if (op.shelly) agregarItem(t, 'shelly-gen4', 'SHELLY');
  varios(t, 'rxm-zocalo', n, (i) => `DREN. ${i}`);
  agregarItem(t, 'rxm-zocalo', 'ALARMA');
  if (op.barraPE) agregarItem(t, 'barra-pe', 'PE');
  for (let i = 1; i <= n; i += 1) {
    agregarItem(t, 'lc1e0910', `SOP${i}`);
    agregarItem(t, 'lc1e0910', `BOM${i}`);
  }
  ['R', 'S', 'T', 'N', 'PE'].forEach((e) => agregarItem(t, 'borne-acometida', e));
  varios(t, 'bornes-unidad', n, (i) => `UNIDAD ${i}`);
  agregarItem(t, 'bornes-comunes', 'COMUNES');
  agregarItem(t, 'tope-riel', '');

  // --- placa y rieles ---
  if (chico) {
    // Como el tablero de 2 unidades terminado: 3 rieles, bornera y contactores en el mismo riel.
    // El ancho sale del riel más cargado con las opciones elegidas (500 mm para 2 unidades sin opciones).
    t.margen = 5;
    const lados = 2 * (t.canal.ancho + t.margen);
    const fila1 = 211 + 45 * n + (op.fases ? 126 : 0) + 35.5 * n + 18 + (op.alarma ? 18 : 0);
    const fila2 = 71.5 * n + 36 + 70 * n + (op.shelly ? 48 : 0) + 27 * (n + 1);
    const fila3 = (op.barraPE ? 20 : 0) + 90 * n + 61 + 77 * n + 39; // este riel no lleva canal a la izquierda
    const ancho = Math.max(n === 2 ? 500 : 400, Math.ceil((Math.max(fila1 + lados, fila2 + lados, fila3 + lados - t.canal.ancho) + 2) / 10) * 10);
    t.placa = { ancho, alto: 540 };
    agregarRiel(t, 'Protecciones');
    agregarRiel(t, 'Control');
    const r3 = agregarRiel(t, 'Contactores y bornera', ancho - lados + t.canal.ancho);
    r3.x0 = t.margen;
    t.foto = n === 2 ? 'img/tableros/enfriador-2u.jpg' : null;
  } else {
    const fila1 = 211 + 45 * n + (op.fases ? 126 : 0);
    const fila2 = 107 * n + 18 + (op.alarma ? 18 : 0);
    const fila34 = (36 + 70 * n + (op.shelly ? 48 : 0) + 27 * (n + 1) + (op.barraPE ? 20 : 0) + 90 * n) / 2;
    const fila5 = 61 + 77 * n + 39;
    const util = Math.ceil((Math.max(fila1, fila2, fila34, fila5) + 18) / 10) * 10;
    const ancho = Math.ceil((util + 2 * (t.canal.ancho + t.margen)) / 50) * 50;
    const altoConocido = { 4: 800, 5: 950 };
    t.placa = { ancho, alto: altoConocido[n] || 950 };
    t.canalAbajo = false; // la bornera va en riel propio, sin canal debajo
    ['Cabecera', 'Térmicas y PLC', 'Control', 'Contactores', 'Bornera'].forEach((nom) => agregarRiel(t, nom));
    t.foto = n === 5 ? 'img/tableros/enfriador-5u.jpg' : n === 4 ? 'img/tableros/enfriador-4u.jpg' : null;
  }
  return t;
}

// ---------------------------------------------------------------------------
// Tablero de motores en gabinete plástico: guardamotores + contactores modulares + temporizadores
// ---------------------------------------------------------------------------
function motores(p) {
  const m = Math.max(1, Math.min(12, Math.round(p.motores || 6)));
  const grupos = Math.ceil(m / 2);
  const t = tableroBase(`Tablero de ${m} motores · gabinete plástico`);
  t.preseleccion = { id: 'motores', motores: m };
  t.medidasEstimadas = true;
  agregarItem(t, 'easy9-mcb-4p', 'GENERAL');
  agregarItem(t, 'easy9-rccb-4p', 'DIFERENCIAL');
  varios(t, 'jieli-c2', 2, (i) => `MANDO ${i}`);
  varios(t, 'timer-digital', grupos, (i) => `TIMER ${i}`);
  agregarItem(t, 'piloto-triple', 'PILOTO');
  varios(t, 'txch8-63', grupos, (i) => `K${i}`);
  agregarItem(t, 'cmb025', 'K AUX');
  varios(t, 'gv2me08', m, (i) => `M${i}`);
  ['R', 'S', 'T', 'N', 'PE'].forEach((e) => agregarItem(t, 'borne-acometida', e));
  varios(t, 'bornes-motor', m, (i) => `M${i}`);
  agregarItem(t, 'shelly-gen4', 'SHELLY');
  t.margen = 5;
  // Orden propio de este tablero: protección y tiempos, contactores, guardamotores y bornera.
  t.ordenGrupos = ['cabecera', 'termica', 'control', 'contactor', 'fases', 'guardamotor', 'bornera'];
  t.rielDeGrupo = { cabecera: 0, termica: 0, control: 0, contactor: 1, fases: 1, guardamotor: 2, bornera: 3 };
  const lados = 2 * (t.canal.ancho + t.margen);
  const fila1 = 72 + 72 + 36 + 22.5 * grupos + 18 + 48;
  const fila2 = 54 * grupos + 18;
  const fila3 = 45 * m;
  const fila4 = 61 + 23 * m;
  t.placa = { ancho: Math.max(430, Math.ceil((Math.max(fila1, fila2, fila3, fila4) + 18 + lados) / 10) * 10), alto: 780 };
  ['Protección y tiempos', 'Contactores', 'Guardamotores', 'Bornera'].forEach((nom) => agregarRiel(t, nom));
  t.foto = 'img/tableros/gabinete-plastico.jpg';
  return t;
}

function vacio(p) {
  const t = tableroBase(p.nombre || 'Tablero nuevo');
  t.placa = { ancho: Number(p.ancho) || 600, alto: Number(p.alto) || 600 };
  const n = Math.max(1, Math.min(10, Math.round(p.rieles || 3)));
  for (let i = 0; i < n; i += 1) agregarRiel(t);
  return t;
}

export const PRESELECCIONES = [
  {
    id: 'enfriador',
    nombre: 'Enfriador evaporativo',
    descripcion: 'Por cada unidad: soplador (guardamotor + contactor), bomba (térmica + protector + contactor), drenaje, nivel de agua y un PLC LOGO!.',
    foto: 'img/tableros/enfriador-5u.jpg',
    campos: [
      { id: 'unidades', nombre: 'Cantidad de unidades', tipo: 'numero', min: 1, max: 12, def: 5, atajos: [2, 4, 5] },
      { id: 'fases', nombre: 'Control de fases (térmica 4P + relé + contactor)', tipo: 'opcion', auto: (p) => p.unidades > 2 },
      { id: 'shelly', nombre: 'Shelly (relé WiFi)', tipo: 'opcion', auto: (p) => p.unidades > 2 },
      { id: 'alarma', nombre: 'Térmica de alarma', tipo: 'opcion', auto: (p) => p.unidades <= 2 },
      { id: 'barraPE', nombre: 'Barra de tierra junto a los contactores', tipo: 'opcion', auto: (p) => p.unidades > 2 },
    ],
    generar: enfriador,
  },
  {
    id: 'motores',
    nombre: 'Tablero de motores (gabinete plástico)',
    descripcion: 'Guardamotores, contactores modulares y temporizadores, con salida trifásica por motor.',
    foto: 'img/tableros/gabinete-plastico.jpg',
    campos: [{ id: 'motores', nombre: 'Cantidad de motores', tipo: 'numero', min: 1, max: 12, def: 6, atajos: [4, 6] }],
    generar: motores,
  },
  {
    id: 'vacio',
    nombre: 'Tablero vacío',
    descripcion: 'Solo la placa y los rieles. Los componentes se agregan a mano desde el catálogo.',
    foto: null,
    campos: [
      { id: 'nombre', nombre: 'Nombre', tipo: 'texto', def: 'Tablero nuevo' },
      { id: 'ancho', nombre: 'Ancho de la placa (mm)', tipo: 'numero', min: 100, max: 3000, def: 600 },
      { id: 'alto', nombre: 'Alto de la placa (mm)', tipo: 'numero', min: 100, max: 3000, def: 600 },
      { id: 'rieles', nombre: 'Cantidad de rieles', tipo: 'numero', min: 1, max: 10, def: 3 },
    ],
    generar: vacio,
  },
];

export function generarDesdePreseleccion(id, params = {}) {
  const pre = PRESELECCIONES.find((x) => x.id === id);
  if (!pre) throw new Error(`Preselección desconocida: ${id}`);
  return pre.generar(params);
}

/** Copia un tablero guardado para usarlo como punto de partida de otro igual. */
export function clonarTablero(origen, nombre) {
  const t = JSON.parse(JSON.stringify(origen));
  t.id = nuevoId('t');
  t.nombre = nombre || `${origen.nombre} (copia)`;
  return t;
}
