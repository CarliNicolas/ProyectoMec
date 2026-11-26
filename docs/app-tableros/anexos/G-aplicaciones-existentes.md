# Anexo G · Aplicaciones existentes: qué hacen y qué se tomó de ellas

Relevamiento de los programas que ya existen para armar tableros, hecho para copiar lo que sirve en un taller chico. Se revisaron **89 aplicaciones** en cuatro familias y se anotaron **112 funciones**, cada una con cómo funciona, para qué sirve y cómo adaptarla.

> **Cómo leer esto.** Ninguna aplicación se instaló ni se usó: todo sale de manuales, ayudas en línea y descripciones públicas, y en buena parte de resúmenes de búsqueda, porque los sitios de varios fabricantes no se pudieron abrir desde donde se hizo el trabajo. Los nombres de menú y los precios pueden haber cambiado. Los límites de cada familia están al final.

## Resumen

| Estado en Tableros MEC | Funciones |
|---|---:|
| Ya está en la app | 48 |
| Está en parte | 24 |
| Pendiente | 40 |
| **Total** | **112** |

Varias funciones aparecen repetidas entre familias (reserva, lista de corte, etiquetas, armado guiado): que cuatro tipos de programa distintos las tengan es la mejor señal de que valen la pena.

## Lo que ya está en la app

Tomado de estos programas y adaptado al taller.

| N.º | Función | La tienen | Dónde está |
|---:|---|---|---|
| 1 | Reserva de espacio configurable (y reserva aparte para bornes) | Legrand XL PRO3; hagercad; ABB StriePlan | Menú → Medidas del tablero → “Lugar libre a dejar en cada riel (%)”. Zona rayada en el plano y amarillo cuando se invade. Falta la reserva aparte para la bornera. |
| 2 | Propuesta automatica de gabinete: solo los que entran | hagercad; Legrand XL PRO3; Siemens SIMARIS project; Schrack Design; Gewiss PBT-Q; Schneider eDesign | Menú → ¿Qué placa necesito?: calcula la placa más chica con un riel menos, los mismos y uno más. No elige de un catálogo de gabinetes comerciales. |
| 3 | Banco de trabajo para lo que no esta colocado | Legrand XL PRO3; Schneider eDesign | Bandeja “Sin ubicar” debajo del plano; en rojo lo que no entra en ningún riel. |
| 4 | Saltos de fila que el acomodado respeta | Legrand XL PRO3 | “📌 Fijar” en la ficha de cada aparato: al acomodar no cambia de riel y el resto se reparte alrededor. Las preselecciones además fijan qué función va en cada riel. |
| 5 | Tiras de etiquetas por riel a tamano real | Legrand XL PRO3; Hager Ready; Schneider eDesign | Menú → Carteles y etiquetas: una tira por riel a tamaño real, con regla de control de 100 mm. |
| 6 | Largo de riel calculado y lista de corte | Weidmuller Configurator (WMC); ABB StriePlan | Menú → Lista de corte: riel y cablecanal, con reparto en barras de 2 m y sobrantes. |
| 9 | Plantillas y macros propios | Schrack Design; ABB DOC (e-Design) | Menú → Guardar como preselección; aparece en “Tablero nuevo”. |
| 13 | Verificador del proyecto con lista de problemas | Weidmuller WMC; WAGO smartDESIGNER; Hager Ready; Schneider EcoSet Config | Tocar el cartel de estado abre “Revisión del tablero”: todo lo rojo, lo amarillo y los datos a verificar; cada renglón lleva al aparato. |
| 14 | Leyenda para la puerta e indice de circuitos | Hager Ready; Schrack Design | Carpeta → “Referencias para pegar en la puerta”. |
| 15 | Paquete de documentacion en un clic | Rittal RiPanel; Hager Ready; hagercad; Phoenix Contact PROJECT complete; Weidmuller WMC | Menú → Imprimir la carpeta: plano, materiales, cortes, referencias y carteles; también como PDF. |
| 19 | Posicion propuesta en verde al arrastrar | Schneider eDesign | Al arrastrar se ve dónde va a quedar el aparato antes de soltarlo. |
| 20 | Panel de espacio libre siempre visible | Schneider eDesign | Renglón de ocupación (porcentaje, libre y módulos de 18 mm) y barra por riel con mm libres. |
| 21 | Modo construccion (bloqueo de edicion) | Schneider eDesign | Botón “Bloquear” del plano: se puede mirar, tildar el armado e imprimir, pero no mover nada. |
| 22 | Enviar la lista al proveedor | Hager Ready; Siemens SIMARIS create; Rittal RiPanel | Componentes → “Pedido para el proveedor”: texto agrupado por marca para WhatsApp o mail. |
| 29 | Lista de pendientes: colocados y sin colocar | AutoCAD Electrical, EPLAN Pro Panel, SolidWorks Electrical, SEE Electrical Cabinet Layout | Bandeja “Sin ubicar” y pestaña “Armar” con el conteo de montados. |
| 31 | Cerrar huecos en el riel | EPLAN Pro Panel | Los aparatos siempre quedan arrimados; solo hay hueco si se carga una separación. |
| 32 | Imán a riel con punto de agarre y desplazamiento | EPLAN Pro Panel, SolidWorks Electrical 3D, Capital X Panel Designer, Zuken E3.panel, SEE Electrical 3D Panel+ | Todo lo que se suelta cae sobre un riel, en el lugar más cercano. |
| 34 | Colisión en vivo que marca a los dos involucrados | EPLAN Pro Panel, WSCAD Cabinet Engineering, SEE Electrical 3D Panel+, Zuken E3.panel | Rojo si se pasa del riel, choca con el cablecanal o no deja cerrar la puerta; con el motivo escrito. |
| 37 | Encajar rieles y cablecanales contra el vecino | EPLAN Pro Panel | Rieles y cablecanales se calculan solos con el ancho y alto de la placa. |
| 38 | Largo de riel calculado según lo colocado | Weidmüller Configurator online, Phoenix Contact clipx ENGINEER | Largo de cada riel automático según la placa, o cargado a mano. |
| 39 | Lista de corte de riel y cablecanal | Zuken E3.panel, SEE Electrical 3D Panel+, EPLAN Pro Panel (hacia el centro de corte Rittal Secarex); falta en AutoCAD Electrical | Menú → Lista de corte: los verticales van de una pieza y los horizontales del medio se cortan entre ellos. |
| 41 | Cotas automáticas regenerables | EPLAN Pro Panel, SkyCAD (cotas de layout) | Botón “Medidas”: ancho y alto de placa, y eje, inicio y largo de cada riel. |
| 42 | Leyenda del tablero con números de posición | EPLAN (leyenda de gabinete), AutoCAD Electrical (globos y lista de panel) | Referencias para la puerta, con riel y posición de cada aparato. |
| 47 | Reserva de espacio configurable | Schneider Electric (EcoSet), Legrand XL PRO | Reserva en % por tablero. |
| 50 | Exportar e imprimir etiquetas | EPLAN (labeling), WAGO Smart Designer con Smart Script, Phoenix Contact PROJECT complete, Hager Ready, AutoCAD Electrical (placas de identificación) | Carteles: imprimir a escala real o “Planilla para la rotuladora”. |
| 51 | Modo armado paso a paso | EPLAN Smart Mounting | Pestaña “Armar”: tildar cada aparato al montarlo; queda marcado en el plano. |
| 53 | Verificación general con lista de problemas | EPLAN (verificaciones del montaje 3D), Weidmüller Configurator (Verify) | Revisión del tablero. |
| 59 | Largo de riel calculado solo y editable | WAGO Smart Designer, Weidmüller Configurator (WMC) | Medidas del tablero → largo útil de cada riel (vacío = automático). |
| 62 | Compactar bloque | WAGO Smart Designer (documentado en la versión anterior smartDESIGNER 6) | Los aparatos se arriman solos. |
| 67 | Tira de marcado con marcas de corte tomadas del riel | WAGO Smart Designer con Smart Script y Smart Printer | Cada cartel tiene el ancho exacto de su aparato y los huecos quedan marcados. |
| 72 | Grupos de función y plantillas reutilizables | Phoenix Contact clipx ENGINEER | Preselecciones propias y “Agregar una unidad” (suma los 10 aparatos de una unidad más). |
| 75 | Vista de armado paso a paso para el operario | Phoenix Contact clipx ENGINEER assemble, WAGO Smart Designer | Pestaña “Armar”. |
| 76 | Documentación completa en un clic | Weidmüller Configurator (WMC), WAGO Smart Designer | Imprimir la carpeta. |
| 81 | Holgura entre componentes sobre el riel | Phoenix Contact clipx ENGINEER | “Separación antes” en la ficha de cada aparato. |
| 83 | Tira de etiquetas por riel a escala real | Hager Ready; Electrical Panel Label Generator; Schneider eDesign; ABB Easy Pro Web | Carteles y etiquetas. |
| 84 | Largo de riel calculado y lista de corte | Weidmüller Online Configurator; TermiGrid; EPLAN Smart Mounting | Lista de corte. |
| 86 | Numeración automática de referencias en orden de lectura | ElectroCraft | Renumerar etiquetas, en orden de lectura. |
| 87 | Reserva de espacio configurable y bloque de reserva | Verteilerplaner (Sandmann4951); DIN Rail Planner; TermiGrid | Reserva en % y componentes “Reserva” para guardar el lugar. |
| 88 | Elección de gabinete con aviso de que queda chico | Verteilerplaner (Sandmann4951); Hager Ready | “¿Qué placa necesito?” dice si la placa actual alcanza o cuánto falta. |
| 90 | Bornera como bloque con ancho calculado | Stromlaufplan.de | “Bornes de una unidad” y “Bornes comunes” son bloques con su ancho. |
| 93 | Modo armado guiado con estado verde y rojo | EPLAN Smart Mounting; clipx ENGINEER assemble; WSCAD Cabinet AR | Pestaña “Armar”, con lo que no entra marcado en rojo. |
| 102 | Exportar los textos de marcado para la rotuladora | TermiGrid; WAGO Smart Designer | Carteles → “Planilla para la rotuladora”. |
| 105 | Notas del taller sobre el plano | EPLAN eVIEW Free; EPLAN Smart Mounting; WSCAD Cabinet AR | Menú → Medidas del tablero → “Notas del taller”. Se ven bajo el plano, en la pestaña Armar y en la carpeta impresa. |
| 106 | Marca de dato a verificar que también se imprime | loadcenterlabels | “medir” en cada componente estimado y “medidas estimadas” en el encabezado de cada hoja. |
| 107 | Insertar empujando e intercambiar al soltar | DIN Rail Planner; Stromlaufplan.de (pedido de usuarios) | Al soltar un aparato entre otros dos, los demás se corren. |
| 108 | Tocar para colocar en el primer lugar libre | ElectroCraft; Verteilerplaner (Sandmann4951) | “＋” en el catálogo lo pone en el primer riel donde entra, junto a los de su función. |
| 109 | Duplicar, copiar y pegar, y barra de acciones táctil | ElectroCraft; DIN Rail Planner; Hager Ready | Ficha del aparato con mover, cambiar de riel, duplicar, sacar y borrar. |
| 111 | Respaldo del proyecto en archivo | DIN Rail Planner; FuseMapper; Electrical Panel Label Generator; ElectroCraft | Menú → Copia de seguridad de todo / Guardar este tablero en un archivo / Abrir un archivo. |

## Lo que está en parte

Hay una versión simple; se indica qué falta.

| N.º | Función | La tienen | Qué hay y qué falta |
|---:|---|---|---|
| 7 | Lista de materiales con precios, mano de obra y presupuesto | Legrand XL PRO3; Schneider eDesign; Rittal RiPanel; hagercad; Siemens SIMARIS configuration; ABB StriePlan | Precio por componente en el catálogo, total por tablero y por serie. Falta mano de obra y presupuesto para el cliente. |
| 8 | Proyecto con varios tableros, duplicar y lista consolidada | Legrand XL PRO3; Hager Ready; Schrack Design | Mis tableros, Copiar y “Tableros iguales a armar” (multiplica materiales y cortes). Falta la lista consolidada de tableros distintos. |
| 11 | Plano acotado y exportacion DXF | hagercad; Siemens SIMARIS configuration; Rittal RiPanel | Botón “Medidas” en el plano y hoja “Plano con medidas” en la carpeta. Falta exportar DXF. |
| 25 | Ficha del proyecto e informe con logo | Schneider eDesign; Schneider ProClima; Legrand XL PRO3 | Las hojas llevan nombre del tablero, placa y fecha. Falta logo y datos del cliente. |
| 27 | Relleno automatico de la reserva | Legrand XL PRO3; hagercad; Schneider eDesign | Hay “Reserva” de 1, 2 y 4 módulos para colocar a mano. Falta el relleno automático. |
| 30 | Colocación múltiple con separación fija y reparto parejo | AutoCAD Electrical, SolidWorks Electrical, SkyCAD | Duplicar y separación por aparato. Falta colocar varios de una vez y repartir parejo. |
| 35 | Distancias mínimas de montaje por componente | EPLAN Pro Panel (con datos de fabricantes como Phoenix Contact) | Separación por aparato y distancia mínima al cablecanal. Falta la distancia propia de cada modelo. |
| 46 | Elección de gabinete filtrada por lo que entra | hagercad, Legrand XL PRO | “¿Qué placa necesito?” calcula la medida; falta el catálogo de gabinetes para elegir uno real. |
| 56 | Revisión del tablero con arreglo automático (Verify / Auto-Solve / Autocorrección) | Weidmüller Configurator (WMC), Phoenix Contact clipx ENGINEER, WAGO Smart Designer | La revisión lista los problemas; el arreglo es “Acomodar” o “¿Qué placa necesito?”. Falta el arreglo problema por problema. |
| 60 | Sobrante inicial y separación entre bloques configurables | WAGO Smart Designer | Separación antes de cada aparato. Falta el sobrante inicial del riel como dato aparte. |
| 63 | Reemplazar por producto similar en selección múltiple | Weidmüller Configurator (WMC) | En la ficha se cambia el modelo de un aparato. Falta hacerlo con varios a la vez. |
| 65 | Asistente de etiquetas y marcadores | Weidmüller Configurator (WMC) | Carteles con alto, color por función y nombre del componente. Falta elegir marcadores comerciales. |
| 66 | Numeración consecutiva con prefijo, sufijo, paso y sentido | Weidmüller M-Print PRO (conectado a WMC) | Menú → Renumerar etiquetas. Falta elegir prefijo, paso y sentido. |
| 68 | Control de largo de texto y vista real de la etiqueta | WAGO Smart Script | La letra se achica sola para entrar. Falta avisar cuáles quedan ilegibles. |
| 77 | Pedido directo desde la configuración | WAGO Smart Designer, Weidmüller Configurator (WMC), Phoenix Contact PROJECT complete | El pedido sale como texto para mandar; no hay envío directo a un proveedor. |
| 80 | Accesorios no eléctricos en la lista: carteles, cubiertas, tapones | Phoenix Contact clipx ENGINEER | El pedido, la lista de materiales y la pestaña Componentes incluyen las barras de riel DIN y de cablecanal. Faltan carteles, tapas y tapones como renglones. |
| 82 | Ancho y potencia disipada sumados por riel | Siemens TIA Selection Tool | Ancho ocupado y libre por riel. Falta la potencia disipada. |
| 85 | Leyenda para la puerta en tamaños elegibles | Hager Ready; Breaker Box: Panel Directory; loadcenterlabels; Panel Legend 2 | Hay una hoja de referencias; falta elegir el tamaño. |
| 89 | Plano con medidas exactas y posiciones de perforado | EPLAN Smart Mounting | Plano con medidas y eje de cada riel. Faltan las posiciones de los agujeros. |
| 92 | Lista de materiales con precios en vista cliente y vista interna | Verteilerplaner (Sandmann4951); ABB Easy Pro Web; Schneider eDesign | Hay precios y totales; falta separar vista cliente y vista interna. |
| 94 | PDF de documentación con carátula, rótulo y plano a escala | Verteilerplaner (Sandmann4951); ElectroCraft | La carpeta sale como PDF desde la impresión. Falta carátula y rótulo. |
| 99 | Letra ajustada sola con aviso de las que no entran | nelko-p21-ble-labels | La letra se ajusta sola; falta el aviso de las que no entran. |
| 103 | Código QR del tablero y de cada componente | WSCAD Cabinet AR; Schaltschrank digitaler Zwilling; Breaker Meister; Circuit Breaker Planner | El tablero se comparte por enlace; falta mostrarlo como QR. |
| 104 | Elegir qué datos se ven en el plano y cuáles se imprimen | ElectroCraft; Electrical Panel Label Generator; Stromlaufplan.de (pedido de usuarios) | Se eligen las hojas de la carpeta y si el plano muestra medidas. Falta elegir dato por dato. |

## Lo que queda pendiente

Ordenado por valor para el taller y después por esfuerzo. El valor y el esfuerzo son una estimación.

