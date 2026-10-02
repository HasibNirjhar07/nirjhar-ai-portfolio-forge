import { useEffect, useRef } from "react";
import { gsap } from "./store";
import { about } from "./data";
import { SplitWords } from "./Split";

const About = () => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // words light up as you read
      gsap.fromTo(
        ".about-text .wd",
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: { trigger: ".about-text", start: "top 80%", end: "bottom 45%", scrub: true },
        }
      );
      gsap.from(".about-stat", {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".about-stats", start: "top 85%" },
      });
      gsap.from(".about .section-label", {
        x: -30,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="about" id="about" ref={root}>
      <div className="about-spacer" aria-hidden="true" />
      <div className="about-content">
        <p className="section-label">
          <span>01</span> About me
        </p>
        <p className="about-text">
          <SplitWords text={about.text} />
        </p>
        <div className="about-stats">
          {about.stats.map((s) => (
            <div className="about-stat" key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
