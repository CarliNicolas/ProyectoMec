# 03 · Arquitectura técnica y modelo de datos

> Parte del [plan de acción](README.md). Acá está el **cómo** se construye: decisiones técnicas, modelo de datos, límites conocidos del iPhone, costos y orden de construcción.
> Lo marcado **[a confirmar]** salió de resúmenes de búsqueda y no de leer la fuente primaria; hay que reconfirmarlo antes de comprometerse (sobre todo precios y compatibilidades).

## 1. Las cinco decisiones que ordenan todo

| # | Decisión | Por qué |
|---|---|---|
| 1 | **Un solo modelo de datos, dos vistas.** El 2D y el 3D no se "sincronizan": son dos cámaras mirando el mismo tablero. | Mover un guardamotor escribe `{riel, posición}` una sola vez y las dos vistas se redibujan en el mismo cuadro. "Tiempo real" entre 2D y 3D sale gratis y nunca se desfasan. |
| 2 | **Los componentes son cajas con foto, no modelos CAD.** Cada aparato es un prisma de ancho × alto × profundidad con la foto del frente pegada como textura. | Taxnele, AG, BAW, Jieli y Etheos no publican modelos 3D. Con foto + 3 medidas cualquier aparato queda dado de alta en segundos y se ve "real" en el 3D. Importar STEP queda como extra. |
| 3 | **La medida confiable sale del catálogo o del calibre; la foto posiciona y documenta.** | LiDAR, ARKit y la app Medir del iPhone dan ±1 a 2 cm: no sirven para un módulo de 17,5–18 mm. La ortofoto de la placa (corrección de perspectiva) sí da ±1–2 mm, pero solo en el plano de la placa. |
| 4 | **Web instalable (PWA) primero; envoltorio nativo después.** | Cámara, modo sin conexión e instalación en pantalla de inicio funcionan hoy en iPhone sin pasar por la tienda. Bluetooth (rotuladora, calibre) y realidad aumentada anclada piden capa nativa: se agrega recién cuando esas funciones entren al plan. |
| 5 | **El tablero es una plantilla paramétrica por "unidad".** | Los tableros MEC repiten el mismo juego de aparatos, bornes, cables y etiquetas por cada enfriador (2, 4 o 5 unidades). El modelo de datos tiene que saber qué es "una unidad" para generar layout, materiales, cables y etiquetas de una serie entera. |

## 2. Qué significa "en tiempo real" (son tres cosas)

1. **2D ↔ 3D en la misma pantalla.** Resuelto por la decisión 1. En celular se ve una vista por vez con un botón para alternar; en tablet o PC, pantalla partida.
2. **Diseño ↔ avance real del armado.** Cada componente y cada cable tiene un estado (`pendiente → montado → cableado → verificado`). Cuando el armador tilda un paso, la pieza cambia de color en el 2D y en el 3D. El dibujo pasa a ser el tablero de avance.
3. **Entre dispositivos.** El iPhone en el banco y la PC de la oficina ven lo mismo con segundos de diferencia. Se resuelve con un documento sincronizable con copia local (ver §6), que además da modo sin conexión y deshacer.

## 3. Stack recomendado

