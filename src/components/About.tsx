import { useEffect, useRef, useState } from 'react';
import { Briefcase, GraduationCap, MapPin, Coffee, Pizza, Code } from 'lucide-react';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Passionate about creating solutions through code and exploring the frontiers of AI and machine learning';

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const typingSpeed = 50;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, typingSpeed);

    return () => clearInterval(timer);
  }, []);

  // Intersection Observer for staggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const elements = sectionRef.current?.querySelectorAll('.animate-item');
          elements?.forEach((el, idx) => {
            setTimeout(() => {
              el.classList.add('opacity-100', 'translate-y-0');
              el.classList.remove('opacity-0', 'translate-y-10');
            }, idx * 150); // Staggered delay
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
    <section id="about" className="py-24 bg-gradient-to-b from-ml-dark/90 to-ml-dark relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-ml-primary/10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-ml-accent/10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-purple-500/10 blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 z-0"></div>

      <div className="section-container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={sectionRef}>
          <div className="text-center mb-16">
            <h2 className="heading animate-item opacity-0 translate-y-10 transition-all duration-700 ease-out text-4xl md:text-5xl font-bold tracking-tight">
              About <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-ml-primary to-ml-accent">Me</span>
            </h2>
            <div className="max-w-2xl mx-auto mt-6 relative">
              <div className="h-0.5 w-16 bg-gradient-to-r from-ml-primary to-ml-accent mx-auto mb-6 animate-item opacity-0 translate-y-10 transition-all duration-700 ease-out"></div>
              <p className="subheading text-white/80 animate-item opacity-0 translate-y-10 transition-all duration-700 ease-out">
                {typedText}
                <span className="animate-blink">|</span>
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Journey Section */}
            <div className="lg:col-span-3">
              <div className="glass-effect p-8 rounded-3xl backdrop-blur-xl bg-ml-dark/30 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.3)] transition-all duration-500 ease-out animate-item opacity-0 translate-y-10 hover:border-ml-primary/30 group">
                <h3 className="text-3xl font-bold mb-8 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-ml-primary to-ml-accent flex items-center">
                  <span className="inline-block w-2 h-8 bg-ml-primary rounded mr-3 group-hover:h-10 transition-all duration-300"></span>
                  My Journey
                </h3>
                <div className="space-y-10">
                  {[
                    {
                      icon: <GraduationCap size={28} className="text-ml-primary" />,
                      title: 'Education',
                      details: ['Islamic University of Technology', 'Software Engineering, 3rd Year'],
                      image: '/uni.jpg'
                    },
                    {
                      icon: <Briefcase size={28} className="text-ml-primary" />,
                      title: 'Current Focus',
                      details: ['Exploring Machine Learning', 'Building web applications'],
                      image: '/api/placeholder/120/120'
                    },
                    {
                      icon: <MapPin size={28} className="text-ml-primary" />,
                      title: 'Location',
                      details: ['Bangladesh', 'Open to remote opportunities'],
                      image: '/api/placeholder/120/120'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="flex group/item">
                      <div className="flex-shrink-0 mr-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-ml-dark/80 to-ml-dark flex items-center justify-center transform group-hover/item:scale-110 transition-transform duration-300 shadow-lg border border-white/5 overflow-hidden relative">
                          <div className="absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="relative z-10 group-hover/item:opacity-0 transition-opacity duration-300">
                            {item.icon}
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white group-hover/item:text-ml-accent transition-colors duration-300">{item.title}</h4>
                        {item.details.map((detail, i) => (
                          <p key={i} className="text-white/70 mt-1 group-hover/item:text-white/90 transition-colors duration-300">{detail}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* What I Do & Fun Fact */}
            <div className="lg:col-span-2 flex flex-col space-y-8">
              <div className="glass-effect p-8 rounded-3xl backdrop-blur-xl bg-ml-dark/30 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.3)] transition-all duration-500 ease-out animate-item opacity-0 translate-y-10 flex-1 hover:border-ml-accent/30 group">
                <h3 className="text-3xl font-bold mb-6 text-gradient bg-clip-text text-transparent bg-gradient-to-r from-ml-primary to-ml-accent flex items-center">
                  <span className="inline-block w-2 h-8 bg-ml-accent rounded mr-3 group-hover:h-10 transition-all duration-300"></span>
                  What I Do
                </h3>
                <p className="text-white/70 mb-6 leading-relaxed">
                  I craft innovative solutions at the crossroads of software development and AI, building applications that make a difference.
                </p>
                <ul className="space-y-4">
                  {[
                    'Develop web applications with cutting-edge tech',
                    'Dive deep into machine learning algorithms',
                    'Tackle complex challenges with elegant solutions',
                    'Always learning, always growing'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center group/list">
                      <div className="mr-3 relative flex items-center">
                        <span className="absolute w-6 h-6 bg-ml-accent/10 rounded-full transform group-hover/list:scale-125 transition-transform duration-300"></span>
                        <span className="relative text-ml-accent font-bold text-lg">▹</span>
                      </div>
                      <span className="text-white/80 group-hover/list:text-white transition-colors duration-300">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <img src="/api/placeholder/300/150" alt="What I Do" className="w-full h-auto rounded-lg object-cover" />
                </div>
              </div>
              
              <div className="glass-effect p-6 rounded-3xl backdrop-blur-xl bg-ml-dark/30 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.3)] transition-all duration-500 ease-out animate-item opacity-0 translate-y-10 hover:border-white/20 group">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold mb-2 text-white group-hover:text-ml-accent transition-colors duration-300">Fun Fact</h3>
                    <p className="text-white/70 group-hover:text-white/90 transition-colors duration-300">I debug with coffee and squash bugs with pizza!</p>
                  </div>
                  <div className="flex items-center space-x-3 relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/20 to-red-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Coffee size={30} className="text-amber-500 group-hover:animate-bounce transition-all duration-300" />
                    <span className="text-white text-xl relative z-10">+</span>
                    <Pizza size={30} className="text-red-400 group-hover:animate-[spin_3s_linear_infinite] transition-all duration-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 0.8s infinite;
        }
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </section>
  );
};

export default About;