import { useRef, useState, useEffect } from "react";
import {
  Trophy,
  Target,
  Zap,
  Code,
  Brain,
  Star,
  Rocket,
  Cpu,
} from "lucide-react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import ElectricBorder from "./ElectricBorder";


const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001
  });

  const timelineItems = [
    {
      year: "LEVEL 01",
      title: "CHARACTER PROFILE",
      description: "Full Stack Engineer & AI Enthusiast based in Dhaka.",
      icon: <Brain size={24} />,
      color: "#22c55e",
      content: (
        <div className="flex gap-4 items-center">
            <div className="relative w-16 h-16 flex-shrink-0">
               <div className="absolute inset-0 bg-green-500/20 animate-pulse rounded-full"></div>
               <img src="https://cdna.artstation.com/p/assets/images/images/019/226/712/original/anja-verhoeff-profilepic-5.gif?1562594634" className="w-full h-full object-cover rounded-full border-2 border-green-500/50" alt="Avatar" />
            </div>
            <div>
               <div className="text-xs font-mono text-green-400 mb-1">XP: 13,840 / 15,000</div>
               <div className="h-1.5 w-32 dark:bg-gray-800 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-green-500 w-[92%]"></div></div>
            </div>
        </div>
      )
    },
    {
      year: "STATS",
      title: "PRIMARY STATS",
      description: "B.Sc. in Software Engineering • IUT",
      icon: <Target size={24} />,
      color: "#3b82f6",
      content: (
         <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="bg-blue-500/10 p-2 rounded border border-blue-500/20 text-center">
               <div className="text-lg font-bold text-blue-400">3.8</div>
               <div className="text-[10px] text-gray-400 uppercase">CGPA</div>
            </div>
            <div className="bg-purple-500/10 p-2 rounded border border-purple-500/20 text-center">
               <div className="text-lg font-bold text-purple-400">20+</div>
               <div className="text-[10px] text-gray-400 uppercase">Projects</div>
            </div>
         </div>
      )
    },
    {
      year: "SPECS",
      title: "SPECIALIZATIONS",
      description: "Scalable Web Apps • UI/UX • AI Models",
      icon: <Zap size={24} />,
      color: "#a855f7",
      content: (
        <div className="flex flex-wrap gap-2 mt-2">
           {["React", "Next.js", "Node", "Python"].map(t => (
             <span key={t} className="px-2 py-1 text-[10px] font-mono rounded bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 border-gray-300 text-gray-600 dark:text-gray-300">{t}</span>
           ))}
        </div>
      )
    },
    {
      year: "SKILLS",
      title: "SKILL MATRIX",
      description: "Frontend 90% • Backend 85% • AI 75%",
      icon: <Code size={24} />,
      color: "#f59e0b",
      content: (
         <div className="space-y-2 mt-2">
            {[90, 85, 75].map((val, i) => (
               <div key={i} className="h-1 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                     initial={{ width: 0 }}
                     whileInView={{ width: `${val}%` }} 
                     className="h-full bg-gradient-to-r from-yellow-400 to-red-500" 
                  />
               </div>
            ))}
         </div>
      )
    },
    {
      year: "ACHIEVE",
      title: "ACHIEVEMENTS",
      description: "Open Source Hero • Hackathon Winner",
      icon: <Trophy size={24} />,
      color: "#ef4444",
      content: (
         <div className="flex items-center gap-3 mt-2 p-2 rounded bg-yellow-500/10 border border-yellow-500/20">
            <Star className="text-yellow-500 shrink-0" size={20} />
            <div className="text-xs">
               <div className="font-bold text-yellow-600 dark:text-yellow-400">Top Contributor</div>
               <div className="text-[10px] opacity-70 dark:text-gray-400"> recognized by GitHub 2024</div>
            </div>
         </div>
      )
    },
    {
        year: "FUTURE",
        title: "NEXT OBJECTIVES",
        description: "Exploring AGI • Building for the next billion",
        icon: <Rocket size={24} />,
        color: "#06b6d4",
        content: (
           <div className="flex items-center gap-2 mt-2">
              <Cpu className="text-cyan-400 animate-spin-slow" size={20} />
              <div className="text-xs text-gray-400">Currently loading...</div>
           </div>
        )
      }
  ];

  return (
    <section ref={containerRef} id="about" className="relative h-[300vh] bg-white dark:bg-black overflow-clip">
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden perspective-container">
        
        {/* Header - Persistent */}
        <div className="absolute top-20 w-full text-center z-[100] pointer-events-none px-4">
            <h2 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-500 dark:from-white dark:to-gray-600 tracking-tighter mb-4">
                ABOUT
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/80 max-w-2xl mx-auto">
                My journey: From coding enthusiast to Full Stack Engineer
            </p>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.03)_0%,rgba(255,255,255,1)_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(50,50,50,0.1)_0%,rgba(0,0,0,1)_100%)]"></div>
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
        </div>

        {/* 3D Scene */}
        <div 
             className="relative w-full max-w-5xl h-full flex items-center justify-center pt-24"
             style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
        >
             {/* The moving world container */}
             <motion.div 
                className="relative w-full h-full flex flex-col items-center"
                style={{ 
                    transformStyle: 'preserve-3d',
                }}
             >
                 {timelineItems.map((item, index) => (
                     <TimelineItem 
                        key={index} 
                        item={item} 
                        index={index} 
                        total={timelineItems.length}
                        progress={smoothProgress}
                     />
                 ))}
             </motion.div>
        </div>
      </div>
    </section>
  );
};

