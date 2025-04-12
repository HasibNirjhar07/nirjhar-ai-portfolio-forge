
import { useEffect, useRef } from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

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
              card.classList.add('opacity-100');
              card.classList.remove('opacity-0', 'translate-y-10');
            }, 200 * index);
          });
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

  return (
    <section id="projects" className="py-20">
      <div className="section-container">
        <div
          ref={sectionRef}
          className="opacity-0 translate-y-10 transition-all duration-700"
        >
          <h2 className="heading text-center">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="subheading text-center max-w-2xl mx-auto">
            Some of my recent work combining software development and machine learning
          </p>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.title}
                className="project-card glass-effect rounded-xl overflow-hidden opacity-0 translate-y-10 transition-all duration-700"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                    <div className="flex space-x-2">
                      {project.github && (
                        <a 
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-black/40 hover:bg-ml-primary/80 flex items-center justify-center transition-colors"
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
                          className="w-8 h-8 rounded-full bg-black/40 hover:bg-ml-primary/80 flex items-center justify-center transition-colors"
                          aria-label="Live Demo"
                        >
                          <ExternalLink size={16} className="text-white" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-white/80 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-full bg-ml-primary/20 text-ml-primary">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a 
                    href={project.demo || project.github || '#'} 
                    className="flex items-center text-ml-accent hover:text-ml-primary transition-colors"
                  >
                    <span>View Project</span>
                    <ArrowRight size={16} className="ml-2" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <a href="#" className="btn-outline">
              View All Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
