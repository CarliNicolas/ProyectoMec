# 01 · Qué muestran las fotos

> Parte del [plan de acción](README.md). Es la revisión detallada de las 48 fotos: qué tableros son, qué llevan, cómo están armados y qué problemas se ven. De acá salen el tablero de referencia de la app y la mayoría de las funciones propuestas.
> Índice foto por foto: [anexo F](anexos/F-indice-de-fotos.md).

## Cómo se hizo la revisión y qué confianza tiene

- Se leyeron las **48 fotos una por una**, ampliando recortes para los textos chicos (referencias, calibres, marcadores de cable, direcciones MAC). En total quedaron 519 lecturas de aparatos.
- Los modelos listados abajo como **confianza alta** fueron leídos igual por dos o más revisiones independientes de fotos distintas. La verificación adversarial automática que estaba prevista no llegó a correr; lo dudoso está marcado.
- **Ninguna foto tiene una referencia de escala** (regla, cinta, tarjeta). Todas las medidas en mm son estimaciones contando módulos DIN, con error de ±6 % o más. Hay que medirlas.
- No había ningún plano ni esquema: el significado de las siglas (SOP, BOM, GMS, AG, D, A, T) y la lógica de control son **deducciones** a partir de los rótulos y del recorrido visible de los cables.

## 1. No es un tablero: es una familia

En las fotos hay cinco tableros distintos del mismo taller. Cuatro son el mismo producto con distinta cantidad de unidades.

| Tablero | Fotos | Estado | Qué aporta |
|---|---|---|---|
| **2 unidades, terminado**, en gabinete metálico con visor | IMG_7727 a 7731 | Terminado y rotulado | Muestra **cómo queda el producto final**: carteles de color sobre las tapas del cablecanal, sticker-leyenda de la bornera, logo MEC |
| **4 unidades**, placa marcada «3» | IMG_7732 a 7736 | En armado | Misma placa y mismo layout que el de 5; un contactor de otro modelo |
| **5 unidades**, placa marcada «1» | IMG_7738 a 7745 y, probablemente, 7746 a 7761 | Cableado, en prueba, con cable de red en el primer PLC | Detalle de cableado, marcadores y bornera |
| **5 unidades**, placa marcada «2» | IMG_7762 a 7773 | Cableado completo, tapas puestas, sin tensión | Mejores vistas generales |
| **Gabinete plástico**, otro diseño | IMG_7721 a 7726 | Cableado, **sin ninguna etiqueta** | 6 guardamotores, 3 contactores modulares, 3 temporizadores; mismos criterios constructivos |

Conclusiones que cambian el diseño de la app:

1. **El producto es modular.** Cada enfriador evaporativo agrega el mismo juego de aparatos, bornes, cables y etiquetas. Con 2, 4 o 5 unidades solo cambia cuántas veces se repite.
2. **Se fabrica en series cortas numeradas a mano** («1», «2», «3» en marcador sobre la placa), con notas manuscritas al lado («Negro…», «Rojo cdo», «5», «15» sobre los rieles).
3. **Los ejemplares de una misma serie no son idénticos**: cambian modelos de contactor, colores de bornes y etiquetas presentes.

## 2. Qué controla y cómo se repite

Tablero de control para **enfriadores evaporativos**. Por cada enfriador (una "unidad"):

| Función | Aparatos | Etiqueta |
|---|---|---|
| Soplador trifásico | Guardamotor 2,5–4 A con contactos auxiliares + contactor | SOPn |
| Bomba de recirculación monofásica | Termomagnética 1P+N C10 + protector de tensión y corriente + contactor | BOMn |
| Drenaje | Termomagnética 1P+N C2 + relé enchufable con zócalo | (sin etiqueta; cable PQ3-Dn) |
| Nivel de agua por electrodos | Controlador de nivel | (sin etiqueta; cable PE3-AGn) |
| Control | Un PLC Siemens LOGO! por unidad | (sin etiqueta) |
| Salida a campo | 12 bornes en 4 grupos | (sin numerar) |

Fijos, sin importar la cantidad de unidades: interruptor general y diferencial tetrapolares, bloque de distribución, termomagnética de mando, controlador de temperatura, relé de alarma, bornes de acometida y bornes comunes. Los tableros de 4 y 5 unidades suman un segundo interruptor tetrapolar con relé de control de fases y contactor modular, y un relé WiFi Shelly.

### Regla por cantidad de unidades (estimada sobre el tablero de 2)

