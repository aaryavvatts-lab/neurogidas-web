// Point clouds for the "From brain to gene" scene. Every shape returns exactly `n` points so the
// shader can morph point i of one shape into point i of the next. All shapes fit roughly inside a
// 4-unit tall box centered on the origin.

export type Cloud = { pos: Float32Array; col: Float32Array };

// Brand colors as 0..1 RGB.
const INDIGO = [0.49, 0.43, 0.94];
const INDIGO_LIGHT = [0.72, 0.68, 1.0];
const TEAL = [0.15, 0.77, 0.71];
const TEAL_LIGHT = [0.55, 0.93, 0.88];
const SALMON = [0.91, 0.42, 0.33];
const WHITE = [0.95, 0.95, 1.0];

function rng(seed: number) {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

function put(arr: Float32Array, i: number, x: number, y: number, z: number) {
  arr[i * 3] = x;
  arr[i * 3 + 1] = y;
  arr[i * 3 + 2] = z;
}

function lerp3(a: number[], b: number[], t: number) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

/** A brain: two folded hemispheres with a midline fissure, a cerebellum, and a brain stem. */
export function brain(n: number): Cloud {
  const r = rng(11);
  const pos = new Float32Array(n * 3);
  const col = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const pick = r();
    let x: number, y: number, z: number;
    let c: number[];
    if (pick < 0.82) {
      // Cerebrum: a stretched sphere, pinched at the midline, folded into gyri.
      const u = r() * 2 - 1;
      const th = r() * Math.PI * 2;
      const s = Math.sqrt(1 - u * u);
      let dx = s * Math.cos(th);
      let dy = u;
      const dz = s * Math.sin(th);
      if (dy < -0.35) dy = -0.35 + (dy + 0.35) * 0.45; // flatter underside
      const fold =
        1 +
        0.075 * Math.sin(9 * th + 3.5 * Math.sin(5 * u)) * Math.sin(8 * u + 2.5 * Math.sin(4 * th)) +
        0.03 * Math.sin(23 * th + 17 * u);
      const fissure = dy > -0.1 ? 1 - 0.28 * Math.exp(-((dx / 0.1) ** 2)) : 1;
      const depth = 1 - r() * 0.06;
      const rad = fold * fissure * depth;
      dx = dx * 1.18 * rad;
      x = dx + Math.sign(dx || 1) * 0.04;
      y = dy * 1.0 * rad + 0.25;
      z = dz * 1.55 * rad;
      const shade = 0.55 + 0.45 * (0.5 + 0.5 * Math.sin(9 * th + 8 * u));
      c = lerp3(INDIGO, INDIGO_LIGHT, shade * r());
    } else if (pick < 0.95) {
      // Cerebellum: a smaller lobe at the back and bottom, with fine horizontal folds.
      const u = r() * 2 - 1;
      const th = r() * Math.PI * 2;
      const s = Math.sqrt(1 - u * u);
      const stripe = 1 + 0.06 * Math.sin(u * 40);
      x = s * Math.cos(th) * 0.78 * stripe;
      y = u * 0.42 * stripe - 0.72;
      z = s * Math.sin(th) * 0.55 * stripe - 1.05;
      c = lerp3(INDIGO, WHITE, 0.15 + r() * 0.2);
    } else {
      // Brain stem.
      const t = r();
      const a = r() * Math.PI * 2;
      const rad = 0.2 - t * 0.06;
      x = Math.cos(a) * rad;
      y = -0.55 - t * 1.25;
      z = Math.sin(a) * rad - 0.45 - t * 0.2;
      c = lerp3(INDIGO, TEAL, 0.25 + t * 0.4);
    }
    put(pos, i, x, y, z);
    put(col, i, c[0], c[1], c[2]);
  }
  return { pos, col };
}

/** The brain pulled apart: a loose cloud of points. */
export function scatter(n: number): Cloud {
  const r = rng(23);
  const pos = new Float32Array(n * 3);
  const col = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const u = r() * 2 - 1;
    const th = r() * Math.PI * 2;
    const s = Math.sqrt(1 - u * u);
    const rad = 1.3 + Math.pow(r(), 0.7) * 1.9;
    put(pos, i, s * Math.cos(th) * rad * 1.3, u * rad * 0.9, s * Math.sin(th) * rad);
    const c = lerp3(INDIGO, TEAL, r());
    put(col, i, c[0], c[1], c[2]);
  }
  return { pos, col };
}

