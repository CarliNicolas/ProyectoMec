# 02 · Catálogo completo de funciones

> Parte del [plan de acción](README.md). Acá está **todo lo que se le podría agregar a la app**, ordenado por módulo y, dentro de cada módulo, por etapa y por impacto.

**Cómo leerlo**

- **Etapa**: cuándo conviene construirla. 1 · MVP (medidas, catálogo y editor 2D/3D) → 2 · Taller (cortes, perforado, etiquetas, series, checklists) → 3 · Cableado (bornes, conexiones, lista de cables, cableado guiado) → 4 · Gestión (usuarios, stock, compras, presupuestos, carpeta técnica, postventa) → 5 · Avanzado (app nativa, Bluetooth, realidad aumentada, más inteligencia artificial) → Futuro.
- **Impacto**: cuánto tiempo o cuántos errores ahorra en el taller. **Esfuerzo**: cuánto cuesta desarrollarla. Las dos son estimaciones cualitativas.
- Las más convenientes son las de impacto alto y esfuerzo bajo; están marcadas con ★.
- Origen: 216 propuestas de cuatro puntos de vista (armador, proyectista, dueño y calidad), depuradas de duplicados, más las que surgieron de la investigación y de las fotos para inteligencia artificial, hardware, experiencia de uso y largo plazo.

## Resumen

**272 funciones** en 15 módulos.