| | Por cada unidad | Fijo |
|---|---|---|
| Riel de protecciones | 81 mm (guardamotor 45 + 2 termomagnéticas de 18) | 245 mm |
| Riel de control | 170 mm (PLC 72 + protector 36 + nivel 35 + relé 27) | 63 mm |
| Riel de contactores | 90 mm (2 × 45) | — |
| Bornera | 77 mm (12 bornes + 4 separadores) | 95 mm |
| **Total de riel** | **≈ 417 mm** | **≈ 400 mm** |

`Largo de riel ≈ 400 + 417 × N` mm. Para N = 2 da 1.234 mm y lo medido sobre la foto fue 1.246 mm. Además: relés = N + 1, contactores = 2 × N, bornes ≈ 10 + 12 × N. Es una estimación por foto, pero muestra que **el tablero se puede generar a partir de un número**.

## 3. Inventario del tablero de 5 unidades

Medidas de catálogo (ancho sobre riel × alto × profundidad, mm) tomadas de fichas de fabricante y distribuidores; lo marcado «medir» no tiene dato confiable. Detalle y fuentes: [anexo D](anexos/D-datos-de-componentes.md).

| Componente | Marca y referencia leída | Cant. | Medidas | Lectura |
|---|---|---:|---|---|
| Interruptor general 4P | Schneider Easy9 MCB C40, 4500 A — EZ9F34440 | 1 | 72 × 81 × 66,5 | Media: la palanca tapa parte de la referencia |
| Diferencial 4P | Schneider Easy9 RCCB 63 A 30 mA, tipo AC — EZ9R36463 | 1 | 72 × 82 × 72 | Alta |
| Bloque de distribución 4P | JIELI 407 — 125 A, Ui 500 V, Ipk 20 kA, apriete 2 N·m | 1 | ≈ 67 × 87 × 51 · medir | Alta |
| Guardamotor | Schneider TeSys GV2ME08C, 2,5–4 A, con bloque auxiliar (21-22 / 13-14) | 5 | 45 × 89 × 78 | Alta, aunque la etiqueta SOP tapa media referencia |
| Interruptor 4P secundario | Schneider C60N C6, 400 V, 6000 A | 1 | ≈ 72 × 81 × 73 | Media-alta: un revisor dudó entre C6 y C8 |
| Relé de control de tensión trifásica | BAW RUT34-2MD (bornes L1 L2 L3 N; contactos 11-12 y 13-14) | 1 | 2 módulos ≈ 36 · medir | Alta |
| Contactor modular | ETHEOS CMB-025A, 2 polos, 25 A, bobina 230 V | 1 | 1 módulo ≈ 18 · medir | Alta |
| Termomagnética de bomba 1P+N | Eaton xPole PLN6-C10/1N | 5 | 17,5 × 80 × 75 | Alta |
| Termomagnéticas 1P+N | JIELI «HD» C2 (5) y C4 (1), 4500 A | 6 | ≈ 18 × 81 × 72 · medir | Alta |
| PLC | Siemens LOGO! 230RCE: 8 entradas, 4 salidas a relé 10 A, Ethernet | 5 | 71,5 × 90 × 60 | Alta; las MAC se leen en la etiqueta de cada equipo |
| Controlador con sonda | BAW PTD2 (bornes T1, T2, Alarma). En el tablero de 2 unidades está rotulado «sensor electrónico de temperatura» | 1 | 2 módulos ≈ 36 · medir | Media |
| Protector de tensión y corriente | TAXNELE TVPS1-40C, 40 A | 5 | 35 × 85 × 65 · medir (las fuentes no coinciden) | Alta |
| Controlador de nivel por electrodos | AG CN-3R, 220 V, salida a relé 10 A | 5 | ≈ 35 de ancho · medir (sin ficha publicada) | Alta |
| Relé WiFi | Shelly Gen4 de un canal (bornes O, I, SW, 12V, L, N) sobre **soporte hecho en el taller** | 1 | 37 × 42 × 16 + soporte ≈ 45–48 | Media: no se lee el modelo exacto |
| Relé enchufable con zócalo | Schneider RXM 230 VAC | 6 | conjunto ≈ 27 × 79 × 78,5 | Alta; el sufijo de la referencia no se lee |
| Contactor | Schneider Easy TeSys LC1E0910 | 10 | 45 × 74 × 80 | Alta |
| Barra de tierra | Verde, a la izquierda de los contactores | 1 | medir | — |
| Bornes de acometida | A tornillo, R S T N y tierra | 5 | medir | Sin marca legible |
| Bornes de paso a resorte | 12 por unidad + comunes; gris, celeste, rojo o naranja, verde-amarillo | ≈ 65–70 | 5,2 de paso (2,5 mm²) · confirmar | Sin marca legible; riel marca Zoloda |
| Separadores y topes | Placas amarillas entre grupos, topes grises | ≈ 25 | — | — |
| Cablecanal ranurado gris con tapa | Marco perimetral y un tramo entre cada fila | ≈ 9 tramos | ≈ 40 mm de ancho · medir alto | — |
| Placa de montaje galvanizada | — | 1 | **≈ 700 × 950 · medir** | Estimación de dos revisiones |
| Consumibles | Cable Kalop Kaloflex 1,5 mm² (caja visible), punteras de colores, termocontraíble amarillo y blanco impreso, precintos negros con bases | — | — | — |

