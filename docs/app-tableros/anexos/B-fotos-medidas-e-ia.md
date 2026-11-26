# Fotos, medidas e IA desde el iPhone: qué es viable hoy (nov-2026)

> Anexo del [plan de acción](../README.md). Es el informe de investigación tal como se produjo, con sus fuentes al final.
> Lo marcado **[sin verificar]** o **[sv]** no se pudo contrastar con la fuente primaria: hay que confirmarlo antes de usarlo como dato firme (en especial precios, compatibilidades y números de cláusula). Las menciones a «la sesión» o a «dominios no permitidos» se refieren a la sesión de investigación en la que se armó el informe, donde varias páginas solo se pudieron leer por su resumen de búsqueda.

## Conclusión
- **La medida confiable sale de calibre y cinta; la foto sirve para posicionar, documentar y texturizar.** LiDAR, ARKit y Apple Measure dan ±1–2 cm: no alcanzan para módulos de 17,5–18 mm.
- Lo que más rinde: **ortofoto de la placa por homografía** (±1–2 mm en el plano de la placa) para calcar rieles y cablecanal, y **visión multimodal** para leer el frente del aparato y precargar la ficha.
- iOS condiciona la arquitectura: Safari no tiene Web Bluetooth ni WebXR, `BarcodeDetector` viene deshabilitado y el dictado web es dudoso en PWA instalada. MVP como PWA (cámara + OpenCV.js + zxing-wasm + Three.js); envoltorio nativo recién cuando hagan falta BLE por GATT, Vision o voz offline.

## Matriz por técnica
Etapas: MVP, E2 (segunda versión), E3 (más adelante).

| Técnica | Viabilidad | Precisión esperada | Esfuerzo | Etapa |
|---|---|---|---|---|
| Ortofoto: tocar 4 esquinas de la placa + ancho×alto medidos con cinta (`getPerspectiveTransform`/`warpPerspective`) | Alta | ±1–2 mm en 800 mm, solo en el plano de la placa (estimación propia; ~0,2 mm/px con 24 MP) | Bajo | MVP |
| ArUco/AprilTag impresos en las esquinas (js-aruco2, o build propio de OpenCV.js) | Alta | ±1 mm; automatiza el marcado. Verificar con calibre el tamaño impreso | Medio | E2 |
| Tarjeta 85,6×54 mm junto al componente | Media | ±0,5–1 mm en 20–150 mm si es coplanar con la cara medida | Bajo | MVP (foto de componente) |
| Riel de 35 mm o módulo como patrón | Baja como única referencia | Base corta: un error de 0,5 mm en 35 mm se vuelve ~11 mm en 800 mm. El módulo es 17,5 mm (DIN 43880), aunque varios fabricantes declaran 18 | Bajo | Solo chequeo de cordura |
| Regla de acero en la foto | Alta | ±1 mm; valida la ortofoto | Nulo | MVP |
| Apple Measure / ARKit (ARCore) / LiDAR | Media-baja | ±1 cm en objetos >10 cm; una prueba dio 38,4" contra 39" | Alto (nativo) | E3, solo gabinetes |
| RoomPlan, WebXR | Baja / nula | RoomPlan ignora objetos chicos; WebXR no existe en Safari iOS | — | Descartar |
| Object Capture / fotogrametría | Media | Un estudio lo da por apto para el umbral de 1 mm (cifra medida [sin verificar]); pide decenas de fotos y textura; plástico gris liso rinde mal [sin verificar] | Alto | Descartar: un aparato DIN es un prisma |
| Calibre Bluetooth en modo teclado (HID) | Alta | ±0,02–0,03 mm [sin verificar, típico de catálogo] | Casi nulo | MVP |
| Calibre o cinta láser por BLE/GATT | Media | Láser ±1,5–2 mm [sin verificar] | Alto: nativo + protocolo por marca | E3 |
| Visión multimodal (reemplaza al OCR clásico) lee el frente → JSON (marca, modelo, In, curva, bobina) | Alta | Muy buena con texto nítido; puede inventar con texto chico, rotado o borroso | Bajo-medio (proxy backend) | MVP |
| QR / DataMatrix / EAN con zxing-wasm | Alta | Exacta si decodifica | Bajo | MVP |
| Código o modelo → hoja de datos y dimensiones | Media | Exacta si acierta el PDF; riesgo de variante equivocada | Medio | E2, con fuente y confirmación |
| Quitar fondo + enderezar + textura 3D | Alta | Visual | Bajo-medio | E2 |
| Foto → as-built por detección abierta | Baja-media | Cajas aproximadas, conteo inexacto | Alto (dataset propio) | E3 |
| QA foto contra diseño, slot por slot, y contra el tablero n.º 1 de la serie | Media-alta en presencia y modelo; media en etiquetas; baja en color de cable | — | Medio | E2 presencia; E3 etiquetas y cables |
| Layout desde lista de materiales, orden de armado, chat del proyecto | Alta (reglas + LLM) | — | Medio | E2 |
| Lista de cables | Alta si el esquema se carga en la app (determinístico); media-baja desde PDF o foto | — | Medio / alto | E2 / E3 |
| Voz con manos ocupadas | Media | Ruido de taller, vocabulario técnico | Bajo con el dictado del teclado iOS | MVP dictado; E3 comandos |

