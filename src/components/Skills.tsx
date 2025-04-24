import React, { useEffect, useRef, useState } from 'react';

// AnimatedBeam component (unchanged from original)
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

// New AnimatedParticle component for background effects
const AnimatedParticle = ({ size, delay, duration, color }) => {
  const randomPosition = () => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    opacity: Math.random() * 0.5 + 0.1
  });

  const [position, setPosition] = useState(randomPosition());

  useEffect(() => {
    const timer = setInterval(() => {
      setPosition(randomPosition());
    }, duration * 1000);

    return () => clearInterval(timer);
  }, [duration]);

  return (
    <div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        boxShadow: `0 0 ${size/2}px ${color}`,
        left: position.left,
        top: position.top,
        opacity: position.opacity,
        transition: `all ${duration}s ease-in-out`,
        transitionDelay: `${delay}s`,
        zIndex: 0
      }}
    />
  );
};

// Floating galaxy effect
const FloatingGalaxy = ({ count = 30 }) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, index) => (
        <AnimatedParticle
          key={index}
          size={Math.random() * 4 + 1}
          delay={Math.random() * 2}
          duration={Math.random() * 15 + 10}
          color={index % 3 === 0 ? "#8B5CF6" : index % 3 === 1 ? "#6D28D9" : "#4C1D95"}
        />
      ))}
    </div>
  );
};