| N.º | Función | La tienen | Valor | Esfuerzo | Cómo adaptarla |
|---:|---|---|---|---|---|
| 12 | Recortes y perforaciones de puerta generados solos | Rittal RiPanel | alto | alto | Vista 'Puerta' para colocar pilotos, pulsadores, selectores y pantallas con el diametro o recorte del catalogo, chequear que no choquen entre si ni con lo montado detras, e imprimir la plantilla de perforado 1:1. |
| 52 | Lista desde-hasta con largos de cable | SEE Electrical 3D Panel+, EPLAN Pro Panel, WSCAD, AutoCAD Electrical (anotación de cableado) | alto | alto | Etapa posterior: cuando exista la lista de cables, calcular el largo por el recorrido de canales entre los dos aparatos más un margen y exportar la tabla de corte. |
| 70 | Cableado punto a punto con conexiones posibles resaltadas | Weidmüller Configurator (WMC) | alto | alto | Modo 'Cablear': tocar borne de origen y borne de destino, elegir color y sección, y la app arma la lista de cables con largo estimado según el recorrido por el cablecanal. |
| 79 | Gabinete o caja con prensacables | Weidmüller Configurator (WMC), Phoenix Contact clipx ENGINEER | alto | alto | Tabla de gabinetes estándar del mercado local; al terminar el acomodado la app propone el más chico donde entra la placa con la profundidad y la reserva pedidas, y permite ubicar prensacables con plantilla de perforado. |
| 96 | Bornes numerados, niveles, puentes y lista de bornes | TermiGrid; Stromlaufplan.de; Verteilerplaner (Sandmann4951) | alto | alto | Dentro del componente 'Bornera', una tabla de bornes con número, señal y destino, numeración automática por bornera y una hoja 'Lista de bornes' imprimible; los puentes como columna de potencial. |
| 97 | Lista de cables con colores automáticos y metros | DIN Rail Planner; ElectroCraft; Verteilerplaner (Sandmann4951) | alto | alto | Empezar sin dibujo: una tabla 'Cables' (desde, hasta, sección, color, marca) por tablero, con largo estimado por el recorrido del cablecanal entre los dos componentes y exportación a planilla. |
| 10 | Accesorios minimos agregados solos (auto-correccion) | Phoenix Contact PROJECT complete; Weidmuller WMC; hagercad; ABB StriePlan; Rittal RiPanel | alto | medio | Reglas por tipo de componente en el catalogo ('lleva tope a cada lado', 'lleva tapa final', 'lleva N tornillos') que suman renglones automaticos a la lista, cada una desactivable. |
| 36 | Zonas prohibidas y zonas con altura máxima | EPLAN (2D y Pro Panel), Zuken E3.panel, WSCAD Cabinet Engineering | alto | medio | Herramienta 'zona prohibida' (rectángulo con nombre y, opcional, altura máxima) que el acomodado automático esquiva y que da rojo con el aviso 'invade zona Ventilador'. |
| 40 | Plantilla de perforado 1:1 y agujeros automáticos | EPLAN Pro Panel, Zuken E3.panel+, AutoCAD Electrical, SEE Electrical 3D Panel+, WSCAD | alto | medio | Vista 'Perforado' con los agujeros de fijación de rieles, canales y aparatos de placa, tabla de coordenadas X/Y desde una esquina e impresión 1:1 en hojas A4 que se pegan sobre la placa. |
| 43 | Plano de puerta con cortes | Electro Graphics iDEA / Eplus / CADelet, EPLAN Pro Panel | alto | medio | Segunda superficie 'Puerta' con los aparatos de frente, su diámetro de corte, sus cotas y su profundidad hacia adentro, usada por el chequeo de cierre de puerta que ya existe. |
| 57 | Tapas finales, topes y placas separadoras agregados solos | WAGO Smart Designer, Phoenix Contact clipx ENGINEER, Weidmüller Configurator (WMC) | alto | medio | Regla por tipo de componente en el catálogo ('lleva tapa final', 'lleva tope a cada lado del grupo', 'separador al cambiar de tensión') que agregue esas piezas al riel y a la lista de materiales. |
| 69 | Cotas manuales en el plano | Weidmüller Configurator (WMC) | alto | medio | Herramienta de cota en el plano 2D: dos toques sobre bordes de rieles, canales o componentes y aparece la medida; además cotas automáticas de la posición de cada riel y canal respecto del borde de la placa. |
| 78 | Importar una lista y que el riel se arme solo | Weidmüller Configurator (WMC), Phoenix Contact PROJECT complete y clipx ENGINEER, WAGO Smart Designer | alto | medio | Importar una planilla con columnas etiqueta, referencia y cantidad y correr el acomodado automático; las referencias que no estén en el catálogo se listan para crearlas. |
| 95 | Zona de montaje directo a placa para aparatos sin riel | ElectroCraft | alto | medio | Un dato 'fijación' en el catálogo (riel, placa, ambos) y zonas libres en la placa donde los componentes de placa se ubican por coordenadas, con el mismo control de choques contra canal y puerta. |
| 48 | Autocompletar accesorios de riel (topes, tapas, marcadores) | Weidmüller Configurator, Phoenix Contact PROJECT complete, WAGO Smart Designer | alto | bajo | Regla por tipo de componente (por ejemplo, toda tira de bornes lleva tope a cada lado y tapa final) y botón 'completar accesorios' que los agrega al riel y a la lista, con aviso si falta alguno. |
| 16 | Calculo termico con bandas de color | Legrand XL PRO3; hagercad; Siemens SIMARIS therm; Gewiss PBT-Q; Eaton xEnergy Configurator; ABB DOC / OTC | medio | medio | Campo 'potencia disipada (W)' en cada componente del catalogo; el tablero suma los W y estima la sobretemperatura con la superficie del gabinete y el tipo de montaje (formula P = k x A x dT que publica Rittal), mostrando una franja verde, amarilla o roja con los grados estimados. |
| 17 | Guia de correccion termica con ventilador sugerido | Schrack Design; Legrand XL PRO3; Rittal RiTherm; Schneider ProClima | medio | medio | Si la franja termica da rojo, un asistente ofrece en orden: corregir ambiente y montaje, probar el gabinete siguiente de la tabla, o agregar un ventilador con filtro del catalogo. |
| 18 | Mover filas enteras e insertar fila | Legrand XL PRO3; Siemens SIMARIS project | medio | medio | Modo 'Rieles' donde se arrastra un riel completo con todos sus componentes y los demas rieles y canales se redistribuyen, mas la opcion 'Insertar riel aca'. |
| 23 | Importar una lista de materiales y armar el tablero | Siemens SIMARIS create; Siemens SIMARIS project; Hager Ready | medio | medio | Pegar o cargar una planilla (referencia, cantidad, etiqueta); la app la empareja con el catalogo, marca lo que no reconoce para crearlo y corre el acomodado. |
| 24 | Accesorios compatibles sugeridos | ABB e-Configure; Schneider EcoSet Config; ABB StriePlan | medio | medio | Campo 'va con...' en el catalogo: al agregar un contactor ofrece su bloque auxiliar o rele termico, al agregar una fuente ofrece su proteccion. |
| 44 | Llenado de cablecanal con semáforo | WSCAD Cabinet Engineering, EPLAN Pro Panel, SolidWorks Electrical, Zuken E3.panel | medio | medio | Mientras no haya esquema: estimar los cables por tramo a partir de la cantidad de bornes de los aparatos del riel vecino (dato nuevo del catálogo) y una sección típica, y pintar cada canal verde, amarillo o rojo con su porcentaje. |
| 45 | Cálculo térmico y mapa de calor | EPLAN Pro Panel con Rittal RiTherm, hagercad, PC/SCHEMATIC PanelBuilder | medio | medio | Campo 'potencia disipada (W)' en el catálogo; resumen del tipo 'disipa 180 W, el gabinete evacúa 140 W con 10 °C de diferencia: falta ventilación' y un sombreado de calor opcional sobre el plano. |
| 49 | Bornes de reserva, accesorios y puentes en la tira de bornes | AutoCAD Electrical (Terminal Strip Editor) | medio | medio | Componente 'tira de bornes' con parámetros: cantidad, numeración inicial, reservas y puentes; su ancho se calcula solo y cada borne lleva su número en el plano y en las etiquetas. |
| 55 | Exportación a CAD (DXF/DWG y STEP) | Weidmüller Configurator, Zuken E3.panel+, Phoenix Contact PROJECT complete | medio | medio | Exportar el plano 2D (placa, rieles, canales, contornos y agujeros) a DXF en capas separadas, generado en el navegador sin servidor. |
| 61 | Corte cero del riel perforado y agujeros de fijación reales | Phoenix Contact clipx ENGINEER, Weidmüller Configurator (WMC) | medio | medio | En la lista de corte indicar largo y desde qué ranura cortar, y en el plano marcar los agujeros de fijación de cada riel a la placa para puntear y perforar. |
| 71 | Puente enchufable en lugar de puentes de cable | Phoenix Contact clipx ENGINEER | medio | medio | Marcar bornes contiguos como 'mismo potencial' y que la app agregue a la lista de materiales el puente peine con la cantidad justa de polos. |
| 100 | Hojas autoadhesivas estándar con inicio en la etiqueta N | loadcenterlabels | medio | medio | Un formato alternativo de impresión con filas, columnas, márgenes y tamaño de etiqueta configurables y un campo 'empezar en la posición'. |
| 110 | Importar el catálogo desde planilla o código de barras | Verteilerplaner (Sandmann4951); TermiGrid | medio | medio | Importar y exportar el catálogo en CSV (nombre, marca, referencia, ancho, alto, profundidad, costo) con vista previa de filas nuevas y repetidas antes de aceptar. |
| 26 | Placa de caracteristicas del tablero | Schrack Design; Gewiss PBT-Q | medio | bajo | Etiqueta imprimible con fabricante, modelo, numero de serie, tension, corriente y fecha tomados de la ficha del tablero. |
| 33 | Compatibilidad de montaje entre aparato y riel | Zuken E3.panel | medio | bajo | Campo 'montaje' en el catálogo (riel DIN 35, placa, puerta); el arrastre solo se engancha a destinos compatibles y los aparatos de placa se sueltan libres sobre la placa. |
| 58 | Usar el espacio libre del riel para completar accesorios | Weidmüller Configurator (WMC) | medio | bajo | Cuando 'Arreglar todo' agregue topes o tapas, usar primero los milímetros libres del riel y solo si no alcanza avisar cuántos faltan, con el mismo mensaje que ya usamos. |
| 64 | Series preferidas para las sugerencias | Weidmüller Configurator (WMC) | medio | bajo | En el catálogo, marcar un componente como 'preferido' por función; las preselecciones por máquina y el cambio por equivalente usan primero los preferidos. |
| 74 | Códigos de artículo propios por lista de mapeo | Phoenix Contact clipx ENGINEER | medio | bajo | Importar una planilla 'referencia de fábrica → código interno, proveedor y precio' y mostrar esas columnas en la lista de materiales; es la base para cotizar. |
| 91 | Topes, tapas finales y puentes agregados solos a la lista | TermiGrid; WAGO Smart Designer | medio | bajo | Reglas simples en la lista de materiales: dos topes por grupo de aparatos, una tapa final por bornera, tapa y soportes por tramo de cablecanal, con cantidades editables. |
| 98 | Celdas de etiqueta combinadas, divididas y vacías | Electrical Panel Label Generator; TermiGrid | medio | bajo | En la vista de etiquetas, permitir unir las celdas de componentes vecinos bajo un título común y dejar en blanco, con su ancho real, los huecos y la reserva. |
| 28 | Alta de aparatos por voz | Hager Ready | bajo | medio | Boton de microfono que entiende frases como 'tres contactores de nueve amperes' y los agrega; el reconocimiento de voz del navegador suele necesitar conexion. |
| 54 | Peso total del tablero | EPLAN Pro Panel | bajo | bajo | Campo 'peso' opcional en el catálogo y total en el encabezado de la lista de materiales, con aviso de cuántos componentes no lo tienen cargado. |
| 73 | Chequeo de homologaciones de los artículos | Phoenix Contact clipx ENGINEER | bajo | bajo | Campo opcional de certificaciones en el catálogo y un aviso en la revisión cuando un componente no tiene la que se marcó como requerida para ese tablero. |
| 101 | Plantilla de etiqueta con o sin pictograma | Hager Ready; Schneider eDesign; Electrical Panel Label Generator; nelko-p21-ble-labels | bajo | bajo | Un juego corto de iconos propios (bomba, ventilador, válvula, luz, alarma) asociado a la función del componente y un interruptor 'con icono / solo texto' al imprimir. |
| 112 | Distinguir componentes existentes de nuevos | HV-Planer | bajo | bajo | Un estado por componente (a comprar, en stock, provisto por el cliente) que filtre la lista de materiales. |

## Detalle de cada función

### Configuradores de los fabricantes de tableros

**1. Reserva de espacio configurable (y reserva aparte para bornes)** · ya está en la app

- *Quién la tiene:* Legrand XL PRO3; hagercad; ABB StriePlan
- *Cómo funciona:* XL PRO3 calcula el gabinete con una reserva modular minima del 20% por defecto, que se materializa como lugares vacios o incluso rieles vacios agregados; el porcentaje se sube o baja con botones + y -. Tiene ademas una reserva separada para la bornera de salida (menu Envolventes > Ajustes > Reserva minima de bornes). hagercad tambien propone una reserva minima de lugar del 20% que se puede cambiar, y en StriePlan el primer paso del asistente de gabinete es dimensionar la reserva.
- *Para qué sirve:* Dejar lugar para ampliaciones sin recalcular a mano y evitar que el tablero salga justo.
- *En Tableros MEC:* Menú → Medidas del tablero → “Lugar libre a dejar en cada riel (%)”. Zona rayada en el plano y amarillo cuando se invade. Falta la reserva aparte para la bornera.
- *Fuente:* https://www.legrand.nl/sites/g/files/ocwmcr626/files/2023-05/XLPro3_User_manual_En%202015.pdf

**2. Propuesta automatica de gabinete: solo los que entran** · ya está en la app

- *Quién la tiene:* hagercad; Legrand XL PRO3; Siemens SIMARIS project; Schrack Design; Gewiss PBT-Q; Schneider eDesign
- *Cómo funciona:* hagercad, al iniciar el calculo de armario, hace unas preguntas (acometida, bornes de salida, reserva de lugar, grado de proteccion) y propone unicamente los gabinetes en los que entran los aparatos elegidos. SIMARIS project determina solo el sistema mas adecuado y las dimensiones a partir de la lista de aparatos; Schrack Design, si el gabinete elegido no alcanza, recomienda el tamano correcto. En XL PRO3 la ventana de seleccion pide altura util, ancho, puerta, cerradura y tipo de placa; en PBT-Q al elegir un panel se resaltan los armarios en los que cabe.
- *Para qué sirve:* No probar tamanos a mano ni comprar un gabinete que despues queda chico.
- *En Tableros MEC:* Menú → ¿Qué placa necesito?: calcula la placa más chica con un riel menos, los mismos y uno más. No elige de un catálogo de gabinetes comerciales.
- *Fuente:* https://assets.sc.hager.com/de-ch/-/media/project/hagerdeep/happiapp/hager/happiapp/ch/documentation/03-themenbrochueren/hager_broschuere_hagercad_de.pdf?la=de-ch

**3. Banco de trabajo para lo que no esta colocado** · ya está en la app

- *Quién la tiene:* Legrand XL PRO3; Schneider eDesign
- *Cómo funciona:* En XL PRO3 el panel izquierdo de la vista previa es un banco de trabajo: los aparatos nuevos aparecen ahi y se arrastran al gabinete, y las filas que ya no entran se mandan solas al banco en vez de quedar superpuestas. Todo lo que esta en el banco sigue perteneciendo al tablero y figura en la lista de materiales. eDesign usa el mismo concepto, con botones para montar o desmontar todos los aparatos de una vez y clic derecho > desmontar; si se cambia de gama de gabinete hay que volver a montar desde el banco.
- *Para qué sirve:* Que nada quede encimado ni se pierda cuando se achica la placa o se cambia de gabinete.
- *En Tableros MEC:* Bandeja “Sin ubicar” debajo del plano; en rojo lo que no entra en ningún riel.
- *Fuente:* https://productinfo.se.com/edesignbuildingpanel/edesign-building-panel/English/DOCA0184EN-07.pdf

**4. Saltos de fila que el acomodado respeta** · ya está en la app

- *Quién la tiene:* Legrand XL PRO3
- *Cómo funciona:* Se inserta una marca de corte delante de un aparato: ese aparato y todos los que siguen pasan a la fila siguiente (o al gabinete siguiente). Las marcas se ven completas en la vista previa e influyen en la eleccion del gabinete.
- *Para qué sirve:* Fijar a mano donde empieza cada grupo sin renunciar al acomodado automatico.
- *En Tableros MEC:* “📌 Fijar” en la ficha de cada aparato: al acomodar no cambia de riel y el resto se reparte alrededor. Las preselecciones además fijan qué función va en cada riel.
- *Fuente:* https://docplayer.net/26266837-Xl-pro3-user-manual-distribution-panel-design-software-products-and-systems-for-electrical-and-digital-building-infrastructures.html

**5. Tiras de etiquetas por riel a tamano real** · ya está en la app

- *Quién la tiene:* Legrand XL PRO3; Hager Ready; Schneider eDesign
- *Cómo funciona:* En el modulo Etiquetas de XL PRO3 las tiras se crean solas y siguen la disposicion de la vista previa; ademas cada aparato con portaetiqueta genera su etiqueta. El texto se edita ahi mismo, se achica solo para entrar (avisa que un texto demasiado largo se sale del area), y se elige fuente, tamano, color, fondo, rotacion y pictogramas. Hager Ready genera las tiras de todos los aparatos en PDF con plantilla 'solo marca' o 'marca + pictograma + ubicacion', elegida en los ajustes del proyecto, y recomienda imprimir en tamano real o 100%. eDesign toma el texto del marcador funcional y exporta las etiquetas en PDF.
- *Para qué sirve:* Rotular el tablero sin tipear dos veces ni medir casillas a mano.
- *En Tableros MEC:* Menú → Carteles y etiquetas: una tira por riel a tamaño real, con regla de control de 100 mm.
- *Fuente:* https://hager.com/es/documentacion-downloads/apps-softwares/hager-ready/faq-hager-ready

**6. Largo de riel calculado y lista de corte** · ya está en la app

- *Quién la tiene:* Weidmuller Configurator (WMC); ABB StriePlan
- *Cómo funciona:* WMC calcula el largo de riel DIN necesario para la tira configurada y lo incluye en la lista de materiales que exporta; las notas de version mencionan una opcion de corte a cero del riel. StriePlan calcula solos los rieles necesarios, muestra su disposicion en el grafico y los agrega a la lista de pedido.
- *Para qué sirve:* Cortar riel y cablecanal una sola vez y saber cuantas barras comprar.
- *En Tableros MEC:* Menú → Lista de corte: riel y cablecanal, con reparto en barras de 2 m y sobrantes.
- *Fuente:* https://control.com/news/online-weidmuller-configurator-simplifies-control-system-design/

**7. Lista de materiales con precios, mano de obra y presupuesto** · está en parte

- *Quién la tiene:* Legrand XL PRO3; Schneider eDesign; Rittal RiPanel; hagercad; Siemens SIMARIS configuration; ABB StriePlan
- *Cómo funciona:* XL PRO3 tiene un modulo Resumen con el costeo y la orden de compra del tablero: suma el precio neto sin impuestos y la mano de obra estimada (con valores por defecto editables) y exporta a texto o CSV para Excel. eDesign exporta la lista en .xlsx con precios publicos. RiPanel muestra el precio en vivo durante toda la configuracion, incluido el armado; hagercad usa la lista para un calculo de costos integrado.
- *Para qué sirve:* Pasar del tablero armado al presupuesto sin rehacer la planilla.
- *En Tableros MEC:* Precio por componente en el catálogo, total por tablero y por serie. Falta mano de obra y presupuesto para el cliente.
- *Fuente:* https://dokumen.tips/documents/legrand-xl-pro-3-user-manual.html

**8. Proyecto con varios tableros, duplicar y lista consolidada** · está en parte

- *Quién la tiene:* Legrand XL PRO3; Hager Ready; Schrack Design
- *Cómo funciona:* XL PRO3 tiene, ademas del resumen por tablero, un 'Resumen de estudio' que gestiona juntos todos los tableros de un estudio. En Hager Ready un proyecto admite hasta 10 tableros (version irlandesa) y cada uno se duplica desde el menu de tres puntos. Schrack Design planifica varios tableros independientes, cada uno con su lista.
- *Para qué sirve:* Comprar de una vez para toda la serie y no rearmar tableros iguales.
- *En Tableros MEC:* Mis tableros, Copiar y “Tableros iguales a armar” (multiplica materiales y cortes). Falta la lista consolidada de tableros distintos.
- *Fuente:* https://hager.com/ie/tools/faq-hager-ready

**9. Plantillas y macros propios** · ya está en la app

- *Quién la tiene:* Schrack Design; ABB DOC (e-Design)
- *Cómo funciona:* Schrack Design trae tableros estandar ya planificados que se abren como punto de partida y permite guardar como macros las combinaciones de articulos que se configuran seguido. ABB DOC tiene un 'archivo de columnas' para insertar columnas predefinidas en el tablero en curso.
- *Para qué sirve:* Reusar lo que el taller arma siempre igual.
- *En Tableros MEC:* Menú → Guardar como preselección; aparece en “Tablero nuevo”.
- *Fuente:* https://www.schrack.at/tools/schrack-design-software

**10. Accesorios minimos agregados solos (auto-correccion)** · pendiente

- *Quién la tiene:* Phoenix Contact PROJECT complete; Weidmuller WMC; hagercad; ABB StriePlan; Rittal RiPanel
- *Cómo funciona:* PROJECT complete tiene una funcion de auto-correccion que agrega los accesorios minimos obligatorios de una tira de bornes: topes finales, tapas y marcadores. WMC coloca solo los topes finales y aprovecha el espacio libre del riel para completar accesorios. hagercad agrega automaticamente rieles soporte y travesanos, y RiPanel al colocar un accesorio suma la tornilleria de montaje.
- *Para qué sirve:* Que la lista de compra salga completa, sin olvidar topes, tapas y tornillos.
- *Cómo adaptarla:* Reglas por tipo de componente en el catalogo ('lleva tope a cada lado', 'lleva tapa final', 'lleva N tornillos') que suman renglones automaticos a la lista, cada una desactivable.
- *Fuente:* https://www.phoenixcontact.com/en-ie/terminal-strip-configuration-project-complete

**11. Plano acotado y exportacion DXF** · está en parte

- *Quién la tiene:* hagercad; Siemens SIMARIS configuration; Rittal RiPanel
- *Cómo funciona:* La ejercitacion oficial de hagercad sobre calculo de armario y plano de montaje incluye el paso 'acotar el armario' (solo se vio el indice, no el detalle). SIMARIS configuration saca las vistas de frente y de recortes en DXF o DWG para seguir en CAD. RiPanel entrega al terminar dibujos CAD 3D, DXF y PDF.
- *Para qué sirve:* Marcar y perforar la placa desde el plano, sin medir sobre la pantalla.
- *En Tableros MEC:* Botón “Medidas” en el plano y hoja “Plano con medidas” en la carpeta. Falta exportar DXF.
- *Fuente:* https://www.hager.at/files/download/0/2452718_1/0/40_HagerCAD_AT_Schrankberechnug_Aufbauplan.pdf

**12. Recortes y perforaciones de puerta generados solos** · pendiente

- *Quién la tiene:* Rittal RiPanel
- *Cómo funciona:* Al colocar un accesorio en el modelo 3D, RiPanel genera automaticamente el recorte necesario en la puerta o el lateral y revisa colisiones. Tambien permite usar patrones de perforacion predefinidos o importar recortes propios desde DXF/DWG; el patron queda centrado por defecto y se ubica ingresando coordenadas. El resultado puede pasar a maquinas de mecanizado.
- *Para qué sirve:* Perforar la puerta para pilotos, selectores y pantallas sin errores de medida.
- *Cómo adaptarla:* Vista 'Puerta' para colocar pilotos, pulsadores, selectores y pantallas con el diametro o recorte del catalogo, chequear que no choquen entre si ni con lo montado detras, e imprimir la plantilla de perforado 1:1.
- *Fuente:* https://www.rittal.com/com-en/blog/online-enclosure-configurator

**13. Verificador del proyecto con lista de problemas** · ya está en la app

- *Quién la tiene:* Weidmuller WMC; WAGO smartDESIGNER; Hager Ready; Schneider EcoSet Config
- *Cómo funciona:* WMC tiene un asistente de verificacion que revisa todo el proyecto o solo la pestana actual y abre una ventana con el resumen del proyecto y la lista de todos los resultados. smartDESIGNER corre un chequeo de plausibilidad al terminar la tira. Hager Ready revisa el tablero contra la norma y, si hay desvios, recomienda las correcciones necesarias.
- *Para qué sirve:* Ver todos los pendientes juntos antes de mandar a fabricar.
- *En Tableros MEC:* Tocar el cartel de estado abre “Revisión del tablero”: todo lo rojo, lo amarillo y los datos a verificar; cada renglón lleva al aparato.
- *Fuente:* https://assets.dam.weidmueller.com/assets/api/612b700b-b67f-4937-b667-5daa013ef788/Original/Weidmueller_Configurator_WMC_user_manual.pdf

**14. Leyenda para la puerta e indice de circuitos** · ya está en la app

- *Quién la tiene:* Hager Ready; Schrack Design
- *Cómo funciona:* Hager Ready genera, junto con las tiras de etiquetas, la leyenda para la puerta del tablero en PDF para imprimir. Schrack Design 4.2 arma un indice de circuitos configurable: se elige que articulos aparecen y en que orden.
- *Para qué sirve:* Que quien abra el tablero sepa que es cada cosa.
- *En Tableros MEC:* Carpeta → “Referencias para pegar en la puerta”.
- *Fuente:* https://www.elektro.net/105571/planungs-und-beschriftungsassistent-fuer-die-baustelle/

**15. Paquete de documentacion en un clic** · ya está en la app

- *Quién la tiene:* Rittal RiPanel; Hager Ready; hagercad; Phoenix Contact PROJECT complete; Weidmuller WMC
- *Cómo funciona:* RiPanel, al terminar, manda un enlace con todo: dibujos 3D en CAD, DXF, PDF de componentes, instrucciones de armado, lista de materiales y un CSV para el sistema de gestion. hagercad genera tras unas pocas preguntas plano de montaje, plano de bornes, calculo de disipacion, costeo y etiquetas. PROJECT complete crea con un clic las listas de pedido, de piezas, de estructura y de montaje.
- *Para qué sirve:* Entregar al armador y al cliente una sola carpeta completa.
- *En Tableros MEC:* Menú → Imprimir la carpeta: plano, materiales, cortes, referencias y carteles; también como PDF.
- *Fuente:* https://blog.rittal.co.uk/rittalripanel

**16. Calculo termico con bandas de color** · pendiente

