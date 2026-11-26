# Software existente para diseño y armado de tableros: qué copiar y qué evitar

> Anexo del [plan de acción](../README.md). Es el informe de investigación tal como se produjo, con sus fuentes al final.
> Lo marcado **[sin verificar]** o **[sv]** no se pudo contrastar con la fuente primaria: hay que confirmarlo antes de usarlo como dato firme (en especial precios, compatibilidades y números de cláusula). Las menciones a «la sesión» o a «dominios no permitidos» se refieren a la sesión de investigación en la que se armó el informe, donde varias páginas solo se pudieron leer por su resumen de búsqueda.

> **Verificación.** Datos de búsquedas web (nov-2026). La lectura directa de páginas falló: `eplan.com` y `qelectrotech.org` no están en los dominios permitidos de la sesión (hay que habilitarlos para releerlas). Lo no confirmado en fuente primaria va como **[sin verificar]**. Casi ningún proveedor publica precios.

**Dato que ordena las prioridades:** el estudio "Schaltschrankbau 4.0" (ISW, Univ. de Stuttgart, 2017), citado por EPLAN y Komax, mide 54 h promedio de cableado, el 49 % del tiempo de fabricación. La app rinde más atacando cableado y búsqueda de información que el dibujo.

## (a) Tabla comparativa