// AnimatedGradient component for the background
const AnimatedGradient = () => {
  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/30 to-black" />
      <div className="absolute inset-0 animate-gradientFlow opacity-30" />
    </div>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const centerLogoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const iconRefsMap = useRef({});

  const topTechIcons = [
    { id: 'react', name: 'React', imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", alt: "React", style: { left: '25%' } },
    { id: 'csharp', name: 'C#', imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg", alt: "C#", style: { left: '40%' } },
    { id: 'node', name: 'Node.js', imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", alt: "Node.js", style: { left: '55%' } },
    { id: 'js', name: 'JavaScript', imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", alt: "JavaScript", style: { left: '85%' } }
  ];
  
  const bottomTechIcons = [
    { id: 'nextjs', name: 'Next.js', imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", alt: "Next.js", style: { left: '30%' } },
    {
      id: 'tailwind',
      name: 'Tailwind CSS',
      imgSrc: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
      alt: "Tailwind CSS",
      style: { left: '45%' }
    },
    { id: 'tensorflow', name: 'TensorFlow', imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg", alt: "TensorFlow", style: { left: '60%' } },
    { id: 'python', name: 'Python', imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", alt: "Python", style: { left: '75%' } }
  ];
  
  const leftTechIcons = [
    { id: 'java', name: 'Java', imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", alt: "Java", style: { top: '20%' } },
    { id: 'cpp', name: 'C++', imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg", alt: "C++", style: { top: '40%' } },
    { id: 'html', name: 'HTML', imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg", alt: "HTML", style: { top: '60%' } },
    { id: 'css', name: 'CSS', imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", alt: "CSS", style: { top: '80%' } }
  ];
  
  const rightTechIcons = [
    { id: 'vscode', name: 'VS Code', imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", alt: "VS Code", style: { top: '20%' } },
    { id: 'intellij', name: 'IntelliJ IDEA', imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/intellij/intellij-original.svg", alt: "IntelliJ", style: { top: '40%' } },
    { id: 'pycharm', name: 'PyCharm', imgSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pycharm/pycharm-original.svg", alt: "PyCharm", style: { top: '60%' } }
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
    <section 
      id="skills" 
      className="w-full min-h-screen bg-ml-dark relative flex flex-col items-center justify-center py-20 overflow-hidden"
      ref={sectionRef}
    >
      {/* Enhanced background */}
      <AnimatedGradient />
      
      {/* Floating particles */}
      <FloatingGalaxy count={40} />
      
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-grid opacity-20"></div>
      
      <div className="w-full max-w-6xl mx-auto px-4 relative z-10">
        {/* Header text with enhanced animation */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            This is my <span className="text-purple-400 glow-text">tech stack</span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Tools I use to build innovative and impactful solutions
          </p>
        </div>

        {/* Skills orbital diagram */}
        <div ref={containerRef} className="relative h-96 md:h-[500px] w-full">
          {/* Center logo with improved glow */}
          <div 
            ref={centerLogoRef}
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
          >
            <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-purple-900/80 animate-pulse-slow"></div>
              <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-pulse"></div>
              <div className="absolute inset-0 rounded-full bg-purple-700/30 animate-glow"></div>
              <div className="text-white text-4xl md:text-5xl font-light z-10 glow-text">💻</div>
            </div>
          </div>

          {/* Top arc of tech icons with hover effects */}
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
                  <div className="tech-icon bg-[#1E123A] w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-125 hover:shadow-purple-500/50 transition-all duration-300">
                    <img src={tech.imgSrc} alt={tech.alt} className="w-6 h-6" />
                    <span className="tech-tooltip">{tech.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom arc of tech icons with hover effects */}
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
                  <div className="tech-icon bg-[#1E123A] w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:scale-125 hover:shadow-purple-500/50 transition-all duration-300">
                    <img src={tech.imgSrc} alt={tech.alt} className="w-6 h-6" />
                    <span className="tech-tooltip">{tech.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Left side tech icons with hover effects */}
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
                  <div className="tech-icon bg-[#1E123A] w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-125 hover:shadow-purple-500/50 transition-all duration-300">
                    <img src={tech.imgSrc} alt={tech.alt} className="w-5 h-5" />
                    <span className="tech-tooltip right-full mr-2">{tech.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side tech icons with hover effects */}
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
                  <div className="tech-icon bg-[#1E123A] w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-125 hover:shadow-purple-500/50 transition-all duration-300">
                    <img src={tech.imgSrc} alt={tech.alt} className="w-5 h-5" />
                    <span className="tech-tooltip left-full ml-2">{tech.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Animated Beams */}
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
                    color={`rgba(139, 92, 246, ${0.2 + Math.random() * 0.3})`}
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
                    color={`rgba(139, 92, 246, ${0.2 + Math.random() * 0.3})`}
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
                    color={`rgba(139, 92, 246, ${0.2 + Math.random() * 0.3})`}
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
                    color={`rgba(139, 92, 246, ${0.2 + Math.random() * 0.3})`}
                  />
                )
              ))}
            </>
          )}

          {/* Enhanced orbit animation rings */}
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 transition-all duration-1000 ${isVisible ? 'opacity-40' : 'opacity-0'}`}>
            <div className="absolute inset-0 rounded-full border border-purple-500/20 animate-orbit-1"></div>
            <div className="absolute inset-8 rounded-full border border-purple-500/20 animate-orbit-2"></div>
            <div className="absolute inset-16 rounded-full border border-purple-500/20 animate-orbit-3"></div>
            <div className="absolute inset-24 rounded-full border border-purple-500/20 animate-orbit-4"></div>
          </div>
        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx global>{`
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes reverse-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.05); opacity: 1; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 15px 2px rgba(139, 92, 246, 0.3); }
          50% { box-shadow: 0 0 25px 8px rgba(139, 92, 246, 0.6); }
        }
        
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes orbit-1 {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.03); }
          100% { transform: rotate(360deg) scale(1); }
        }
        
        @keyframes orbit-2 {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(-180deg) scale(1.05); }
          100% { transform: rotate(-360deg) scale(1); }
        }
        
        @keyframes orbit-3 {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.07); }
          100% { transform: rotate(360deg) scale(1); }
        }
        
        @keyframes orbit-4 {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(-180deg) scale(1.04); }
          100% { transform: rotate(-360deg) scale(1); }
        }
        
        @keyframes glow {
          0%, 100% { opacity: 0.5; box-shadow: 0 0 10px 2px rgba(139, 92, 246, 0.3); }
          50% { opacity: 0.8; box-shadow: 0 0 20px 5px rgba(139, 92, 246, 0.6); }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow 4s ease-in-out infinite;
        }
        
        .animate-orbit-1 {
          animation: orbit-1 20s linear infinite;
        }
        
        .animate-orbit-2 {
          animation: orbit-2 25s linear infinite;
        }
        
        .animate-orbit-3 {
          animation: orbit-3 30s linear infinite;
        }
        
        .animate-orbit-4 {
          animation: orbit-4 35s linear infinite;
        }
        
        .animate-gradientFlow {
          background: linear-gradient(45deg, 
            rgba(76, 29, 149, 0.1) 0%, 
            rgba(124, 58, 237, 0.1) 25%, 
            rgba(139, 92, 246, 0.1) 50%, 
            rgba(124, 58, 237, 0.1) 75%, 
            rgba(76, 29, 149, 0.1) 100%);
          background-size: 400% 400%;
          animation: gradientFlow 15s ease infinite;
        }
        
        .bg-ml-dark {
          background-color: #0C0517;
        }
        
        .bg-grid {
          background-image: linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        
        .tech-icon {
          position: relative;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .tech-icon:hover {
          box-shadow: 0 0 15px 2px rgba(139, 92, 246, 0.5);
        }
        
        .tech-tooltip {
          position: absolute;
          background-color: #1E123A;
          color: white;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 0.75rem;
          white-space: nowrap;
          opacity: 0;
          transform: scale(0.9);
          transition: all 0.2s ease;
          z-index: 10;
          top: -25px;
        }
        
        .tech-icon:hover .tech-tooltip {
          opacity: 1;
          transform: scale(1);
        }
        
        .glow-text {
          text-shadow: 0 0 10px rgba(139, 92, 246, 0.5);
        }
      `}</style>
    </section>
  );
};

export default Skills;