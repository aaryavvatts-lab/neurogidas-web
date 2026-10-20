// A living neural network drawn on canvas. Neurons drift slightly, signals travel along
// their connections and set off small cascades, and the pointer (or a tap) fires the nearest
// neurons. Signals start indigo near the top and turn teal toward the bottom, the same
// neuron-to-DNA idea as the club logo. One rAF loop per field, paused off screen and when the
// tab is hidden. Under reduced motion it draws one still frame.

type Node = { x: number; y: number; bx: number; by: number; ph: number; amp: number; glow: number; links: number[] };
type Signal = { a: number; b: number; t: number; speed: number; gen: number };

const INDIGO = [124, 110, 240];
const TEAL = [38, 196, 182];

function mix(t: number) {
  const k = Math.min(1, Math.max(0, t));
  return INDIGO.map((c, i) => Math.round(c + (TEAL[i] - c) * k));
}

function rgba(c: number[], a: number) {
  return `rgba(${c[0]},${c[1]},${c[2]},${a})`;
}

export function mountField(host: HTMLElement) {
  if (host.dataset.fieldMounted) return;
  host.dataset.fieldMounted = '1';

  const density = Number(host.dataset.density ?? (host.classList.contains('page-head') ? '0.75' : '1'));
  const canvas = document.createElement('canvas');
  canvas.className = 'neural-field';
  canvas.setAttribute('aria-hidden', 'true');
  host.prepend(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w = 0;
  let h = 0;
  let nodes: Node[] = [];
  let signals: Signal[] = [];
  let running = false;
  let visible = true;
  let raf = 0;
  let last = 0;
  let nextSpawn = 0;
  let pointerT = 0;

  function build() {
    const r = host.getBoundingClientRect();
    w = Math.max(1, r.width);
    h = Math.max(1, r.height);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Jittered grid so neurons spread evenly without looking like a grid.
    const target = Math.min(140, Math.max(28, Math.round(((w * h) / 15000) * density)));
    const cols = Math.max(4, Math.round(Math.sqrt((target * w) / h)));
    const rows = Math.max(3, Math.round(target / cols));
    const cw = w / cols;
    const ch = h / rows;
    nodes = [];
    let seed = 7;
    const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const bx = (i + 0.15 + rand() * 0.7) * cw;
        const by = (j + 0.15 + rand() * 0.7) * ch;
        nodes.push({ x: bx, y: by, bx, by, ph: rand() * Math.PI * 2, amp: 2 + rand() * 4, glow: 0, links: [] });
      }
    }
    // Connect each neuron to its nearest neighbors.
    const maxD = Math.max(cw, ch) * 1.75;
    nodes.forEach((n, i) => {
      nodes
        .map((m, j) => ({ j, d: Math.hypot(m.bx - n.bx, m.by - n.by) }))
        .filter((o) => o.j !== i && o.d < maxD)
        .sort((a, b) => a.d - b.d)
        .slice(0, 3)
        .forEach(({ j }) => {
          if (!n.links.includes(j)) n.links.push(j);
          if (!nodes[j].links.includes(i)) nodes[j].links.push(i);
        });
    });
    signals = [];
  }

  function fire(i: number, gen = 0) {
    const n = nodes[i];
    if (!n) return;
    n.glow = 1;
    if (gen > 3 || signals.length > 90) return;
    const count = gen === 0 ? n.links.length : Math.random() < 0.55 ? 1 : 0;
    [...n.links]
      .sort(() => Math.random() - 0.5)
      .slice(0, count)
      .forEach((b) => signals.push({ a: i, b, t: 0, speed: 0.0014 + Math.random() * 0.0012, gen: gen + 1 }));
  }

  function nearest(x: number, y: number) {
    let best = -1;
    let bd = Infinity;
    nodes.forEach((n, i) => {
      const d = (n.x - x) ** 2 + (n.y - y) ** 2;
      if (d < bd) {
        bd = d;
        best = i;
      }
    });
    return best;
  }

  function draw() {
    const c2 = ctx!;
    c2.clearRect(0, 0, w, h);

    c2.lineWidth = 1;
    c2.strokeStyle = 'rgba(255,255,255,0.1)';
    c2.beginPath();
    nodes.forEach((n, i) => {
      n.links.forEach((j) => {
        if (j > i) {
          c2.moveTo(n.x, n.y);
          c2.lineTo(nodes[j].x, nodes[j].y);
        }
      });
    });
    c2.stroke();

    signals.forEach((s) => {
      const a = nodes[s.a];
      const b = nodes[s.b];
      const x = a.x + (b.x - a.x) * s.t;
      const y = a.y + (b.y - a.y) * s.t;
      const tt = Math.max(0, s.t - 0.22);
      const tx = a.x + (b.x - a.x) * tt;
      const ty = a.y + (b.y - a.y) * tt;
      const c = mix(y / h);
      const g = c2.createLinearGradient(tx, ty, x, y);
      g.addColorStop(0, rgba(c, 0));
      g.addColorStop(1, rgba(c, 0.95));
      c2.strokeStyle = g;
      c2.lineWidth = 2;
      c2.beginPath();
      c2.moveTo(tx, ty);
      c2.lineTo(x, y);
      c2.stroke();
      c2.fillStyle = rgba(c, 1);
      c2.beginPath();
      c2.arc(x, y, 1.9, 0, Math.PI * 2);
      c2.fill();
    });

    nodes.forEach((n) => {
      const c = mix(n.y / h);
      if (n.glow > 0.02) {
        const r = 3 + n.glow * 16;
        const g = c2.createRadialGradient(n.x, n.y, 0, n.x, n.y, r);
        g.addColorStop(0, rgba(c, 0.55 * n.glow));
        g.addColorStop(1, rgba(c, 0));
        c2.fillStyle = g;
        c2.beginPath();
        c2.arc(n.x, n.y, r, 0, Math.PI * 2);
        c2.fill();
      }
      c2.fillStyle = n.glow > 0.1 ? rgba(c, 0.6 + n.glow * 0.4) : 'rgba(255,255,255,0.42)';
      c2.beginPath();
      c2.arc(n.x, n.y, 1.6 + n.glow * 1.4, 0, Math.PI * 2);
      c2.fill();
    });
  }

  function step(time: number) {
    const dt = Math.min(48, last ? time - last : 16);
    last = time;

    nodes.forEach((n) => {
      n.x = n.bx + Math.sin(time * 0.0004 + n.ph) * n.amp;
      n.y = n.by + Math.cos(time * 0.00033 + n.ph) * n.amp;
      n.glow *= Math.pow(0.0025, dt / 1000);
    });

    const arrived: Signal[] = [];
    signals.forEach((s) => {
      s.t += s.speed * dt;
      if (s.t >= 1) arrived.push(s);
    });
    signals = signals.filter((s) => s.t < 1);
    arrived.forEach((s) => fire(s.b, s.gen));

    // Idle activity: a neuron fires on its own every so often.
    if (time > nextSpawn) {
      fire(Math.floor(Math.random() * nodes.length));
      nextSpawn = time + 550 + Math.random() * 900;
    }

    draw();
    if (running) raf = requestAnimationFrame(step);
  }

  function start() {
    if (running || reduce || !visible || document.hidden) return;
    running = true;
    last = 0;
    raf = requestAnimationFrame(step);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  function still() {
    // A designed still frame: a few neurons lit across the field.
    [0.18, 0.36, 0.52, 0.7].forEach((f) => {
      const n = nodes[Math.floor(f * nodes.length)];
      if (n) n.glow = 0.9;
    });
    draw();
  }

  build();
  if (reduce) still();
  else {
    fire(nearest(w * 0.72, h * 0.3));
    start();
  }

  new ResizeObserver(() => {
    build();
    if (reduce) still();
  }).observe(host);

  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible) start();
    else stop();
  }).observe(host);

  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

  if (!reduce) {
    host.addEventListener('pointermove', (e) => {
      const now = performance.now();
      if (now - pointerT < 140) return;
      pointerT = now;
      const r = host.getBoundingClientRect();
      fire(nearest(e.clientX - r.left, e.clientY - r.top));
    });
    host.addEventListener('pointerdown', (e) => {
      const r = host.getBoundingClientRect();
      const i = nearest(e.clientX - r.left, e.clientY - r.top);
      fire(i);
      nodes[i]?.links.forEach((j) => fire(j, 1));
    });
  }
}

export function mountAll() {
  document.querySelectorAll<HTMLElement>('[data-neural], .page-head').forEach(mountField);
}
