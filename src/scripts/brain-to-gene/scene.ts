// "From brain to gene": a particle brain that breaks apart, re-forms as one neuron, then
// unravels into a DNA double helix as you scroll through a sticky stage. Drag to spin it; the
// cursor pushes particles aside. One rAF loop, paused off screen and when the tab is hidden.

import { Renderer, Camera, Transform, Geometry, Program, Mesh } from 'ogl';
import { brain, scatter, neuron, helix } from './shapes';

const vertex = /* glsl */ `
  attribute vec3 position;
  attribute vec3 aScatter;
  attribute vec3 aNeuron;
  attribute vec3 aHelix;
  attribute vec3 aColBrain;
  attribute vec3 aColNeuron;
  attribute vec3 aColHelix;
  attribute float aRand;

  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform float uT1;
  uniform float uT2;
  uniform float uT3;
  uniform float uTime;
  uniform float uSize;
  uniform float uPx;
  uniform vec2 uMouse;
  uniform float uMouseOn;
  uniform float uAspect;

  varying vec3 vCol;
  varying float vAlpha;

  float stagger(float t) {
    return smoothstep(0.0, 1.0, clamp((t - aRand * 0.35) / 0.65, 0.0, 1.0));
  }

  void main() {
    float s1 = stagger(uT1);
    float s2 = stagger(uT2);
    float s3 = stagger(uT3);

    vec3 p = mix(position, aScatter, s1);
    p = mix(p, aNeuron, s2);
    p = mix(p, aHelix, s3);

    // A burst outward while the neuron unravels into DNA.
    vec3 dir = normalize(aScatter + 0.0001);
    p += dir * sin(3.14159 * s3) * 0.85;

    // Particles never sit perfectly still.
    float drift = 0.012 + 0.05 * s1 * (1.0 - s2);
    p += vec3(sin(uTime * 0.7 + aRand * 31.0), cos(uTime * 0.6 + aRand * 17.0), sin(uTime * 0.5 + aRand * 23.0)) * drift;

    vec3 col = mix(aColBrain, aColNeuron, s2);
    col = mix(col, aColHelix, s3);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    // The cursor pushes nearby particles aside, in screen space.
    vec2 ndc = gl_Position.xy / gl_Position.w;
    vec2 d = ndc - uMouse;
    float dist = length(d * vec2(uAspect, 1.0));
    float push = uMouseOn * smoothstep(0.32, 0.0, dist) * 0.11;
    gl_Position.xy += normalize(d + 0.00001) * push * gl_Position.w;

    gl_PointSize = uSize * uPx * (0.55 + aRand * 0.9) / -mv.z;
    vCol = col;
    vAlpha = 0.55 + 0.45 * sin(uTime * 1.6 + aRand * 40.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec3 vCol;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d) * vAlpha;
    gl_FragColor = vec4(vCol * a, a);
  }
`;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const ramp = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));

