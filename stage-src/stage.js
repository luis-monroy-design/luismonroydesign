/* ==========================================================================
   Scroll-driven stage for the portfolio.

   - One fixed WebGL world (a glass "product" object over a soft light field)
     that persists through every chapter and moves/changes with the scroll.
   - Chapters flip the page palette between light and dark while you scroll.
   - "Selected work" becomes a pinned 3D carousel driven by vertical scroll.
   - The mouse moves everything in layers (object, light field, text, cards),
     always smoothed (lerp / damping) so nothing ever snaps.

   Progressive enhancement: with reduced motion, no WebGL, or a small screen,
   the static page keeps working untouched.

   Build: see stage-src/README.md  ->  public/site/stage.js
   ========================================================================== */
import Lenis from "lenis";
import {
  ACESFilmicToneMapping,
  Color,
  Group,
  Mesh,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  PointLight,
  Scene,
  ShaderMaterial,
  SRGBColorSpace,
  Vector2,
  WebGLRenderer,
} from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

const doc = document.documentElement;
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(pointer: fine)").matches;

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
// Frame-rate independent smoothing: same feel at 60 Hz and 144 Hz.
const damp = (a, b, rate, dt) => lerp(a, b, 1 - Math.exp(-rate * dt));
const smooth = (a, b, x) => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ---------- Palettes (sRGB 0-255). Interpolated while scrolling. ---------- */
const LIGHT = {
  bg: [251, 251, 253], surface: [255, 255, 255], tile: [245, 245, 247],
  text: [29, 29, 31], text2: [110, 110, 115], text3: [134, 134, 139],
  line: [0, 0, 0, 0.1], nav: [251, 251, 253, 0.72], seg: [255, 255, 255], accent: [0, 113, 227],
};
const DARK = {
  bg: [8, 8, 10], surface: [30, 30, 33], tile: [22, 22, 25],
  text: [245, 245, 247], text2: [161, 161, 166], text3: [134, 134, 139],
  line: [255, 255, 255, 0.14], nav: [8, 8, 10, 0.72], seg: [58, 58, 60], accent: [41, 151, 255],
};
const VAR = {
  bg: "--bg", surface: "--surface", tile: "--tile", text: "--text", text2: "--text-2",
  text3: "--text-3", line: "--line", nav: "--nav-bg", seg: "--seg-active", accent: "--accent",
};
const mixColor = (a, b, k) => {
  const out = a.map((v, i) => (b[i] === undefined ? v : lerp(v, b[i], k)));
  return out.length === 4 ? `rgba(${out[0] | 0},${out[1] | 0},${out[2] | 0},${out[3].toFixed(3)})` : `rgb(${out[0] | 0},${out[1] | 0},${out[2] | 0})`;
};

/* ---------- Chapters ---------- */
const CHAPTERS = [
  { key: "hero", sel: ".hero", dark: 1, en: "Top", es: "Inicio" },
  { key: "experience", sel: "#experience", dark: 0, en: "Experience", es: "Experiencia" },
  { key: "cases", sel: "#cases", dark: 1, en: "Work", es: "Proyectos" },
  { key: "profile", sel: "#profile", dark: 0, en: "About", es: "Perfil" },
  { key: "capabilities", sel: "#capabilities", dark: 0, en: "Skills", es: "Habilidades" },
  { key: "contact", sel: "#contact", dark: 1, en: "Contact", es: "Contacto" },
];

// Where the glass object lives in each chapter. It always stays centred
// horizontally (x = 0); only height (y), size (s) and spin change.
const KEYS = [
  { x: 0, y: 0.0, s: 1.3, spin: 0.14 }, // hero: centered on screen
  { x: 0, y: 0.04, s: 0.72, spin: 0.1 }, // experience: small, behind the rows
  { x: 0, y: 0.0, s: 1.9, spin: 0.07 }, // work: big, behind the carousel
  { x: 0, y: -0.02, s: 0.95, spin: 0.1 }, // about
  { x: 0, y: 0.06, s: 0.78, spin: 0.1 }, // skills
  { x: 0, y: -0.42, s: 0.95, spin: 0.12 }, // contact: floats above the heading
];

