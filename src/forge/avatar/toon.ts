import * as THREE from "three";

const gradients = new Map<string, THREE.DataTexture>();

/**
 * Stepped ramp that gives MeshToonMaterial its hard cel-shaded bands.
 * "soft" keeps skin mostly lit with a single gentle shadow step.
 */
export const toonGradient = (kind: "hard" | "soft" = "hard") => {
  const cached = gradients.get(kind);
  if (cached) return cached;
  const steps = kind === "soft" ? [175, 255, 255, 255] : [70, 160, 255];
  const data = new Uint8Array(steps.flatMap((v) => [v, v, v, 255]));
  const tex = new THREE.DataTexture(data, steps.length, 1, THREE.RGBAFormat);
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.needsUpdate = true;
  gradients.set(kind, tex);
  return tex;
};

const canvasTexture = (w: number, h: number, draw: (ctx: CanvasRenderingContext2D) => void) => {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  draw(ctx);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
};

/**
 * Anime eye layers. "white" is the sclera (drawn under the iris), "lash" is the
 * upper lash + lower lid tick (drawn over the iris).
 */
export const makeEyeTexture = (layer: "white" | "lash", flip: boolean) =>
  canvasTexture(256, 256, (ctx) => {
    if (flip) {
      ctx.translate(256, 0);
      ctx.scale(-1, 1);
    }
    if (layer === "white") {
      // sclera: tall rounded almond
      ctx.fillStyle = "#fbfaff";
      ctx.beginPath();
      ctx.moveTo(28, 120);
      ctx.bezierCurveTo(40, 40, 210, 30, 236, 104);
      ctx.bezierCurveTo(240, 190, 190, 236, 128, 236);
      ctx.bezierCurveTo(64, 236, 22, 190, 28, 120);
      ctx.fill();
      // soft lid shadow across the top of the eye
      const g = ctx.createLinearGradient(0, 50, 0, 130);
      g.addColorStop(0, "rgba(120,100,180,0.45)");
      g.addColorStop(1, "rgba(120,100,180,0)");
      ctx.fillStyle = g;
      ctx.fill();
      return;
    }

    // upper lash: thick, swept out at the outer corner
    ctx.fillStyle = "#14101f";
    ctx.beginPath();
    ctx.moveTo(14, 128);
    ctx.bezierCurveTo(30, 30, 214, 14, 250, 92);
    ctx.lineTo(254, 70);
    ctx.lineTo(236, 112);
    ctx.bezierCurveTo(206, 52, 54, 58, 30, 132);
    ctx.closePath();
    ctx.fill();

    // little lower lid tick
    ctx.strokeStyle = "#2a2140";
    ctx.lineWidth = 6;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(150, 236);
    ctx.quadraticCurveTo(196, 226, 222, 196);
    ctx.stroke();
  });

/** Iris with violet→cyan gradient, pupil and two specular glints. */
export const makeIrisTexture = () =>
  canvasTexture(256, 256, (ctx) => {
    const cx = 128;
    const cy = 128;
    const g = ctx.createLinearGradient(0, 30, 0, 230);
    g.addColorStop(0, "#2a1660");
    g.addColorStop(0.45, "#7c5cff");
    g.addColorStop(1, "#38e1ff");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 92, 112, 0, 0, Math.PI * 2);
    ctx.fill();

    // inner ring
    ctx.strokeStyle = "rgba(20,10,50,0.6)";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 88, 108, 0, 0, Math.PI * 2);
    ctx.stroke();

    // pupil
    ctx.fillStyle = "#0d0820";
    ctx.beginPath();
    ctx.ellipse(cx, cy + 6, 40, 52, 0, 0, Math.PI * 2);
    ctx.fill();

    // glints
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.ellipse(cx - 38, cy - 44, 26, 30, -0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx + 36, cy + 50, 11, 11, 0, 0, Math.PI * 2);
    ctx.fill();

    // subtle lower sparkle band
    ctx.fillStyle = "rgba(180,255,255,0.35)";
    ctx.beginPath();
    ctx.ellipse(cx, cy + 74, 54, 18, 0, 0, Math.PI * 2);
    ctx.fill();
  });