/** One neuron: a cell body, branching dendrites, a myelinated axon, and axon terminals. */
export function neuron(n: number): Cloud {
  const r = rng(37);
  const pos = new Float32Array(n * 3);
  const col = new Float32Array(n * 3);
  const soma = [0, 1.05, 0];

  // Dendrite branches as line segments [start, end, radius].
  const segs: [number[], number[], number][] = [];
  const branch = (from: number[], dir: number[], len: number, rad: number, depth: number) => {
    const to = [from[0] + dir[0] * len, from[1] + dir[1] * len, from[2] + dir[2] * len];
    segs.push([from, to, rad]);
    if (depth > 0) {
      for (let k = 0; k < 2; k++) {
        const jitter = () => (r() - 0.5) * 0.9;
        const nd = [dir[0] + jitter(), dir[1] + jitter() * 0.6, dir[2] + jitter()];
        const l = Math.hypot(nd[0], nd[1], nd[2]);
        branch(to, [nd[0] / l, nd[1] / l, nd[2] / l], len * 0.62, rad * 0.65, depth - 1);
      }
    }
  };
  const starts = 7;
  for (let k = 0; k < starts; k++) {
    const a = (k / starts) * Math.PI * 2 + 0.3;
    const up = 0.35 + r() * 0.6;
    const d = [Math.cos(a) * 0.9, up, Math.sin(a) * 0.9];
    const l = Math.hypot(d[0], d[1], d[2]);
    const dir = [d[0] / l, d[1] / l, d[2] / l];
    branch([soma[0] + dir[0] * 0.3, soma[1] + dir[1] * 0.3, soma[2] + dir[2] * 0.3], dir, 0.65, 0.06, 2);
  }
  const segLen = segs.map(([a, b]) => Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]));
  const totalLen = segLen.reduce((s, v) => s + v, 0);

  for (let i = 0; i < n; i++) {
    const pick = r();
    let p: number[];
    let c: number[];
    if (pick < 0.22) {
      // Cell body: a slightly flattened sphere with a bright nucleus.
      const u = r() * 2 - 1;
      const th = r() * Math.PI * 2;
      const s = Math.sqrt(1 - u * u);
      const inner = r() < 0.25;
      const rad = inner ? 0.12 * Math.cbrt(r()) : 0.32 * (0.92 + r() * 0.08);
      p = [soma[0] + s * Math.cos(th) * rad, soma[1] + u * rad * 0.85, soma[2] + s * Math.sin(th) * rad];
      c = inner ? SALMON : lerp3(INDIGO, INDIGO_LIGHT, r());
    } else if (pick < 0.58) {
      // Dendrites, sampled by length.
      let t = r() * totalLen;
      let k = 0;
      while (k < segs.length - 1 && t > segLen[k]) t -= segLen[k++];
      const [a, b, rad] = segs[k];
      const f = t / segLen[k];
      const a2 = r() * Math.PI * 2;
      const rr = rad * Math.sqrt(r());
      p = [
        a[0] + (b[0] - a[0]) * f + Math.cos(a2) * rr,
        a[1] + (b[1] - a[1]) * f + Math.sin(a2) * rr,
        a[2] + (b[2] - a[2]) * f + Math.sin(a2 * 1.3) * rr,
      ];
      c = lerp3(INDIGO, INDIGO_LIGHT, 0.3 + r() * 0.5);
    } else if (pick < 0.9) {
      // Axon going down, wrapped in myelin segments with small gaps between them.
      const t = r();
      const y = soma[1] - 0.3 - t * 2.65;
      const sway = Math.sin(t * 5) * 0.08;
      const segPos = (t * 7) % 1;
      const myelin = segPos > 0.12;
      const rad = myelin ? 0.085 + r() * 0.03 : 0.03 * r();
      const a2 = r() * Math.PI * 2;
      p = [sway + Math.cos(a2) * rad, y, Math.sin(a2) * rad];
      c = myelin ? lerp3(INDIGO, TEAL, t * 0.8) : WHITE;
    } else {
      // Axon terminals fanning out at the bottom.
      const k = Math.floor(r() * 6);
      const a = (k / 6) * Math.PI * 2;
      const t = r();
      const base = [Math.sin(5) * 0.08, soma[1] - 2.95, 0];
      const end = [Math.cos(a) * 0.6, base[1] - 0.45, Math.sin(a) * 0.6];
      p = [base[0] + (end[0] - base[0]) * t, base[1] + (end[1] - base[1]) * t, base[2] + (end[2] - base[2]) * t];
      if (t > 0.9) {
        p[0] += (r() - 0.5) * 0.12;
        p[1] += (r() - 0.5) * 0.12;
        p[2] += (r() - 0.5) * 0.12;
      }
      c = lerp3(TEAL, TEAL_LIGHT, r());
    }
    put(pos, i, p[0], p[1], p[2]);
    put(col, i, c[0], c[1], c[2]);
  }
  return { pos, col };
}

/** A DNA double helix: two backbones and the base pairs between them. */
export function helix(n: number): Cloud {
  const r = rng(53);
  const pos = new Float32Array(n * 3);
  const col = new Float32Array(n * 3);
  const height = 4.2;
  const turns = 3.2;
  const radius = 0.62;
  const pairs = 44;
  for (let i = 0; i < n; i++) {
    const pick = r();
    let p: number[];
    let c: number[];
    if (pick < 0.62) {
      const strand = r() < 0.5 ? 0 : 1;
      const t = r();
      const a = t * turns * Math.PI * 2 + strand * Math.PI;
      const tube = 0.05 * Math.sqrt(r());
      const ta = r() * Math.PI * 2;
      p = [
        Math.cos(a) * radius + Math.cos(ta) * tube,
        (t - 0.5) * height + Math.sin(ta) * tube,
        Math.sin(a) * radius + Math.sin(ta) * tube,
      ];
      c = strand === 0 ? lerp3(TEAL, TEAL_LIGHT, r() * 0.6) : lerp3(INDIGO, INDIGO_LIGHT, r() * 0.6);
    } else {
      const k = Math.floor(r() * pairs);
      const t = (k + 0.5) / pairs;
      const a = t * turns * Math.PI * 2;
      const f = r();
      const x1 = Math.cos(a) * radius;
      const z1 = Math.sin(a) * radius;
      const x2 = Math.cos(a + Math.PI) * radius;
      const z2 = Math.sin(a + Math.PI) * radius;
      p = [x1 + (x2 - x1) * f + (r() - 0.5) * 0.03, (t - 0.5) * height + (r() - 0.5) * 0.03, z1 + (z2 - z1) * f + (r() - 0.5) * 0.03];
      // Each base pair is two colors, one per half, like a real A-T or G-C pair.
      const half = f < 0.5 ? (k % 2 ? TEAL_LIGHT : SALMON) : k % 2 ? SALMON : TEAL_LIGHT;
      c = lerp3(half, WHITE, 0.15);
    }
    put(pos, i, p[0], p[1], p[2]);
    put(col, i, c[0], c[1], c[2]);
  }
  return { pos, col };
}