| Capa | Recomendación | Alternativa | Nota |
|---|---|---|---|
| Lenguaje y base | TypeScript + React + Vite, como PWA | — | Un solo código para iPhone, tablet y PC. |
| 3D | Three.js con React Three Fiber y drei | Babylon.js | El tablero de 5 unidades tiene 100–200 piezas pero solo 15–20 tipos: un `InstancedMesh` por tipo deja la escena en 20–30 llamadas de dibujo. Render "bajo demanda" (solo cuando algo cambia) para cuidar batería. |
| 2D | Cámara ortográfica sobre la misma escena + capa SVG para cotas y textos | Konva (2D) + R3F (3D) leyendo el mismo estado | Una sola lógica de selección, arrastre e imán. Las cotas salen de una función pura `aSVG(modelo)` que también alimenta PDF, DXF y plantilla de perforado. |
| Núcleo | Módulo TypeScript puro, sin pantalla: imán a riel, colisiones, cotas, ruteo, lista de materiales, generador de etiquetas | — | Se prueba con tests automáticos sin abrir la app. Es donde vive el valor. |
| Documento del tablero | Yjs con copia local en IndexedDB | PowerSync + Supabase (más simple si nunca editan dos personas el mismo tablero a la vez) | Yjs da deshacer/rehacer, trabajo sin conexión y, más adelante, sincronización sin reescribir. |
| Servidor | Supabase: usuarios, base Postgres, almacenamiento de fotos | Firebase; Cloudflare R2 para fotos | Postgres guarda catálogo, proyectos y una copia "plana" del tablero (lista de materiales) para consultas y reportes. |
| Fotos | Compresión en el celular (lado mayor 2048 px, ~400 KB), miniaturas | — | 1.000 fotos ≈ 0,4 GB. |
| Rectificar fotos | Homografía de 4 puntos (OpenCV.js o cálculo propio) en un Web Worker | Marcadores ArUco impresos en las esquinas (etapa 2) | El usuario toca las 4 esquinas de la placa y carga ancho × alto medidos con cinta. |
| Códigos | zxing-wasm para QR / DataMatrix / código de barras | — | El `BarcodeDetector` nativo viene deshabilitado en Safari **[a confirmar]**. |
| IA | Modelo multimodal por API (por ejemplo Claude con visión) detrás de un proxy propio | — | La clave de la API nunca va en el celular. Lo que usa IA se encola si no hay conexión. |
| PDF y planos | jsPDF + svg2pdf.js (vectorial, en mm) | — | Plantilla de perforado 1:1 en mosaico A4/A3 con marcas de solape y regla de control de 100 mm. |
| DXF | Librería de escritura DXF (p. ej. `@tarikjabiri/dxf`) | — | Fijar unidades en mm. |
| Empaquetado nativo (etapa 5) | Capacitor envolviendo la misma web | Expo / React Native (obliga a reescribir el 3D) | Necesario para Bluetooth y realidad aumentada anclada en iPhone. |

## 4. Modelo de datos

Unidades en **mm**, origen en la esquina inferior izquierda de la placa. Claves planas por `id` (facilita sincronizar, exportar y migrar).

```
ItemCatalogo   { id, fabricante, referencia, tipo, descripcion, aliasTaller,
                 ancho, alto, profundidad, modulosDIN, peso,
                 perfil: 'caja' | 'din_escalonado',
                 montaje: 'riel35' | 'placa' | 'zocalo',
                 fotoFrente { url, esquinas[4] }, fotoPlaca?, modelo3D?,
                 bornes [ { id, nombre, cara, x, y, z, tipo, seccionMin, seccionMax,
                            conductoresMax, parApriete, largoPelado } ],
                 holguras { arriba, abajo, izquierda, derecha },
                 zonaEtiqueta { x, y, ancho, alto },        // dónde pegar SOPn sin tapar QR ni referencia
                 electricos { Ue, In, curva, poderCorte, polos, bobina, contactos, potenciaDisipada },
                 accesorios [ idCatalogo ], sustitutos [ idCatalogo ],
                 origenMedidas: 'fabricante' | 'distribuidor' | 'calibre', fechaMedicion,
                 documentos [ url ], proveedor, precio, moneda, fechaPrecio, stock, stockMinimo }

Tablero        { id, proyectoId, nombre, placa { ancho, alto, espesor }, gabinete?,
                 pasoModulo, perfilColores, plantillaId?, unidades: N,
                 serie { numero, total }, revision, estado }

Riel           { id, tableroId, y, x0, largo, tipo: '35x7.5' | '35x15' }
Canal          { id, tableroId, x0, y0, x1, y1, ancho, alto, conTapa, llenadoMax }
Colocacion     { id, tableroId, catalogoId, rielId?, desplazamiento | { x, y }, rotacion,
                 etiqueta: 'SOP1', unidad?: 1, estado: 'pendiente'|'montado'|'cableado'|'verificado',
                 numeroSerie?, mac?, ip?, ajustes { ... }, fotoId? }

TipoCable      { id, seccion, diametroExterior, color, funcion }
Conexion       { id, tableroId, desde { colocacionId, borneId }, hasta { colocacionId, borneId },
                 tipoCableId, punteraA, punteraB, marcadorA: 'PE1-GMS1', marcadorB,
                 ruta [ canalId ], largoCalculado, largoReal?, unidad?,
                 estado: 'pendiente'|'cortado'|'conectado'|'verificado' }

GrupoBornes    { id, tableroId, unidad?, funcion, bornes [ { numero, color, catalogoId } ],
                 separadorDespues, topeDespues }

PlantillaUnidad{ id, nombre, colocaciones [ ... con etiquetas 'SOP{n}', 'BOM{n}' ],
                 conexiones [ ... con marcadores 'PE1-GMS{n}' ], grupoBornes [ ... ],
                 fijos { colocaciones, conexiones } }      // lo que no depende de N

Foto           { id, tableroId | catalogoId | colocacionId, url, miniatura, autor, fecha, etapa,
                 escala?, cotas [ { p1, p2, valor } ], anotaciones [ ... ] }

Paso           { id, tableroId, etapa, descripcion, objetivoId, hecho, por, cuando, fotoId?, tiempoSeg }
Ensayo         { id, tableroId, tipo, valorMedido, unidad, criterio, resultado, instrumento, por, cuando }
Revision       { id, tableroId, numero, motivo, autor, fecha, cambios [ ... ], ejemplaresAfectados [ n ] }
```