/* ======================================================================== */
function boot() {
  if (reduceMotion || window.__stageBooted) return;
  window.__stageBooted = true;

  const wide = innerWidth >= 900 && innerHeight >= 560;
  doc.classList.add("has-motion");

  const chapters = CHAPTERS.map((c) => ({ ...c, el: $(c.sel) })).filter((c) => c.el);
  if (chapters.length < 4) return;

  /* ---------- Smooth scroll ---------- */
  // prevent: Lenis 1.1.0 calls this option as a function, so it must not stay `false`.
  const lenis = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.95, prevent: () => false });
  window.__lenis = lenis;

  document.addEventListener("click", (e) => {
    const a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    if (id === "#") { e.preventDefault(); lenis.scrollTo(0, { duration: 1.4 }); return; }
    const t = $(id);
    if (!t) return;
    e.preventDefault();
    lenis.scrollTo(t, { duration: 1.5, offset: 0 });
  });

  /* ---------- Mouse (smoothed) ---------- */
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  if (finePointer) {
    addEventListener("pointermove", (e) => {
      mouse.tx = (e.clientX / innerWidth) * 2 - 1;
      mouse.ty = (e.clientY / innerHeight) * 2 - 1;
    }, { passive: true });
    doc.addEventListener("mouseleave", () => { mouse.tx = 0; mouse.ty = 0; });
  }

  /* ---------- WebGL stage ---------- */
  let gl = null;
  if (wide) {
    try { gl = createStage(); } catch (err) { console.warn("[stage] WebGL unavailable, keeping static background", err); gl = null; }
  }
  if (gl) doc.classList.add("has-stage");

  /* ---------- Layout metrics ---------- */
  let metrics = [];
  const measure = () => {
    const sy = scrollY;
    metrics = chapters.map((c) => {
      const r = c.el.getBoundingClientRect();
      return { ...c, top: r.top + sy };
    });
    metrics.forEach((m, i) => { m.bottom = i < metrics.length - 1 ? metrics[i + 1].top : doc.scrollHeight; });
  };

  /* ---------- Pinned 3D carousel for "Selected work" ---------- */
  const carousel = wide ? setupCarousel(lenis) : null;

  /* ---------- Hero, focus rows, words, ruler ---------- */
  const heroWrap = $(".hero > div:first-child");
  const heroParts = [
    [$(".status-pill"), 0.5], [$(".hero-title"), 1.0], [$(".hero-subtitle-tag"), 0.7],
    [$(".hero-subtitle"), 0.4], [$(".hero-actions"), 0.3], [$(".hero-card"), -0.25],
  ].filter(([el]) => el);
  const rows = wide ? $$(".company-timeline > .company-card") : [];
  const wordTargets = $$(".profile-text, .contact-heading");
  const splitAll = () => wordTargets.forEach(splitWords);
  splitAll();
  addEventListener("lm:lang", () => { splitAll(); ruler && ruler.refresh(); measure(); });
  const ruler = wide && finePointer ? buildRuler(chapters, lenis) : null;

  /* ---------- Loop ---------- */
  const state = { dark: 0, chapter: 0, scrollY: 0, vel: 0, t: 0 };
  let last = performance.now();
  let tick = 0;

  measure();
  // Start in the tone of the chapter on screen (the hero is dark) instead of fading in from light.
  {
    const mid = scrollY + innerHeight * 0.5;
    let i0 = 0;
    for (let i = 0; i < metrics.length; i++) if (mid >= metrics[i].top) i0 = i;
    state.dark = metrics[i0] ? metrics[i0].dark : 0;
    applyPalette(state.dark);
  }
  new ResizeObserver(() => { measure(); carousel && carousel.layout(); gl && gl.resize(); }).observe(document.body);
  addEventListener("load", () => { measure(); carousel && carousel.layout(); });
  addEventListener("resize", () => { measure(); carousel && carousel.layout(); gl && gl.resize(); });
  document.fonts && document.fonts.ready.then(() => { measure(); carousel && carousel.layout(); });
  document.addEventListener("visibilitychange", () => { last = performance.now(); });

  function frame(now) {
    requestAnimationFrame(frame);
    if (document.hidden) return;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    state.t += dt;
    lenis.raf(now);

    const sy = lenis.scroll;
    state.vel = damp(state.vel, lenis.velocity || 0, 6, dt);
    state.scrollY = sy;

    mouse.x = damp(mouse.x, mouse.tx, 5, dt);
    mouse.y = damp(mouse.y, mouse.ty, 5, dt);

    // Which chapter owns the middle of the screen?
    const mid = sy + innerHeight * 0.5;
    let idx = 0;
    for (let i = 0; i < metrics.length; i++) if (mid >= metrics[i].top) idx = i;
    const cur = metrics[idx];
    const local = cur ? clamp((mid - cur.top) / Math.max(1, cur.bottom - cur.top), 0, 1) : 0;
    state.chapter = idx;

    // Palette: eases toward the chapter's tone
    const target = cur ? cur.dark : 0;
    state.dark = damp(state.dark, target, 4.2, dt);
    if (tick++ % 2 === 0) applyPalette(state.dark);

    // World state: blend to the next chapter during the tail of each chapter
    const a = KEYS[idx] || KEYS[0];
    const b = KEYS[Math.min(idx + 1, KEYS.length - 1)];
    const k = smooth(0.55, 0.98, local);
    const world = {
      x: lerp(a.x, b.x, k), y: lerp(a.y, b.y, k), s: lerp(a.s, b.s, k), spin: lerp(a.spin, b.spin, k),
    };

    gl && gl.render(dt, state, world, mouse);
    carousel && carousel.update(sy, mouse, dt);
    updateHero(sy, dt);
    updateRows();
    updateWords();
    ruler && ruler.update(idx);
  }

  function applyPalette(k) {
    const st = doc.style;
    for (const key in VAR) st.setProperty(VAR[key], mixColor(LIGHT[key], DARK[key], k));
    doc.dataset.tone = k > 0.5 ? "dark" : "light";
    gl && gl.setTone(k);
  }

  function updateHero(sy, dt) {
    if (heroWrap) {
      const p = clamp(sy / (innerHeight * 0.9), 0, 1);
      heroWrap.style.transform = `translate3d(0,${(-p * 70).toFixed(1)}px,0)`;
      heroWrap.style.opacity = String(1 - p * 1.1);
    }
    if (!finePointer || sy > innerHeight) return;
    for (const [el, depth] of heroParts) {
      el.style.translate = `${(mouse.x * 14 * depth).toFixed(2)}px ${(mouse.y * 9 * depth).toFixed(2)}px`;
    }
  }

  function updateRows() {
    if (!rows.length) return;
    const vh = innerHeight;
    for (const r of rows) {
      const rect = r.getBoundingClientRect();
      if (rect.bottom < -vh * 0.5 || rect.top > vh * 1.5) continue;
      const center = rect.top + rect.height / 2;
      const dist = Math.abs(center - vh * 0.52) / vh;
      r.style.setProperty("--focus", clamp(1 - Math.max(0, dist - 0.14) * 1.7, 0.22, 1).toFixed(3));
      r.style.setProperty("--py", `${((center - vh * 0.5) * -0.05).toFixed(1)}px`);
    }
  }

  function updateWords() {
    const vh = innerHeight;
    for (const el of wordTargets) {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > vh) continue;
      const words = el._words || (el._words = $$(".w", el));
      const n = words.length;
      if (!n) continue;
      const start = vh * 0.9, end = vh * 0.42;
      const p = clamp((start - rect.top) / (start - end), 0, 1) * (n + 5);
      for (let i = 0; i < n; i++) words[i].style.opacity = (0.2 + 0.8 * clamp(p - i, 0, 1)).toFixed(2);
    }
  }

  requestAnimationFrame((t) => { last = t; frame(t); });
  gl && requestAnimationFrame(() => gl.canvas.classList.add("is-ready"));
}