export function mount(section: HTMLElement) {
  const stage = section.querySelector<HTMLElement>('[data-btg-stage]');
  if (!stage) return;

  const small = matchMedia('(max-width: 760px)').matches;
  const count = small ? 7000 : 14000;

  let renderer: Renderer;
  try {
    renderer = new Renderer({ dpr: Math.min(window.devicePixelRatio || 1, 2), alpha: true, antialias: false, premultipliedAlpha: true });
  } catch {
    return;
  }
  const gl = renderer.gl;
  if (!gl) return;
  gl.clearColor(0, 0, 0, 0);
  const canvas = gl.canvas as HTMLCanvasElement;
  canvas.className = 'btg__canvas';
  canvas.setAttribute('aria-hidden', 'true');
  stage.prepend(canvas);

  const camera = new Camera(gl, { fov: 35 });
  const scene = new Transform();
  const holder = new Transform();
  holder.setParent(scene);

  const b = brain(count);
  const s = scatter(count);
  const ne = neuron(count);
  const h = helix(count);
  const rand = new Float32Array(count);
  for (let i = 0; i < count; i++) rand[i] = Math.random();

  const geometry = new Geometry(gl, {
    position: { size: 3, data: b.pos },
    aScatter: { size: 3, data: s.pos },
    aNeuron: { size: 3, data: ne.pos },
    aHelix: { size: 3, data: h.pos },
    aColBrain: { size: 3, data: b.col },
    aColNeuron: { size: 3, data: ne.col },
    aColHelix: { size: 3, data: h.col },
    aRand: { size: 1, data: rand },
  });

  const program = new Program(gl, {
    vertex,
    fragment,
    transparent: true,
    depthTest: false,
    depthWrite: false,
    uniforms: {
      uT1: { value: 0 },
      uT2: { value: 0 },
      uT3: { value: 0 },
      uTime: { value: 0 },
      uSize: { value: small ? 44 : 40 },
      uPx: { value: renderer.dpr },
      uMouse: { value: [9, 9] },
      uMouseOn: { value: 0 },
      uAspect: { value: 1 },
    },
  });
  program.setBlendFunc(gl.ONE, gl.ONE);

  const points = new Mesh(gl, { mode: gl.POINTS, geometry, program });
  points.setParent(holder);

  // Layout: on wide screens the model sits to the right of the text.
  function resize() {
    const w = stage!.clientWidth;
    const hgt = stage!.clientHeight;
    renderer.setSize(w, hgt);
    camera.perspective({ aspect: w / hgt });
    program.uniforms.uAspect.value = w / hgt;
    const wide = w > 900;
    growMax = wide ? 1.45 : 0.95;
    camera.position.set(0, 0, wide ? 9 : 11.5);
    holder.position.set(wide ? 1.55 : 0, wide ? 0 : 0.55, 0);
  }
  let growMax = 1.45;
  resize();
  new ResizeObserver(resize).observe(stage);

  // Scroll progress through the section, read inside the frame loop (no scroll listener).
  const chapters = section.querySelectorAll<HTMLElement>('[data-chapter]');
  const meter = section.querySelector<HTMLElement>('[data-btg-meter]');
  let progress = 0;
  let shown = -1;
  function readProgress() {
    const r = section.getBoundingClientRect();
    const travel = r.height - window.innerHeight;
    progress = travel > 0 ? clamp01(-r.top / travel) : 0;
  }

  const debug = new URLSearchParams(location.search).get('btg');
  const fixed = debug !== null ? clamp01(Number(debug)) : null;

  // Drag to spin, with a little momentum.
  let yaw = 0;
  let pitch = 0;
  let vyaw = 0;
  let dragging = false;
  let lastX = 0;
  let lastY = 0;
  stage.addEventListener('pointerdown', (e) => {
    if ((e.target as HTMLElement).closest('a, button')) return;
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    stage!.setPointerCapture(e.pointerId);
  });
  stage.addEventListener('pointerup', (e) => {
    dragging = false;
    if (stage!.hasPointerCapture(e.pointerId)) stage!.releasePointerCapture(e.pointerId);
  });
  stage.addEventListener('pointercancel', () => (dragging = false));
  stage.addEventListener('pointermove', (e) => {
    const r = stage!.getBoundingClientRect();
    program.uniforms.uMouse.value = [((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1)];
    if (e.pointerType === 'mouse') program.uniforms.uMouseOn.value = 1;
    if (!dragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    vyaw = dx * 0.006;
    yaw += vyaw;
    pitch = Math.max(-0.6, Math.min(0.6, pitch + dy * 0.004));
  });
  stage.addEventListener('pointerleave', () => (program.uniforms.uMouseOn.value = 0));

  let running = false;
  let inView = true;
  let raf = 0;
  let last = 0;
  let time = 0;

  function frame(now: number) {
    const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016);
    last = now;
    time += dt;

    readProgress();
    const p = fixed ?? progress;
    program.uniforms.uT1.value = ramp(p, 0.16, 0.34);
    program.uniforms.uT2.value = ramp(p, 0.34, 0.54);
    program.uniforms.uT3.value = ramp(p, 0.64, 0.84);
    program.uniforms.uTime.value = time;

    if (!dragging) {
      vyaw *= 0.94;
      yaw += vyaw + dt * 0.18;
    }
    holder.rotation.y = yaw + p * Math.PI * 1.2;
    // The brain starts bigger, then everything settles to one size for the neuron and DNA.
    const grow = growMax - (growMax - 1) * ramp(p, 0.3, 0.56);
    holder.scale.set(grow, grow, grow);
    holder.rotation.x = pitch * 0.9 + 0.12;

    const chapter = p < 0.24 ? 0 : p < 0.52 ? 1 : p < 0.72 ? 2 : 3;
    if (chapter !== shown) {
      shown = chapter;
      section.dataset.chapter = String(chapter);
      chapters.forEach((c, i) => c.classList.toggle('is-on', i === chapter));
    }
    if (meter) meter.style.setProperty('--p', p.toFixed(3));

    renderer.render({ scene, camera });
    if (running) raf = requestAnimationFrame(frame);
  }

  function start() {
    if (running || !inView || document.hidden) return;
    running = true;
    last = 0;
    raf = requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  new IntersectionObserver(([e]) => {
    inView = e.isIntersecting;
    if (inView) start();
    else stop();
  }).observe(section);
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

  section.classList.add('is-live');
  start();
}
