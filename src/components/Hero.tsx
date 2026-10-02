import { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Environment, 
  Float, 
  ContactShadows, 
  PerspectiveCamera, 
  Stars,
  Sparkles as ThreeSparkles 
} from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import { 
  ArrowDown, 
  Rocket, 
  Mail, 
  Github, 
  Linkedin, 
  Download,
  Cpu,
  Terminal
} from "lucide-react";

// --- 3D Components ---

const Wheel = ({ position }: { position: [number, number, number] }) => (
  <group position={position}>
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.35, 0.35, 0.3, 32]} />
      <meshStandardMaterial color="#1e293b" roughness={0.8} />
    </mesh>
    <mesh rotation={[Math.PI / 2, 0, 0]}>
       <cylinderGeometry args={[0.2, 0.2, 0.32, 16]} />
       <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
    </mesh>
    <mesh rotation={[Math.PI / 2, 0, 0]}>
       <torusGeometry args={[0.35, 0.05, 16, 32]} />
       <meshStandardMaterial color="#0f172a" />
    </mesh>
  </group>
);

const Rover = ({ mouse, scrollY }: { mouse: React.MutableRefObject<{ x: number, y: number }>, scrollY: React.MutableRefObject<number> }) => {
  const group = useRef<THREE.Group>(null);
  const neckRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!group.current) return;
    
    // Calculate progress (0 to 1) based on scrollY (assuming 800px hero height)
    const progress = Math.min(Math.max(scrollY.current / 800, 0), 1);
    
    // Animation Targets
    // Resting: x=2, y=-1, z=0
    // Scrolled: x=5, y=-2, z=-8
    const targetZ = THREE.MathUtils.lerp(0, -8, progress);
    const targetX = THREE.MathUtils.lerp(2, 5, progress);
    const targetYPos = THREE.MathUtils.lerp(-1, -2, progress);
    const targetScale = THREE.MathUtils.lerp(1, 0.5, progress);
    const targetRotY = THREE.MathUtils.lerp(0, -Math.PI / 2, progress);

    // Apply Scroll Transforms (Direct lerp for responsiveness)
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX, 0.1);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetYPos, 0.1);
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, targetZ, 0.1);
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, targetScale, 0.1));

    // Mouse Tilt Logic
    const tiltX = mouse.current.y * 0.2; // Look up/down
    const tiltY = mouse.current.x * 0.2 + Math.PI / 6; // Look left/right + Base rotation

    // Combine Scroll Rotation + Mouse Tilt
    const combinedRotY = tiltY + targetRotY;
    
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, tiltX, 0.05);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, combinedRotY, 0.05);

    // Idle Animation
    if (neckRef.current) {
        neckRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.3;
        neckRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float rotationIntensity={0.2} floatIntensity={0.5} floatingRange={[-0.1, 0.1]}>
      <group ref={group} position={[2, -1, 0]} rotation={[0, Math.PI / 6, 0]}>
        {/* Chassis */}
        <mesh castShadow receiveShadow>
           <boxGeometry args={[1.6, 0.5, 2.2]} />
           <meshStandardMaterial color="#f8fafc" roughness={0.3} metalness={0.6} />
        </mesh>
        
        {/* Top Detail */}
        <mesh position={[0, 0.26, 0.5]} rotation={[-Math.PI/2, 0, 0]}>
           <planeGeometry args={[1, 0.5]} />
           <meshStandardMaterial color="#334155" />
        </mesh>

        {/* Solar Panels */}
        <group position={[0, 0.25, -0.2]}>
           <mesh position={[-1.4, 0, 0]} rotation={[0, 0, 0.2]} castShadow>
              <cylinderGeometry args={[0.8, 1, 0.05, 6]} />
              <meshStandardMaterial color="#fbbf24" roughness={0.2} metalness={1} emissive="#fbbf24" emissiveIntensity={0.1} />
           </mesh>
           <mesh position={[1.4, 0, 0]} rotation={[0, 0, -0.2]} castShadow>
              <cylinderGeometry args={[0.8, 1, 0.05, 6]} />
              <meshStandardMaterial color="#fbbf24" roughness={0.2} metalness={1} emissive="#fbbf24" emissiveIntensity={0.1} />
           </mesh>
        </group>

        {/* Camera Mast */}
        <group position={[0, 0.25, 0.8]}>
           <mesh position={[0, 0.4, 0]}>
              <cylinderGeometry args={[0.08, 0.12, 0.8]} />
              <meshStandardMaterial color="#f8fafc" roughness={0.3} metalness={0.6} />
           </mesh>
           <group ref={neckRef} position={[0, 0.8, 0]}>
              <mesh>
                 <boxGeometry args={[0.5, 0.25, 0.3]} />
                 <meshStandardMaterial color="#f8fafc" roughness={0.3} metalness={0.6} />
              </mesh>
              {/* Lenses */}
              <mesh position={[-0.12, 0, 0.16]} rotation={[Math.PI/2, 0, 0]}>
                 <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
                 <meshStandardMaterial color="#3b82f6" roughness={0} metalness={0.8} emissive="#60a5fa" emissiveIntensity={0.8} />
              </mesh>
              <mesh position={[0.12, 0, 0.16]} rotation={[Math.PI/2, 0, 0]}>
                 <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
                 <meshStandardMaterial color="#3b82f6" roughness={0} metalness={0.8} emissive="#60a5fa" emissiveIntensity={0.8} />
              </mesh>
           </group>
        </group>

        {/* Wheels */}
        <Wheel position={[-1, -0.3, 0.7]} />
        <Wheel position={[1, -0.3, 0.7]} />
        <Wheel position={[-1.1, -0.3, 0]} />
        <Wheel position={[1.1, -0.3, 0]} />
        <Wheel position={[-1, -0.3, -0.7]} />
        <Wheel position={[1, -0.3, -0.7]} />
      </group>
    </Float>
  );
};

