import { useEffect } from "react";
import { SplitText } from "gsap/all";
import { gsap, onIntro, ScrollTrigger } from "./store";

gsap.registerPlugin(SplitText);

/**
 * Site-wide motion layer, applied after the loader:
 *  - `.reveal-lines`  paragraphs rise line by line out of masks
 *  - `.section-label` rule draws in, label slides
 *  - `.reveal-up`     generic rise + fade
 *  - `.stack-panel`   each panel slides over the previous one, which stays put,
 *                      sinks back and dims (stacked-card transition)
 */
export const useReveals = () => {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {});
    const splits: SplitText[] = [];

    const off = onIntro(() =>
      ctx.add(() => {
        gsap.utils.toArray<HTMLElement>(".reveal-lines").forEach((el) => {
          const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "rl-line" });
          splits.push(split);
          gsap.from(split.lines, {
            yPercent: 110,
            stagger: 0.09,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          });
        });

        gsap.utils.toArray<HTMLElement>(".section-label").forEach((el) => {
          gsap.from(el, {
            "--rule": 0,
            x: -24,
            opacity: 0,
            duration: 1.2,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });

        gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((el) => {
          gsap.from(el, {
            y: 60,
            opacity: 0,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });

        // stacked panels: the incoming panel rises over the previous one with a
        // rounded top; the previous one is held in place (translated 1:1 with
        // scroll), shrinks back and dims underneath it
        if (!reduce) {
          // phones: sections are thousands of px tall, and holding/scaling a layer
          // that size is what makes mobile GPUs stutter and flicker. Keep the
          // look (rounded sheet sliding over a dimming section), skip the transform.
          const lite = window.matchMedia("(max-width: 1024px)").matches;
          const panels = gsap.utils.toArray<HTMLElement>(".stack-panel");
          panels.forEach((panel, i) => {
            // only stack direct neighbours (Work is deliberately left out)
            const next = panels[i + 1];
            if (!next || panel.nextElementSibling !== next) return;
            const range = { trigger: next, start: "top bottom", end: "top top", scrub: true };
            const radius = lite ? "28px" : "48px";

            gsap.fromTo(
              next,
              { borderTopLeftRadius: radius, borderTopRightRadius: radius },
              { borderTopLeftRadius: "0px", borderTopRightRadius: "0px", ease: "none", scrollTrigger: range }
            );

            if (lite) {
              gsap.fromTo(panel, { "--dim": 0 }, { "--dim": 0.55, ease: "none", scrollTrigger: range });
              return;
            }

            gsap.to(panel, {
              y: () => window.innerHeight,
              scale: 0.9,
              "--dim": 0.65,
              transformOrigin: "50% calc(100% - 50vh)",
              ease: "none",
              immediateRender: false,
              scrollTrigger: {
                ...range,
                invalidateOnRefresh: true,
                // never leave an identity transform behind: it would break
                // fixed/sticky children (e.g. the pinned work track)
                onLeaveBack: () => gsap.set(panel, { clearProps: "transform,--dim" }),
              },
            });
          });
        }

        ScrollTrigger.refresh();
      })
    );

    return () => {
      off();
      splits.forEach((s) => s.revert());
      ctx.revert();
    };
  }, []);
};