## 4. Distribución por filas (tablero de 5 unidades)

Anchos de catálogo sumados; da ≈ 560 mm ocupados por fila, que coincide con lo estimado sobre la foto.

| Fila | De izquierda a derecha | Ocupación estimada |
|---|---|---:|
| 1 · Cabecera | General 4P · diferencial 4P · bloque de distribución · 5 guardamotores (SOP1–SOP5) · interruptor 4P C60N · relé de tensión BAW · contactor modular | ≈ 562 mm |
| 2 · Protecciones y PLC | 5 termomagnéticas Eaton · 6 JIELI · 5 LOGO! | ≈ 553 mm |
| 3 · Control | BAW PTD2 · 5 protectores Taxnele (BOM1–BOM5) · 5 controladores de nivel · Shelly · 3 relés (drenaje 1 a 3) | ≈ 515 mm |
| 4 · Contactores | Barra de tierra · 10 contactores alternados SOP1, BOM1, SOP2, BOM2… · 3 relés (drenaje 4, 5 y alarma) | ≈ 551 mm |
| 5 · Bornera | Acometida · 5 grupos de 12 bornes · comunes | ≈ 480–520 mm |

Entre los aparatos y el cablecanal queda muy poco lugar (5 a 20 mm en varias filas): el cable sale del borne y entra casi directo a la ranura, y el marcador queda apretado o girado.

## 5. Nomenclatura de los marcadores de cable

Es propia del taller y es coherente con las 8 entradas y 4 salidas del LOGO!. **Amarillo = entradas, blanco = salidas.** La «n» es el número de unidad.

| Borne del PLC | Marcador | Qué es (deducido) |
|---|---|---|
| I1 | `PE1-GMSn` | Contacto auxiliar 21-22 del guardamotor del soplador |
| I2 | `PE2-GMBn` | Salida del protector de la bomba |
| I3 | `PE3-AGn` | Contacto del controlador de nivel |
| I4 | — | Libre |
| I5 | `PE5-⊗Sn` | Auxiliar 14 NO del contactor del soplador (confirmación de marcha) |
| I6 | `PE6-⊗Bn` | Auxiliar del contactor de la bomba |
| I7 | `PE7-⊗Dn` | Relé de drenaje |
| I8 | `PE8-T…` | Señal común; un solo cable «PE8-T1-2-3-4-5» pasa por el BAW PTD2 y el Shelly |
| Q1 | `PQ1-Sn` | Bobina del contactor del soplador, pasando por el auxiliar 13-14 del guardamotor |
| Q2 | `PQ2-Bn` | Bobina del contactor de la bomba |
| Q3 | `PQ3-Dn` | Bobina del relé de drenaje |
| Q4 | `PQ4-A` | Alarma (un relé común a todo el tablero) |

Observaciones:

- El prefijo **`PE` se confunde con el conductor de protección** (tierra), que por norma se designa PE. Conviene aclararlo en la leyenda o cambiar el prefijo.
- Aparece `E8-Tn` en lugar de `PE8` en algún cable: inconsistencia de tipeo.
- Hay un marcador `PE5-⊗S3` corregido a mano con otro dígito encima, y uno igual descartado sobre la mesa.
- Cables de potencia, neutros y comunes **no llevan marcador**.
- El tablero de 2 unidades, más viejo, usa anillos numerados en lugar de esta nomenclatura.

## 6. Bornera: 12 bornes por unidad

Tomado del sticker-leyenda del tablero terminado:

| Bornes | Función | Detalle |
|---|---|---|
| R S T N ⏚ | Acometida | Bornes más grandes, a tornillo |
| 1 · 2 · 3 | Soplador 380 V | R, S, T |
| 4 | Tierra | Verde-amarillo |
| 5 · 6 | Bomba 220 V | Fase y neutro |
| 7 · 8 · 9 | Drenador 220 V | Cierra, abre, común |
| 10 · 11 · 12 | Sensor de agua por electrodos | Corto, largo 1, largo 2 |
| Comunes | Sonda de temperatura (2) y alarma 220 V (3) | Al final de la bornera |