/* ======================================================================== */
function createStage() {
  const canvas = document.createElement("canvas");
  canvas.className = "stage-canvas";
  canvas.setAttribute("aria-hidden", "true");
  document.body.prepend(canvas);

  const renderer = new WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new Scene();
  const camera = new PerspectiveCamera(35, 1, 0.1, 60);
  camera.position.set(0, 0, 8);

  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  /* Opaque light-field behind everything: it is the page background AND what
     the glass refracts. Colour blobs drift and answer to the mouse. */
  const bgMat = new ShaderMaterial({
    depthWrite: false, depthTest: false, toneMapped: false,
    uniforms: {
      uBg: { value: new Color(0xfbfbfd) }, uTime: { value: 0 }, uMouse: { value: new Vector2() },
      uDark: { value: 0 }, uAspect: { value: 1.6 }, uScroll: { value: 0 },
    },
    vertexShader: "varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position.xy,0.999,1.0); }",
    fragmentShader: `
      precision mediump float;
      varying vec2 vUv;
      uniform vec3 uBg; uniform float uTime, uDark, uAspect, uScroll; uniform vec2 uMouse;
      float blob(vec2 p, vec2 c, float r){ vec2 d=(p-c)*vec2(uAspect,1.0); return exp(-dot(d,d)/(r*r)); }
      void main(){
        vec2 p = vUv;
        float t = uTime;
        vec2 m = uMouse * 0.05;
        float s = uScroll * 0.00006;
        vec3 c = uBg;
        float k = mix(0.55, 0.62, uDark);
        c = mix(c, vec3(0.36,0.58,1.00), blob(p, vec2(0.22+sin(t*.17)*.05, 0.62+cos(t*.13)*.05 + s) - m*1.2, 0.30) * k);
        c = mix(c, vec3(1.00,0.55,0.80), blob(p, vec2(0.80+cos(t*.15)*.05, 0.30+sin(t*.12)*.05 - s) + m*0.8, 0.26) * k);
        c = mix(c, vec3(0.45,0.90,0.78), blob(p, vec2(0.58+sin(t*.11)*.06, 0.86+cos(t*.16)*.04) - m*0.5, 0.22) * k * 0.9);
        float v = smoothstep(1.15, 0.2, length((p-0.5)*vec2(1.0,0.9)));
        c *= mix(0.96, 1.0, v);
        gl_FragColor = vec4(c, 1.0);
      }`,
  });
  const bg = new Mesh(new PlaneGeometry(2, 2), bgMat);
  bg.frustumCulled = false;
  bg.renderOrder = -10;
  scene.add(bg);

  /* The "product": a rounded glass slab (an app-icon / device nod) */
  const obj = new Group();
  const glass = new MeshPhysicalMaterial({
    color: 0xffffff, metalness: 0, roughness: 0.06, transmission: 1, thickness: 1.6, ior: 1.38,
    dispersion: 0.5, clearcoat: 1, clearcoatRoughness: 0.08, envMapIntensity: 0.85, toneMapped: false,
    attenuationColor: new Color(0xdfeaff), attenuationDistance: 3.2,
  });
  const body = new Mesh(new RoundedBoxGeometry(1.7, 1.7, 0.9, 8, 0.36), glass);
  obj.add(body);
  scene.add(obj);

  const key = new PointLight(0xffffff, 55, 30, 2);
  key.position.set(3, 3, 5);
  scene.add(key);

  const view = { w: 1, h: 1 };
  const resize = () => {
    view.w = innerWidth; view.h = innerHeight;
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.75));
    renderer.setSize(view.w, view.h, false);
    canvas.style.width = "100%"; canvas.style.height = "100%";
    camera.aspect = view.w / view.h;
    camera.updateProjectionMatrix();
    bgMat.uniforms.uAspect.value = camera.aspect;
  };
  resize();

  const cur = { x: 0.5, y: 0, s: 1.25, rx: 0.2, ry: -0.5, rz: 0 };
  let intro = 0;

  return {
    canvas,
    resize,
    setTone(k) {
      // The shader writes raw sRGB values, so feed it the same numbers the CSS palette uses.
      bgMat.uniforms.uBg.value.setRGB(lerp(251, 8, k) / 255, lerp(251, 8, k) / 255, lerp(253, 10, k) / 255);
      bgMat.uniforms.uDark.value = k;
    },
    render(dt, state, world, mouse) {
      intro = Math.min(1, intro + dt * 0.7);
      const ease = 1 - Math.pow(1 - intro, 3);
      const halfW = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z * camera.aspect; // world half-width

      cur.x = damp(cur.x, world.x * halfW, 3.2, dt);
      cur.y = damp(cur.y, world.y * halfW * 0.55, 3.2, dt);
      cur.s = damp(cur.s, world.s, 3.2, dt);

      const spinSpeed = world.spin + Math.abs(state.vel) * 0.0016;
      cur.ry += dt * spinSpeed + state.vel * 0.00055;
      cur.rx = Math.sin(state.t * 0.35) * 0.12 + 0.18;
      cur.rz = damp(cur.rz, state.vel * -0.0009, 4, dt);

      obj.position.set(cur.x + mouse.x * 0.12, -cur.y - mouse.y * 0.08, 0);
      obj.scale.setScalar(cur.s * (0.55 + 0.45 * ease));
      obj.rotation.set(cur.rx + mouse.y * 0.55, cur.ry + mouse.x * 0.7, cur.rz);

      camera.position.x = mouse.x * 0.35;
      camera.position.y = -mouse.y * 0.22;
      camera.lookAt(0, 0, 0);

      bgMat.uniforms.uTime.value = state.t;
      bgMat.uniforms.uMouse.value.set(mouse.x, -mouse.y);
      bgMat.uniforms.uScroll.value = state.scrollY;
      glass.attenuationColor.setRGB(lerp(0.87, 0.5, state.dark), lerp(0.92, 0.62, state.dark), 1);
      renderer.render(scene, camera);
    },
  };
}

