import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, ArrowRight, Code, Zap, Terminal, FileCode2 } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
  gradient: string;
  accentColor: string;
}

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ticking = useRef(false);
  const lastScrollY = useRef(0);

  const projects: Project[] = [
    {
      title: "HobbyHub",
      description: "A full-stack social media platform for hobbyists to share passions, post content, comment, follow others, and explore hobbies. Features dual authentication, media uploads, and admin reporting.",
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=2070&auto=format&fit=crop",
      tags: ["Node.js", "Express", "MongoDB", "Passport.js"],
      github: "https://github.com/HasibNirjhar07/HobbyHub",
      demo: "#",
      gradient: "from-cyan-600/40 to-blue-900/80",
      accentColor: "text-cyan-400"
    },
    {
      title: "Lingua Kids",
      description: "An engaging web app to help children improve English skills through reading, writing, listening, and speaking exercises. Includes streak tracking, leaderboards, and animated UI for kids.",
      image: "https://cdn.vectorstock.com/i/500p/01/82/children-studying-in-classroom-vector-6320182.jpg",
      tags: ["Next.js", "Tailwind CSS", "React", "TypeScript"],
      github: "https://github.com/HasibNirjhar07/lingua-kids",
      demo: "#",
      gradient: "from-purple-600/40 to-indigo-900/80",
      accentColor: "text-purple-400"
    },
    {
      title: "Shahajjo",
      description: "A real-time help app built to connect people in need with volunteers or local helpers. Features live tracking, location-based requests, and a robust backend for scalability.",
      image: "https://lafayette.in.gov/ImageRepository/Document?documentId=15538",
      tags: ["React Native", "Firebase", "Google Maps API"],
      github: "https://github.com/hasin023/shahajjo",
      demo: "#",
      gradient: "from-emerald-600/40 to-teal-900/80",
      accentColor: "text-emerald-400"
    }
  ];

  // Card styling with responsive adjustments
  const cardStyle = {
    height: '65vh',
    maxHeight: '650px',
    borderRadius: '24px',
    transition: 'transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1), box-shadow 0.3s ease',
    willChange: 'transform, opacity, box-shadow',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
  };

  // Handle mouse move for 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 50;
    const rotateY = (centerX - x) / 50;
    card.style.setProperty('--rotateX', `${rotateX}deg`);
    card.style.setProperty('--rotateY', `${rotateY}deg`);
  };

  // Reset tilt on mouse leave
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty('--rotateX', '0deg');
    card.style.setProperty('--rotateY', '0deg');
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Debounced scroll handler
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      if (!ticking.current) {
        lastScrollY.current = window.scrollY;

        window.requestAnimationFrame(() => {
          if (!sectionRef.current) return;

          const sectionRect = sectionRef.current.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const totalScrollDistance = viewportHeight * 2;

          let progress = 0;
          if (sectionRect.top <= 0) {
            progress = Math.min(1, Math.max(0, Math.abs(sectionRect.top) / totalScrollDistance));
          }

          if (progress >= 0.66) {
            setActiveCardIndex(2);
          } else if (progress >= 0.33) {
            setActiveCardIndex(1);
          } else {
            setActiveCardIndex(0);
          }

          ticking.current = false;
        });

        ticking.current = true;
      }
    };

    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 16); // Debounce to ~60fps
    }, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const isFirstCardVisible = isIntersecting;
  const isSecondCardVisible = activeCardIndex >= 1;
  const isThirdCardVisible = activeCardIndex >= 2;

  return (
    <div ref={sectionRef} className="relative" style={{ height: '300vh' }}>
      <section
        className="w-full h-screen py-10 md:py-16 sticky top-0 overflow-hidden bg-gradient-to-br from-slate-900 via-black to-slate-900"
        id="projects"
      >
        {/* Enhanced animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="container px-6 lg:px-8 mx-auto h-full flex flex-col relative z-10">
          <div className="mb-2 md:mb-3">
            <div className="flex items-center gap-4 mb-2 md:mb-2 pt-8 sm:pt-6 md:pt-4">
             
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-1 md:mb-2 text-white tracking-tight">
              Featured <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">Projects</span>
            </h2>
          </div>

          <div ref={cardsContainerRef} className="relative flex-1 perspective-1000">
            {projects.map((project, index) => {
              const isVisible = index === 0 ? isFirstCardVisible : index === 1 ? isSecondCardVisible : isThirdCardVisible;
              const translateY = index === 0 ? (isVisible ? 90 : 200) : index === 1 ? (isVisible ? activeCardIndex === 1 ? 55 : 45 : 200) : (isVisible ? activeCardIndex === 2 ? 15 : 0 : 200);
              const scale = index === 0 ? 0.9 : index === 1 ? 0.95 : 1;
              const zIndex = 10 + index * 10;

              return (
                <div
                  key={project.title}
                  className={`absolute inset-0 overflow-hidden shadow-2xl card-tilt ${isVisible ? 'animate-card-enter' : ''} ${activeCardIndex === index ? 'animate-scale' : ''}`}
                  style={{
                    ...cardStyle,
                    zIndex,
                    transform: `translateY(${translateY}px) scale(${scale})`,
                    opacity: isVisible ? 1 : 0,
                    pointerEvents: isVisible ? 'auto' : 'none',
                  }}
                  onMouseMove={(e) => handleMouseMove(e, index)}
                  onMouseLeave={handleMouseLeave}
                  role="region"
                  aria-label={`Project card: ${project.title}`}
                >
                  <div
                    className={`absolute inset-0 z-0 bg-gradient-to-b ${project.gradient}`}
                    style={{
                      backgroundImage: `url('${project.image}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundBlendMode: 'overlay',
                      animation: 'gradientShift 15s ease infinite',
                    }}
                  ></div>

                  <div className="absolute top-4 right-4 z-20 flex gap-3">
                    <div className="inline-flex items-center justify-center px-4 py-2 rounded-full glassmorphism text-white">
                      <span className="text-sm font-medium">Project 0{index + 1}</span>
                    </div>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full glassmorphism hover:bg-white/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <Github size={18} className="text-white" />
                      </a>
                    )}
                    {project.demo && project.demo !== '#' && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full glassmorphism hover:bg-white/30 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                        aria-label={`View ${project.title} demo`}
                      >
                        <ExternalLink size={18} className="text-white" />
                      </a>
                    )}
                  </div>

                  <div className="relative z-10 p-5 sm:p-6 md:p-8 h-full flex flex-col justify-end">
                    <div className="max-w-2xl">
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold glassmorphism text-white leading-tight mb-4 tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-gray-200 glassmorphism text-base sm:text-lg mb-6 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-sm px-3 py-1 rounded-full glassmorphism text-white font-mono"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <a
                        href={project.github || project.demo || '#'}
                        className={`inline-flex items-center gap-3 text-lg font-semibold ${project.accentColor} hover:bg-gradient-to-r hover:from-${project.accentColor.split('-')[1]}-400 hover:to-${project.accentColor.split('-')[1]}-600 hover:bg-clip-text hover:text-transparent transition-all duration-300 self-start group hover:gap-4`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Explore ${project.title} project`}
                      >
                        <Code size={20} className="group-hover:rotate-12 transition-transform duration-300" />
                        <span>Explore Project</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Enhanced Progress Indicators with Tooltips */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-40">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full border-2 transition-all duration-300 tooltip ${
                  activeCardIndex === index
                    ? `bg-${project.accentColor.split('-')[1]}-400 border-${project.accentColor.split('-')[1]}-400 shadow-lg shadow-${project.accentColor.split('-')[1]}-400/50 scale-125`
                    : 'border-gray-400 bg-transparent'
                }`}
                data-tooltip={project.title}
                role="button"
                aria-label={`Go to ${project.title}`}
                onClick={() => setActiveCardIndex(index)}
              ></div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;