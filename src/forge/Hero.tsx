import { useEffect, useRef, useState } from "react";
import { gsap, heroLayout, onIntro } from "./store";
import { profile } from "./data";
import { SplitChars } from "./Split";

const useLocalTime = (timeZone: string) => {
  const fmt = () =>
    new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return time;
};

/** Ticking clock in its own component so the whole hero doesn't re-render every second. */
const LocalTime = () => <span className="mono">{useLocalTime(profile.timeZone)} BST</span>;

const Hero = () => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hero .ch", { yPercent: 115 });
      gsap.set(".hero-fade", { opacity: 0, y: 24 });
      gsap.set(".hero-rotator", { yPercent: 110 });

      // parallax the type out as the hero leaves
      gsap.to(".hero-inner", {
        yPercent: -18,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, root);

    const unsubscribe = onIntro(() =>
      ctx.add(() => {
        gsap
          .timeline()
          .to(".hero-name .ch", { yPercent: 0, duration: 1.2, ease: "expo.out", stagger: 0.035 })
          .to(".hero-rotator", { yPercent: 0, duration: 1, ease: "expo.out" }, "-=0.9")
          .to(".hero-fade", { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.08 }, "-=0.8");

        // rotating role word
        const words = gsap.utils.toArray<HTMLElement>(".hero-rotator span");
        gsap.set(words.slice(1), { yPercent: 110 });
        const cycle = gsap.timeline({ repeat: -1, delay: 1.6 });
        words.forEach((w, i) => {
          const next = words[(i + 1) % words.length];
          cycle
            .to(w, { yPercent: -110, duration: 0.8, ease: "expo.inOut" }, "+=1.8")
            .fromTo(next, { yPercent: 110 }, { yPercent: 0, duration: 0.8, ease: "expo.inOut", immediateRender: false }, "<");
        });
      })
    );

    // where the copy ends, for the mobile avatar layout (offsets ignore the
    // parallax transform, so this is stable while scrolling)
    const inner = root.current!.querySelector<HTMLElement>(".hero-right")!;
    const measure = () => {
      let y = inner.offsetHeight;
      for (let el: HTMLElement | null = inner; el; el = el.offsetParent as HTMLElement | null) y += el.offsetTop;
      heroLayout.textBottom = y;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root.current!);
    document.fonts?.ready.then(measure);

    return () => {
      unsubscribe();
      ro.disconnect();
      ctx.revert();
    };
  }, []);

  return (
    <section className="hero" id="hero" ref={root}>
      <div className="hero-inner">
        <div className="hero-left">
          <p className="eyebrow hero-fade">
            <span className="dot" /> Hello! I'm
          </p>
          <h1 className="hero-name">
            <SplitChars text={profile.firstName} className="line" />
            <SplitChars text={profile.lastName} className="line stroke" />
          </h1>
          <p className="hero-jp hero-fade" lang="ja">
            {profile.katakana} <span>— 開発者 · 研究者</span>
          </p>
          <div className="hero-cta hero-fade">
            <a className="btn-fill" href={profile.resume} download data-cursor="Get it">
              <span>Download Résumé</span>
              <b aria-hidden="true">↓</b>
            </a>
            <a className="btn-ghost" href="#research">
              <span>See research</span>
              <b aria-hidden="true">→</b>
            </a>
          </div>
        </div>

        <div className="hero-right">
          <p className="hero-kicker hero-fade">Software</p>
          <h2 className="hero-role">
            <span className="hero-rotator" aria-live="polite">
              {profile.roles.map((r) => (
                <span key={r}>{r}</span>
              ))}
            </span>
          </h2>
          <p className="hero-blurb hero-fade">
            Engineering fast, thoughtful products and researching where machine intelligence goes next.
          </p>
        </div>
      </div>

      <div className="hero-bottom hero-fade">
        <div className="hero-meta">
          <span>Based in {profile.location}</span>
          <LocalTime />
        </div>
        <a className="hero-scroll" href="#about" data-cursor="Scroll">
          <span>Scroll</span>
          <i />
        </a>
        <div className="hero-meta right">
          <span className="status">
            <b /> Open to opportunities
          </span>
          <a className="mono link" href="#research">
            New paper · ACM MLMI '26 ↗
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
