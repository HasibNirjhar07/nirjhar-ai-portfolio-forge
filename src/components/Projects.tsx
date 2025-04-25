import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, ArrowRight, Code, Zap, Terminal, FileCode2, Coffee } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
}

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoverGlitch, setHoverGlitch] = useState(false);
  const [glitchText, setGlitchText] = useState('');
  
  // Trigger glitch text animation periodically
  useEffect(() => {
    const titles = ["PROJECTS", "PORTFOLIO", "SHOWCASE", "CREATIONS"];
    let interval = setInterval(() => {
      setGlitchText(titles[Math.floor(Math.random() * titles.length)]);
      setHoverGlitch(true);
      setTimeout(() => setHoverGlitch(false), 800);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);
  
  const projects: Project[] = [
    {
      title: "ML Sentiment Analyzer",
      description: "A machine learning application that analyzes sentiment in text using natural language processing techniques.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
      tags: ["Python", "TensorFlow", "NLP", "React"],
      github: "#",
      demo: "#"
    },
    {
      title: "Neural Network Visualizer",
      description: "Interactive web application to visualize neural network architectures and their training process.",
      image: "https://images.unsplash.com/photo-1501526029524-a8ea952b15be?q=80&w=2070&auto=format&fit=crop",
      tags: ["JavaScript", "React", "D3.js", "TensorFlow.js"],
      github: "#",
      demo: "#"
    },
    {
      title: "Smart Task Management",
      description: "Task management application with ML-powered prioritization and time estimation features.",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop",
      tags: ["NextJs", "MongoDB", "Python", "ML"],
      github: "#",
      demo: "#"
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
          
          // Animate project cards when section comes into view
          const cards = entry.target.querySelectorAll('.project-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.add('opacity-100', 'translate-x-0');
              card.classList.remove('opacity-0', 'translate-x-20');
            }, 200 * index);
          });
          
          // Trigger header glitch effect on view
          setTimeout(() => {
            setHoverGlitch(true);
            setTimeout(() => setHoverGlitch(false), 1000);
          }, 500);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  // Cyberpunk glitch text effect component
  const GlitchText = ({ text, className = "" }) => {
    return (
      <div className={`relative inline-block ${className}`}>
        <span className={`absolute top-0 left-0.5 text-cyan-400 opacity-70 ${hoverGlitch ? 'animate-glitch-1' : ''}`}>{text}</span>
        <span className={`absolute -top-px -left-px text-fuchsia-500 opacity-70 ${hoverGlitch ? 'animate-glitch-2' : ''}`}>{text}</span>
        <span className="relative z-10">{text}</span>
      </div>
    );
  };

  // Random component to select a tech icon
  const TechIcon = ({ tag }) => {
    switch(tag.toLowerCase()) {
      case 'python':
        return <FileCode2 size={14} className="mr-1" />;
      case 'react':
      case 'nextjs':
        return <Code size={14} className="mr-1" />;
      case 'mongodb':
        return <Terminal size={14} className="mr-1" />;
      default:
        return <Coffee size={14} className="mr-1" />;
    }
  };

  return (
    <section id="projects" className="py-20 bg-ml-dark bg-opacity-90 relative overflow-hidden">
      {/* Animated cyberpunk grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 z-0 animate-grid-shift"></div>
      
      {/* Animated neon glow effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-fuchsia-600 opacity-10 blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-cyan-500 opacity-10 blur-3xl animate-float"></div>
      <div className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full bg-lime-500 opacity-5 blur-3xl animate-float-delayed"></div>
      
      {/* Digital rain effect (matrix-like) */}
      <div className="digital-rain absolute inset-0 opacity-5 pointer-events-none"></div>
      
      <div className="section-container relative z-10">
        <div
          ref={sectionRef}
          className="opacity-0 translate-y-10 transition-all duration-700"
        >
          <div className="text-center relative mb-16">
            <div className="cyberpunk-border inline-block p-3 relative mb-4">
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-fuchsia-500"></div>
              
              <h2 className="text-5xl font-bold mb-2 cyber-font relative inline-block">
                <span className="text-white">Featured</span>{" "}
                <GlitchText text={glitchText || "_Projects"} />
                <span className="text-lime-500 animate-blink ml-1">_</span>
              </h2>
            </div>
            
            <div className="h-1 w-24 bg-gradient-to-r from-cyan-400 to-fuchsia-500 mx-auto mt-2 relative">
              {/* Neon highlight effect */}
              <div className="absolute inset-0 blur-sm bg-gradient-to-r from-cyan-400 to-fuchsia-500 opacity-70"></div>
            </div>
            
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto relative">
              Some of my recent work combining software development and machine learning
              <span className="data-line absolute -bottom-2 left-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></span>
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className="project-card opacity-0 translate-x-20 transition-all duration-700 ease-out relative group"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {/* Enhanced card border with animated neon effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-500 opacity-70 p-0.5 z-0 transition-opacity duration-300 group-hover:animate-pulse group-hover:opacity-100"></div>
                
                {/* Digital circuit lines effect */}
                <div className={`absolute -inset-px z-0 pointer-events-none transition-opacity duration-300 ${activeIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="absolute top-0 left-1/4 w-px h-full bg-cyan-400 animate-circuit-pulse"></div>
                  <div className="absolute top-1/3 left-0 w-full h-px bg-fuchsia-500 animate-circuit-pulse-delayed"></div>
                  <div className="absolute bottom-1/4 right-0 w-px h-1/3 bg-lime-400 animate-circuit-pulse"></div>
                  <div className="absolute top-2/3 right-1/4 w-1/3 h-px bg-cyan-400 animate-circuit-pulse-delayed"></div>
                </div>
                
                <div className="relative z-10 bg-gray-900 bg-opacity-90 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 h-full flex flex-col">
                  {/* Improved scanline effect overlay */}
                  <div className="absolute inset-0 bg-scanline opacity-10 pointer-events-none z-10 animate-scanline"></div>
                  
                  {/* Glitch effect on hover */}
                  <div className={`absolute inset-0 z-20 pointer-events-none transition-opacity duration-200 overflow-hidden ${activeIndex === index ? 'opacity-30' : 'opacity-0'}`}>
                    <div className="absolute inset-0 bg-glitch opacity-30 animate-glitch-background mix-blend-overlay"></div>
                  </div>
                  
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className={`w-full h-full object-cover transition-all duration-500 ${activeIndex === index ? 'scale-110 saturate-150' : 'scale-100'}`}
                    />
                    
                    {/* Enhanced color overlay with animations */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                    <div className={`absolute inset-0 bg-gradient-to-r from-cyan-900/30 to-fuchsia-900/30 mix-blend-color transition-opacity duration-300 ${activeIndex === index ? 'opacity-100' : 'opacity-70'}`}></div>
                    
                    {/* Digital noise effect */}
                    <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay"></div>
                    
                    {/* Data corruption effect on hover */}
                    <div className={`absolute inset-0 data-corruption opacity-0 group-hover:opacity-20 transition-opacity duration-300 mix-blend-overlay`}></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center">
                      <h3 className="text-xl font-bold text-white flex items-center group-hover:text-cyan-300 transition-colors">
                        <span className="text-cyan-400 mr-2">
                          <Zap size={18} className="animate-pulse" />
                        </span>
                        {activeIndex === index ? (
                          <span className="glitch-text" data-text={project.title}>{project.title}</span>
                        ) : project.title}
                      </h3>
                      <div className="flex space-x-2">
                        {project.github && (
                          <a 
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full bg-black/60 border border-cyan-500 hover:bg-cyan-500/20 flex items-center justify-center transition-all transform hover:scale-110 hover:rotate-6"
                            aria-label="GitHub Repository"
                          >
                            <Github size={16} className="text-white" />
                          </a>
                        )}
                        {project.demo && (
                          <a 
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer" 
                            className="w-8 h-8 rounded-full bg-black/60 border border-fuchsia-500 hover:bg-fuchsia-500/20 flex items-center justify-center transition-all transform hover:scale-110 hover:-rotate-6"
                            aria-label="Live Demo"
                          >
                            <ExternalLink size={16} className="text-white" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 border-t border-gray-800 flex-1 flex flex-col">
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="text-xs px-3 py-1 rounded-full border border-cyan-400 text-cyan-400 bg-cyan-900/20 font-mono flex items-center hover:bg-cyan-800/30 transition-colors group-hover:animate-tag-pulse"
                        >
                          <TechIcon tag={tag} />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a 
                      href={project.demo || project.github || '#'} 
                      className="flex items-center text-fuchsia-400 hover:text-fuchsia-300 transition-colors font-medium mt-auto group/btn"
                    >
                      <Code size={16} className="mr-2" />
                      <span>View Project</span>
                      <ArrowRight size={16} className="ml-2 group-hover/btn:translate-x-2 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-16">
            <a 
              href="https://github.com/HasibNirjhar07?tab=repositories" 
              target="_blank"
              rel="noopener noreferrer"
              className="relative group"
              onMouseEnter={() => {
                setHoverGlitch(true);
                setTimeout(() => setHoverGlitch(false), 800);
              }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-md blur opacity-75 group-hover:opacity-100 transition duration-300 group-hover:duration-200 animate-pulse"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-lime-500 to-cyan-500 rounded-md blur opacity-0 group-hover:opacity-50 transition duration-300 group-hover:animate-ping"></div>
              <button className="relative px-8 py-3 bg-black rounded-md text-white font-mono border border-cyan-500 flex items-center space-x-2 group-hover:bg-gray-900 transition-all">
                <span className="text-glitch" data-text="VIEW_ALL_PROJECTS">VIEW_ALL_PROJECTS</span>
                <Github className="inline-block ml-2 group-hover:rotate-12 transition-transform" size={16} />
              </button>
            </a>
          </div>
        </div>
      </div>
      
      {/* CSS for custom animations and effects */}
      <style jsx>{`
        @keyframes glitch-1 {
          0% { transform: translate(0); }
          20% { transform: translate(-3px, 2px); }
          40% { transform: translate(-3px, -2px); }
          60% { transform: translate(3px, 2px); }
          80% { transform: translate(3px, -2px); }
          100% { transform: translate(0); }
        }
        
        @keyframes glitch-2 {
          0% { transform: translate(0); }
          20% { transform: translate(3px, -2px); }
          40% { transform: translate(3px, 2px); }
          60% { transform: translate(-3px, -2px); }
          80% { transform: translate(-3px, 2px); }
          100% { transform: translate(0); }
        }
        
        @keyframes scanline {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
        
        @keyframes circuit-pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 0.3; }
        }
        
        @keyframes circuit-pulse-delayed {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.2; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-15px) translateX(15px); }
        }
        
        @keyframes grid-shift {
          0%, 100% { background-position: 0 0; }
          50% { background-position: 20px 20px; }
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        @keyframes tag-pulse {
          0%, 100% { border-color: rgba(34, 211, 238, 1); }
          50% { border-color: rgba(192, 38, 211, 1); }
        }
        
        .cyber-font {
          letter-spacing: 1px;
          font-family: monospace, sans-serif;
          text-shadow: 0 0 5px rgba(56, 239, 125, 0.4);
        }
        
        .glitch-text {
          position: relative;
          display: inline-block;
        }
        
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .glitch-text::before {
          left: -2px;
          text-shadow: 2px 0 #ff00ea;
          animation: glitch-1 0.3s linear infinite;
          animation-play-state: paused;
        }
        
        .glitch-text::after {
          left: 2px;
          text-shadow: -2px 0 #00d9ff;
          animation: glitch-2 0.3s linear infinite;
          animation-play-state: paused;
        }
        
        .group:hover .glitch-text::before,
        .group:hover .glitch-text::after {
          animation-play-state: running;
        }
        
        .text-glitch {
          position: relative;
          display: inline-block;
        }
        
        .text-glitch::before,
        .text-glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          transition: opacity 0.2s;
        }
        
        .text-glitch::before {
          left: -2px;
          text-shadow: 2px 0 #ff00ea;
        }
        
        .text-glitch::after {
          left: 2px;
          text-shadow: -2px 0 #00d9ff;
        }
        
        .group:hover .text-glitch::before,
        .group:hover .text-glitch::after {
          opacity: 0.7;
          animation: glitch-1 0.3s linear infinite;
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 4s infinite;
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
        
        .animate-circuit-pulse {
          animation: circuit-pulse 2s infinite;
        }
        
        .animate-circuit-pulse-delayed {
          animation: circuit-pulse-delayed 3s infinite;
        }
        
        .animate-tag-pulse {
          animation: tag-pulse 2s ease-in-out infinite;
        }
        
        .animate-glitch-background {
          animation: glitch-1 0.2s linear infinite;
        }
        
        .animate-scanline {
          animation: scanline 8s linear infinite;
        }
        
        .animate-grid-shift {
          animation: grid-shift 20s linear infinite;
        }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, #0f162b 1px, transparent 1px),
            linear-gradient(to bottom, #0f162b 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .bg-scanline {
          background: repeating-linear-gradient(
            to bottom,
            transparent 0%,
            rgba(0, 0, 0, 0.05) 0.5%,
            transparent 1%
          );
          background-size: 100% 4px;
        }
        
        .bg-glitch {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        
        .data-corruption {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.1' numOctaves='5' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        
        .data-line {
          animation: circuit-pulse 4s infinite;
        }
        
        .digital-rain {
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.1' numOctaves='3' result='noise'/%3E%3CfeComponentTransfer%3E%3CfeFuncA type='table' tableValues='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E");
          background-size: cover;
          mix-blend-mode: screen;
        }
        
        .cyberpunk-border {
          position: relative;
          padding: 1rem;
        }
      `}</style>
    </section>
  );
};

export default Projects;