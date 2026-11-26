// Service worker: guarda la app en el dispositivo para que funcione sin conexión.
// Al publicar una versión nueva, cambiar VERSION para que los dispositivos la tomen.
const VERSION = 'tableros-mec-v1';
const ARCHIVOS = [
  './', 'index.html', 'styles.css', 'manifest.webmanifest',
  'js/app.js', 'js/catalogo.js', 'js/layout.js', 'js/plantillas.js', 'js/store.js', 'js/vista2d.js', 'js/vista3d.js',
  'vendor/three.module.min.js', 'vendor/OrbitControls.js',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png',
  'img/tableros/enfriador-5u.jpg', 'img/tableros/enfriador-4u.jpg', 'img/tableros/enfriador-2u.jpg', 'img/tableros/gabinete-plastico.jpg',
  'img/comp/easy9-mcb-4p.jpg', 'img/comp/easy9-rccb-4p.jpg', 'img/comp/jieli-407.jpg', 'img/comp/gv2me08.jpg', 'img/comp/c60n-4p.jpg',
  'img/comp/rut34.jpg', 'img/comp/cmb025.jpg', 'img/comp/pln6-c10.jpg', 'img/comp/jieli-c2.jpg', 'img/comp/jieli-c4.jpg',
  'img/comp/logo-230rce.jpg', 'img/comp/baw-ptd2.jpg', 'img/comp/tvps1-40c.jpg', 'img/comp/ag-cn3r.jpg', 'img/comp/shelly-gen4.jpg',
  'img/comp/rxm-zocalo.jpg', 'img/comp/lc1e0910.jpg', 'img/comp/borne-acometida.jpg', 'img/comp/bornes-unidad.jpg',
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((claves) => Promise.all(claves.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()),
  );
});

// Primero la red (para recibir actualizaciones) y, si no hay conexión, lo guardado.
self.addEventListener('fetch', (e) => {
  const { request } = e;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(request)
      .then((resp) => {
        if (resp && resp.ok) {
          const copia = resp.clone();
          caches.open(VERSION).then((c) => c.put(request, copia));
        }
        return resp;
      })
      .catch(() => caches.match(request, { ignoreSearch: true }).then((r) => r || caches.match('index.html'))),
  );
});
