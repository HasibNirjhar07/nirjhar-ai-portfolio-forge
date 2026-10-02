import { useEffect, useRef } from "react";
import { gsap } from "./store";
import { studio } from "./data";

/**
 * Scroll chapter between About and What I Do. The section is tall with a
 * sticky stage; while it scrolls past, the 3D avatar sits down at a desk
 * (driven from Site) and this copy + terminal play out alongside.
 */
const Studio = () => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia(root);
    // desktop: the tall sticky chapter scrubs the copy in as you scroll through it
    mm.add("(min-width: 1025px)", () => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom bottom", scrub: 0.6 },
      });
      tl.from(".st-label", { opacity: 0, x: -30, duration: 0.3 })
        .from(".st-line > span", { yPercent: 115, stagger: 0.25, duration: 0.6 }, 0.1)
        .from(".st-term", { opacity: 0, y: 60, scale: 0.94, duration: 0.5 }, 0.6)
        .from(".st-log li", { opacity: 0, x: -14, stagger: 0.18, duration: 0.25 }, 0.9)
        .to(".st-progress span", { scaleX: 1, duration: 2.2 }, 0)
        .to({}, { duration: 0.4 });
    });
    // mobile: the section is only as tall as its content, so there's no scroll
    // distance to scrub — play the same beats once as it comes into view
    mm.add("(max-width: 1024px)", () => {
      gsap
        .timeline({ defaults: { ease: "expo.out" }, scrollTrigger: { trigger: root.current, start: "top 75%" } })
        .from(".st-label", { opacity: 0, x: -20, duration: 0.8 })
        .from(".st-line > span", { yPercent: 115, stagger: 0.1, duration: 1 }, 0.1)
        .from(".st-term", { opacity: 0, y: 40, duration: 1 }, 0.4)
        .from(".st-log li", { opacity: 0, x: -12, stagger: 0.12, duration: 0.6 }, 0.6)
        .to(".st-progress span", { scaleX: 1, duration: 1.6, ease: "power2.inOut" }, 0.2);
    });
    return () => mm.revert();
  }, []);

  return (
    <section className="studio stack-panel" id="studio" ref={root}>
      <div className="st-stage">
        <div className="st-spacer" aria-hidden="true" />
        <div className="st-copy">
          <p className="section-label st-label">
            <span>02</span> Right now
          </p>
          <h2 className="st-heading display">
            {studio.heading.map((l, i) => (
              <span className={`st-line ${i === studio.heading.length - 1 ? "accent" : ""}`} key={l}>
                <span>{l}</span>
              </span>
            ))}
          </h2>
          <div className="st-term">
            <div className="st-term-bar">
              <i />
              <i />
              <i />
              <span className="mono">research/agentic-codegen</span>
            </div>
            <ul className="st-log mono">
              {studio.log.map((l) => (
                <li className={`tone-${l.tone}`} key={l.cmd}>
                  {l.cmd}
                </li>
              ))}
              <li className="st-caret" aria-hidden="true">
                ▍
              </li>
            </ul>
          </div>
          <div className="st-progress" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Studio;
