import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, ArrowRight, Code } from 'lucide-react';

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
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-40% 0px -40% 0px", // Active when element is in the middle 20% of screen
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = projectRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index !== -1) {
            setActiveCardIndex(index);
          }
        }
      });
    }, options);

    projectRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      projectRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <div className="bg-slate-950 relative" id="projects">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-slate-900 to-transparent z-10" />
         <div className="sticky top-0 h-screen overflow-hidden">
            <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] transition-opacity duration-700 ${activeCardIndex === 0 ? 'opacity-100' : 'opacity-0'}`} />
            <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] transition-opacity duration-700 ${activeCardIndex === 1 ? 'opacity-100' : 'opacity-0'}`} />
            <div className={`absolute top-1/2 left-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] transition-opacity duration-700 ${activeCardIndex === 2 ? 'opacity-100' : 'opacity-0'}`} />
         </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-20 py-20">
        <div className="mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white tracking-tight">
              Featured <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl">
              Here are some of the projects I've worked on. Each one was a unique challenge that pushed my skills further.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
          
          {/* Left Column: Scrollable Content */}
          <div className="space-y-32 py-10">
            {projects.map((project, index) => (
              <div 
                key={project.title}
                ref={(el) => (projectRefs.current[index] = el)}
                className={`transition-all duration-500 ${activeCardIndex === index ? 'opacity-100 translate-x-0' : 'opacity-30 translate-x-4 lg:opacity-50 lg:translate-x-0'}`}
              >
                  <div className="flex items-center gap-4 mb-4">
                     <span className={`text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent`}>
                        0{index + 1}
                     </span>
                     <div className={`h-px flex-1 bg-gradient-to-r ${project.gradient}`} />
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    {project.title}
                  </h3>
                  
                  <p className="text-lg text-slate-300 leading-relaxed mb-8">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-8">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm font-medium backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-6">
                    {project.github && (
                       <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors group"
                       >
                         <Github size={20} />
                         <span className="font-medium relative">
                           Source Code
                           <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full" />
                         </span>
                       </a>
                    )}
                    {project.demo && project.demo !== '#' && (
                       <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white hover:text-cyan-400 transition-colors group"
                       >
                         <ExternalLink size={20} />
                         <span className="font-medium relative">
                           Live Demo
                           <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full" />
                         </span>
                       </a>
                    )}
                  </div>
                  
                  {/* Mobile Only Image (shown inline) */}
                  <div className="lg:hidden mt-8 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                     <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-auto object-cover" 
                     />
                  </div>
              </div>
            ))}
            {/* Extra space at bottom to allow last item to scroll up */}
            <div className="h-[20vh]" />
          </div>

          {/* Right Column: Sticky Image */}
          <div className="hidden lg:block relative">
             <div className="sticky top-32 h-[600px] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-slate-900/50 backdrop-blur-sm">
                {projects.map((project, index) => (
                   <div
                      key={project.title}
                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                         activeCardIndex === index 
                           ? 'opacity-100 scale-100 z-10' 
                           : 'opacity-0 scale-105 z-0'
                      }`}
                   >
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                      />
                      {/* Gradient Overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} mix-blend-multiply opacity-60`} />
                      
                      {/* Floating Badge */}
                      <div className="absolute top-6 right-6 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 text-white font-mono text-sm">
                         {project.tags[0]}
                      </div>
                   </div>
                ))}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Projects;