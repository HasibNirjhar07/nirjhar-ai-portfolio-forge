
import { useEffect, useRef } from 'react';
import { Database, Terminal, Code, BarChart } from 'lucide-react';

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-10');
          
          // Animate skill bars when section comes into view
          const skillBars = entry.target.querySelectorAll('.skill-progress');
          skillBars.forEach((bar, index) => {
            setTimeout(() => {
              bar.classList.add('w-full');
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

  const languages = [
    { name: 'Python', progress: '90%' },
    { name: 'C++', progress: '85%' },
    { name: 'JavaScript', progress: '80%' },
    { name: 'C#', progress: '70%' }
  ];

  const frameworks = [
    { name: 'React', progress: '85%' },
    { name: 'NextJs', progress: '80%' },
    { name: 'TensorFlow', progress: '75%' }
  ];

  const databases = [
    { name: 'MongoDB', progress: '80%' },
    { name: 'PostgreSQL', progress: '70%' }
  ];

  const tools = [
    { name: 'Git', progress: '90%' },
    { name: 'Docker', progress: '75%' },
    { name: 'VS Code', progress: '95%' }
  ];

  const SkillCategory = ({ 
    title, 
    skills, 
    icon 
  }: { 
    title: string; 
    skills: { name: string; progress: string }[]; 
    icon: React.ReactNode 
  }) => (
    <div className="glass-effect p-6 rounded-xl">
      <div className="mb-6 flex items-center space-x-3">
        <div className="w-10 h-10 rounded-lg bg-ml-primary/20 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.name} className="space-y-1">
            <div className="flex justify-between">
              <span className="text-white/80">{skill.name}</span>
              <span className="text-ml-accent">{skill.progress}</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="skill-progress h-full bg-gradient-to-r from-ml-primary to-ml-accent rounded-full w-0 transition-all duration-1000"
                style={{ maxWidth: skill.progress }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-ml-dark to-black/40">
      <div className="section-container">
        <div
          ref={sectionRef}
          className="opacity-0 translate-y-10 transition-all duration-700"
        >
          <h2 className="heading text-center">
            My <span className="text-gradient">Tech Stack</span>
          </h2>
          <p className="subheading text-center max-w-2xl mx-auto">
            Here are the technologies I work with to bring ideas to life
          </p>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <SkillCategory
              title="Languages"
              skills={languages}
              icon={<Terminal size={24} className="text-ml-primary" />}
            />
            <SkillCategory
              title="Frameworks"
              skills={frameworks}
              icon={<Code size={24} className="text-ml-primary" />}
            />
            <SkillCategory
              title="Databases"
              skills={databases}
              icon={<Database size={24} className="text-ml-primary" />}
            />
            <SkillCategory
              title="Tools"
              skills={tools}
              icon={<BarChart size={24} className="text-ml-primary" />}
            />
          </div>
          
          <div className="mt-16">
            <div className="glass-effect p-8 rounded-2xl">
              <h3 className="text-xl font-semibold mb-6 text-center text-white">Currently Learning</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {['Machine Learning', 'Natural Language Processing', 'Computer Vision', 'Deep Learning'].map((tech) => (
                  <div 
                    key={tech}
                    className="px-4 py-2 rounded-full bg-ml-primary/20 border border-ml-primary/30 text-white"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