Notas de diseño:

- `Colocacion` guarda **riel + desplazamiento**, no una posición XYZ libre: el imán vive en el modelo y mover un riel arrastra sus aparatos.
- `PlantillaUnidad` es lo que convierte "quiero un tablero de 5 enfriadores" en layout, lista de materiales, tabla de entradas/salidas, lista de cables y todas las etiquetas. Las llaves `{n}` se reemplazan por el número de unidad.
- `serie { numero, total }` clona el tablero n.º 1 y registra los desvíos de cada ejemplar (por ejemplo, "ejemplar 1: contactor BOM4 de otra serie").
- `largoReal` permite **calibrar con el primer tablero**: se miden los cables reales del n.º 1 y los ejemplares 2 y 3 salen con lista de corte exacta.
- `zonaEtiqueta` existe porque en las fotos las etiquetas SOPn tapan la referencia y el QR del guardamotor.

## 5. Lógica de edición

- **Imán:** primero "pegar al vecino" (borde con borde) con anchos reales; grilla opcional con paso configurable (17,5 mm nominal por norma; 18 mm como paso comercial).
- **Colisiones y distancias mínimas:** todo es una caja alineada a los ejes; alcanza con comparar cajas "infladas" por las holguras de cada ficha. Con menos de 300 piezas se hace por fuerza bruta en cada movimiento.
- **Ocupación de riel:** contador en vivo de mm usados y libres por fila, con aviso al pasar el 80 % (reserva).
- **Cotas automáticas:** cadena de cotas por riel y alturas de rieles y canales desde el borde de la placa, generadas del modelo.
- **Ruteo de cables:** los cablecanales forman un grafo (nodos en extremos y cruces); cada borne se proyecta al canal más cercano; camino más corto con Dijkstra o A*. `largo = camino + bajadas a borne + holgura %`.
- **Llenado de canal:** `Σ(π·d²/4) / (ancho·alto)` por tramo, aviso al 40 % y error al 50 %.
- **Deshacer / rehacer:** por usuario, sobre el documento.

## 6. Sincronización, trabajo sin conexión y datos

- Yjs es una librería, no un servicio: hace falta un servidor WebSocket propio chico (Hocuspocus, y-sweet o Cloudflare Durable Objects).
- En el celular el documento se guarda en IndexedDB. **Instalar la PWA en la pantalla de inicio y pedir almacenamiento persistente**: Safari borra los datos de sitios no instalados tras 7 días sin uso **[a confirmar el comportamiento actual]**.
- En cada reconexión se sube una copia completa al servidor (respaldo).
- **Exportación completa siempre disponible**: un JSON documentado con todo el proyecto + carpeta de fotos. Los datos son del taller y no quedan atrapados en la app.

## 7. Límites del iPhone que condicionan el plan

| Límite | Consecuencia | Salida |
|---|---|---|
| Safari no implementa Web Bluetooth | Una web no puede hablar con rotuladoras ni calibres Bluetooth "de datos" | Mientras tanto: exportar CSV a la app del fabricante de la rotuladora; calibres en **modo teclado** (escriben el número en el campo activo, funcionan en cualquier web). Después: Capacitor + SDK del fabricante. |
| Safari no soporta WebXR | No hay realidad aumentada web "de verdad" | AR Quick Look con un archivo USDZ exportado (ver el tablero a escala sobre la mesa). Calzar el modelo sobre la placa real exige ARKit nativo. |
| Memoria de texturas limitada | Con muchas fotos grandes el 3D puede reiniciarse | Fotos de textura ≤ 1024 px, render bajo demanda. |
| Dictado por voz incierto en PWA instalada | Comandos de voz no confiables | En el MVP usar el dictado del teclado de iOS; comandos de voz propios recién con capa nativa. |

## 8. Importar y exportar

