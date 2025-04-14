import React, { useEffect, useRef, useState } from 'react';

// AnimatedBeam component
const AnimatedBeam = ({ 
  containerRef, 
  fromRef, 
  toRef, 
  duration = 3,
  color = "rgba(106, 56, 179, 0.3)",
  thickness = 1
}) => {
  const [path, setPath] = useState("");
  const [animate, setAnimate] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const pathId = useRef(`beam-path-${Math.random().toString(36).substring(2, 9)}`).current;

  useEffect(() => {
    if (!fromRef?.current || !toRef?.current || !containerRef?.current) return;

    const calculatePositions = () => {
      try {
        const fromRect = fromRef.current.getBoundingClientRect();
        const toRect = toRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        const fromX = fromRect.left - containerRect.left + fromRect.width / 2;
        const fromY = fromRect.top - containerRect.top + fromRect.height / 2;
        const toX = toRect.left - containerRect.left + toRect.width / 2;
        const toY = toRect.top - containerRect.top + toRect.height / 2;

        // Control points for the Bezier curve
        const cpX1 = fromX + (toX - fromX) / 3;
        const cpY1 = fromY + (toY - fromY) / 6;
        const cpX2 = fromX + 2 * (toX - fromX) / 3;
        const cpY2 = toY - (toY - fromY) / 6;

        setPath(`M ${fromX} ${fromY} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${toX} ${toY}`);
        setDimensions({
          width: containerRect.width,
          height: containerRect.height
        });
        setAnimate(true);
      } catch (error) {
        console.error("Error calculating beam positions:", error);
      }
    };

    // Give the DOM time to render before calculating positions
    const timer = setTimeout(calculatePositions, 100);
    window.addEventListener('resize', calculatePositions);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculatePositions);
    };
  }, [fromRef, toRef, containerRef]);

  if (!path) return null;

  return (
    <svg 
      width={dimensions.width} 
      height={dimensions.height} 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        pointerEvents: 'none',
        zIndex: 0 
      }}
    >
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="round"
        style={{
          opacity: animate ? 1 : 0,
          strokeDasharray: 1000,
          strokeDashoffset: animate ? 0 : 1000,
          transition: `stroke-dashoffset ${duration}s ease-in-out, opacity 0.5s ease-in-out`
        }}
      />
      {/* Animated particle along the path */}
      {animate && (
        <circle r={2} fill="#8B5CF6">
          <animateMotion
            dur={`${duration}s`}
            repeatCount="indefinite"
            path={path}
          />
        </circle>
      )}
    </svg>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const centerLogoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const iconRefsMap = useRef({});

  // Tech stacks with fixed positioning
  const topTechIcons = [
    // { id: 'figma', name: 'Figma', imgSrc: "/api/placeholder/40/40", alt: "Figma", style: { left: '10%' } },
    { id: 'react', name: 'React', imgSrc: "/api/placeholder/40/40", alt: "React", style: { left: '25%' } },
    { id: 'csharp', name: 'C#', imgSrc: "/api/placeholder/40/40", alt: "C#", style: { left: '40%' } },
    { id: 'node', name: 'Node', imgSrc: "node-js-icon.png", alt: "Node", style: { left: '55%' } },
    // { id: 'electron', name: 'Electron', imgSrc: "/api/placeholder/40/40", alt: "Electron", style: { left: '70%' } },
    { id: 'js', name: 'JavaScript', imgSrc: "/api/placeholder/40/40", alt: "JavaScript", style: { left: '85%' } }
  ];

  const bottomTechIcons = [
    // { id: 'xd', name: 'XD', imgSrc: "/api/placeholder/40/40", alt: "Adobe XD", style: { left: '15%' } },
    { id: 'nextjs', name: 'Next.js', imgSrc: "nextjs-icon.png", alt: "Next.js", style: { left: '30%' } },
    // { id: 'graphql', name: 'GraphQL', imgSrc: "/api/placeholder/40/40", alt: "GraphQL", style: { left: '45%' } },
    { id: 'ai', name: 'AI', imgSrc: "/api/placeholder/40/40", alt: "Adobe Illustrator", style: { left: '60%' } },
    { id: 'express', name: 'Express', imgSrc: "/api/placeholder/40/40", alt: "Express", style: { left: '75%' } }
  ];

  const leftTechIcons = [
    { id: 'ai-left', name: 'AI', imgSrc: "/api/placeholder/30/30", alt: "AI", style: { top: '20%' } },
    { id: 'linkedin', name: 'LinkedIn', imgSrc: "/api/placeholder/30/30", alt: "LinkedIn", style: { top: '40%' } },
    // { id: 'target', name: 'Target', imgSrc: "/api/placeholder/30/30", alt: "Target", style: { top: '60%' } },
    { id: 'html', name: 'HTML', imgSrc: "/api/placeholder/30/30", alt: "HTML", style: { top: '80%' } }
  ];

  const rightTechIcons = [
    { id: 'code', name: 'Code', imgSrc: "/api/placeholder/30/30", alt: "Code", style: { top: '20%' } },
    { id: 'settings', name: 'Settings', imgSrc: "/api/placeholder/30/30", alt: "Settings", style: { top: '40%' } },
    // { id: 'vm', name: 'VM', imgSrc: "/api/placeholder/30/30", alt: "VM", style: { top: '60%' } },
    { id: 'tools', name: 'Tools', imgSrc: "/api/placeholder/30/30", alt: "Tools", style: { top: '80%' } }
  ];

  // Initialize refs on mount
  useEffect(() => {
    const allIcons = [...topTechIcons, ...bottomTechIcons, ...leftTechIcons, ...rightTechIcons];
    allIcons.forEach(icon => {
      iconRefsMap.current[icon.id] = React.createRef();
    });
    // Force a re-render to make sure refs are applied
    setIsVisible(false);
  }, []);

  // Set up intersection observer
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Delay visibility to ensure refs are properly attached
          setTimeout(() => setIsVisible(true), 300);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, []);

  // Decide whether to show beams
  const [showBeams, setShowBeams] = useState(false);
  useEffect(() => {
    if (isVisible) {
      // Delay beam rendering to ensure all elements are positioned properly
      const timer = setTimeout(() => {
        setShowBeams(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <section id="skills" className="w-full min-h-screen bg-ml-dark flex flex-col items-center justify-center py-20 overflow-hidden">
      <div ref={sectionRef} className="w-full max-w-6xl mx-auto px-4">
        {/* Header text */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
  <h2 className="text-8xl md:text-4xl font-normal text-white mb-2">
    This is my <span className="text-purple-400">tech stack</span>
  </h2>
  <p className="text-lg text-white/80">
    Tools I use to build innovative and impactful solutions
  </p>
</div>

        {/* Skills orbital diagram */}
        <div ref={containerRef} className="relative h-96 md:h-[500px] w-full">
          {/* Center logo */}
          <div 
            ref={centerLogoRef}
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
          >
            <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-purple-900/80"></div>
              <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-pulse"></div>
              <div className="text-white text-4xl md:text-5xl font-light z-10">Σ</div>
            </div>
          </div>

          {/* Top arc of tech icons */}
          <div className="absolute top-4 left-0 right-0 w-full">
            <div className="relative h-24">
              {topTechIcons.map((tech, index) => (
                <div 
                  key={tech.id} 
                  ref={iconRefsMap.current[tech.id]}
                  className={`absolute transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}
                  style={{
                    ...tech.style,
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <div className="bg-[#1E123A] w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                    <img src={tech.imgSrc} alt={tech.alt} className="w-6 h-6" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom arc of tech icons */}
          <div className="absolute bottom-4 left-0 right-0 w-full">
            <div className="relative h-24">
              {bottomTechIcons.map((tech, index) => (
                <div 
                  key={tech.id} 
                  ref={iconRefsMap.current[tech.id]}
                  className={`absolute transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{
                    ...tech.style,
                    transitionDelay: `${index * 100 + 400}ms`
                  }}
                >
                  <div className="bg-[#1E123A] w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                    <img src={tech.imgSrc} alt={tech.alt} className="w-6 h-6" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Left side tech icons */}
          <div className="absolute left-4 top-0 bottom-0 h-full">
            <div className="relative w-16 h-full">
              {leftTechIcons.map((tech, index) => (
                <div 
                  key={tech.id} 
                  ref={iconRefsMap.current[tech.id]}
                  className={`absolute left-0 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                  style={{
                    ...tech.style,
                    transitionDelay: `${index * 100 + 600}ms`
                  }}
                >
                  <div className="bg-[#1E123A] w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                    <img src={tech.imgSrc} alt={tech.alt} className="w-5 h-5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side tech icons */}
          <div className="absolute right-4 top-0 bottom-0 h-full">
            <div className="relative w-16 h-full">
              {rightTechIcons.map((tech, index) => (
                <div 
                  key={tech.id}
                  ref={iconRefsMap.current[tech.id]} 
                  className={`absolute right-0 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                  style={{
                    ...tech.style,
                    transitionDelay: `${index * 100 + 800}ms`
                  }}
                >
                  <div className="bg-[#1E123A] w-10 h-10 rounded-full flex items-center justify-center shadow-lg">
                    <img src={tech.imgSrc} alt={tech.alt} className="w-5 h-5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Animated Beams - render only after everything else is ready */}
          {showBeams && centerLogoRef.current && (
            <>
              {topTechIcons.map((tech) => (
                iconRefsMap.current[tech.id]?.current && (
                  <AnimatedBeam
                    key={`beam-${tech.id}`}
                    containerRef={containerRef}
                    fromRef={centerLogoRef}
                    toRef={iconRefsMap.current[tech.id]}
                    duration={5 + Math.random() * 3}
                    thickness={1.5}
                  />
                )
              ))}
              
              {bottomTechIcons.map((tech) => (
                iconRefsMap.current[tech.id]?.current && (
                  <AnimatedBeam
                    key={`beam-${tech.id}`}
                    containerRef={containerRef}
                    fromRef={centerLogoRef}
                    toRef={iconRefsMap.current[tech.id]}
                    duration={5 + Math.random() * 3}
                    thickness={1.5}
                  />
                )
              ))}
              
              {leftTechIcons.map((tech) => (
                iconRefsMap.current[tech.id]?.current && (
                  <AnimatedBeam
                    key={`beam-${tech.id}`}
                    containerRef={containerRef}
                    fromRef={centerLogoRef}
                    toRef={iconRefsMap.current[tech.id]}
                    duration={5 + Math.random() * 3}
                    thickness={1.5}
                  />
                )
              ))}
              
              {rightTechIcons.map((tech) => (
                iconRefsMap.current[tech.id]?.current && (
                  <AnimatedBeam
                    key={`beam-${tech.id}`}
                    containerRef={containerRef}
                    fromRef={centerLogoRef}
                    toRef={iconRefsMap.current[tech.id]}
                    duration={5 + Math.random() * 3}
                    thickness={1.5}
                  />
                )
              ))}
            </>
          )}

          {/* Orbit animation rings */}
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 transition-all duration-1000 ${isVisible ? 'opacity-30' : 'opacity-0'}`}>
            <div className="absolute inset-0 rounded-full border border-purple-500/10" style={{animation: 'spin-slow 30s linear infinite'}}></div>
            <div className="absolute inset-8 rounded-full border border-purple-500/10" style={{animation: 'reverse-spin 20s linear infinite'}}></div>
            <div className="absolute inset-16 rounded-full border border-purple-500/10" style={{animation: 'spin-slow 30s linear infinite'}}></div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes reverse-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 15px 2px rgba(139, 92, 246, 0.3); }
          50% { box-shadow: 0 0 20px 5px rgba(139, 92, 246, 0.5); }
        }
      `}</style>
    </section>
  );
};

export default Skills;