- *Quién la tiene:* Legrand XL PRO3; hagercad; Siemens SIMARIS therm; Gewiss PBT-Q; Eaton xEnergy Configurator; ABB DOC / OTC
- *Cómo funciona:* XL PRO3 muestra en la vista del gabinete bandas de color con la temperatura media, la maxima en la parte superior y la minima en la parte inferior (esta contra el punto de rocio); la vista se actualiza sola y cada banda pasa a verde cuando el valor es aceptable. hagercad suma las potencias disipadas de todos los aparatos y considera la superficie de enfriamiento y la forma de instalacion (un tablero exento disipa mas que uno mural). SIMARIS therm trae mas de 20.000 valores de disipacion y admite aparatos de terceros.
- *Para qué sirve:* Detectar antes de armar si el tablero va a recalentar.
- *Cómo adaptarla:* Campo 'potencia disipada (W)' en cada componente del catalogo; el tablero suma los W y estima la sobretemperatura con la superficie del gabinete y el tipo de montaje (formula P = k x A x dT que publica Rittal), mostrando una franja verde, amarilla o roja con los grados estimados.
- *Fuente:* https://docplayer.net/26266837-Xl-pro3-user-manual-distribution-panel-design-software-products-and-systems-for-electrical-and-digital-building-infrastructures.html

**17. Guia de correccion termica con ventilador sugerido** · pendiente

- *Quién la tiene:* Schrack Design; Legrand XL PRO3; Rittal RiTherm; Schneider ProClima
- *Cómo funciona:* En Schrack Design se hace clic en la temperatura que aparece al pie de la lista de materiales y se abre una guia por pasos: primero ajustar temperatura ambiente, forma de instalacion y factor de reduccion; despues cambiar el gabinete por uno mas grande o ajustar barras; y si aun no alcanza, el programa sugiere una unidad de ventilacion adecuada. XL PRO3 ofrece automaticamente el kit de circulacion de aire que corresponde al gabinete. RiTherm informa la temperatura que se alcanzaria sin refrigeracion y la potencia de enfriamiento necesaria, y guarda el resultado en PDF.
- *Para qué sirve:* Saber que hacer cuando el calculo termico da mal.
- *Cómo adaptarla:* Si la franja termica da rojo, un asistente ofrece en orden: corregir ambiente y montaje, probar el gabinete siguiente de la tabla, o agregar un ventilador con filtro del catalogo.
- *Fuente:* https://www.schrack.com/tools/schrack-design-software-1

**18. Mover filas enteras e insertar fila** · pendiente

- *Quién la tiene:* Legrand XL PRO3; Siemens SIMARIS project
- *Cómo funciona:* En XL PRO3 los aparatos se mueven a lo largo de su fila o a otra fila solo si hay espacio suficiente; para hacer lugar se los estaciona en el banco o se crea una fila nueva. Para mover una fila entera se pasa a la vista de tapas y se arrastra la fila por su tapa: las demas filas y las tapas ciegas se reacomodan solas. Clic derecho > crear nueva fila la inserta encima de donde se hizo clic; en SIMARIS project mover una unidad tambien exige que quede espacio.
- *Para qué sirve:* Reordenar el tablero por bloques en vez de aparato por aparato.
- *Cómo adaptarla:* Modo 'Rieles' donde se arrastra un riel completo con todos sus componentes y los demas rieles y canales se redistribuyen, mas la opcion 'Insertar riel aca'.
- *Fuente:* https://www.legrand.nl/sites/g/files/ocwmcr626/files/2023-05/XLPro3_User_manual_En%202015.pdf

**19. Posicion propuesta en verde al arrastrar** · ya está en la app

- *Quién la tiene:* Schneider eDesign
- *Cómo funciona:* Al montar un aparato desde el banco de trabajo arrastrandolo a la vista frontal, eDesign muestra la ubicacion propuesta con una marca verde (edicion 10/2025 de la guia; no se vio mas detalle).
- *Para qué sirve:* Saber donde va a caer el aparato antes de soltarlo.
- *En Tableros MEC:* Al arrastrar se ve dónde va a quedar el aparato antes de soltarlo.
- *Fuente:* https://productinfo.se.com/edesign_user_guide/doca0184-edesign-ug/English/DOCA0184EN_eDesign_UG_DD00823686.pdf

**20. Panel de espacio libre siempre visible** · ya está en la app

- *Quién la tiene:* Schneider eDesign
- *Cómo funciona:* En la vista frontal de eDesign, el lado derecho de la pantalla muestra las caracteristicas del gabinete y el espacio vacio del tablero.
- *Para qué sirve:* Ver de un vistazo cuanto lugar queda.
- *En Tableros MEC:* Renglón de ocupación (porcentaje, libre y módulos de 18 mm) y barra por riel con mm libres.
- *Fuente:* https://productinfo.se.com/edesignbuildingpanel/edesign-building-panel/English/DOCA0184EN-07.pdf

**21. Modo construccion (bloqueo de edicion)** · ya está en la app

- *Quién la tiene:* Schneider eDesign
- *Cómo funciona:* Para reorganizar los aparatos ya montados en el gabinete hay que entrar al modo construccion tocando el icono del destornillador.
- *Para qué sirve:* Evitar que un toque accidental desarme el tablero.
- *En Tableros MEC:* Botón “Bloquear” del plano: se puede mirar, tildar el armado e imprimir, pero no mover nada.
- *Fuente:* https://productinfo.se.com/edesignbuildingpanel/edesign-building-panel/Spanish/DOCA0184ES-07.pdf

**22. Enviar la lista al proveedor** · ya está en la app

- *Quién la tiene:* Hager Ready; Siemens SIMARIS create; Rittal RiPanel
- *Cómo funciona:* Hager Ready transfiere la lista del proyecto al carrito de la tienda online del mayorista (interfaz Elbridge, tambien en la version PC) y la exporta como Excel. SIMARIS create exporta la lista y permite mandarla por mail o pedirla directo al fabricante.
- *Para qué sirve:* Pedir materiales sin copiar referencias a mano.
- *En Tableros MEC:* Componentes → “Pedido para el proveedor”: texto agrupado por marca para WhatsApp o mail.
- *Fuente:* https://apps.apple.com/de/app/hager-ready/id1242959502

**23. Importar una lista de materiales y armar el tablero** · pendiente

- *Quién la tiene:* Siemens SIMARIS create; Siemens SIMARIS project; Hager Ready
- *Cómo funciona:* SIMARIS create permite importar la lista de materiales o arrastrar aparatos del catalogo y despues definir columnas y kits de montaje. SIMARIS project coloca solos los componentes listados (paso de colocacion automatica) y genera la vista frontal. Hager Ready tiene modos 'Automatico' y 'Automatico segun planilla de locales' que arman tablero y esquema a partir de las notas del relevamiento.
- *Para qué sirve:* Arrancar desde una planilla del cliente o del proyectista.
- *Cómo adaptarla:* Pegar o cargar una planilla (referencia, cantidad, etiqueta); la app la empareja con el catalogo, marca lo que no reconoce para crearlo y corre el acomodado.
- *Fuente:* https://www.siemens.com/en-us/products/simaris/create/

**24. Accesorios compatibles sugeridos** · pendiente

- *Quién la tiene:* ABB e-Configure; Schneider EcoSet Config; ABB StriePlan
- *Cómo funciona:* e-Configure da sugerencias guiadas de accesorios que combinan con el producto elegido. EcoSet Config sugiere productos automaticamente segun los aparatos seleccionados y valida la compatibilidad de la configuracion. StriePlan propone accesorios y tiene un chequeo de plausibilidad que impide mezclar gamas incompatibles.
- *Para qué sirve:* No olvidar el auxiliar, la base o la proteccion que acompana a cada aparato.
- *Cómo adaptarla:* Campo 'va con...' en el catalogo: al agregar un contactor ofrece su bloque auxiliar o rele termico, al agregar una fuente ofrece su proteccion.
- *Fuente:* https://new.abb.com/low-voltage/support/e-configure

**25. Ficha del proyecto e informe con logo** · está en parte

- *Quién la tiene:* Schneider eDesign; Schneider ProClima; Legrand XL PRO3
- *Cómo funciona:* eDesign tiene una vista de informacion del proyecto y exporta un informe editable en .docx que incluye la lista de materiales; el unifilar sale en PDF con una hoja de caratula. ProClima entrega el informe final con el logo de la empresa del usuario y en varios idiomas. XL PRO3 tiene un rotulo editable que se exporta e importa desde otro estudio.
- *Para qué sirve:* Entregar documentacion con la identidad del taller y los datos del cliente.
- *En Tableros MEC:* Las hojas llevan nombre del tablero, placa y fecha. Falta logo y datos del cliente.
- *Fuente:* https://productinfo.se.com/edesignbuildingpanel/edesign-building-panel/English/DOCA0184EN-07.pdf

**26. Placa de caracteristicas del tablero** · pendiente

- *Quién la tiene:* Schrack Design; Gewiss PBT-Q
- *Cómo funciona:* Las paginas de Schrack Design anuncian impresion directa de la placa de caracteristicas del tablero (no se vio el detalle de pantalla). PBT-Q imprime la declaracion de conformidad junto con la verificacion de sobretemperatura.
- *Para qué sirve:* Identificar cada tablero de la serie al entregarlo.
- *Cómo adaptarla:* Etiqueta imprimible con fabricante, modelo, numero de serie, tension, corriente y fecha tomados de la ficha del tablero.
- *Fuente:* https://www.schrack.at/tools/schrack-design-software

**27. Relleno automatico de la reserva** · está en parte

- *Quién la tiene:* Legrand XL PRO3; hagercad; Schneider eDesign
- *Cómo funciona:* XL PRO3 equipa automaticamente con tapas ciegas las posiciones sin aparatos. hagercad tiene la opcion de completar o borrar automaticamente los modulos vacios, y eDesign ofrece riel DIN y frente modular para el espacio de reserva al completar el tablero.
- *Para qué sirve:* Que la reserva tambien quede prolija y presupuestada.
- *En Tableros MEC:* Hay “Reserva” de 1, 2 y 4 módulos para colocar a mano. Falta el relleno automático.
- *Fuente:* https://www.legrand.nl/sites/g/files/ocwmcr626/files/2023-05/XLPro3_User_manual_En%202015.pdf

**28. Alta de aparatos por voz** · pendiente

- *Quién la tiene:* Hager Ready
- *Cómo funciona:* En Hager Ready los aparatos modulares se agregan al riel desde la guia de productos, desde la lista de aparatos o por reconocimiento de voz.
- *Para qué sirve:* Cargar componentes con las manos ocupadas.
- *Cómo adaptarla:* Boton de microfono que entiende frases como 'tres contactores de nueve amperes' y los agrega; el reconocimiento de voz del navegador suele necesitar conexion.
- *Fuente:* https://hager.com/es/documentacion-downloads/apps-softwares/hager-ready/faq-hager-ready

### Programas de diseño de placa (CAD eléctrico)

**29. Lista de pendientes: colocados y sin colocar** · ya está en la app

- *Quién la tiene:* AutoCAD Electrical, EPLAN Pro Panel, SolidWorks Electrical, SEE Electrical Cabinet Layout
- *Cómo funciona:* En AutoCAD Electrical, 'Insert Footprint (Schematic List)' abre una lista con todos los componentes del proyecto; la lista tilda los que ya tienen su huella en la placa y la opción 'Hide Existing' deja a la vista solo los que faltan. En EPLAN el navegador de montaje 3D lista los aparatos con artículo asignado, marca con un icono extra los ya colocados y, si se selecciona un nodo entero, los coloca todos juntos. En SolidWorks Electrical se hace clic derecho > Insertar sobre el componente del árbol lateral; SEE usa una 'pick list' con todas las partes del proyecto.
- *Para qué sirve:* Que ningún componente de la lista de materiales quede sin ubicar y saber de un vistazo cuánto falta.
- *En Tableros MEC:* Bandeja “Sin ubicar” y pestaña “Armar” con el conteo de montados.
- *Fuente:* https://help.autodesk.com/cloudhelp/2020/ENU/AutoCAD-Electrical/files/GUID-AA347F50-BAD5-4013-B078-F687F0B836C0.htm

**30. Colocación múltiple con separación fija y reparto parejo** · está en parte

- *Quién la tiene:* AutoCAD Electrical, SolidWorks Electrical, SkyCAD
- *Cómo funciona:* Al elegir varios componentes de la lista e insertar, AutoCAD Electrical abre el diálogo 'Spacing for Footprint Insertion', donde se define el orden y se tilda 'Use uniform spacing' con la distancia X/Y (hay un valor por defecto en la configuración del plano). SolidWorks Electrical pregunta de qué lado (izquierda o derecha) van los siguientes y tiene un campo 'Spacing': con 10, pone cuatro aparatos de izquierda a derecha separados 10 mm. SkyCAD tiene un comando propio, 'Spacing items equally', para repartir parejo lo ya colocado.
- *Para qué sirve:* Poner de una vez una fila de aparatos con la misma luz entre ellos.
- *En Tableros MEC:* Duplicar y separación por aparato. Falta colocar varios de una vez y repartir parejo.
- *Fuente:* https://help.autodesk.com/cloudhelp/2025/ENU/AutoCAD-Electrical/files/GUID-CE13BC1F-5E32-4F15-8432-46DBB7F4307A.htm

**31. Cerrar huecos en el riel** · ya está en la app

- *Quién la tiene:* EPLAN Pro Panel
- *Cómo funciona:* Los aparatos puestos uno al lado del otro sobre un riel (o barra) que quedaron con huecos entre sí se alinean sin espacios con un comando. Actúa sobre lo ya colocado, sin volver a insertarlo.
- *Para qué sirve:* Recuperar espacio después de sacar o cambiar un componente sin reacomodar todo a mano.
- *En Tableros MEC:* Los aparatos siempre quedan arrimados; solo hay hueco si se carga una separación.
- *Fuente:* https://eplan.help/en-us/infoportal/content/Plattform/2024/Content/htm/cabinetgui_h_lueckenlosaufreihen.htm

**32. Imán a riel con punto de agarre y desplazamiento** · ya está en la app

- *Quién la tiene:* EPLAN Pro Panel, SolidWorks Electrical 3D, Capital X Panel Designer, Zuken E3.panel, SEE Electrical 3D Panel+
- *Cómo funciona:* EPLAN coloca por defecto el aparato centrado sobre el riel; si no va centrado, se carga en los datos del artículo un desplazamiento respecto del eje del riel y se aplica solo. Al colocar, el menú 'Placement options' deja elegir el punto de agarre y escribir un desplazamiento; en rieles y canales la tecla A cambia el agarre entre centro, arriba y abajo. En SolidWorks basta hacer clic en un punto del riel y el aparato se centra ahí; en Capital X Panel Designer, con la preferencia 'Automatically Place Layout Symbols on Rails', soltar el símbolo sobre el riel lo ubica y ordena solo.
- *Para qué sirve:* Colocar rápido y que los aparatos cuyo enganche no está en el centro queden dibujados a su altura real.
- *En Tableros MEC:* Todo lo que se suelta cae sobre un riel, en el lugar más cercano.
- *Fuente:* https://eplan.help/en-us/Infoportal/Content/Plattform/2.9/Content/htm/partsmanagementgui_r_montagedaten.htm

**33. Compatibilidad de montaje entre aparato y riel** · pendiente

- *Quién la tiene:* Zuken E3.panel
- *Cómo funciona:* Cada riel tiene un 'tipo de riel de montaje' y solo se pueden colocar sobre él los componentes que declaran ese mismo tipo. Al arrastrar, el programa responde en vivo sobre las posiciones válidas y rechaza las partes incompatibles.
- *Para qué sirve:* Evitar planear sobre riel DIN un aparato que va atornillado a la placa o en otro perfil.
- *Cómo adaptarla:* Campo 'montaje' en el catálogo (riel DIN 35, placa, puerta); el arrastre solo se engancha a destinos compatibles y los aparatos de placa se sueltan libres sobre la placa.
- *Fuente:* https://www.zuken.com/doc/e3/series/en/Content/reference/database/model/define_mount.htm

**34. Colisión en vivo que marca a los dos involucrados** · ya está en la app

- *Quién la tiene:* EPLAN Pro Panel, WSCAD Cabinet Engineering, SEE Electrical 3D Panel+, Zuken E3.panel
- *Cómo funciona:* En EPLAN el control de colisión corre cada vez que algo se coloca, mueve, copia, rota o alarga. Cuando hay choque pinta de color los dos objetos involucrados, lo informa en la barra de estado y no deja terminar la colocación. Los choques buscados (un aparato embutido en la puerta) no cuentan como colisión. WSCAD lista además ayudas de posicionado que impiden superponer.
- *Para qué sirve:* Ver al instante contra qué choca cada cosa, no solo que no entra.
- *En Tableros MEC:* Rojo si se pasa del riel, choca con el cablecanal o no deja cerrar la puerta; con el motivo escrito.
- *Fuente:* https://www.eplan.help/en-us/Infoportal/Content/Plattform/2.9/Content/htm/cabinetgui_h_kollisionskontrolle.htm

**35. Distancias mínimas de montaje por componente** · está en parte

- *Quién la tiene:* EPLAN Pro Panel (con datos de fabricantes como Phoenix Contact)
- *Cómo funciona:* En la ficha de montaje de cada artículo hay campos de distancia libre en ancho, alto y profundidad que definen una zona de seguridad alrededor del aparato. El control de colisión las toma en cuenta solo: si otro aparato invade esa zona, lo trata como choque. Los fabricantes pueden entregar la separación mínima junto con el artículo.
- *Para qué sirve:* Respetar el aire que piden variadores, fuentes y PLC arriba, abajo y a los costados.
- *En Tableros MEC:* Separación por aparato y distancia mínima al cablecanal. Falta la distancia propia de cada modelo.
- *Fuente:* https://eplan.help/en-us/Infoportal/Content/Plattform/2.9/Content/htm/partsmanagementgui_r_montagedaten.htm

**36. Zonas prohibidas y zonas con altura máxima** · pendiente

- *Quién la tiene:* EPLAN (2D y Pro Panel), Zuken E3.panel, WSCAD Cabinet Engineering
- *Cómo funciona:* En EPLAN se dibuja un rectángulo sobre la placa (comando 'Locked area' o 'Restricted placing area'); si después se intenta colocar algo ahí, el programa lo impide y muestra un mensaje. Las zonas quedan listadas en el árbol bajo cada superficie, en el nivel 'Locked areas'. Zuken E3.panel suma restricciones de altura además de las zonas prohibidas, y WSCAD lista la definición de áreas bloqueadas en su versión de gabinetes.
- *Para qué sirve:* Reservar el lugar de prensacables, ventilador, filtro, tornillos de la placa o lo que sobresale de la puerta.
- *Cómo adaptarla:* Herramienta 'zona prohibida' (rectángulo con nombre y, opcional, altura máxima) que el acomodado automático esquiva y que da rojo con el aviso 'invade zona Ventilador'.
- *Fuente:* https://eplan.help/en-us/Infoportal/Content/Plattform/2.9/Content/htm/panellayoutgui_h_sperrflaechenzeichnen.htm

**37. Encajar rieles y cablecanales contra el vecino** · ya está en la app

- *Quién la tiene:* EPLAN Pro Panel
- *Cómo funciona:* Rieles y canales son piezas de largo variable. Con 'Fit rails / wire ducts' se encierran en un rectángulo los que se quieren ajustar y se señala el borde de un canal vertical o el costado de la placa: todos se llevan hasta ese borde, en dos pasos (un lado y después el otro). Al dibujar uno nuevo, con Ctrl y dos puntos queda centrado entre ellos.
- *Para qué sirve:* No tener que escribir el largo de cada riel cuando se mueve un canal vertical.
- *En Tableros MEC:* Rieles y cablecanales se calculan solos con el ancho y alto de la placa.
- *Fuente:* https://eplan.help/en-us/Infoportal/Content/Plattform/2.8/Content/htm/cabinetgui_h_einpassen.htm

**38. Largo de riel calculado según lo colocado** · ya está en la app

- *Quién la tiene:* Weidmüller Configurator online, Phoenix Contact clipx ENGINEER
- *Cómo funciona:* En el configurador web de Weidmüller se hace clic en los componentes y quedan puestos sobre un riel virtual; el programa calcula el largo de riel necesario para armarlo y ese largo sale en la lista de materiales. clipx ENGINEER maneja el largo del riel perforado y el 'corte cero', y no deja que los agujeros queden fuera del riel.
- *Para qué sirve:* Saber el largo real a cortar sin sumar anchos a mano.
- *En Tableros MEC:* Largo de cada riel automático según la placa, o cargado a mano.
- *Fuente:* https://control.com/news/online-weidmuller-configurator-simplifies-control-system-design/

**39. Lista de corte de riel y cablecanal** · ya está en la app

- *Quién la tiene:* Zuken E3.panel, SEE Electrical 3D Panel+, EPLAN Pro Panel (hacia el centro de corte Rittal Secarex); falta en AutoCAD Electrical
- *Cómo funciona:* E3.panel incluye una 'cut list' entre sus salidas de fabricación, y SEE y EPLAN mandan los largos de canales y rieles a centros de corte. En AutoCAD Electrical esto falta y es un pedido repetido en su foro: el informe cuenta piezas en vez de largos, aunque el programa sí maneja un largo estándar de barra (RAILLENSTD) y un largo mínimo de retazo (RAILLENMIN).
- *Para qué sirve:* Cortar todo el riel y el cablecanal de una vez sin medir sobre el plano, y saber cuántas barras comprar.
- *En Tableros MEC:* Menú → Lista de corte: los verticales van de una pieza y los horizontales del medio se cortan entre ellos.
- *Fuente:* https://digital.zuken.com/rs/707-ZQM-176/images/DS-E3-panel-EN.pdf

**40. Plantilla de perforado 1:1 y agujeros automáticos** · pendiente

- *Quién la tiene:* EPLAN Pro Panel, Zuken E3.panel+, AutoCAD Electrical, SEE Electrical 3D Panel+, WSCAD
- *Cómo funciona:* En EPLAN cada artículo lleva su patrón de agujeros; al colocar rieles y canales los agujeros se generan solos repitiendo el paso definido, medidos desde el lado 'cero' que se elige en ajustes, y si uno cae en una zona donde no se puede perforar se genera uno alternativo fuera. La vista de perforado 2D muestra agujeros y contornos con cotas, y el patrón de cada pieza se puede sacar en PDF a escala 1:1 para perforar a mano. E3.panel+ pide tamaño y separación de agujeros para canal y riel; el diálogo de riel DIN de AutoCAD Electrical pregunta si se fija con agujeros, con separadores o sin nada.
- *Para qué sirve:* Marcar y perforar la placa sin presentar los rieles encima.
- *Cómo adaptarla:* Vista 'Perforado' con los agujeros de fijación de rieles, canales y aparatos de placa, tabla de coordenadas X/Y desde una esquina e impresión 1:1 en hojas A4 que se pegan sobre la placa.
- *Fuente:* https://www.eplan.help/en-us/infoportal/content/Plattform/2.9/Content/htm/Glossary_o_bohransichten.htm

