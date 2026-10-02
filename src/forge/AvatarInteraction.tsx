import { useEffect, useRef } from "react";
import { avatarPoke, avatarScreen, avatarState, POKE_KINDS } from "./store";

/** What the avatar "says" for each expression, typed out in the bubble. */
const LINES: Record<(typeof POKE_KINDS)[number], string> = {
  wink: 'console.log("hey there ;)")',
  surprised: 'throw new Error("whoa!")',
  shades: "git push --force  // deal with it",
  love: "while (alive) write(code);",
  laugh: "// it compiled first try?! lol",
};

const TOKENS = [
  "{ }", "=>", "</>", "( )", "[ ]", ";", "&&", "||", "!==", "++", "::", "#",
  "const", "let", "fn", "async", "await", "return", "import", "yield",
  "0x1F", "101", "λ", "∑", "*", "/>", "${}", "?.", "...", "#!", "git", "npm",
];

type Token = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  text: string;
  size: number;
  hue: 0 | 1;
};

const BUBBLE_MS = 2600;

/**
 * DOM side of the hero avatar:
 *  - an invisible hotspot that tracks the head; clicking it plays the next expression
 *  - a code speech bubble typed next to the head on each poke
 *  - a canvas trail of code tokens that follows the pointer through the hero,
 *    and gets pulled into the avatar's head while hovering it
 */