En los tableros de 4 y 5 unidades **los bornes no están numerados** y todavía no tienen leyenda. Los colores cambian entre tableros (electrodos rojo/verde en uno y naranja en otro; neutros celestes en uno y grises en otro).

## 7. Colores y punteras observados

| Función | Color de cable |
|---|---|
| Fases | Rojo o bordó, blanco y negro |
| Neutro | Celeste / azul |
| Tierra | Verde-amarillo y, en algunos tramos, verde liso |
| Mando | Gris y blanco |
| Electrodos de nivel | Amarillo y salmón |
| Bombas | Rojo y azul |

- No es el código habitual en Argentina para instalaciones fijas (marrón, negro y rojo para las fases). Es un criterio propio: conviene dejarlo escrito como **perfil de colores del taller**.
- Las bombas monofásicas están repartidas entre fases: 1 y 2 en una, 3 y 4 en otra, 5 en la tercera.
- Punteras en todos los extremos, con color según sección: roja (≈ 1 mm²) en control, negra (≈ 1,5) en termomagnéticas y bombas, gris (≈ 2,5) en sopladores, marrón (≈ 10) en la acometida. Las secciones son estimadas por el color de la puntera, no leídas en el cable.
- Sin peines de conexión: todo el reparto va con cable por dentro del cablecanal.

## 8. Cómo queda rotulado el producto terminado

Visto en el tablero de 2 unidades:

- **Carteles impresos a color pegados sobre las tapas del cablecanal**, debajo de cada fila. Cada celda tiene el **ancho exacto del aparato** que tiene encima: «DIFERENCIAL GENERAL», «TÉRMICA GENERAL», «BARRA DE DISTRIBUCIÓN», «GUARDAMOTOR SOPLADOR 1», «BOMBA 1 | 2», «MANDO 220V», «DRENAJE 1 | 2», «CONTROLADOR ENFRIADOR EVAP. 1», «GUARDAMOTOR ELECTRÓNICO BOMBA NRO 1», «SENSOR ELECTRÓNICO DE AGUA NRO 1», «SENSOR ELECTRÓNICO DE TEMPERATURA», «RELÉ DRENAJE NRO 1», «RELÉ ALARMA 220 V», «CONTACTOR SOPLADOR 1», «CONTACTOR BOMBA RECIRC. 1».
- **Sticker-leyenda de la bornera** pegado en la placa, con una foto en miniatura de la propia bornera y la tabla de funciones.
- Logo MEC y sticker con datos de contacto sobre el canal superior.

Los tableros nuevos solo tienen las etiquetas provisorias de rotuladora (negro sobre amarillo, SOPn y BOMn). **Los carteles con el ancho de cada aparato y la leyenda se pueden generar solos desde el dibujo**: la app ya conoce el ancho y la posición de cada uno.

## 9. Método de trabajo que se deduce

1. Placa suelta sobre la mesa; se montan rieles y cablecanal formando un marco con un tramo entre cada fila.
2. Montaje de aparatos por fila, una fila por función.
3. Cableado de potencia de la cabecera y reparto.
4. Cableado de control: **se arma una unidad y se replica cambiando solo el número**.
5. Marcadores termocontraíbles impresos en cada cable de control; etiquetas amarillas en guardamotores, protectores y contactores.
6. Bornera inferior por grupos de color.
7. Prueba con alimentación provisoria y programación **PLC por PLC por Ethernet**, con un cable de red cruzado por delante del tablero.
8. Tapas de cablecanal, carteles y leyenda al final. Después, montaje en el gabinete.

Se trabaja en varios ejemplares a la vez, y el espacio libre de riel o las medidas de corte se anotan con fibrón sobre el propio riel o la placa.

## 10. Problemas vistos y qué función los evita