export const makeBlushTexture = () =>
  canvasTexture(128, 128, (ctx) => {
    const g = ctx.createRadialGradient(64, 64, 4, 64, 64, 62);
    g.addColorStop(0, "rgba(255,120,150,0.65)");
    g.addColorStop(1, "rgba(255,120,150,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
    // anime blush hatch lines
    ctx.strokeStyle = "rgba(230,80,120,0.55)";
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(38 + i * 20, 76);
      ctx.lineTo(50 + i * 20, 52);
      ctx.stroke();
    }
  });

/** Holographic glyph ring shown on the floating halo behind the head. */
export const makeGlyphRingTexture = () =>
  canvasTexture(1024, 64, (ctx) => {
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.fillRect(0, 0, 1024, 64);
    ctx.font = "bold 34px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#ffffff";
    ctx.textBaseline = "middle";
    const text = "NIRJHAR · 開発者 · FULL STACK · AI · ニルジャル · BUILD · ";
    let x = 0;
    while (x < 1024) {
      ctx.fillText(text, x, 34);
      x += ctx.measureText(text).width;
    }
  });

type CodeLine = { text: string; color: string };

/**
 * Holographic code panel: a canvas that "types" lines in a loop.
 * Call `tick(seconds)` every frame; it only redraws when a character appears.
 */
export const makeCodePanel = (lines: CodeLine[], opts: { title: string; accent: string; cps?: number }) => {
  const W = 640;
  const H = 420;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  const total = lines.reduce((n, l) => n + l.text.length + 6, 0);
  const cps = opts.cps ?? 28;
  let last = -1;

  const draw = (shown: number, blink: boolean) => {
    ctx.clearRect(0, 0, W, H);
    // glass body
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "rgba(20,16,40,0.82)");
    g.addColorStop(1, "rgba(10,8,22,0.7)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.roundRect(4, 4, W - 8, H - 8, 22);
    ctx.fill();
    ctx.strokeStyle = opts.accent;
    ctx.lineWidth = 3;
    ctx.stroke();
    // title bar
    ["#ff5f57", "#febc2e", "#28c840"].forEach((c, i) => {
      ctx.fillStyle = c;
      ctx.beginPath();
      ctx.arc(34 + i * 24, 34, 7, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.font = "500 20px 'JetBrains Mono', monospace";
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.fillText(opts.title, 120, 41);
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.fillRect(20, 62, W - 40, 2);

    // typed lines
    ctx.font = "500 22px 'JetBrains Mono', monospace";
    let left = shown;
    let y = 104;
    let cursorX = 34;
    let cursorY = y;
    for (let i = 0; i < lines.length && left > 0; i++) {
      const l = lines[i];
      const n = Math.min(l.text.length, left);
      ctx.fillStyle = "rgba(255,255,255,0.25)";
      ctx.fillText(String(i + 1).padStart(2, " "), 22, y);
      ctx.fillStyle = l.color;
      const part = l.text.slice(0, n);
      ctx.fillText(part, 64, y);
      cursorX = 64 + ctx.measureText(part).width + 2;
      cursorY = y;
      left -= l.text.length + 6; // small pause after each line
      y += 34;
    }
    if (blink) {
      ctx.fillStyle = opts.accent;
      ctx.fillRect(cursorX, cursorY - 20, 11, 24);
    }
    tex.needsUpdate = true;
  };

  return {
    texture: tex,
    tick: (t: number) => {
      const loop = total + cps * 2.5; // hold the finished screen briefly
      const shown = Math.floor((t * cps) % loop);
      const blink = Math.floor(t * 2) % 2 === 0;
      const key = shown * 2 + (blink ? 1 : 0);
      if (key !== last) {
        last = key;
        draw(shown, blink);
      }
    },
  };
};
