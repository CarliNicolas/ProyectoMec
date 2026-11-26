// Catálogo semilla: componentes vistos en los tableros MEC.
// Medidas en mm: ancho sobre el riel × alto × profundidad.
// medida: 'catalogo' = de la ficha del fabricante o distribuidor; 'estimada' = hay que medirla con calibre.
// grupo: función del aparato; el acomodado automático mantiene juntos los del mismo grupo.

export const GRUPOS = [
  { id: 'cabecera', nombre: 'Cabecera' },
  { id: 'guardamotor', nombre: 'Guardamotores' },
  { id: 'fases', nombre: 'Control de fases' },
  { id: 'termica', nombre: 'Térmicas' },
  { id: 'plc', nombre: 'PLC' },
  { id: 'control', nombre: 'Control' },
  { id: 'rele', nombre: 'Relés' },
  { id: 'contactor', nombre: 'Contactores' },
  { id: 'bornera', nombre: 'Bornera' },
  { id: 'otros', nombre: 'Otros' },
];

export const ORDEN_GRUPOS = GRUPOS.map((g) => g.id);

const f = (id) => `img/comp/${id}.jpg`;

export const CATALOGO_BASE = [
  { id: 'easy9-mcb-4p', nombre: 'Térmica general 4P', marca: 'Schneider', ref: 'Easy9 EZ9F34440 (C40)', ancho: 72, alto: 81, prof: 66.5, grupo: 'cabecera', color: '#ecebe6', medida: 'catalogo', foto: f('easy9-mcb-4p') },
  { id: 'easy9-rccb-4p', nombre: 'Diferencial 4P 63 A 30 mA', marca: 'Schneider', ref: 'Easy9 EZ9R36463', ancho: 72, alto: 82, prof: 72, grupo: 'cabecera', color: '#ecebe6', medida: 'catalogo', foto: f('easy9-rccb-4p') },
  { id: 'jieli-407', nombre: 'Bloque de distribución 4P 125 A', marca: 'Jieli', ref: '407', ancho: 67, alto: 87, prof: 51, grupo: 'cabecera', color: '#2f6fd6', medida: 'estimada', foto: f('jieli-407') },
  { id: 'gv2me08', nombre: 'Guardamotor 2,5–4 A', marca: 'Schneider', ref: 'TeSys GV2ME08C + auxiliar', ancho: 45, alto: 89, prof: 97, grupo: 'guardamotor', color: '#2b2d31', medida: 'catalogo', foto: f('gv2me08') },
  { id: 'c60n-4p', nombre: 'Térmica 4P C6', marca: 'Schneider', ref: 'C60N C6', ancho: 72, alto: 81, prof: 73, grupo: 'fases', color: '#ecebe6', medida: 'catalogo', foto: f('c60n-4p') },
  { id: 'rut34', nombre: 'Relé de control de fases', marca: 'BAW', ref: 'RUT34-2MD', ancho: 36, alto: 90, prof: 65, grupo: 'fases', color: '#e3e6ea', medida: 'estimada', foto: f('rut34') },
  { id: 'cmb025', nombre: 'Contactor modular 2P 25 A', marca: 'Etheos', ref: 'CMB-025A', ancho: 18, alto: 85, prof: 65, grupo: 'fases', color: '#eceef0', medida: 'estimada', foto: f('cmb025') },
  { id: 'pln6-c10', nombre: 'Térmica bomba 1P+N C10', marca: 'Eaton', ref: 'xPole PLN6-C10/1N', ancho: 17.5, alto: 80, prof: 75, grupo: 'termica', color: '#f0efea', medida: 'catalogo', foto: f('pln6-c10') },
  { id: 'jieli-c2', nombre: 'Térmica 1P+N C2', marca: 'Jieli', ref: 'HD C2', ancho: 18, alto: 81, prof: 72, grupo: 'termica', color: '#f0efea', medida: 'estimada', foto: f('jieli-c2') },
  { id: 'jieli-c4', nombre: 'Térmica de mando 1P+N C4', marca: 'Jieli', ref: 'HD C4', ancho: 18, alto: 81, prof: 72, grupo: 'termica', color: '#f0efea', medida: 'estimada', foto: f('jieli-c4') },
  { id: 'logo-230rce', nombre: 'PLC LOGO! 230RCE', marca: 'Siemens', ref: '6ED1052-1FB08', ancho: 71.5, alto: 90, prof: 60, grupo: 'plc', color: '#3d4654', medida: 'catalogo', foto: f('logo-230rce') },
  { id: 'baw-ptd2', nombre: 'Controlador de temperatura', marca: 'BAW', ref: 'PTD2', ancho: 36, alto: 88, prof: 65, grupo: 'control', color: '#e3e6ea', medida: 'estimada', foto: f('baw-ptd2') },
  { id: 'tvps1-40c', nombre: 'Protector de tensión y corriente', marca: 'Taxnele', ref: 'TVPS1-40C', ancho: 35, alto: 85, prof: 65, grupo: 'control', color: '#e7e6e1', medida: 'estimada', foto: f('tvps1-40c') },
  { id: 'ag-cn3r', nombre: 'Controlador de nivel', marca: 'AG', ref: 'CN-3R', ancho: 35, alto: 90, prof: 60, grupo: 'control', color: '#c9ccd1', medida: 'estimada', foto: f('ag-cn3r') },
  { id: 'shelly-gen4', nombre: 'Shelly Gen4 con soporte', marca: 'Shelly', ref: '1 Gen4', ancho: 48, alto: 60, prof: 47, grupo: 'control', color: '#2a6bd8', medida: 'estimada', foto: f('shelly-gen4') },
  { id: 'rxm-zocalo', nombre: 'Relé enchufable con zócalo', marca: 'Schneider', ref: 'RXM 230 VAC', ancho: 27, alto: 79, prof: 78.5, grupo: 'rele', color: '#25272b', medida: 'catalogo', foto: f('rxm-zocalo') },
  { id: 'barra-pe', nombre: 'Barra de tierra', marca: '', ref: '', ancho: 20, alto: 60, prof: 30, grupo: 'contactor', color: '#3fa34d', medida: 'estimada' },
  { id: 'lc1e0910', nombre: 'Contactor 9 A', marca: 'Schneider', ref: 'Easy TeSys LC1E0910', ancho: 45, alto: 74, prof: 80, grupo: 'contactor', color: '#4a4f57', medida: 'catalogo', foto: f('lc1e0910') },
  { id: 'borne-acometida', nombre: 'Borne de acometida', marca: 'Zoloda', ref: 'BPN-16 (o similar)', ancho: 12.2, alto: 56, prof: 66, grupo: 'bornera', color: '#e8e2d0', medida: 'estimada', foto: f('borne-acometida') },
  { id: 'bornes-unidad', nombre: 'Bornes de una unidad (12 + separadores)', marca: '', ref: '2,5 mm² a resorte', ancho: 77, alto: 50, prof: 45, grupo: 'bornera', color: '#b9bcc0', medida: 'estimada', foto: f('bornes-unidad') },
  { id: 'bornes-comunes', nombre: 'Bornes comunes (sonda y alarma)', marca: '', ref: '2,5 mm² a resorte', ancho: 30, alto: 50, prof: 45, grupo: 'bornera', color: '#d9694f', medida: 'estimada' },
  { id: 'tope-riel', nombre: 'Tope de riel', marca: '', ref: '', ancho: 9, alto: 45, prof: 35, grupo: 'bornera', color: '#8c9198', medida: 'estimada' },
  { id: 'txch8-63', nombre: 'Contactor modular 4P 63 A', marca: 'Taxnele', ref: 'TXCH8-63/40', ancho: 54, alto: 85, prof: 65, grupo: 'contactor', color: '#eceef0', medida: 'estimada' },
  { id: 'timer-digital', nombre: 'Temporizador digital', marca: '', ref: '', ancho: 22.5, alto: 90, prof: 70, grupo: 'control', color: '#2f3237', medida: 'estimada' },
  { id: 'piloto-triple', nombre: 'Piloto triple', marca: '', ref: '', ancho: 18, alto: 80, prof: 60, grupo: 'control', color: '#dddddd', medida: 'estimada' },
  { id: 'bornes-motor', nombre: 'Bornes de un motor (3 + tierra)', marca: '', ref: '2,5 mm² a resorte', ancho: 23, alto: 50, prof: 45, grupo: 'bornera', color: '#b9bcc0', medida: 'estimada' },
  { id: 'reserva-18', nombre: 'Reserva de 1 módulo', marca: '', ref: 'lugar libre', ancho: 18, alto: 85, prof: 5, grupo: 'otros', color: '#ffffff', medida: 'catalogo', hueco: true },
  { id: 'reserva-36', nombre: 'Reserva de 2 módulos', marca: '', ref: 'lugar libre', ancho: 36, alto: 85, prof: 5, grupo: 'otros', color: '#ffffff', medida: 'catalogo', hueco: true },
  { id: 'reserva-72', nombre: 'Reserva de 4 módulos', marca: '', ref: 'lugar libre', ancho: 72, alto: 85, prof: 5, grupo: 'otros', color: '#ffffff', medida: 'catalogo', hueco: true },
  { id: 'modulo-18', nombre: 'Aparato de 1 módulo (18 mm)', marca: '', ref: 'genérico', ancho: 18, alto: 85, prof: 70, grupo: 'otros', color: '#e0e0dc', medida: 'estimada' },
  { id: 'modulo-36', nombre: 'Aparato de 2 módulos (36 mm)', marca: '', ref: 'genérico', ancho: 36, alto: 85, prof: 70, grupo: 'otros', color: '#e0e0dc', medida: 'estimada' },
  { id: 'modulo-72', nombre: 'Aparato de 4 módulos (72 mm)', marca: '', ref: 'genérico', ancho: 72, alto: 85, prof: 70, grupo: 'otros', color: '#e0e0dc', medida: 'estimada' },
];