const HeroScene = ({ mouse, scrollY }: { mouse: React.MutableRefObject<{ x: number, y: number }>, scrollY: React.MutableRefObject<number> }) => (
  <>
    <PerspectiveCamera makeDefault position={[0, 2, 6]} fov={50} />
    {/* Use Suspense for Environment to safely handle loading */}
    <Environment preset="city" />
    
    <ambientLight intensity={0.4} />
    <pointLight position={[10, 10, 10]} intensity={1.5} color="#818cf8" />
    <pointLight position={[-10, -10, -5]} intensity={0.5} color="#f472b6" />
    
    <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
    <ThreeSparkles count={50} scale={10} size={2} speed={0.4} opacity={0.5} color="#c084fc" />
    
    <ContactShadows resolution={512} scale={20} blur={2} opacity={0.5} far={10} color="#000000" />
    
    <Rover mouse={mouse} scrollY={scrollY} />
  </>
);

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Refs for tracking mutable state without re-renders
  const mouse = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };
    const handleMouseMove = (e: MouseEvent) => {
        // Safe window check
        if (!window) return;
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -(e.clientY / window.innerHeight) * 2 + 1;
        mouse.current = { x, y };
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-background"
    >
      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas shadows dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
           <Suspense fallback={null}>
              <HeroScene mouse={mouse} scrollY={scrollY} />
           </Suspense>
        </Canvas>
      </div>

      {/* Overlay UI */}
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center pointer-events-none">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className="pointer-events-auto space-y-6"
            >
               <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
                 <Terminal size={14} className="text-ml-primary animate-pulse" />
                 <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">System Online</span>
               </div>
               
               <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.1]">
                  Architecting <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                     The Future
                  </span>
               </h1>
               
               <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                  I am <span className="text-foreground font-semibold">Hasibul Islam Nirjhar</span>. 
                  A Full Stack Engineer weaving code into intelligence.
               </p>

               <div className="flex flex-wrap gap-4 pt-4">
                  <a href="#projects" className="px-8 py-4 bg-foreground text-background rounded-lg font-bold hover:scale-105 transition-transform flex items-center gap-2 shadow-lg shadow-indigo-500/20">
                     <Rocket size={20} />
                     <span>Projects</span>
                  </a>
                  <a href="#contact" className="px-8 py-4 bg-white/5 border border-white/10 backdrop-blur-md text-foreground rounded-lg font-medium hover:bg-white/10 transition-colors flex items-center gap-2">
                     <Mail size={20} />
                     <span>Contact</span>
                  </a>
               </div>
               
               <div className="flex items-center gap-6 pt-8 text-muted-foreground">
                  <a href="https://github.com/HasibNirjhar07" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors"><Github /></a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors"><Linkedin /></a>
                  <div className="h-px w-10 bg-border"></div>
                  <a href="/resume.pdf" download className="flex items-center gap-2 hover:text-foreground transition-colors text-sm uppercase font-bold tracking-wider group">
                     <Download size={16} className="group-hover:translate-y-1 transition-transform" /> Resume
                  </a>
               </div>
            </motion.div>
            
            {/* Empty Right Column for 3D visibility */}
            <div className="hidden lg:block"></div>
         </div>
      </div>

      {/* Scroll Hint */}
      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 1, duration: 1 }}
         className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-muted-foreground/50"
      >
         <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-muted-foreground/50 to-transparent"></div>
         <span className="text-[10px] uppercase tracking-[0.3em] opacity-80">Scroll to Explore</span>
      </motion.div>
    </section>
  );
};

export default Hero;
