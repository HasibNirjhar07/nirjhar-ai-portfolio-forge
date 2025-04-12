
import { useEffect, useRef } from 'react';
import { ArrowDown, Cpu, Brain, Code } from 'lucide-react';

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0');
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
    <section id="hero" className="min-h-screen flex items-center relative neural-network">
      <div className="section-container">
        <div ref={sectionRef} className="opacity-0 transition-opacity duration-1000">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 animate-fade-in">
                <Cpu size={18} className="text-ml-accent" />
                <span className="text-white/80">Machine Learning Enthusiast</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Hi, I'm <span className="text-gradient">Hasibul Islam Nirjhar</span>
              </h1>
              
              <p className="text-xl text-white/80 leading-relaxed">
                A passionate <span className="text-ml-primary font-semibold">Software Engineering</span> student exploring the frontiers of AI, Machine Learning, and Web Development.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href="#projects" className="btn-primary flex items-center space-x-2">
                  <Code size={18} />
                  <span>View Projects</span>
                </a>
                <a href="#contact" className="btn-outline flex items-center space-x-2">
                  <span>Contact Me</span>
                </a>
              </div>
              
              <div className="pt-8 flex items-center space-x-6">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-500 text-white font-bold">R</div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-500 text-white font-bold">T</div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-yellow-500 text-white font-bold">P</div>
                </div>
                <p className="text-white/60 text-sm">Trusted by fellow developers worldwide</p>
              </div>
            </div>
            
            <div className="relative animate-fade-in animation-delay-300">
              <div className="relative z-10 p-4 md:p-8 glass-effect rounded-2xl overflow-hidden">
                <div className="coding-animation text-left p-4 bg-ml-dark/80 rounded-lg overflow-hidden border border-white/10">
                  <div className="flex space-x-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  
                  <pre className="text-sm font-mono text-green-400 leading-relaxed">
                    <code>
                      <span className="text-blue-400">const</span> <span className="text-ml-primary">hasibul</span> = {'{\n'}
                      <span className="pl-4 text-pink-400">name</span>: <span className="text-green-300">"Hasibul Islam Nirjhar"</span>,{'\n'}
                      <span className="pl-4 text-pink-400">location</span>: <span className="text-green-300">"Bangladesh"</span>,{'\n'}
                      <span className="pl-4 text-pink-400">education</span>: {'{\n'}
                      <span className="pl-8 text-pink-400">university</span>: <span className="text-green-300">"Islamic University of Technology"</span>,{'\n'}
                      <span className="pl-8 text-pink-400">major</span>: <span className="text-green-300">"Software Engineering"</span>{'\n'}
                      <span className="pl-4">}</span>,{'\n'}
                      <span className="pl-4 text-pink-400">interests</span>: [<span className="text-green-300">"Software Development", "AI/ML"</span>],{'\n'}
                      <span className="pl-4 text-blue-400">debugWith</span>: <span className="text-yellow-300">(bugs) =></span> <span className="text-green-300">"☕ + 🍕"</span>{'\n'}
                      };
                    </code>
                  </pre>
                </div>
                
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-ml-primary/20 -z-10"></div>
              </div>
              
              <div className="absolute -top-5 -right-5 w-24 h-24 bg-ml-primary/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-ml-accent/20 rounded-full blur-xl"></div>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <a href="#about" className="flex flex-col items-center justify-center text-white/60 hover:text-white transition-colors">
              <span className="mb-2 text-sm">Scroll Down</span>
              <ArrowDown size={20} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
