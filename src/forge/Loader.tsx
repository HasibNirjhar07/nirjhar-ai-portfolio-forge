import { useEffect, useRef, useState } from "react";
import { gsap, fireIntro, getLenis, ScrollTrigger, sceneReady } from "./store";
import { profile } from "./data";

const Loader = () => {
  const root = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const counter = { v: 0 };
    const ctx = gsap.context(() => {
      gsap.from(".ld-letter", { yPercent: 110, stagger: 0.05, duration: 0.9, ease: "expo.out", delay: 0.1 });
      gsap.from(".ld-meta", { opacity: 0, y: 10, duration: 0.8, delay: 0.4 });
    }, root);

    const fonts = Promise.all([document.fonts?.ready ?? Promise.resolve(), sceneReady]);
    // first part animates freely; the rest waits for fonts + the 3D avatar so the hero never janks
    const tween = gsap.to(counter, {
      v: 72,
      duration: 1.4,
      ease: "power2.out",
      onUpdate: () => setCount(Math.round(counter.v)),
    });

    fonts.then(() => {
      if (!root.current) return;
      tween.kill();
      gsap.to(counter, {
        v: 100,
        duration: 0.6,
        ease: "power3.inOut",
        onUpdate: () => setCount(Math.round(counter.v)),
        onComplete: () => {
          const tl = gsap.timeline({
            onComplete: () => {
              setDone(true);
              getLenis()?.start();
              ScrollTrigger.refresh();
            },
          });
          tl.to(".ld-letter", { yPercent: -110, stagger: 0.03, duration: 0.6, ease: "expo.in" })
            .to(".ld-meta, .ld-count", { opacity: 0, duration: 0.3 }, "<")
            .to(".ld-panel", { yPercent: -100, duration: 1, ease: "expo.inOut", stagger: 0.08 }, "-=0.15")
            .add(fireIntro, "-=0.55");
        },
      });
    });

    return () => ctx.revert();
  }, []);

  if (done) return null;

  return (
    <div className="loader" ref={root} role="status" aria-label={`Loading ${count}%`}>
      <div className="ld-panel ld-panel-a" />
      <div className="ld-panel ld-panel-b">
        <div className="ld-name" aria-hidden="true">
          {profile.lastName.split("").map((c, i) => (
            <span className="ld-mask" key={i}>
              <span className="ld-letter">{c}</span>
            </span>
          ))}
        </div>
        <div className="ld-meta">
          <span>{profile.katakana}</span>
          <span>Portfolio © {new Date().getFullYear()}</span>
        </div>
        <div className="ld-count">
          {String(count).padStart(3, "0")}
          <small>%</small>
        </div>
        <div className="ld-bar">
          <span style={{ transform: `scaleX(${count / 100})` }} />
        </div>
      </div>
    </div>
  );
};

export default Loader;
