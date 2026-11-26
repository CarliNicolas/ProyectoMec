# Tableros MEC · app de armado de tableros

Página instalable (PWA) para distribuir los componentes de un tablero eléctrico sobre la placa.
Se abre desde el celular, la tablet o la computadora y funciona sin conexión una vez abierta.

## Qué hace

**Armar el tablero**

- **Preselecciones por máquina**: se elige "enfriador evaporativo de 5 unidades" y la app carga todos los componentes que lleva. Un tablero propio se guarda como preselección para repetirlo.
- **Acomodado automático** en tres modos, que después se corrige a mano.
- **Colocación manual**: arrastrar los aparatos entre rieles o usar las flechas de la ficha.
- **Control de medidas**: verde si entra, **amarillo si queda justo**, **rojo si no entra** (se pasa del riel, choca con el cablecanal o no cierra la puerta), con el motivo escrito.
- **Plano 2D y vista 3D** que se actualizan al mismo tiempo, con la foto real de cada componente.
- **Agregar una unidad** a un tablero de enfriador: suma de una vez los diez aparatos de la unidad nueva.

**Tomado de los programas de tableros que ya existen** (detalle en `docs/app-tableros/anexos/G-aplicaciones-existentes.md`)

- **Reserva**: porcentaje de cada riel que tiene que quedar libre; la zona se ve rayada en el plano.
- **Revisión del tablero**: tocando el cartel de estado se listan todos los problemas; cada renglón lleva al aparato.
- **¿Qué placa necesito?**: la placa más chica donde entra todo, con un riel menos, los mismos y uno más.
- **Lista de corte** de riel y cablecanal, con las barras de 2 m que hacen falta y lo que sobra.
- **Carteles y etiquetas** a tamaño real: una tira por riel, cada cartel del ancho exacto de su aparato; también como planilla para la rotuladora.
- **Medidas en el plano**: ancho y alto de placa, y eje, inicio y largo de cada riel.
- **Armar**: lista para tildar cada aparato al montarlo en el tablero real.
- **Bloquear**: se puede mirar, tildar e imprimir, pero no mover nada sin querer.
- **Precios, costo de materiales y pedido para el proveedor** agrupado por marca.
- **Imprimir la carpeta**: plano con medidas, materiales, cortes, referencias para la puerta y carteles; desde la impresión se guarda como PDF.
- **Renumerar etiquetas** en orden de lectura.
- **Copia de seguridad** de todos los tableros, preselecciones y componentes propios.

## Probarla en la computadora

```
cd tableros-app
python3 -m http.server 8080
```

y abrir <http://localhost:8080>. No hay que compilar nada: son archivos estáticos.

## Publicarla en Cloudflare

La carpeta `tableros-app/` se publica tal cual, sin compilar. En la raíz del repositorio está `wrangler.jsonc`, que le indica a Cloudflare qué carpeta servir.

**Con el repositorio conectado (recomendado: cada cambio se publica solo)**

1. En el panel de Cloudflare: *Workers y Pages → Crear → Importar un repositorio* y elegir este repositorio.
2. Comando de compilación: vacío. Comando de despliegue: `npx wrangler deploy`.
3. Guardar. La dirección queda como `tableros-mec.<cuenta>.workers.dev` y se le puede poner un dominio propio.

**Desde una computadora con la cuenta de Cloudflare abierta**

```
npx wrangler deploy
```

En el celular o la tablet: abrir la dirección y elegir "Agregar a inicio" (iPhone/iPad) o "Instalar app" (Android, Chrome, Edge).

Al publicar una versión nueva hay que cambiar `VERSION` en `sw.js` para que los dispositivos la tomen.

## Pruebas

```
cd tableros-app
npm test
```

Prueban la lógica de medidas, de acomodado y de las funciones de taller (`js/layout.js`, `js/extras.js`), sin navegador.

## Archivos

| Archivo | Qué hace |
|---|---|
| `js/catalogo.js` | Componentes con sus medidas. `medida: 'estimada'` = falta medir con calibre |
| `js/plantillas.js` | Preselecciones: qué componentes lleva cada máquina y qué placa usa |
| `js/layout.js` | Geometría, control de "entra / justo / no entra" y acomodado automático |
| `js/extras.js` | Reserva, lista de corte, placa mínima, carteles, costo, renumerar, agregar unidad |
| `js/store.js` | Guardado en el dispositivo, deshacer, fotos, compartir, copia de seguridad |
| `js/vista2d.js` | Plano en SVG, medidas y arrastre |
| `js/vista3d.js` | Vista 3D (three.js, incluido en `vendor/`) |
| `js/hojas.js` | Revisión, placa necesaria, corte, carteles, armado, pedido y hojas para imprimir |
| `js/app.js` | Pantalla principal y diálogos |
| `sw.js`, `manifest.webmanifest` | Instalación y uso sin conexión |
| `_headers` | Indica a Cloudflare que no guarde en caché el archivo de actualización |
| `img/` | Fotos de referencia de los tableros y recortes de cada componente |

## Límites conocidos

- Las medidas de las placas de ejemplo y de los componentes marcados "medir" son **estimadas a partir de fotos**.
  Hay que cargar las reales desde *Menú → Medidas del tablero* y *Catálogo → Editar*. Hasta entonces, los cortes y la placa propuesta también son estimados.
- No hay servidor: cada dispositivo guarda sus tableros. Para pasar uno a otro dispositivo se usa *Compartir* (enlace) o un archivo; la copia de seguridad no incluye las fotos propias.
- Los carteles salen a tamaño real solo si se imprime al 100 %: la hoja trae una línea de 100 mm para controlarlo.
- La app ayuda a distribuir; no reemplaza la verificación eléctrica del tablero.
