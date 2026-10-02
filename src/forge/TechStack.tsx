import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Flip } from "gsap/all";
import { gsap } from "./store";
import { SplitChars } from "./Split";
import { techCategories, techStack, type TechCategory } from "./data";

gsap.registerPlugin(Flip);

type Filter = TechCategory | "all";

/**
 * Plain-DOM tool grid: magnetic swell near the cursor, a spotlight that tracks
 * the pointer across every tile border, tilt on hover and Flip-animated
 * category filters. No WebGL, no physics engine, nothing to fail to boot.
 */
const TechStack = () => {
  const root = useRef<HTMLElement>(null);
  const grid = useRef<HTMLUListElement>(null);
  const flipState = useRef<Flip.FlipState | null>(null);
  const [filter, setFilter] = useState<Filter>("all");

  // matching tools first, original order otherwise preserved
  const items = useMemo(() => {
    const on = (t: (typeof techStack)[number]) => filter === "all" || t.tags.includes(filter);
    return [...techStack.filter(on), ...techStack.filter((t) => !on(t))].map((t) => ({ ...t, on: on(t) }));
  }, [filter]);
  const activeCount = items.filter((i) => i.on).length;

  const choose = (f: Filter) => {
    if (f === filter || !grid.current) return;
    flipState.current = Flip.getState(grid.current.querySelectorAll(".ts-tile"), { props: "opacity" });
    setFilter(f);
  };

  useLayoutEffect(() => {
    if (!flipState.current) return;
    Flip.from(flipState.current, { duration: 0.8, ease: "expo.inOut", stagger: 0.015 });
    flipState.current = null;
  }, [filter]);

  // entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ts-title .ch", {
        yPercent: 110,
        stagger: 0.03,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 65%" },
      });
      gsap.from(".ts-inner", {
        y: 50,
        opacity: 0,
        stagger: 0.035,
        duration: 1,
        ease: "expo.out",
        clearProps: "transform,opacity",
        scrollTrigger: { trigger: grid.current, start: "top 85%" },
      });
      gsap.from(".ts-filters button", {
        y: 20,
        opacity: 0,
        stagger: 0.05,
        duration: 0.8,
        ease: "expo.out",
        scrollTrigger: { trigger: ".ts-filters", start: "top 90%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // magnetic swell + spotlight + tilt, driven by one pointer listener
  useEffect(() => {
    const el = grid.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let px = -9999;
    let py = -9999;

    const update = () => {
      raf = 0;
      // read every rect first, then write: interleaving forces a layout per tile
      const tiles = Array.from(el.querySelectorAll<HTMLElement>(".ts-tile"));
      const rects = tiles.map((tile) => tile.getBoundingClientRect());
      tiles.forEach((tile, i) => {
        const r = rects[i];
        const lx = px - r.left;
        const ly = py - r.top;
        tile.style.setProperty("--x", `${lx}px`);
        tile.style.setProperty("--y", `${ly}px`);
        if (reduce) return;
        const d = Math.hypot(px - (r.left + r.width / 2), py - (r.top + r.height / 2));
        const pull = Math.max(0, 1 - d / 260);
        const inside = lx >= 0 && ly >= 0 && lx <= r.width && ly <= r.height;
        const rx = inside ? (0.5 - ly / r.height) * 14 : 0;
        const ry = inside ? (lx / r.width - 0.5) * 14 : 0;
        const inner = tile.firstElementChild as HTMLElement;
        inner.style.transform = `perspective(700px) scale(${1 + pull * 0.09}) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
    };
    const move = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!raf) raf = requestAnimationFrame(update);
    };
    const leave = () => {
      px = py = -9999;
      if (!raf) raf = requestAnimationFrame(update);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <section className="techstack stack-panel" id="skills" ref={root}>
      <div className="ts-head">
        <p className="section-label">
          <span>07</span> Toolbox
        </p>
        <h2 className="ts-title display">
          <SplitChars text="MY TECHSTACK" />
        </h2>
      </div>

      <div className="ts-bar">
        <div className="ts-filters" role="tablist" aria-label="Filter tools">
          {techCategories.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={filter === c.id}
              className={filter === c.id ? "is-on" : ""}
              onClick={() => choose(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>
        <p className="ts-count mono" aria-live="polite">
          <b>{String(activeCount).padStart(2, "0")}</b> / {String(techStack.length).padStart(2, "0")} in focus
        </p>
      </div>

      <ul className="ts-grid" ref={grid}>
        {items.map((t) => (
          <li
            key={t.name}
            data-flip-id={t.name}
            className={`ts-tile ${t.on ? "" : "is-off"}`}
            style={{ "--brand": t.color } as React.CSSProperties}
          >
            <div className="ts-inner">
              <span className="ts-idx mono">
                {String(techStack.findIndex((x) => x.name === t.name) + 1).padStart(2, "0")}
              </span>
              <span className="ts-logo">
                <img src={t.icon} alt="" loading="lazy" className={t.mono ? "is-mono" : ""} />
              </span>
              <span className="ts-name">{t.name}</span>
              <span className="ts-tags mono">{t.tags.join(" · ")}</span>
            </div>
          </li>
        ))}
      </ul>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...techStack, ...techStack].map((t, i) => (
            <span key={i}>
              {t.name} <i>✦</i>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