/* ======================================================================== */
function setupCarousel(lenis) {
  const sec = $("#cases");
  const header = sec && $(".section-header", sec);
  const filters = sec && $(".case-filters", sec);
  const grid = sec && $(".case-studies-grid", sec);
  if (!sec || !header || !filters || !grid) return null;

  const pin = document.createElement("div");
  pin.className = "cases-pin";
  const head = document.createElement("div");
  head.className = "cases-head";
  head.append(header, filters);
  const counter = document.createElement("div");
  counter.className = "cases-counter";
  counter.innerHTML = '<span class="cc-now">01</span><span class="cc-bar"><i></i></span><span class="cc-all">00</span>';
  pin.append(head, grid, counter);
  sec.append(pin);
  sec.classList.add("cases-pinned");
  doc.classList.add("stage-carousel");

  const now = $(".cc-now", counter), all = $(".cc-all", counter), bar = $(".cc-bar i", counter);
  let cards = [], step = 400, top = 0, pos = 0, tpos = 0, active = -1;

  const visibleCards = () => $$(".case-card", grid).filter((c) => !c.classList.contains("is-filtered"));

  function layout() {
    cards = visibleCards();
    const vh = innerHeight;
    step = Math.round(vh * 0.55);
    const n = Math.max(1, cards.length);
    const w = clamp(Math.min(innerWidth * 0.56, (vh - 300) * 1.5, 780), 380, 780);
    grid.style.setProperty("--card-w", `${w}px`);
    sec.style.height = `${vh + (n - 1) * step + vh * 0.25}px`;
    top = sec.getBoundingClientRect().top + scrollY;
    all.textContent = String(n).padStart(2, "0");
  }

  // Filter chips: portfolio.js toggles .is-filtered first, then we re-lay out.
  filters.addEventListener("click", () => {
    requestAnimationFrame(() => { layout(); lenis.scrollTo(top + 1, { immediate: true }); pos = tpos = 0; });
  });

  grid.addEventListener("click", (e) => {
    const card = e.target.closest(".case-card");
    if (!card) return;
    const i = cards.indexOf(card);
    if (i >= 0 && i !== active) { e.preventDefault(); lenis.scrollTo(top + i * step, { duration: 1.2 }); }
  });

  layout();

  return {
    layout,
    update(sy, mouse, dt) {
      const r = sec.getBoundingClientRect();
      if (r.bottom < -200 || r.top > innerHeight + 200) return;
      const n = cards.length;
      tpos = clamp((sy - top) / step, 0, Math.max(0, n - 1));
      pos = damp(pos, tpos, 9, dt);

      const spacing = parseFloat(grid.style.getPropertyValue("--card-w")) * 1.06;
      let nearest = 0, best = 99;
      for (let i = 0; i < n; i++) {
        const d = i - pos, ad = Math.abs(d);
        if (ad < best) { best = ad; nearest = i; }
        const x = d * spacing + mouse.x * (14 + ad * 10);
        const z = -Math.min(ad, 2.2) * 150;
        const ry = clamp(-d * 30, -52, 52) + mouse.x * 3;
        const sc = 1 - Math.min(ad, 1.8) * 0.15;
        const o = clamp(1 - Math.max(0, ad - 0.2) * 0.42, 0, 1);
        const c = cards[i];
        c.style.setProperty("--t", `translate3d(${x.toFixed(1)}px,${(mouse.y * -6).toFixed(1)}px,${z.toFixed(0)}px) rotateY(${ry.toFixed(2)}deg) scale(${sc.toFixed(3)})`);
        c.style.setProperty("--o", o.toFixed(3));
        c.style.setProperty("--ti", clamp(1 - ad * 2.4, 0, 1).toFixed(3));
        c.style.zIndex = String(100 - Math.round(ad * 10));
      }
      if (nearest !== active) {
        active = nearest;
        cards.forEach((c, i) => c.classList.toggle("is-active", i === active));
        now.textContent = String(active + 1).padStart(2, "0");
      }
      bar.style.transform = `scaleX(${n > 1 ? (pos / (n - 1)).toFixed(4) : 1})`;
      grid.style.transform = `rotateY(${(mouse.x * 2.4).toFixed(2)}deg) rotateX(${(-mouse.y * 1.6).toFixed(2)}deg)`;
    },
  };
}

