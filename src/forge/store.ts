import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * Mutable state shared between DOM scroll timelines and the R3F render loop.
 * Mutated by GSAP, read every frame — deliberately not React state.
 */
export const avatarState = {
  /** 0 → hero, 1 → fully in the about pose */
  about: 0,
  /** 0 → standing, 1 → seated at the desk (studio section) */
  desk: 0,
  /** 0 → visible, 1 → scrolled away */
  exit: 0,
  /** intro rise-in, 0 → 1 after loader */
  intro: 0,
  /** set false once the avatar is off screen so the canvas can idle */
  active: true,
  /** 1 while the pointer is over the avatar (hero only) */
  hover: 0,
};

/** Expressions played on click, in order. */
export const POKE_KINDS = ["wink", "surprised", "shades", "love", "laugh"] as const;
export type PokeKind = (typeof POKE_KINDS)[number];

/** Bumped by the DOM hotspot; the render loop picks up the new id. */
export const avatarPoke = { id: 0, kind: 0 };

/**
 * Bottom of the hero copy in px from the top of the page (measured by Hero).
 * On narrow screens the avatar sizes itself into the space below it.
 */
export const heroLayout = { textBottom: 0 };

/** Where the avatar's head is on screen, written by the render loop every frame. */
export const avatarScreen = {
  headX: 0,
  headY: 0,
  /** pixels per world unit at the head, i.e. the avatar's on-screen size */
  unit: 0,
  /** the avatar is standing in the hero (not scrolled into about/studio) */
  inHero: false,
};

export const pointer = { x: 0, y: 0 };

let lenisInstance: Lenis | null = null;
export const setLenis = (l: Lenis | null) => {
  lenisInstance = l;
};
export const getLenis = () => lenisInstance;

const introListeners = new Set<() => void>();
let introFired = false;
export const onIntro = (fn: () => void) => {
  if (introFired) fn();
  else introListeners.add(fn);
  return () => introListeners.delete(fn);
};
export const fireIntro = () => {
  introFired = true;
  introListeners.forEach((fn) => fn());
  introListeners.clear();
};

let resolveScene: () => void;
/** Resolves after the avatar's first rendered frame (or a timeout, so the loader never hangs). */
export const sceneReady = new Promise<void>((res) => {
  resolveScene = res;
  setTimeout(res, 7000);
});
export const markSceneReady = () => resolveScene();

export { gsap, ScrollTrigger };