| Herramienta | Qué hace | Precio / licencia | Qué le falta para un taller chico argentino |
|---|---|---|---|
| EPLAN Pro Panel (+Electric P8) | Gemelo 3D del gabinete, ruteo con largos de cable, perforado/NC | Sin lista pública; un tercero estima 8.000–14.000 €/año por puesto [sin verificar]; desde 2026 se vende en paquetes | Costo, curva de aprendizaje, Windows; exige artículos con macro 3D que Taxnele, BAW, AG o Jieli no tienen |
| EPLAN Smart Mounting / Smart Wiring | Asistentes en navegador/tablet: montaje riel → cablecanal → componentes con vista 3D; cableado cable por cable (origen, destino, color, sección, recorrido) con semáforo rojo/verde; importa listas Excel de otros ECAD | Suscripción por cotización | Dependen del gemelo de Pro Panel y de un servidor |
| EPLAN eVIEW Free | Visor en la nube: redlining, marcado de avance y AR (Vuforia) | Gratis con registro | Solo visor de proyectos EPLAN |
| Rittal RiPanel / RiCS; Wire Terminal WT C | Configurador online de gabinetes con cortes en 3D e importación DXF/DWG; máquina que corta, pela, crimpa y rotula 36 cables distintos (0,5–6 mm²; WT C5 ≈285 cables/h) | Configurador gratis con cuenta; máquina por cotización | Solo catálogo Rittal; máquina fuera de escala |
| WSCAD ELECTRIX Cabinet Engineering + Cabinet AR | ECAD con módulo de gabinete; app iOS/Android que escanea un QR pegado al componente y muestra datos, esquema, 3D y redlines | ECAD sin precio público (terceros: US$ 84–250/mes [sin verificar]); app gratis | La app solo consume proyectos WSCAD |
| SEE Electrical 3D Panel+ | Colocación sobre riel DIN, plantillas de perforado, CNC; módulo Manufacturing con ruteo y largo óptimo; DWG/DXF, STEP, STL | Por cotización | Escritorio, sin guía móvil de taller |
| Zuken E3.panel (+WiringCockpit, AssemblingCockpit, WiringChecks) | Layout 2D/3D con zonas prohibidas, autoruteo con segregación y control de llenado de cablecanal, salida a Komax/Perforex, guía de secuencia y verificación de cableado | Por cotización | Sobredimensionado |
| AutoCAD Electrical | Esquemas + layout de panel 2D; exporta borneras a configuradores de fabricante | Incluido en AutoCAD: ≈US$ 2.095/año | Sin 3D ni asistente de taller |
| SolidWorks Electrical 3D | Layout 3D y ruteo sincronizados con el esquema | ≈US$ 3.494/año Schematic Pro + igual el add-on 3D + SolidWorks CAD (dato de tercero) | Tres licencias para un solo problema |
| QElectroTech | Esquemas libres (GPL), colección de símbolos, editor de borneras (0.100, según changelog), plugin qet_tb_generator | Gratis | Sin layout de placa ni 3D; DXF con problemas reportados en su foro |
| Schneider Power Build-Rapsody / eDesign / Ecoreal | Configuración, vista frontal y cotización de tableros Prisma (Ecoreal: media tensión) | Descarga con registro; gratuidad [sin verificar] | Distribución, no control; solo Schneider |
| ABB e-Design (DOC, CAT) / e-Configure | Dimensionamiento, configuración de tableros y BOM; e-Configure es online | Gratuidad [sin verificar] | Solo ABB |
| Hager Ready / hagercad | App iOS/Android: arma el tablero por rieles, genera etiquetas y unifilar, valida norma | Ready gratis; hagercad pago tras 30 días | Solo Hager, norma francesa NF C 15-100, tableros modulares |
| Siemens TIA Selection Tool / SIMARIS | Selección y configuración de producto Siemens (nube u offline); SIMARIS dimensiona redes | Gratis con cuenta [sin verificar] | Solo Siemens; la exportación a EPLAN habría sido retirada en 2025.5 [sin verificar] |
| Phoenix PROJECT complete / clipx ENGINEER (+assemble) | Borneras + marcado; add-on que guía al operario paso a paso y maneja pick-by-light | PROJECT complete gratis; add-on con suscripción anual | Solo borneras Phoenix |
| Weidmüller Configurator (WMC) | Borneras con chequeo de plausibilidad, STEP y DXF/DWG, textos de marcadores hacia M-Print PRO, pedido armado | Gratis (escritorio y nube) | Solo Weidmüller |
| WAGO Smart Designer | Configurador 3D en navegador; importa de EPLAN/WSCAD/E3; exporta lista de partes con fotos y modelo 3D | Gratis | Solo WAGO |
| Komax Zeta + DLW, Z+F EVOCRIMP, Steinhauer PWA (nVent) | Prefabricado: cables cortados, con puntera, rotulados origen/destino en ambos extremos y entregados en secuencia de cableado; importan CSV/XLS. Komax declara hasta 64 % de ahorro en lote 1 y 80 % en serie | Bienes de capital, por cotización | No se amortiza con series de 3; sí conviene copiar la lista secuenciada |
| MES / instrucciones digitales (Tulip, VKS, Dozuki, ELAM, SafetyCulture) | Pasos con fotos, checklists, firmas, trazabilidad | Tulip US$ 100–250/interfaz/mes; Dozuki ≈US$ 850/mes mínimo; SafetyCulture gratis hasta 10 usuarios y 5 plantillas (datos de terceros) | Genéricos: no conocen riel, bornes ni cables |

## (b) Funciones a copiar (33)

**Catálogo**
1. Ficha por componente: marca, código, ancho/alto/profundidad, fijación (riel DIN o placa).
2. Foto real + silueta 2D + caja 3D (modelo STEP opcional).
3. Bornes nombrados y posicionados sobre la foto.
4. Accesorios vinculados (zócalo de relé, contactos auxiliares, peines).
5. Alta rápida desde el celular e importación masiva por planilla.
6. Favoritos y "usados en este cliente".

**Layout de placa**
7. Placa a escala con rieles y cablecanales paramétricos.
8. Imán al riel y contador de mm ocupados/libres por fila.
9. Detección de choques y zonas prohibidas.
10. Reglas de separación (potencia/mando, borne–cablecanal).
11. Vistas 2D y 3D sincronizadas.
12. Plantilla de perforado 1:1 y lista de corte de riel y cablecanal.
13. Macros reutilizables ("arranque de bomba" ×5) y variantes.

