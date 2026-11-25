# Plan de acción · App para agilizar el armado de tableros

Plan para construir una app propia que acompañe el armado de tableros eléctricos de control: **dibujo 2D y 3D en tiempo real, medidas del tablero, foto y medidas de cada componente**, y todo lo demás que se le podría sumar.

Sale de revisar en detalle las 48 fotos de los tableros del taller, de investigar qué hacen los programas que ya existen y de pensar la app desde el banco de armado, el diseño, la gestión y la calidad.

| Documento | Qué tiene |
|---|---|
| **Este** | El plan: qué es la app, cómo se construye por etapas, riesgos, costos y decisiones pendientes |
| [01 · Qué muestran las fotos](01-relevamiento-fotos.md) | Los tableros fotografiados, inventario de componentes, distribución, nomenclatura de cables, bornera y problemas detectados |
| [02 · Catálogo completo de funciones](02-catalogo-funciones.md) | **272 funciones** en 15 módulos, con etapa, impacto y esfuerzo |
| [03 · Arquitectura técnica](03-arquitectura-tecnica.md) | Decisiones técnicas, modelo de datos, límites del iPhone, costos |
| [Anexos A a F](anexos/) | Programas existentes · fotos, medidas e inteligencia artificial · reglas y checklists · datos de componentes · método de armado · índice de las 48 fotos |
| [datos/funciones.json](datos/funciones.json) | El catálogo de funciones como datos, para ordenarlo o pasarlo a tareas |

---

## 1. En una página

**Lo que mostraron las fotos.** No hay un tablero sino una **familia**: tableros de control para enfriadores evaporativos de 2, 4 y 5 unidades, más otro diseño en gabinete plástico. Cada unidad repite exactamente el mismo juego: guardamotor y contactor del soplador, protecciones y contactor de la bomba, relé de drenaje, controlador de nivel, un PLC y 12 bornes. Se fabrican en series cortas numeradas a mano sobre la placa, y los ejemplares de una misma serie no salen iguales.

**La idea central.** La app no tiene que ser un programa de dibujo. Tiene que saber qué es **una unidad** y generar, a partir de "tablero de N unidades", el dibujo 2D y 3D, la lista de materiales, los cortes, las etiquetas, los marcadores de cable, la bornera y la lista de control. El dibujo es la parte visible; el ahorro grande está en todo lo que se deriva de él.

**Cinco decisiones.**

1. Un solo modelo del tablero y dos vistas (2D y 3D) que nunca se desfasan.
2. Los componentes son cajas con la foto real pegada, no modelos CAD: se dan de alta en segundos, incluso los de marcas sin datos publicados.
3. Las medidas salen del catálogo o del calibre. La foto sirve para ubicar, documentar y dar aspecto real, no para medir un aparato.
4. Aplicación web instalable en el iPhone, que funciona sin conexión. La versión nativa (Bluetooth, realidad aumentada) llega después.
5. Plantilla por cantidad de unidades desde temprano.

**Etapas.**

| Etapa | Resultado | Funciones |
|---|---|---:|
| 0 · Prueba técnica | Se confirma que el 2D/3D anda fluido en el iPhone del taller | — |
| 1 · MVP | El tablero de 5 unidades dibujado en 2D y 3D con medidas reales, catálogo con fotos, plano acotado y lista de materiales | 47 |
| 2 · Taller | Plantilla por unidades, series numeradas, cortes, perforado, etiquetas, checklists y cronómetro | 78 |
| 3 · Cableado | Bornes, conexiones, bornera, lista de cables con largos y cableado guiado | 41 |
| 4 · Gestión | Varios usuarios, stock, compras, presupuestos, carpeta técnica, QR y postventa | 59 |
| 5 · Avanzado | App nativa, impresión directa, realidad aumentada, más inteligencia artificial | 25 |
| Futuro | Monitoreo remoto, configurador para clientes, programa del PLC generado | 22 |