**41. Cotas automáticas regenerables** · ya está en la app

- *Quién la tiene:* EPLAN Pro Panel, SkyCAD (cotas de layout)
- *Cómo funciona:* En EPLAN la vista del modelo tiene la propiedad 'Scheme for automatic dimensioning': se elige un esquema guardado que dice qué elementos se acotan y con qué estilo, y las cotas aparecen solas. Al regenerar se borran las cotas automáticas viejas y se conservan las agregadas a mano. No funciona en vistas isométricas ni de costado.
- *Para qué sirve:* Tener el plano acotado para el armador sin dibujar cada cota.
- *En Tableros MEC:* Botón “Medidas”: ancho y alto de placa, y eje, inicio y largo de cada riel.
- *Fuente:* https://www.eplan.help/en-us/infoportal/content/Plattform/2.9/Content/htm/gededit3dgui_k_autobemassung.htm

**42. Leyenda del tablero con números de posición** · ya está en la app

- *Quién la tiene:* EPLAN (leyenda de gabinete), AutoCAD Electrical (globos y lista de panel)
- *Cómo funciona:* EPLAN genera una 'leyenda de gabinete' ligada a cada placa de montaje, cuyos números de posición se pueden reordenar automáticamente. AutoCAD Electrical asigna números de ítem (los componentes idénticos comparten número), permite poner globos con ese número sobre cada huella y vuelca la lista de materiales de panel como tabla dentro del plano.
- *Para qué sirve:* Que el plano impreso se entienda solo: número en el dibujo y descripción al costado.
- *En Tableros MEC:* Referencias para la puerta, con riel y posición de cada aparato.
- *Fuente:* https://www.eplan.help/en-us/infoportal/content/Plattform/2.9/Content/htm/panellayoutgui_k_legenden.htm

**43. Plano de puerta con cortes** · pendiente

- *Quién la tiene:* Electro Graphics iDEA / Eplus / CADelet, EPLAN Pro Panel
- *Cómo funciona:* Después del layout interior, el programa de Electro Graphics dibuja solo el frente de la puerta, mostrando los contactos que quedan detrás de cada aparato de comando y las cotas de perforado de cada uno. EPLAN trata los aparatos embutidos en la puerta como choques intencionales.
- *Para qué sirve:* Perforar la puerta para pilotos, pulsadores, selectores y pantallas sin replantear, y verificar que lo de atrás no toque lo de la placa.
- *Cómo adaptarla:* Segunda superficie 'Puerta' con los aparatos de frente, su diámetro de corte, sus cotas y su profundidad hacia adentro, usada por el chequeo de cierre de puerta que ya existe.
- *Fuente:* https://canalsolar.com.br/en/softwares-facilitam-e-agilizam-trabalho-de-projetistas

**44. Llenado de cablecanal con semáforo** · pendiente

- *Quién la tiene:* WSCAD Cabinet Engineering, EPLAN Pro Panel, SolidWorks Electrical, Zuken E3.panel
- *Cómo funciona:* El programa compara los cables que pasan por cada canal con su capacidad. WSCAD lo muestra en rojo, amarillo y verde; EPLAN (Ver > Conexiones > Capacidad de llenado) pinta superficies de color sobre el piso del canal y avisa si a algún cable le falta el diámetro. SolidWorks lo calcula con un comando aparte a partir de cantidad y diámetro de cables, y una regla de diseño da advertencia o error al acercarse al límite; E3.panel además desvía cables si el canal se llena. Los catálogos de Panduit toman como máximo el 50 % de la sección interior.
- *Para qué sirve:* Elegir bien el ancho del cablecanal antes de cortarlo.
- *Cómo adaptarla:* Mientras no haya esquema: estimar los cables por tramo a partir de la cantidad de bornes de los aparatos del riel vecino (dato nuevo del catálogo) y una sección típica, y pintar cada canal verde, amarillo o rojo con su porcentaje.
- *Fuente:* https://eplan.help/en-us/Infoportal/Content/Plattform/2.9/Content/htm/routinggui_h_fuellgradanzeigen.htm

**45. Cálculo térmico y mapa de calor** · pendiente

- *Quién la tiene:* EPLAN Pro Panel con Rittal RiTherm, hagercad, PC/SCHEMATIC PanelBuilder
- *Cómo funciona:* EPLAN suma la potencia disipada de todos los aparatos y barras, y ofrece una vista de 'densidad de potencia disipada' calculada como la disipación máxima de cada componente sobre la superficie que ocupa. Rittal RiTherm usa la superficie efectiva del gabinete según cómo está instalado (una cara contra la pared no cuenta), la temperatura ambiente y la carga interna; con el coeficiente de la chapa de acero (5,5 W/m²K) calcula el calor que el gabinete evacúa solo y entrega la refrigeración necesaria. hagercad hace un cálculo automático de pérdidas y calor con todos los aparatos y las superficies del gabinete.
- *Para qué sirve:* Saber si hace falta ventilador o aire, y no juntar los aparatos que más calientan.
- *Cómo adaptarla:* Campo 'potencia disipada (W)' en el catálogo; resumen del tipo 'disipa 180 W, el gabinete evacúa 140 W con 10 °C de diferencia: falta ventilación' y un sombreado de calor opcional sobre el plano.
- *Fuente:* https://www.eplan.help/en-us/Infoportal/Content/Plattform/2025/Content/htm/cabinetgui_k_thermischeauslegung.htm

**46. Elección de gabinete filtrada por lo que entra** · está en parte

- *Quién la tiene:* hagercad, Legrand XL PRO
- *Cómo funciona:* En hagercad, apenas se empieza el plano de disposición el sistema propone solo los gabinetes en los que entran los aparatos elegidos. El manual de XL PRO de Legrand tiene una 'definición automática de los armarios' a partir de la lista de aparatos, con vista previa y modificación de la disposición.
- *Para qué sirve:* No elegir un gabinete chico por error ni uno sobredimensionado.
- *En Tableros MEC:* “¿Qué placa necesito?” calcula la medida; falta el catálogo de gabinetes para elegir uno real.
- *Fuente:* https://assets1.sc.hager.com/exports/files/Hagercad_EN_WEB_sRGB.pdf

**47. Reserva de espacio configurable** · ya está en la app

- *Quién la tiene:* Schneider Electric (EcoSet), Legrand XL PRO
- *Cómo funciona:* En la herramienta de Schneider el usuario elige la reserva modular que quiere y recién entonces el programa filtra los gabinetes compatibles. El manual de XL PRO tiene un apartado de reserva dentro de la selección del armario. Solo se pudo ver el resumen de la página de Schneider y el índice del manual de Legrand, no el detalle de pantalla.
- *Para qué sirve:* Dejar lugar para ampliaciones sin calcularlo a ojo.
- *En Tableros MEC:* Reserva en % por tablero.
- *Fuente:* https://www.se.com/us/en/faqs/FAQ000279597/ (no confirmada leyendo la página)

**48. Autocompletar accesorios de riel (topes, tapas, marcadores)** · pendiente

- *Quién la tiene:* Weidmüller Configurator, Phoenix Contact PROJECT complete, WAGO Smart Designer
- *Cómo funciona:* En el configurador de Weidmüller la función 'Verify' revisa el riel buscando componentes eléctricos y no eléctricos que faltan; muestra los errores y se arreglan a mano o con 'Auto-Solve', que agrega marcadores, tapas finales y topes. PROJECT complete de Phoenix Contact avisa los accesorios faltantes o los coloca automáticamente dejando el control al usuario; WAGO corre un chequeo de plausibilidad sobre el riel armado.
- *Para qué sirve:* No olvidar topes y tapas en la lista de materiales ni en el largo ocupado del riel.
- *Cómo adaptarla:* Regla por tipo de componente (por ejemplo, toda tira de bornes lleva tope a cada lado y tapa final) y botón 'completar accesorios' que los agrega al riel y a la lista, con aviso si falta alguno.
- *Fuente:* https://www.weidmueller.com/int/service/online-support-and-downloads/wmc-online-documentation

**49. Bornes de reserva, accesorios y puentes en la tira de bornes** · pendiente

- *Quién la tiene:* AutoCAD Electrical (Terminal Strip Editor)
- *Cómo funciona:* El editor de tiras de bornes tiene 'Insert Spare Terminal': se indica el número inicial y la cantidad de bornes de reserva y se insertan arriba o abajo del borne seleccionado. 'Insert Accessory' agrega separadores o tapas, 'Assign Jumper' puentea los bornes seleccionados, y a los de reserva se les asigna código de catálogo para que salgan en la lista de materiales. La tira se inserta en el layout como tira gráfica y hay que reconstruirla para conservar reservas y accesorios.
- *Para qué sirve:* Armar la bornera numerada con sus reservas sin dibujar borne por borne.
- *Cómo adaptarla:* Componente 'tira de bornes' con parámetros: cantidad, numeración inicial, reservas y puentes; su ancho se calcula solo y cada borne lleva su número en el plano y en las etiquetas.
- *Fuente:* https://help.autodesk.com/cloudhelp/2016/ENU/AutoCAD-Electrical/files/GUID-AD43A11A-BD4E-4CFE-835B-EF6492E356E9.htm

**50. Exportar e imprimir etiquetas** · ya está en la app

- *Quién la tiene:* EPLAN (labeling), WAGO Smart Designer con Smart Script, Phoenix Contact PROJECT complete, Hager Ready, AutoCAD Electrical (placas de identificación)
- *Cómo funciona:* EPLAN exporta los datos de marcado (identificadores y descripciones de aparatos y conexiones) a .txt o Excel, con una plantilla de Excel por esquema que fija el formato. WAGO manda la configuración del riel a Smart Script para imprimir en su impresora térmica y calcula el largo de la tira de marcado. Hager Ready imprime tiras según el 'modelo de etiqueta' elegido en los ajustes del proyecto y pide imprimir a 'tamaño real / 100 %'. En AutoCAD Electrical la placa de identificación se asocia a la huella y copia su etiqueta y descripción.
- *Para qué sirve:* Sacar todas las etiquetas del tablero de una vez y sin tipear.
- *En Tableros MEC:* Carteles: imprimir a escala real o “Planilla para la rotuladora”.
- *Fuente:* https://www.eplan.help/en-us/infoportal/content/Plattform/2026/Content/htm/labelgui_k_start.htm

**51. Modo armado paso a paso** · ya está en la app

- *Quién la tiene:* EPLAN Smart Mounting
- *Cómo funciona:* Aplicación de navegador que usa el modelo del tablero para guiar al armador: le da la lista completa de pasos en orden lógico (rieles, cablecanales y después los aparatos) con una vista 3D de la posición exacta y sus medidas. El operario confirma cada paso y puede dejar comentarios sobre un componente, que vuelven a quien diseñó; las órdenes de producción se administran desde un servidor central.
- *Para qué sirve:* Que cualquiera del taller arme el tablero igual que el anterior, sin plano en papel.
- *En Tableros MEC:* Pestaña “Armar”: tildar cada aparato al montarlo; queda marcado en el plano.
- *Fuente:* https://eplan.com/us-en/products/eplan-smart-mounting.html

**52. Lista desde-hasta con largos de cable** · pendiente

- *Quién la tiene:* SEE Electrical 3D Panel+, EPLAN Pro Panel, WSCAD, AutoCAD Electrical (anotación de cableado)
- *Cómo funciona:* SEE 3D Panel rutea los cables, calcula el largo de cada uno, genera una lista 'desde-hasta' y maneja las terminaciones de las puntas. EPLAN y WSCAD también rutean y calculan largos. AutoCAD Electrical escribe junto a cada huella el texto de conexión desde/hasta y tiene un informe de excepciones con los componentes a los que les falta.
- *Para qué sirve:* Precortar y numerar los cables antes de cablear.
- *Cómo adaptarla:* Etapa posterior: cuando exista la lista de cables, calcular el largo por el recorrido de canales entre los dos aparatos más un margen y exportar la tabla de corte.
- *Fuente:* https://www.ige-xao.com/wp-content/uploads/ENG-SEE-Electrical-3D-Panel.pdf

**53. Verificación general con lista de problemas** · ya está en la app

- *Quién la tiene:* EPLAN (verificaciones del montaje 3D), Weidmüller Configurator (Verify)
- *Cómo funciona:* EPLAN corre verificaciones numeradas que dejan mensajes: colocación dentro de una zona restringida (026012), artículos sin peso o peso total desactualizado (026106 y 026107), cable sin diámetro para el llenado de canal (026040). Para un choque, la ayuda indica arrastrar el aparato a un lugar libre y volver a correr la verificación. Weidmüller junta lo que falta en una función 'Verify'.
- *Para qué sirve:* Un control final antes de imprimir o mandar a armar.
- *En Tableros MEC:* Revisión del tablero.
- *Fuente:* https://www.eplan.help/en-us/infoportal/content/Plattform/2.9/Content/htm/messages_o_0263Dmountinglayout.htm

**54. Peso total del tablero** · pendiente

- *Quién la tiene:* EPLAN Pro Panel
- *Cómo funciona:* Un comando suma el peso propio del gabinete, el de todos los artículos colocados, el de rieles y canales según su largo real y el de los cables ruteados, y guarda el total en una propiedad del gabinete. Una verificación avisa si hay artículos sin peso cargado o si el total quedó viejo después de un cambio.
- *Para qué sirve:* Dato para el flete, las fijaciones y la hoja de datos.
- *Cómo adaptarla:* Campo 'peso' opcional en el catálogo y total en el encabezado de la lista de materiales, con aviso de cuántos componentes no lo tienen cargado.
- *Fuente:* https://www.eplan.help/en-US/Infoportal/Content/Plattform/2024/Content/htm/cabinetgui_k_schrankgesamtgewicht.htm

**55. Exportación a CAD (DXF/DWG y STEP)** · pendiente

- *Quién la tiene:* Weidmüller Configurator, Zuken E3.panel+, Phoenix Contact PROJECT complete
- *Cómo funciona:* El configurador de Weidmüller exporta el riel armado a 3D STEP y a 2D DXF/DWG, además de PDF, Excel o CSV. E3.panel+ exporta DXF con la opción de excluir ciertos aparatos y saca STEP para el CAD mecánico; PROJECT complete también exporta .dwg y .dxf.
- *Para qué sirve:* Mandar la placa a cortar o perforar por CNC o láser, o entregar el plano al cliente en su formato.
- *Cómo adaptarla:* Exportar el plano 2D (placa, rieles, canales, contornos y agujeros) a DXF en capas separadas, generado en el navegador sin servidor.
- *Fuente:* https://www.weidmueller.com/int/service/consulting_and_digital_engineering/weidmueller_configurator/weidmueller_configurator_wmc.jsp

### Configuradores de borneras y riel

**56. Revisión del tablero con arreglo automático (Verify / Auto-Solve / Autocorrección)** · está en parte

- *Quién la tiene:* Weidmüller Configurator (WMC), Phoenix Contact clipx ENGINEER, WAGO Smart Designer
- *Cómo funciona:* En WMC, Alt+V o el botón Verify abre un asistente que recorre cada riel y lista lo que falta, tanto piezas eléctricas como no eléctricas, y si la solución es eléctricamente segura. Cada problema se corrige a mano o todos juntos con 'Auto-Solve'; los asistentes tienen además un botón 'Finish + Auto-Solve' que termina y arregla en un paso. En clipx ENGINEER la autocorrección señala las mejoras y deja aplicarlas una por una o todas a la vez, y desde la versión 2.0.12 puede arrancar sola. WAGO revisa la regleta automáticamente al terminar de configurarla.
- *Para qué sirve:* Que ningún tablero salga al taller con accesorios olvidados o con un error de armado.
- *En Tableros MEC:* La revisión lista los problemas; el arreglo es “Acomodar” o “¿Qué placa necesito?”. Falta el arreglo problema por problema.
- *Fuente:* https://www.weidmuller.com/en/solutions/solutions/weidmuller_configurator/wmc_documentation/index.jsp

**57. Tapas finales, topes y placas separadoras agregados solos** · pendiente

- *Quién la tiene:* WAGO Smart Designer, Phoenix Contact clipx ENGINEER, Weidmüller Configurator (WMC)
- *Cómo funciona:* Al revisar la regleta, Smart Designer avisa que hay que colocar una placa final y una placa intermedia para que no se toquen partes con tensión; según el material de WAGO, las piezas que faltan se agregan solas y la revisión propone agregados a la lista de partes. clipx ENGINEER coloca en el lugar correcto los topes de riel, los puentes y las tapas finales. WMC lo llama 'component completion': agrega marcadores, placas finales y topes que falten.
- *Para qué sirve:* Que la lista de materiales incluya sola los accesorios chicos que siempre se olvidan al pedir.
- *Cómo adaptarla:* Regla por tipo de componente en el catálogo ('lleva tapa final', 'lleva tope a cada lado del grupo', 'separador al cambiar de tensión') que agregue esas piezas al riel y a la lista de materiales.
- *Fuente:* https://www.wago.com/us/solutions/systems/digital-engineering/smart-data-engineering

**58. Usar el espacio libre del riel para completar accesorios** · pendiente

- *Quién la tiene:* Weidmüller Configurator (WMC)
- *Cómo funciona:* La versión 2025.4 de WMC agrega una 'optimización de espacio libre': cuando completa accesorios automáticamente aprovecha el lugar que sobra en el riel. La misma versión mejora dónde ubica los topes finales y permite definir el corte cero del riel soporte.
- *Para qué sirve:* Que el auto-arreglo no desordene ni alargue el riel cuando ya hay lugar disponible.
- *Cómo adaptarla:* Cuando 'Arreglar todo' agregue topes o tapas, usar primero los milímetros libres del riel y solo si no alcanza avisar cuántos faltan, con el mismo mensaje que ya usamos.
- *Fuente:* https://www.weidmueller.com/int/service/consulting_and_digital_engineering/weidmueller_configurator/weidmueller_configurator_wmc.jsp

**59. Largo de riel calculado solo y editable** · ya está en la app

- *Quién la tiene:* WAGO Smart Designer, Weidmüller Configurator (WMC)
- *Cómo funciona:* En el diálogo de importación de Smart Designer el campo 'Largo de riel DIN' muestra el largo total calculado automáticamente a partir de lo montado, y el usuario puede cambiarlo. En WMC las notas de versión listan una corrección para impedir que el riel se alargue solo al importar un plano que ya trae la geometría definida, lo que indica que por defecto lo extiende.
- *Para qué sirve:* Saber a qué medida cortar cada riel sin sumar anchos a mano.
- *En Tableros MEC:* Medidas del tablero → largo útil de cada riel (vacío = automático).
- *Fuente:* https://techdocs.wago.com/Software/WAGO_EPLAN_Plug-in/en-US/2933418635.html

**60. Sobrante inicial y separación entre bloques configurables** · está en parte

- *Quién la tiene:* WAGO Smart Designer
- *Cómo funciona:* El diálogo de opciones de importación tiene 'Start projection' (distancia desde la punta del riel hasta el primer producto) y la separación hasta el siguiente bloque de bornes. Los valores se reutilizan en la próxima importación salvo que se destilde la casilla 'Remember settings', abajo a la izquierda.
- *Para qué sirve:* Fijar una vez el criterio del taller para las puntas de riel y los espacios entre grupos.
- *En Tableros MEC:* Separación antes de cada aparato. Falta el sobrante inicial del riel como dato aparte.
- *Fuente:* https://techdocs.wago.com/Software/WAGO_EPLAN_Plug-in/en-US/2933418635.html

**61. Corte cero del riel perforado y agujeros de fijación reales** · pendiente

- *Quién la tiene:* Phoenix Contact clipx ENGINEER, Weidmüller Configurator (WMC)
- *Cómo funciona:* clipx ENGINEER 2.5 permite fijar por proyecto el 'corte cero' del riel perforado (en qué punto del patrón de ranuras se corta) junto con el largo del riel, distinto del valor de la plantilla. En rieles sin perforar dibuja agujeros reales y ranuras tipo ojo de cerradura para la fijación. WMC 2025.4 también permite definir el corte cero.
- *Para qué sirve:* Que las ranuras del riel coincidan con los agujeros de la placa y que todos los rieles de una serie salgan iguales.
- *Cómo adaptarla:* En la lista de corte indicar largo y desde qué ranura cortar, y en el plano marcar los agujeros de fijación de cada riel a la placa para puntear y perforar.
- *Fuente:* https://www.phoenixcontact.com/cxe/help/Releases_cxE_2_5.htm

**62. Compactar bloque** · ya está en la app

- *Quién la tiene:* WAGO Smart Designer (documentado en la versión anterior smartDESIGNER 6)
- *Cómo funciona:* Se seleccionan los bloques que quedaron con espacios vacíos y con el botón derecho se elige 'Compress block'; los componentes se juntan. Está en la guía ProServe de una versión anterior; no pude verificar que el menú siga igual en la versión web actual.
- *Para qué sirve:* Cerrar huecos después de borrar o mover componentes sin rehacer todo el riel.
- *En Tableros MEC:* Los aparatos se arriman solos.
- *Fuente:* https://www.farnell.com/datasheets/1922104.pdf

**63. Reemplazar por producto similar en selección múltiple** · está en parte

- *Quién la tiene:* Weidmüller Configurator (WMC)
- *Cómo funciona:* Se seleccionan varios productos y se usa 'Replace with similar product'; la función analiza qué tipo de producto es cada uno para proponer el equivalente. La página del configurador online menciona además cambiar con un clic la tecnología de conexión (por ejemplo a PUSH IN o SNAP IN) y acortar rieles; ese último detalle apareció en un solo resultado y no lo pude confirmar con un segundo.
- *Para qué sirve:* Cambiar de modelo o de marca todo un grupo de componentes de una vez.
- *En Tableros MEC:* En la ficha se cambia el modelo de un aparato. Falta hacerlo con varios a la vez.
- *Fuente:* https://www.weidmueller.com/int/service/consulting_and_digital_engineering/weidmueller_configurator/weidmueller_configurator_wmc.jsp

