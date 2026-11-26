# Dónde se pierde el tiempo al armar tableros y qué funciones de software lo recuperan

> Anexo del [plan de acción](../README.md). Es el informe de investigación tal como se produjo, con sus fuentes al final.
> Lo marcado **[sin verificar]** o **[sv]** no se pudo contrastar con la fuente primaria: hay que confirmarlo antes de usarlo como dato firme (en especial precios, compatibilidades y números de cláusula). Las menciones a «la sesión» o a «dominios no permitidos» se refieren a la sesión de investigación en la que se armó el informe, donde varias páginas solo se pudieron leer por su resumen de búsqueda.

## 1. Evidencia disponible

- **Estudio "Schaltschrankbau 4.0"** (ISW, Universidad de Stuttgart; EPLAN lo cita como "Control Cabinet Manufacturing 4.0" y Weidmüller como "Panel Building 4.0"): el cableado consume ~49 % del tiempo de fabricación. Weidmüller cita además que montaje mecánico + cableado suman ~72 % de la fase de instalación (otro denominador, no comparable).
- Una presentación de Weidmüller basada en el estudio da ~4,5 min por cable entre leer la conexión en el esquema y procesar el cable a mano. La muestra son tableros de ~500 cables, más grandes que el de referencia.
- Los ahorros publicados son promesas de proveedor, no mediciones independientes: "50 %" en EPLAN (cables prefabricados + cableado por lista) y "hasta 80 %" en Weidmüller y Komax (procesamiento automático).
- EPLAN Smart Wiring, la referencia de cableado guiado, muestra cada conexión paso a paso y registra el avance en tiempo real.

Lectura para un taller chico: el tiempo se va en interpretar el esquema, buscar el borne, medir, cortar, pelar, punterar y rotular **cable por cable**, más las paradas por faltantes y el retrabajo. La app rinde cuando convierte el diseño en **listas ejecutables** (materiales, cortes, cables, marcadores) y cuando lo medido en el tablero n.º 1 se reutiliza en el 2 y el 3.

## 2. Mapa del proceso y funciones por etapa

Los porcentajes son estimación propia, calibrada con el 49 % del estudio; conviene reemplazarlos por tiempos medidos en el taller.

| # | Etapa (% tiempo est.) | Pérdidas y errores típicos | Función de la app | Impacto / Esfuerzo |
|---|---|---|---|---|
| 1 | Definición y layout (5–8 %) | Componente que no entra, canal saturado, medidas buscadas en catálogos cada vez | Biblioteca de componentes (foto, ancho/alto/profundidad, bornes); layout 2D con ocupación de riel y llenado de canal; 3D como vista derivada | Alto / Medio (2D), Alto (3D) |
| 2 | Materiales, compras y kitting (3–5 % + paradas) | Faltantes descubiertos a mitad del armado; piezas "prestadas" a otro tablero | Lista de materiales × cantidad de la serie contra stock; faltantes y pedido por proveedor; picking por tablero con escaneo de código; mínimos de punteras, bornes y termocontraíble | Alto / Medio |
| 3 | Corte de riel y cablecanal (2–3 %) | Medir y cortar pieza por pieza; desperdicio | Lista de cortes derivada del layout, agrupada para toda la serie, con aprovechamiento de barras | Medio / Bajo |
| 4 | Trazado y perforado de placa (3–4 %) | Marcar a mano cada placa; filas torcidas | Plano de perforado acotado desde un origen, PDF 1:1; en series, plantilla física reutilizable | Medio / Bajo |
| 5 | Montaje mecánico (5–8 %) | Orden o fila equivocados; falta lugar para topes | Vista por fila con posición y orden; foto de referencia del n.º 1 | Medio / Bajo |
| 6 | Rotulado de componentes y bornes (5–7 %) | Tipeo manual en la rotuladora, errores, etiquetas faltantes | Etiquetas generadas desde el proyecto; impresión o exportación por lote | Alto / Bajo-Medio |
| 7 | Prefabricado de cables (10–12 %) | Corte "a ojo" sobre el tablero; puntera o color equivocados; marcador invertido | Lista de cables (origen, destino, color, sección, largo, puntera, marcador por extremo); largo medido una vez en el n.º 1; lote ordenado por sección/color × N tableros; marcadores ("PE1-GMS1") en el mismo orden | Alto / Medio |
| 8 | Cableado de potencia (10–12 %) | Secuencia de fases, sección, bornes del bloque de distribución | Cableado guiado: un cable por pantalla, origen y destino resaltados en el dibujo, tilde y avance | Alto / Medio-Alto |
| 9 | Cableado de comando (25–30 %) | Borne equivocado (A1/A2, entradas del LOGO!, electrodos del CN-3R), puentes olvidados | Ídem + "repetir patrón" (los 5 circuitos de soplador y de bomba son iguales); avance retomable entre turnos | Alto / Medio-Alto |
| 10 | Terminación (3–5 %) | Bornes sin ajustar, canal sin tapa, cable sin marcar | Checklist con torque por componente (dato de catálogo) | Medio / Bajo |
| 11 | Verificación y ensayo (5–8 %) | Se prueba de memoria; no queda registro | Protocolo de rutina (inspección, continuidad de PE, aislación, punto a punto, prueba funcional por motor, disparo del diferencial) con valores, fotos y firma | Alto / Bajo |
| 12 | Programación y ajustes (3–5 %) | Versión de programa equivocada; regulaciones sin anotar | Ficha por equipo: regulación de cada GV2, umbrales de los TVPS1, tiempos, versión del programa, serie/MAC/IP de cada LOGO! | Medio / Bajo |
| 13 | As-built y entrega (3–5 %) | Carpeta armada a mano; planos que no reflejan lo construido | Fotos por etapa atadas al n.º de serie; PDF automático (planos, materiales, protocolo, manuales); QR en la puerta | Alto / Medio |
| 14 | Postventa | No se sabe qué lleva cada tablero ni en qué revisión | Historial por serie, repuesto exacto, reclamos y cambios | Medio / Bajo |