## Lo que hay que saber antes de programar

**1. La ortofoto solo vale en el plano de la placa.** La homografía corrige puntos coplanares con la referencia. El frente de un guardamotor queda a unos 70 mm de la placa: a 1 m de distancia y a 300 mm del eje óptico aparece corrido r·h/(D−h) ≈ 23 mm; a 2 m con el tele, ≈ 11 mm. Por eso en la ortofoto se calcan **rieles, cablecanal, agujeros y bordes**; el ancho de cada aparato sale del catálogo o del calibre y su posición se toma por el pie sobre el riel. Cámara 1x o tele, centrada y lejos; nunca el ultra gran angular.

**2. La mejor referencia de escala es la propia placa** (base larga). La tarjeta sirve para un componente, no para extrapolar a 800 mm.

**3. Jerarquía de dimensiones: catálogo → calibre → foto.** Ancho sobre riel, alto y profundidad son tres lecturas de 15 segundos. Los calibres Sylvac y Hoffmann/HCT tienen modo teclado (un botón manda "123.45" al campo activo), que funciona en una PWA sin una línea de BLE (ojo: con un teclado HID conectado, iOS oculta el teclado en pantalla [sin verificar]). Sylvac expone además servicios GATT propios; Mitutoyo U-WAVE manda a su app U-WAVEPAK-BM; a un calibre barato se le agrega un ESP32 que emula teclado. En láser, Bosch GLM tiene protocolo relevado solo por la comunidad y algunos Leica DISTO traen modo teclado; para placas de hasta 800 mm alcanza la cinta.

**4. Códigos impresos.** El QR de Schneider abre la página Go2SE con referencia comercial, características y documentos (documentado en Masterpact y TeSys Giga; en Easy9, GV2 y LC1E queda [sin verificar]). Siemens migra a ID Link (IEC 61406): QR con marco y triángulo abajo a la derecha, con artículo y número de serie. Schneider tiene API de catálogo (OAuth, datos ETIM); el acceso para un taller chico queda [sin verificar]. Taxnele, Jieli, BAW, AG y Etheos no ofrecen nada de esto: el camino es foto del frente → modelo leído → búsqueda del PDF → dimensiones con cita de página → confirmación con calibre.

**5. As-built automático: evidencia floja.** Una tesis de Chalmers que verificaba montaje en riel DIN con YOLO concluyó que no identificaba los componentes de forma confiable; los trabajos sobre borneras usan pipelines de tres etapas y sufren la oclusión entre bornes. La documentación de Claude advierte que coordenadas y conteos son aproximados. Conviene invertir el problema: la app ya conoce el diseño, así que alinea la foto, recorta cada slot y pregunta "¿hay un GV2ME08 acá?, ¿qué dice la etiqueta?". En series, el tablero n.º 1 aprobado queda como patrón. Los termocontraíbles ("PE1-GMS1") requieren fotos de cerca.

**6. Costo (API de Claude).** Una imagen cuesta ⌈ancho/28⌉×⌈alto/28⌉ tokens, con tope de 4.784 (lado mayor 2.576 px). Alta de un componente (2 fotos + ~1.000 tokens de salida): ~US$ 0,06 con Opus 5.5 (US$ 4/20 por millón), ~0,03 con Sonnet 5.5, ~0,002 con Haiku 5.5. QA de un tablero con 9 fotos: ~US$ 0,25 / 0,12 / 0,01. Los tokens de razonamiento se suman aparte. Pocos dólares por mes para un taller chico. Empezar con el modelo más capaz y bajar solo si una prueba con 30 fotos reales mantiene el acierto.

**7. Privacidad y uso sin internet.** La API borra entradas y salidas dentro de los 30 días y no entrena con ellas sin permiso. La clave nunca va en el celular: hace falta un proxy mínimo. Homografía, marcadores, códigos, quitar fondo (@imgly corre en el navegador; revisar licencia [sin verificar]) y el 2D/3D funcionan offline; lo que usa LLM se encola. Voz: Web Speech anda en Safari pero es incierto en PWA instalada; SpeechAnalyzer (iOS 26, en el dispositivo) exige app nativa.

