// Vista 3D del tablero. Cada aparato es una caja con su ancho × alto × profundidad
// y la foto del frente pegada. Se redibuja cada vez que cambia el tablero.
import * as THREE from '../vendor/three.module.min.js';
import { OrbitControls } from '../vendor/OrbitControls.js';
import { urlFoto } from './store.js';

const TINTE = { ok: null, justo: 0xf2a900, pasado: 0xdc2626 };

export function crearVista3D(canvas, { alSeleccionar } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  const escena = new THREE.Scene();
  escena.background = new THREE.Color(0xe8ecf0);
  const camara = new THREE.PerspectiveCamera(32, 1, 10, 20000);
  escena.add(new THREE.AmbientLight(0xffffff, 1.5));
  const sol = new THREE.DirectionalLight(0xffffff, 1.6);
  sol.position.set(-0.5, 0.8, 1.2);
  escena.add(sol);
  const controles = new OrbitControls(camara, canvas);
  controles.enableDamping = false;
  controles.minPolarAngle = 0.15;
  controles.maxPolarAngle = Math.PI - 0.15;
  controles.minAzimuthAngle = -1.35;
  controles.maxAzimuthAngle = 1.35;
  const grupo = new THREE.Group();
  escena.add(grupo);

  let pendiente = false;
  let clave = '';
  let centro = new THREE.Vector3();
  let tam = 800;
  const imagenes = new Map(); // url -> { img, lista }
  const texturas = new Map(); // clave -> CanvasTexture

  function pedir() {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(() => { pendiente = false; renderer.render(escena, camara); });
  }
  controles.addEventListener('change', pedir);

  function imagen(url) {
    let r = imagenes.get(url);
    if (!r) {
      r = { img: new Image(), lista: false, esperan: [] };
      r.img.onload = () => { r.lista = true; r.esperan.forEach((fn) => fn()); r.esperan = []; pedir(); };
      r.img.src = url;
      imagenes.set(url, r);
    }
    return r;
  }

  function pintarFrente(ctx, w, h, comp, etiqueta, img) {
    ctx.fillStyle = comp.color || '#dddddd';
    ctx.fillRect(0, 0, w, h);
    if (img) ctx.drawImage(img, 0, 0, w, h);
    if (etiqueta) {
      const ah = Math.max(18, h * 0.18);
      ctx.fillStyle = '#ffe500';
      ctx.fillRect(4, h - ah - 6, w - 8, ah);
      ctx.fillStyle = '#111';
      let fs = ah * 0.8;
      ctx.font = `bold ${fs}px system-ui, sans-serif`;
      const m = ctx.measureText(etiqueta).width;
      if (m > w - 14) { fs *= (w - 14) / m; ctx.font = `bold ${fs}px system-ui, sans-serif`; }
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(etiqueta, w / 2, h - ah / 2 - 6);
    } else if (!img) {
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillStyle = '#222';
      ctx.font = `${Math.min(w * 0.5, 22)}px system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(comp.nombre || '', 0, 0, h - 10);
      ctx.restore();
    }
  }

  function texturaFrente(comp, etiqueta) {
    const url = urlFoto(comp.foto);
    const k = `${comp.id}|${comp.ancho}x${comp.alto}|${comp.color}|${url.slice(-40)}|${etiqueta}`;
    let tx = texturas.get(k);
    if (tx) return tx;
    const h = 256;
    const w = Math.max(24, Math.round((h * comp.ancho) / comp.alto));
    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const ctx = c.getContext('2d');
    tx = new THREE.CanvasTexture(c);
    tx.colorSpace = THREE.SRGBColorSpace;
    const pintar = (img) => { pintarFrente(ctx, w, h, comp, etiqueta, img); tx.needsUpdate = true; };
    if (url) {
      const r = imagen(url);
      if (r.lista) pintar(r.img);
      else { pintar(null); r.esperan.push(() => pintar(r.img)); }
    } else pintar(null);
    texturas.set(k, tx);
    return tx;
  }

  function caja(w, h, d, color) {
    return new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshLambertMaterial({ color }));
  }

  function limpiar() {
    grupo.traverse((o) => {
      if (o.geometry) o.geometry.dispose();
      if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
    });
    grupo.clear();
  }

  function encuadrar(frente = false) {
    const dist = (tam / (2 * Math.tan((camara.fov * Math.PI) / 360))) * (camara.aspect < 1 ? 1.15 / camara.aspect : 1.25);
    const az = frente ? 0 : 0.5;
    const elv = frente ? 0 : 0.22;
    camara.position.set(centro.x + dist * Math.sin(az) * Math.cos(elv), centro.y + dist * Math.sin(elv), dist * Math.cos(az) * Math.cos(elv));
    controles.target.copy(centro);
    controles.update();
    pedir();
  }

  function actualizar(t, ev, sel) {
    limpiar();
    if (!t) { pedir(); return; }
    const W = t.placa.ancho;
    const H = t.placa.alto;
    const Y = (y) => -y; // en el plano la y crece hacia abajo
    const placa = caja(W, H, 2, 0xc6ccd2);
    placa.position.set(W / 2, Y(H / 2), -1);
    grupo.add(placa);
    const hc = Math.max(5, t.canal.alto || 60);
    ev.geo.canales.forEach((c) => {
      const m = caja(c.w, c.h, hc, c.tipo === 'v' ? 0x8f969e : 0x9ba1a9);
      m.position.set(c.x + c.w / 2, Y(c.y + c.h / 2), hc / 2);
      grupo.add(m);
    });
    ev.rieles.forEach((r) => {
      const g = r.geo;
      const riel = caja(g.largo, 35, 7.5, 0xb9bfc6);
      riel.position.set(g.x0 + g.largo / 2, Y(g.yCentro), 3.75);
      grupo.add(riel);
      r.items.forEach((e) => {
        const etiqueta = (e.it && e.it.etiqueta) || '';
        const lado = new THREE.MeshLambertMaterial({ color: new THREE.Color(e.comp.color || '#dddddd').multiplyScalar(0.82) });
        const frente = new THREE.MeshLambertMaterial({ map: texturaFrente(e.comp, etiqueta) });
        const tinte = TINTE[e.estado];
        if (tinte) [lado, frente].forEach((m) => { m.emissive = new THREE.Color(tinte); m.emissiveIntensity = e.estado === 'pasado' ? 0.55 : 0.4; });
        const m = new THREE.Mesh(new THREE.BoxGeometry(e.ancho, e.alto, e.prof), [lado, lado, lado, lado, frente, lado]);
        m.position.set(g.x0 + e.x + e.ancho / 2, Y(g.yCentro), e.prof / 2);
        m.userData.id = e.id;
        grupo.add(m);
        if (e.id === sel) {
          const borde = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(e.ancho + 3, e.alto + 3, e.prof + 3)), new THREE.LineBasicMaterial({ color: 0x0b6bff }));
          borde.position.copy(m.position);
          grupo.add(borde);
        }
      });
    });
    const nueva = `${t.id}|${W}x${H}`;
    centro = new THREE.Vector3(W / 2, Y(H / 2), 30);
    tam = Math.max(W, H);
    if (nueva !== clave) { clave = nueva; redimensionar(); encuadrar(false); }
    pedir();
  }

  function redimensionar() {
    const w = canvas.clientWidth || 300;
    const h = canvas.clientHeight || 300;
    renderer.setSize(w, h, false);
    camara.aspect = w / h;
    camara.updateProjectionMatrix();
    pedir();
  }

  // tocar un aparato en el 3D lo selecciona
  let abajo = null;
  canvas.addEventListener('pointerdown', (e) => { abajo = { x: e.clientX, y: e.clientY }; });
  canvas.addEventListener('pointerup', (e) => {
    if (!abajo || !alSeleccionar) return;
    const movido = Math.hypot(e.clientX - abajo.x, e.clientY - abajo.y);
    abajo = null;
    if (movido > 6) return;
    const r = canvas.getBoundingClientRect();
    const p = new THREE.Vector2(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    const rayo = new THREE.Raycaster();
    rayo.setFromCamera(p, camara);
    const toque = rayo.intersectObjects(grupo.children, false).find((x) => x.object.userData.id);
    alSeleccionar(toque ? toque.object.userData.id : null);
  });

  return { actualizar, redimensionar, encuadrar, pedir };
}