Sobre la etapa 11: según la guía de Schneider para armadores, la verificación de rutina de IEC 61439 le corresponde al armador en cada tablero. La equivalencia normativa argentina (IRAM/AEA) queda [sin verificar].

## 3. Funciones transversales

- **Cronómetro por etapa y operario**: un toque para iniciar o pausar, con motivo de parada. Impacto alto, esfuerzo bajo; sin esto no hay KPIs ni costeo.
- **Plantillas, clonado y variantes**: tablero tipo → serie numerada; los cambios se propagan a los no terminados. Alto / Medio.
- **Revisiones**: cada cambio con motivo, autor y series afectadas. Medio / Bajo.
- **Costeo real vs. presupuesto**: materiales + horas reales por tablero. Medio / Medio.

## 4. KPIs que el taller debería medir

- Horas por tablero y por etapa; curva de aprendizaje dentro de la serie (n.º 1 vs. 2 vs. 3).
- Minutos por cable (prefabricado + conexión), comparable con los 4,5 min de referencia.
- % de cables prefabricados sobre el total.
- Paradas por faltantes (cantidad y horas) y % de kits completos al empezar.
- Errores detectados en verificación por tablero, por tipo (borne, marcador, torque, faltante), y horas de retrabajo.
- Tableros que pasan el ensayo a la primera.
- Desvío de horas y de costo de materiales contra presupuesto.
- Plazo pedido → entrega y cumplimiento de fecha.
- Desperdicio de riel, canal y cable.
- Cambios de ingeniería después de iniciado el armado.
- Reclamos de postventa por serie.

## 5. Integraciones de hardware y viabilidad

| Equipo | Cómo integrarlo | Viabilidad desde iPhone |
|---|---|---|
| Brother PT-E310BT / E560BT / P910BT (Bluetooth), PT-E550W (Wi-Fi) | Brother Print SDK (iOS/Android): imprime imagen/PDF y plantillas. Publicar en App Store con Bluetooth exige tramitar un PPID con Brother. Sin programar: CSV → Brother Pro Label Tool (CSV + plantilla, iOS 15+). Hay cassettes HSe de tubo termocontraíble 3:1, incluso negro sobre amarillo; compatibilidad de HSe con E310BT/E560BT [sin verificar] | Alta en app nativa; nula en web pura |
| Brady M211 / M611 (la M210 es autónoma, sin Bluetooth) | Brady Print SDK: iOS 15+ / Android 8+, BLE, con bindings React Native, Flutter y MAUI | Alta en app nativa |
| Phoenix Contact Thermomark Go | Bluetooth 5 con su app MARKING system; imprime termocontraíbles. No encontré SDK público; importación de listas [sin verificar] | Media (vía archivo) |
| Dymo XTL / Rhino 6000+ | DYMO ID (Windows) importa Excel; sin SDK móvil localizado | Media-baja (archivo + PC) |
| Cembre MG3/Markingenius, Weidmüller, Canon MK1500/2600, Partex | Equipos de banco manejados desde PC. GENIUSPRO importa Excel y CAD; M-Print PRO importa TXT/CSV/XML; Canon MK imprime tubo de PVC y termocontraíble ø3,2–6,4 mm; software de Partex [sin verificar]. La app exporta CSV/XLSX con columnas configurables por modelo | Alta por archivo; baja por control directo |
| Destornillador dinamométrico electrónico (Hoffmann GARANT HCT 0,8–5 Nm; Bahco) | Bluetooth con app propia y exportación CSV, que se adjunta al protocolo | Media; prioridad baja |
| Procesadoras automáticas de cable (Weidmüller WPC, nVent PWA6000, Komax Zeta 620, Rittal WT L) | Aceptan datos de EPLAN o CSV/Excel. Fuera de escala para el taller, pero la misma lista de cables sirve para encargar juegos prefabricados (Komax lo ofrece como servicio) | Alta por CSV |
| Crimpadoras y peladoras de banco | Sin conectividad útil [sin verificar]; la app solo ordena el lote | No aplica |
| Cámara del iPhone | Escaneo de códigos de barras/QR y fotos por etapa | Alta |
| QR del tablero | URL única por n.º de serie, criterio de IEC 61406 (Identification Link); se imprime con la misma rotuladora | Alta |

