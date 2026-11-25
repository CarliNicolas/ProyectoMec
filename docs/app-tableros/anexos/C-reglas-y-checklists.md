# Normativa y reglas validables por la app (tableros BT y control, Argentina)

> Anexo del [plan de acción](../README.md). Es el informe de investigación tal como se produjo, con sus fuentes al final.
> Lo marcado **[sin verificar]** o **[sv]** no se pudo contrastar con la fuente primaria: hay que confirmarlo antes de usarlo como dato firme (en especial precios, compatibilidades y números de cláusula). Las menciones a «la sesión» o a «dominios no permitidos» se refieren a la sesión de investigación en la que se armó el informe, donde varias páginas solo se pudieron leer por su resumen de búsqueda.

**Alcance de la verificación.** La búsqueda web funcionó; la lectura directa de páginas no (hosts fuera de la red permitida: `argentina.gob.ar`, `editores-srl.com.ar`, `library.e.abb.com`, `mouser.lt`). Lo confirmado sale de resultados de búsqueda; **[sv]** = sin verificar en esta sesión (conocimiento propio, a contrastar con el texto de la norma). **O** = lo exige la norma citada (su fuerza legal depende de jurisdicción y contrato); **BP** = buena práctica.

Tres precisiones al planteo:
- IRAM 2183 no es norma de colores sino la ex norma de cables (hoy IRAM NM 247-3); los colores salen de AEA 90364-7-771 [sv cláusula].
- IRAM 2181 equivale a la vieja IEC 60439; la referencia actual para tableros es IEC 61439-1/-2.
- AEA e IEC 60204-1 usan colores distintos (rojo = L3 en AEA, mando CA en 60204-1): la app debe pedir un **perfil de colores por proyecto**.

## (a) Reglas automáticas

