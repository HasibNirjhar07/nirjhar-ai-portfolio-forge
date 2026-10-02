import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { Outlines, Sparkles } from "@react-three/drei";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { avatarPoke, avatarScreen, avatarState, heroLayout, pointer, POKE_KINDS } from "../store";
import {
  makeBlushTexture,
  makeEyeTexture,
  makeGlyphRingTexture,
  makeIrisTexture,
  makeCodePanel,
  toonGradient,
} from "./toon";

type Palette = {
  skin: string;
  hair: string;
  hoodie: string;
  hoodieDark: string;
  outline: string;
  glowA: string;
  glowB: string;
};

const OUTLINE = 0.022;
const v3 = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);

/** Sphere squeezed into an anime face: narrow V chin, slightly flat sides. */
const useHeadGeometry = () =>
  useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 72, 56);
    const p = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < p.count; i++) {
      let x = p.getX(i);
      let y = p.getY(i);
      let z = p.getZ(i);
      x *= 0.94;
      z *= 0.95;
      if (y < 0) {
        const t = -y;
        x *= 1 - 0.4 * Math.pow(t, 1.6);
        z *= 1 - 0.18 * t;
        if (z > 0) z += 0.05 * t;
        y *= 1 + 0.12 * t;
      }
      p.setXYZ(i, x, y, z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

/**
 * Every tapered hair strand baked into one geometry: one draw call (plus one
 * for its outline) instead of two per strand.
 */
const useHairGeometry = () =>
  useMemo(() => {
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const one = v3(1, 1, 1);
    const parts = buildHair().map(({ base, tip, radius, flat = 0.55 }) => {
      const dir = tip.clone().sub(base);
      const len = dir.length();
      const g = new THREE.ConeGeometry(radius, len, 7, 1);
      g.translate(0, len / 2, 0);
      g.scale(1, 1, flat);
      q.setFromUnitVectors(v3(0, 1, 0), dir.normalize());
      g.applyMatrix4(m.compose(base, q, one));
      return g;
    });
    const merged = mergeGeometries(parts)!;
    parts.forEach((g) => g.dispose());
    return merged;
  }, []);

const surfaceZ = (x: number, y: number, r = 1) => 0.95 * r * Math.sqrt(Math.max(0.04, 1 - x * x - y * y));

const buildHair = () => {
  const strands: { base: THREE.Vector3; tip: THREE.Vector3; radius: number; flat?: number }[] = [];

  // Bangs: fan across the forehead, side pieces longer and framing the cheeks.
  const bangX = [-0.78, -0.56, -0.34, -0.12, 0.1, 0.32, 0.54, 0.76];
  bangX.forEach((x, i) => {
    const side = Math.abs(x) > 0.6;
    const by = 0.62 - Math.abs(x) * 0.12;
    const base = v3(x * 0.92, by, surfaceZ(x * 0.92, by, 1.08) + 0.04);
    const tx = x * (side ? 1.15 : 1.18) + (i % 2 ? 0.05 : -0.04);
    const ty = side ? -0.42 : 0.06 + Math.abs(x) * 0.18 + (i % 3 === 0 ? -0.06 : 0);
    const tip = v3(tx, ty, surfaceZ(tx, Math.max(ty, -0.2), 1.0) + (side ? 0.02 : 0.1));
    strands.push({ base, tip, radius: side ? 0.2 : 0.19, flat: 0.5 });
  });

  // Side locks hugging the jaw.
  [-1, 1].forEach((s) => {
    strands.push({ base: v3(0.82 * s, 0.35, 0.3), tip: v3(0.9 * s, -0.75, 0.35), radius: 0.2, flat: 0.45 });
    strands.push({ base: v3(0.9 * s, 0.4, -0.05), tip: v3(1.02 * s, -0.55, -0.05), radius: 0.22, flat: 0.5 });
  });

  // Back spikes: three rows sweeping outward and down.
  const rows = [
    { y: 0.62, out: 0.55, down: 0.15, count: 7, r: 0.26 },
    { y: 0.1, out: 0.5, down: 0.35, count: 7, r: 0.28 },
    { y: -0.38, out: 0.35, down: 0.45, count: 5, r: 0.24 },
  ];
  rows.forEach((row) => {
    for (let i = 0; i < row.count; i++) {
      const a = Math.PI * (0.58 + (0.84 * i) / (row.count - 1)); // around the back
      const nx = Math.sin(a);
      const nz = Math.cos(a);
      const rad = Math.sqrt(Math.max(0.1, 1 - row.y * row.y)) * 0.98;
      const base = v3(nx * rad, row.y, nz * rad);
      const tip = v3(nx * (rad + row.out), row.y - row.down, nz * (rad + row.out) - 0.1);
      strands.push({ base, tip, radius: row.r, flat: 0.6 });
    }
  });

  // Crown spikes pointing up and back.
  [-0.45, -0.15, 0.2, 0.5].forEach((x, i) => {
    strands.push({
      base: v3(x, 0.88, -0.15),
      tip: v3(x * 1.4, 1.32 - (i % 2) * 0.12, -0.62),
      radius: 0.24,
      flat: 0.6,
    });
  });

  return strands;
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
/** progress of `v` inside the window [a, b], smoothstepped */
const win = (v: number, a: number, b: number) => {
  const x = clamp01((v - a) / (b - a));
  return x * x * (3 - 2 * x);
};

/** Classic heart outline, centred on the origin, ~1 unit wide. */
const useHeartGeometry = () =>
  useMemo(() => {
    const h = new THREE.Shape();
    h.moveTo(0, -0.42);
    h.bezierCurveTo(-0.08, -0.3, -0.5, -0.05, -0.5, 0.18);
    h.bezierCurveTo(-0.5, 0.42, -0.2, 0.5, 0, 0.28);
    h.bezierCurveTo(0.2, 0.5, 0.5, 0.42, 0.5, 0.18);
    h.bezierCurveTo(0.5, -0.05, 0.08, -0.3, 0, -0.42);
    return new THREE.ShapeGeometry(h, 24);
  }, []);

/** Reaction envelope: quick attack, hold, soft release. */
const REACT_DUR = 2.6;
const envelope = (rt: number) => {
  if (rt < 0 || rt > REACT_DUR) return 0;
  if (rt < 0.18) return win(rt, 0, 0.18);
  if (rt > REACT_DUR - 0.45) return win(REACT_DUR - rt, 0, 0.45);
  return 1;
};

const CODE_LINES = [
  { text: "const agent = new Agent({ model, tools });", color: "#c4b5fd" },
  { text: "for await (const step of agent.plan(task)) {", color: "#e9e6ff" },
  { text: "  const patch = await step.write();", color: "#7dd3fc" },
  { text: "  const run = await sandbox.test(patch);", color: "#7dd3fc" },
  { text: "  if (!run.ok) await step.repair(run.log);", color: "#fda4af" },
  { text: "}", color: "#e9e6ff" },
  { text: "await git.commit(patch, 'fix: users api');", color: "#86efac" },
];
const TERM_LINES = [
  { text: "$ agent run --task fix-tests", color: "#e9e6ff" },
  { text: "> plan      3 steps", color: "#a5a3c0" },
  { text: "> patch     src/api/users.ts", color: "#7dd3fc" },
  { text: "> test      42 passed", color: "#86efac" },
  { text: "> review    ship it", color: "#86efac" },
];

export const AnimeAvatar = ({ palette, dark, lite = false }: { palette: Palette; dark: boolean; lite?: boolean }) => {
  const root = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const eyes = useRef<THREE.Group[]>([]);
  const irises = useRef<THREE.Mesh[]>([]);
  const blush = useRef<THREE.MeshBasicMaterial[]>([]);
  const mouth = useRef<THREE.Mesh>(null);
  const ahoge = useRef<THREE.Group>(null);
  const halo = useRef<THREE.Group>(null);
  const glyphs = useRef<THREE.Mesh>(null);
  const shoulders = useRef<THREE.Group[]>([]);
  const elbows = useRef<THREE.Group[]>([]);
  const hips = useRef<THREE.Group[]>([]);
  const knees = useRef<THREE.Group[]>([]);
  const station = useRef<THREE.Group>(null);
  const chair = useRef<THREE.Group>(null);
  const desk = useRef<THREE.Group>(null);
  const panels = useRef<THREE.Group>(null);
  const screenLight = useRef<THREE.PointLight>(null);
  const brows = useRef<THREE.Mesh[]>([]);
  const mouthO = useRef<THREE.Mesh>(null);
  const shades = useRef<THREE.Group>(null);
  const hearts = useRef<THREE.Group[]>([]);

  const { camera } = useThree();
  const headGeo = useHeadGeometry();
  const heartGeo = useHeartGeometry();

  const mats = useMemo(() => {
    const grad = toonGradient();
    const toon = (color: string, emissive = "#000000") =>
      new THREE.MeshToonMaterial({ color, gradientMap: grad, emissive });
    return {
      skin: new THREE.MeshToonMaterial({ color: palette.skin, gradientMap: toonGradient("soft") }),
      hair: new THREE.MeshToonMaterial({ color: palette.hair, gradientMap: grad, side: THREE.DoubleSide }),
      hoodie: toon(palette.hoodie),
      hoodieDark: toon(palette.hoodieDark),
      metal: toon("#2b2840"),
      pants: toon(dark ? "#17142a" : "#2c2650"),
      shoe: toon("#f2f0ff"),
      chair: toon(dark ? "#1b1830" : "#2a2445"),
      wood: toon(dark ? "#2a2440" : "#e9e3f7"),
      dark: new THREE.MeshBasicMaterial({ color: "#1c1028" }),
      glowA: new THREE.MeshBasicMaterial({ color: new THREE.Color(palette.glowA).multiplyScalar(3), toneMapped: false }),
      glowB: new THREE.MeshBasicMaterial({ color: new THREE.Color(palette.glowB).multiplyScalar(3), toneMapped: false }),
      heart: new THREE.MeshBasicMaterial({ color: new THREE.Color("#ff4f9a").multiplyScalar(2.4), toneMapped: false, side: THREE.DoubleSide }),
      lens: new THREE.MeshBasicMaterial({ color: "#05040a" }),
    };
  }, [palette, dark]);

  const tex = useMemo(
    () => ({
      whiteL: makeEyeTexture("white", false),
      whiteR: makeEyeTexture("white", true),
      lashL: makeEyeTexture("lash", false),
      lashR: makeEyeTexture("lash", true),
      iris: makeIrisTexture(),
      blush: makeBlushTexture(),
      glyph: (() => {
        const t = makeGlyphRingTexture();
        t.wrapS = THREE.RepeatWrapping;
        t.repeat.set(2, 1);
        return t;
      })(),
    }),
    []
  );

  const hairGeo = useHairGeometry();
  const code = useMemo(
    () => ({
      editor: makeCodePanel(CODE_LINES, { title: "agent.ts", accent: "#9b87f5", cps: 30 }),
      term: makeCodePanel(TERM_LINES, { title: "zsh: agent", accent: "#38e1ff", cps: 22 }),
    }),
    []
  );

  const ahogeGeo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      v3(0.05, 0.95, 0.1),
      v3(0.12, 1.38, 0.22),
      v3(-0.06, 1.6, 0.42),
      v3(-0.3, 1.5, 0.58),
    ]);
    return new THREE.TubeGeometry(curve, 40, 0.045, 8, false);
  }, []);

  // Blink + mood state kept outside React.
  const anim = useRef({
    nextBlink: 2,
    blink: 0,
    happy: 0,
    hover: 0,
    glyph: 0,
    pokeId: 0,
    kind: -1,
    pokeAt: -10,
    headPos: new THREE.Vector3(),
    ndc: new THREE.Vector3(),
    probe: new THREE.Vector3(),
  });

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const a = anim.current;
    const dt = Math.min(delta, 0.05);
    const desktop = state.size.width > 1024;
    const k = 1 - Math.pow(0.0015, dt); // frame-rate independent smoothing

    if (!root.current || !head.current || !body.current) return;

    // ---------- click reactions ----------
    if (avatarPoke.id !== a.pokeId) {
      a.pokeId = avatarPoke.id;
      a.kind = avatarPoke.kind;
      a.pokeAt = t;
      a.blink = 0;
    }
    const rt = t - a.pokeAt;
    const e = envelope(rt);
    const kind = a.kind >= 0 ? POKE_KINDS[a.kind] : null;
    const ex = (k: (typeof POKE_KINDS)[number]) => (kind === k ? e : 0);
    const wink = ex("wink");
    const wow = ex("surprised");
    const cool = ex("shades");
    const love = ex("love");
    const laugh = ex("laugh");
    // every poke gets a little hop
    const hop = rt < 0.55 ? Math.sin((rt / 0.55) * Math.PI) * 0.32 : 0;
    a.hover += (avatarState.hover - a.hover) * (1 - Math.pow(0.004, dt));

    // ---------- scroll choreography ----------
    const { about, exit, intro } = avatarState;
    const d = desktop ? avatarState.desk : 0;
    const sit = win(d, 0.25, 0.75);
    const heroX = desktop ? 1.15 : 0;
    let heroY = desktop ? -0.15 : -1.75;
    let mobileScale = 0.82;
    if (!desktop && heroLayout.textBottom > 0) {
      // fit the head + hair into the space under the hero copy
      const H = state.size.height;
      const ppu = H / (2 * Math.tan(THREE.MathUtils.degToRad(14)) * 8.5); // px per world unit at z=0
      const avail = Math.max(H * 0.22, H - heroLayout.textBottom - 12);
      mobileScale = THREE.MathUtils.clamp((avail * 0.8) / (1.45 * ppu), 0.5, 0.82);
      const headPx = Math.min(H - avail * 0.48, H - 0.62 * mobileScale * ppu);
      const headWorldY = 0.5 - (headPx - H / 2) / ppu;
      heroY = headWorldY - 1.12 * mobileScale;
    }
    const aboutX = desktop ? -2.4 : 0;
    const studioX = -1.75;
    const x = THREE.MathUtils.lerp(THREE.MathUtils.lerp(heroX, aboutX, about), studioX, d);
    const y = THREE.MathUtils.lerp(heroY, 0.3, d) + exit * 6.5 - (1 - intro) * 4.5;
    root.current.position.x += (x - root.current.position.x) * k;
    root.current.position.y += (y - root.current.position.y) * k;
    const s = (desktop ? 1 : mobileScale) * (0.85 + intro * 0.15) * THREE.MathUtils.lerp(1, 0.9, d);
    root.current.scale.setScalar(s);
    root.current.rotation.y += (0.55 * d - root.current.rotation.y) * k;
    const turn = THREE.MathUtils.lerp(-0.18, 0.5, about) * (desktop ? 1 : 0) * (1 - d);

    // ---------- look at pointer, or at the laptop while working ----------
    const px = pointer.x;
    const py = pointer.y;
    const glance = sit > 0.9 && t % 7 < 1.4; // looks up at the viewer now and then
    const workY = glance ? -0.55 : px * 0.12;
    const workX = glance ? 0.02 : 0.34;
    const targetHeadY = THREE.MathUtils.lerp(turn + px * 0.55, workY, sit);
    const targetHeadX = THREE.MathUtils.lerp(-py * 0.28 + 0.04, workX, sit);
    head.current.rotation.y += (targetHeadY - head.current.rotation.y) * k;
    head.current.rotation.x += (targetHeadX - head.current.rotation.x) * k;
    head.current.rotation.z =
      Math.sin(t * 0.8) * 0.03 - px * 0.06 * (1 - sit) + wink * 0.16 - love * Math.sin(t * 3) * 0.06;
    head.current.rotation.x += cool * Math.sin(rt * 7) * 0.012 - wow * 0.006;
    body.current.rotation.y += (turn * 0.8 + px * 0.18 * (1 - sit) - body.current.rotation.y) * k;
    body.current.rotation.x = sit * 0.1; // lean in toward the screen

    // ---------- limbs: idle stand -> seated typing ----------
    const typing = sit > 0.95 ? 1 : 0;
    [-1, 1].forEach((side, i) => {
      const sh = shoulders.current[i];
      const el = elbows.current[i];
      const hp = hips.current[i];
      const kn = knees.current[i];
      const tap = typing * Math.sin(t * 17 + i * 1.7) * 0.07;
      if (sh) {
        sh.rotation.x = THREE.MathUtils.lerp(Math.sin(t * 1.7 + i) * 0.03, -0.78, sit);
        sh.rotation.z = THREE.MathUtils.lerp(0.12 * side, -0.3 * side, sit);
      }
      if (el) el.rotation.x = THREE.MathUtils.lerp(-0.08, -0.8 + tap, sit);
      if (hp) hp.rotation.x = (-Math.PI / 2) * sit;
      if (kn) kn.rotation.x = (Math.PI / 2) * sit;
    });

    // ---------- workstation assembles in stages ----------
    if (station.current) {
      station.current.visible = d > 0.001;
      const c = win(d, 0, 0.45);
      const dk = win(d, 0.15, 0.6);
      const pn = win(d, 0.5, 0.95);
      if (chair.current) {
        chair.current.position.z = -2.5 * (1 - c);
        chair.current.scale.setScalar(Math.max(0.001, c));
      }
      if (desk.current) {
        desk.current.position.y = -3 * (1 - dk);
        desk.current.scale.setScalar(Math.max(0.001, dk));
      }
      if (panels.current) {
        panels.current.scale.setScalar(Math.max(0.001, pn));
        panels.current.position.y = Math.sin(t * 1.2) * 0.05;
        panels.current.rotation.z = (1 - pn) * 0.4;
      }
      if (screenLight.current) screenLight.current.intensity = dk * (dark ? 0.9 : 0.5);
      if (dk > 0) {
        code.editor.tick(t);
        code.term.tick(t + 3);
      }
    }

    // breathing
    const breath = Math.sin(t * 1.7);
    body.current.scale.y = 1 + breath * 0.012 + (rt < 0.12 ? -0.05 * (1 - rt / 0.12) : 0);
    body.current.position.y = hop + laugh * Math.abs(Math.sin(t * 16)) * 0.05;
    head.current.position.y = 1.12 + breath * 0.012;

    // ---------- happy when the cursor is near the face ----------
    head.current.getWorldPosition(a.headPos);
    a.ndc.copy(a.headPos).project(camera);
    const dist = Math.hypot(a.ndc.x - px, (a.ndc.y - py) * 0.7);
    const happyTarget = dist < 0.28 ? 1 : 0;
    a.happy += (happyTarget - a.happy) * (1 - Math.pow(0.002, dt));

    // ---------- blink ----------
    if (t > a.nextBlink) {
      a.blink = 1;
      a.nextBlink = t + 2 + Math.random() * 3.5;
    }
    a.blink = Math.max(0, a.blink - dt * 7);
    const blinkCurve = Math.sin(a.blink * Math.PI);
    const happy = Math.max(a.happy, cool * 0.4);
    const open =
      Math.max(0.08, 1 - (blinkCurve * 0.95 + happy * 0.58) * (1 - wow) - laugh * 0.9) + wow * 0.22;
    const eyeHide = win(love, 0.3, 0.7);
    eyes.current.forEach((eye, i) => {
      if (!eye) return;
      const o = THREE.MathUtils.lerp(open, 0.08, i === 0 ? wink : 0) * (1 - eyeHide * 0.96);
      eye.scale.set(1.16 * (1 + wow * 0.14), Math.max(0.01, o) * 1.16, 1.16);
    });
    hearts.current.forEach((hg, i) => {
      if (!hg) return;
      hg.visible = love > 0.001;
      hg.scale.setScalar(Math.max(0.001, love * (1 + Math.sin(t * 9 + i) * 0.08) * 0.42));
    });
    brows.current.forEach((b, i) => {
      if (!b) return;
      const side = i === 0 ? -1 : 1;
      b.position.y = 0.2 + wow * 0.11 + laugh * 0.04 - cool * 0.03;
      b.rotation.z = -0.14 * side + wow * 0.1 * side - (i === 1 ? wink * 0.2 : 0);
    });
    if (shades.current) {
      shades.current.visible = cool > 0.001;
      // drops in from above with a little settle, lifts back off on release
      const drop = rt < 0.5 ? 1 - win(rt, 0, 0.5) : 0;
      const settle = rt > 0.5 && rt < 0.8 ? Math.sin(((rt - 0.5) / 0.3) * Math.PI) * 0.03 : 0;
      const lift = rt > 1 ? (1 - cool) * 1.4 : 0;
      shades.current.position.y = -0.13 + drop * 1.6 + settle + lift;
    }
    irises.current.forEach((iris) => {
      if (!iris) return;
      iris.position.x += (px * 0.035 - iris.position.x) * k;
      iris.position.y += (py * 0.03 - 0.01 - iris.position.y) * k;
    });
    const flush = Math.max(happy, love, wink, laugh);
    blush.current.forEach((m) => m && (m.opacity = Math.min(1, 0.55 + flush * 0.45)));
    if (mouth.current) {
      const grin = Math.max(happy, wink * 0.7, love * 0.8);
      mouth.current.visible = wow < 0.5;
      mouth.current.scale.y = 1 + grin * 1.6 + laugh * (2.6 + Math.sin(t * 16) * 0.5);
      mouth.current.scale.x = 1 + grin * 0.35 + laugh * 0.6 + cool * 0.15;
      mouth.current.rotation.z = Math.PI + cool * 0.3; // smirk
      mouth.current.position.x = cool * 0.05;
    }
    if (mouthO.current) {
      mouthO.current.visible = wow > 0.001;
      mouthO.current.scale.setScalar(Math.max(0.001, wow));
    }

    // ---------- secondary motion ----------
    if (ahoge.current) {
      // wiggles on every poke, springs up on surprise
      const boing = rt < 1.2 ? Math.sin(rt * 22) * Math.exp(-rt * 4) * 0.5 : 0;
      ahoge.current.rotation.z = Math.sin(t * 2.2) * 0.1 + px * -0.15 + boing;
      ahoge.current.scale.y = 1 + wow * 0.25;
      ahoge.current.rotation.x = Math.sin(t * 1.3) * 0.05;
    }
    if (halo.current) {
      halo.current.rotation.z = t * 0.15;
      halo.current.position.y = 1.2 + Math.sin(t * 1.1) * 0.04;
      const pulse = rt < 0.6 ? Math.sin((rt / 0.6) * Math.PI) * 0.08 : 0;
      halo.current.scale.setScalar(1 + a.hover * 0.06 + pulse);
    }
    if (glyphs.current) {
      // the glyph orbit spins up while the pointer feeds it code
      a.glyph += dt * (0.03 + a.hover * 0.32 + e * 0.15);
      (glyphs.current.material as THREE.MeshBasicMaterial).map!.offset.x = -a.glyph;
    }

    // ---------- publish the head's screen position for the DOM layer ----------
    a.ndc.copy(a.headPos).project(camera);
    avatarScreen.headX = ((a.ndc.x + 1) / 2) * state.size.width;
    avatarScreen.headY = ((1 - a.ndc.y) / 2) * state.size.height;
    a.probe.copy(a.headPos);
    a.probe.y -= root.current.scale.y;
    a.probe.project(camera);
    avatarScreen.unit = Math.abs(a.probe.y - a.ndc.y) * 0.5 * state.size.height;
    avatarScreen.inHero = intro > 0.9 && about < 0.04 && d < 0.001 && exit < 0.04;
  });

  const eyeSide = (side: -1 | 1, i: number) => (
    <group
      key={side}
      position={[0.36 * side, -0.13, 0.885]}
      rotation={[0.02, 0.4 * side, 0]}
      scale={1.16}
      ref={(g) => g && (eyes.current[i] = g)}
    >
      <mesh renderOrder={2}>
        <planeGeometry args={[0.38, 0.4]} />
        <meshBasicMaterial map={side < 0 ? tex.whiteL : tex.whiteR} transparent depthWrite={false} polygonOffset polygonOffsetFactor={-1} />
      </mesh>
      <mesh renderOrder={3} position={[0, -0.01, 0.004]} ref={(m) => m && (irises.current[i] = m)}>
        <planeGeometry args={[0.2, 0.25]} />
        <meshBasicMaterial map={tex.iris} transparent depthWrite={false} polygonOffset polygonOffsetFactor={-2} />
      </mesh>
      <mesh renderOrder={4} position={[0, 0, 0.008]}>
        <planeGeometry args={[0.38, 0.4]} />
        <meshBasicMaterial map={side < 0 ? tex.lashL : tex.lashR} transparent depthWrite={false} polygonOffset polygonOffsetFactor={-3} />
      </mesh>
    </group>
  );

  return (
    <group ref={root}>
      {/* lights travel with the avatar */}
      <ambientLight intensity={dark ? 0.75 : 1} />
      <directionalLight position={[1.2, 2, 5]} intensity={dark ? 1.05 : 1.2} />
      <directionalLight position={[-3.5, 2, -3]} intensity={dark ? 2.2 : 1.2} color={palette.glowA} />
      <pointLight position={[2.5, -0.5, 1.5]} intensity={dark ? 2.2 : 1} color={palette.glowB} distance={6} decay={1} />

      <group ref={body}>
        {/* neck */}
        <mesh position={[0, 0.55, -0.02]} material={mats.skin}>
          <cylinderGeometry args={[0.15, 0.17, 0.5, 20]} />
          <Outlines thickness={OUTLINE} color={palette.outline} />
        </mesh>

        {/* shoulders + torso (hoodie) */}
        <mesh position={[0, 0.02, 0]} rotation={[0, 0, Math.PI / 2]} scale={[1, 1, 0.72]} material={mats.hoodie}>
          <capsuleGeometry args={[0.42, 0.62, 12, 24]} />
          <Outlines thickness={OUTLINE} color={palette.outline} />
        </mesh>
        <mesh position={[0, -0.8, 0]} scale={[1, 1, 0.66]} material={mats.hoodie}>
          <cylinderGeometry args={[0.66, 0.74, 1.7, 32]} />
          <Outlines thickness={OUTLINE} color={palette.outline} />
        </mesh>
        {/* hoodie hem + hips */}
        <mesh position={[0, -1.62, 0]} rotation={[0, 0, Math.PI / 2]} scale={[1, 1, 0.7]} material={mats.pants}>
          <capsuleGeometry args={[0.36, 0.55, 10, 20]} />
          <Outlines thickness={OUTLINE} color={palette.outline} />
        </mesh>

        {/* legs: hip -> knee joints so the pose can blend into sitting */}
        {[-1, 1].map((side, i) => (
          <group key={side} position={[0.3 * side, -1.65, 0]} ref={(g) => g && (hips.current[i] = g)}>
            <mesh position={[0, -0.55, 0]} material={mats.pants}>
              <capsuleGeometry args={[0.2, 0.8, 8, 16]} />
              <Outlines thickness={OUTLINE} color={palette.outline} />
            </mesh>
            <group position={[0, -1.1, 0]} ref={(g) => g && (knees.current[i] = g)}>
              <mesh position={[0, -0.52, 0]} material={mats.pants}>
                <capsuleGeometry args={[0.17, 0.8, 8, 16]} />
                <Outlines thickness={OUTLINE} color={palette.outline} />
              </mesh>
              <mesh position={[0, -1.06, 0.1]} material={mats.shoe}>
                <boxGeometry args={[0.3, 0.2, 0.52]} />
                <Outlines thickness={OUTLINE} color={palette.outline} />
              </mesh>
            </group>
          </group>
        ))}

        {/* arms: shoulder -> elbow joints */}
        {[-1, 1].map((side, i) => (
          <group key={side} position={[0.74 * side, 0.02, 0]} ref={(g) => g && (shoulders.current[i] = g)}>
            <mesh position={[0, -0.38, 0]} material={mats.hoodie}>
              <capsuleGeometry args={[0.14, 0.55, 8, 16]} />
              <Outlines thickness={OUTLINE} color={palette.outline} />
            </mesh>
            <group position={[0, -0.76, 0]} ref={(g) => g && (elbows.current[i] = g)}>
              <mesh position={[0, -0.3, 0]} material={mats.hoodie}>
                <capsuleGeometry args={[0.125, 0.45, 8, 16]} />
                <Outlines thickness={OUTLINE} color={palette.outline} />
              </mesh>
              {/* glowing cuff */}
              <mesh position={[0, -0.56, 0]} rotation={[Math.PI / 2, 0, 0]} material={mats.glowB}>
                <torusGeometry args={[0.12, 0.012, 6, 24]} />
              </mesh>
              <mesh position={[0, -0.68, 0]} material={mats.skin}>
                <sphereGeometry args={[0.12, 16, 16]} />
                <Outlines thickness={OUTLINE} color={palette.outline} />
              </mesh>
            </group>
          </group>
        ))}

        {/* hood bunched behind the neck + collar ring */}
        <mesh position={[0, 0.38, -0.3]} scale={[1.15, 0.8, 0.62]} material={mats.hoodieDark}>
          <sphereGeometry args={[0.46, 32, 24]} />
          <Outlines thickness={OUTLINE} color={palette.outline} />
        </mesh>
        <mesh position={[0, 0.33, 0]} rotation={[Math.PI / 2 - 0.12, 0, 0]} scale={[1.12, 0.92, 1]} material={mats.hoodieDark}>
          <torusGeometry args={[0.3, 0.1, 14, 40]} />
          <Outlines thickness={OUTLINE} color={palette.outline} />
        </mesh>

        {/* glowing drawstrings */}
        {[-1, 1].map((s) => (
          <group key={s} position={[0.12 * s, 0.05, 0.4]} rotation={[0.18, 0, 0.05 * s]}>
            <mesh position={[0, -0.25, 0]} material={mats.glowB}>
              <cylinderGeometry args={[0.016, 0.016, 0.52, 8]} />
            </mesh>
            <mesh position={[0, -0.53, 0]} material={mats.glowB}>
              <sphereGeometry args={[0.035, 12, 12]} />
            </mesh>
          </group>
        ))}

        {/* chest emblem */}
        <group position={[-0.32, -0.38, 0.5]} rotation={[0.05, -0.25, 0]}>
          <mesh material={mats.glowA}>
            <ringGeometry args={[0.07, 0.095, 6]} />
          </mesh>
          <mesh material={mats.glowA} position={[0, 0, 0.001]}>
            <circleGeometry args={[0.028, 6]} />
          </mesh>
        </group>

        {/* headphones resting on the collar */}
        <group position={[0, 0.36, 0.04]} rotation={[0.35, 0, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} material={mats.metal}>
            <torusGeometry args={[0.36, 0.035, 10, 48, Math.PI]} />
            <Outlines thickness={OUTLINE * 0.8} color={palette.outline} />
          </mesh>
          {[-1, 1].map((s) => (
            <group key={s} position={[0.38 * s, -0.02, 0.06]} rotation={[0, 0, Math.PI / 2]}>
              <mesh material={mats.metal}>
                <cylinderGeometry args={[0.15, 0.15, 0.11, 28]} />
                <Outlines thickness={OUTLINE * 0.8} color={palette.outline} />
              </mesh>
              <mesh position={[0, 0.06 * s, 0]} rotation={[Math.PI / 2, 0, 0]} material={mats.glowA}>
                <torusGeometry args={[0.1, 0.014, 8, 32]} />
              </mesh>
            </group>
          ))}
        </group>

        {/* ---------------- head ---------------- */}
        <group ref={head} position={[0, 1.12, 0]} scale={0.62}>
          <mesh geometry={headGeo} material={mats.skin}>
            <Outlines thickness={OUTLINE * 1.6} color={palette.outline} />
          </mesh>

          {/* ears */}
          {[-1, 1].map((s) => (
            <mesh key={s} position={[0.9 * s, -0.12, 0]} scale={[0.1, 0.19, 0.1]} material={mats.skin}>
              <sphereGeometry args={[1, 16, 16]} />
              <Outlines thickness={0.25} color={palette.outline} />
            </mesh>
          ))}

          {eyeSide(-1, 0)}
          {eyeSide(1, 1)}

          {/* brows */}
          {[-1, 1].map((s) => (
            <mesh
              key={s}
              ref={(m) => m && (brows.current[s < 0 ? 0 : 1] = m)}
              position={[0.36 * s, 0.2, 0.9]}
              rotation={[0, 0.4 * s, -0.14 * s]}
              material={mats.dark}
            >
              <boxGeometry args={[0.24, 0.035, 0.02]} />
            </mesh>
          ))}

          {/* nose */}
          <mesh position={[0.03, -0.34, 0.905]} scale={[0.03, 0.018, 0.02]}>
            <sphereGeometry args={[1, 8, 8]} />
            <meshBasicMaterial color="#d99a8f" />
          </mesh>

          {/* mouth: a small smile arc that opens when happy */}
          <mesh ref={mouth} position={[0, -0.52, 0.8]} rotation={[0.25, 0, Math.PI]}>
            <torusGeometry args={[0.065, 0.014, 8, 24, Math.PI]} />
            <meshBasicMaterial color="#3a1626" />
          </mesh>

          {/* surprised "o" mouth */}
          <mesh ref={mouthO} position={[0, -0.53, 0.83]} rotation={[0.25, 0, 0]} visible={false}>
            <circleGeometry args={[0.07, 20]} />
            <meshBasicMaterial color="#3a1626" />
          </mesh>

          {/* heart eyes */}
          {[-1, 1].map((s, i) => (
            <group
              key={s}
              ref={(g) => g && (hearts.current[i] = g)}
              position={[0.36 * s, -0.12, 0.95]}
              rotation={[0.02, 0.4 * s, 0]}
              visible={false}
            >
              <mesh geometry={heartGeo} material={mats.heart} renderOrder={6} />
            </group>
          ))}

          {/* pixel shades: deal with it */}
          <group ref={shades} position={[0, -0.13, 0.98]} visible={false}>
            <mesh material={mats.lens}>
              <boxGeometry args={[1.12, 0.07, 0.03]} />
            </mesh>
            {[-1, 1].map((s) => (
              <group key={s} position={[0.33 * s, -0.09, 0]} rotation={[0, 0.3 * s, 0]}>
                <mesh material={mats.lens}>
                  <boxGeometry args={[0.38, 0.22, 0.03]} />
                </mesh>
                <mesh position={[-0.08, 0.04, 0.02]} rotation={[0, 0, -0.6]} material={mats.glowB}>
                  <boxGeometry args={[0.12, 0.022, 0.005]} />
                </mesh>
              </group>
            ))}
          </group>

          {/* blush */}
          {[-1, 1].map((s, i) => (
            <mesh key={s} position={[0.47 * s, -0.37, 0.76]} rotation={[0, 0.55 * s, 0]} renderOrder={1}>
              <planeGeometry args={[0.26, 0.2]} />
              <meshBasicMaterial
                ref={(m) => m && (blush.current[i] = m)}
                map={tex.blush}
                transparent
                depthWrite={false}
                polygonOffset
                polygonOffsetFactor={-1}
              />
            </mesh>
          ))}

          {/* ---- hair ---- */}
          <mesh material={mats.hair} scale={[1.02, 1.04, 1.02]}>
            <sphereGeometry args={[1.07, 48, 32, 0, Math.PI * 2, 0, Math.PI * 0.36]} />
            <Outlines thickness={OUTLINE * 1.6} color={palette.outline} />
          </mesh>
          <mesh material={mats.hair} scale={[1.02, 1.04, 1.02]}>
            <sphereGeometry args={[1.08, 48, 32, Math.PI, Math.PI, 0, Math.PI * 0.8]} />
            <Outlines thickness={OUTLINE * 1.6} color={palette.outline} />
          </mesh>
          {/* side panels so the temples stay covered when the head turns */}
          {[Math.PI * 1.78, Math.PI * 0.78].map((start) => (
            <mesh key={start} material={mats.hair} scale={[1.02, 1.04, 1.02]}>
              <sphereGeometry args={[1.075, 24, 24, start, Math.PI * 0.44, 0, Math.PI * 0.6]} />
              <Outlines thickness={OUTLINE * 1.6} color={palette.outline} />
            </mesh>
          ))}
          <mesh geometry={hairGeo} material={mats.hair}>
            <Outlines thickness={OUTLINE * 1.6} color="#0b0814" />
          </mesh>
          <group ref={ahoge}>
            <mesh geometry={ahogeGeo} material={mats.hair}>
              <Outlines thickness={OUTLINE * 1.4} color={palette.outline} />
            </mesh>
          </group>
        </group>

        {/* holographic halo + glyph orbit */}
        <group ref={halo} position={[0, 1.2, -0.75]}>
          <mesh material={mats.glowA}>
            <ringGeometry args={[1.02, 1.05, 96]} />
          </mesh>
          <mesh>
            <ringGeometry args={[0.9, 0.905, 96]} />
            <meshBasicMaterial color={palette.glowB} transparent opacity={0.6} toneMapped={false} />
          </mesh>
        </group>
        <mesh ref={glyphs} position={[0, 1.15, 0]} rotation={[0.28, 0, -0.12]}>
          <cylinderGeometry args={[1.05, 1.05, 0.09, 96, 1, true]} />
          <meshBasicMaterial
            map={tex.glyph}
            color={new THREE.Color(palette.glowB).multiplyScalar(1.6)}
            transparent
            opacity={0.85}
            side={THREE.DoubleSide}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* ---------------- workstation (appears while scrolling) ---------------- */}
      <group ref={station} visible={false}>
        <pointLight ref={screenLight} position={[0, -0.45, 1.2]} color={palette.glowB} intensity={0} distance={4} decay={1.2} />

        <group ref={chair}>
          {/* seat */}
          <mesh position={[0, -1.86, -0.05]} material={mats.chair}>
            <boxGeometry args={[1.3, 0.2, 1.15]} />
            <Outlines thickness={OUTLINE} color={palette.outline} />
          </mesh>
          {/* backrest + headrest */}
          <mesh position={[0, -0.75, -0.66]} rotation={[-0.1, 0, 0]} material={mats.chair}>
            <boxGeometry args={[1.2, 2, 0.22]} />
            <Outlines thickness={OUTLINE} color={palette.outline} />
          </mesh>
          <mesh position={[0, 0.42, -0.78]} rotation={[-0.1, 0, 0]} material={mats.chair}>
            <boxGeometry args={[0.7, 0.35, 0.24]} />
            <Outlines thickness={OUTLINE} color={palette.outline} />
          </mesh>
          {/* racing stripes */}
          {[-1, 1].map((s2) => (
            <mesh key={s2} position={[0.42 * s2, -0.75, -0.54]} rotation={[-0.1, 0, 0]} material={mats.glowA}>
              <boxGeometry args={[0.05, 1.8, 0.01]} />
            </mesh>
          ))}
          {/* armrests */}
          {[-1, 1].map((s2) => (
            <mesh key={s2} position={[0.72 * s2, -1.42, 0]} material={mats.chair}>
              <boxGeometry args={[0.14, 0.12, 0.85]} />
              <Outlines thickness={OUTLINE} color={palette.outline} />
            </mesh>
          ))}
          {/* gas lift + star base */}
          <mesh position={[0, -2.35, -0.05]} material={mats.metal}>
            <cylinderGeometry args={[0.09, 0.09, 0.8, 12]} />
          </mesh>
          {[0, 1, 2, 3, 4].map((i) => (
            <mesh key={i} position={[0, -2.72, -0.05]} rotation={[0, (i * Math.PI * 2) / 5, 0]} material={mats.metal}>
              <boxGeometry args={[0.1, 0.08, 1.4]} />
            </mesh>
          ))}
        </group>

        <group ref={desk}>
          {/* desk top + LED strip + legs */}
          <mesh position={[0, -0.74, 1.4]} material={mats.wood}>
            <boxGeometry args={[3.4, 0.1, 1.3]} />
            <Outlines thickness={OUTLINE} color={palette.outline} />
          </mesh>
          <mesh position={[0, -0.81, 2.06]} material={mats.glowB}>
            <boxGeometry args={[3.3, 0.025, 0.02]} />
          </mesh>
          {[-1, 1].map((s2) => (
            <mesh key={s2} position={[1.55 * s2, -1.9, 1.4]} material={mats.metal}>
              <boxGeometry args={[0.08, 2.2, 1.1]} />
            </mesh>
          ))}

          {/* laptop: base + lid hinged at the back, glowing logo facing out */}
          <group position={[0, -0.66, 1.2]}>
            <mesh material={mats.metal}>
              <boxGeometry args={[1.1, 0.05, 0.72]} />
              <Outlines thickness={OUTLINE} color={palette.outline} />
            </mesh>
            <group position={[0, 0.02, 0.36]} rotation={[0.28, 0, 0]}>
              <mesh position={[0, 0.36, 0]} material={mats.metal}>
                <boxGeometry args={[1.1, 0.72, 0.035]} />
                <Outlines thickness={OUTLINE} color={palette.outline} />
              </mesh>
              {/* screen, facing the coder */}
              <mesh position={[0, 0.36, -0.02]} rotation={[0, Math.PI, 0]}>
                <planeGeometry args={[1.02, 0.64]} />
                <meshBasicMaterial map={code.editor.texture} toneMapped={false} />
              </mesh>
              {/* logo on the lid, facing the camera */}
              <mesh position={[0, 0.38, 0.02]} material={mats.glowA}>
                <ringGeometry args={[0.06, 0.085, 6]} />
              </mesh>
            </group>
          </group>

          {/* mug with a glowing rim */}
          <group position={[1.15, -0.55, 1.15]}>
            <mesh material={mats.shoe}>
              <cylinderGeometry args={[0.11, 0.1, 0.26, 20]} />
              <Outlines thickness={OUTLINE} color={palette.outline} />
            </mesh>
            <mesh position={[0, 0.13, 0]} rotation={[Math.PI / 2, 0, 0]} material={mats.glowA}>
              <torusGeometry args={[0.105, 0.01, 6, 24]} />
            </mesh>
          </group>
        </group>

        {/* floating holographic panels */}
        <group ref={panels}>
          <mesh position={[-1.75, 0.75, 0.9]} rotation={[0, 0.5, 0]}>
            <planeGeometry args={[1.5, 0.985]} />
            <meshBasicMaterial map={code.editor.texture} transparent opacity={0.92} toneMapped={false} side={THREE.DoubleSide} depthWrite={false} />
          </mesh>
          <mesh position={[1.75, 1.15, 0.6]} rotation={[0, -0.45, 0]}>
            <planeGeometry args={[1.2, 0.79]} />
            <meshBasicMaterial map={code.term.texture} transparent opacity={0.92} toneMapped={false} side={THREE.DoubleSide} depthWrite={false} />
          </mesh>
        </group>
      </group>

      <Sparkles count={lite ? 18 : 40} scale={[3.5, 3.5, 2]} position={[0, 1, 0]} size={3} speed={0.35} color={palette.glowA} opacity={0.8} />
    </group>
  );
};