## Flujo A: alta de un componente en 30 segundos
1. **Foto del frente**, aparato apoyado sobre fondo liso y sin sostenerlo (el recorte de sujeto de iOS fusiona mano y objeto), con la tarjeta al lado. (5 s)
2. En paralelo, zxing-wasm busca QR/DataMatrix/EAN y la visión devuelve JSON con marca, modelo, valores nominales y categoría. Si el modelo ya está en la biblioteca, se ofrece "agregar unidad" y termina acá. (5 s)
3. **Tres lecturas de calibre** (ancho, alto, profundidad): cada una cae en su campo y salta al siguiente. Sin calibre Bluetooth, se tipean. (15 s)
4. Confirmar la ficha, con los campos de baja confianza resaltados. (5 s)
5. En segundo plano: quitar fondo, enderezar con 4 puntos, escalar al ancho×alto medidos y aplicar como textura a un prisma 3D; buscar la hoja de datos y avisar si sus dimensiones difieren más de 1 mm.

## Flujo B: relevar una placa de montaje
1. Medir **ancho y alto con cinta** y cargarlos, junto con el número escrito a mano en la placa.
2. Apoyar una regla de acero como testigo. Foto de frente, centrada, 1x o tele, desde 1,5–2 m, sin flash sobre el galvanizado.
3. Tocar las 4 esquinas (ArUco automático en E2). La app muestra la ortofoto a escala.
4. **Control:** medir la regla sobre la ortofoto; si el error supera 2 mm, repetir.
5. Calcar: cada riel con dos toques (la app ajusta a 35 mm), cada cablecanal como rectángulo, bornera inferior, agujeros.
6. Confirmar con cinta dos o tres cotas entre rieles.
7. Guardar como **plantilla de la serie**: los tableros 2 y 3 la reutilizan y solo sacan la foto de control.

## Fuentes
Solo se pudo abrir platform.claude.com; los demás hosts están fuera de la red permitida y sus datos provienen de resúmenes de búsqueda.

- https://platform.claude.com/docs/en/build-with-claude/vision
- https://platform.claude.com/docs/en/manage-claude/api-and-data-retention
- LiDAR: https://link.springer.com/10.1038/s41598-021-01763-9
- Measure: https://www.slashgear.com/1884872/how-accurate-iphone-measuring-app/
- RoomPlan: https://developer.apple.com/forums/thread/771832
- Object Capture: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11637407/
- Homografía/ArUco: https://forum.opencv.org/t/calculating-2d-dimensions-on-object-using-aruco/7686 · https://forum.opencv.org/t/using-aruco-from-opencv-js/13277 · https://cdn.jsdelivr.net/npm/js-aruco2@2.0.0/README.md
- Módulo DIN: https://www.metz-connect.com/virtuelle-welt/din-rail-housing-for-building-installation-and-modular-installation-de-vices.1aa.en.html
- iOS web: https://caniuse.com/webxr · https://bugs.webkit.org/show_bug.cgi?id=101034 · https://caniuse.com/mdn-api_barcodedetector · https://caniuse.com/web-speech · https://firt.dev/notes/pwa-ios/
- zxing-wasm: https://cdn.jsdelivr.net/npm/zxing-wasm@3.1.3/README.md
- Calibres: https://0l.de/blog/2026/04/sylvac-freecad-input/ · https://www.manualslib.com/manual/3083058/Garant-412780.html?page=11 · https://hackaday.com/2023/03/11/a-fancy-connected-caliper-for-not-a-lot · https://apps.apple.com/us/app/-/id1503266464
- Láser: https://github.com/piannucci/pymtprotocol · https://shop.leica-geosystems.com/global/disto-support
- Schneider: https://community.se.com/t5/Solutions-for-Motor-Management/All-you-need-to-know-about-TeSys-Giga-QR-code-is-more-than/td-p/366219 · https://api-explorer.se.com/en/api/product-catalog-v2
- Siemens: https://mall.industry.siemens.com/mall/en/WW/Catalog/Products/10349984
- Fondo: https://npmjs.com/package/@imgly/background-removal · https://wwdcnotes.com/notes/wwdc23/10176
- Detección: https://odr.chalmers.se/bitstreams/d3175ce1-c3dd-400a-b003-7359b04c254b/download · https://mdpi.com/1424-8220/23/18/7739 · https://link.springer.com/10.1007/s00138-025-01770-0
- Voz nativa: https://developer.apple.com/videos/play/wwdc2025/277/