const TimelineItem = ({ item, index, total, progress }: { item: any, index: number, total: number, progress: MotionValue<number> }) => {
    // Spacing configuration
    const zSpacing = 1000; // Distance between cards
    
    // Calculate the Z position for each card.
    const currentZ = useTransform(progress, 
        [0, 1], 
        [index * -zSpacing, (index - (total - 1)) * -zSpacing]
    );
    
    const opacity = useTransform(currentZ, [-4000, -2000, 0, 500], [0, 0.2, 1, 0]);
    const scale = useTransform(currentZ, [-4000, 0, 500], [0.2, 1, 1.2]);
    
    // Optimization: Hide items that are far out of view to reduce layout/paint cost
    const display = useTransform(currentZ, (z) => (z < -3000 || z > 600) ? "none" : "flex");

    const isLeft = index % 2 === 0;

    return (
        <motion.div
            style={{
                z: currentZ,
                opacity,
                scale,
                display, // Conditionally hide
                position: 'absolute',
                top: '45%', // Slightly lowered to clear header
                left: 0,
                right: 0,
                justifyContent: 'center',
                transformStyle: 'preserve-3d',
                pointerEvents: 'auto', // Controlled by display/z-index mainly
                zIndex: useTransform(currentZ, (z) => z > 0 ? 0 : Math.round(z + 10000)),
                willChange: 'transform, opacity' // Hardware acceleration hint
            }}
            className="w-full"
        >
            {/* 
                Mobile: Centered layout
                Desktop: Alternating Left/Right split
            */}
            <div className={`relative w-full max-w-4xl flex items-center justify-center md:items-center ${isLeft ? 'md:justify-end md:pr-[50%]' : 'md:justify-start md:pl-[50%]'}`}>
                
                {/* Connector Line (Curved Branch) - Desktop Only */}
                <div 
                    className="hidden md:flex absolute top-1/2 left-1/2 items-center justify-start pointer-events-none"
                    style={{ 
                         width: '300px', 
                         height: '150px',
                         transformOrigin: 'left center',
                         transform: `translateY(-50%) ${isLeft ? 'scaleX(-1)' : ''}`, 
                         zIndex: -1
                     }}
                >
                    <svg width="100%" height="100%" viewBox="0 0 300 150" preserveAspectRatio="none" className="overflow-visible">
                        {/* 
                           Improved Organic Curve
                           Start: (0, 130) -> Lower on spine
                           End: (300, 75) -> Center of card connector
                           Controls: (60, 130) -> Horizontal start, (100, 75) -> Ease into target height earlier
                        */}
                        <path 
                            d="M 0 130 C 60 130, 120 75, 260 75" 
                            fill="none" 
                            stroke={item.color} 
                            strokeWidth="2" 
                            strokeOpacity="0.8"
                            strokeLinecap="round"
                        />
                         {/* Glow effect - Optimized: Removed blur filter for performance */}
                         <path 
                            d="M 0 130 C 60 130, 120 75, 260 75" 
                            stroke={item.color} 
                            strokeWidth="8" 
                            fill="none" 
                            opacity="0.1" 
                            // style={{ filter: 'blur(3px)' }} // REMOVED for performance
                        />
                    </svg>
                    {/* Spine Dot */}
                    <div className="absolute left-0 top-[130px] -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white dark:bg-ml-dark border-2" style={{ borderColor: item.color, boxShadow: `0 0 10px ${item.color}`}}></div>
                </div>

                {/* Card Container */}
                {/* Visual gap increased to px-24 (96px) to show the curve */}
                <div className={`relative px-4 md:px-24 py-4 text-left ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                    <ElectricBorder color={item.color} borderRadius={12}>
                        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-gray-200 dark:border-gray-800 p-6 rounded-xl w-[85vw] max-w-[380px] shadow-2xl hover:bg-gray-50 dark:hover:bg-black transition-colors group">
                            <div className={`flex items-center gap-4 mb-3 flex-row ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white shadow-inner group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <div className="flex flex-col">
                                    <span className={`text-[10px] uppercase tracking-widest font-mono text-gray-500 text-left ${isLeft ? 'md:text-right' : 'md:text-left'}`}>{item.year}</span>
                                    <h3 className={`text-lg font-bold text-gray-900 dark:text-white text-left ${isLeft ? 'md:text-right' : 'md:text-left'}`}>{item.title}</h3>
                                </div>
                            </div>
                            
                            <p className={`text-sm text-gray-600 dark:text-gray-400 mb-4 text-left ${isLeft ? 'md:text-right' : 'md:text-left'}`}>{item.description}</p>
                            
                            <div className={`flex justify-start ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                                {item.content}
                            </div>

                          {/* Decorative corner glow */}
                          <div 
                            className="absolute bottom-0 right-0 w-24 h-24 opacity-10 blur-2xl pointer-events-none"
                            style={{ backgroundColor: item.color }}
                          />
                      </div>
                    </ElectricBorder>
                </div>
            </div>
        </motion.div>
    );
};


export default About;
