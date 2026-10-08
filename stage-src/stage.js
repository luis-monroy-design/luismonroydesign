/* ==========================================================================
   Scroll-driven stage for the portfolio.

   - One fixed WebGL world: a soft light field plus a set of thin, minimal
     boxes that organise themselves into different wireframes and screens
     (desktop page, code editor, bento grid, phone, components, form) as you scroll.
   - The palette machinery can flip chapters between light and dark; today every chapter is dark.
   - "Selected work" becomes a pinned 3D carousel driven by vertical scroll.
   - The mouse moves everything in layers (object, light field, text, cards),
     always smoothed (lerp / damping) so nothing ever snaps.

   Progressive enhancement: with reduced motion or no WebGL the static page
   keeps working untouched. The wireframes also run on phones; the pinned
   carousel, focus rows and ruler stay desktop-only.

   Build: see stage-src/README.md  ->  public/site/stage.js
   ========================================================================== */
import Lenis from "lenis";
import {
  Color,
  Group,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  SRGBColorSpace,
  Vector2,
  WebGLRenderer,
} from "three";

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
  { key: "experience", sel: "#experience", dark: 1, en: "Experience", es: "Experiencia" },
  { key: "builder", sel: "#builder", dark: 1, en: "Builder", es: "Builder" },
  { key: "cases", sel: "#cases", dark: 1, en: "Work", es: "Proyectos" },
  { key: "profile", sel: "#profile", dark: 1, en: "About", es: "Perfil" },
  { key: "capabilities", sel: "#capabilities", dark: 1, en: "Skills", es: "Habilidades" },
  { key: "contact", sel: "#contact", dark: 1, en: "Contact", es: "Contacto" },
];

/* ---------- Wireframe formations (one per chapter) ----------
   Box: [x, y, w, h, radius, kind, z]. Units are per formation, y grows downward.
   kind: OUT = thin outline, BAR = filled skeleton line, ACC = accent element.
   A formation with fewer boxes than BOXES lets the rest shrink and fade out. */
