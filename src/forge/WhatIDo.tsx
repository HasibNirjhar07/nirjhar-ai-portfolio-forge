import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "./store";
import { SplitChars } from "./Split";
import { services } from "./data";

const WhatIDo = () => {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".wid-title .ch", {
        yPercent: 110,
        stagger: 0.03,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      gsap.from(".wid-card", {
        clipPath: "inset(100% 0 0 0)",
        stagger: 0.12,
        duration: 1.3,
        ease: "expo.inOut",
        scrollTrigger: { trigger: ".wid-grid", start: "top 80%" },
      });
    }, root);

    // touch layout: no hover, so light up whichever card is in the middle of the screen
    const mm = gsap.matchMedia(root);
    mm.add("(max-width: 1024px)", () => {
      gsap.utils.toArray<HTMLElement>(".wid-card").forEach((card) => {
        ScrollTrigger.create({ trigger: card, start: "top 65%", end: "bottom 35%", toggleClass: "is-inview" });
      });
    });

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section className="wid stack-panel" ref={root}>
      <div className="wid-head">
        <p className="section-label">
          <span>03</span> What I do
        </p>
        <h2 className="wid-title display">
          <SplitChars text="WHAT I DO" />
        </h2>
      </div>

      <div className="wid-grid" onMouseLeave={() => setActive(null)}>
        {services.map((s, i) => (
          <article
            key={s.title}
            className={`wid-card ${active === i ? "is-active" : ""} ${active !== null && active !== i ? "is-dim" : ""}`}
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(active === i ? null : i)}
            data-cursor="Explore"
          >
            <i className="corner tl" />
            <i className="corner tr" />
            <i className="corner bl" />
            <i className="corner br" />
            <div className="wid-top">
              <span className="mono">{s.index}</span>
              <span className="wid-jp" lang="ja">
                {s.jp}
              </span>
            </div>
            <div className="wid-media" aria-hidden="true">
              <img src={s.clip.gif} alt="" loading="lazy" decoding="async" />
              <span className="wid-scan" />
              <span className="wid-chip mono">
                <i /> {s.clip.label}
              </span>
            </div>
            <h3>{s.title}</h3>
            <div className="wid-body">
              <div>
                <p>{s.blurb}</p>
                <ul>
                  {s.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
      <p className="wid-credit mono">
        Clips via{" "}
        <a href="https://giphy.com" target="_blank" rel="noopener noreferrer">
          GIPHY
        </a>
      </p>
    </section>
  );
};

export default WhatIDo;
