import { getWorld, type GridForm, type WorldId } from "@/lib/gridWorlds";

export interface Rgb {
  r: number;
  g: number;
  b: number;
}

export interface CreateGridRendererOptions {
  canvas: HTMLCanvasElement;
  world: WorldId;
  reducedMotion: boolean;
}

export interface GridRenderer {
  start(): void;
  stop(): void;
  setWorld(world: WorldId): void;
  resize(): void;
  destroy(): void;
}

interface PaletteColors {
  bg: Rgb;
  grid: Rgb;
  grid2: Rgb;
  glow: Rgb;
}

interface Pulse {
  x: number;
  y: number;
  t: number;
}

const BLACK: Rgb = { r: 0, g: 0, b: 0 };

export function hexToRgb(hex: string): Rgb {
  let value = hex.trim().replace(/^#/, "");
  if (value.length === 3) {
    value = value
      .split("")
      .map((char) => char + char)
      .join("");
  }
  const n = parseInt(value, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export function mixRgb(from: Rgb, to: Rgb, t: number): Rgb {
  return {
    r: from.r + (to.r - from.r) * t,
    g: from.g + (to.g - from.g) * t,
    b: from.b + (to.b - from.b) * t,
  };
}

export function rgba(rgb: Rgb, alpha: number): string {
  return "rgba(" + (rgb.r | 0) + "," + (rgb.g | 0) + "," + (rgb.b | 0) + "," + alpha + ")";
}

function paletteFor(world: WorldId): PaletteColors {
  const { palette } = getWorld(world);
  return {
    bg: hexToRgb(palette.bg),
    grid: hexToRgb(palette.line),
    grid2: hexToRgb(palette.line2),
    glow: hexToRgb(palette.glow),
  };
}

export function createGridRenderer(
  options: CreateGridRendererOptions
): GridRenderer {
  const { canvas, reducedMotion } = options;
  const ctxOrNull = canvas.getContext("2d");

  if (!ctxOrNull) {
    return {
      start() {},
      stop() {},
      setWorld() {},
      resize() {},
      destroy() {},
    };
  }

  const ctx: CanvasRenderingContext2D = ctxOrNull;

  let worldId: WorldId = options.world;
  let form: GridForm = getWorld(worldId).form;

  let target: PaletteColors = paletteFor(worldId);
  let cur: PaletteColors = {
    bg: { ...target.bg },
    grid: { ...target.grid },
    grid2: { ...target.grid2 },
    glow: { ...target.glow },
  };

  let w = 0;
  let h = 0;
  let dpr = 1;
  let px = 0;
  let py = 0;
  let tx = 0;
  let ty = 0;
  let lastMove = 0;
  let hasPointer = false;
  let pulses: Pulse[] = [];
  let raf = 0;
  let running = false;

  function resize(): void {
    const parent = canvas.parentElement;
    let width = parent ? parent.clientWidth : 0;
    let height = parent ? parent.clientHeight : 0;

    if (!width || !height) {
      const rect = canvas.getBoundingClientRect();
      width = width || rect.width;
      height = height || rect.height;
    }

    if (!width || !height) {
      width = window.innerWidth;
      height = window.innerHeight;
    }

    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = width;
    h = height;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    if (!hasPointer) {
      px = tx = w * 0.5;
      py = ty = h * 0.55;
    }

    if (reducedMotion) drawFrame(performance.now());
  }

  function updatePointer(now: number): void {
    if (!hasPointer || now - lastMove > 4800) {
      const t = now * 0.001;
      tx = w * 0.5 + Math.cos(t * 0.34) * w * 0.11;
      ty = h * 0.54 + Math.sin(t * 0.46) * h * 0.075;
    }
    px += (tx - px) * 0.075;
    py += (ty - py) * 0.075;
  }

  function warpPoint(
    x: number,
    y: number,
    now: number,
    strength: number
  ): [number, number] {
    const dx = x - px;
    const dy = y - py;
    const dist = Math.hypot(dx, dy) || 1;
    const sigma = Math.max(160, Math.min(w, h) * 0.26);
    const influence = Math.exp(-(dist * dist) / (2 * sigma * sigma));
    const pull = influence * strength;
    const ripple =
      Math.sin(dist * 0.042 - now * 0.0035) * Math.exp(-dist / 360) * 5;
    return [
      x - dx * pull + (dx / dist) * ripple,
      y - dy * pull * 0.34 + (dy / dist) * ripple * 0.55,
    ];
  }

  function drawPulses(now: number): void {
    pulses = pulses.filter((pulse) => now - pulse.t < 1500);
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    pulses.forEach((pulse) => {
      const age = (now - pulse.t) / 1500;
      const radius = 18 + age * Math.min(w, h) * 0.55;
      ctx.beginPath();
      ctx.arc(pulse.x, pulse.y, radius, 0, Math.PI * 2);
      ctx.strokeStyle = rgba(cur.grid2, (1 - age) * 0.5);
      ctx.lineWidth = Math.max(0.6, 2 - age * 1.4);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(pulse.x, pulse.y, radius * 0.72, 0, Math.PI * 2);
      ctx.strokeStyle = rgba(cur.glow, (1 - age) * 0.22);
      ctx.lineWidth = 1;
      ctx.stroke();
    });
    ctx.restore();
  }

  function drawCursor(): void {
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    const halo = ctx.createRadialGradient(px, py, 0, px, py, 90);
    halo.addColorStop(0, rgba(cur.grid2, 0.1));
    halo.addColorStop(0.35, rgba(cur.glow, 0.045));
    halo.addColorStop(1, rgba(cur.glow, 0));
    ctx.fillStyle = halo;
    ctx.beginPath();
    ctx.arc(px, py, 90, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(px, py, 12, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(cur.grid2, 0.42);
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(px, py, 2.2, 0, Math.PI * 2);
    ctx.fillStyle = rgba(cur.grid2, 0.9);
    ctx.fill();
    ctx.restore();
  }

  function drawSky(horizon: number): void {
    const sky = ctx.createLinearGradient(0, 0, 0, horizon);
    sky.addColorStop(0, rgba(cur.bg, 1));
    sky.addColorStop(0.62, rgba(mixRgb(cur.bg, cur.grid, 0.035), 1));
    sky.addColorStop(1, rgba(mixRgb(cur.bg, cur.grid, 0.12), 1));
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, horizon + 1);

    const ground = ctx.createLinearGradient(0, horizon, 0, h);
    ground.addColorStop(0, rgba(mixRgb(cur.bg, cur.grid, 0.09), 1));
    ground.addColorStop(0.25, rgba(cur.bg, 1));
    ground.addColorStop(1, rgba(mixRgb(cur.bg, BLACK, 0.22), 1));
    ctx.fillStyle = ground;
    ctx.fillRect(0, horizon, w, h - horizon);

    const glow = ctx.createRadialGradient(px, horizon, 0, px, horizon, w * 0.55);
    glow.addColorStop(0, rgba(cur.glow, 0.26));
    glow.addColorStop(0.26, rgba(cur.grid2, 0.09));
    glow.addColorStop(1, rgba(cur.grid, 0));
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.fillStyle = glow;
    ctx.fillRect(0, horizon - h * 0.32, w, h * 0.55);
    ctx.restore();
  }

  function drawHorizonLine(horizon: number): void {
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    const line = ctx.createLinearGradient(0, 0, w, 0);
    line.addColorStop(0, rgba(cur.grid, 0));
    line.addColorStop(0.18, rgba(cur.grid, 0.22));
    line.addColorStop(0.5, rgba(cur.grid2, 0.8));
    line.addColorStop(0.82, rgba(cur.grid, 0.22));
    line.addColorStop(1, rgba(cur.grid, 0));
    ctx.strokeStyle = line;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, horizon);
    ctx.lineTo(w, horizon);
    ctx.stroke();
    ctx.restore();
  }

  function drawFloor(now: number): void {
    const speed = 1;
    const warp = 0.17;
    const lineAlpha = 0.5;

    const horizon = h * 0.555;
    const cx = w * 0.5 + (px - w * 0.5) * 0.05;
    drawSky(horizon);

    // Distant monoliths for a faint Tron skyline.
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (let i = 0; i < 13; i += 1) {
      const baseX = w * (0.06 + i * 0.075);
      const offset = Math.sin(i * 2.7) * w * 0.012;
      const bw = 2 + (i % 4) * 2;
      const bh = h * (0.025 + (((i * 37) % 100) / 100) * 0.09);
      const alpha = 0.035 + ((i * 13) % 7) * 0.008;
      ctx.fillStyle = rgba(cur.grid, alpha);
      ctx.fillRect(baseX + offset, horizon - bh, bw, bh);
      ctx.fillStyle = rgba(cur.grid2, alpha * 0.7);
      ctx.fillRect(baseX + offset, horizon - bh, 1, bh);
    }
    ctx.restore();

    drawHorizonLine(horizon);

    ctx.save();
    ctx.beginPath();
    ctx.rect(0, horizon, w, h - horizon);
    ctx.clip();
    ctx.globalCompositeOperation = "lighter";
    ctx.lineCap = "round";

    const verticalGradient = ctx.createLinearGradient(0, horizon, 0, h);
    verticalGradient.addColorStop(0, rgba(cur.grid, 0.01));
    verticalGradient.addColorStop(0.35, rgba(cur.grid, 0.14));
    verticalGradient.addColorStop(1, rgba(cur.grid, lineAlpha));

    const spacing = Math.max(52, w / 13);
    const sideShift = (now * 0.00003 * speed * spacing) % spacing;
    const columns = Math.ceil(w / spacing) + 3;

    for (let k = -columns; k <= columns; k += 1) {
      const bottomX = cx + k * spacing + sideShift;
      if (bottomX < -spacing || bottomX > w + spacing) continue;
      const points: Array<[number, number]> = [];
      const steps = 22;
      for (let s = 0; s <= steps; s += 1) {
        const p = s / steps;
        const y = horizon + (h - horizon) * p;
        const x = cx + (bottomX - cx) * p;
        points.push(warpPoint(x, y, now, warp));
      }
      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      for (let s = 1; s < points.length; s += 1) {
        ctx.lineTo(points[s][0], points[s][1]);
      }
      ctx.strokeStyle = verticalGradient;
      ctx.lineWidth = 5;
      ctx.globalAlpha = 0.09;
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    const rows = 26;
    const phase = (now * 0.00005 * speed) % 1;
    for (let i = 0; i < rows; i += 1) {
      const raw = (i / rows + phase) % 1;
      const p = Math.pow(raw, 2.35);
      const baseY = horizon + 2 + (h - horizon) * p;
      if (baseY > h + 30) continue;
      const alpha = 0.06 + raw * lineAlpha * 0.7;
      const points: Array<[number, number]> = [];
      const stepX = Math.max(12, w / 70);
      for (let x = -stepX; x <= w + stepX; x += stepX) {
        points.push(warpPoint(x, baseY, now, warp));
      }
      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      for (let s = 1; s < points.length; s += 1) {
        ctx.lineTo(points[s][0], points[s][1]);
      }
      ctx.strokeStyle = rgba(cur.grid, alpha);
      ctx.lineWidth = 4;
      ctx.globalAlpha = 0.08;
      ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.lineWidth = raw > 0.7 ? 1.35 : 1;
      ctx.stroke();
    }

    ctx.restore();
    drawCursor();
  }

  function drawTunnel(now: number): void {
    const speed = 1.35;
    const t = now * 0.001;
    const cx = w * 0.5 + (px - w * 0.5) * 0.09;
    const cy = h * 0.52 + (py - h * 0.5) * 0.07;

    const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.7);
    bg.addColorStop(0, rgba(mixRgb(cur.bg, cur.grid, 0.14), 1));
    bg.addColorStop(0.32, rgba(cur.bg, 1));
    bg.addColorStop(1, rgba(mixRgb(cur.bg, BLACK, 0.55), 1));
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    ctx.translate(cx, cy);
    const drift = Math.sin(t * 0.22) * 0.018;
    ctx.rotate(drift);

    const phases = (t * speed * 0.22) % 1;
    const rings = 20;
    for (let i = 0; i < rings; i += 1) {
      const raw = (i / rings + phases) % 1;
      const scale = Math.pow(raw, 2.15);
      const rw = w * 0.028 + scale * w * 1.5;
      const rh = h * 0.022 + scale * h * 1.32;
      const alpha =
        (0.03 + (1 - raw) * 0.46) * (0.72 + 0.28 * Math.sin(t * 2.2 + i));
      const x = -rw * 0.5 + (px - w * 0.5) * scale * 0.12;
      const y = -rh * 0.5 + (py - h * 0.5) * scale * 0.08;

      ctx.beginPath();
      ctx.rect(x, y, rw, rh);
      ctx.strokeStyle = rgba(cur.grid, alpha);
      ctx.lineWidth = Math.max(0.65, 1.4 - raw * 0.7);
      ctx.stroke();

      if (raw < 0.45) {
        ctx.beginPath();
        ctx.rect(x, y, rw, rh);
        ctx.strokeStyle = rgba(cur.grid2, alpha * 0.4);
        ctx.lineWidth = 5;
        ctx.globalAlpha = 0.16;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }

    const rays = 18;
    for (let i = 0; i < rays; i += 1) {
      const angle = (i / rays) * Math.PI * 2 + t * 0.015;
      const reach = Math.max(w, h) * 1.4;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(angle) * reach, Math.sin(angle) * reach);
      ctx.strokeStyle = rgba(cur.grid, 0.09);
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    const portal = ctx.createRadialGradient(
      0,
      0,
      0,
      0,
      0,
      Math.min(w, h) * 0.17
    );
    portal.addColorStop(0, rgba(cur.grid2, 0.42));
    portal.addColorStop(0.22, rgba(cur.grid, 0.19));
    portal.addColorStop(1, rgba(cur.grid, 0));
    ctx.fillStyle = portal;
    ctx.beginPath();
    ctx.arc(0, 0, Math.min(w, h) * 0.17, 0, Math.PI * 2);
    ctx.fill();

    const pulse = (t * speed * 0.55) % 1;
    ctx.beginPath();
    ctx.arc(
      0,
      0,
      24 + Math.pow(pulse, 2.2) * Math.min(w, h) * 0.62,
      0,
      Math.PI * 2
    );
    ctx.strokeStyle = rgba(cur.grid2, (1 - pulse) * 0.2);
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.restore();
    drawCursor();
  }

  function drawSolar(now: number): void {
    const speed = 1;
    const warp = 0.17;
    const t = now * 0.001;
    const horizon = h * 0.55;
    const cx = w * 0.5 + (px - w * 0.5) * 0.06;

    const sky = ctx.createLinearGradient(0, 0, 0, horizon);
    sky.addColorStop(0, "#f8efe4");
    sky.addColorStop(0.55, "#f1ddc9");
    sky.addColorStop(1, "#e6c2a0");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, horizon + 1);

    const ground = ctx.createLinearGradient(0, horizon, 0, h);
    ground.addColorStop(0, "#e8c9aa");
    ground.addColorStop(0.25, "#f0dcc5");
    ground.addColorStop(1, "#dcb38d");
    ctx.fillStyle = ground;
    ctx.fillRect(0, horizon, w, h - horizon);

    const sunY = horizon - h * 0.035;
    const sunR = Math.min(w, h) * 0.075;
    const sunGlow = ctx.createRadialGradient(cx, sunY, 0, cx, sunY, sunR * 3.4);
    sunGlow.addColorStop(0, "rgba(255, 245, 220, 0.95)");
    sunGlow.addColorStop(0.18, "rgba(255, 196, 128, 0.72)");
    sunGlow.addColorStop(0.48, "rgba(255, 122, 61, 0.2)");
    sunGlow.addColorStop(1, "rgba(255, 122, 61, 0)");
    ctx.fillStyle = sunGlow;
    ctx.fillRect(cx - sunR * 3.4, sunY - sunR * 3.4, sunR * 6.8, sunR * 6.8);

    ctx.beginPath();
    ctx.arc(cx, sunY, sunR, 0, Math.PI * 2);
    ctx.fillStyle = "#ffd9a0";
    ctx.fill();
    for (let i = 0; i < 4; i += 1) {
      const y = sunY - sunR * 0.5 + i * sunR * 0.34;
      const band = Math.sqrt(Math.max(0, sunR * sunR - Math.pow(y - sunY, 2)));
      ctx.fillStyle =
        i % 2 === 0 ? "rgba(243, 232, 218, 0.62)" : "rgba(243, 232, 218, 0.35)";
      ctx.fillRect(cx - band, y, band * 2, 2.5);
    }

    // Layered wireframe ridges at the horizon.
    for (let layer = 0; layer < 3; layer += 1) {
      const alpha = 0.12 - layer * 0.025;
      const amp = 18 + layer * 14;
      ctx.beginPath();
      for (let x = -10; x <= w + 10; x += 16) {
        const y =
          horizon -
          amp *
            (0.35 +
              0.3 * Math.sin(x * 0.006 + layer * 2.1) +
              0.2 * Math.sin(x * 0.017 + layer));
        if (x === -10) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(90, 45, 25, " + alpha + ")";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    ctx.save();
    ctx.beginPath();
    ctx.rect(0, horizon, w, h - horizon);
    ctx.clip();
    ctx.lineCap = "round";

    const groundGlow = ctx.createRadialGradient(cx, horizon, 0, cx, horizon, w * 0.5);
    groundGlow.addColorStop(0, "rgba(255, 190, 120, 0.35)");
    groundGlow.addColorStop(0.45, "rgba(255, 160, 90, 0.08)");
    groundGlow.addColorStop(1, "rgba(255, 160, 90, 0)");
    ctx.fillStyle = groundGlow;
    ctx.fillRect(0, horizon - 40, w, h - horizon + 40);

    const spacing = Math.max(54, w / 12);
    const sideShift = (now * 0.00002 * speed * spacing) % spacing;
    const columns = Math.ceil(w / spacing) + 3;
    for (let k = -columns; k <= columns; k += 1) {
      const bottomX = cx + k * spacing + sideShift;
      if (bottomX < -spacing || bottomX > w + spacing) continue;
      const points: Array<[number, number]> = [];
      const steps = 22;
      for (let s = 0; s <= steps; s += 1) {
        const p = s / steps;
        const y = horizon + (h - horizon) * p;
        const dune = Math.sin(x2px(p, bottomX, cx) * 0.008 + t * 0.5) * p * 5;
        const x = cx + (bottomX - cx) * p;
        points.push(warpPoint(x, y + dune, now, warp));
      }
      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      for (let s = 1; s < points.length; s += 1) {
        ctx.lineTo(points[s][0], points[s][1]);
      }
      ctx.strokeStyle = "rgba(105, 54, 30, 0.26)";
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    const rows = 24;
    const phase = (now * 0.000035 * speed) % 1;
    for (let i = 0; i < rows; i += 1) {
      const raw = (i / rows + phase) % 1;
      const p = Math.pow(raw, 2.3);
      const baseY = horizon + 2 + (h - horizon) * p;
      if (baseY > h + 30) continue;
      const alpha = 0.06 + raw * 0.3;
      const points: Array<[number, number]> = [];
      const stepX = Math.max(14, w / 64);
      for (let x = -stepX; x <= w + stepX; x += stepX) {
        const dune = Math.sin(x * 0.009 + raw * 8 + t * 0.65) * (3 + p * 8);
        points.push(warpPoint(x, baseY + dune, now, warp));
      }
      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      for (let s = 1; s < points.length; s += 1) {
        ctx.lineTo(points[s][0], points[s][1]);
      }
      ctx.strokeStyle = "rgba(110, 56, 30, " + alpha + ")";
      ctx.lineWidth = raw > 0.7 ? 1.25 : 0.9;
      ctx.stroke();
    }

    // Heat shimmer motes.
    for (let i = 0; i < 36; i += 1) {
      const seed = i * 37.17;
      const x = ((seed * 13.7 + t * (8 + (i % 5) * 3)) % (w + 80)) - 40;
      const y =
        horizon + ((seed * 7.3 + Math.sin(t * 0.5 + i) * 20) % (h - horizon + 80)) - 40;
      ctx.beginPath();
      ctx.arc(x, y, 0.8 + (i % 3) * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(120, 60, 30, 0.22)";
      ctx.fill();
    }

    ctx.restore();

    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    const cursorWarm = ctx.createRadialGradient(px, py, 0, px, py, 120);
    cursorWarm.addColorStop(0, "rgba(255, 180, 110, 0.22)");
    cursorWarm.addColorStop(0.4, "rgba(255, 140, 70, 0.07)");
    cursorWarm.addColorStop(1, "rgba(255, 140, 70, 0)");
    ctx.fillStyle = cursorWarm;
    ctx.beginPath();
    ctx.arc(px, py, 120, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    drawCursor();
  }

  function drawRipple(now: number): void {
    const speed = 0.95;
    const t = now * 0.001;
    const isSolar = worldId === "solar";

    const bg = ctx.createRadialGradient(px, py, 0, px, py, Math.max(w, h) * 0.82);
    bg.addColorStop(0, rgba(mixRgb(cur.bg, cur.grid, 0.18), 1));
    bg.addColorStop(0.42, rgba(cur.bg, 1));
    bg.addColorStop(1, rgba(mixRgb(cur.bg, BLACK, isSolar ? 0.12 : 0.38), 1));
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    ctx.save();
    ctx.globalCompositeOperation = isSolar ? "source-over" : "lighter";
    ctx.lineCap = "round";

    const spacing = Math.max(42, w / 18);
    const columns = Math.ceil(w / spacing) + 2;
    const rows = Math.ceil(h / spacing) + 2;
    const alpha = isSolar ? 0.28 : 0.52;

    function warpPointRipple(x: number, y: number): [number, number] {
      const dx = x - px;
      const dy = y - py;
      const dist = Math.hypot(dx, dy) || 1;
      const wave =
        Math.sin(dist * 0.035 - t * 2.6 * speed) * Math.exp(-dist / 460) * 17 +
        Math.sin(y * 0.012 + t * 0.8 * speed) * 4 +
        Math.sin(x * 0.008 - t * 0.5 * speed) * 3;
      return [x + (dx / dist) * wave, y + (dy / dist) * wave * 0.55];
    }

    function strokeRipple(
      points: Array<[number, number]>,
      width: number,
      color: string | CanvasGradient,
      opacity: number
    ): void {
      ctx.beginPath();
      ctx.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length; i += 1) {
        ctx.lineTo(points[i][0], points[i][1]);
      }
      ctx.strokeStyle = color;
      ctx.lineWidth = width;
      ctx.globalAlpha = opacity;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    for (let c = -2; c <= columns; c += 1) {
      const x = c * spacing;
      const points: Array<[number, number]> = [];
      for (let s = 0; s <= 32; s += 1) {
        points.push(warpPointRipple(x, (s / 32) * (h + 80) - 40));
      }
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, rgba(cur.grid, 0));
      grad.addColorStop(0.16, rgba(cur.grid, alpha * 0.7));
      grad.addColorStop(0.84, rgba(cur.grid, alpha));
      grad.addColorStop(1, rgba(cur.grid, 0));
      if (!isSolar) strokeRipple(points, 5, rgba(cur.grid, 1), 0.055);
      strokeRipple(points, 1, grad, 1);
    }

    for (let r = -2; r <= rows; r += 1) {
      const y = r * spacing;
      const points: Array<[number, number]> = [];
      for (let s = 0; s <= 40; s += 1) {
        points.push(warpPointRipple((s / 40) * (w + 80) - 40, y));
      }
      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, rgba(cur.grid, 0));
      grad.addColorStop(0.16, rgba(cur.grid, alpha * 0.6));
      grad.addColorStop(0.84, rgba(cur.grid, alpha));
      grad.addColorStop(1, rgba(cur.grid, 0));
      if (!isSolar) strokeRipple(points, 5, rgba(cur.grid, 1), 0.055);
      strokeRipple(points, 1, grad, 1);
    }

    for (let i = 0; i < 3; i += 1) {
      const phase = (t * 0.22 * speed + i / 3) % 1;
      const radius = phase * Math.max(w, h) * 0.8;
      ctx.beginPath();
      ctx.arc(px, py, radius, 0, Math.PI * 2);
      ctx.strokeStyle = rgba(cur.grid2, (1 - phase) * (isSolar ? 0.16 : 0.22));
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    const glow = ctx.createRadialGradient(px, py, 0, px, py, Math.min(w, h) * 0.22);
    glow.addColorStop(0, rgba(cur.grid2, isSolar ? 0.14 : 0.18));
    glow.addColorStop(0.4, rgba(cur.glow, 0.05));
    glow.addColorStop(1, rgba(cur.glow, 0));
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(px, py, Math.min(w, h) * 0.22, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
    drawCursor();
  }

  function x2px(p: number, bottomX: number, cx: number): number {
    return cx + (bottomX - cx) * p;
  }

  function drawFrame(now: number): void {
    updatePointer(now);
    cur.bg = mixRgb(cur.bg, target.bg, 0.045);
    cur.grid = mixRgb(cur.grid, target.grid, 0.055);
    cur.grid2 = mixRgb(cur.grid2, target.grid2, 0.055);
    cur.glow = mixRgb(cur.glow, target.glow, 0.055);

    ctx.clearRect(0, 0, w, h);

    if (form === "tunnel") {
      drawTunnel(now);
    } else if (form === "ripple") {
      drawRipple(now);
    } else if (worldId === "solar") {
      drawSolar(now);
    } else {
      drawFloor(now);
    }

    drawPulses(now);

    if (running && !reducedMotion) {
      raf = requestAnimationFrame(drawFrame);
    }
  }

  function start(): void {
    if (running) return;
    running = true;
    resize();
    if (!reducedMotion) drawFrame(performance.now());
  }

  function stop(): void {
    running = false;
    if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  }

  function setWorld(nextWorld: WorldId): void {
    worldId = nextWorld;
    form = getWorld(nextWorld).form;
    target = paletteFor(nextWorld);
    if (reducedMotion) {
      cur = {
        bg: { ...target.bg },
        grid: { ...target.grid },
        grid2: { ...target.grid2 },
        glow: { ...target.glow },
      };
      drawFrame(performance.now());
    }
  }

  function localPoint(event: PointerEvent): { x: number; y: number } | null {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const width = rect.width || w;
    const height = rect.height || h;
    if (x < 0 || y < 0 || x > width || y > height) return null;
    return { x, y };
  }

  const onPointerMove = (event: PointerEvent): void => {
    const point = localPoint(event);
    if (!point) return;
    tx = point.x;
    ty = point.y;
    lastMove = performance.now();
    hasPointer = true;
  };

  const onPointerDown = (event: PointerEvent): void => {
    const targetElement = event.target;
    if (
      targetElement instanceof Element &&
      targetElement.closest('a, button, [role="radio"], input, select, textarea')
    ) {
      return;
    }

    const point = localPoint(event);
    if (!point) return;

    pulses.push({ x: point.x, y: point.y, t: performance.now() });
    if (pulses.length > 8) pulses.splice(0, pulses.length - 8);
  };

  const onVisibilityChange = (): void => {
    if (document.hidden) {
      stop();
    } else if (!reducedMotion) {
      start();
    }
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("pointerdown", onPointerDown, { passive: true });
  document.addEventListener("visibilitychange", onVisibilityChange);

  const observed = canvas.parentElement ?? canvas;
  const resizeObserver =
    typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(() => resize())
      : null;
  resizeObserver?.observe(observed);

  function destroy(): void {
    stop();
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerdown", onPointerDown);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    resizeObserver?.disconnect();
    pulses = [];
  }

  return { start, stop, setWorld, resize, destroy };
}