**Restricción clave:** Safari en iOS no implementa Web Bluetooth (WebKit lo cerró como WONTFIX; caniuse lo marca no soportado hasta iOS 26.5). Una web app en iPhone no puede hablar con rotuladoras BLE. Las salidas son dos: app nativa o híbrida (Capacitor, React Native, Flutter) con el SDK del fabricante, o exportar CSV a la app del fabricante. En Chrome (Android/PC) sí hay Web Bluetooth.

## 6. Orden sugerido

1. Lista de cables + marcadores con exportación CSV, checklist de ensayo y cronómetro: ataca la mitad del tiempo con esfuerzo bajo-medio.
2. Layout 2D con listas de corte y perforado, kitting con faltantes y clonado de series.
3. Cableado guiado, impresión directa por SDK, QR con carpeta automática y costeo.

## Límites de la verificación

- No pude abrir páginas: `eplan.com`, `www.weidmueller.com` y `support.brother.com` no están en los dominios permitidos de la sesión; hay que habilitarlos en la configuración de red. Todo lo citado sale de resúmenes de búsqueda, no de lectura directa.
- El estudio original de Stuttgart no fue consultado; las cifras vienen de fabricantes.
- El cupo de búsquedas se agotó antes de verificar normativa argentina, estudios sobre instrucciones de trabajo digitales y los puntos marcados [sin verificar].

## Fuentes

- https://eplan.com/us-en/industry-solutions/panel-building/automated-panel-production
- https://eplan.com/us-en/products/eplan-smart-wiring.html
- https://eplan.com/us-en/blog/trends/eliminate-bottlenecks-with-smart-wiring
- https://www.weidmueller.com/wpc
- https://www.weidmueller.com/int/solutions/workplace_solutions/bn_automation.jsp
- https://assemblymag.com/ext/resources/Events/TAS/presentations/2024AssemblyShow_GeorgeTilli.pdf
- https://www.komaxgroup.com/en/expertise/cabinet-building
- https://www.komaxgroup.com/stories/fully-automatic-machine-zeta-620-huge-opportunity-for-smaller-control-cabinet-builders
- https://www.rittal.com/gr-en/Company/Presse/Press-Releases/PR_New_Wire_Terminal
- https://hoffman.nvent.com/en-th/products/encpwa6000
- https://support.brother.com/g/s/es/htmldoc/mobilesdk/overview/supported-printer.html
- https://support.brother.com/g/s/es/dev/en/mobilesdk/download/index.html
- https://support.brother.com/g/s/es/htmldoc/mobilesdk/about/release-notes-ios.html
- https://support.brother.com/g/s/es/htmldoc/ptouch/e310bt/usen/html/GUID-0D6482BB-A5A0-41F8-9A39-A268FD2276A4_1.html
- https://brothermobilesolutions.com/?p=3173
- https://www.brother.ca/en/p/HSE211E
- https://www.shi.com/product/45622575/Brother-HSe-611E-Black-on-yellow
- https://sdk.bradyid.com/supported_printers
- https://sdk.bradyid.com/supported_components/
- https://www.phoenixcontact.com/thermomarkgo
- https://apps.apple.com/us/app/id1108582487
- https://download.dymo.com/dymo/user-guides/Software/DYMO_ID/DYMO_ID_UserGuide.en.pdf
- https://www.cembre.com/de/documents/identification-and-labelling-brochure
- https://www.weidmueller.com/int/products/workplace_accessories/software/m_print_pro.jsp
- https://www.usa.canon.com/newsroom/2020/20200915-printer
- https://caniuse.com/web-bluetooth
- https://bugs.webkit.org/show_bug.cgi?id=101034
- https://www.hoffmann-group.com/US/en/hus/areas-of-application/digital-manufacturing-solutions/hct/e/747193/
- https://apps.apple.com/us/app/id1577527462
- https://blog.se.com/energy-management-energy-efficiency/2016/07/21/guidelines-panel-builders-quality-inspection-packing-handling-installation
- https://webstore.iec.ch/publication/67673