**Próximo paso.** Relevar con cinta y calibre el tablero de 5 unidades (medidas que las fotos no dan) y responder las [decisiones pendientes](#12-decisiones-pendientes). Con eso se arranca la etapa 0.

---

## 2. Qué se vio en las fotos, en corto

Detalle completo en [01 · Qué muestran las fotos](01-relevamiento-fotos.md).

- **Cinco tableros**: uno de 2 unidades terminado y rotulado dentro de su gabinete; uno de 4 unidades (placa «3») y dos de 5 unidades (placas «1» y «2») en armado y prueba; y uno de otro diseño en gabinete plástico, sin una sola etiqueta.
- **Tablero de 5 unidades**: placa galvanizada de unos 700 × 950 mm (estimado), 4 filas de riel con ≈ 560 mm ocupados cada una y bornera inferior. Unos 55 aparatos de 16 modelos y cerca de 70 bornes.
- **Marcas mezcladas**: Schneider, Siemens, Eaton, y varias sin datos técnicos publicados (Taxnele, AG, BAW, Jieli, Etheos).
- **Nomenclatura propia y sistemática** en los cables de control: amarillo `PE<entrada>-<origen><unidad>` y blanco `PQ<salida>-<destino><unidad>`, que calza con las 8 entradas y 4 salidas de cada PLC.
- **Bornera con patrón fijo** de 12 bornes por unidad: soplador, tierra, bomba, drenador y electrodos.
- **Producto terminado bien rotulado**: carteles de color sobre las tapas del cablecanal con el ancho exacto de cada aparato, y un sticker-leyenda de la bornera.
- **Problemas repetidos**: contactores de otro modelo mezclados, etiquetas faltantes o tapando la referencia, bornes sin numerar, puentes de prueba que anulan una protección, soporte del Shelly improvisado, dos cables por borne, empalmes sueltos en el canal, diferencias entre ejemplares, medidas anotadas con fibrón sobre la placa, y ninguna foto con referencia de escala.

---

## 3. Los tres pedidos, uno por uno

### 3.1 Dibujo 2D y 3D del armado en tiempo real

"Tiempo real" son tres cosas, y el plan cubre las tres:

| Qué | Cómo | Etapa |
|---|---|---|
| **2D y 3D a la vez** | Un solo modelo, dos cámaras. Se mueve un aparato en una vista y la otra cambia en el mismo instante. En el celular, una vista con botón para alternar; en tablet o PC, pantalla partida. | 1 |
| **El dibujo sigue al armado** | Cada aparato y cada cable tiene un estado: pendiente, montado, cableado, verificado. Al tildar un paso en el banco, la pieza cambia de color en el dibujo. | 2 |
| **Entre dispositivos** | Lo que se hace en el iPhone del taller se ve en la PC de la oficina con segundos de diferencia. | 4 |

Qué se puede hacer en el editor desde la primera versión: arrastrar aparatos del catálogo al riel, que se peguen al riel y al vecino con su ancho real, duplicar un aparato por N con etiquetas consecutivas, ver en rojo lo que choca o no respeta la separación mínima, ver los milímetros libres de cada fila, girar el 3D, cortar de costado para comprobar que la puerta cierra, deshacer, y sacar el plano acotado.

```
┌──────────────── 2D · frente ────────────────┬──────────── 3D ────────────┐
│ ▓▓▓▓ ▓▓▓▓ ▒▒▒ █ █ █ █ █ ▓▓▓▓ ▒▒ ▒   562/600 │        ╱▔▔▔▔▔▔▔▔▔▔▔╲       │
│ ▒▒▒▒▒ ▒▒▒▒▒▒ ████ ████ ████ ████    553/600 │       ╱ ▟█▙ ▟█▙ ▟█▙  ╲      │
│ ▒▒ ▓▓ ▓▓ ▓▓ ▓▓ ▓▓ ▒▒ ▒▒ ▒▒ ▒▒ ░ ▒▒▒ 515/600 │      ╱  ▔▔▔ ▔▔▔ ▔▔▔   ╲     │
│ ░ ██ ██ ██ ██ ██ ██ ██ ██ ██ ██ ▒▒▒ 551/600 │     ▕  fotos reales de  ▏    │
│ ▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁ bornera ▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁ │     ▕  cada aparato     ▏    │
├─────────────────────────────────────────────┴────────────────────────────┤
│ Catálogo  ▸ GV2ME08  LC1E0910  LOGO!  …   │  ⚠ 2 avisos  │  Materiales  PDF │
└───────────────────────────────────────────────────────────────────────────┘
```

### 3.2 Anotar las medidas del tablero

- **Asistente de relevamiento**: ancho y alto de la placa, altura y largo de cada riel, cada tramo de cablecanal, con una foto de respaldo por medida y control de escuadra por diagonales. El dibujo se actualiza a medida que se carga cada valor.
- **Foto rectificada como fondo**: se sacan las medidas con cinta, se fotografía la placa de frente, se tocan las cuatro esquinas y la app endereza la foto a escala. Sobre esa foto se calcan rieles, canales y agujeros. Precisión esperada de ±1 a 2 mm, solo en el plano de la placa.
- **Cotas automáticas**: cadena de cotas por riel y cotas acumuladas desde una sola esquina, para marcar toda la placa sin mover la cinta.
- **Biblioteca de placas y gabinetes ya medidos**: la placa se mide una vez y sirve para toda la serie. No conviene deducir la placa del tamaño del gabinete: un gabinete de 450 × 450 trae una bandeja de 384 × 390.
- **Zonas prohibidas y profundidad útil**: bulones, bisagras, entrada de cables y distancia hasta la puerta.
- Después: plantilla de perforado 1:1 imprimible y lista de corte de riel y cablecanal para toda la serie.

**Límite conocido:** el sensor de profundidad y la app Medir del iPhone tienen un error de 1 a 2 cm. Sirven para un gabinete, no para un módulo de 18 mm.

### 3.3 Foto y medidas de los componentes

Objetivo: **dar de alta un componente nuevo en 30 segundos, desde el banco.**

1. Foto del frente, con el aparato apoyado sobre fondo liso.
2. La app lee el código impreso si lo tiene y, desde la etapa 2, reconoce marca, modelo y valores nominales de la foto y precarga la ficha.
3. Tres medidas con calibre: ancho, alto y profundidad. Con un calibre Bluetooth en modo teclado, cada medida cae sola en su campo.
4. Se confirma. La foto queda recortada y enderezada como frente del aparato en el 3D.

Cada ficha guarda de dónde salió cada medida (fabricante, distribuidor o calibre) y cuándo. Orden de confianza: **calibre, después hoja de datos, después foto**. Más adelante la ficha suma bornes marcados sobre la foto, par de apriete, separaciones mínimas, zona donde va la etiqueta, accesorios, sustitutos aprobados, proveedor y precio.

La app arranca con un **catálogo semilla** de los componentes que ya se vieron en las fotos, con las medidas investigadas marcadas como "sin verificar" hasta confirmarlas con calibre. Están en el [anexo D](anexos/D-datos-de-componentes.md).

---

## 4. La función que más rinde: el tablero como plantilla

Con lo relevado en las fotos, un tablero de N unidades se puede generar entero:

| Se elige | La app genera |
|---|---|
| Cantidad de unidades (2, 4, 5…) | Distribución por filas en 2D y 3D con ocupación de cada riel |
| Opcionales (Shelly, control de fases, alarma) | Lista de materiales, kit por tablero y lista de corte |
| Soporte (placa suelta, gabinete metálico o plástico) | Etiquetas de aparato SOP1…SOPn, BOM1…BOMn y las que hoy faltan |
| Orden de cabecera y de contactores | Tabla de entradas y salidas de cada PLC |
| | Marcadores de cable `PE1-GMS1`…`PQ4-A` en orden de colocación |
| | Bornera con sus 12 bornes por unidad, numeración y leyenda |
| | Carteles para las tapas del cablecanal con el ancho de cada aparato |
| | Checklist de armado y protocolo de ensayo repetido por unidad |

Estimado sobre el tablero de 2 unidades: cada unidad agrega unos 417 mm de riel y 12 bornes; lo fijo ocupa unos 400 mm. Con ese dato la app puede avisar cuántos rieles y qué placa hacen falta antes de cortar nada.

Esto está en la etapa 2 (SER-02 en el catálogo), pero **el modelo de datos de la etapa 1 ya tiene que estar pensado para esto**.

---

## 5. Dónde se va el tiempo y qué lo recupera

Un estudio alemán sobre fabricación de tableros midió que **el cableado se lleva cerca de la mitad del tiempo**: leer el esquema, buscar el borne, medir, cortar, pelar, poner puntera y rotular, cable por cable. Es de tableros más grandes y lo citan fabricantes de software, así que los porcentajes de abajo son orientativos: conviene reemplazarlos por tiempos medidos en el taller con el cronómetro de la etapa 2.

| Etapa del armado | % estimado | Qué se pierde hoy | Qué aporta la app |
|---|---:|---|---|
| Diseño y distribución | 5–8 | Algo no entra, medidas buscadas cada vez | Catálogo, editor 2D/3D, ocupación de riel |
| Materiales y kit | 3–5 + paradas | Faltantes descubiertos a mitad del armado | Lista de materiales, kit por ejemplar, faltantes de toda la serie |
| Corte de riel y canal, perforado | 5–7 | Medir y marcar cada placa a mano | Lista de corte, plantilla 1:1 |
| Montaje mecánico | 5–8 | Orden o modelo equivocado | Montaje guiado por fila con foto |
| Rotulado | 5–7 | Tipear cada etiqueta, olvidar alguna | Etiquetas y marcadores generados, en lote |
| Prefabricado de cables | 10–12 | Corte a ojo sobre el tablero | Lista de cables con largos; largos medidos una vez en el n.º 1 |
| Cableado de potencia | 10–12 | Secuencia de fases, bornes del reparto | Cableado guiado |
| **Cableado de comando** | **25–30** | Borne equivocado, puentes olvidados | Cableado guiado, "repetir en las demás unidades" |
| Terminación | 3–5 | Bornes sin ajustar, canal sin tapa | Checklist con par de apriete |
| Ensayo | 5–8 | Se prueba de memoria, no queda registro | Protocolo por unidad con valores y fotos |
| Programación y ajustes | 3–5 | Versión de programa, regulaciones sin anotar | Ficha de ajustes, MAC, IP y versión por PLC |
| Documentación y entrega | 3–5 | Carpeta armada a mano | Carpeta automática, QR |

**Consecuencia para el orden de trabajo:** el dibujo 2D/3D es lo pedido y es la base de todo, pero por sí solo ahorra poco tiempo de armado. El salto llega con etiquetas, marcadores y lista de cables. Por eso conviene que la etapa 1 sea corta y pasar rápido a la 2. Para los tableros MEC, además, los marcadores `PE`/`PQ` y las etiquetas `SOP`/`BOM` se pueden generar en la etapa 2 solo con la cantidad de unidades, sin esperar el modelo completo de cableado de la etapa 3.

---

## 6. Todo lo que se le puede agregar

El detalle está en [02 · Catálogo completo de funciones](02-catalogo-funciones.md). Resumen por módulo:

| Módulo | Funciones | Ejemplos |
|---|---:|---|
| Relevamiento y medidas | 13 | Asistente de relevamiento, foto rectificada, cotas sobre la foto, biblioteca de gabinetes |
| Catálogo de componentes | 19 | Alta en 30 segundos, bornes marcados sobre la foto, sustitutos aprobados, piezas propias |
| Editor 2D y 3D | 24 | Imán al riel, colisiones, ocupación, duplicar por N, bloques, cables en el 3D, editor de puerta |
| Ingeniería eléctrica | 17 | Tabla de entradas y salidas por PLC, diseñador de bornera, lista de conexiones, ruteo con largos, balance de fases |
| Reglas y validaciones | 15 | Etiquetas faltantes, mezcla de series, puentes provisorios, dos cables por borne, llenado de canal |
| Materiales, stock y compras | 16 | Lista de materiales, kit por ejemplar, lista de corte, perforado 1:1, faltantes de la serie, pedidos por proveedor |
| Ejecución en el taller | 16 | Modo banco de un paso por pantalla, cableado guiado, repetir patrón por unidad, cables prefabricados por lote |
| Series y plantillas | 15 | Plantilla por unidades, ejemplares numerados, desvíos, comparador contra el patrón, revisiones |
| Calidad y ensayos | 21 | Checklist de rutina, punto a punto guiado, protocolo de ensayo, ajustes y MAC por PLC, no conformidades |
| Documentación y postventa | 20 | Plano acotado, placa de características, carteles y leyenda, carpeta conforme a obra, QR, reclamos |
| Gestión del taller | 23 | Presupuesto desde la configuración, precios en pesos y dólares con fecha, costo real contra presupuesto, indicadores |
| Inteligencia artificial | 19 | Reconocer el componente por foto, inspección por foto contra el diseño, asistente, lectura de pasos en voz alta |
| Hardware y otros programas | 19 | Calibre en modo teclado, exportar marcadores a la rotuladora, impresión directa, realidad aumentada, datos del PLC |
| Plataforma y uso | 21 | Sin conexión, respaldo, exportación completa, buscador global, modo taller con botones grandes |
| Largo plazo | 14 | Monitoreo remoto, configurador para clientes, programa del PLC generado, capacitación |

En el catálogo hay 43 funciones marcadas con ★: impacto alto y esfuerzo bajo. Son las primeras candidatas dentro de cada etapa.

---

## 7. Plan por etapas

Los códigos remiten al [catálogo](02-catalogo-funciones.md). Las duraciones son estimaciones gruesas para una persona desarrollando a tiempo completo; cambian según quién la construya y con cuántas horas.

### Etapa 0 · Prueba técnica (1 a 2 semanas)

Placa, cuatro rieles y cajas arrastrables con imán, en dos vistas, con unas 150 piezas.

**Sale si:** se mueve fluido en el iPhone del taller. Si no, se ajusta la tecnología antes de construir nada más.

### Etapa 1 · MVP: medir, catalogar y dibujar (4 a 6 semanas)

Versión mínima recomendada, 21 de las 47 funciones de la etapa:

| Bloque | Funciones |
|---|---|
| Medidas | Asistente de relevamiento (REL-01), importar fotos ya sacadas (REL-02), foto guiada con escala (REL-08), biblioteca de gabinetes (REL-05) |
| Componentes | Ficha con foto y medidas (CAT-02), alta rápida (CAT-01), catálogo semilla (CAT-03), calibre en modo teclado (HW-01) |
| Editor | Modelo único 2D/3D (EDI-01), paleta al riel (EDI-04), imán (EDI-05), duplicar por N (EDI-07), colisiones (EDI-03), ocupación de riel (EDI-12), etiquetas visibles (EDI-08), cotas (EDI-02), deshacer (EDI-06) |
| Salidas | Lista de materiales (MAT-01), PDF acotado (DOC-01) |
| Base | Web instalable sin conexión (PLA-01), respaldo y exportación (PLA-03) |

El resto de la etapa 1 (foto rectificada, zonas prohibidas, capas, vistas, importación desde planilla, imagen 3D para el cliente, clonar tablero) entra a medida que haga falta.

**Sale si:** el tablero de 5 unidades queda dibujado completo y sus cotas coinciden con la placa real.

### Etapa 2 · Taller: series, cortes, etiquetas y control (4 a 6 semanas)

- Plantilla por cantidad de unidades (SER-02) y serie numerada con desvíos (SER-07).
- Generador de nomenclatura (ELE-01), etiquetas de aparato en lote (ARM-03), exportación de marcadores a la rotuladora (HW-02), carteles de cablecanal y leyenda de bornera (ARM-07).
- Lista de corte (MAT-06), plantilla de perforado 1:1 (MAT-03), kit por ejemplar (MAT-04).
- Modo banco (ARM-01), cronómetro con motivo de parada (ARM-02), estado de cada pieza sobre el dibujo (EDI-16).
- Checklist de rutina (CAL-08) y de terminación (CAL-09), fotos obligatorias por etapa (CAL-14), ficha de ajustes, MAC e IP por PLC (CAL-13).
- Avisos: etiquetas faltantes (VAL-03), mezcla de series (VAL-07), puentes provisorios (VAL-05).
- Primera función con inteligencia artificial: reconocer el componente por la foto (IA-01).

**Sale si:** el ejemplar siguiente de una serie se arma siguiendo solo la app, con todas sus etiquetas impresas desde ella.

### Etapa 3 · Cableado (6 a 10 semanas)

- Bornes marcados sobre la foto de cada componente y catálogo de cables y consumibles (CAT-15).
- Tabla de entradas y salidas por PLC (ELE-07), lista de conexiones (ELE-04), diseñador de bornera (ELE-06), balance de fases (ELE-14).
- Ruteo por cablecanal con largos (ELE-05) y llenado de canal (VAL-12).
- Cables prefabricados por lote (ARM-12), cableado guiado de un cable por pantalla (ARM-10), repetir patrón en las demás unidades (ARM-13), largos reales aprendidos del primer ejemplar (ARM-11).
- Punto a punto guiado y ensayo funcional generado desde la tabla de entradas y salidas.

**Sale si:** la lista de cables generada coincide con la real del primer ejemplar, y el segundo se cablea con cables cortados de antemano.

### Etapa 4 · Gestión y entrega (8 a 12 semanas)

Usuarios y roles (GES-13), sincronización entre dispositivos, faltantes de la serie contra stock (MAT-09), pedidos por proveedor, presupuesto desde la configuración (GES-08), precios con moneda y fecha, costo real contra presupuesto, carpeta conforme a obra (DOC-09), QR en el tablero (DOC-11), postventa e indicadores.

**Sale si:** un tablero se presupuesta, se arma y se entrega con su carpeta técnica sin salir de la app.

### Etapa 5 · Avanzado

App nativa para iPhone: impresión directa en la rotuladora (HW-06), realidad aumentada (HW-10), más inteligencia artificial (inspección por foto contra el diseño, búsqueda de hojas de datos, asistente), importación de modelos 3D de fabricante.

### Futuro

Monitoreo remoto de tableros entregados, configurador en línea para clientes, generación del programa del PLC desde la plantilla, capacitación de aprendices, biblioteca compartida de componentes.

---

## 8. Primeros pasos

| # | Acción | Para qué |
|---|---|---|
| 1 | Medir con cinta el tablero de 5 unidades: placa, altura de cada riel, cada tramo de cablecanal, distancia a la puerta | Las fotos no tienen escala; sin esto el tablero de referencia no se puede cargar |
| 2 | Medir con calibre los componentes sin ficha confiable: bloque de distribución, protector Taxnele, controlador AG, zócalo de relé, soporte del Shelly, relé BAW, contactor Etheos | Completar el catálogo semilla |
| 3 | Sacar una foto de frente de cada modelo de componente, sobre fondo liso | Frentes para el 3D |
| 4 | Responder las [decisiones pendientes](#12-decisiones-pendientes) | Varias cambian el alcance de la etapa 1 |
| 5 | Confirmar el significado de cada sigla y juntar el esquema eléctrico, si existe | Tabla de entradas y salidas de la plantilla |
| 6 | Anotar marca y modelo de la rotuladora y del calibre | Define cómo se exportan los marcadores |
| 7 | Etapa 0: prueba técnica en el iPhone del taller | Confirmar la tecnología antes de invertir |

Desde ahora, en cada foto nueva conviene apoyar una regla o cinta sobre la placa y sacarla de frente.

---

## 9. Riesgos

| Riesgo | Cómo se reduce |
|---|---|
| **Querer hacer todo.** 272 funciones es un mapa, no un compromiso | Etapas con criterio de salida, validadas siempre contra un tablero real |
| **Que no se use en el banco** | Modo taller de un paso por pantalla, botones grandes, sin conexión, nunca frena el trabajo; cada dato pedido tiene que ahorrar más de lo que cuesta |
| El 3D anda lento en el celular | Etapa 0 antes que nada |
| Cargar el catálogo es pesado | Alta en 30 segundos, catálogo semilla, importación desde planilla |
| Medidas equivocadas | El calibre manda; cada medida guarda su origen; todo lo no confirmado se muestra como "sin verificar" |
| La inteligencia artificial lee mal | Nunca guarda sin confirmación; campos dudosos resaltados; la app funciona completa sin ella |
| Pérdida de datos | App instalada, copia en la nube, exportación completa en formato abierto |
| Bluetooth y realidad aumentada no funcionan en una web en iPhone | Hasta la etapa 5: exportar a la app de la rotuladora y calibre en modo teclado |
| Confiar en un tilde verde | Ver la [advertencia](#13-advertencia) |

## 10. Qué no construir todavía

- Un programa de esquemas eléctricos completo. Alcanza con la tabla de entradas y salidas y la lista de conexiones.
- Un sistema de gestión contable o de facturación. Stock, compras y presupuestos mínimos; el resto, por exportación.
- Importación de modelos 3D de fabricante antes de que la caja con foto esté resuelta.
- Reconocimiento automático de un tablero entero por foto. Es poco confiable hoy; rinde más comparar la foto contra un diseño que la app ya conoce.
- Medición por realidad aumentada o sensor de profundidad para componentes.
- Comandos de voz propios antes de tener app nativa.
- Monitoreo remoto y configurador para clientes antes de tener la base funcionando.

## 11. Cómo saber si sirve

- Horas por tablero y por etapa, y mejora del ejemplar 1 al 3 de una serie.
- Minutos por cable, contando prefabricado y conexión.
- Porcentaje de cables cortados de antemano.
- Paradas por faltantes y kits completos al empezar.
- Errores encontrados en el ensayo por tablero, y tableros que pasan a la primera.
- Diferencias entre ejemplares de una misma serie.
- Tiempo para dar de alta un componente.
- Que el armador abra la app todos los días sin que se lo pidan.

**Costo de funcionamiento estimado:** entre 0 y 5 dólares por mes en prototipo y entre 30 y 45 en producción para 2 a 10 usuarios, a confirmar con precios vigentes. Detalle en [03 · Arquitectura técnica](03-arquitectura-tecnica.md).

---

## 12. Decisiones pendientes

1. **¿Quién la usa y con qué?** Solo el dueño o también los armadores; iPhone, tablet en el banco, PC en la oficina.
2. **¿Quién la desarrolla y con cuántas horas por semana?** Cambia todos los plazos.
3. **¿Solo para los tableros MEC o para cualquier tablero?** Si es solo MEC, la plantilla por unidades puede adelantarse a la etapa 1.
4. **¿Qué duele más hoy?** Distribuir y dibujar, cortar y rotular cables, los faltantes, la documentación para el cliente o presupuestar. Define qué se adelanta.
5. **¿Existe el esquema eléctrico?** ¿En qué formato?
6. **¿Qué rotuladora y qué calibre hay en el taller?**
7. **¿Las fotos y los datos pueden guardarse en la nube?** ¿Quién más tiene que verlos?
8. **¿Hay un profesional matriculado que firma los tableros?** Las validaciones y el protocolo de ensayo se diseñan con esa persona.
9. **¿Cuántos tableros por mes y de qué variantes?**
10. **¿Se mantiene el prefijo `PE` para las entradas del PLC?** Se confunde con el conductor de tierra.
11. **¿Se mantiene el código de colores de fases propio?**
12. **¿Uso interno o también ofrecerla a otros talleres?**
13. **¿El código de la app va en este repositorio o en uno nuevo?** Este tiene el firmware del controlador.

## 13. Advertencia

La app **asiste, no certifica**. Las reglas automáticas son simplificaciones de normas y de datos de fabricante, y varias están sin verificar contra el texto original ([anexo C](anexos/C-reglas-y-checklists.md)). El diseño, la verificación, los ensayos con tensión y la firma del protocolo son responsabilidad de un profesional matriculado. Ningún tilde verde habilita a energizar un tablero.

## 14. Cómo se armó este plan

- Lectura detallada de las 48 fotos, con recortes ampliados para los textos chicos, y reconstrucción de la distribución del tablero de 2 unidades y de la regla por unidad.
- Investigación de programas existentes, tecnología para 2D/3D, medición por foto e inteligencia artificial, normativa, datos de componentes y método de armado.
- 216 funciones propuestas desde cuatro puntos de vista (armador, proyectista, dueño y calidad), depuradas a mano y completadas con inteligencia artificial, hardware, experiencia de uso y largo plazo.

Límites: las medidas en mm tomadas de las fotos son estimaciones; la verificación cruzada automática de modelos y cantidades no llegó a correr y se reemplazó por la coincidencia entre lecturas independientes; parte de la investigación se apoya en resúmenes de búsqueda y no en la fuente original.
