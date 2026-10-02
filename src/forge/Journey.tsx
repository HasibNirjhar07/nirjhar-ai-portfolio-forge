import { useEffect, useRef } from "react";
import { gsap } from "./store";
import { journey } from "./data";

const Journey = () => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".jr-line-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ".jr-list", start: "top 65%", end: "bottom 60%", scrub: true },
        }
      );
      gsap.utils.toArray<HTMLElement>(".jr-item").forEach((item) => {
        gsap.from(item.querySelectorAll(".jr-reveal"), {
          y: 50,
          opacity: 0,
          stagger: 0.08,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: item, start: "top 78%" },
        });
        gsap.to(item, {
          "--lit": 1,
          scrollTrigger: { trigger: item, start: "top 62%", toggleActions: "play none none reverse" },
          duration: 0.4,
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="journey stack-panel" ref={root}>
      <div className="jr-head">
        <p className="section-label">
          <span>05</span> Journey
        </p>
        <h2 className="display">
          My path <em>&amp;</em>
          <br />
          experience
        </h2>
      </div>

      <div className="jr-list">
        <div className="jr-line">
          <span className="jr-line-fill" />
        </div>
        {journey.map((j) => (
          <div className="jr-item" key={j.title}>
            <div className="jr-left">
              <h3 className="jr-reveal">{j.title}</h3>
              <p className="jr-reveal jr-place">{j.place}</p>
            </div>
            <div className="jr-tag jr-reveal">
              <i />
              <span>{j.tag}</span>
            </div>
            <p className="jr-text jr-reveal">{j.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Journey;