| # | Si… → entonces… | Origen · tipo |
|---|---|---|
| 1 | Faltan tensión, esquema de tierra, Icc presunta o In del tablero → bloquear documentación | IEC 61439-1 §5 · O |
| 2 | Icn/Icu de una protección < Icc presunta en su punto → error | AEA 771; IEC 60364-4-43 · O |
| 3 | No se cumple Ib ≤ In ≤ Iz (con agrupamiento y temperatura) → error | AEA 771; IEC 60204-1 Tabla 6 · O [sv] |
| 4 | In del motor fuera del rango del guardamotor (GV2ME08: 2,5–4 A) → error; exigir registrar el ajuste | Fabricante · O |
| 5 | Un guardamotor alimenta más de un motor (acá: 5 GV2 y 10 contactores) → advertir: la sobrecarga no protege cada motor | IEC 60204-1 §7.3 · O [sv] |
| 6 | El par guardamotor–contactor no figura en la tabla de coordinación del fabricante para esa Icc → advertir y pedir declarar tipo 1 o 2 (GV2ME08 figura con LC1D09/LC1K06; LC1E09 no confirmado) | IEC 60947-4-1 · O |
| 7 | Ie AC-3 del contactor < In del motor, o bobina ≠ tensión de mando → error | IEC 60947-4-1 · O |
| 8 | Σ corrientes aguas abajo × simultaneidad > In del general, diferencial o bloque de distribución → error | IEC 61439-1/-2 (RDF) · O |
| 9 | Diferencial con In menor que la protección de sobrecarga que lo cubre → error | IEC 61008 · O [sv] |
| 10 | Diferencial tipo AC con cargas electrónicas → sugerir tipo A | BP |
| 11 | Protecciones en serie con relación de In < 1,6–2 o misma curva → advertir: selectividad no garantizada, ver tablas | BP |
| 12 | Salida a relé (LOGO!, Shelly, CN-3R, RXM) supera su Ie inductiva o no tiene la protección máxima indicada → error | Fabricante · O |
| 13 | Bobina de contactor comandada por PLC sin supresor RC/varistor → sugerir | BP |
| 14 | Circuito de mando sin protección propia → error; perfil 60204-1 sin transformador de mando → advertir | IEC 60204-1 §7.2/9.1 · O [sv] |
| 15 | Seccionador general no apto para seccionar o no bloqueable (perfil máquina) → advertir | IEC 60204-1 §5.3 · O [sv] |
| 16 | Σ potencia disipada (fichas + cables) > potencia disipable del gabinete → advertir ventilación o gabinete mayor | IEC 61439-1 §10.10; IEC TR 60890 · O |
| 17 | Verificación térmica por cálculo y algún aparato cargado > 80 % de su In → advertir | IEC 61439-1 §10.10.4 · O [sv] |
| 18 | Ambiente > 35 °C media/40 °C máx. [sv] o sobre el límite del componente (LC1E: −5…55 °C) → advertir desclasificación | IEC 61439-1 §7.1 · O |
| 19 | Un componente invade la distancia libre mínima de su ficha → error | Fabricante · O |
| 20 | Contactor fuera de ±30° de la vertical (LC1E) → advertir | Fabricante · O |
| 21 | Elemento caliente debajo de PLC/electrónica → advertir | BP |
| 22 | Ocupación de riel DIN o bornera > 80 % → advertir falta de reserva | AEA 771.20 (20 %, fuente secundaria); BP 20–30 % |
| 23 | Llenado de cablecanal > 50 % (secciones externas reales) → error; > 40 % → aviso | NFPA 79 §13.5.2/Panduit; sin cifra IEC · BP |
| 24 | Distancia cablecanal–borne < 30–40 mm → advertir (no entra marcador ni curva) | BP |
| 25 | Radio de curvatura < 4×Ø o < dato del fabricante → advertir | Fabricante · BP |
| 26 | Potencia y señal (electrodos de nivel, entradas PLC, comunicación) en un mismo canal sin separador → advertir | Manual LOGO!; IEC 60204-1 Anexo H · BP |
| 27 | Bornes a < 0,2 m de la base, mandos > 2 m o seccionador fuera de 0,6–1,9 m → advertir | IEC 61439-1 §8.5; 60204-1 §5.3.4 · O [sv] |
| 28 | IP/IK del gabinete < el del ambiente (bombeo/tratamiento: húmedo, corrosivo, intemperie) o prensacables de menor IP → error | IEC 60529/62262; IRAM-IEC 62208 · O |
| 29 | Con puerta abierta quedan partes vivas accesibles (< IPXXB) → exigir cubrebornes o contrafrente | IEC 61439-1 §8.4 · O |
| 30 | Dispositivo Wi-Fi (Shelly) en gabinete metálico → advertir atenuación | BP |
| 31 | Color de aislación ≠ función según perfil; verde-amarillo fuera de PE o celeste fuera de N → error | AEA 771; IEC 60445 · O |
| 32 | Sección < mínima (potencia 0,75 mm², mando 0,2 mm² dentro de envolvente) → error | IEC 60204-1 Tabla 5 · O [sv] |
| 33 | Color de puntera ≠ sección según la serie elegida → error; largo de puntera ≠ pelado del borne push-in → advertir | DIN 46228-4 · BP |
| 34 | Dos conductores en un borne no previsto → error (puntera doble o puente); PE: uno por punto | IEC 61439-1 §8.6; 60204-1 §13.1 · O [sv] |
| 35 | Sección fuera del rango del borne (LOGO!: 1×2,5 o 2×1,5 mm²) → error | Fabricante · O |
| 36 | Falta registrar par de apriete por borne (GV2ME: 1,7 N·m; LOGO!: 0,4–0,5 N·m) → no cerrar el control | Fabricante; IEC 61439-1 §11.6 · O |
| 37 | PE < tabla (S ≤ 16 → S; 16 < S ≤ 35 → 16; S > 35 → S/2) → error | IEC 60364-5-54 Tabla 54.2 · O |
| 38 | Placa de montaje, puerta, riel o gabinete metálico sin vínculo a barra PE → error | IEC 61439-1 §8.4.3 · O |
| 39 | N y PE unidos dentro del tablero en esquema TT → error | AEA 771 · O [sv] |
| 40 | Neutro compartido entre circuitos de distintos diferenciales → error | AEA 771 · O [sv] |
| 41 | Componente sin designación única o distinta a la del esquema → error | IEC 81346-1/-2 · O |
| 42 | Conductor sin marcador en ambos extremos o que no coincide con el esquema → error | IEC 60204-1 §13.2 · O [sv] |
| 43 | Código de cable que empieza con PE, N o L1–L3 sin ser ese conductor (caso "PE1-GMS1") → advertir ambigüedad con designaciones reservadas | IEC 60445 · BP |
| 44 | Bornes sin numerar o sin separador/tapa final entre tensiones distintas → advertir | IEC 60445 · BP |
| 45 | Falta placa de características (fabricante, tipo, N.º de serie único, fecha, norma) → bloquear entrega; en series, autonumerar | IEC 61439-1 §6.1 · O [sv] |
| 46 | Faltan esquemas, layout, lista de bornes, lista de materiales o protocolo firmado → bloquear entrega | IEC 61439-1 §6.2; 60204-1 §17 · O |
| 47 | Componente de 50–1000 Vca sin certificado de seguridad cargado (marcas poco difundidas) → advertir | Res. 169/2018 y modificatorias · O |
| 48 | Pulsador de color no admitido (marcha: blanco/gris/negro/verde, nunca rojo; parada: negro/gris/blanco, nunca verde; emergencia: rojo sobre fondo amarillo; reset: azul) → advertir | IEC 60204-1 §10.2.1 · O |
| 49 | El tablero N.º k de la serie difiere del patrón (materiales, posiciones, etiquetas) → listar diferencias | BP |