**64. Series preferidas para las sugerencias** · pendiente

- *Quién la tiene:* Weidmüller Configurator (WMC)
- *Cómo funciona:* El manual de WMC tiene un apartado sobre cómo el programa sugiere artículos: el usuario define qué series de bornes prefiere y las sugerencias salen de ahí.
- *Para qué sirve:* Que lo que propone el programa coincida con lo que el taller realmente compra.
- *Cómo adaptarla:* En el catálogo, marcar un componente como 'preferido' por función; las preselecciones por máquina y el cambio por equivalente usan primero los preferidos.
- *Fuente:* https://assets.dam.weidmueller.com/assets/api/612b700b-b67f-4937-b667-5daa013ef788/Original/Weidmueller_Configurator_WMC_user_manual.pdf

**65. Asistente de etiquetas y marcadores** · está en parte

- *Quién la tiene:* Weidmüller Configurator (WMC)
- *Cómo funciona:* Alt+M abre el asistente 'Labelling and markers', donde se colocan y editan las etiquetas y los marcadores en un solo lugar; se puede copiar y pegar para editar los textos. La configuración de marcado queda guardada aunque todavía no existan los topes, así los marcadores se agregan después.
- *Para qué sirve:* Cargar y corregir todas las etiquetas de un tablero de una sola pasada.
- *En Tableros MEC:* Carteles con alto, color por función y nombre del componente. Falta elegir marcadores comerciales.
- *Fuente:* https://assets.dam.weidmueller.com/assets/api/178cc4db-9b5e-43c0-8035-17fa54e8a6dc/Original/WMC_shortcuts_A4_web.pdf

**66. Numeración consecutiva con prefijo, sufijo, paso y sentido** · está en parte

- *Quién la tiene:* Weidmüller M-Print PRO (conectado a WMC)
- *Cómo funciona:* La numeración consecutiva (F8) toma el valor inicial del campo 'Number', un prefijo (por ejemplo 'C' o '2004-'), un sufijo, un 'bloque' que es un contador extra entre el prefijo y el número, y un paso. Con inicio 1, fin 20 y paso 3 genera 1, 4, 7, 10, 13, 16, 19; puede ir ascendente o descendente. Shift+F8 incrementa un valor suelto.
- *Para qué sirve:* Numerar bornes y equipos sin tipear uno por uno ni equivocarse en la secuencia.
- *En Tableros MEC:* Menú → Renumerar etiquetas. Falta elegir prefijo, paso y sentido.
- *Fuente:* https://assets.dam.weidmueller.com/assets/api/e0a21ebb-a3e5-4a2c-8114-c954d403b63f/Original/Manual_M_Print_PRO_v_9_16_EN.pdf

**67. Tira de marcado con marcas de corte tomadas del riel** · ya está en la app

- *Quién la tiene:* WAGO Smart Designer con Smart Script y Smart Printer
- *Cómo funciona:* En Smart Designer, Proyecto → Imprimir marcado abre el diálogo de impresión; en 'Marcas de corte' se elige si la tira se corta solo al inicio o en cada tramo. Las posiciones de corte salen de la configuración del riel y pasan directo al trabajo de impresión del Smart Printer o a Smart Script; WAGO menciona tiras de marcado de una o dos líneas de texto.
- *Para qué sirve:* Imprimir la tira ya del largo de cada tramo y pegarla sin medir.
- *En Tableros MEC:* Cada cartel tiene el ancho exacto de su aparato y los huecos quedan marcados.
- *Fuente:* https://www.voltimum.de/artikel/neue-funktionen-im-wago-konfigurator-smart

**68. Control de largo de texto y vista real de la etiqueta** · está en parte

- *Quién la tiene:* WAGO Smart Script
- *Cómo funciona:* Smart Script muestra la etiqueta tal como va a salir (WYSIWYG) y revisa el largo del texto. Trae biblioteca de soportes de marcador y de símbolos, y calibra el plotter automáticamente.
- *Para qué sirve:* Evitar etiquetas con el texto cortado o ilegible.
- *En Tableros MEC:* La letra se achica sola para entrar. Falta avisar cuáles quedan ilegibles.
- *Fuente:* https://www.farnell.com/datasheets/1922104.pdf

**69. Cotas manuales en el plano** · pendiente

- *Quién la tiene:* Weidmüller Configurator (WMC)
- *Cómo funciona:* La hoja de atajos de WMC lista Alt+D 'Add dimensions', que permite agregar cotas manuales sobre el dibujo. No pude ver el detalle de cómo se eligen los puntos a acotar.
- *Para qué sirve:* Tener en el plano las medidas que el armador necesita para marcar y perforar.
- *Cómo adaptarla:* Herramienta de cota en el plano 2D: dos toques sobre bordes de rieles, canales o componentes y aparece la medida; además cotas automáticas de la posición de cada riel y canal respecto del borde de la placa.
- *Fuente:* https://assets.dam.weidmueller.com/assets/api/178cc4db-9b5e-43c0-8035-17fa54e8a6dc/Original/WMC_shortcuts_A4_web.pdf

**70. Cableado punto a punto con conexiones posibles resaltadas** · pendiente

- *Quién la tiene:* Weidmüller Configurator (WMC)
- *Cómo funciona:* Alt+W activa 'Add wire connection': WMC marca en rojo los puntos donde se puede conectar y con dos clics se unen dos entradas de cable con un conductor elegible. A cada cable se le definen color, tipo de conductor, largo y otras propiedades.
- *Para qué sirve:* Dejar definido qué cable va de dónde a dónde y obtener la lista de cables.
- *Cómo adaptarla:* Modo 'Cablear': tocar borne de origen y borne de destino, elegir color y sección, y la app arma la lista de cables con largo estimado según el recorrido por el cablecanal.
- *Fuente:* https://assets.dam.weidmueller.com/assets/api/612b700b-b67f-4937-b667-5daa013ef788/Original/Weidmueller_Configurator_WMC_user_manual.pdf

**71. Puente enchufable en lugar de puentes de cable** · pendiente

- *Quién la tiene:* Phoenix Contact clipx ENGINEER
- *Cómo funciona:* Al exportar un proyecto del programa de esquemas a clipx ENGINEER, un puente hecho con cable entre bornes se reemplaza automáticamente por un puente de barra enchufable. La autocorrección además coloca los puentes en el lugar correcto como accesorio.
- *Para qué sirve:* Ahorrar tiempo de cableado y pedir el puente peine correcto.
- *Cómo adaptarla:* Marcar bornes contiguos como 'mismo potencial' y que la app agregue a la lista de materiales el puente peine con la cantidad justa de polos.
- *Fuente:* https://kem.industrie.de/schaltschrank/cae-software-steigert-effizienz-im-schaltschrankbau/

**72. Grupos de función y plantillas reutilizables** · ya está en la app

- *Quién la tiene:* Phoenix Contact clipx ENGINEER
- *Cómo funciona:* clipx ENGINEER tiene asistentes de ingeniería funcional que arman grupos de función completos en pocos clics y permite trabajar con plantillas; hay un tutorial oficial dedicado a 'functional engineering and templates'. No pude ver el detalle de la pantalla donde se define un grupo.
- *Para qué sirve:* No repetir a mano el mismo conjunto de componentes en cada tablero.
- *En Tableros MEC:* Preselecciones propias y “Agregar una unidad” (suma los 10 aparatos de una unidad más).
- *Fuente:* https://www.phoenixcontact.com/en-us/products/software-for-control-cabinet-building/engineering-software

**73. Chequeo de homologaciones de los artículos** · pendiente

- *Quién la tiene:* Phoenix Contact clipx ENGINEER
- *Cómo funciona:* Según la descripción del fabricante, uno de los asistentes revisa las homologaciones de los artículos que son relevantes para la aplicación. No vi la pantalla ni la lista de normas que maneja.
- *Para qué sirve:* Detectar antes de comprar un componente sin la certificación que pide el cliente.
- *Cómo adaptarla:* Campo opcional de certificaciones en el catálogo y un aviso en la revisión cuando un componente no tiene la que se marcó como requerida para ese tablero.
- *Fuente:* https://www.phoenixcontact.com/es-es/productos/software-de-automatizacion/software-de-ingenieria

**74. Códigos de artículo propios por lista de mapeo** · pendiente

- *Quién la tiene:* Phoenix Contact clipx ENGINEER
- *Cómo funciona:* Desde la versión 2.5 se cargan listas de mapeo en Excel que relacionan el número de artículo original con el número de artículo del cliente. Se pueden manejar varias listas en paralelo y asignarlas a plantillas de proyecto.
- *Para qué sirve:* Que la lista de materiales salga con los códigos que usa el taller o su proveedor.
- *Cómo adaptarla:* Importar una planilla 'referencia de fábrica → código interno, proveedor y precio' y mostrar esas columnas en la lista de materiales; es la base para cotizar.
- *Fuente:* https://www.phoenixcontact.com/cxe/help/Releases_cxE_2_5.htm

**75. Vista de armado paso a paso para el operario** · ya está en la app

- *Quién la tiene:* Phoenix Contact clipx ENGINEER assemble, WAGO Smart Designer
- *Cómo funciona:* clipx ENGINEER assemble toma los datos del proyecto y guía al operario paso a paso: en cada paso muestra qué artículo corresponde, incluidos accesorios y marcados, puede manejar un sistema pick-by-light para que no se tome la pieza equivocada y deja imprimir el marcado durante el armado. WAGO ofrece una vista de asistencia al operario en 3D dentro del configurador y un PDF de instrucciones de armado para acompañar la orden.
- *Para qué sirve:* Que cualquiera del taller arme el tablero igual, sin interpretar el plano.
- *En Tableros MEC:* Pestaña “Armar”.
- *Fuente:* https://www.phoenixcontact.com/en-pc/events-and-news/news/worker-assistance-software-terminal-strip-assembly

**76. Documentación completa en un clic** · ya está en la app

- *Quién la tiene:* Weidmüller Configurator (WMC), WAGO Smart Designer
- *Cómo funciona:* WMC genera con un clic PDF, archivos 3D STEP y listas de partes, y exporta 2D en DXF/DWG. Smart Designer exporta lista de partes, fotos de los productos usados, modelo 3D, planos de montaje y un PDF de documentación para el cliente.
- *Para qué sirve:* Entregar la carpeta del tablero sin armarla a mano.
- *En Tableros MEC:* Imprimir la carpeta.
- *Fuente:* https://www.weidmueller.com/int/service/consulting_and_digital_engineering/weidmueller_configurator/weidmueller_configurator_wmc.jsp

**77. Pedido directo desde la configuración** · está en parte

- *Quién la tiene:* WAGO Smart Designer, Weidmüller Configurator (WMC), Phoenix Contact PROJECT complete
- *Cómo funciona:* Smart Designer tiene un menú 'Pedido': los rieles con número de artículo se mandan directo al carrito de la tienda web y el estado se sigue en 'Mis pedidos'; se puede pedir el riel armado y marcado o preconfigurado para armar. WMC permite pedir la regleta o el gabinete armado (Fast Delivery Service) y PROJECT complete transfiere el proyecto a la tienda de Phoenix Contact.
- *Para qué sirve:* Pasar de la lista de materiales a la compra sin volver a tipear.
- *En Tableros MEC:* El pedido sale como texto para mandar; no hay envío directo a un proveedor.
- *Fuente:* https://i-magazin.com/neue-funktionen-im-wago-konfigurator-smart-designer/

**78. Importar una lista y que el riel se arme solo** · pendiente

- *Quién la tiene:* Weidmüller Configurator (WMC), Phoenix Contact PROJECT complete y clipx ENGINEER, WAGO Smart Designer
- *Cómo funciona:* WMC importa una lista en CSV (tiene un manual corto de esa interfaz) y permite definir la designación del componente ya durante la importación, con un asistente de importación. PROJECT complete importa los datos del proyecto eléctrico y arma la regleta con bornes y accesorios con un clic; clipx ENGINEER tiene un asistente de importación guiado y WAGO arma la regleta desde EPLAN, WSCAD o StriePlan.
- *Para qué sirve:* Arrancar desde la lista que manda el cliente o el proyectista en vez de cargar componente por componente.
- *Cómo adaptarla:* Importar una planilla con columnas etiqueta, referencia y cantidad y correr el acomodado automático; las referencias que no estén en el catálogo se listan para crearlas.
- *Fuente:* https://assets.dam.weidmueller.com/assets/api/ef741515-689c-4d5e-8335-e0320ee015e7/Original/Weidmueller_Configurator_CSV_Interface_shortmanual.pdf

**79. Gabinete o caja con prensacables** · pendiente

- *Quién la tiene:* Weidmüller Configurator (WMC), Phoenix Contact clipx ENGINEER
- *Cómo funciona:* WMC configura gabinetes completos con las regletas armadas adentro y los prensacables premontados; clipx ENGINEER planifica cajas de conexión y placas de montaje equipadas en 3D. No conseguí el detalle de la pantalla de elección de gabinete (cómo filtra por tamaño ni si propone uno solo).
- *Para qué sirve:* Elegir la caja y sus entradas de cable junto con la placa, no después.
- *Cómo adaptarla:* Tabla de gabinetes estándar del mercado local; al terminar el acomodado la app propone el más chico donde entra la placa con la profundidad y la reserva pedidas, y permite ubicar prensacables con plantilla de perforado.
- *Fuente:* https://www.weidmueller.com/int/service/consulting_and_digital_engineering/weidmueller_configurator/weidmueller_configurator_wmc.jsp

**80. Accesorios no eléctricos en la lista: carteles, cubiertas, tapones** · está en parte

- *Quién la tiene:* Phoenix Contact clipx ENGINEER
- *Cómo funciona:* La versión 2.5 suma como accesorios planificables las etiquetas de advertencia y cubiertas, los tapones de relleno y las fundas aislantes; la 2.1 había sumado las fundas de protección contra dobleces.
- *Para qué sirve:* Que la lista de materiales incluya también lo que no va sobre el riel pero hay que comprar.
- *En Tableros MEC:* El pedido, la lista de materiales y la pestaña Componentes incluyen las barras de riel DIN y de cablecanal. Faltan carteles, tapas y tapones como renglones.
- *Fuente:* https://www.phoenixcontact.com/cxe/help/Releases_cxE_2_5.htm

**81. Holgura entre componentes sobre el riel** · ya está en la app

- *Quién la tiene:* Phoenix Contact clipx ENGINEER
- *Cómo funciona:* Las notas de la versión 2.2 mencionan un cambio en la separación entre bornes sobre el riel y un valor por defecto de 0,03 mm, pero el extracto que obtuve no deja claro a qué se aplica exactamente. La interpretación es que cada pieza ocupa su ancho nominal más una tolerancia que se acumula a lo largo del riel.
- *Para qué sirve:* Que lo que entra en pantalla entre también en el riel real.
- *En Tableros MEC:* “Separación antes” en la ficha de cada aparato.
- *Fuente:* https://assets.phoenixcontact.com/file/33895ddf-ee35-4f47-a583-0bb76e999e67/media/original (no confirmada leyendo la página)

**82. Ancho y potencia disipada sumados por riel** · está en parte

- *Quién la tiene:* Siemens TIA Selection Tool
- *Cómo funciona:* De memoria, sin confirmar en esta búsqueda: al armar una estación de módulos sobre riel, la herramienta muestra el ancho total y la potencia disipada sumada de los módulos, datos que se usan para dimensionar el gabinete y su ventilación.
- *Para qué sirve:* Tener un primer número para el cálculo térmico del gabinete.
- *En Tableros MEC:* Ancho ocupado y libre por riel. Falta la potencia disipada.
- *Fuente:* Sin fuente: conocimiento previo no verificado en esta sesión (no confirmada leyendo la página)

### Aplicaciones simples, web y de código abierto

**83. Tira de etiquetas por riel a escala real** · ya está en la app

- *Quién la tiene:* Hager Ready; Electrical Panel Label Generator; Schneider eDesign; ABB Easy Pro Web
- *Cómo funciona:* Hager Ready genera en PDF las tiras de rotulado de todos los aparatos modulares; su ayuda indica imprimir en 'Tamaño real' o '100 %' porque si no salen mal de medida. El generador abierto pide cantidad de celdas, ancho y alto de celda en milímetros, y arma la tira en una hoja A4 apaisada con medidas exactas. Antes de imprimir muestra un aviso: escala 100 %, sin encabezados ni pies de página.
- *Para qué sirve:* Que la etiqueta impresa coincida con el ancho real de cada aparato y se pegue sin recortar a ojo.
- *En Tableros MEC:* Carteles y etiquetas.
- *Fuente:* https://github.com/SenMorgan/Electrical-Panel-Label-Generator ; https://hager.com/de-ch/support/tools/faq-hager-ready

**84. Largo de riel calculado y lista de corte** · ya está en la app

- *Quién la tiene:* Weidmüller Online Configurator; TermiGrid; EPLAN Smart Mounting
- *Cómo funciona:* El configurador en línea de Weidmüller coloca los componentes en un riel virtual, calcula el largo de riel necesario y lo incluye en la lista de materiales que exporta en CSV. TermiGrid agrega en su hoja 'Lista de piezas y montaje' el largo total de riel. Smart Mounting guía el montaje de rieles y cablecanales con medidas exactas.
- *Para qué sirve:* Cortar todos los rieles y tramos de cablecanal de una vez, sin medir sobre la placa.
- *En Tableros MEC:* Lista de corte.
- *Fuente:* https://control.com/news/online-weidmuller-configurator-simplifies-control-system-design/ ; https://github.com/PatrickBarbian/TermiGrid

**85. Leyenda para la puerta en tamaños elegibles** · está en parte

- *Quién la tiene:* Hager Ready; Breaker Box: Panel Directory; loadcenterlabels; Panel Legend 2
- *Cómo funciona:* Hager Ready genera, además de las tiras, la leyenda para la puerta del tablero en PDF. Breaker Box exporta la leyenda al tamaño del bolsillo del tablero o para pegar en la puerta, con escala de letra ajustable por etiqueta. loadcenterlabels ofrece la tarjeta en A4/carta, media hoja, 'puerta angosta' o medida propia.
- *Para qué sirve:* Entregar el tablero con su hoja de referencias sin armarla aparte en una planilla.
- *En Tableros MEC:* Hay una hoja de referencias; falta elegir el tamaño.
- *Fuente:* https://apps.apple.com/app/id1459288663 ; https://github.com/traviscj/loadcenterlabels

**86. Numeración automática de referencias en orden de lectura** · ya está en la app

- *Quién la tiene:* ElectroCraft
- *Cómo funciona:* Las marcas se asignan solas, riel por riel y de izquierda a derecha, con letra por tipo (-Q1 llave general, -F1 protección, -K1 contactor, -X1 borne). Lo que se escribe a mano queda excluido de la numeración y una flecha de 'restablecer' lo devuelve a automático. Se elige el estilo para todo el proyecto (con guion o sin él) y un prefijo opcional de tablero para el PDF.
- *Para qué sirve:* Que al mover o agregar un componente las etiquetas no queden salteadas ni repetidas.
- *En Tableros MEC:* Renumerar etiquetas, en orden de lectura.
- *Fuente:* https://github.com/ItsRebaseTime/ElectroCraft/blob/main/docs/user-guide.md

**87. Reserva de espacio configurable y bloque de reserva** · ya está en la app

- *Quién la tiene:* Verteilerplaner (Sandmann4951); DIN Rail Planner; TermiGrid
- *Cómo funciona:* Verteilerplaner calcula el espacio necesario sumándole un margen de reserva antes de comparar con el gabinete. DIN Rail Planner trae la 'tapa ciega' y un elemento a medida de ancho configurable para ocupar lugar. TermiGrid permite una 'etiqueta vacía' para las posiciones libres de la tira.
- *Para qué sirve:* Dejar lugar para ampliaciones sin que el acomodado automático lo llene.
- *En Tableros MEC:* Reserva en % y componentes “Reserva” para guardar el lugar.
- *Fuente:* https://github.com/Sandmann4951/Verteilerplaner ; https://github.com/revoltek-daniel/din-rail-planner

**88. Elección de gabinete con aviso de que queda chico** · ya está en la app

- *Quién la tiene:* Verteilerplaner (Sandmann4951); Hager Ready
- *Cómo funciona:* Verteilerplaner ofrece gabinetes de tres fabricantes (Hager, Striebel & John, Hensel), calcula el espacio requerido con la reserva y avisa cuando el elegido es demasiado chico. Hager Ready arma solo el tablero que corresponde a partir de la lista de ambientes y consumos. El detalle de la lógica de selección no está publicado.
- *Para qué sirve:* Pedir el gabinete correcto a la primera, sin descubrir en el banco que la placa no entra.
- *En Tableros MEC:* “¿Qué placa necesito?” dice si la placa actual alcanza o cuánto falta.
- *Fuente:* https://github.com/Sandmann4951/Verteilerplaner

**89. Plano con medidas exactas y posiciones de perforado** · está en parte

- *Quién la tiene:* EPLAN Smart Mounting
- *Cómo funciona:* Guía al operario en el montaje de rieles DIN y cablecanales con representación visual y medidas exactas. Según la prensa especializada, muestra incluso dónde van los agujeros de los tornillos que fijan el riel. Se usa en navegador, en monitor grande o tablet al lado del banco.
- *Para qué sirve:* Marcar y perforar la placa sin calcular distancias a mano.
- *En Tableros MEC:* Plano con medidas y eje de cada riel. Faltan las posiciones de los agujeros.
- *Fuente:* https://control.com/news/smart-manufacturing-digitally-assembling-control-cabinents-with-eplan-smart-mounting-design-software/

**90. Bornera como bloque con ancho calculado** · ya está en la app

- *Quién la tiene:* Stromlaufplan.de
- *Cómo funciona:* El plano de armado calcula solo cuánto riel ocupa cada bornera según sus bornes; desde 2026 el foro menciona un 'cálculo de tamaño transparente' que muestra cómo se llega al número, y la exportación incluye una hoja con el reparto de bornes. Por defecto arma borneras cortas con rótulo propio y deja reagruparlas a mano. No pude leer la fórmula exacta.
- *Para qué sirve:* Saber cuánto riel se lleva la bornera antes de contar borne por borne.
- *En Tableros MEC:* “Bornes de una unidad” y “Bornes comunes” son bloques con su ancho.
- *Fuente:* https://knx-user-forum.de/forum/supportforen/stromlaufplan-de/1863999-aufbaupläne-die-magische-formel-zur-klemmleistenbreitenberechnung

