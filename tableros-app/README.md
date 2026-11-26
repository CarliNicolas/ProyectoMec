# Tableros MEC · app de armado de tableros

Página instalable (PWA) para distribuir los componentes de un tablero eléctrico sobre la placa:

- **Preselecciones por máquina**: se elige "enfriador evaporativo de 5 unidades" y la app carga todos los componentes que lleva.
- **Acomodado automático** en tres modos, que después se puede corregir a mano.
- **Colocación manual**: arrastrar los aparatos entre rieles o usar las flechas de la ficha.
- **Control de medidas**: verde si entra, **amarillo si queda justo**, **rojo si no entra** (se pasa del riel, choca con el cablecanal o no cierra la puerta).
- **Plano 2D y vista 3D** que se actualizan al mismo tiempo, con la foto real de cada componente.
- Foto del tablero, catálogo con medidas editables, lista de materiales, compartir por enlace, imprimir.
- Funciona sin conexión una vez abierta. Los tableros se guardan en cada dispositivo.

## Probarla en la computadora

```
cd tableros-app
python3 -m http.server 8080
```

y abrir <http://localhost:8080>. No hay que compilar nada: son archivos estáticos.

## Publicarla

Sirve cualquier alojamiento de archivos estáticos con HTTPS (Netlify, GitHub Pages, Cloudflare Pages…).
Se publica la carpeta `tableros-app/` tal cual. En el celular o la tablet: abrir la dirección y elegir
"Agregar a inicio" (iPhone/iPad) o "Instalar app" (Android, Chrome, Edge).

Al publicar una versión nueva hay que cambiar `VERSION` en `sw.js` para que los dispositivos la tomen.

## Pruebas

```
cd tableros-app
npm test
```

Prueban la lógica de medidas y de acomodado (`js/layout.js`), sin navegador.

## Archivos

| Archivo | Qué hace |
|---|---|
| `js/catalogo.js` | Componentes con sus medidas. `medida: 'estimada'` = falta medir con calibre |
| `js/plantillas.js` | Preselecciones: qué componentes lleva cada máquina y qué placa usa |
| `js/layout.js` | Geometría, control de "entra / justo / no entra" y acomodado automático |
| `js/store.js` | Guardado en el dispositivo, deshacer, fotos, compartir |
| `js/vista2d.js` | Plano en SVG y arrastre |
| `js/vista3d.js` | Vista 3D (three.js, incluido en `vendor/`) |
| `js/app.js` | Pantallas y diálogos |
| `sw.js`, `manifest.webmanifest` | Instalación y uso sin conexión |
| `img/` | Fotos de referencia de los tableros y recortes de cada componente |

## Límites conocidos

- Las medidas de las placas de ejemplo y de los componentes marcados "medir" son **estimadas a partir de fotos**.
  Hay que cargar las reales desde *Menú → Medidas del tablero* y *Catálogo → Editar*.
- No hay servidor: cada dispositivo guarda sus tableros. Para pasar uno a otro dispositivo se usa *Compartir* (enlace) o *Guardar en un archivo*.
- La app ayuda a distribuir; no reemplaza la verificación eléctrica del tablero.