| Módulo | 1 · MVP | 2 · Taller | 3 · Cableado | 4 · Gestión | 5 · Avanzado | Futuro | Total |
|---|---:|---:|---:|---:|---:|---:|---:|
| [Relevamiento y medidas del tablero](#rel) | 10 | 2 | · | · | · | 1 | 13 |
| [Catálogo de componentes](#cat) | 8 | 5 | 5 | 1 | · | · | 19 |
| [Editor 2D y 3D en tiempo real](#edi) | 14 | 5 | 2 | 2 | 1 | · | 24 |
| [Ingeniería eléctrica](#ele) | · | 3 | 13 | · | 1 | · | 17 |
| [Reglas y validaciones automáticas](#val) | 1 | 6 | 6 | 1 | 1 | · | 15 |
| [Materiales, stock, compras y cortes](#mat) | 1 | 5 | 2 | 8 | · | · | 16 |
| [Ejecución en el taller](#arm) | · | 9 | 6 | 1 | · | · | 16 |
| [Series, plantillas y revisiones](#ser) | 1 | 11 | 1 | 1 | 1 | · | 15 |
| [Calidad, ensayos y trazabilidad](#cal) | · | 16 | 2 | 3 | · | · | 21 |
| [Documentación, entrega y postventa](#doc) | 2 | 4 | 2 | 12 | · | · | 20 |
| [Gestión del taller](#ges) | · | 1 | · | 21 | 1 | · | 23 |
| [Inteligencia artificial y automatización](#ia) | · | 3 | 1 | 2 | 11 | 2 | 19 |
| [Integraciones de hardware y de otros programas](#hw) | 1 | 2 | 1 | 1 | 9 | 5 | 19 |
| [Plataforma y experiencia de uso](#pla) | 9 | 6 | · | 6 | · | · | 21 |
| [Ideas de largo plazo](#fut) | · | · | · | · | · | 14 | 14 |
| **Total** | **47** | **78** | **41** | **59** | **25** | **22** | **272** |

<a id="rel"></a>

## Relevamiento y medidas del tablero

Placa, gabinete, rieles, cablecanal, fotos y acotado. Es el pedido "anotar medidas del tablero".

| Código | Función | Qué hace | Etapa | Impacto | Esfuerzo |
|---|---|---|---|---|---|
| REL-01 | **Asistente de relevamiento de placa** ★ | Guía paso a paso para cargar ancho y alto de la placa, altura y largo de cada riel y cada tramo de cablecanal, con foto de respaldo por cota y chequeo de escuadra midiendo las diagonales. | 1 · MVP | alto | bajo |
| REL-02 | **Importar fotos ya sacadas** ★ | Las fotos que ya están en la galería del iPhone se asignan a un tablero, un ejemplar y una etapa, sin tener que volver a sacarlas. | 1 · MVP | alto | bajo |
| REL-03 | **Ortofoto rectificada como calco de fondo** | Se marcan las 4 esquinas de la placa en una foto del iPhone; la app la rectifica con las medidas cargadas y la muestra semitransparente bajo el editor para calcar posiciones reales. | 1 · MVP | medio | medio |
| REL-04 | **Tarjeta de escala para fotos** | La app ofrece una tarjeta imprimible con escala y código; al fotografiar pide incluirla y la usa para dimensionar y para identificar el tablero en la foto. | 1 · MVP | medio | medio |
| REL-05 | **Biblioteca de gabinetes y bandejas medidas** | Guarda cada gabinete o placa suelta (marca, modelo, medidas reales de bandeja, profundidad útil hasta la puerta, bulones) como plantilla reutilizable para toda la serie. | 1 · MVP | medio | bajo |
| REL-06 | **Control de escala con regla testigo** | Tras rectificar la foto, la app mide una regla de acero apoyada en la placa y avisa si el error supera 2 mm, para repetir la toma. | 1 · MVP | medio | bajo |
| REL-07 | **Cotas dibujadas sobre la foto** | Se tocan dos puntos de cualquier foto y se escribe la medida real; la cota queda dibujada sobre la imagen como registro del relevamiento. | 1 · MVP | medio | bajo |
| REL-08 | **Foto guiada con referencia de escala** | Al fotografiar la placa, la app muestra un marco para encuadrar de frente y pide apoyar una regla o tarjeta patrón. No guarda hasta confirmar que la referencia se ve. | 1 · MVP | medio | bajo |
| REL-09 | **Medidas de placa por dictado** | Formulario de pocos campos en orden fijo (ancho, alto, altura de cada riel, tramos de canal) que acepta dictado o teclado numérico gigante. El dibujo se actualiza al cargar cada valor. | 1 · MVP | medio | bajo |
| REL-10 | **Zonas prohibidas y profundidad útil** | Sobre la placa se dibujan zonas donde no va nada (bulones, bisagras, entrada de cables) y se carga la profundidad hasta la puerta; el editor impide ocupar esas zonas o superar esa profundidad. | 1 · MVP | medio | bajo |
| REL-11 | **Marcadores impresos para ortofoto automática** | Cuatro marcadores tipo ArUco pegados en las esquinas de la placa permiten rectificar la foto sin tocar las esquinas a mano. | 2 · Taller | medio | medio |
| REL-12 | **Relevamiento de gabinete y puerta** | Ficha del gabinete completo: medidas exteriores e interiores, profundidad, puerta, visor, bisagras, cerradura, grado IP y lado de entrada de cables. | 2 · Taller | medio | bajo |
| REL-13 | **Medición con LiDAR o realidad aumentada** | Medir gabinetes grandes con el sensor del iPhone. Precisión de ±1 cm: sirve para el gabinete, no para componentes. | Futuro | bajo | alto |

<a id="cat"></a>

## Catálogo de componentes

Foto, medidas, bornes y datos de cada aparato. Es el pedido "foto y medidas de los componentes".

| Código | Función | Qué hace | Etapa | Impacto | Esfuerzo |
|---|---|---|---|---|---|
| CAT-01 | **Alta rápida de componente desde el banco** | Foto frontal, código y tres medidas con calibre en menos de un minuto, guiado paso a paso. Queda marcado como incompleto para terminar la ficha después en la PC. | 1 · MVP | alto | medio |
| CAT-02 | **Ficha de componente con foto y medidas** | Alta desde el celular: referencia, marca, ancho, alto, profundidad, módulos DIN, eje de riel y fijación, más foto frontal rectificada. Cada medida guarda su origen (calibre u hoja de datos) y fecha. | 1 · MVP | alto | medio |
| CAT-03 | **Catálogo semilla del tablero MEC** ★ | Precarga los ~25 componentes del enfriador (GV2ME08, LC1E0910, LOGO! 230RCE, Easy9, RXM con zócalo, bornes) con las medidas ya investigadas, marcadas 'sin verificar' hasta confirmarlas con calibre. | 1 · MVP | alto | bajo |
| CAT-04 | **Importación masiva desde planilla** ★ | Carga de muchos componentes de una vez desde Excel o CSV con columnas fijas (marca, referencia, ancho, alto, profundidad, precio). | 1 · MVP | alto | bajo |
| CAT-05 | **Buscador y filtros del catálogo** | Buscar por nombre, marca o referencia y filtrar por tipo, ancho en módulos, favoritos y usados recientemente. | 1 · MVP | medio | bajo |
| CAT-06 | **Conjuntos y accesorios vinculados** | Permite definir conjuntos que se colocan y se listan juntos: relé RXM más zócalo, guardamotor más contacto auxiliar, Shelly más soporte DIN, bornes con tapa final y topes. | 1 · MVP | medio | bajo |
| CAT-07 | **Holguras y reglas de montaje por ficha** | Cada ficha admite separación lateral, superior e inferior, orientación permitida y distancia mínima al cablecanal; el editor las dibuja como halo alrededor del aparato. | 1 · MVP | medio | bajo |
| CAT-08 | **Varias fotos por componente** | Además del frente: lateral, placa de características, bornes y foto con escala; cada una con su rol. | 1 · MVP | medio | bajo |
| CAT-09 | **Estado, sucesor y sustitutos aprobados** | Marca cada referencia como vigente o discontinuada, con su sucesor y los sustitutos que el proyectista aprobó; al reemplazar, la app revalida medidas, bornes y tensión de bobina. | 2 · Taller | alto | medio |
| CAT-10 | **Leer el código impreso del aparato** | La cámara lee el QR, DataMatrix o código de barras del aparato y lo busca en el catálogo; si no existe, propone darlo de alta. | 2 · Taller | medio | bajo |
| CAT-11 | **Piezas propias con instructivo de fabricación** | Ficha para piezas hechas en el taller, como el soporte del Shelly: foto, croquis acotado, material y pasos. Se agrega al layout y a la lista de materiales como cualquier componente. | 2 · Taller | medio | bajo |
| CAT-12 | **Zona de etiqueta por componente** | En la ficha de cada aparato se marca sobre la foto dónde va la etiqueta SOPn/BOMn para no tapar modelo ni regulación. El montaje guiado muestra ese lugar. | 2 · Taller | medio | bajo |
| CAT-13 | **Perfil lateral escalonado** | En lugar de una caja simple, el aparato se modela con el perfil típico de riel DIN (cuerpo ancho, frente angosto) para un 3D más fiel. | 2 · Taller | bajo | medio |
| CAT-14 | **Editor de bornes sobre la foto** | Tocando la foto frontal se marca cada borne con nombre (1L1, A1, I3, Q2), tipo, rango de sección, conductores admitidos, par de apriete y largo de pelado. | 3 · Cableado | alto | medio |
| CAT-15 | **Catálogo de cables y consumibles** ★ | Cables por sección y color con diámetro exterior, punteras por sección y color, termocontraíble, precintos y bases, con unidad de compra. | 3 · Cableado | alto | bajo |
| CAT-16 | **Componentes de puerta y frente** | Pulsadores, pilotos, selectoras, parada de emergencia y pantallas, con diámetro de perforado y profundidad detrás de la puerta. | 3 · Cableado | medio | medio |
| CAT-17 | **Datos de conexión por borne** | Cada borne del catálogo guarda largo de pelado, puntera admitida, sección máxima, torque y punta de destornillador. El paso de cableado los muestra sin abrir ninguna hoja de datos. | 3 · Cableado | medio | medio |
| CAT-18 | **Prensacables y accesorios de gabinete** | Prensacables por rosca y rango de cable, ventiladores, filtros, calefactores, iluminación y portaplanos. | 3 · Cableado | medio | bajo |
| CAT-19 | **Certificados de seguridad eléctrica adjuntos** | Permite adjuntar a cada componente su certificado de seguridad y avisa cuando falta, sobre todo en marcas poco difundidas. | 4 · Gestión | bajo | bajo |

<a id="edi"></a>

## Editor 2D y 3D en tiempo real

Colocar, mover y ver el tablero en las dos vistas a la vez. Es el pedido "dibujo 2D y 3D del armado".

| Código | Función | Qué hace | Etapa | Impacto | Esfuerzo |
|---|---|---|---|---|---|
| EDI-01 | **Modelo único con vistas 2D y 3D** | Un solo modelo paramétrico con dos proyecciones: al mover un aparato se actualizan el frente 2D y el 3D en el mismo instante. En iPhone, una vista con conmutador; en PC, pantalla partida. | 1 · MVP | alto | alto |
| EDI-02 | **Acotado automático y cotas manuales** | Genera la cadena de cotas por riel y las alturas de rieles y canales desde el borde de placa; además permite acotar entre dos puntos cualesquiera. Todo sale en el PDF. | 1 · MVP | alto | medio |
| EDI-03 | **Colisiones y holguras en vivo** | Mientras se arrastra, la pieza se pone roja si pisa otro aparato, un cablecanal, una zona prohibida o la holgura mínima de su ficha, tanto en el plano como en profundidad. | 1 · MVP | alto | medio |
| EDI-04 | **Paleta para arrastrar al riel** | Los componentes se arrastran desde el catálogo al riel, o se tocan para agregarlos al final de la fila elegida. | 1 · MVP | alto | medio |
| EDI-05 | **Snap a riel y pegado al vecino** | Los aparatos se enganchan al riel y se pegan borde con borde con sus anchos reales; mover un riel arrastra todo lo montado. Grilla opcional por módulo DIN. | 1 · MVP | alto | medio |
| EDI-06 | **Deshacer y rehacer** ★ | Historial ilimitado de cambios en el editor, por usuario. | 1 · MVP | alto | bajo |
| EDI-07 | **Duplicar y repetir en fila** ★ | Multiplica un aparato por N con etiquetas consecutivas (SOP1 a SOP5) en un solo paso. | 1 · MVP | alto | bajo |
| EDI-08 | **Etiquetas visibles sobre los aparatos** ★ | Cada aparato muestra su etiqueta (SOP1, BOM1) en el 2D y en el 3D; se edita tocándola. | 1 · MVP | alto | bajo |
| EDI-09 | **Vista taller bloqueada, solo lectura** ★ | Modo de consulta donde el plano 2D y el 3D se pueden girar y ampliar pero nada se mueve. Editar exige un toque largo en un candado. | 1 · MVP | alto | bajo |
| EDI-10 | **Capas y visibilidad** | Mostrar u ocultar cablecanal, tapas, etiquetas, cotas, fotos y zonas prohibidas para ver lo que interesa en cada momento. | 1 · MVP | medio | bajo |
| EDI-11 | **Cotas acumuladas desde un único origen** | Además de las cotas parciales, muestra la posición de cada riel, canal y agujero medida desde la esquina inferior izquierda. Se marca toda la placa sin mover la cinta métrica. | 1 · MVP | medio | bajo |
| EDI-12 | **Ocupación y reserva por riel** | Cada fila muestra milímetros ocupados y libres y el porcentaje de reserva, con aviso al pasar el 80 % de ocupación. | 1 · MVP | medio | bajo |
| EDI-13 | **Ordenar una fila automáticamente** | Compactar hacia un lado, centrar o repartir con separación pareja los aparatos de un riel. | 1 · MVP | medio | bajo |
| EDI-14 | **Vistas rápidas y corte en profundidad** | Botones de frente, planta, lateral e isométrica, y un corte lateral para comprobar que la puerta cierra. | 1 · MVP | medio | bajo |
| EDI-15 | **Bloques reutilizables** | Un grupo de aparatos (por ejemplo el arranque de una bomba) se guarda como bloque y se inserta de nuevo con sus etiquetas renumeradas. | 2 · Taller | alto | medio |
| EDI-16 | **Capa de inspección sobre el dibujo** | En la vista 2D o 3D cada aparato se colorea según su estado (pendiente, verificado, no conformidad abierta). Tocarlo abre su checklist, número de serie y ajustes. | 2 · Taller | medio | medio |
| EDI-17 | **Gabinete más chico donde entra** | Prueba el layout en los gabinetes cargados con su placa real y lista cuáles entran, con espacio libre y precio, para elegir el más económico que cumple. | 2 · Taller | medio | medio |
| EDI-18 | **Tapas de canal y puerta en el 3D** | El 3D muestra las tapas del cablecanal y la puerta del gabinete, que se pueden abrir u ocultar. | 2 · Taller | bajo | medio |
| EDI-19 | **Modo presentación** | Giro automático y vista limpia del 3D para mostrar el tablero a un cliente. | 2 · Taller | bajo | bajo |
| EDI-20 | **Cables visibles en el 3D** | Los mazos dentro del cablecanal y las bajadas a cada borne se dibujan con el color real del cable. | 3 · Cableado | medio | alto |
| EDI-21 | **Editor de puerta** | Layout 2D de la puerta con pulsadores, pilotos y pantallas, con su plantilla de perforado y chequeo contra lo montado detrás. | 3 · Cableado | medio | medio |
| EDI-22 | **Seguimiento en vivo desde otro dispositivo** | Lo que el armador tilda en el banco se ve al instante en la PC de la oficina sobre el mismo dibujo. | 4 · Gestión | medio | medio |
| EDI-23 | **Costo en vivo mientras se dibuja** | Un contador en el editor muestra costo de materiales y precio estimado, y se actualiza al agregar, quitar o cambiar un componente o el gabinete. | 4 · Gestión | medio | bajo |
| EDI-24 | **Varias superficies de montaje** | Laterales, doble fondo o más de una placa en el mismo gabinete. | 5 · Avanzado | bajo | medio |

<a id="ele"></a>

## Ingeniería eléctrica

Entradas y salidas del PLC, borneras, conexiones, lista de cables y nomenclatura de etiquetas.

| Código | Función | Qué hace | Etapa | Impacto | Esfuerzo |
|---|---|---|---|---|---|
| ELE-01 | **Generador de nomenclatura de etiquetas** | Reglas configurables del taller (PE<n>-<origen><unidad>, PQ<n>-<destino><unidad>, SOPn, BOMn) generan todas las marcas de cables y aparatos desde el modelo, sin duplicados ni faltantes. | 2 · Taller | alto | medio |
| ELE-02 | **Adjuntar esquemas existentes** | Se sube el esquema hecho en otra herramienta (PDF o foto) y se vinculan sus páginas con los componentes del dibujo. | 2 · Taller | medio | bajo |
| ELE-03 | **Plan de red de los PLC** | Tabla por tablero con MAC, IP, nombre y unidad de cada LOGO!, más los datos del Shelly. Genera la etiqueta para pegar junto al puerto de red. | 2 · Taller | medio | bajo |
| ELE-04 | **Lista de conexiones borne a borne** | Tabla desde–hasta con sección, color, puntera y marca en cada extremo; se carga tocando dos bornes en el editor o editando como planilla, y se replica por unidad. | 3 · Cableado | alto | alto |
| ELE-05 | **Ruteo por cablecanal con largos** | Calcula el recorrido más corto de cada cable por los canales y su largo (camino, bajadas a borne y holgura); la holgura se calibra con los largos reales medidos en el primer tablero. | 3 · Cableado | alto | alto |
| ELE-06 | **Diseñador de bornera inferior** | Arma la regleta por grupos repetidos por unidad, con color por función, separadores, tapas finales, topes y puentes; numera los bornes y calcula el largo sobre el riel. | 3 · Cableado | alto | medio |
| ELE-07 | **Tabla de entradas y salidas por PLC** | Grilla por cada LOGO! con I1–I8 y Q1–Q4: función, aparato de origen o destino y etiqueta. Se completa sola desde la plantilla de unidad y marca entradas libres o duplicadas. | 3 · Cableado | alto | medio |
| ELE-08 | **Buscador de marcador o borne** ★ | Se escribe o dicta un marcador (PE3-AG1) o se toca un borne en el dibujo y la app muestra de dónde sale, adónde llega, color y sección. | 3 · Cableado | alto | bajo |
| ELE-09 | **Tarjeta de E/S del LOGO! por unidad** ★ | Pantalla fija por PLC con el frente del LOGO! dibujado: cada entrada I1-I8 y salida Q1-Q4 con su marcador, color y origen. Se deja abierta al lado mientras se cablea. | 3 · Cableado | alto | bajo |
| ELE-10 | **Diagrama de conexiones autogenerado por unidad** | A partir de las conexiones cargadas dibuja un esquema simple de potencia y mando por unidad, sin exigir un CAD eléctrico; se regenera al cambiar cualquier conexión. | 3 · Cableado | medio | alto |
| ELE-11 | **Corriente total y calibre de cabecera** | Suma las corrientes por unidad con simultaneidad y sugiere calibre del interruptor general, del diferencial y del bloque de distribución. | 3 · Cableado | medio | medio |
| ELE-12 | **Esquema unifilar del tablero** | Unifilar simple generado desde las protecciones y las cargas cargadas, para la carpeta técnica. | 3 · Cableado | medio | medio |
| ELE-13 | **Puentes, peines y comunes** | Definición de puentes entre bornes y del reparto de neutro y de comunes con bornes dedicados, en lugar de empalmes sueltos en el canal. | 3 · Cableado | medio | medio |
| ELE-14 | **Balance de fases** | Reparte las cargas monofásicas (bombas) entre las tres fases y muestra la corriente resultante en cada una. | 3 · Cableado | medio | bajo |
| ELE-15 | **Ficha eléctrica y perfil de colores** | Por proyecto se cargan tensión, esquema de tierra, corriente de cortocircuito, ambiente y el perfil de colores elegido (AEA, IEC 60204-1 o propio del taller) que usarán las validaciones. | 3 · Cableado | medio | bajo |
| ELE-16 | **Lista de cables de campo** | Qué cable del instalador llega a cada borne de la bornera, con sección sugerida y destino. | 3 · Cableado | medio | bajo |
| ELE-17 | **Importar conexiones desde planilla u otro programa** | Lee una lista de conexiones en Excel o exportada de un programa de esquemas y la vincula con los bornes del catálogo. | 5 · Avanzado | medio | medio |

<a id="val"></a>

## Reglas y validaciones automáticas

Avisos de norma, de fabricante y de buena práctica mientras se diseña.

| Código | Función | Qué hace | Etapa | Impacto | Esfuerzo |
|---|---|---|---|---|---|
| VAL-01 | **Aviso de espacio entre borne y canal** | Mientras se arma el layout, marca en naranja los aparatos con menos de 30-40 mm entre sus bornes y el cablecanal, donde no entran el marcador ni la curva del cable. | 1 · MVP | medio | bajo |
| VAL-02 | **Panel de reglas con semáforo** | Lista en vivo de errores, avisos y sugerencias; cada uno indica su origen (norma, fabricante o buena práctica), lleva al elemento con un toque y puede silenciarse dejando justificación. | 2 · Taller | alto | medio |
| VAL-03 | **Etiquetas duplicadas o faltantes** ★ | Revisa que cada aparato y cada extremo de cable tenga una marca única y lista los que quedaron sin etiqueta. | 2 · Taller | alto | bajo |
| VAL-04 | **Lista de marcas y modelos homologados** ★ | El dueño define qué referencias están aprobadas para cada función. La app avisa si la lista de materiales o el kit incluye un modelo fuera de esa lista. | 2 · Taller | alto | bajo |
| VAL-05 | **Puentes provisorios pendientes** ★ | Los puentes y alimentaciones de prueba se registran al colocarlos y bloquean la liberación hasta marcarlos como retirados. | 2 · Taller | alto | bajo |
| VAL-06 | **Aviso de prefijo PE ambiguo** | Advierte que las marcas que empiezan con PE, N o L se confunden con tierra, neutro y fase; ofrece un prefijo alternativo o mantenerlo con aclaración obligatoria en la leyenda. | 2 · Taller | medio | bajo |
| VAL-07 | **Coherencia de series y modelos** | Avisa si en el mismo tablero hay aparatos de distinta serie o calibre cumpliendo la misma función. | 2 · Taller | medio | bajo |
| VAL-08 | **Dos cables por borne y reparto** | Detecta bornes con más conductores de los admitidos y propone peine, borne puente o puntera doble; cuenta además las salidas libres del bloque de distribución. | 3 · Cableado | alto | medio |
| VAL-09 | **Reglas con origen, versión y descargo** | Cada regla muestra norma, si es obligación o buena práctica y si fue verificada. El matriculado puede desactivarla con motivo; cada informe indica la versión de reglas usada. | 3 · Cableado | alto | medio |
| VAL-10 | **Colores, secciones y punteras por perfil** | Verifica que el color de cada cable coincida con su función, que la sección entre en el borne y supere el mínimo, y que la puntera corresponda a la sección. | 3 · Cableado | medio | medio |
| VAL-11 | **Coordinación motor, guardamotor y contactor** | Con la corriente nominal de cada motor valida el rango del guardamotor, la categoría AC-3 del contactor y la tensión de bobina, y deja registrado el ajuste de regulación. | 3 · Cableado | medio | medio |
| VAL-12 | **Llenado y segregación de cablecanal** | Suma las secciones exteriores reales de los cables por tramo, avisa al 40 % y marca error al 50 %; también alerta si potencia y señal comparten canal sin separador. | 3 · Cableado | medio | medio |
| VAL-13 | **Perfil de colores por proyecto** | Se elige el criterio de colores (instalación fija, máquinas o propio del taller) y la app valida la lista de cables contra él, imprimiéndolo en la documentación. | 3 · Cableado | medio | bajo |
| VAL-14 | **Bloqueo de entrega con legajo incompleto** ★ | No permite pasar un tablero a entregado si falta placa, planos, lista de materiales, protocolo firmado o hay no conformidades abiertas; muestra qué falta. | 4 · Gestión | alto | bajo |
| VAL-15 | **Balance térmico del gabinete** | Suma la potencia disipada de las fichas y la compara con la disipable del gabinete elegido; avisa también si hay electrónica montada encima de aparatos calientes. | 5 · Avanzado | bajo | medio |

<a id="mat"></a>

## Materiales, stock, compras y cortes

Lista de materiales, kits por tablero, listas de corte, perforado, stock y compras.

| Código | Función | Qué hace | Etapa | Impacto | Esfuerzo |
|---|---|---|---|---|---|
| MAT-01 | **Lista de materiales automática con accesorios** ★ | Se genera desde el layout con cantidades por referencia e incluye riel, cablecanal, topes, tapas, bornes y consumibles estimados; se exporta a planilla. | 1 · MVP | alto | bajo |
| MAT-02 | **Aviso de faltante desde el paso** | Desde cualquier paso se toca Me falta, se elige la pieza y la cantidad. La app la suma a compras, bloquea los pasos que dependen de ella y propone con qué seguir. | 2 · Taller | alto | medio |
| MAT-03 | **Plantilla de perforado 1:1** | Imprime el layout a escala real en mosaico A4 o A3 con marcas de solape y una regla de control de 100 mm, para marcar sobre la placa los agujeros de riel y canal. | 2 · Taller | alto | medio |
| MAT-04 | **Kit por ejemplar con tilde** ★ | Antes de empezar, lista de piezas por ejemplar ordenada por fila de riel, con foto y cantidad. Se tilda al separar en la caja y muestra el porcentaje de kit completo. | 2 · Taller | alto | bajo |
| MAT-05 | **Lista de materiales valorizada con consumibles** ★ | La lista sale del dibujo con precio unitario, total y fecha del precio, y agrega consumibles estimados por unidad: punteras, termocontraíble, precintos, cable por color y sección. | 2 · Taller | alto | bajo |
| MAT-06 | **Lista de corte de riel y cablecanal** | Genera los cortes de riel DIN y cablecanal de toda la serie, con cada pieza numerada (R1, C3) y el aprovechamiento por barra. Se tilda cada corte hecho. | 2 · Taller | medio | bajo |
| MAT-07 | **Preparar el banco: consumibles por etapa** | Antes de cada etapa lista herramientas y consumibles con cantidades: punteras por color, metros de cable por color y sección, termocontraíble, precintos y bases. Se tilda y avisa si no alcanza. | 3 · Cableado | alto | medio |
| MAT-08 | **Consumo real de cable por tablero** | Registro de los metros usados por color y sección para ajustar la estimación y el costo de los próximos. | 3 · Cableado | medio | bajo |
| MAT-09 | **Explosión de la serie contra stock** | Multiplica la lista de materiales por la cantidad de tableros, descuenta el stock y lo reservado y muestra los faltantes antes de empezar a armar. | 4 · Gestión | alto | medio |
| MAT-10 | **Importar lista de precios del proveedor** | Sube el Excel o CSV de un distribuidor, empareja códigos con el catálogo una sola vez y actualiza todos los precios de golpe, mostrando qué subió y cuánto. | 4 · Gestión | alto | medio |
| MAT-11 | **Pedido de compra agrupado por proveedor** ★ | Convierte los faltantes en pedidos separados por proveedor, con código, cantidad y último precio, listos para enviar por WhatsApp o mail y luego marcar como recibidos. | 4 · Gestión | alto | bajo |
| MAT-12 | **Comparador de cotizaciones de proveedores** | Cargás lo que cotizó cada proveedor para la misma lista y la app muestra el más barato por ítem y por canasta completa, con plazo y condición de pago. | 4 · Gestión | medio | medio |
| MAT-13 | **Control de recepción contra la lista** | Al recibir una compra se verifica referencia, tensión de bobina y calibre contra la lista de materiales, escaneando el código o con foto; lo que no coincide queda apartado. | 4 · Gestión | medio | medio |
| MAT-14 | **Stock simple con mínimos y reservas** | Entradas por compra y salidas por kit, con mínimo y punto de pedido por ítem. Lo asignado a un pedido queda reservado y no se puede usar en otro sin aviso. | 4 · Gestión | medio | medio |
| MAT-15 | **Verificar modelo escaneando el código** | Al separar o montar un aparato se escanea su código de barras con la cámara. La app avisa en rojo si el modelo no coincide con el de la lista. | 4 · Gestión | medio | medio |
| MAT-16 | **Ubicaciones de stock** | Cada ítem indica en qué cajón o estante está; se imprimen etiquetas con código para los cajones. | 4 · Gestión | bajo | bajo |

<a id="arm"></a>

## Ejecución en el taller

Montaje y cableado guiados, prefabricado de cables, etiquetas y avance.

| Código | Función | Qué hace | Etapa | Impacto | Esfuerzo |
|---|---|---|---|---|---|
| ARM-01 | **Modo banco: un paso por pantalla** | Muestra una sola tarea a la vez con tres botones gigantes (Hecho, Problema, Saltar) y dibujo ampliado de la zona. Se maneja con el pulgar, con guantes, celular apoyado a un metro. | 2 · Taller | alto | medio |
| ARM-02 | **Cronómetro por etapa con motivo de parada** ★ | Un toque para iniciar, pausar o cambiar de etapa en cada ejemplar; al pausar pide el motivo (faltante, duda, retrabajo, otra tarea). | 2 · Taller | alto | bajo |
| ARM-03 | **Etiquetas de aparato en lote** ★ | Genera todas las etiquetas frontales (SOPn, BOMn y las de protecciones, PLC, relés) del tablero y de la serie, en el orden de colocación. | 2 · Taller | alto | bajo |
| ARM-04 | **Reportar problema en dos toques** ★ | Botón rojo siempre visible: foto, tipo (no entra, dañado, plano mal, modelo distinto) y audio opcional. Queda atado al paso y al ejemplar, y avisa al encargado. | 2 · Taller | alto | bajo |
| ARM-05 | **Retomar exactamente donde quedé** ★ | Al abrir, la app muestra el ejemplar, la etapa y el último paso tildado, con la foto de cierre de ayer y la nota pendiente. Un toque en Continuar vuelve a ese paso. | 2 · Taller | alto | bajo |
| ARM-06 | **Autocontrol del operario por etapa** | Al cerrar cada etapa aparecen 3 a 5 preguntas rápidas (sobrantes cortados, punteras en todos los extremos, tapas colocadas, cables sueltos). Sin responderlas no se pasa a la siguiente. | 2 · Taller | medio | bajo |
| ARM-07 | **Carteles de cablecanal y leyenda de bornera** | Genera para imprimir los carteles de color que nombran cada aparato sobre las tapas del canal y el sticker-leyenda de la bornera, a escala real y coherentes con el diseño. | 2 · Taller | medio | bajo |
| ARM-08 | **Montaje mecánico guiado fila por fila** | Muestra cada fila de riel de izquierda a derecha con foto real, modelo y etiqueta de cada aparato, más topes y separadores. Se tilda por fila al terminar. | 2 · Taller | medio | bajo |
| ARM-09 | **Nota de traspaso por voz y foto** | Al cortar la jornada se graba un audio corto y una foto marcada con el dedo. Queda fijada arriba del próximo paso para quien retome. | 2 · Taller | medio | bajo |
| ARM-10 | **Cableado guiado: un cable por pantalla** | Cada pantalla muestra un cable: color en muestra grande, sección, largo, puntera y marcador de cada extremo, con origen y destino resaltados en el dibujo. Al tildar pasa al siguiente. | 3 · Cableado | alto | alto |
| ARM-11 | **Largos reales aprendidos del ejemplar 1** | Al cablear el primer ejemplar se corrige el largo calculado con botones de más o menos 5 cm o marcando Sobró. Esos largos reales alimentan la lista de corte de los siguientes. | 3 · Cableado | alto | medio |
| ARM-12 | **Lote de cables prefabricados por serie** | Lista de corte ordenada por color y sección para todos los ejemplares: cantidad, largo, pelado, puntera y marcador por extremo. Se cortan todos juntos en el banco y se tildan por lote. | 3 · Cableado | alto | medio |
| ARM-13 | **Repetir patrón en las demás unidades** | Cableada la unidad 1 (soplador, bomba, drenaje, PLC), la app ofrece repetir la misma secuencia en las unidades 2 a 5 cambiando solo el número en bornes y marcadores. | 3 · Cableado | alto | medio |
| ARM-14 | **Tira de numeración de bornera** ★ | Imprime la tira de marcadores de los bornes con la numeración y los grupos definidos en el diseño. | 3 · Cableado | alto | bajo |
| ARM-15 | **Secuencia de cableado por zonas** | Ordena los cables para trabajar de fondo a frente y de arriba abajo: primero puentes y potencia, después mando, por tramo de cablecanal. El armador puede reordenar y guardar su secuencia. | 3 · Cableado | medio | medio |
| ARM-16 | **Reparto de trabajo entre dos armadores** | Dos personas cablean el mismo tablero sin pisarse: la lista se reparte por unidad o por zona. | 4 · Gestión | bajo | medio |

<a id="ser"></a>

## Series, plantillas y revisiones

Plantilla por cantidad de unidades, ejemplares numerados, desvíos y cambios de diseño.

| Código | Función | Qué hace | Etapa | Impacto | Esfuerzo |
|---|---|---|---|---|---|
| SER-01 | **Clonar un tablero existente** ★ | Cualquier tablero se copia como punto de partida de uno nuevo, con sus medidas, componentes y etiquetas. | 1 · MVP | alto | bajo |
| SER-02 | **Plantilla paramétrica por cantidad de unidades** | Se elige cuántas unidades lleva el tablero y opciones (Shelly, temporizador, tipo de gabinete); la app genera parte fija más bloque repetido: layout, etiquetas, E/S, bornera y lista de materiales. | 2 · Taller | alto | alto |
| SER-03 | **Aviso de cambios al retomar** | Si el diseño cambió desde la última sesión, al abrir el ejemplar aparece un resumen con lo modificado y los pasos ya hechos que quedan afectados, para confirmar o rehacer. | 2 · Taller | alto | medio |
| SER-04 | **Cambios de diseño con aprobación del dueño** | Todo cambio al tablero tipo pide motivo y aprobación, queda como revisión numerada y la app indica qué ejemplares sin terminar lo reciben y cuáles quedan con la versión anterior. | 2 · Taller | alto | medio |
| SER-05 | **Comparador del ejemplar contra el patrón** | Compara cada ejemplar con el número 1 aprobado (materiales, posiciones, etiquetas, ajustes, versión de programa) y lista las diferencias para corregirlas o justificarlas. | 2 · Taller | alto | medio |
| SER-06 | **Modo tanda: mismo paso en toda la serie** | Permite hacer la misma etapa en todos los ejemplares seguidos: la app presenta el paso con un tilde por ejemplar y no mezcla el avance de cada uno. | 2 · Taller | alto | medio |
| SER-07 | **Serie numerada con registro de desvíos** | Clona el tablero patrón en ejemplares con número de serie; cada cambio en un ejemplar (sustituto, posición, etiqueta) queda como desvío y se lista contra el patrón. | 2 · Taller | alto | medio |
| SER-08 | **Foto del ejemplar patrón en cada paso** ★ | Cada paso muestra al lado la foto del mismo paso tomada en el ejemplar n.º 1 ya aprobado, ampliable. El armador compara antes de tildar. | 2 · Taller | alto | bajo |
| SER-09 | **Opcionales comerciales por tablero** | Interruptores de opción (con o sin Shelly, temporizador, control de fases, gabinete metálico, plástico o solo placa) que agregan o quitan componentes, etiquetas y costo. | 2 · Taller | medio | medio |
| SER-10 | **Revisiones con comparación visual** | Cada diseño tiene revisiones; la comparación resalta qué se movió, agregó o cambió en layout, materiales, etiquetas y cables, y una revisión puede congelarse como liberada. | 2 · Taller | medio | medio |
| SER-11 | **Número de serie y orden de fabricación** | Cada ejemplar recibe un número de serie único y una orden con cliente, configuración, revisión y fecha prometida; se imprime como etiqueta para pegar en la placa. | 2 · Taller | medio | bajo |
| SER-12 | **QR por ejemplar pegado en la placa** | Cada ejemplar de la serie tiene un QR que se imprime y se pega en la placa. Al escanearlo, la app abre ese ejemplar en el paso donde quedó. | 2 · Taller | medio | bajo |
| SER-13 | **Simulador de ampliación de unidades** | Prueba agregar una unidad más al diseño actual e informa si alcanzan riel, cablecanal, bornera, salidas del bloque de distribución y corriente del interruptor general. | 3 · Cableado | medio | medio |
| SER-14 | **Cierre de serie con aprendizajes** | Al terminar una serie, resumen de tiempos, errores repetidos y cambios propuestos a la plantilla. | 4 · Gestión | medio | bajo |
| SER-15 | **Plantillas para otros productos** | El mismo mecanismo de unidad repetida aplicado a otros tableros del taller (por ejemplo el de gabinete plástico con temporizadores). | 5 · Avanzado | medio | medio |

<a id="cal"></a>

## Calidad, ensayos y trazabilidad

Checklists, protocolo de ensayo, ajustes, números de serie y no conformidades.

| Código | Función | Qué hace | Etapa | Impacto | Esfuerzo |
|---|---|---|---|---|---|
| CAL-01 | **Avisos aprendidos del ejemplar anterior** | Cada error detectado en revisión o ensayo se convierte en una advertencia amarilla que aparece en ese mismo paso al armar los ejemplares siguientes. | 2 · Taller | alto | medio |
| CAL-02 | **Ensayo funcional guiado por unidad** | Protocolo paso a paso que se repite por cada unidad: diferencial, disparo de guardamotor, falta de fase, electrodos de nivel, entradas y salidas del LOGO!. Registra pasa o falla, valor y foto. | 2 · Taller | alto | medio |
| CAL-03 | **Liberación con firma del matriculado** | Pantalla de cierre que resume checklist, ensayos y no conformidades. El profesional firma con nombre y matrícula; la firma congela la revisión y sella el PDF del protocolo. | 2 · Taller | alto | medio |
| CAL-04 | **No conformidades con foto y disposición** | Desde cualquier ítem No OK se abre una no conformidad con foto, tipo de defecto y responsable. Se cierra corrigiendo o aceptando un desvío firmado; mientras esté abierta, bloquea la liberación. | 2 · Taller | alto | medio |
| CAL-05 | **Protocolo de ensayo con valores y criterios** | Formulario de ensayo final: continuidad de PE por masa, aislación a 500 Vcc, disparo del diferencial y pruebas funcionales. Cada valor cargado se compara con su criterio y queda aprobado o rechazado. | 2 · Taller | alto | medio |
| CAL-06 | **Trazabilidad de componentes por serie y lote** | En cada ejemplar se registra marca, referencia y número de serie o lote de los aparatos principales escaneando el código o fotografiando la placa. Se consulta desde el número de serie del tablero. | 2 · Taller | alto | medio |
| CAL-07 | **Bloqueo de megado con electrónica conectada** ★ | Antes del ensayo de aislación muestra la lista de equipos a desconectar (LOGO!, Shelly, protectores, controles de nivel, temporizador) y exige tildar la reconexión de cada uno al terminar. | 2 · Taller | alto | bajo |
| CAL-08 | **Checklist de rutina en diez bloques** ★ | Genera por cada tablero el control de rutina (plano, IP, PE, montaje, cableado, bornes, identificación, ajustes). Cada ítem se marca OK / No OK / N.A. desde el iPhone, con foto, responsable y fecha. | 2 · Taller | alto | bajo |
| CAL-09 | **Checklist de terminación antes del ensayo** ★ | Lista corta con foto por ítem: reapriete con torque, tapas de canal, sobrantes cortados, precintos, etiquetas completas, vínculo de tierra de la placa. No deja pasar al ensayo con ítems abiertos. | 2 · Taller | alto | bajo |
| CAL-10 | **Control de par de apriete por aparato** ★ | Lista cada aparato con el par de su ficha (por ejemplo GV2ME: 1,7 N·m) para tildar al reapretar con torquímetro y marcar con pintura. Admite control total o por muestreo. | 2 · Taller | alto | bajo |
| CAL-11 | **Superposición del diseño sobre foto real** | Sobre la foto rectificada del tablero terminado se superpone el layout para ver de un vistazo aparatos corridos, faltantes o cambiados, y la foto queda como registro del ejemplar. | 2 · Taller | medio | medio |
| CAL-12 | **Criterios de aceptación con foto bien/mal** | Cada ítem del checklist muestra una foto de ejemplo aceptable y otra rechazable (crimpado de puntera, radio de curva, sobrante, marcador legible), cargadas por el taller con sus propios tableros. | 2 · Taller | medio | bajo |
| CAL-13 | **Ficha de ajustes y programa por ejemplar** | Por cada tablero guarda MAC e IP de cada LOGO! (escaneando su etiqueta), versión del programa cargado, regulación de cada guardamotor y umbrales de los protectores. | 2 · Taller | medio | bajo |
| CAL-14 | **Fotos obligatorias en puntos de retención** | Define etapas que no se pueden cerrar sin foto (placa perforada, montaje, potencia, mando, terminado antes de tapar canales). Las fotos quedan atadas al número de serie y a la etapa. | 2 · Taller | medio | bajo |
| CAL-15 | **Registro de instrumentos y su calibración** | Alta de tester, megóhmetro y torquímetro con modelo, número de serie y vencimiento de calibración. El protocolo cita el instrumento usado y avisa si está vencido. | 2 · Taller | medio | bajo |
| CAL-16 | **Versiones del programa del LOGO!** | Guarda el archivo de programa de cada tablero con versión, fecha, autor y nota de cambios, y registra qué versión quedó cargada en cada PLC. | 2 · Taller | medio | bajo |
| CAL-17 | **Ensayo funcional generado desde las E/S** | Con la tabla de E/S arma el protocolo por unidad: disparar el guardamotor y ver caer la entrada, simular electrodos, forzar cada salida; cada paso con resultado y foto. | 3 · Cableado | alto | medio |
| CAL-18 | **Verificación punto a punto guiada** | Recorre la lista de conexiones cable por cable: resalta origen y destino en el dibujo, el inspector prueba continuidad con el tester y tilda. El avance queda guardado y se retoma. | 3 · Cableado | alto | medio |
| CAL-19 | **Puesta en marcha en obra guiada** ★ | Checklist para el sitio: tensión y secuencia de fases, tierra, sentido de giro, corriente medida de cada motor contra su regulación y prueba de nivel con agua real. Se guarda con fotos y firma. | 4 · Gestión | alto | bajo |
| CAL-20 | **Búsqueda de tableros afectados** | Dado un componente, lote, versión de programa o revisión de diseño, lista todos los tableros entregados que lo llevan, con cliente y contacto, para avisar o programar la corrección. | 4 · Gestión | medio | bajo |
| CAL-21 | **Ensayo de red y comunicaciones** | Verifica y registra dirección de cada PLC, respuesta en la red y señal WiFi del Shelly con el gabinete cerrado. | 4 · Gestión | medio | bajo |

<a id="doc"></a>

## Documentación, entrega y postventa

Planos, carpeta técnica, rótulos, QR, entrega, mantenimiento y reclamos.

| Código | Función | Qué hace | Etapa | Impacto | Esfuerzo |
|---|---|---|---|---|---|
| DOC-01 | **PDF de layout acotado a escala** | Con un toque exporta un PDF vectorial con el frente acotado, una vista 3D, la lista de materiales y los datos del proyecto, con carátula del taller. | 1 · MVP | alto | medio |
| DOC-02 | **Imagen 3D con marca para el presupuesto** | Exporta la vista 3D del tablero como imagen limpia con logo MEC, medidas generales y nombre del cliente, lista para adjuntar al presupuesto o enviar por WhatsApp. | 1 · MVP | medio | bajo |
| DOC-03 | **Placa de características autonumerada** ★ | Genera la placa con fabricante, tipo, número de serie, fecha, tensión, corriente, Icc, IP y norma, lista para imprimir en la rotuladora o en PDF. | 2 · Taller | alto | bajo |
| DOC-04 | **Instructivos cortos adjuntos al paso** | A cada tipo de paso se le puede adjuntar una foto o video de 20 segundos hecho en el taller (cómo se cablea el control de nivel, cómo va el zócalo del relé). | 2 · Taller | medio | bajo |
| DOC-05 | **Leyenda de bornera y plano de puerta** | Genera desde el proyecto el sticker-leyenda de la bornera y una hoja resumen (unifilar, tabla de E/S, significado de los códigos) para pegar en la contratapa. | 2 · Taller | medio | bajo |
| DOC-06 | **Etiquetas de advertencia y datos del fabricante** | Genera las etiquetas de riesgo eléctrico, tensión y datos de contacto del taller. | 2 · Taller | bajo | bajo |
| DOC-07 | **Correcciones de taller sobre el plano** | El operario marca sobre el dibujo lo que armó distinto, con foto y nota. Tras la aprobación del responsable, esas marcas pasan a la revisión conforme a obra. | 3 · Cableado | alto | medio |
| DOC-08 | **Plano de conexionado para el instalador** ★ | Hoja de la bornera con qué cable de campo va a cada borne y la leyenda por unidad. | 3 · Cableado | alto | bajo |
| DOC-09 | **Carpeta conforme a obra automática** | Arma un PDF por número de serie: carátula, layout, esquemas, lista de bornes, materiales con series, ajustes, protocolo firmado, fotos y manuales. Incluye exportación completa del legajo. | 4 · Gestión | alto | medio |
| DOC-10 | **Enlace 3D para aprobación del cliente** | Link web donde el cliente gira el tablero en 3D, ve qué incluye y aprueba con nombre y fecha. La aprobación queda atada a la revisión antes de fabricar. | 4 · Gestión | alto | medio |
| DOC-11 | **QR en el tablero con ficha viva** | Etiqueta QR con dirección única por número de serie. Quien la escanea ve datos básicos y contacto; el técnico autenticado ve planos, protocolo, ajustes e historial. | 4 · Gestión | alto | medio |
| DOC-12 | **Guía de fallas generada del proyecto** | Para cada síntoma (soplador 3 no arranca, bomba 2 corta) arma los pasos de revisión con los aparatos, entradas y cables reales de ese tablero y su ubicación en el dibujo. | 4 · Gestión | medio | medio |
| DOC-13 | **Manual de uso del tablero** | Documento con funcionamiento, significado de pilotos y alarmas y ajustes, armado desde la configuración del tablero. | 4 · Gestión | medio | medio |
| DOC-14 | **Pedido de repuestos desde el QR** | Desde la ficha del QR el cliente elige el aparato en la foto o el dibujo y pide el repuesto exacto; al taller le llega con referencia, serie y precio sugerido. | 4 · Gestión | medio | medio |
| DOC-15 | **Reclamos y garantía por número de serie** | El cliente abre un reclamo escaneando el QR, con foto y descripción. El taller lo sigue con estado, causa raíz, costo y vencimiento de garantía, vinculado a no conformidades. | 4 · Gestión | medio | medio |
| DOC-16 | **Despacho y acta de entrega firmada** | Checklist de despacho (accesorios, electrodos, llaves, manual, fotos del embalaje) y acta que el cliente firma en el teléfono; la fecha inicia la garantía. | 4 · Gestión | medio | bajo |
| DOC-17 | **Historial de mantenimiento por tablero** | Cada intervención se carga desde el QR: fecha, técnico, tarea, repuestos cambiados, ajustes modificados y fotos del antes y después. | 4 · Gestión | medio | bajo |
| DOC-18 | **Hoja de producto MEC por modelo** | Genera fichas comerciales de los tableros tipo (2, 4 y 5 unidades) con render, medidas, qué incluye y opcionales, para usar como catálogo de venta. | 4 · Gestión | medio | bajo |
| DOC-19 | **Repuesto exacto y sustituto vigente** | Desde la ficha del tablero se ve cada repuesto con referencia exacta, bobina y calibre, y el reemplazo vigente si fue discontinuado (LOGO! 0BA1 a 0BA2). | 4 · Gestión | medio | bajo |
| DOC-20 | **Plan preventivo con recordatorios** | Programa tareas periódicas por tablero (prueba del diferencial, reapriete, limpieza de electrodos de nivel) y envía recordatorios al cliente o al taller. | 4 · Gestión | bajo | bajo |

<a id="ges"></a>

## Gestión del taller

Presupuestos, costos, tiempos, clientes, planificación, indicadores y roles.

| Código | Función | Qué hace | Etapa | Impacto | Esfuerzo |
|---|---|---|---|---|---|
| GES-01 | **Tablero de estado por ejemplar** | Cada tablero numerado se ve como tarjeta que avanza por columnas: kit, mecánico, cableado, ensayo, listo, entregado. Se actualiza solo con el checklist y el cronómetro. | 2 · Taller | medio | bajo |
| GES-02 | **Alerta de margen erosionado por aumentos** | Para pedidos aceptados con materiales todavía sin comprar, compara el costo presupuestado con el de reposición actual y avisa cuánto margen se perdió y qué ítems lo explican. | 4 · Gestión | alto | medio |
| GES-03 | **Costo real contra presupuesto por ejemplar** | Suma materiales consumidos, horas cronometradas y retrabajo de cada tablero numerado y lo compara con lo presupuestado, por etapa y por rubro. | 4 · Gestión | alto | medio |
| GES-04 | **Indicadores del taller en una pantalla** | Muestra horas por tablero y etapa, desvío de costo, paradas por faltantes, tableros que pasan el ensayo a la primera y cumplimiento de fecha, por serie y por mes. | 4 · Gestión | alto | medio |
| GES-05 | **Liberación a taller y pedidos de cambio** | El proyectista libera una revisión y queda bloqueada; el taller la ve en el celular y propone cambios marcando sobre el plano con foto, que el proyectista acepta o rechaza. | 4 · Gestión | alto | medio |
| GES-06 | **Planificador de serie con fecha prometida** | Cargás cantidad de tableros, operarios y horas disponibles; calcula fecha de entrega realista, fecha límite para pedir cada material según plazo del proveedor y avisa si se atrasa. | 4 · Gestión | alto | medio |
| GES-07 | **Precios en pesos y dólares con historial** | Cada precio se guarda con moneda, fecha, proveedor y tipo de cambio. El dueño elige qué cotización aplicar al presupuestar y ve la variación de cada componente en el tiempo. | 4 · Gestión | alto | medio |
| GES-08 | **Presupuesto automático desde la configuración** | Elegís cantidad de unidades y opcionales; la app arma el presupuesto con materiales valorizados, horas estándar por etapa, costo hora del taller y margen, y lo exporta en PDF con marca MEC. | 4 · Gestión | alto | medio |
| GES-09 | **Tiempos estándar aprendidos de la serie** | Con los cronometrajes calcula horas típicas por etapa y por unidad agregada, muestra la mejora del ejemplar 1 al 3 y alimenta el próximo presupuesto. | 4 · Gestión | alto | medio |
| GES-10 | **Anticipo e hitos de cobro que disparan compras** ★ | Registra seña, saldo e hitos de pago por pedido. Al cargar el anticipo propone la compra inmediata de los ítems de mayor peso en el costo para congelar precios. | 4 · Gestión | alto | bajo |
| GES-11 | **Vigencia y recálculo del presupuesto** ★ | Cada presupuesto lleva fecha de validez y condiciones comerciales. Al vencer, un toque lo recalcula con precios y cotización del día y muestra la diferencia antes de reenviarlo. | 4 · Gestión | alto | bajo |
| GES-12 | **Roles con separación de firma** | Define operario, inspector y responsable técnico. Los ítems críticos de seguridad no los puede aprobar quien los armó, y solo el matriculado libera. | 4 · Gestión | medio | medio |
| GES-13 | **Usuarios y roles con costos ocultos** | Perfiles de dueño, armador y vendedor. El armador ve instrucciones y checklist pero no precios ni márgenes; queda registrado quién cambió cada plano, precio o estado. | 4 · Gestión | medio | medio |
| GES-14 | **Control de ítems olvidados al presupuestar** | Antes de enviar, revisa que el presupuesto incluya consumibles, etiquetas, gabinete, embalaje, flete, horas de ensayo y programación del PLC, y marca los que falten. | 4 · Gestión | medio | bajo |
| GES-15 | **Embudo de presupuestos con motivo de pérdida** | Lista de presupuestos por estado (borrador, enviado, aceptado, perdido) con recordatorio de seguimiento y motivo de pérdida obligatorio al cerrar. | 4 · Gestión | medio | bajo |
| GES-16 | **Ficha de cliente con historial y repetición** | Datos del cliente, presupuestos, tableros entregados con su número de serie y reclamos. Un botón 'repetir pedido' clona el último tablero con precios actualizados. | 4 · Gestión | medio | bajo |
| GES-17 | **Indicadores de calidad por serie** | Panel con defectos por tipo y etapa, tableros que pasan el ensayo a la primera, horas de retrabajo y reclamos por serie. | 4 · Gestión | medio | bajo |
| GES-18 | **Pantalla Hoy y resumen semanal** | Al abrir la app el dueño ve entregas próximas, faltantes, presupuestos por vencer y aprobaciones pendientes; una vez por semana recibe el mismo resumen por mail o para compartir. | 4 · Gestión | medio | bajo |
| GES-19 | **Presupuesto con tres alternativas** | Genera en el mismo PDF las variantes básica, estándar y completa (por ejemplo sin o con Shelly, gabinete plástico o metálico) con la diferencia de precio de cada una. | 4 · Gestión | medio | bajo |
| GES-20 | **Costo de uso de la app** | Panel con el consumo mensual de almacenamiento y de inteligencia artificial. | 4 · Gestión | bajo | bajo |
| GES-21 | **Garantías de proveedores** | Fecha de compra y vencimiento de garantía de los componentes principales, para reclamar al proveedor. | 4 · Gestión | bajo | bajo |
| GES-22 | **Horas por operario** | Resumen de horas trabajadas por persona y por tablero a partir del cronómetro. | 4 · Gestión | bajo | bajo |
| GES-23 | **Órdenes de servicio en obra** | Visitas técnicas con tareas, repuestos, horas y firma del cliente, ligadas al número de serie. | 5 · Avanzado | bajo | medio |

<a id="ia"></a>

## Inteligencia artificial y automatización

Reconocimiento por foto, asistentes, generación automática y voz.

| Código | Función | Qué hace | Etapa | Impacto | Esfuerzo |
|---|---|---|---|---|---|
| IA-01 | **Reconocer el componente por la foto del frente** | La foto se analiza y la ficha llega precargada con marca, modelo, valores nominales y categoría; los campos dudosos quedan resaltados y nada se guarda sin confirmar. | 2 · Taller | alto | medio |
| IA-02 | **Lectura automática de placas y etiquetas** | Fotografiando la etiqueta de un aparato la app extrae referencia, número de serie y MAC y propone cargarlos en la trazabilidad; el usuario confirma. | 2 · Taller | medio | medio |
| IA-03 | **Recorte de fondo y enderezado de la foto** | La foto del frente queda limpia, derecha y a la proporción medida, lista para usarse como textura del 3D. | 2 · Taller | medio | bajo |
| IA-04 | **Lectura en voz alta del paso** | La app lee cada paso con frases cortas: 'gris uno coma cinco, de PQ1 a A1 de SOP1, setenta centímetros'. Sirve con auricular para trabajar sin mirar la pantalla. | 3 · Cableado | medio | bajo |
| IA-05 | **Parte diario automático** | Resumen del día por ejemplar armado con los tildes, fotos, problemas y notas. | 4 · Gestión | medio | bajo |
| IA-06 | **Transcripción de notas de voz** | Los audios de traspaso y de problemas se pasan a texto y se pueden buscar. | 4 · Gestión | medio | bajo |
| IA-07 | **Inspección visual asistida por foto** | Compara la foto del tablero terminado con el layout y el patrón, y señala posibles faltas: aparato sin cartel, modelo distinto, canal sin tapa, cable colgando. Solo sugiere; decide el inspector. | 5 · Avanzado | alto | alto |
| IA-08 | **Comandos de voz manos libres** | Palabras fijas (listo, siguiente, repetir, problema, falta) reconocidas con auricular con micrófono. Vocabulario corto para que funcione con ruido de taller; siempre queda el botón como alternativa. | 5 · Avanzado | medio | alto |
| IA-09 | **Propuesta automática de layout** | Dada la placa y la cantidad de unidades, propone la distribución por filas respetando orden funcional, holguras y reserva; el proyectista elige entre alternativas y ajusta. | 5 · Avanzado | medio | alto |
| IA-10 | **Tablero existente a modelo por foto** | A partir de la ortofoto de un tablero armado, la IA reconoce aparatos del catálogo y propone el layout inicial, que el proyectista corrige y confirma. | 5 · Avanzado | medio | alto |
| IA-11 | **Asistente del proyecto** | Preguntas en lenguaje natural sobre el tablero: a qué entrada va el nivel de la unidad 3, cuántos metros de celeste hacen falta. | 5 · Avanzado | medio | medio |
| IA-12 | **Buscar hoja de datos y medidas** | A partir del modelo leído busca el documento del fabricante, propone medidas citando la página y avisa si difieren de lo medido con calibre. | 5 · Avanzado | medio | medio |
| IA-13 | **Carga de facturas y remitos por foto** | Sacás foto de la factura o remito del proveedor; la app lee ítems, cantidades y precios, los empareja con el catálogo y propone actualizar stock y costos para confirmar. | 5 · Avanzado | medio | medio |
| IA-14 | **Estimación de horas desde el diseño** | Con la cantidad de aparatos y cables y los tiempos históricos del taller, predice las horas de armado. | 5 · Avanzado | medio | medio |
| IA-15 | **Importar ficha desde URL o PDF** | Se pega el enlace o el PDF de la hoja de datos y la app propone medidas, par, secciones y datos eléctricos para que una persona los revise y confirme antes de guardar. | 5 · Avanzado | medio | medio |
| IA-16 | **Orden de armado sugerido** | Propone la secuencia de montaje y cableado y la ajusta con lo que el armador reordena. | 5 · Avanzado | medio | medio |
| IA-17 | **Presupuesto por voz o texto libre** | El dueño dicta 'tablero de 4 unidades, gabinete metálico, con Shelly, para tal cliente' y la app arma el borrador de configuración y presupuesto para revisar. | 5 · Avanzado | medio | medio |
| IA-18 | **Leer un esquema y proponer conexiones** | A partir de un esquema en PDF o foto propone la lista de conexiones para revisar. | Futuro | medio | alto |
| IA-19 | **Leer marcadores de cable por foto** | Fotos de cerca de los termocontraíbles para verificar que cada marcador esté donde corresponde. | Futuro | bajo | alto |

<a id="hw"></a>

## Integraciones de hardware y de otros programas

Rotuladoras, calibres, realidad aumentada, PLC, importar y exportar.

| Código | Función | Qué hace | Etapa | Impacto | Esfuerzo |
|---|---|---|---|---|---|
| HW-01 | **Calibre digital en modo teclado** ★ | Un calibre Bluetooth que funciona como teclado escribe cada medida en su campo al apretar un botón, sin programación especial. | 1 · MVP | alto | bajo |
| HW-02 | **Exportar marcadores a la rotuladora** ★ | Genera el archivo CSV con columnas configurables para la app o el programa de la rotuladora del taller, respetando el orden de colocación y el largo de cada termocontraíble. | 2 · Taller | alto | bajo |
| HW-03 | **Hojas de etiquetas y QR para impresora común** | PDF en hojas A4 de autoadhesivos con códigos QR, números de serie y carteles, para imprimir sin rotuladora. | 2 · Taller | medio | bajo |
| HW-04 | **Pedal o botón Bluetooth para avanzar** ★ | Un pedal o control remoto Bluetooth de los que funcionan como teclado avanza, retrocede o repite el paso. No requiere app nativa: el iPhone lo toma como teclado. | 3 · Cableado | alto | bajo |
| HW-05 | **Exportar a planilla para el contador** | Exporta presupuestos, compras, stock valorizado y costos por pedido a Excel o CSV con columnas fijas, por período. | 4 · Gestión | medio | bajo |
| HW-06 | **Impresión directa en la rotuladora** | Con la app nativa y el kit del fabricante de la rotuladora se imprimen lotes de marcadores y etiquetas sin pasar por otra app. | 5 · Avanzado | alto | alto |
| HW-07 | **Conexión con facturación y gestión** | Envía el pedido aceptado al sistema de facturación o gestión que ya use el taller para emitir la factura, y trae el estado de cobro. | 5 · Avanzado | medio | alto |
| HW-08 | **Lectura en línea del LOGO! en ensayo** | Conectada por red al PLC, la app lee entradas y salidas durante la prueba funcional y registra sola cada paso. Requiere confirmar que la versión del equipo lo permite. | 5 · Avanzado | medio | alto |
| HW-09 | **Reimprimir un marcador desde el paso** | Con la rotuladora conectada por Bluetooth en la app nativa, un botón en la pantalla del cable imprime solo ese marcador, para reponer uno dañado o mal contraído. | 5 · Avanzado | medio | alto |
| HW-10 | **Ver el tablero en realidad aumentada** | El modelo 3D se exporta y se ve a escala real sobre la mesa o la pared desde el iPhone. | 5 · Avanzado | medio | medio |
| HW-11 | **Exportar DXF e importar STEP** | Exporta layout y perforado en DXF para CAD o corte externo, e importa modelos STEP de fabricante convertidos a malla liviana como alternativa a la caja con foto. | 5 · Avanzado | bajo | alto |
| HW-12 | **Datos del Shelly en el ensayo** | Lectura del estado y la configuración del Shelly por la red local para dejarlos registrados. | 5 · Avanzado | bajo | medio |
| HW-13 | **Etiqueta NFC en el tablero** | Además del QR, una etiqueta NFC abre la ficha del tablero al acercar el teléfono. | 5 · Avanzado | bajo | bajo |
| HW-14 | **Pedido de cables prefabricados a terceros** | Exporta la lista de cables en planilla para encargar juegos cortados y rotulados. | 5 · Avanzado | bajo | bajo |
| HW-15 | **Carga del programa del PLC por red** | Cargar programa y parámetros a cada LOGO! desde la app; a validar técnicamente. | Futuro | medio | alto |
| HW-16 | **Realidad aumentada anclada a la placa** | El layout superpuesto sobre la placa real para marcar perforaciones y posiciones; requiere app nativa. | Futuro | medio | alto |
| HW-17 | **Cinta o medidor láser Bluetooth** | Medidas de gabinete enviadas directo a la app. | Futuro | bajo | alto |
| HW-18 | **Guía luminosa de cajones o bornes** | Luces que marcan el cajón de la pieza o el borne del paso actual. | Futuro | bajo | alto |
| HW-19 | **Destornillador con torque conectado** | Adjunta al protocolo el registro de aprietes exportado por la herramienta. | Futuro | bajo | medio |

<a id="pla"></a>

## Plataforma y experiencia de uso

Celular, trabajo sin conexión, sincronización, respaldo y facilidad de uso.

| Código | Función | Qué hace | Etapa | Impacto | Esfuerzo |
|---|---|---|---|---|---|
| PLA-01 | **App web instalable con modo sin conexión** | Funciona en iPhone y PC como app instalable; guarda todo localmente, sincroniza al recuperar señal y comprime las fotos antes de subirlas. | 1 · MVP | alto | medio |
| PLA-02 | **Fluidez en equipos modestos** | Objetivo de diseño: 300 piezas sin trabas en un iPhone de varios años. | 1 · MVP | alto | medio |
| PLA-03 | **Backup automático y exportación completa** ★ | Copia diaria en la nube y un botón que descarga todo (proyectos, catálogo, fotos, precios) en formato abierto, para no depender de un solo teléfono ni de la app. | 1 · MVP | alto | bajo |
| PLA-04 | **Fotos con anotaciones** ★ | Flechas, círculos y texto dibujados con el dedo sobre cualquier foto. | 1 · MVP | alto | bajo |
| PLA-05 | **Tablero de referencia precargado** ★ | La app arranca con el tablero MEC de 5 unidades como ejemplo editable, para aprender tocando. | 1 · MVP | alto | bajo |
| PLA-06 | **Compartir por WhatsApp en un toque** | Cualquier PDF, imagen o lista (presupuesto, pedido de compra, render, estado del tablero) se envía desde la hoja de compartir del iPhone con un mensaje ya redactado. | 1 · MVP | medio | bajo |
| PLA-07 | **Exportación abierta de listas y proyecto** | Toda lista (materiales, cables, bornes, etiquetas) sale en CSV o XLSX y el proyecto completo en un JSON documentado, para respaldo y para usar en otras herramientas. | 1 · MVP | medio | bajo |
| PLA-08 | **Gestos estándar y botones grandes** | Pellizco para acercar, dos dedos para girar, toque largo para opciones; todo tiene además un botón. | 1 · MVP | medio | bajo |
| PLA-09 | **Vocabulario del taller** | Textos en español rioplatense con los términos que usa el taller (térmica, guardamotor, bornera, cablecanal), configurables. | 1 · MVP | medio | bajo |
| PLA-10 | **Buscador global** ★ | Desde cualquier pantalla encuentra componente, etiqueta, cable, borne, tablero, cliente o número de serie. | 2 · Taller | alto | bajo |
| PLA-11 | **Pantalla siempre encendida y alto contraste** ★ | En modo banco la pantalla no se apaga ni se bloquea, usa letra muy grande y colores de alto contraste, y funciona apaisada con el celular en un soporte. | 2 · Taller | alto | bajo |
| PLA-12 | **Deshacer el último tilde** | Un botón Deshacer visible durante unos segundos después de cada tilde y un historial para reabrir pasos. Ningún toque accidental queda firme sin poder corregirlo. | 2 · Taller | medio | bajo |
| PLA-13 | **Notas de voz en cualquier elemento** | Un audio corto adjunto a un componente, un paso, un tablero o una foto. | 2 · Taller | medio | bajo |
| PLA-14 | **Papelera** | Lo borrado se puede recuperar durante un tiempo. | 2 · Taller | medio | bajo |
| PLA-15 | **Ayuda en contexto** | Videos cortos y ejemplos dentro de cada pantalla. | 2 · Taller | bajo | bajo |
| PLA-16 | **Sincronización entre celular y computadora** | El mismo proyecto abierto en varios dispositivos, con los cambios de cada uno al instante. | 4 · Gestión | alto | medio |
| PLA-17 | **Bitácora inalterable de cambios y evidencias** | Registra quién cargó o modificó cada valor, foto y firma. Un protocolo firmado no se edita: se emite una nueva revisión que conserva la anterior. | 4 · Gestión | medio | medio |
| PLA-18 | **Seguridad y privacidad** | Permisos por rol, conexión cifrada, fotos de clientes privadas y la clave de la inteligencia artificial solo en el servidor. | 4 · Gestión | medio | medio |
| PLA-19 | **Avisos** | Notificación cuando se reporta un faltante, se cierra una etapa o hay una aprobación pendiente. | 4 · Gestión | medio | bajo |
| PLA-20 | **Pantalla del taller** | El estado de la serie en un monitor o televisor del taller. | 4 · Gestión | medio | bajo |
| PLA-21 | **Inicio de sesión simple** | Acceso con correo o enlace, con recuperación de cuenta. | 4 · Gestión | bajo | bajo |

<a id="fut"></a>

## Ideas de largo plazo

Lo que hoy no conviene construir pero conviene tener anotado.

| Código | Función | Qué hace | Etapa | Impacto | Esfuerzo |
|---|---|---|---|---|---|
| FUT-01 | **Biblioteca compartida de componentes** | Fichas de marcas locales compartidas entre talleres. | Futuro | medio | alto |
| FUT-02 | **Configurador web para clientes** | Página pública donde el cliente elige cantidad de enfriadores y opcionales, ve el tablero en 3D y un precio orientativo, y envía el pedido de presupuesto. | Futuro | medio | alto |
| FUT-03 | **Diseño completo desde el pliego** | Con cantidad y potencia de motores propone protecciones, layout y presupuesto. | Futuro | medio | alto |
| FUT-04 | **Gemelo digital en operación** | El modelo 3D muestra en vivo qué soplador o bomba está en marcha en la instalación del cliente. | Futuro | medio | alto |
| FUT-05 | **Generar el programa del PLC desde la plantilla** | Bloques estándar por unidad con nombres de entradas y salidas coherentes con el diseño. | Futuro | medio | alto |
| FUT-06 | **Mantenimiento predictivo** | Con horas de marcha y arranques sugiere cambio de contactores o limpieza de electrodos. | Futuro | medio | alto |
| FUT-07 | **Monitoreo remoto como servicio de abono** | Usando el LOGO! por Ethernet y el Shelly, el tablero entregado reportaría estado y alarmas a su ficha; MEC lo ofrecería como abono de servicio. Requiere validación técnica. | Futuro | medio | alto |
| FUT-08 | **Ofrecer la app a otros talleres** | Varias empresas en la misma plataforma, cada una con sus datos. | Futuro | medio | alto |
| FUT-09 | **Capacitación de aprendices** | Modo entrenamiento sobre el tablero patrón con preguntas y evaluación. | Futuro | medio | medio |
| FUT-10 | **Conexión con proveedores** | Precios y existencias en línea y pedido directo. | Futuro | bajo | alto |
| FUT-11 | **Instrucciones con visor de realidad mixta** | Los pasos de cableado superpuestos sobre el tablero real. | Futuro | bajo | alto |
| FUT-12 | **Legajo normativo asistido** | Arma el legajo técnico con las verificaciones de diseño de la norma de tableros. | Futuro | bajo | alto |
| FUT-13 | **Prefabricado automático de cables** | Exportación a una máquina de corte, pelado y crimpado. | Futuro | bajo | alto |
| FUT-14 | **Pronóstico de demanda por temporada** | Con el historial de pedidos propone cuántos tableros de cada modelo esperar por mes y qué componentes de plazo largo conviene acopiar antes. | Futuro | bajo | medio |