**91. Topes, tapas finales y puentes agregados solos a la lista** · pendiente

- *Quién la tiene:* TermiGrid; WAGO Smart Designer
- *Cómo funciona:* TermiGrid calcula automáticamente tapas finales, placas separadoras y topes de riel al exportar, los dibuja a escala y los suma a la lista de piezas. También calcula los puentes peine e indica en qué posición hay que quitar un pin. WAGO Smart Designer ensambla el conjunto automáticamente después de colocar los bornes.
- *Para qué sirve:* Que no falten en la compra los accesorios chicos que siempre se olvidan.
- *Cómo adaptarla:* Reglas simples en la lista de materiales: dos topes por grupo de aparatos, una tapa final por bornera, tapa y soportes por tramo de cablecanal, con cantidades editables.
- *Fuente:* https://github.com/PatrickBarbian/TermiGrid

**92. Lista de materiales con precios en vista cliente y vista interna** · está en parte

- *Quién la tiene:* Verteilerplaner (Sandmann4951); ABB Easy Pro Web; Schneider eDesign
- *Cómo funciona:* Verteilerplaner guarda precios en los datos maestros y saca la lista en dos vistas: una para el cliente y otra interna con el precio de compra. ABB Easy Pro Web entrega la lista de materiales con precio de lista. La versión argentina de eDesign se presenta como programa para diseñar y cotizar tableros.
- *Para qué sirve:* Cotizar la serie desde el mismo tablero dibujado, sin rearmar la planilla.
- *En Tableros MEC:* Hay precios y totales; falta separar vista cliente y vista interna.
- *Fuente:* https://github.com/Sandmann4951/Verteilerplaner ; https://www.se.com/ar/es/faqs/FA346403/

**93. Modo armado guiado con estado verde y rojo** · ya está en la app

- *Quién la tiene:* EPLAN Smart Mounting; clipx ENGINEER assemble; WSCAD Cabinet AR
- *Cómo funciona:* Smart Mounting le da al operario la lista completa de pasos y muestra en 3D dónde va cada pieza; lo ya instalado se ve en verde y lo pendiente en rojo. clipx ENGINEER assemble hace lo mismo para borneras, con instrucciones paso a paso que incluyen accesorios y marcadores. Cabinet AR deja tildar cables terminados y muestra un semáforo por aparato.
- *Para qué sirve:* Que el segundo y el tercer tablero de la serie los arme otra persona sin preguntar.
- *En Tableros MEC:* Pestaña “Armar”, con lo que no entra marcado en rojo.
- *Fuente:* https://eplan.com/us-en/products/eplan-smart-mounting.html ; https://www.phoenixcontact.com/en-lt/news/worker-assistance-software-terminal-strip-assembly

**94. PDF de documentación con carátula, rótulo y plano a escala** · está en parte

- *Quién la tiene:* Verteilerplaner (Sandmann4951); ElectroCraft
- *Cómo funciona:* Verteilerplaner exporta un PDF con carátula y rótulo, plano de armado a escala, esquema, lista de materiales y listas de circuitos, bornes y cableado. ElectroCraft deja elegir carátula, rótulo (proyecto, tablero, ubicación, autor, revisión, fecha), leyenda, lista de equipos, numeración de páginas y papel A4 o A3. El PDF es vectorial.
- *Para qué sirve:* Entregar una carpeta técnica prolija al cliente con un solo botón.
- *En Tableros MEC:* La carpeta sale como PDF desde la impresión. Falta carátula y rótulo.
- *Fuente:* https://github.com/ItsRebaseTime/ElectroCraft/blob/main/docs/user-guide.md ; https://github.com/Sandmann4951/Verteilerplaner

**95. Zona de montaje directo a placa para aparatos sin riel** · pendiente

- *Quién la tiene:* ElectroCraft
- *Cómo funciona:* Una 'placa de montaje' reemplaza una fila de riel para los aparatos que no tienen clip DIN. Solo se pueden poner ahí los dispositivos marcados como 'placa' o 'riel o placa'; el resto se rechaza.
- *Para qué sirve:* Ubicar variadores, fuentes grandes o transformadores que van atornillados.
- *Cómo adaptarla:* Un dato 'fijación' en el catálogo (riel, placa, ambos) y zonas libres en la placa donde los componentes de placa se ubican por coordenadas, con el mismo control de choques contra canal y puerta.
- *Fuente:* https://github.com/ItsRebaseTime/ElectroCraft/blob/main/docs/user-guide.md

**96. Bornes numerados, niveles, puentes y lista de bornes** · pendiente

- *Quién la tiene:* TermiGrid; Stromlaufplan.de; Verteilerplaner (Sandmann4951)
- *Cómo funciona:* En TermiGrid cada borne se rotula con doble clic, los bornes de varios pisos llevan tiras continuas por nivel (E1 a E4) y un modo 'puentes' asigna potenciales de color (+24V, GND, L1) arrastrando. Stromlaufplan.de asigna las borneras automáticamente desde la versión 26. Verteilerplaner separa bornes de entrada, salida e internos (X0, X1, X2) y saca la lista de bornes en el PDF.
- *Para qué sirve:* Que el cableado de campo y el del tablero coincidan sin planilla aparte.
- *Cómo adaptarla:* Dentro del componente 'Bornera', una tabla de bornes con número, señal y destino, numeración automática por bornera y una hoja 'Lista de bornes' imprimible; los puentes como columna de potencial.
- *Fuente:* https://github.com/PatrickBarbian/TermiGrid

**97. Lista de cables con colores automáticos y metros** · pendiente

- *Quién la tiene:* DIN Rail Planner; ElectroCraft; Verteilerplaner (Sandmann4951)
- *Cómo funciona:* En ElectroCraft se arrastra de borne a borne (en táctil: tocar un borne y luego el destino) y el color sale solo según el conductor. DIN Rail Planner pone marcadores numerados en cada conexión y resalta las de un componente al pasar el cursor. Verteilerplaner cablea solo con reglas fijas y suma los metros de cable a la lista de materiales.
- *Para qué sirve:* Preparar los cables cortados y marcados antes de armar.
- *Cómo adaptarla:* Empezar sin dibujo: una tabla 'Cables' (desde, hasta, sección, color, marca) por tablero, con largo estimado por el recorrido del cablecanal entre los dos componentes y exportación a planilla.
- *Fuente:* https://github.com/revoltek-daniel/din-rail-planner ; https://github.com/Sandmann4951/Verteilerplaner

**98. Celdas de etiqueta combinadas, divididas y vacías** · pendiente

- *Quién la tiene:* Electrical Panel Label Generator; TermiGrid
- *Cómo funciona:* En el generador se seleccionan celdas con Shift-clic (rango) o Ctrl-clic y desde el panel lateral se combinan las contiguas o se vuelven a dividir. El número inicial de la tira es configurable y Supr borra el contenido de lo seleccionado. TermiGrid agrega la 'etiqueta vacía' para que la tira siga continua sobre los huecos.
- *Para qué sirve:* Una sola etiqueta ancha para un grupo y tira pareja aunque haya lugares libres.
- *Cómo adaptarla:* En la vista de etiquetas, permitir unir las celdas de componentes vecinos bajo un título común y dejar en blanco, con su ancho real, los huecos y la reserva.
- *Fuente:* https://github.com/SenMorgan/Electrical-Panel-Label-Generator

**99. Letra ajustada sola con aviso de las que no entran** · está en parte

- *Quién la tiene:* nelko-p21-ble-labels
- *Cómo funciona:* El generador elige para cada etiqueta el tamaño de letra más grande que entra y parte el texto en líneas (una barra fuerza el salto). Al terminar informa cuáles llegaron al tamaño mínimo o quedaron con el subtítulo recortado. Un segundo paso verifica que salgan 1:1 y dentro de márgenes y arma una hoja de vista previa.
- *Para qué sirve:* Evitar etiquetas ilegibles o cortadas sin revisarlas una por una.
- *En Tableros MEC:* La letra se ajusta sola; falta el aviso de las que no entran.
- *Fuente:* https://github.com/keeganovitt/nelko-p21-ble-labels

**100. Hojas autoadhesivas estándar con inicio en la etiqueta N** · pendiente

- *Quién la tiene:* loadcenterlabels
- *Cómo funciona:* Imprime una etiqueta por circuito sobre hojas troqueladas comerciales (varios modelos Avery) o sobre una geometría definida por el usuario. La opción 'empezar en la etiqueta N' permite aprovechar una hoja ya usada en parte.
- *Para qué sirve:* Usar hojas de etiquetas comunes de librería sin desperdiciar las empezadas.
- *Cómo adaptarla:* Un formato alternativo de impresión con filas, columnas, márgenes y tamaño de etiqueta configurables y un campo 'empezar en la posición'.
- *Fuente:* https://github.com/traviscj/loadcenterlabels

**101. Plantilla de etiqueta con o sin pictograma** · pendiente

- *Quién la tiene:* Hager Ready; Schneider eDesign; Electrical Panel Label Generator; nelko-p21-ble-labels
- *Cómo funciona:* Hager Ready deja elegir la plantilla de la etiqueta de tapa: solo texto o texto con pictograma. El manual de eDesign tiene un apartado 'Asignar un pictograma' dentro del editor de etiquetas. El generador abierto usa un buscador de iconos por nombre con vista previa; el de la rotuladora trae 12 iconos fijos (ventilador, gota, llama, enchufe, etc.).
- *Para qué sirve:* Que el usuario final identifique bomba, ventilador o iluminación de un vistazo.
- *Cómo adaptarla:* Un juego corto de iconos propios (bomba, ventilador, válvula, luz, alarma) asociado a la función del componente y un interruptor 'con icono / solo texto' al imprimir.
- *Fuente:* https://hager.com/at/wissen/faq/faq-hager-ready ; https://www.productinfo.schneider-electric.com/edesignbuildingpanel/edesign-building-panel/English/DOCA0184EN-07.pdf

**102. Exportar los textos de marcado para la rotuladora** · ya está en la app

- *Quién la tiene:* TermiGrid; WAGO Smart Designer
- *Cómo funciona:* TermiGrid exporta un XLSX de cuatro hojas (datos de impresión planos, tiras por nivel, plano de equipamiento, lista de piezas y montaje) y un CSV pensados para los programas de marcado de WAGO, Phoenix Contact y Weidmüller. WAGO Smart Designer pasa el marcado a su programa Smart Script para imprimir en su impresora térmica.
- *Para qué sirve:* No volver a tipear las etiquetas en el programa de la impresora de marcadores.
- *En Tableros MEC:* Carteles → “Planilla para la rotuladora”.
- *Fuente:* https://github.com/PatrickBarbian/TermiGrid ; https://www.wago.com/global/digitization/digital-engineering/smartdesigner

**103. Código QR del tablero y de cada componente** · está en parte

- *Quién la tiene:* WSCAD Cabinet AR; Schaltschrank digitaler Zwilling; Breaker Meister; Circuit Breaker Planner
- *Cómo funciona:* En Cabinet AR se imprime un QR por componente; al escanearlo la app muestra designación, función, número de artículo, fabricante y conexiones. El gemelo didáctico genera en el navegador etiquetas QR que abren la página directamente en ese componente. Circuit Breaker Planner pasa el proyecto entero entre dispositivos como texto o como QR.
- *Para qué sirve:* Que quien abre el tablero en la máquina llegue al plano con el celular.
- *En Tableros MEC:* El tablero se comparte por enlace; falta mostrarlo como QR.
- *Fuente:* https://www.wscad.com/en/apps ; https://github.com/CoNiRo/schaltschrank-digitaler-zwilling

**104. Elegir qué datos se ven en el plano y cuáles se imprimen** · está en parte

- *Quién la tiene:* ElectroCraft; Electrical Panel Label Generator; Stromlaufplan.de (pedido de usuarios)
- *Cómo funciona:* En ElectroCraft el menú Ver decide qué rótulos aparecen (marcas, valores nominales, números de borne) y el PDF arranca con esa misma selección. El generador de etiquetas tiene interruptores para índice, icono, texto y grilla. En Stromlaufplan.de uno de los pedidos más votados es ver en el plano de armado qué hay detrás de cada protección.
- *Para qué sirve:* Un plano limpio para armar y otro con todo el detalle para entregar.
- *En Tableros MEC:* Se eligen las hojas de la carpeta y si el plano muestra medidas. Falta elegir dato por dato.
- *Fuente:* https://github.com/ItsRebaseTime/ElectroCraft/blob/main/docs/user-guide.md ; https://knx-user-forum.de/forum/supportforen/stromlaufplan-de/2054717-bezeichnung-von-sicherungen-im-aufbauplan

**105. Notas del taller sobre el plano** · ya está en la app

- *Quién la tiene:* EPLAN eVIEW Free; EPLAN Smart Mounting; WSCAD Cabinet AR
- *Cómo funciona:* En eVIEW se marcan errores y cambios con trazos rojos y verdes sobre el proyecto y sobre el modelo 3D del gabinete. En Smart Mounting el operario escribe un comentario sobre un componente y lo devuelve a ingeniería. Cabinet AR permite anotar cambios en el PDF.
- *Para qué sirve:* Que lo que se cambió en el banco vuelva al diseño antes de la próxima serie.
- *En Tableros MEC:* Menú → Medidas del tablero → “Notas del taller”. Se ven bajo el plano, en la pestaña Armar y en la carpeta impresa.
- *Fuente:* https://www.eplanusa.com/solutions/eplan-eview/ ; https://eplan.com/us-en/products/eplan-smart-mounting.html

**106. Marca de dato a verificar que también se imprime** · ya está en la app

- *Quién la tiene:* loadcenterlabels
- *Cómo funciona:* Si se carga un valor con signo de pregunta, se tilda 'verificar' o se escribe la palabra en la nota, el impreso muestra el número en cursiva, con una ficha amarilla de borde punteado y la celda rayada. Las dudas quedan a la vista en vez de ocultarse.
- *Para qué sirve:* No confiar en una medida de catálogo que nadie tomó con calibre.
- *En Tableros MEC:* “medir” en cada componente estimado y “medidas estimadas” en el encabezado de cada hoja.
- *Fuente:* https://github.com/traviscj/loadcenterlabels

**107. Insertar empujando e intercambiar al soltar** · ya está en la app

- *Quién la tiene:* DIN Rail Planner; Stromlaufplan.de (pedido de usuarios)
- *Cómo funciona:* En DIN Rail Planner, soltar un componente sobre otro del mismo tamaño los intercambia. En el foro de Stromlaufplan.de los usuarios piden que, al soltar un aparato, los siguientes se corran sin dejar huecos, como en un programa de oficina; hoy el arrastre solo respeta los separadores activados.
- *Para qué sirve:* Reordenar un riel con un solo gesto.
- *En Tableros MEC:* Al soltar un aparato entre otros dos, los demás se corren.
- *Fuente:* https://github.com/revoltek-daniel/din-rail-planner ; https://knx-user-forum.de/forum/supportforen/stromlaufplan-de/1836464-zweiter-versuch-mit-stromlaufplan-verbesserungsvorschläge-und-probleme

**108. Tocar para colocar en el primer lugar libre** · ya está en la app

- *Quién la tiene:* ElectroCraft; Verteilerplaner (Sandmann4951)
- *Cómo funciona:* En ElectroCraft, tocar una entrada del catálogo la coloca en el primer lugar libre, o en el riel seleccionado si hay uno; si no hay lugar aparece el mensaje de que no queda espacio en los rieles y no se coloca nada. Verteilerplaner muestra lugares '+' en la fila para agregar ahí y una papelera para quitar.
- *Para qué sirve:* Cargar un tablero rápido en el celular, donde arrastrar es incómodo.
- *En Tableros MEC:* “＋” en el catálogo lo pone en el primer riel donde entra, junto a los de su función.
- *Fuente:* https://github.com/ItsRebaseTime/ElectroCraft/blob/main/docs/user-guide.md

**109. Duplicar, copiar y pegar, y barra de acciones táctil** · ya está en la app

- *Quién la tiene:* ElectroCraft; DIN Rail Planner; Hager Ready
- *Cómo funciona:* ElectroCraft duplica con Ctrl+D y al pegar varios aparatos conserva la separación entre ellos; en táctil muestra sobre la barra inferior los botones Editar, Duplicar y Borrar para lo seleccionado. DIN Rail Planner tiene menú contextual con editar, duplicar, mover y borrar. Hager Ready duplica un tablero entero desde el menú de tres puntos.
- *Para qué sirve:* Repetir grupos iguales (por ejemplo guardamotor más contactor por cada motor) sin cargarlos de nuevo.
- *En Tableros MEC:* Ficha del aparato con mover, cambiar de riel, duplicar, sacar y borrar.
- *Fuente:* https://github.com/ItsRebaseTime/ElectroCraft/blob/main/docs/user-guide.md ; https://hager.com/at/wissen/faq/faq-hager-ready

**110. Importar el catálogo desde planilla o código de barras** · pendiente

- *Quién la tiene:* Verteilerplaner (Sandmann4951); TermiGrid
- *Cómo funciona:* Verteilerplaner carga artículos por código EAN, a mano o desde un archivo CSV o Excel; no explica cómo resuelve el EAN. TermiGrid revisa al iniciar si hay una base de bornes más nueva publicada y la descarga con un clic, validándola y recargando sin reiniciar.
- *Para qué sirve:* Cargar cincuenta componentes de una lista del proveedor en vez de uno por uno.
- *Cómo adaptarla:* Importar y exportar el catálogo en CSV (nombre, marca, referencia, ancho, alto, profundidad, costo) con vista previa de filas nuevas y repetidas antes de aceptar.
- *Fuente:* https://github.com/Sandmann4951/Verteilerplaner ; https://github.com/PatrickBarbian/TermiGrid

**111. Respaldo del proyecto en archivo** · ya está en la app

- *Quién la tiene:* DIN Rail Planner; FuseMapper; Electrical Panel Label Generator; ElectroCraft
- *Cómo funciona:* Todas guardan solas en el navegador y además exportan e importan el proyecto como archivo (JSON, o .ec en ElectroCraft con Ctrl+S). El generador de etiquetas guarda por separado las preferencias y los datos del diseño.
- *Para qué sirve:* No perder los tableros si se cambia de celular o se borran los datos del navegador.
- *En Tableros MEC:* Menú → Copia de seguridad de todo / Guardar este tablero en un archivo / Abrir un archivo.
- *Fuente:* https://github.com/revoltek-daniel/din-rail-planner

**112. Distinguir componentes existentes de nuevos** · pendiente

- *Quién la tiene:* HV-Planer
- *Cómo funciona:* Según la presentación del autor en el foro, el planificador permite diferenciar el material existente de las piezas nuevas dentro del mismo tablero. No pude ver la pantalla: el repositorio solo trae un archivo comprimido sin descripción.
- *Para qué sirve:* En reformas o ampliaciones, comprar solo lo que falta.
- *Cómo adaptarla:* Un estado por componente (a comprar, en stock, provisto por el cliente) que filtre la lista de materiales.
- *Fuente:* https://akkudoktor.net/t/hv-planer-kostenloser-planungshelfer-fuer-verteiler-zaehlerschraenke/41469

## Aplicaciones relevadas

### Configuradores de los fabricantes de tableros