/* ======================================================================== */
function buildRuler(chapters, lenis) {
  const el = document.createElement("nav");
  el.className = "chapter-ruler";
  el.setAttribute("aria-label", "Chapters");
  const items = chapters.map((c, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "tick";
    b.innerHTML = '<i></i><span></span>';
    b.addEventListener("click", () => lenis.scrollTo(c.el, { duration: 1.5 }));
    el.append(b);
    return b;
  });
  document.body.append(el);
  let cur = -1;
  const labels = () => {
    const es = (doc.lang || "en").startsWith("es");
    items.forEach((b, i) => { const t = chapters[i][es ? "es" : "en"]; $("span", b).textContent = t; b.setAttribute("aria-label", t); });
  };
  labels();
  return {
    refresh: labels,
    update(i) {
      if (i === cur) return;
      cur = i;
      items.forEach((b, k) => b.classList.toggle("is-active", k === i));
    },
  };
}

function splitWords(el) {
  if (el.querySelector(".w")) return;
  const wrap = (node) => {
    if (node.nodeType === 3) {
      const frag = document.createDocumentFragment();
      node.textContent.split(/(\s+)/).forEach((p) => {
        if (!p) return;
        if (/^\s+$/.test(p)) frag.append(p);
        else { const s = document.createElement("span"); s.className = "w"; s.textContent = p; frag.append(s); }
      });
      node.replaceWith(frag);
    } else if (node.nodeType === 1) [...node.childNodes].forEach(wrap);
  };
  [...el.childNodes].forEach(wrap);
  el._words = null;
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
else boot();