const OUT = 0, BAR = 1, ACC = 2;
const BOXES = 16;
const FORMS = [
  // hero: loose pieces floating around the title, not yet organised
  { scatter: true, alpha: 1, rx: 0, ry: 0 },
  // experience: a desktop page
  {
    w: 16, h: 10, fitW: 0.52, fitH: 0.6, alpha: 0.72, rx: 0.08, ry: -0.22,
    boxes: [
      [0, 0, 16, 10, 0.5, OUT, -0.1],
      [0, -4.25, 15.2, 0.7, 0.35, OUT],
      [-6.3, -4.25, 1.6, 0.26, 0.13, BAR],
      [4.5, -4.25, 1, 0.18, 0.09, BAR],
      [5.8, -4.25, 1, 0.18, 0.09, BAR],
      [6.95, -4.25, 0.9, 0.4, 0.2, ACC],
      [0, -2.5, 9, 0.8, 0.2, BAR],
      [0, -1.4, 6.5, 0.26, 0.13, BAR],
      [0, -0.9, 5, 0.26, 0.13, BAR],
      [0, 0.1, 2.2, 0.65, 0.33, ACC],
      [-5, 2.9, 4.6, 3.2, 0.3, OUT],
      [0, 2.9, 4.6, 3.2, 0.3, OUT],
      [5, 2.9, 4.6, 3.2, 0.3, OUT],
    ],
  },
  // builder: a code editor with a live preview and a terminal
  {
    w: 16, h: 10, fitW: 0.56, fitH: 0.6, alpha: 0.8, rx: 0.06, ry: 0.2,
    boxes: [
      [0, 0, 16, 10, 0.5, OUT, -0.1],
      [0, -4.35, 15.2, 0.5, 0.25, OUT],
      [-6.2, 0.4, 2.8, 8.2, 0.3, OUT],
      [-1.9, -3.2, 4.6, 0.24, 0.12, BAR],
      [-2.6, -2.5, 3.2, 0.24, 0.12, BAR],
      [-1.6, -1.8, 5.2, 0.24, 0.12, BAR],
      [-2.2, -1.1, 4, 0.24, 0.12, BAR],
      [-2.9, -0.4, 2.6, 0.24, 0.12, BAR],
      [-1.8, 0.3, 4.8, 0.24, 0.12, BAR],
      [0.9, 0.3, 0.14, 0.42, 0.07, ACC],
      [4.3, -0.4, 5.8, 6.6, 0.35, OUT],
      [4.3, -2.6, 4, 0.5, 0.25, BAR],
      [4.3, 0.3, 4.4, 2.4, 0.3, OUT],
      [1.4, 3.9, 12, 1.4, 0.3, OUT],
      [-1.6, 3.9, 5.4, 0.24, 0.12, BAR],
    ],
  },
  // work: a bento wall laid back behind the carousel
  {
    w: 24, h: 14, fitW: 1.02, fitH: 0.95, z: -1.4, alpha: 0.75, rx: -0.42, ry: 0,
    boxes: [
      [-6, -4.6, 11.6, 4.2, 0.4, OUT],
      [3, -4.6, 5.6, 4.2, 0.4, OUT],
      [9, -2.3, 5.6, 8.8, 0.4, OUT],
      [-9, 0, 5.6, 4.2, 0.4, OUT],
      [-3, 0, 5.6, 4.2, 0.4, OUT],
      [3, 0, 5.6, 4.2, 0.4, OUT],
      [-9, 4.6, 5.6, 4.2, 0.4, OUT],
      [0, 4.6, 11.6, 4.2, 0.4, OUT],
      [9, 4.6, 5.6, 4.2, 0.4, OUT],
      [-8.6, -5.6, 4.4, 0.3, 0.15, BAR],
      [-9.4, -4.9, 2.8, 0.24, 0.12, BAR],
      [-9.9, -3.6, 1.6, 0.5, 0.25, ACC],
    ],
  },
  // about: a phone with a profile screen
  {
    w: 9, h: 19, fitW: 0.42, fitH: 0.66, alpha: 0.9, rx: 0.05, ry: 0.24,
    boxes: [
      [0, 0, 9, 19, 1.6, OUT, -0.1],
      [0, -8.6, 2.6, 0.6, 0.3, BAR],
      [0, -5.6, 2.6, 2.6, 1.3, OUT],
      [0, -3.5, 4.6, 0.5, 0.25, BAR],
      [0, -2.7, 3.4, 0.3, 0.15, BAR],
      [0, -1.3, 7, 0.24, 0.12, BAR],
      [0, -0.6, 7, 0.24, 0.12, BAR],
      [-0.6, 0.1, 5.8, 0.24, 0.12, BAR],
      [0, 2.4, 7.4, 2.6, 0.5, OUT],
      [0, 5.5, 7.4, 2.6, 0.5, OUT],
      [0, 8.1, 7.6, 1.1, 0.55, OUT],
      [-2.4, 8.1, 0.5, 0.5, 0.25, ACC],
      [0, 8.1, 0.5, 0.5, 0.25, BAR],
      [2.4, 8.1, 0.5, 0.5, 0.25, BAR],
    ],
  },
  // skills: a small component library
  {
    w: 16, h: 10, fitW: 0.56, fitH: 0.56, alpha: 0.85, rx: 0.1, ry: -0.16,
    boxes: [
      [-5, -3.5, 3.6, 1, 0.5, ACC],
      [-1, -3.5, 3.6, 1, 0.5, OUT],
      [2.4, -3.5, 1, 1, 0.5, OUT],
      [5.2, -3.5, 2, 1, 0.5, OUT],
      [5.7, -3.5, 0.76, 0.76, 0.38, BAR],
      [-2.4, -1.2, 10.4, 1.1, 0.3, OUT],
      [-6.2, 0.8, 2.4, 0.8, 0.4, OUT],
      [-3.4, 0.8, 2.6, 0.8, 0.4, OUT],
      [-0.5, 0.8, 2.2, 0.8, 0.4, OUT],
      [2, 0.8, 2.2, 0.8, 0.4, OUT],
      [-7, 2.9, 0.8, 0.8, 0.15, OUT],
      [-5, 2.9, 2.8, 0.26, 0.13, BAR],
      [-7, 4.1, 0.8, 0.8, 0.15, OUT],
      [-5.3, 4.1, 2.2, 0.26, 0.13, BAR],
      [4.2, 3.4, 6.8, 3.4, 0.4, OUT],
    ],
  },
  // contact: a form
  {
    w: 12, h: 12, fitW: 0.4, fitH: 0.62, alpha: 0.72, rx: 0, ry: 0.18,
    boxes: [
      [0, 0, 12, 12, 0.6, OUT, -0.1],
      [-1.6, -4.6, 7, 0.6, 0.2, BAR],
      [-2.6, -3.8, 5, 0.28, 0.14, BAR],
      [-4.3, -2.6, 1.6, 0.22, 0.11, BAR],
      [0, -1.9, 10, 1, 0.3, OUT],
      [-4.3, -0.5, 1.6, 0.22, 0.11, BAR],
      [0, 0.2, 10, 1, 0.3, OUT],
      [-4.3, 1.6, 1.6, 0.22, 0.11, BAR],
      [0, 3.1, 10, 2.4, 0.3, OUT],
      [2.8, 5, 4.4, 0.8, 0.4, ACC],
    ],
  },
];
// Base opacity per kind: [stroke, fill, accent mix]. Kept very low so text always reads first.
const KIND = [[0.1, 0.008, 0], [0, 0.04, 0], [0.24, 0.05, 1]];

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
  try { gl = createStage(); } catch (err) { console.warn("[stage] WebGL unavailable, keeping static background", err); gl = null; }
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

    // Wireframes: morph into the next chapter's formation during the tail of each chapter
    const k = smooth(0.55, 0.98, local);
    gl && gl.render(dt, state, Math.min(idx, FORMS.length - 1), k, mouse);
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

  const scene = new Scene();
  const camera = new PerspectiveCamera(35, 1, 0.1, 60);
  camera.position.set(0, 0, 8);

  /* Opaque light-field behind everything: it is the page background.
     Colour blobs drift and answer to the mouse. */
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
      // Measured in units of the shorter side, so the blobs keep their size on portrait phones
      float blob(vec2 p, vec2 c, float r){ vec2 d=(p-c)*vec2(uAspect,1.0)/min(uAspect,1.0); return exp(-dot(d,d)/(r*r)); }
      void main(){
        vec2 p = vUv;
        float t = uTime;
        vec2 m = uMouse * 0.05;
        float s = uScroll * 0.00006;
        vec3 c = uBg;
        float k = mix(0.55, 0.62, uDark) * (uAspect < 1.0 ? 0.8 : 1.0);
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

  /* The wireframe boxes: one quad each, drawn as an anti-aliased rounded
     rectangle (hairline outline + faint fill) in the fragment shader. */
  const lineColor = new Color(), accentColor = new Color();
  const quad = new PlaneGeometry(1, 1);
  const boxVert = "varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }";
  const boxFrag = `
    precision highp float;
    varying vec2 vUv;
    uniform vec2 uSize; uniform float uRadius, uStroke, uFill, uPx; uniform vec3 uColor;
    float sdRound(vec2 p, vec2 b, float r){ vec2 q=abs(p)-b+r; return length(max(q,0.0))+min(max(q.x,q.y),0.0)-r; }
    void main(){
      vec2 p = (vUv-0.5)*uSize;
      float d = sdRound(p, 0.5*uSize, min(uRadius, 0.5*min(uSize.x,uSize.y)));
      float dp = d / max(fwidth(d), 1e-6); // distance in screen pixels (negative inside)
      float fill = clamp(0.5 - dp, 0.0, 1.0);
      float line = clamp(uPx*0.5 + 0.5 - abs(dp + uPx*0.5 + 0.25), 0.0, 1.0);
      float a = fill*uFill + line*uStroke;
      if (a < 0.002) discard;
      gl_FragColor = vec4(uColor, a);
    }`;
  const group = new Group();
  scene.add(group);
  const boxes = [];
  for (let i = 0; i < BOXES; i++) {
    const mat = new ShaderMaterial({
      transparent: true, depthWrite: false, depthTest: false, toneMapped: false,
      uniforms: {
        uSize: { value: new Vector2(1, 1) }, uRadius: { value: 0 }, uStroke: { value: 0 }, uFill: { value: 0 },
        uPx: { value: 1 }, uColor: { value: new Color() },
      },
      vertexShader: boxVert, fragmentShader: boxFrag,
    });
    const mesh = new Mesh(quad, mat);
    mesh.renderOrder = i;
    mesh.frustumCulled = false;
    group.add(mesh);
    // Displayed (smoothed) state
    boxes.push({ mesh, mat, x: 0, y: 0, z: -3, w: 0.01, h: 0.01, r: 0, st: 0, fi: 0, ac: 0, ready: false });
  }

  const view = { hw: 1, hh: 1, phone: false };
  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, finePointer ? 1.75 : 1.5);
    renderer.setPixelRatio(dpr);
    renderer.setSize(innerWidth, innerHeight, false);
    canvas.style.width = "100%"; canvas.style.height = "100%";
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    bgMat.uniforms.uAspect.value = camera.aspect;
    view.hh = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z; // world half-height at z = 0
    view.hw = view.hh * camera.aspect;
    view.phone = innerWidth < 700;
    const px = Math.max(1, dpr * 0.9);
    boxes.forEach((b) => { b.mat.uniforms.uPx.value = px; });
  };
  resize();

  // Deterministic "random" so the scatter is the same on every visit
  const rand = (i, s) => { const v = Math.sin(i * 127.1 + s * 311.7) * 43758.5453; return v - Math.floor(v); };
  const SCATTER_KINDS = [[0.42, 0.3, 0.05, OUT], [0.26, 0.06, 0.03, BAR], [0.12, 0.12, 0.06, OUT], [0.3, 0.2, 0.04, OUT]];

  // Target geometry of box i in formation f (world units), or null when the formation doesn't use it
  function target(f, i, t) {
    const F = FORMS[f];
    if (F.scatter) {
      const a = (i / BOXES) * Math.PI * 2 + rand(i, 1) * 0.5 - 0.3;
      const rr = 0.74 + rand(i, 2) * 0.28;
      const u = Math.min(view.hw, view.hh);
      const kd = i === 7 ? [0.18, 0.06, 0.03, ACC] : SCATTER_KINDS[i % SCATTER_KINDS.length];
      return {
        x: Math.cos(a) * rr * view.hw + Math.sin(t * 0.21 + i) * 0.05 * u,
        y: Math.sin(a) * rr * view.hh * 0.9 + Math.cos(t * 0.17 + i * 1.7) * 0.05 * u,
        z: -1.3 + rand(i, 3) * 1.9,
        w: kd[0] * u, h: kd[1] * u, r: kd[2] * u, kind: kd[3], al: F.alpha,
      };
    }
    const b = F.boxes[i];
    if (!b) return null;
    // On narrow phones the width is the limit, so the formations may take more of it
    const fitW = view.phone ? Math.min(F.fitW * 1.9, 0.92) : F.fitW;
    const sc = Math.min((fitW * 2 * view.hw) / F.w, (F.fitH * 2 * view.hh) / F.h);
    return {
      x: b[0] * sc, y: -b[1] * sc, z: (F.z || 0) + (b[6] ?? 0.14),
      w: b[2] * sc, h: b[3] * sc, r: b[4] * sc, kind: b[5], al: F.alpha,
    };
  }
  const hidden = (o) => ({ ...o, w: o.w * 0.25, h: o.h * 0.25, r: o.r * 0.25, al: 0 });

  const rot = { x: 0, y: 0 };

  return {
    canvas,
    resize,
    setTone(k) {
      // The shaders write raw sRGB values, so feed them the same numbers the CSS palette uses.
      bgMat.uniforms.uBg.value.setRGB(lerp(251, 8, k) / 255, lerp(251, 8, k) / 255, lerp(253, 10, k) / 255);
      bgMat.uniforms.uDark.value = k;
      lineColor.setRGB(lerp(29, 245, k) / 255, lerp(29, 245, k) / 255, lerp(31, 247, k) / 255);
      accentColor.setRGB(lerp(0, 41, k) / 255, lerp(113, 151, k) / 255, lerp(227, 255, k) / 255);
    },
    render(dt, state, f, k, mouse) {
      const t = state.t;
      const fa = f, fb = Math.min(f + 1, FORMS.length - 1);
      const A = FORMS[fa], B = FORMS[fb];
      const gain = view.phone ? 0.9 : 1;

      for (let i = 0; i < BOXES; i++) {
        const bx = boxes[i];
        let a = target(fa, i, t), b = target(fb, i, t);
        if (!a && !b) { bx.mesh.visible = false; bx.ready = false; continue; }
        if (!a) a = hidden(b);
        if (!b) b = hidden(a);
        // Staggered: boxes move one after another, so the layout "organises" itself
        const kb = smooth(0, 1, k * 1.5 - (i / BOXES) * 0.5);
        const arc = Math.sin(Math.PI * kb);
        const ka = KIND[a.kind], kz = KIND[b.kind];
        const intro = smooth(0, 1, t * 1.2 - i * 0.04);
        const tz = lerp(a.z, b.z, kb) + arc * (i % 2 ? 0.7 : -0.4) - (1 - intro) * 2 + state.vel * 0.0004 * ((i % 3) - 1);
        const al = lerp(a.al, b.al, kb) * intro * gain;
        const rate = bx.ready ? 7 : 1000;
        bx.x = damp(bx.x, lerp(a.x, b.x, kb), rate, dt);
        bx.y = damp(bx.y, lerp(a.y, b.y, kb), rate, dt);
        bx.z = damp(bx.z, tz, rate, dt);
        bx.w = damp(bx.w, lerp(a.w, b.w, kb), rate, dt);
        bx.h = damp(bx.h, lerp(a.h, b.h, kb), rate, dt);
        bx.r = damp(bx.r, lerp(a.r, b.r, kb), rate, dt);
        bx.st = damp(bx.st, lerp(ka[0], kz[0], kb) * al, rate, dt);
        bx.fi = damp(bx.fi, lerp(ka[1], kz[1], kb) * al, rate, dt);
        bx.ac = damp(bx.ac, lerp(ka[2], kz[2], kb), rate, dt);
        bx.ready = true;

        const m = bx.mesh, u = bx.mat.uniforms;
        m.visible = bx.st + bx.fi > 0.003;
        m.position.set(bx.x, bx.y, bx.z);
        m.rotation.z = arc * (i % 2 ? 0.12 : -0.08);
        m.scale.set(Math.max(bx.w, 1e-4), Math.max(bx.h, 1e-4), 1);
        u.uSize.value.set(Math.max(bx.w, 1e-4), Math.max(bx.h, 1e-4));
        u.uRadius.value = bx.r;
        u.uStroke.value = bx.st;
        u.uFill.value = bx.fi;
        u.uColor.value.copy(lineColor).lerp(accentColor, bx.ac);
      }

      // The whole layout tilts a little per chapter, sways, and follows the mouse
      const kk = smooth(0, 1, k);
      rot.x = damp(rot.x, lerp(A.rx, B.rx, kk) + mouse.y * 0.14, 3, dt);
      rot.y = damp(rot.y, lerp(A.ry, B.ry, kk) + mouse.x * 0.2 + Math.sin(t * 0.3) * 0.04, 3, dt);
      group.rotation.set(rot.x, rot.y, 0);

      camera.position.x = mouse.x * 0.3;
      camera.position.y = -mouse.y * 0.2;
      camera.lookAt(0, 0, 0);

      bgMat.uniforms.uTime.value = t;
      bgMat.uniforms.uMouse.value.set(mouse.x, -mouse.y);
      bgMat.uniforms.uScroll.value = state.scrollY;
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