**Cableado**
14. Lista de conexiones borne a borne con sección, color, puntera y marcador.
15. Ruteo automático por cablecanal con largo calculado.
16. Control de llenado de cablecanal.
17. Lista de corte en orden de cableado (kit por tablero).
18. Exportación de textos de marcadores a la impresora.
19. Generador de borneras con plausibilidad (tapas, topes, puentes, colores).

**Guía de taller**
20. Montaje paso a paso con la pieza resaltada en 3D.
21. Cableado cable por cable con semáforo.
22. Avance guardado por tablero de la serie y por operario.
23. QR por tablero y por componente → ficha, esquema, ubicación.
24. Anotaciones y fotos sobre el plano (redlining).
25. Lista de picking por tablero.
26. Tiempos reales por paso para costear la próxima serie.

**Calidad y documentación**
27. Verificación punto a punto del cableado.
28. Checklist de ensayo con fotos y firma (FAT; rutina IEC 61439 [conocimiento propio]).
29. Dossier PDF conforme a obra.
30. Comparación de revisiones entre tableros de la serie.

**Gestión**
31. BOM con precios y cotización.
32. Lista de compras por proveedor.
33. Nube multiusuario con modo sin conexión.

**Evitar:** catálogo atado a un fabricante; exigir el esquema completo antes de poder ubicar un componente; licencias por puesto y servidor propio; base de artículos que requiere un especialista; apps móviles que son solo visores; integraciones frágiles entre herramientas.

## (c) Huecos que justifican una app propia

- **Dirección única CAD → taller.** Smart Wiring, Cabinet AR, clipx assemble y E3.WiringCockpit consumen un gemelo hecho en un ECAD de escritorio. Ninguno captura desde el taller: foto + medidas con el teléfono → componente utilizable.
- **Catálogo multimarca real.** Los gratuitos son silos de fabricante; el tablero de referencia mezcla una docena de marcas, varias sin datos en ningún portal.
- **Mobile-first para crear.** Solo Hager Ready permite armar desde el celular, y solo tableros modulares Hager.
- **Series cortas.** Entre el lote 1 artesanal y la línea con Komax no hay nada: falta clonar el tablero n.º 1 y seguir el avance del n.º 2 y n.º 3, con kit de cables cortado a mano según lista.
- **Idioma y norma.** Sin español rioplatense, sin nomenclatura propia (PE1-GMS1), sin AEA/IRAM [conocimiento propio].
- **Precio.** Suscripciones de miles de dólares por puesto; los MES genéricos cobran por usuario y no entienden el dominio.

## (d) Formatos de intercambio

| Formato | Para qué | Prioridad |
|---|---|---|
| CSV/Excel | Listas de cables, BOM, marcadores; es lo que aceptan Smart Wiring y las máquinas Steinhauer | Imprescindible, entrada y salida |
| PDF | Dossier, plantillas 1:1, checklists | Imprescindible, salida |
| DXF | Perforado y siluetas; lo acepta RiPanel y lo emite WMC | Alta |
| STEP | Modelos 3D de fabricantes (WMC, WAGO, E3); convertir a glTF/USDZ para el teléfono [recomendación propia] | Media, solo importar |
| ETIM (BMEcat / xChange JSON; clases MC para geometría) | Datos de catálogo de distribuidores | Media, fase 2 |
| ECLASS Advanced | Base del EPLAN Data Portal (≥9.0) | Baja |
| EPLAN EDZ | Artículo + macros; solo leer dimensiones | Baja |
| AutomationML | Intercambio entre herramientas de ingeniería; contenedor de ECLASS | Baja |
| IFC | BIM de edificios; irrelevante para placa de control [criterio propio] | No soportar |

Formato nativo: JSON propio documentado, exportable completo.

## Fuentes

