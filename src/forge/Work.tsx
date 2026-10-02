import { useEffect, useRef } from "react";
import { gsap } from "./store";
import { projects, socials } from "./data";

const Work = () => {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1025px)", () => {
      const el = track.current!;
      const distance = () => el.scrollWidth - window.innerWidth;
      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => gsap.set(".work-progress span", { scaleX: self.progress }),
        },
      });
      // images wipe open as they travel in, titles rise
      gsap.utils.toArray<HTMLElement>(".work-media").forEach((m) => {
        gsap.fromTo(
          m,
          { clipPath: "inset(0% 0% 0% 100%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: { trigger: m, containerAnimation: tween, start: "left 100%", end: "left 55%", scrub: true },
          }
        );
      });
      gsap.utils.toArray<HTMLElement>(".work-info").forEach((info) => {
        gsap.from(info.children, {
          yPercent: 60,
          opacity: 0,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: info, containerAnimation: tween, start: "left 95%", end: "left 65%", scrub: true },
        });
      });
      // each card's image drifts against the scroll for depth
      gsap.utils.toArray<HTMLElement>(".work-card img").forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -5 },
          {
            xPercent: 5,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest(".work-card"),
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });
    });
    mm.add("(max-width: 1024px)", () => {
      gsap.utils.toArray<HTMLElement>(".work-card").forEach((card) =>
        gsap.from(card, { y: 60, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: card, start: "top 85%" } })
      );
    });
    return () => mm.revert();
  }, []);

  const tilt = (e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(el.querySelector(".work-media"), { rotateY: x * 8, rotateX: -y * 8, duration: 0.6, ease: "power3.out" });
  };
  const untilt = (e: React.PointerEvent<HTMLElement>) =>
    gsap.to(e.currentTarget.querySelector(".work-media"), { rotateY: 0, rotateX: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" });

  const github = socials.find((s) => s.label === "GitHub")!.href;

  return (
    <section className="work" id="projects" ref={root}>
      <div className="work-track" ref={track}>
        <div className="work-intro">
          <p className="section-label">
            <span>06</span> Selected work
          </p>
          <h2 className="display">
            My <em>Work</em>
          </h2>
          <p className="work-note reveal-lines">
            A few things I've designed and engineered end to end.{" "}
            <span className="only-wide">Drag your eyes sideways →</span>
            <span className="only-narrow">Scroll on to see them ↓</span>
          </p>
          <div className="work-progress">
            <span />
          </div>
        </div>

        {projects.map((p, i) => (
          <article
            className="work-card"
            key={p.title}
            style={{ "--accent": p.accent } as React.CSSProperties}
            onPointerMove={tilt}
            onPointerLeave={untilt}
          >
            <div className="work-info">
              <span className="work-num">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{p.title}</h3>
                <p className="mono">
                  {p.category} · {p.year}
                </p>
              </div>
            </div>
            <a className="work-media" href={p.github} target="_blank" rel="noopener noreferrer" data-cursor="View">
              <img src={p.image} alt={`${p.title} preview`} loading="lazy" />
              <span className="work-shine" />
            </a>
            <p className="work-desc">{p.description}</p>
            <ul className="work-tags">
              {p.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </article>
        ))}

        <a className="work-more" href={github} target="_blank" rel="noopener noreferrer" data-cursor="GitHub">
          <span>More on GitHub</span>
          <b>↗</b>
        </a>
      </div>
    </section>
  );
};

export default Work;