## (b) Plantillas generables

**Control de calidad** (por tablero; cada ítem: OK / No OK / N.A., foto, responsable, fecha), ordenado según las verificaciones de rutina de IEC 61439-1 §11 [sv numeración]:
1. Conformidad con plano y lista de materiales (modelo, calibre, bobina).
2. Grado de protección: prensacables, tapas, juntas.
3. Distancias en aire y de fuga; cubrebornes.
4. Circuito de protección: vínculos PE de placa, puerta y riel.
5. Montaje: distancias libres, topes de riel.
6. Cableado: secciones, colores, punteras, radios, llenado de canal, muestreo de aprietes con torquímetro.
7. Bornes para conductores externos: cantidad, numeración, PE/N.
8. Accionamiento mecánico: manijas, puerta, enclavamientos.
9. Identificación: componentes, cables en ambos extremos, placa, señal de riesgo eléctrico.
10. Ajustes registrados: guardamotores, relé de fases, protectores de tensión, temporizador, versión del programa LOGO!.

**Protocolo de ensayo final (FAT).** Encabezado: cliente, obra, N.º de serie, revisión de plano, instrumentos (modelo, serie, calibración), ejecutor y profesional responsable.
- **Inspección visual:** resultado del control de calidad.
- **Continuidad de PE:** cada masa contra la barra PE, con 0,2–10 A (IEC 60204-1 §18.2.2); criterio ≤ 0,1 Ω (IEC 61439-1 §10.5.2 [sv]).
- **Aislación:** 500 Vcc entre circuitos y masa; ≥ 1000 Ω/V (61439-1) y ≥ 1 MΩ (60204-1). Antes, desconectar electrónica y descargadores (LOGO!, Shelly, protectores, controladores de nivel, temporizador).
- **Rigidez dieléctrica:** 1 s sin descarga, a la tensión de tabla según Ui (1890 Vca para 300 < Ui ≤ 690 V [sv]). Se admite reemplazarla por la medición de aislación si la protección de entrada es ≤ 250 A (ed. 2011) o ≤ 630 A (ed. 2020).
- **Funcional, por canal (×5):** botón de prueba del diferencial; disparo del guardamotor; falta e inversión de fase; sub/sobretensión; simulación de electrodos de nivel; temporizaciones; entradas y salidas del LOGO!; enclavamientos; mando remoto.
- **Cierre:** valores medidos, fotos, observaciones, firmas.

## (c) Tablas para precargar