| Lo que se ve en las fotos | Dónde | Función de la app |
|---|---|---|
| Contactor de otro modelo mezclado: un LC1E1210 entre LC1E0910 (placa «3») y uno de la serie anterior «EasyPact TVS» (placa «1») | Fila de contactores | Coherencia de series y modelos (VAL-07), lista de modelos homologados (VAL-04), control del kit por código (MAT-04) |
| Falta la etiqueta BOM1 en protector y contactor; termomagnéticas, PLC, relés, controladores de nivel y cabecera sin identificar | Todo el tablero de 5 | Etiquetas duplicadas o faltantes (VAL-03), etiquetas de aparato en lote (ARM-03) |
| Etiquetas SOPn tapando la referencia y el QR del guardamotor; BOM5 despegándose; etiquetas torcidas | Guardamotores y protectores | Zona de etiqueta por componente (CAT-12) |
| Un tablero entero sin una sola etiqueta ni marcador | Gabinete plástico | Generador de nomenclatura (ELE-01), checklist de terminación (CAL-09) |
| Bornes sin numerar y sin leyenda | Bornera de 4 y 5 unidades | Diseñador de bornera (ELE-06), tira de numeración (ARM-14), leyenda (ARM-07) |
| Marcador corregido a mano y otro descartado; `E8` en vez de `PE8` | Cables de control | Marcadores generados desde la tabla de entradas y salidas (ELE-01, ELE-07) |
| Puente amarillo provisorio, sin punteras, entre 13 y 14 del relé de tensión: la protección queda anulada durante la prueba | Cabecera, lado derecho | Puentes provisorios pendientes (VAL-05) |
| Alimentación de prueba puenteando las tres fases | Placa «1» | Ídem, más checklist antes de liberar (CAL-09) |
| Dos cables en un mismo borne sin peine; reparto de neutro con empalmes sueltos dentro del canal | Guardamotores; canal bajo los PLC | Dos cables por borne y reparto (VAL-08), puentes y comunes |
| Soporte del Shelly improvisado con acrílico, tornillos y un clip, distinto en cada tablero | Fila de control | Piezas propias con instructivo (CAT-11) |
| Cablecanal sin tapa con el mazo desordenado; sobrantes de cable enrollados; un cable con el cobre a la vista sin conectar | Varias | Checklist de terminación con foto (CAL-09), fotos obligatorias por etapa (CAL-14) |
| Menos de 20 mm entre aparato y canal: marcadores apretados o girados | Varias filas | Aviso de espacio entre borne y canal (VAL-01) |
| Filas al 99 % de ocupación, sin reserva | Tablero de 2 unidades | Ocupación y reserva por riel (EDI-12) |
| Colores de fase propios y tierra en dos colores | Todo | Perfil de colores por proyecto (VAL-13) |
| Direcciones MAC solo en la etiqueta de cada PLC; puertos de red vacíos y sin switch | Fila de PLC | Ficha de ajustes y programa por ejemplar (CAL-13), plan de red (ELE-03) |
| Diferencias entre ejemplares de la misma serie | Placas «1», «2», «3» | Serie numerada con desvíos (SER-07), comparador contra el patrón (SER-05) |
| Medidas y notas escritas con fibrón en rieles y placa | Varias | Asistente de relevamiento (REL-01), lista de corte (MAT-06) |
| Fotos en ángulo, sin escala, alguna movida | Las 48 | Foto guiada con referencia de escala (REL-08) |
| Diferencial tipo AC con cargas electrónicas; un solo diferencial para todo el tablero | Cabecera | Reglas del [anexo C](anexos/C-reglas-y-checklists.md): a evaluar por el profesional responsable |

## 11. Diferencias entre variantes que la app debe dejar configurables

- Orden de cabecera: diferencial y después térmica en el de 2; térmica y después diferencial en los nuevos.
- Contactores agrupados por función (SOP1, SOP2, BOMBA1, BOMBA2) en el de 2; intercalados por unidad (SOP1, BOM1, SOP2, BOM2…) en los nuevos.
- Bornera compartiendo riel con los contactores (2 unidades) o en riel propio debajo del marco de canales (4 y 5).
- Canal vertical izquierdo parcial o completo.
- Opcionales: Shelly, bloque de control de fases con su interruptor y contactor modular, termomagnética de alarma.
- Soporte: placa suelta, gabinete metálico o gabinete plástico.

## 12. Lo que no se pudo determinar

Datos que hay que relevar en el taller antes de cargar el tablero de referencia en la app:

- Medidas reales de la placa, márgenes hasta el marco de cablecanal, altura de cada riel, sección (ancho × alto) del cablecanal y distancia libre hasta la puerta.
- Ancho real del bloque de distribución, del zócalo de relé, del soporte del Shelly, del protector Taxnele y del controlador de nivel AG.
- Marca y modelo de los bornes y de los topes.
- Secciones reales de cada cable.
- Significado confirmado de cada sigla y de las notas manuscritas.
- Función exacta del BAW PTD2, del relé de tensión con su contactor modular y del Shelly dentro de la lógica.
- Corriente de cada motor y regulación de cada guardamotor.
- Si el esquema eléctrico existe en algún formato.