| Formato | Uso | Prioridad |
|---|---|---|
| CSV / Excel | Lista de materiales, lista de cables, marcadores, catálogo masivo | Imprescindible (entrada y salida) |
| PDF | Planos acotados, plantilla de perforado 1:1, checklists, carpeta técnica | Imprescindible (salida) |
| JSON propio | Respaldo y traspaso completo del proyecto | Imprescindible |
| DXF | Perforado, siluetas, intercambio con CAD | Alta |
| GLB / USDZ | Ver el tablero en 3D fuera de la app y en realidad aumentada | Media |
| STEP → malla | Modelos 3D de fabricante (Schneider, Siemens) vía OpenCascade en WebAssembly | Media-baja, solo importar |
| ETIM / EPLAN EDZ / AutomationML | Intercambio con herramientas grandes | Baja |

## 9. Costos mensuales estimados (2 a 10 usuarios) **[a confirmar precios]**

| Ítem | USD/mes |
|---|---|
| Prototipo (plan gratuito de Supabase, hosting estático) | 0–5 |
| Supabase Pro (base, usuarios, 100 GB de archivos) | ~25 |
| Servidor de sincronización chico | ~5 |
| Programa de desarrolladores de Apple (solo con app nativa, 99/año) | ~8 |
| IA por uso (alta de componentes y control por foto) | pocos dólares; del orden de centavos por componente dado de alta |
| **Total en producción** | **~30–45** |

## 10. Riesgos técnicos y mitigación

| Riesgo | Mitigación |
|---|---|
| El 3D anda lento o se cuelga en el iPhone del taller | Prueba técnica en la etapa 0 con el tablero de 5 unidades real antes de construir nada más. |
| Pérdida de datos locales | PWA instalada + almacenamiento persistente + copia al servidor en cada reconexión + exportación manual. |
| La IA lee mal un modelo o una medida | Nunca se guarda sin confirmación; campos de baja confianza resaltados; el calibre manda sobre la hoja de datos y la hoja de datos sobre la foto. |
| Bluetooth y AR no disponibles en web | Planificados para la etapa 5 con Capacitor; antes, CSV y modo teclado. |
| Documento sincronizable difícil de consultar o migrar | Esquema plano, campo `versionEsquema`, copia plana en Postgres. |
| El alcance se infla | Cada etapa tiene criterio de salida y se valida contra un tablero real de la serie. |

## 11. Orden de construcción

| Etapa | Qué se construye | Criterio de salida |
|---|---|---|
| 0 · Prueba técnica (1–2 semanas) | Placa, 4 rieles y cajas arrastrables con imán, en dos vistas | Funciona fluido en el iPhone del taller con ~150 piezas |
| 1 · MVP (4–6 semanas) | Medidas de placa/rieles/canales, catálogo con foto y medidas, caja con foto, colisiones, deshacer, sin conexión, cotas automáticas, PDF y lista de materiales | El tablero de 5 unidades queda dibujado completo y sus cotas coinciden con la placa real |
| 2 · Taller | Plantilla → serie numerada, listas de corte, perforado 1:1, etiquetas, checklist con fotos, cronómetro | El ejemplar siguiente de una serie se arma siguiendo solo la app |
| 3 · Cableado | Bornes, conexiones, borneras, ruteo, largos, llenado, prefabricado y cableado guiado | La lista de cables generada coincide con la real del tablero n.º 1 |
| 4 · Gestión | Usuarios y roles, sincronización, stock, compras, presupuestos, carpeta técnica, QR | Un tablero se entrega con carpeta generada por la app |
| 5 · Avanzado | Capa nativa (Bluetooth, AR), IA avanzada, importación de CAD | Etiquetas impresas desde la app sin pasar por otra |

Las duraciones son para una persona desarrollando a tiempo completo y son estimaciones, no compromisos.

## 12. Fuentes consultadas

React Three Fiber (rendimiento y `View` de drei) · Yjs (UndoManager, y-sweet, PartyServer) · PowerSync · Supabase (precios) · Cloudflare R2 (precios) · caniuse.com (WebXR, Web Bluetooth, BarcodeDetector, Web Speech) · WebKit (política de almacenamiento, Web Bluetooth) · Capacitor Bluetooth LE · SDK móvil de Brother · occt-import-js · svg2pdf.js · `@tarikjabiri/dxf` · three.js `USDZExporter` · estudio de precisión del LiDAR del iPhone (Scientific Reports, 2021) · documentación de visión de la plataforma de Claude. La red de la sesión bloqueó la lectura directa de varias de estas páginas; por eso los puntos marcados **[a confirmar]**.