| Función | AEA 90364 (instalación fija) | IEC 60204-1 (máquinas, recomendado) |
|---|---|---|
| L1 / L2 / L3 | marrón / negro / rojo [sv asignación] | negro |
| N | celeste | azul claro |
| PE | verde-amarillo | verde-amarillo |
| Mando CA / CC | sin asignación: fijar criterio del taller | rojo / azul |
| Circuitos exceptuados (alimentación externa) | — | naranja |

| mm² | DIN 46228-4 | "Francesa" (T, NF C 63-023) | "Alemana" (W) |
|---|---|---|---|
| 0,5 | blanco | blanco | naranja |
| 0,75 | gris | azul | blanco |
| 1 | rojo | rojo | amarillo |
| 1,5 | negro | negro | rojo |
| 2,5 | azul | gris | azul |
| 4 | gris | naranja | gris |
| 6 | amarillo | verde | negro |
| 10 | rojo | marrón | marfil |
| 16 | azul | marfil | verde |

Confirmadas por búsqueda: 0,5; 0,75; 1 y 2,5 mm²; el resto [sv]. Los proveedores intercambian los rótulos "alemana"/"DIN": conviene guardar el color **por artículo**, no solo por serie.

## (d) Advertencia

La app **asiste, no certifica**. Las reglas son simplificaciones que no cubren todas las ediciones ni condiciones de cada norma, y los datos de fabricante cambian. El diseño, la verificación según IEC 61439/AEA 90364, los ensayos y la firma del protocolo son responsabilidad de un **profesional matriculado con incumbencia**; ninguna validación en verde lo reemplaza ni habilita a energizar. Cada informe debería decirlo e indicar la versión de reglas usada.

## Fuentes

- Res. 169/2018: https://www.boletinoficial.gob.ar/detalleAviso/primera/180830/20180328 · https://www.argentina.gob.ar/normativa/nacional/norma-396676/texto · https://www.editores-srl.com.ar/print/5778
- AEA 771.20, IRAM: https://www.editores-srl.com.ar/print/6116 · https://editores-srl.com.ar/sites/default/files/ie349_si_farina_tableros_electricos_parte_5.pdf · https://servidos.ar/calculadora-tablero-electrico · https://servidos.ar/referencia-electrica-argentina
- IEC 61439 / 60890: https://myelectrical.com/notes/entryid/125/iec-61439-verification-methods · https://blog.se.com/energy-management-energy-efficiency/2016/03/04/what-iec-61439-1-2-mean-for-your-low-voltage-equipment-specifications · https://www.elektroda.com/rtvforum/topic4144249.html · https://community.se.com/t5/Power-Distribution-and-Digital/IEC-61439-for-LV-equipment-April-16th-2020-webinar-Maximum/td-p/194991 · https://webstore.iec.ch/publication/66007
- IEC 60204-1: https://www.se.com/uk/en/faqs/FA28043/ · https://engx.theiet.org/cfs-file/__key/telligent-evolution-components-attachments/00-04-00-00-00-02-12-30/infoplc_5F00_net_5F00_tinfo12.pdf · https://metrel.si/en/solutions/machinessafety/machines-and-fixed-connected-loads-safety · https://renishaw.com/cmmsupport/knowledgebase/en/testing-and-verification--13862
- Coordinación y PE: https://viox.com/es/type-1-vs-type-2-coordination-motor-starter/ · https://www.electrical-installation.org/enwiki/Sizing_of_protective_earthing_conductor · https://core.ac.uk/download/83568307.pdf
- Fabricantes: https://www.farnell.com/datasheets/3360933.pdf · https://www.sparkydirect.com.au/assets/brochures/GV2ME08.pdf · https://www.manualslib.com/manual/1382742/Siemens-Logo.html?page=23 · https://www.slideshare.net/HoangPhuong67/easy-pacttvs-catalogues-lc1e-243745294
- Cablecanal y punteras: https://zoro.com/static/cms/enhanced_pdf/Panduit%20Sales%20Corp_c5117ab70a7736dc4f5213eb0dab7ba4340d69ee.pdf · https://www.mouser.lt/pdfdocs/PhoenixContact-Tables_colour.pdf · https://stex24.com/guide/wire-ferrules
