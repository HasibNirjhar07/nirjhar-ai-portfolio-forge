
import { useEffect, useRef } from 'react';
import { Briefcase, GraduationCap, MapPin, Coffee, Pizza } from 'lucide-react';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
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
    <section id="about" className="py-20">
      <div className="section-container">
        <div 
          ref={sectionRef}
          className="opacity-0 translate-y-10 transition-all duration-700"
        >
          <h2 className="heading text-center">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="subheading text-center max-w-2xl mx-auto">
            Passionate about creating solutions through code and exploring the frontiers of AI and machine learning
          </p>
          
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="glass-effect p-8 rounded-2xl">
              <h3 className="text-2xl font-semibold mb-6 text-white">My Journey</h3>
              <div className="space-y-8">
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-ml-primary/20 flex items-center justify-center">
                      <GraduationCap className="text-ml-primary" size={24} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white">Education</h4>
                    <p className="text-white/70 mt-1">Islamic University of Technology</p>
                    <p className="text-white/70">Software Engineering, 3rd Year</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-ml-primary/20 flex items-center justify-center">
                      <Briefcase className="text-ml-primary" size={24} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white">Current Focus</h4>
                    <p className="text-white/70 mt-1">Exploring Machine Learning</p>
                    <p className="text-white/70">Building web applications</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-ml-primary/20 flex items-center justify-center">
                      <MapPin className="text-ml-primary" size={24} />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white">Location</h4>
                    <p className="text-white/70 mt-1">Bangladesh</p>
                    <p className="text-white/70">Open to remote opportunities</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col space-y-8">
              <div className="glass-effect p-8 rounded-2xl h-full">
                <h3 className="text-2xl font-semibold mb-4 text-white">What I Do</h3>
                <p className="text-white/70 mb-6">
                  I'm passionate about exploring the intersection of software development 
                  and artificial intelligence to build meaningful applications that solve real-world problems.
                </p>
                <ul className="space-y-3 text-white/70">
                  <li className="flex items-center">
                    <span className="mr-2 text-ml-accent">▹</span>
                    Develop web applications with modern technologies
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-ml-accent">▹</span>
                    Explore machine learning algorithms and applications
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-ml-accent">▹</span>
                    Solve complex problems with efficient solutions
                  </li>
                  <li className="flex items-center">
                    <span className="mr-2 text-ml-accent">▹</span>
                    Continuously learning and expanding my skill set
                  </li>
                </ul>
              </div>
              
              <div className="glass-effect p-8 rounded-2xl flex items-center">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold mb-2 text-white">Fun Fact</h3>
                  <p className="text-white/70">
                    I debug with coffee and solve bugs with pizza!
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Coffee size={24} className="text-amber-500" />
                  <span className="text-white">+</span>
                  <Pizza size={24} className="text-red-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
