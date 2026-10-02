import { Suspense, useEffect, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useTheme } from "@/context/ThemeContext";
import { AnimeAvatar } from "./AnimeAvatar";
import { avatarState, markSceneReady, pointer } from "../store";

const palettes = {
  dark: {
    skin: "#ffe3d3",
    hair: "#2a2050",
    hoodie: "#262038",
    hoodieDark: "#1a1528",
    outline: "#07050d",
    glowA: "#9b87f5",
    glowB: "#38e1ff",
  },
  light: {
    skin: "#ffe6d8",
    hair: "#2d2357",
    hoodie: "#efeaff",
    hoodieDark: "#d8cffc",
    outline: "#1a1330",
    glowA: "#7c5cff",
    glowB: "#0ea5e9",
  },
};

/**
 * Phones and tablets get a lighter pipeline: no post-processing (native MSAA
 * instead), lower pixel ratio and a 30fps cap. Decided once at mount.
 */
const isLite = () =>
  window.matchMedia("(max-width: 1024px), (pointer: coarse)").matches ||
  (navigator.hardwareConcurrency ?? 8) <= 4;

/**
 * Drives a `frameloop="demand"` canvas at a fixed rate, so 120/144Hz screens
 * don't render the avatar two or three times more often than it needs.
 */
const FrameCap = ({ fps }: { fps: number }) => {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    const step = 1000 / fps;
    let last = 0;
    let raf = 0;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < step - 2) return;
      last = now;
      invalidate();
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [fps, invalidate]);
  return null;
};

const AvatarScene = () => {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const [active, setActive] = useState(true);
  const [lite] = useState(isLite);
  const maxDpr = lite ? 1.25 : 1.5;
  const [dpr, setDpr] = useState(maxDpr);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", move, { passive: true });

    // Pause rendering while the avatar is scrolled out of view.
    let raf = 0;
    let last = avatarState.active;
    const poll = () => {
      if (avatarState.active !== last) {
        last = avatarState.active;
        setActive(last);
      }
      raf = requestAnimationFrame(poll);
    };
    raf = requestAnimationFrame(poll);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="avatar-stage" aria-hidden="true" style={{ visibility: active ? "visible" : "hidden" }}>
      <Canvas
        frameloop={active ? "demand" : "never"}
        dpr={dpr}
        camera={{ position: [0, 0.5, 8.5], fov: 28 }}
        // the composer does its own multisampling on desktop, so the default
        // framebuffer only needs MSAA when there is no composer
        gl={{ antialias: lite, alpha: true, powerPreference: "high-performance", stencil: false }}
        onCreated={({ camera, gl, scene }) => {
          camera.lookAt(0, 0.5, 0);
          // compile shaders up front, then signal the loader after a real frame
          requestAnimationFrame(() => {
            gl.compile(scene, camera);
            requestAnimationFrame(() => requestAnimationFrame(markSceneReady));
          });
        }}
      >
        <FrameCap fps={lite ? 30 : 60} />
        {/* step resolution down if the GPU can't keep up, back up when it can */}
        <PerformanceMonitor
          bounds={() => (lite ? [22, 28] : [45, 57])}
          onDecline={() => setDpr((d) => Math.max(1, +(d - 0.25).toFixed(2)))}
          onIncline={() => setDpr((d) => Math.min(maxDpr, +(d + 0.25).toFixed(2)))}
          flipflops={3}
          onFallback={() => setDpr(1)}
        />
        <Suspense fallback={null}>
          <AnimeAvatar palette={dark ? palettes.dark : palettes.light} dark={dark} lite={lite} />
        </Suspense>
        {!lite && (
          <EffectComposer multisampling={2}>
            <Bloom mipmapBlur intensity={dark ? 1.1 : 0.55} luminanceThreshold={1} luminanceSmoothing={0.2} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
};

export default AvatarScene;
