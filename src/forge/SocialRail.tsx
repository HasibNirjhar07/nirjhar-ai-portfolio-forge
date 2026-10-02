import { useEffect, useRef } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { gsap, onIntro, ScrollTrigger } from "./store";
import { socials, profile } from "./data";

const icons = { GitHub: Github, LinkedIn: Linkedin, Email: Mail } as const;

/** Fixed side chrome: socials on the left, résumé + scroll progress on the right. */
const SocialRail = () => {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".rail", { opacity: 0 });
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => gsap.set(".rail-progress span", { scaleY: self.progress }),
      });
    }, root);
    const off = onIntro(() => ctx.add(() => gsap.to(".rail", { opacity: 1, duration: 1, delay: 1 })));
    return () => {
      off();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={root}>
      <nav className="rail rail-left" aria-label="Social links">
        {socials.map((s) => {
          const Icon = icons[s.label as keyof typeof icons];
          return (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
              <Icon size={18} />
            </a>
          );
        })}
        <i className="rail-line" />
      </nav>
      <div className="rail rail-right">
        <a className="rail-resume" href={profile.resume} download>
          Résumé
        </a>
        <div className="rail-progress">
          <span />
        </div>
      </div>
    </div>
  );
};

export default SocialRail;