| Aplicación | De quién | Dónde corre | Precio | Para qué sirve |
|---|---|---|---|---|
| [Hager Ready](https://hager.com/de/tools/hager-ready) | Hager | iOS / Android / Windows 10-11 (version PC en Microsoft Store) | Gratis; para uso completo pide registro gratuito en myHager | Planificar tableros chicos en obra con chequeo de norma y sacar esquema, lista de productos y etiquetas imprimibles. |
| [hagercad](https://hager.com/de/tools/hagercad-planungssoftware) | Hager | Windows | Version basica gratuita segun una comparativa de terceros; resto de licencias no verificado | Planificar tableros de distribucion hasta 4000 A: esquema automatico, calculo de armario, plano de montaje, disipacion, costeo y etiquetas. |
| [XL PRO3 (Tableaux)](https://www.legrand.nl/sites/g/files/ocwmcr626/files/2023-05/XLPro3_User_manual_En%202015.pdf) | Legrand | Windows | No verificado en esta busqueda | Disenar tableros de distribucion: elige el gabinete solo, acomoda los aparatos por filas, verifica temperatura, arma etiquetas y costeo. |
| [eDesign (for Small Buildings Panels)](https://www.se.com/es/es/faqs/FA411263/) | Schneider Electric | Web | Gratis (herramienta online) | Disenar tableros de hasta 250 A: unifilar, eleccion de gabinete, vista frontal con montaje por arrastre, etiquetas en PDF y lista de materiales en .xlsx. |
| [EcoStruxure Power Build - Rapsody](https://www.se.com/es/es/product-range-download/2309-ecostruxure-power-build---rapsody) | Schneider Electric | Windows | No verificado | Configurar y cotizar tableros Prisma hasta 3200 A, con modulos de disposicion automatica y manual, vista del tablero y lista con precios. |
| [EcoSet Config](https://www.se.com/ar/es/product-range/345630198-ecoset-config/) | Schneider Electric | Web | Presentada como gratuita en resenas; acceso por mySchneider (no verificado) | Herramienta nueva 'todo en uno' para disenar en 3D y cotizar tableros de baja tension hasta 3200 A, con validacion automatica de compatibilidad. |
| [ProClima](https://www.se.com/ww/en/product-range/2560-proclima) | Schneider Electric | Web (ProClima Web) y Windows | No verificado | Estudio termico de gabinetes de control: calcula la potencia disipada, propone ventilacion o refrigeracion y emite informe con logo propio. |
| [e-Design (DOC, CAT, OTC)](https://new.abb.com/low-voltage/support/software/e-design/overview) | ABB | Windows | No verificado | Suite de ingenieria: calculo electrico, configuracion del tablero con asistente de 3 pasos, frente del tablero y calculo de sobretemperatura. |
| [e-Configure](https://new.abb.com/low-voltage/support/e-configure) | ABB | Web | No verificado | Elegir y pedir productos de baja tension con sugerencias guiadas de accesorios compatibles y exportacion de lista de materiales. |
| [StriePlan](https://www.striebelundjohn.com/sites/default/files/2018-10/k0001_kap_11_strieplan.pdf) | ABB Striebel & John | Windows | Modulo basico gratuito; etiquetado y esquemas en modulos de ampliacion | Planificar y cotizar tableros: asistente de propuesta de gabinete en 5 pasos, calculo automatico de rieles, calculo termico, oferta y plano de vista. |
| [SIMARIS configuration / SIMARIS project](https://assets.new.siemens.com/siemens/assets/api/uuid:552323f8-4c15-42dc-98ed-dec91f705c71/Tutorial-SIMARIS-project-25-0-EN.pdf) | Siemens | Windows | No verificado | Planificar tableros ALPHA y SIVACON: eleccion automatica del sistema, colocacion automatica de aparatos, vista frontal, precios, disipacion y exportacion DXF/DWG. |
| [SIMARIS create](https://www.siemens.com/en-us/products/simaris/create/) | Siemens | Web (segun pagina de producto; no verificado) | No verificado | Configurar tableros importando la lista de materiales o arrastrando aparatos, con vista de sistema, exportacion de lista y pedido. |
| [SIMARIS therm](https://cache.industry.siemens.com/dl/files/553/109744553/att_908468/v1/operating_manual_SIMARIS_therm_V2_en_en-US.pdf) | Siemens | Windows | No verificado | Calcular la sobretemperatura de un tablero importando la lista de materiales; trae mas de 20.000 valores de disipacion y admite aparatos de terceros. |
| [ALPHA SELECT](https://www.scribd.com/doc/187822801/Alpha-Planning-and-Configuration) | Siemens | Windows | No verificado; la documentacion hallada es de 2008-2010 | Planificador antiguo de tableros ALPHA: equipar el gabinete virtualmente, lista con costeo y descuentos, vista de montaje de frente y por capas. |
| [xEnergy Configurator](https://www.eaton.com/gb/en-gb/catalog/low-voltage-power-distribution-controls-systems/xenergy-configurator.html) | Eaton | Windows | No verificado | Disenar y costear tableros xEnergy: vista frontal ajustable arrastrando, lista de materiales e integracion con calculadora de temperatura. (xSpider es de calculo de redes, no de tableros.) |
| [PBT-Q y CADpro (Tech Suite)](https://www.gewiss.com/content/dam/gewiss/softwares/software/tech-suite/pbt-q/pbtq-manuale/IT_Gewiss_PBTQ.pdf) | Gewiss | Windows | No verificado | Dimensionar y presupuestar tableros: vista frontal de la carpinteria, verificacion termica con declaracion de conformidad, esquema y datos de proyecto. |
| [Schrack Design](https://www.schrack.at/tools/schrack-design-software) | Schrack Technik | Windows (escritorio, no movil) | 100% gratis, con actualizaciones de software y productos | Planificar tableros segun EN 61439: plantillas, macros, recomendacion de tamano de gabinete, guia de calculo termico, esquema automatico e indice de circuitos. |
| [RiPanel](https://www.rittal.com/uk-en/Rittal-Configuration-System) | Rittal | Web | Gratis | Configurar un gabinete Rittal en 3D: accesorios compatibles, recortes y perforaciones automaticos con chequeo de colision, precio en vivo y paquete de datos CAD. |
| [RiTherm (antes Rittal Therm)](https://www.rittal.com/uk-en/Software/RiTherm) | Rittal | Web / aplicacion | Gratis segun el blog de Rittal | Calcular si un gabinete necesita climatizacion y que equipo corresponde; guarda el resultado en PDF. |
| [smartDESIGNER (Smart Designer)](https://www.wago.com/us/smartdesigner) | WAGO | Web | Gratis | Configurar en 3D tiras de bornes y modulos sobre riel DIN con chequeo de plausibilidad, marcado y listas de piezas. |
| [Weidmuller Configurator (WMC)](https://www.weidmuller.com/en/service/consulting_and_digital_engineering/weidmueller_configurator/weidmueller_configurator_wmc.jsp) | Weidmuller | Windows y version online | No verificado | Armar tiras sobre riel DIN con asistente de verificacion, topes automaticos, calculo del largo de riel, marcadores y exportacion de PDF, STEP y lista. |
| [PROJECT complete planning](https://www.phoenixcontact.com/en-ie/terminal-strip-configuration-project-complete) | Phoenix Contact | Windows | No verificado | Planificar tiras de bornes con auto-correccion de accesorios minimos, marcado y listas de pedido, piezas, estructura y montaje. |
| [Chint (sin configurador de tableros propio)](https://www.chintglobal.com/global/en/products/low-voltage-switchgear-and-software/software/elec-calc.html) | Chint | No aplica | No aplica | No se encontro un configurador de tableros de Chint; ofrece Elec Calc y sus datos de producto en el portal de EPLAN. |
| [Electro Planner (fuera de la lista, independiente)](https://www.electro-planner.com/en/distribution-board-design-software) | Electro Planner | Web | Version basica gratis | Editor visual de tableros sobre riel DIN multimarca (Hager, Legrand, Schneider, ABB) con exportacion PDF de circuitos, diagrama y lista de compra. |

### Programas de diseño de placa (CAD eléctrico)

| Aplicación | De quién | Dónde corre | Precio | Para qué sirve |
|---|---|---|---|---|
| [EPLAN Pro Panel](https://www.eplan.com/us-en/products/eplan-pro-panel/) | EPLAN (grupo Friedhelm Loh / Rittal) | Windows | Comercial por suscripción; precio a pedido (no verificado) | Armado 3D de placa y gabinete desde la lista de aparatos del esquema, con colisiones, zonas bloqueadas, perforado, cotas automáticas, ruteo de cables y datos para máquinas. |
| [EPLAN Smart Mounting](https://eplan.com/us-en/products/eplan-smart-mounting.html) | EPLAN | Web (navegador, con servidor propio) | Comercial; precio a pedido (no verificado) | Guía al armador paso a paso con vista 3D de dónde va cada riel, canal y aparato. |
| [WSCAD Cabinet Engineering (ELECTRIX)](https://www.wscad.com/en/engineering-disciplines/cabinet-engineering/) | WSCAD | Windows | Comercial por suscripción; colisiones y áreas bloqueadas en el nivel Expert (precio no verificado) | Layout de gabinete 2D/3D con ayudas de posicionado, áreas bloqueadas, llenado de canal en colores y datos de perforado. |
| [SEE Electrical 3D Panel+](https://etap.com/product/see-electrical-3d-panel) | IGE+XAO / ETAP (Schneider Electric) | Windows | Comercial; precio a pedido (no verificado) | Colocación 3D con imán a riel o superficie, colisiones, ruteo con largos de cable, plan de perforado y enlace a centros de corte. |
| [SEE Electrical Cabinet Layout (módulo 2D)](https://www.ige-xao.com/en/?p=254894) | IGE+XAO / ETAP (Schneider Electric) | Windows | Módulo adicional comercial (no verificado) | Plano 2D de tablero a medida real; los componentes se insertan desde una lista con todas las partes del proyecto. |
| [Zuken E3.panel / E3.panel+](https://www.zuken.com/en/product/e3series/e3panel) | Zuken | Windows | Comercial; precio a pedido (no verificado) | Layout 2D/3D con encastre a posiciones válidas, zonas prohibidas y de altura máxima, llenado de canal, lista de corte y agujeros de riel y canal. |
| [AutoCAD Electrical (Panel Layout)](https://www.autodesk.com/products/autocad/included-toolsets/autocad-electrical) | Autodesk | Windows | Incluido en la suscripción de AutoCAD (monto no verificado) | Huellas de panel insertadas desde la lista del esquema, riel DIN, editor de tiras de bornes, globos, placas de identificación e informes. |
| [SolidWorks Electrical (2D Cabinet Layout y 3D)](https://help.solidworks.com/2023/English/swelec/c_swelec_Cabinet2D-layout-sb.htm) | Dassault Systèmes | Windows | Comercial; precio a pedido (no verificado) | Layout 2D y 3D desde el árbol de componentes, inserción múltiple con separación, rieles y canales de largo editable, llenado de canal. |
| [PC/SCHEMATIC Automation + PanelBuilder](https://www.pcschematic.com/) | PC/SCHEMATIC A/S | Windows | Comercial (no verificado) | Esquemas con símbolos mecánicos para el layout; PanelBuilder documenta tableros chicos según EN 61439 con cálculo de potencia disipada. |
| [Capital X Panel Designer (ex Electra Cloud / Capital Electra X)](https://www.siemens.com/capitalelectrax) | Siemens (ex Radica Software) | Web | Suscripción mensual por usuario (monto no verificado) | CAD eléctrico en el navegador que genera el layout a medida real desde el esquema y ubica los símbolos sobre rieles al soltarlos. |
| [SkyCAD Electrical](https://skycad.ca/) | SkyCAD | Windows | Comercial; habría edición gratuita limitada (de memoria, no verificado) | Esquemas y layout de panel con rieles y canales estirables, cotas de layout, reparto parejo e imán a objetos. |
| [Electro Graphics iDEA / Eplus / CADelet](https://www.electrographics.it/) | Electro Graphics (Italia) | Windows | Comercial (no verificado) | Layout de tablero con disposición automática de componentes sobre riel y plano de puerta con cotas de perforado. |
| [Cadmatic Electrical (Cabinet Layout)](https://docs.cadmatic.com/electrical/2025H1/basic/Content/CabinetLayout/home_cabinet_layout.htm) | Cadmatic | Windows | Comercial (no verificado) | Layout de gabinete con rieles, canales y aparatos cuyas medidas quedan guardadas para elegirlos de una lista. |
| [ProfiCAD](https://proficad.com/) | ProfiCAD | Windows | Gratis para uso doméstico no comercial, licencia comercial paga (de memoria, no verificado) | Esquemas con lista de materiales, de cables y de bornes; no se encontró un módulo de layout de placa o riel DIN. |
| [QElectroTech (+ plugin qet_tb_generator)](https://qelectrotech.org/) | Comunidad QElectroTech | Windows / Linux / macOS | Gratis, software libre | Esquemas eléctricos; el plugin genera borneras y conectores. No se encontró módulo de layout de placa. |
| [Weidmüller Configurator (WMC y versión online)](https://www.weidmueller.com/configurator) | Weidmüller | Web y Windows | Gratis | Armar un riel DIN virtual, verificarlo, autocompletar topes, tapas y marcadores, calcular el largo de riel y exportar lista y CAD. |
| [WAGO Smart Designer](https://www.wago.com/global/digitization/digital-engineering/smartdesigner) | WAGO | Web | Gratis | Configurar rieles en 3D arrastrando bornes, con chequeo de plausibilidad y envío del marcado a la impresora (Smart Script). |
| [Phoenix Contact PROJECT complete / clipx ENGINEER](https://www.phoenixcontact.com/en-lt/terminal-strip-configuration-project-complete) | Phoenix Contact | Windows | Gratis | Planificar tiras de bornes y rieles (largo, agujeros, accesorios faltantes) e imprimir el marcado. |
| [hagercad](https://hagergroup.com/en/technologies-and-innovations/digital-tools/hagercad) | Hager | Windows | Gratuito del fabricante (no verificado) | Planificación de tableros de distribución: propone solo los gabinetes donde entran los aparatos y calcula pérdidas y calor. |
| [Hager Ready](https://hager.com/uk/digital-tools/hager-ready) | Hager | iOS / Android / web | Gratis | Configurar tableros modulares e imprimir las tiras de etiquetas y la lista de productos. |
| [Legrand XL PRO](https://www.legrand.be/sites/g/files/ocwmcr631/files/files/collection_detail_2/XLPro3_User_manual_En%202015_1.pdf) | Legrand | Windows | Gratis | Definición automática del armario a partir de la lista de aparatos, con apartado de reserva y vista previa del layout. |
| [Rittal RiTherm](https://www.rittal.com/RiTherm) | Rittal | Web (EPLAN Cloud) | Prueba de 30 días; después licencia (no verificado) | Cálculo térmico del gabinete: superficie efectiva, calor que evacúa solo y refrigeración necesaria. |
| [uPlan (dibujo de tablero)](https://uplan.io/electrical-cabinet-drawing) | uPlan | Web | 149 EUR pago único el módulo, según su página | Genera el dibujo del tablero, el unifilar y un PDF a partir de los aparatos ubicados en un plano de instalación. |
| [FusePlan.app](https://www.saashub.com/fuseplan-app) | Desarrollador independiente | Web | Gratis, sin registro | Arrastrar módulos DIN a filas, ver la capacidad por fila y exportar la lista de partes (tableros domiciliarios). |
| [Electrical Panel Designer](https://apps.apple.com/app/id6755904617) | Desarrollador independiente | iOS (iPad) | Gratis con compras dentro de la app | Lienzo con zoom, biblioteca de térmicas y diferenciales, rieles DIN de varios largos, barras y textos; guarda en el dispositivo y funciona sin conexión. |
| [RhinoElectric](https://discourse.mcneel.com/t/rhinoelectric-26-10-cabinets-in-3d-single-line-diagrams-wire-colours/223240) | Plugin para Rhino | Windows | No verificado | Layout de gabinete del que salen la lista de partes y el modelo 3D con las puertas abiertas. |

### Configuradores de borneras y riel

| Aplicación | De quién | Dónde corre | Precio | Para qué sirve |
|---|---|---|---|---|
| [clipx ENGINEER](https://www.phoenixcontact.com/en-pc/products/software-clipx-engineer-1272241) | Phoenix Contact | Web (navegador) y Windows de escritorio desde la versión 2.1 | Gratuito según recuerdo del fabricante (no reconfirmado en esta búsqueda) | Planificar y pedir regletas de bornes, placas de montaje equipadas y cajas de conexión en 3D, con autocorrección que agrega los accesorios. |
| [clipx ENGINEER assemble](https://www.phoenixcontact.com/en-pc/products/software-add-on-clipx-engineer-assemble-1662166) | Phoenix Contact | Complemento de clipx ENGINEER (navegador o escritorio) | De pago, por suscripción | Guiar al operario paso a paso en el armado de la regleta, con pick-by-light e impresión del marcado durante el armado. |
| [PROJECT complete (planning y marking)](https://www.phoenixcontact.com/en-pc/products/software-project-complete-1050453) | Phoenix Contact | Windows | Descarga gratuita | Antecesor de clipx ENGINEER: arma la regleta desde los datos del proyecto eléctrico y maneja todas las impresoras de marcado de la marca. |
| [WAGO Smart Designer (antes smartDESIGNER)](https://www.wago.com/global/digitization/digital-engineering/smartdesigner) | WAGO | Web (HTML5, necesita conexión) | Gratuito | Configurar rieles DIN con bornes y automatización en 3D, con chequeo de plausibilidad, lista de partes, marcado y pedido a la tienda. |
| WAGO Smart Script | WAGO | Windows | No confirmado en esta búsqueda | Software de marcado: recibe la configuración del riel desde Smart Designer e imprime tiras y marcadores en el Smart Printer. |
| [Weidmüller Configurator (WMC)](https://www.weidmueller.com/int/service/consulting_and_digital_engineering/weidmueller_configurator/weidmueller_configurator_wmc.jsp) | Weidmüller | Windows de escritorio; existe también un configurador online | Gratuito según recuerdo del fabricante (no reconfirmado en esta búsqueda) | Armar rieles y gabinetes con bornes, verificarlos con auto-arreglo, y sacar PDF, STEP, DXF, lista de partes y pedido. |
| [M-Print PRO](https://www.weidmueller.com/int/products/workplace_accessories/software/m_print_pro.jsp) | Weidmüller | Windows | No confirmado en esta búsqueda | Software de marcado conectado a WMC: numeración consecutiva e impresión de marcadores de bornes, cables y equipos. |
| Wieland wieplan / wiemarc | Wieland Electric | Windows (de memoria) | No relevado | NO RELEVADO: se agotó el cupo de búsquedas antes de llegar. De memoria, wieplan planifica regletas de la marca y wiemarc las marca; sin verificar. |
| CONTA-CLIP (CONTA-Sign y configuradores online) | CONTA-CLIP | No relevado | No relevado | NO RELEVADO: quedó sin buscar por el cupo de búsquedas. |
| ABB / Entrelec (hoy TE Connectivity) | ABB / TE Connectivity | No relevado | No relevado | NO RELEVADO: quedó sin buscar por el cupo de búsquedas. |
| Degson | Degson | No relevado | No relevado | NO RELEVADO: quedó sin buscar por el cupo de búsquedas. |
| Siemens TIA Selection Tool | Siemens | Web y Windows (de memoria) | Gratuito (de memoria, sin verificar) | NO RELEVADO en esta búsqueda. De memoria: arma estaciones de módulos sobre riel con reglas, lista de pedido y datos de ancho y disipación. |
| Configuradores de riel de Beckhoff y Murrelektronik | Beckhoff / Murrelektronik | No relevado | No relevado | NO RELEVADO: quedó sin buscar por el cupo de búsquedas. |

### Aplicaciones simples, web y de código abierto

| Aplicación | De quién | Dónde corre | Precio | Para qué sirve |
|---|---|---|---|---|
| [Stromlaufplan.de (Aufbauplan / Verteilerplan)](https://knx-user-forum.de/forum/supportforen/stromlaufplan-de) | stromlaufplan.de | web | Planificar es gratis; el PDF se paga por licencia de exportación: 79 EUR el esquema estándar y 39 EUR el plano de armado (dato de foro de 2023, puede estar desactualizado) | Genera el esquema y el plano de armado de un tablero de vivienda, con borneras y filas en módulos. |
| [Hager Ready](https://hager.com/de/tools/hager-ready) | Hager | iOS / Android / Windows | Gratis | Configura tableros chicos de vivienda y saca esquema, lista de materiales, tiras de etiquetas y leyenda de puerta en PDF. |
| [eDesign (Small Buildings Panels)](https://www.productinfo.schneider-electric.com/edesignbuildingpanel/edesign-building-panel/English/DOCA0184EN-07.pdf) | Schneider Electric | web | Gratis | Diseña y cotiza tableros residenciales y comerciales chicos en 7 pasos, con editor de etiquetas y pictogramas. |
| [ABB Easy Pro Web](https://new.abb.com/news/es/detail/96416/abb-easy-pro-web-disenar-el-cuadro-de-tu-vivienda-nunca-habia-sido-tan-facil) | ABB | web (notebook y tablet) | No confirmado (herramienta del portal de instaladores de ABB) | Configura el tablero de una vivienda y genera vista frontal, etiquetas, unifilar y lista de materiales con precios de lista. |
| [WAGO Smart Designer](https://www.wago.com/global/digitization/digital-engineering/smartdesigner) | WAGO | web | No confirmado (configurador en línea del fabricante) | Arma borneras sobre riel arrastrando, con chequeo de plausibilidad, vista 3D, lista de piezas y exportación del marcado a la impresora. |
| [Weidmüller Configurator (WMC / Online WMC)](https://www.weidmueller.com/int/service/consulting_and_digital_engineering/weidmueller_configurator/weidmueller_configurator_wmc.jsp) | Weidmüller | web / Windows | Gratis | Coloca componentes en un riel virtual, calcula el largo de riel y exporta lista de materiales, STEP y DXF. |
| [EPLAN Smart Mounting](https://eplan.com/us-en/products/eplan-smart-mounting.html) | EPLAN | web (monitor o tablet en el taller) | Licencia paga (precio no publicado); necesita el modelo de EPLAN Pro Panel | Guía al operario paso a paso en el montaje de rieles, cablecanales y aparatos, con estado verde/rojo. |
| [EPLAN eVIEW Free](https://www.eplanusa.com/solutions/eplan-eview/) | EPLAN | web | Gratis | Ver proyectos y el gabinete en 3D, comentar con marcas rojas/verdes y compartir por QR o enlace. |
| [WSCAD Cabinet AR](https://www.wscad.com/en/apps) | WSCAD | iOS / Android | Gratis (necesita proyectos exportados de WSCAD) | Escanear el QR de un componente del tablero y ver sus datos, conexiones y estado de cableado. |
| [clipx ENGINEER assemble](https://www.phoenixcontact.com/en-lt/news/worker-assistance-software-terminal-strip-assembly) | Phoenix Contact | Windows (puesto de trabajo con monitor) | Complemento pago por suscripción (período inicial de 12 meses) | Asistente paso a paso para armar borneras, incluidos accesorios y marcadores, con pick-by-light. |
| [ElectroCraft](https://github.com/ItsRebaseTime/ElectroCraft) | Proyecto abierto (ItsRebaseTime) | web / escritorio (Tauri) | Gratis, AGPL-3.0 | Planificador de tableros con riel DIN: ubicar, cablear, simular y exportar PDF vectorial; tiene vista táctil. |
| [DIN Rail Planner](https://github.com/revoltek-daniel/din-rail-planner) | Proyecto abierto (revoltek-daniel) | web | Gratis, MIT | Planificador de tableros por arrastre, con cableado, salidas, enlace para compartir y guardado local. |
| [Verteilerplaner (Sandmann4951)](https://github.com/Sandmann4951/Verteilerplaner) | Proyecto abierto | web (local) | Gratis | Subtableros con artículos reales, cableado automático, elección de gabinete con reserva, lista con precios y PDF completo. |
| [Schaltschrank-Planer (fhgamingone-create/Verteilerplaner)](https://github.com/fhgamingone-create/Verteilerplaner) | Proyecto abierto | web | Gratis | Planificador simple de filas por módulos con cuenta de ocupados/libres y aviso de fila sobrecargada. |
| [TermiGrid](https://github.com/PatrickBarbian/TermiGrid) | Proyecto abierto (PatrickBarbian) | Windows / macOS / Android | Gratis, MIT | Configurador de borneras sobre riel con rótulos, puentes, topes automáticos y exportación para impresoras de marcado. |
| [Electrical Panel Label Generator](https://github.com/SenMorgan/Electrical-Panel-Label-Generator) | Proyecto abierto (SenMorgan) | web | Gratis | Genera la tira de etiquetas de una fila de térmicas en milímetros exactos para imprimir en A4. |
| [loadcenterlabels](https://github.com/traviscj/loadcenterlabels) | Proyecto abierto (traviscj) | web (funciona sin conexión) | Gratis, MIT | Tarjeta de puerta, etiquetas por térmica en hojas autoadhesivas y resumen de balance, con enlace para compartir. |
| [nelko-p21-ble-labels](https://github.com/keeganovitt/nelko-p21-ble-labels) | Proyecto abierto (keeganovitt) | Scripts Python (macOS probado) | Gratis, AGPL-3.0 | Genera etiquetas de tablero desde una planilla CSV y las imprime en una rotuladora térmica por Bluetooth. |
| [FuseMapper](https://github.com/jumpingmushroom/FuseMapper) | Proyecto abierto (jumpingmushroom) | web (auto-alojada con Docker) | Gratis | Tablero visual sobre riel DIN donde se asignan consumos a cada térmica, con colores por ambiente y semáforo de carga. |
| [Circuit Breaker Planner](https://github.com/bp2008/CircuitBreakerPlanner) | Proyecto abierto (bp2008) | web | Gratis | Planifica o documenta un tablero, estima balance entre filas, imprime etiquetas y pasa el proyecto por texto o QR. |
| [HV-Planer](https://github.com/gintonik1980/hv-planer) | Proyecto abierto (gintonik1980) | Descarga (zip) | Gratis | Planifica campos, filas y módulos de tableros y medidores sin atarse a una marca, distinguiendo existente de nuevo. |
| [Schaltschrank digitaler Zwilling](https://github.com/CoNiRo/schaltschrank-digitaler-zwilling) | Proyecto abierto (CoNiRo) | web | Gratis, MIT | Gemelo 3D de un tablero didáctico con ficha por componente, etiquetas QR, lista de entradas/salidas y protocolo de prueba. |
| [ElectriCalc: NEC Calculator (Panel Planner)](https://apps.apple.com/app/id6760935722) | No confirmado | iOS | No confirmado | Arrastrar térmicas, diferenciales, barras y bornes a un riel DIN, cablear, rotular y exportar esquema y lista en PDF. |
| [Electrical Panel Designer](https://apps.apple.com/app/id6755904617) | No confirmado | iOS / iPad | Gratis con compras dentro de la app | Armar un tablero en un lienzo con rieles de distintos largos, barras, cables de colores y etiquetas de texto, sin conexión. |
| [Breaker Box: Panel Directory](https://apps.apple.com/app/id1459288663) | No confirmado | iOS | Gratis; versión Pro con tableros ilimitados, PDF en tamaños a medida y sincronización | Directorio de circuitos del tablero con leyenda en PDF al tamaño del bolsillo o de la puerta. |
| [Breaker Meister / PanelVue Builder / Panel Legend 2](https://apps.apple.com/app/id1612667329) | Varios | iOS | Gratis con exportación a PDF paga en varias | Planillas y leyendas de tablero en PDF, con QR y relación entre tableros. |

## Ideas de pantalla tomadas de estos programas

### Configuradores de los fabricantes de tableros

- Reserva: un numero con botones + y - al lado de la eleccion de gabinete, con 20% ya cargado (XL PRO3, hagercad). Ademas una segunda reserva solo para la bornera.
- Eleccion de gabinete en dos pantallas (eDesign): primero se toca la foto de la gama, despues se eligen las caracteristicas en una lista ya filtrada; a la derecha quedan fijos los datos del gabinete y el espacio vacio.
- No mostrar gabinetes que no sirven: hagercad lista solo aquellos en los que los aparatos entran, despues de 3 o 4 preguntas (acometida, bornes, reserva, proteccion).
- Asistente de 5 pasos de StriePlan: reserva, gabinete, sistema de montaje, equipamiento, resultado con accesorios; al final pregunta si insertar el tablero con o sin los aparatos colocados.
- Banco de trabajo a la izquierda (XL PRO3): lo que no esta colocado o dejo de entrar vive ahi, visible, en vez de quedar encimado o en rojo.
- Dos modos de vista para editar (XL PRO3): 'aparatos' para mover componentes y 'tapas' para mover filas enteras; al mover una fila las demas se reacomodan solas.
- Icono de destornillador para entrar al modo construccion (eDesign): fuera de ese modo nada se mueve por accidente.
- Marca verde en el lugar propuesto mientras se arrastra un aparato (eDesign).
- Termico como tres franjas de color sobre el dibujo del gabinete (XL PRO3): media, maxima arriba, minima abajo; cada una pasa a verde cuando esta bien.
- La temperatura estimada se muestra al pie de la lista de materiales y al tocarla se abre la guia de correccion por pasos (Schrack Design).
- Pantalla de etiquetas en dos zonas (XL PRO3): arriba las tiras por fila, generadas desde la disposicion; abajo las etiquetas sueltas de los aparatos con portaetiqueta. El texto se achica solo y avisa si se desborda.
- Plantilla de etiqueta elegida una sola vez en los ajustes del proyecto: 'solo marca' o 'marca + pictograma + ubicacion' (Hager Ready), con aviso de imprimir a tamano real o 100%.
- Menu de tres puntos en cada tablero con 'Duplicar' (Hager Ready).
- Precio total siempre a la vista mientras se configura, no al final (RiPanel).
- Verificador como ventana con resumen del proyecto arriba y lista de resultados abajo, para todo el proyecto o solo la vista actual (Weidmuller WMC).
- Antes de regenerar el acomodo, preguntar si se conserva la vista hecha a mano o se crea una nueva (SIMARIS project).
- Vista del tablero con puerta, con tapas o sin nada, elegible al ver e imprimir (hagercad).
- Los accesorios que el programa agrega solo (rieles, topes) se dibujan en el plano y entran a la lista de pedido, para que se vea de donde sale cada renglon (StriePlan).

### Programas de diseño de placa (CAD eléctrico)

- Lista lateral de componentes con tilde en los ya colocados y un interruptor 'ocultar los ya colocados' (AutoCAD Electrical); icono extra sobre los colocados y colocar un grupo entero eligiendo el nodo del árbol (EPLAN).
- En un choque, pintar los DOS objetos involucrados, escribir el motivo en la barra de estado y no dejar terminar la colocación (EPLAN).
- Llenado de cablecanal como semáforo rojo/amarillo/verde (WSCAD), pintado sobre el piso del canal (EPLAN), con aviso cuando falta un dato para calcularlo.
- Zonas prohibidas como rectángulos con nombre, listados en el árbol bajo cada superficie en un grupo 'Zonas bloqueadas' (EPLAN), con altura máxima opcional (Zuken E3.panel).
- Tecla para cambiar el punto de agarre entre centro, arriba y abajo mientras se arrastra, y Ctrl más dos puntos para centrar entre ellos (EPLAN).
- Diálogo corto al insertar varios: orden, 'usar separación uniforme' y distancia (AutoCAD Electrical); o lado izquierda/derecha más separación en mm (SolidWorks Electrical).
- Elección de gabinete como lista que solo muestra los tamaños donde entra lo elegido (hagercad), después de pedir la reserva deseada (Schneider).
- Etiquetas: elegir el 'modelo de etiqueta' en los ajustes del proyecto e imprimir a 'tamaño real / 100 %' (Hager Ready); exportar a Excel con una plantilla que fija las columnas (EPLAN).
- Plantilla de perforado por pieza en PDF 1:1 y un ajuste para elegir el lado 'cero' desde donde se miden los agujeros de rieles y canales (EPLAN).
- Cotas automáticas como 'esquema' que se regenera sin perder las cotas agregadas a mano (EPLAN).
- Función 'Verificar' con lista de faltantes y 'Resolver solo' al lado (Weidmüller).
- Largo de riel necesario visible mientras se colocan los aparatos y sumado a la lista de materiales (Weidmüller online).
- Modo armado: lista de pasos con confirmación, vista 3D de la posición exacta y orden fijo rieles, canales, aparatos; comentario por componente que vuelve al diseñador (EPLAN Smart Mounting).
- Vista de densidad de calor sobre el plano para ver dónde se concentran los aparatos que más disipan (EPLAN).
- Lo que falta en programas caros y los usuarios reclaman en foros: separación automática según el ancho de la huella y lista de corte en largos en vez de piezas (AutoCAD Electrical). Son dos lugares donde la app puede quedar mejor que ellos.

### Configuradores de borneras y riel

- Panel de revisión como lista de problemas, cada uno con su botón de arreglo y un 'arreglar todo' arriba (WMC Verify / Auto-Solve); clipx ENGINEER agrega la opción de que la revisión arranque sola.
- Botón doble al cerrar un asistente: 'Terminar' y 'Terminar + auto-arreglar' (WMC 'Finish + Auto-Solve').
- Sugerencias de mejora que se aceptan de a una o todas juntas, sin aplicarlas a la fuerza (clipx ENGINEER).
- En modo cableado, resaltar en rojo solo los puntos donde se puede conectar y cerrar la conexión con dos clics (WMC, Alt+W).
- Menú circular de dos anillos que aparece sobre el componente en lugar de una lista larga (clipx ENGINEER 2.0.13); en pantalla táctil evita ir hasta una barra de herramientas.
- Un atajo Alt+letra por asistente (V revisar, M etiquetas, D cotas, W cable) y una hoja de atajos de una página para imprimir y pegar en el taller (WMC).
- Diálogo de impresión de etiquetas con la opción 'marcas de corte: solo al inicio / en cada tramo' (WAGO Smart Designer).
- Largo de riel mostrado como valor calculado pero editable, al lado de 'sobrante inicial' y 'separación entre bloques' en el mismo cuadro (WAGO).
- Casilla 'Recordar ajustes' en los cuadros de importación y configuración para que el criterio del taller quede fijo (WAGO).
- Clic derecho sobre una selección con huecos → 'Compactar bloque' (WAGO, versión anterior).
- Diálogo de numeración con campos separados Prefijo / Bloque / Número inicial / Paso / Sufijo y sentido ascendente o descendente (M-Print PRO).
- Vista previa de la etiqueta tal como sale impresa, con aviso cuando el texto no entra (WAGO Smart Script).
- Vista de producción separada de la de diseño: el operario ve solo el paso actual y la pieza que toca (clipx ENGINEER assemble, vista de operario de WAGO).
- Lista de materiales exportada con la foto de cada producto (WAGO).
- Dirección propia de cada configuración en la barra del navegador para guardarla o compartirla (WAGO 2.11); nosotros ya compartimos por enlace, la idea es que la dirección se actualice sola mientras se edita.
- No encontré en las fuentes cómo muestran estas aplicaciones los módulos o milímetros libres ni qué colores usan para los avisos; nuestro semáforo verde/amarillo/rojo no tiene un equivalente documentado que copiar.

### Aplicaciones simples, web y de código abierto

- Aviso antes de imprimir etiquetas: 'A4 apaisado, escala 100 %, sin encabezados ni pies', con casilla para no volver a mostrarlo (Electrical Panel Label Generator). Hager lo resuelve con una pregunta frecuente: elegir 'Tamaño real'.
- Idea propia derivada de lo anterior: imprimir junto a la tira una regla de control de 100 mm para comprobar la escala antes de recortar.
- Espacio libre siempre a la vista por fila: módulos ocupados y libres calculados solos y aviso de fila sobrecargada (Schaltschrank-Planer). Nosotros ya lo tenemos con verde/amarillo/rojo; conviene sumar el número fijo 'libres: X mm' en cada riel.
- Lugares '+' dibujados en los huecos del riel para agregar ahí, y papelera para quitar (Verteilerplaner de Sandmann4951).
- Si no hay lugar, no colocar y mostrar un mensaje claro en vez de encimar (ElectroCraft). Un riel no se deja acortar por debajo de lo que ocupan sus aparatos.
- Vista táctil de ElectroCraft: barra inferior con cuatro botones (Tableros, Agregar, Editar, PDF), barra de acciones Editar/Duplicar/Borrar sobre la selección, hojas que suben desde abajo, pellizco para zoom, y cambio automático a este diseño por debajo de 700 px de ancho.
- Tocar un aviso selecciona el componente que lo causa (ElectroCraft lo hace con sus avisos de simulación).
- Mismo semáforo para todo: verde instalado y rojo pendiente en el armado (EPLAN Smart Mounting), semáforo de cableado por aparato (WSCAD Cabinet AR) y de carga por térmica (FuseMapper).
- Doble clic o doble toque para renombrar en el lugar tablero, circuito y proyecto (DIN Rail Planner); el nombre del proyecto aparece en la pestaña del navegador.
- Numeración automática que saltea lo editado a mano, con una flecha para volver a automático (ElectroCraft).
- Dato dudoso visible también en el papel: cursiva, ficha amarilla punteada 'verificar' y celda rayada (loadcenterlabels).
- Enlace compartido que al abrirse se suma a lo guardado y nunca lo pisa; los datos van en la parte de la dirección que no llega a ningún servidor (loadcenterlabels).
- Leyenda de puerta con tamaños predefinidos: hoja entera, media hoja, 'puerta angosta' y a medida, con escala de letra por etiqueta (loadcenterlabels, Breaker Box).
- Elección de gabinete: lista por fabricante, espacio necesario calculado con la reserva y aviso si el elegido queda chico (Verteilerplaner de Sandmann4951).
- Vista previa de etiquetas en vivo con interruptores para índice, icono, texto y líneas de grilla (Electrical Panel Label Generator).
- Color por grupo: FuseMapper colorea por ambiente; en nuestro acomodado 'por función' se puede colorear cada grupo funcional en plano y etiquetas.
- Abrir la app con un ejemplo cargado y tener una dirección directa al ejemplo (ElectroCraft, DIN Rail Planner).
- Lo que piden los usuarios de Stromlaufplan.de y la app no hace bien: correr los vecinos sin huecos al soltar, atajos de teclado para insertar/borrar/duplicar, ver la función detrás de cada etiqueta, bornes en vertical, lugares de medio módulo, y ver y editar cómodamente gabinetes grandes.
- Quejas en tiendas de apps: en PanelVue Builder las fotos no salen en la planilla exportada y necesita internet; en varias (Breaker Meister, PanelMap, Breaker Box) el PDF es de pago. Fotos en el impreso, uso sin conexión y exportación gratis son ventajas a mantener.
- Pendientes que el propio generador de etiquetas reconoce: más tamaños de hoja además de A4 y mejor uso en pantalla chica.

## Límites de la investigación

**Configuradores de los fabricantes de tableros.** No pude abrir ninguna pagina: la red de esta sesion bloquea los sitios de los fabricantes. Para leer los manuales completos hay que habilitar en la configuracion de red al menos www.legrand.be, hager.com, new.abb.com y www.productinfo.schneider-electric.com (probe esos cuatro y fallaron igual, asi que no segui intentando con otros). Todo lo relevado sale de extractos que devolvio el buscador sobre manuales, paginas de producto y notas de prensa. Por eso 'confirmado: true' significa que la funcion aparecio en un extracto atribuido a la fuente citada, no que haya leido el documento entero ni usado la aplicacion. No instale ni opere ninguna aplicacion y no vi capturas ni videos.  Cobertura despareja: hay buen detalle de interfaz para Legrand XL PRO3, Schneider eDesign, Hager Ready, hagercad, Schrack Design y Rittal RiPanel. Para Rapsody, EcoSet Config, ABB e-Design, Eaton xEnergy Configurator, Gewiss PBT-Q, SIMARIS configuration y ALPHA SELECT solo consegui descripciones generales. No encontre ningun configurador de tableros de Chint, ni un configurador llamado 'Mi Tablero' o de Easy9 / Acti9 de Schneider en Argentina (lo que aparece para Argentina es eDesign y EcoSet Config). Tampoco encontre un producto de Eaton llamado xBoard.  Varias fuentes son viejas y la interfaz actual puede diferir: manual de XL PRO3 de 2015, manual basico de hagercad 4.x de 2019, guia de Rapsody de 2008, catalogos de ALPHA SELECT de 2008-2010, presentacion de ABB DOC de 2010. Precios y licencias figuran como 'no verificado' cuando el buscador no los mostro.  Casi todas estas aplicaciones son para tableros de distribucion modulares (aparatos de paso 18 mm en filas con tapas), no para tableros de control con placa de montaje y cablecanal. Las funciones se trasladan, pero las reglas no: la reserva del 20% viene de la practica de distribucion (DIN 18015 la recomienda), y el calculo termico propuesto es una simplificacion que el taller deberia validar. Los configuradores de borneras (WAGO, Weidmuller, Phoenix Contact) y Electro Planner no estaban en la lista original; los inclui porque aportan funciones utiles para riel DIN. Tambien aparecieron editores online independientes (PowerSketch, DinDraw, ElectroBoard) que no investigue.

**Programas de diseño de placa (CAD eléctrico).** No pude abrir ninguna página completa: en esta sesión la lectura directa de sitios falló por red (eplan.help, help.autodesk.com, help.solidworks.com y wscad.com no resuelven). Todo sale de resúmenes de búsqueda sobre las ayudas oficiales, manuales y notas de prensa, así que los nombres de menú y el comportamiento general están respaldados, pero no vi pantallas ni videos. Para profundizar hay que permitir esos dominios (y zuken.com, skycad.ca) en la configuración de red de la sesión.  Otros límites: - Las ayudas citadas son de versiones distintas (EPLAN 2.8 a 2026, AutoCAD Electrical 2015 a 2027); los menús pueden cambiar entre versiones. - Los precios no se verificaron, salvo los 149 EUR de uPlan, que figuran en su página. - Encontré poco detalle de layout para ProfiCAD y QElectroTech (no apareció un módulo de placa), PC/SCHEMATIC, SEE Electrical Cabinet Layout 2D, SkyCAD y Cadmatic. - La función 'reserva de espacio' está marcada como no confirmada: solo vi un resumen de Schneider y el índice del manual de Legrand. - El 50 % de llenado de canal viene de copias de catálogos de Panduit en sitios de terceros. - No encontré proyectos de código abierto de layout de riel DIN en GitHub; la búsqueda web indexa mal los repositorios. - Las columnas 'ya la tenemos', 'valor' y 'esfuerzo' son estimación mía a partir de la descripción de Tableros MEC, sin haber revisado el código de la app.

**Configuradores de borneras y riel.** El relevamiento quedó incompleto: se cubrieron bien solo tres fabricantes (Weidmüller, WAGO y Phoenix Contact). Wieland, CONTA-CLIP, ABB/Entrelec, Degson, Siemens, Beckhoff y Murrelektronik no se llegaron a buscar; figuran en la lista de aplicaciones marcados como no relevados y lo poco que digo de ellos es de memoria. Tampoco busqué aplicaciones fuera de la lista (tiendas de apps, GitHub, foros).  Causas: - El cupo de búsquedas web del turno (200, compartido entre todos los agentes) se agotó cuando llevaba unas 37 consultas. Para seguir hace falta un mensaje de continuación o subir CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION. - No pude abrir ninguna página: www.weidmueller.com, www.wago.com y www.computer-automation.de no resuelven desde esta sesión y habría que permitirlos en la configuración de red. No probé más sitios después de esos tres.  Consecuencias para leer el resultado: - 'confirmado: true' significa que el dato apareció en el resumen de un resultado de búsqueda que cita la fuente indicada, no que haya leído el manual o la página completa. Varias fuentes son páginas comerciales o notas de prensa del fabricante. - No vi pantallas ni videos. Faltan detalles finos de interfaz: qué pasa al arrastrar un borne sobre una fila ocupada, cómo se muestra el espacio libre, colores de los avisos, cómo se elige un gabinete. - Dos funciones van con confirmado: false: la holgura entre componentes (extracto ambiguo de las notas de clipx ENGINEER 2.2) y el ancho y la potencia disipada de Siemens (de memoria). - 'Compactar bloque' de WAGO sale de una guía de una versión anterior (smartDESIGNER 6) y puede haber cambiado. - Los precios de clipx ENGINEER, WMC, M-Print PRO y Smart Script no se reconfirmaron; sí están confirmados PROJECT complete (gratis), Smart Designer (gratis) y clipx ENGINEER assemble (suscripción paga). - Para una segunda pasada, las fuentes más ricas son el manual de usuario de WMC (PDF 2023-11), la ayuda en línea de clipx ENGINEER (phoenixcontact.com/cxe/help) y techdocs.wago.com.

**Aplicaciones simples, web y de código abierto.** No usé ninguna de las aplicaciones: todo sale de documentación y descripciones. Solo pude abrir páginas de github.com; hager.com, knx-user-forum.de, akkudoktor.net y bp2008.github.io no resolvieron desde esta sesión (hay que habilitarlos en la configuración de red). Además, el cupo de búsquedas web del turno, compartido entre agentes, se agotó después de unas 23 búsquedas. Consecuencias: (1) Los proyectos abiertos (ElectroCraft, DIN Rail Planner, Verteilerplaner de Sandmann4951, Schaltschrank-Planer, TermiGrid, Electrical Panel Label Generator, loadcenterlabels, nelko-p21-ble-labels, FuseMapper, Circuit Breaker Planner, gemelo digital) los leí directamente en su descripción o guía de uso. (2) Las aplicaciones comerciales (Hager Ready, Stromlaufplan.de, eDesign, ABB Easy Pro Web, WAGO, Weidmüller, EPLAN Smart Mounting y eVIEW, WSCAD Cabinet AR, clipx ENGINEER assemble y las apps de App Store) están relevadas solo por resúmenes de búsqueda de sus páginas y foros, no por sus manuales; el detalle de interfaz es menor y marqué 'confirmado' porque el resumen cita la función, no porque haya visto la pantalla. (3) No encontré el dato de reserva en porcentaje ni el chequeo de normas de Hager Ready, ni la fórmula de ancho de bornera de Stromlaufplan.de. (4) HV-Planer y dinplan.de no tienen descripción legible en su repositorio. (5) No llegué a relevar Google Play ni foros de electricistas en español; no confirmé ninguna app argentina de diseño de tableros más allá de eDesign de Schneider. (6) Los precios de Stromlaufplan.de son de un anuncio de 2023; fabricante y precio de varias apps de App Store quedaron sin confirmar. Las ideas marcadas como propias (regla de control de 100 mm, plantilla 1:1 en mosaico) no vienen de ninguna aplicación.