- EPLAN: https://eplan.com/us-en/products/eplan-smart-wiring.html · https://eplan.com/us-en/products/eplan-smart-mounting.html · https://www.eplan.com/au-en/about-us/press/eplan-smart-mounting-the-new-version-2024/ · https://www.eplan.com/int/en/support/eview-free.html · https://www.eplan.com/de-en/about-us/press/eplan-at-hannover-messe-2026/ · https://www.ki-syndikat.de/tools/eplan-electric-p8/ · https://www.eplan.com/int/en/support/data-portal.html
- Estudio ISW: https://www.eplan-software.com/company/news/new-control-cabinet-engineering-study · https://www.komaxgroup.com/en/expertise/cabinet-building
- Rittal: https://www.rittal.com/us-en_US/News/RiPanel-Online-Configurator · https://www.rittal.com/us-en_US/Company/Rittal-Stories/The-Wire-Terminal-Offers-Superior-Speed-and-Precision-for-Processing-up-to-36-Different-Wires · https://www.rittal.com/pdf-creator/variant/ca-en/4051205
- WSCAD: https://blog.wscad.com/en/wscad-cabinet-ar-app/ · https://www.capterra.com/p/234161/WSCAD-ELECTRIX/
- SEE Electrical: https://pdf.directindustry.com/pdf/ige-xao/see-electrical-3d-panel-documentation/8807-921781.html
- Zuken: https://www.zuken.com/en/product/e3series/e3panel · https://zuken.com/en/resource/zuken-extends-e3-series-with-new-applications-for-paperless-wiring-and-assembly
- Autodesk: https://www.autodesk.com/solutions/autocad-subscription-faq · https://help.autodesk.com/cloudhelp/2027/ENU/AutoCAD-Electrical/files/GUID-AC07698B-6AFA-4ECC-9D76-4307DBD529CA.htm
- SolidWorks: https://www.scan2cad.com/blog/cad/solidworks-pricing/ · https://www.goengineer.com/en-us/guide-to-buying-solidworks-electrical
- QElectroTech: https://qelectrotech.org/ · https://raw.githubusercontent.com/qelectrotech/qelectrotech-source-mirror/0.100/ChangeLog · https://qelectrotech.org/forum/viewtopic.php?pid=15240
- Schneider: https://www.se.com/uk/en/download/document/EcoStruxure_Power_Build · https://www.se.com/us/en/faqs/FA379051 · https://se.com/es/es/faqs/FAQ000248402
- ABB: https://new.abb.com/low-voltage/support/software/e-design/overview · https://new.abb.com/low-voltage/support/e-configure
- Hager: https://hager.com/uk/digital-tools/faq-hager-ready · https://hagergroup.com/en/technologies-and-innovations/digital-tools/hagercad
- Siemens: https://www.siemens.com/en-us/content/tia-selection-tool · https://support.industry.siemens.com/forum/ww/en/post/1041621
- Phoenix Contact: https://www.phoenixcontact.com/en-lt/terminal-strip-configuration-project-complete · https://www.phoenixcontact.com/en-lt/news/worker-assistance-software-terminal-strip-assembly
- Weidmüller: https://www.weidmueller.com/configurator · https://www.weidmueller.com/int/solutions/solutions/weidmueller_configurator/wmc_documentation/ecad_interfaces.jsp
- WAGO: https://www.wago.com/global/discover-smartdata/smartdesigner
- Prefabricado: https://www.komaxgroup.com/en/products/harness-manufacturing/zeta-630 · https://www.komaxgroup.com/en-at/products/wire-processing/semi-automation-machines/wire-crimping/z+f-evocrimp · https://hoffman.nvent.com/en-th/products/encpwa6000
- MES: https://www.g2.com/products/tulip-interfaces-tulip/pricing · https://manual.to/compare/work-instruction-software-pricing/ · https://www.knowby.co/blog/dozuki-pricing-and-a-manufacturing-work-instructions-alternative · https://safetyculture.com/pricing · https://www.motek-messe.de/en/Product-Innovations/8196-smart-cabinet-building---digital-solutions-for-switch-cabinet-construction
- Formatos: https://www.etim-international.com/wp-content/uploads/2026/01/ETIM-Modelling-Class-Guidelines-2.0.pdf · https://en.wikipedia.org/wiki/ETIM_(standard) · https://www.automationml.org/wp-content/uploads/2021/11/WP_AutomationML_and_ECLASS_integration_V2.0.pdf