const AvatarInteraction = () => {
  const hotspot = useRef<HTMLButtonElement>(null);
  const bubble = useRef<HTMLDivElement>(null);
  const bubbleText = useRef<HTMLSpanElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cvs = canvas.current!;
    const ctx = cvs.getContext("2d")!;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tokens: Token[] = [];
    let colors = ["#9b87f5", "#38e1ff"];
    let font = "JetBrains Mono, monospace";
    let dpr = 1;
    let pokes = 0;
    let bubbleUntil = 0;
    let typeTimer = 0;
    let lastX = -1;
    let lastY = -1;
    let travelled = 0;
    let raf = 0;
    let drawn = false;
    let lightTheme = false;

    const readTheme = () => {
      const forge = document.querySelector<HTMLElement>(".forge");
      if (!forge) return;
      const cs = getComputedStyle(forge);
      colors = [cs.getPropertyValue("--accent").trim() || colors[0], cs.getPropertyValue("--accent-2").trim() || colors[1]];
      font = cs.getPropertyValue("--f-mono").trim() || font;
      lightTheme = document.documentElement.classList.contains("light");
    };

    let sizedW = 0;
    let sizedH = 0;
    const resize = () => {
      // mobile toolbars change innerHeight while scrolling; don't reallocate
      // the backing store for that, only for real size changes
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (w === sizedW && Math.abs(h - sizedH) < 160) return;
      sizedW = w;
      sizedH = h;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      cvs.width = w * dpr;
      cvs.height = h * dpr;
      readTheme();
    };

    const spawn = (x: number, y: number, vx: number, vy: number, size = 13) => {
      if (tokens.length > 90) tokens.shift();
      const max = 0.9 + Math.random() * 0.7;
      tokens.push({
        x,
        y,
        vx,
        vy,
        life: max,
        max,
        size,
        text: TOKENS[(Math.random() * TOKENS.length) | 0],
        hue: Math.random() < 0.6 ? 0 : 1,
      });
    };

    // hotspot geometry, shared by the render loop and the pointer handlers
    const spot = { x: 0, y: 0, r: 0 };
    const inHeroView = () => avatarScreen.inHero && window.scrollY < window.innerHeight * 0.6;

    const setHover = (on: boolean) => {
      if (!!avatarState.hover === on) return;
      avatarState.hover = on ? 1 : 0;
      document.documentElement.classList.toggle("avatar-hover", on);
    };

    let wasLive = false;
    let bubbleOn = false;
    let lastFrame = performance.now();

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(now - lastFrame, 50) / 16.667; // 1 at 60fps
      lastFrame = now;
      // nothing on screen and nothing to fade out: skip the frame entirely
      if (!avatarState.active && !tokens.length && !drawn && !wasLive && !bubbleOn) return;

      const live = inHeroView() && avatarScreen.unit > 0;
      const u = avatarScreen.unit;

      // hit area for hover/clicks: head + shoulders
      spot.x = avatarScreen.headX;
      spot.y = avatarScreen.headY + u * 0.2;
      spot.r = u * 1.05;
      if (live !== wasLive) {
        wasLive = live;
        hotspot.current!.tabIndex = live ? 0 : -1;
        if (!live) setHover(false);
      }
      if (live) {
        // the button is only a keyboard target; mouse/touch are hit-tested below
        const hs = hotspot.current!;
        hs.style.transform = `translate(${spot.x - spot.r}px, ${spot.y - spot.r}px)`;
        hs.style.width = hs.style.height = `${spot.r * 2}px`;
      }

      // bubble sits up-left of the head (centred above it on narrow screens)
      const b = bubble.current!;
      const showBubble = live && now < bubbleUntil;
      if (showBubble !== bubbleOn) {
        bubbleOn = showBubble;
        b.classList.toggle("is-on", showBubble);
      }
      if (showBubble) {
        const narrow = window.innerWidth <= 1024;
        const bx = narrow ? avatarScreen.headX : avatarScreen.headX - u * 0.65;
        const by = avatarScreen.headY - u * (narrow ? 1.25 : 0.2);
        const w = b.offsetWidth;
        const left = Math.max(12, Math.min(window.innerWidth - w - 12, narrow ? bx - w / 2 : bx - w));
        b.style.transform = `translate(${left}px, ${Math.max(12, by - b.offsetHeight)}px)`;
        b.classList.toggle("is-centre", narrow);
      }

      // ---- code trail ----
      if (!tokens.length && !drawn) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      drawn = tokens.length > 0;
      if (!drawn) return;
      const pull = avatarState.hover;
      const hx = avatarScreen.headX;
      const hy = avatarScreen.headY;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      // additive blending gives the glow for free (shadowBlur per glyph is costly);
      // on the light theme it would wash out, so draw normally there
      ctx.globalCompositeOperation = lightTheme ? "source-over" : "lighter";
      const drag = Math.pow(0.94, dt);
      for (let i = tokens.length - 1; i >= 0; i--) {
        const tk = tokens[i];
        tk.life -= dt / 60;
        if (pull && live) {
          // drawn into the head: accelerate toward it, vanish on arrival
          const dx = hx - tk.x;
          const dy = hy - tk.y;
          const dist = Math.hypot(dx, dy) || 1;
          tk.vx += (dx / dist) * 0.55 * dt;
          tk.vy += (dy / dist) * 0.55 * dt;
          if (dist < u * 0.45) tk.life = Math.min(tk.life, 0.12);
        } else {
          tk.vy -= 0.012 * dt; // drift upward
        }
        tk.vx *= drag;
        tk.vy *= drag;
        tk.x += tk.vx * dt;
        tk.y += tk.vy * dt;
        if (tk.life <= 0) {
          tokens.splice(i, 1);
          continue;
        }
        const p = tk.life / tk.max; // 1 → 0
        const alpha = Math.min(1, p * 2.2) * Math.min(1, (1 - p) * 10);
        ctx.globalAlpha = alpha * 0.9;
        ctx.font = `500 ${Math.round(tk.size * (0.75 + p * 0.25))}px ${font}`;
        ctx.fillStyle = colors[tk.hue];
        ctx.fillText(tk.text, tk.x, tk.y);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
    };

    const inside = (x: number, y: number) => Math.hypot(x - spot.x, y - spot.y) < spot.r;
    // real controls under the avatar keep their clicks
    const onControl = (t: EventTarget | null) =>
      t instanceof Element && !!t.closest("a, button, input, textarea, select, label, [role='button']");

    const move = (e: PointerEvent) => {
      if (e.pointerType === "mouse") setHover(wasLive && inside(e.clientX, e.clientY) && !onControl(e.target));
      if (reduce || !finePointer || !wasLive) {
        lastX = -1;
        return;
      }
      if (lastX < 0) {
        lastX = e.clientX;
        lastY = e.clientY;
        return;
      }
      const mx = e.clientX - lastX;
      const my = e.clientY - lastY;
      travelled += Math.hypot(mx, my);
      lastX = e.clientX;
      lastY = e.clientY;
      // one token every ~34px of travel, thrown slightly back along the path
      while (travelled > 34) {
        travelled -= 34;
        spawn(
          e.clientX + (Math.random() - 0.5) * 14,
          e.clientY + (Math.random() - 0.5) * 14,
          -mx * 0.08 + (Math.random() - 0.5) * 1.2,
          -my * 0.08 - Math.random() * 0.8,
          11 + Math.random() * 5
        );
      }
    };

    const typeOut = (text: string) => {
      window.clearInterval(typeTimer);
      const el = bubbleText.current!;
      let i = 0;
      el.textContent = "";
      typeTimer = window.setInterval(() => {
        el.textContent = text.slice(0, ++i);
        if (i >= text.length) window.clearInterval(typeTimer);
      }, 28);
    };

    const poke = (x: number, y: number) => {
      const kind = pokes++ % POKE_KINDS.length;
      avatarPoke.kind = kind;
      avatarPoke.id++;
      bubbleUntil = performance.now() + BUBBLE_MS;
      typeOut(LINES[POKE_KINDS[kind]]);
      if (reduce) return;
      // burst of syntax out of the click
      for (let i = 0; i < 16; i++) {
        const a = (i / 16) * Math.PI * 2 + Math.random() * 0.3;
        const v = 4 + Math.random() * 4;
        spawn(x, y, Math.cos(a) * v, Math.sin(a) * v - 1, 12 + Math.random() * 6);
      }
    };

    const hs = hotspot.current!;
    // keyboard: Enter/Space on the focusable hotspot, bursting from the head
    const keyPoke = () => poke(spot.x, avatarScreen.headY);
    // mouse + touch: hit-test the head instead of covering the page with a
    // button, so text and controls underneath stay usable
    const tap = (e: MouseEvent) => {
      if (wasLive && inside(e.clientX, e.clientY) && !onControl(e.target)) poke(e.clientX, e.clientY);
    };

    resize();
    const themeObs = new MutationObserver(readTheme);
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("click", tap);
    hs.addEventListener("click", keyPoke);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(typeTimer);
      themeObs.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("click", tap);
      hs.removeEventListener("click", keyPoke);
      setHover(false);
    };
  }, []);

  return (
    <>
      <canvas className="code-trail" ref={canvas} aria-hidden="true" />
      <button
        type="button"
        className="avatar-hotspot"
        ref={hotspot}
        aria-label="Poke the avatar"
      />
      <div className="avatar-bubble" ref={bubble} aria-live="polite">
        <i aria-hidden="true">›</i>
        <span ref={bubbleText} />
        <b aria-hidden="true" />
      </div>
    </>
  );
};

export default AvatarInteraction;
