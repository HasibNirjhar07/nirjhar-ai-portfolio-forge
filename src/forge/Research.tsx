import { useEffect, useMemo, useRef } from "react";
import { gsap } from "./store";
import { research } from "./data";
import { SplitChars } from "./Split";

/** Deterministic pseudo-EEG trace; drawn twice end-to-end so it can loop seamlessly. */
const eegPath = (seed: number, amp: number, w = 1200, h = 60) => {
  let r = seed;
  const rand = () => {
    r = (r * 9301 + 49297) % 233280;
    return r / 233280;
  };
  const half: number[] = [];
  for (let x = 0; x <= w / 2; x += 6) {
    const base = Math.sin(x * 0.045 + seed) * 0.45 + Math.sin(x * 0.13 + seed * 2) * 0.3;
    const spike = rand() > 0.94 ? (rand() - 0.5) * 2.4 : 0;
    half.push(base + (rand() - 0.5) * 0.6 + spike);
  }
  half[half.length - 1] = half[0]; // join the loop
  const pts = [...half, ...half.slice(1)];
  return pts.map((v, i) => `${i === 0 ? "M" : "L"}${(i * 6).toFixed(0)} ${(h / 2 - v * amp).toFixed(1)}`).join(" ");
};

const channels = [
  { id: "Fp1", seed: 3, amp: 11, color: "var(--accent)" },
  { id: "Cz", seed: 11, amp: 9, color: "var(--accent-2)" },
  { id: "O2", seed: 23, amp: 13, color: "#f472b6" },
];

const loop = ["PLAN", "WRITE", "TEST", "REPAIR"];

const Research = () => {
  const root = useRef<HTMLElement>(null);
  const paths = useMemo(() => channels.map((c) => ({ ...c, d: eegPath(c.seed, c.amp) })), []);
  const { featured: f, ongoing: o } = research;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".rs-title .ch", {
        yPercent: 110,
        stagger: 0.03,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
      gsap.fromTo(
        ".rs-paper",
        { clipPath: "inset(18% 8% 18% 8% round 28px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 20px)",
          ease: "none",
          scrollTrigger: { trigger: ".rs-paper", start: "top 95%", end: "top 35%", scrub: true },
        }
      );
      gsap.from(".rs-paper .rs-in", {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".rs-paper", start: "top 60%" },
      });
      gsap.from(".rs-eeg path", {
        strokeDashoffset: 2400,
        duration: 2.4,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: { trigger: ".rs-eeg", start: "top 80%" },
      });
      // metric count-up
      gsap.utils.toArray<HTMLElement>(".rs-metric b").forEach((el) => {
        const target = Number(el.dataset.value);
        const decimals = Number(el.dataset.decimals);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => (el.textContent = obj.v.toFixed(decimals)),
        });
      });
      gsap.from(".rs-ongoing", {
        y: 80,
        opacity: 0,
        rotateX: -12,
        transformOrigin: "50% 0%",
        duration: 1.3,
        ease: "expo.out",
        scrollTrigger: { trigger: ".rs-ongoing", start: "top 85%" },
      });
      gsap.from(".rs-node", {
        scale: 0,
        stagger: 0.12,
        duration: 0.8,
        ease: "back.out(2.2)",
        scrollTrigger: { trigger: ".rs-loop", start: "top 85%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="research stack-panel" id="research" ref={root}>
      <div className="rs-head">
        <p className="section-label">
          <span>04</span> Research
        </p>
        <h2 className="rs-title display">
          <SplitChars text="RESEARCH" />
        </h2>
        <p className="rs-intro reveal-lines">
          Machine learning that matters: from reading brain signals to building agents that write, test and repair
          their own code.
        </p>
      </div>

      <article className="rs-paper">
        <div className="rs-paper-main">
          <div className="rs-badges rs-in">
            <span className="rs-venue mono">{f.venue}</span>
            <span className="rs-pub mono">
              <i /> Published
            </span>
          </div>
          <h3 className="rs-paper-title rs-in">{f.title}</h3>
          <p className="rs-where mono rs-in">{f.where}</p>
          <p className="rs-authors rs-in">
            {f.authors.map((a, i) => (
              <span key={a} className={a === f.me ? "me" : ""}>
                {a}
                {i < f.authors.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
          <p className="rs-summary rs-in">{f.summary}</p>
          <ul className="rs-keys rs-in">
            {f.keywords.map((k) => (
              <li key={k}>{k}</li>
            ))}
          </ul>
          <div className="rs-actions rs-in">
            <a className="btn-fill" href={f.doi} target="_blank" rel="noopener noreferrer" data-cursor="Read">
              <span>Read on ACM DL</span>
              <b aria-hidden="true">↗</b>
            </a>
            <a className="btn-ghost" href={f.html} target="_blank" rel="noopener noreferrer">
              <span>Full text</span>
              <b aria-hidden="true">↗</b>
            </a>
          </div>
        </div>

        <div className="rs-paper-side">
          <div className="rs-eeg" aria-hidden="true">
            <div className="rs-eeg-head mono">
              <span>EEG · illustrative signal</span>
              <span className="rs-live">
                <i /> live
              </span>
            </div>
            {paths.map((p) => (
              <div className="rs-ch" key={p.id}>
                <span className="mono">{p.id}</span>
                <svg viewBox="0 0 600 60" preserveAspectRatio="none">
                  <g className="rs-scroll">
                    <path d={p.d} stroke={p.color} pathLength={2400} strokeDasharray={2400} />
                  </g>
                </svg>
              </div>
            ))}
            <div className="rs-classes mono">
              <span>TD</span>
              <span>ADHD</span>
              <span>SLD</span>
            </div>
          </div>
          <div className="rs-metrics">
            {f.metrics.map((m) => (
              <div className="rs-metric" key={m.label}>
                <p>
                  <b data-value={m.value} data-decimals={m.decimals}>
                    0
                  </b>
                  {m.suffix}
                </p>
                <span>{m.label}</span>
              </div>
            ))}
          </div>
        </div>
      </article>

      <article className="rs-ongoing">
        <div className="rs-ongoing-copy">
          <span className="rs-status mono">
            <i /> {o.status}
          </span>
          <h3>{o.title}</h3>
          <p>{o.summary}</p>
          <ul className="rs-keys">
            {o.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <div className="rs-loop" aria-hidden="true">
          <svg viewBox="0 0 300 300" className="rs-orbit">
            <circle cx="150" cy="150" r="110" />
            <circle className="rs-runner" r="6" cx="150" cy="40" />
          </svg>
          {loop.map((n, i) => (
            <span className={`rs-node n${i}`} key={n}>
              <small className="mono">0{i + 1}</small>
              {n}
            </span>
          ))}
          <span className="rs-core mono">LLM</span>
        </div>
      </article>

      <div className="rs-interests">
        <span className="mono">Interests</span>
        {research.interests.map((i) => (
          <b key={i}>{i}</b>
        ))}
      </div>
    </section>
  );
};

export default Research;
