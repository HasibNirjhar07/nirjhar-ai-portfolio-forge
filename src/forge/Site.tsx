import { lazy, Suspense, useEffect } from "react";
import { avatarState, gsap, onIntro, ScrollTrigger } from "./store";
import { useSmoothScroll } from "./useSmoothScroll";
import Loader from "./Loader";
import Cursor from "./Cursor";
import SocialRail from "./SocialRail";
import AvatarInteraction from "./AvatarInteraction";
import Hero from "./Hero";
import About from "./About";
import WhatIDo from "./WhatIDo";
import Journey from "./Journey";
import Work from "./Work";
import Contact from "./Contact";
import Studio from "./Studio";
import Research from "./Research";
import { useReveals } from "./useReveals";
import TechStack from "./TechStack";
import "./forge.css";

const AvatarScene = lazy(() => import("./avatar/AvatarScene"));

/** Scroll timelines that steer the fixed 3D avatar between sections. */
const useAvatarChoreography = () => {
  useEffect(() => {
    const off = onIntro(() =>
      gsap.to(avatarState, { intro: 1, duration: 1.8, ease: "expo.out", delay: 0.15 })
    );

    const mm = gsap.matchMedia();
    const setActive = () => {
      avatarState.active = avatarState.exit < 0.999;
    };
    mm.add("(min-width: 1025px)", () => {
      gsap.to(avatarState, {
        about: 1,
        ease: "none",
        scrollTrigger: { trigger: "#about", start: "top bottom", end: "top 15%", scrub: true },
      });
      // sit down at the desk while the studio chapter scrolls in
      gsap.to(avatarState, {
        desk: 1,
        ease: "none",
        scrollTrigger: { trigger: "#studio", start: "top 35%", end: "top -90%", scrub: true },
      });
      gsap.to(avatarState, {
        exit: 1,
        ease: "none",
        onUpdate: setActive,
        scrollTrigger: { trigger: "#studio", start: "bottom bottom", end: "bottom top", scrub: true },
      });
    });
    mm.add("(max-width: 1024px)", () => {
      avatarState.about = 0;
      gsap.to(avatarState, {
        exit: 1,
        ease: "none",
        onUpdate: setActive,
        scrollTrigger: { trigger: "#hero", start: "top top", end: "bottom top", scrub: true },
      });
    });

    return () => {
      off();
      mm.revert();
    };
  }, []);
};

const Site = () => {
  useSmoothScroll();
  useAvatarChoreography();
  useReveals();

  // fonts & lazy chunks shift layout; keep trigger positions honest
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  return (
    <div className="forge">
      <Loader />
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <div className="bg-glow" aria-hidden="true" />
      <Suspense fallback={null}>
        <AvatarScene />
      </Suspense>
      <AvatarInteraction />
      <SocialRail />
      <main className="forge-main">
        <Hero />
        <About />
        <Studio />
        <WhatIDo />
        <Research />
        <Journey />
        <Work />
        <TechStack />
        <Contact />
      </main>
    </div>
  );
};

export default Site;
