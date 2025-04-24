// import { useEffect, useRef, useState } from 'react';
// import { Gamepad2, Trophy, MapPin, Zap, Pizza, Code } from 'lucide-react';

// const About = () => {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const [typedText, setTypedText] = useState('');
//   const fullText = 'Passionate about creating solutions through code and exploring the frontiers of AI and machine learning';
//   const [glitchActive, setGlitchActive] = useState(false);

//   // Typewriter effect
//   useEffect(() => {
//     let index = 0;
//     const typingSpeed = 50;
//     const timer = setInterval(() => {
//       if (index < fullText.length) {
//         setTypedText(fullText.slice(0, index + 1));
//         index++;
//       } else {
//         clearInterval(timer);
//       }
//     }, typingSpeed);

//     return () => clearInterval(timer);
//   }, []);

//   // Glitch animation trigger
//   useEffect(() => {
//     const glitchInterval = setInterval(() => {
//       setGlitchActive(true);
//       setTimeout(() => setGlitchActive(false), 200);
//     }, 5000);
    
//     return () => clearInterval(glitchInterval);
//   }, []);

//   // Intersection Observer for staggered animations
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           const elements = sectionRef.current?.querySelectorAll('.animate-item');
//           elements?.forEach((el, idx) => {
//             setTimeout(() => {
//               el.classList.add('opacity-100', 'translate-y-0');
//               el.classList.remove('opacity-0', 'translate-y-10');
//             }, idx * 150); // Staggered delay
//           });
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     return () => {
//       if (sectionRef.current) {
//         observer.unobserve(sectionRef.current);
//       }
//     };
//   }, []);

//   return (
//     <section id="about" className="py-24 relative overflow-hidden bg-ml-dark">
//       {/* Gaming background elements */}
//       <div className="absolute inset-0 z-0 overflow-hidden">
//         <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(32,40,84,0.8)_0%,rgba(4,13,33,0.9)_70%,rgba(0,0,0,1)_100%)]"></div>
        
//         {/* Digital circuit lines */}
//         <div className="absolute inset-0 opacity-20">
//           <div className="absolute top-0 left-0 w-full h-full">
//             <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
//               <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
//                 <path d="M0 50 L100 50 M50 0 L50 100" stroke="#00ff9b" strokeWidth="0.5" />
//                 <circle cx="50" cy="50" r="3" fill="#00ff9b" />
//               </pattern>
//               <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit-pattern)" />
//             </svg>
//           </div>
//         </div>
//       </div>

//       {/* Floating gaming elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none z-1">
//         <div className="absolute top-20 left-10 w-12 h-12 animate-float opacity-30">
//           ⬆️
//         </div>
//         <div className="absolute top-40 right-20 w-12 h-12 animate-float-slow opacity-30" style={{ animationDelay: '1s' }}>
//           ⬇️
//         </div>
//         <div className="absolute bottom-40 left-1/4 w-12 h-12 animate-spin-slow opacity-30">
//           🎮
//         </div>
//         <div className="absolute top-1/3 right-1/3 w-16 h-16 animate-pulse opacity-30">
//           🏆
//         </div>
//       </div>
      
//       {/* Glow effects */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
//         <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-blue-500/20 blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-green-500/20 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
//         <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-purple-500/20 blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
//       </div>

//       <div className="section-container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div ref={sectionRef}>
//           <div className="text-center mb-16">
//             <h2 className={`heading animate-item opacity-0 translate-y-10 transition-all duration-700 ease-out text-4xl md:text-5xl font-bold tracking-tight ${glitchActive ? 'glitch' : ''}`} data-text="About Me">
//               About <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Me</span>
//             </h2>
//             <div className="max-w-2xl mx-auto mt-6 relative">
//               <div className="h-1 w-24 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mb-6 animate-item opacity-0 translate-y-10 transition-all duration-700 ease-out"></div>
//               <div className="game-console-border p-4 inline-block">
//                 <p className="subheading text-green-400 animate-item opacity-0 translate-y-10 transition-all duration-700 ease-out font-mono">
//                   <span className="text-blue-400">$ </span>
//                   {typedText}
//                   <span className="animate-blink text-green-400">_</span>
//                 </p>
//               </div>
//             </div>
//           </div>
          
//           <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
//             {/* Player Stats Section */}
//             <div className="lg:col-span-3">
//               <div className="game-card p-8 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/50 border border-green-500/30 shadow-[0_0_15px_rgba(0,255,155,0.3)] transition-all duration-500 ease-out animate-item opacity-0 translate-y-10 hover:shadow-[0_0_30px_rgba(0,255,155,0.5)] group">
//                 <div className="flex items-center mb-8">
//                   <div className="w-2 h-8 bg-green-500 rounded mr-3 group-hover:h-10 transition-all duration-300"></div>
//                   <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 flex items-center">
//                     Player Stats
//                   </h3>
//                   <div className="ml-auto power-indicator flex items-center">
//                     <span className="text-xs text-green-400 mr-2 font-mono">POWER</span>
//                     <div className="h-2 w-20 bg-gray-700 rounded-full overflow-hidden">
//                       <div className="h-full w-4/5 bg-gradient-to-r from-green-400 to-blue-500 power-bar"></div>
//                     </div>
//                   </div>
//                 </div>
                
//                 <div className="space-y-10">
//                   {[
//                     {
//                       icon: <Trophy size={28} className="text-yellow-400" />,
//                       title: 'Class',
//                       details: ['Software Engineer', 'Level: 3rd Year'],
//                       image: '/api/placeholder/120/120'
//                     },
//                     {
//                       icon: <Gamepad2 size={28} className="text-green-400" />,
//                       title: 'Current Quest',
//                       details: ['Exploring Machine Learning', 'Building web applications'],
//                       image: '/api/placeholder/120/120' 
//                     },
//                     {
//                       icon: <MapPin size={28} className="text-red-400" />,
//                       title: 'Spawn Point',
//                       details: ['Bangladesh', 'Open to remote missions'],
//                       image: '/api/placeholder/120/120'
//                     }
//                   ].map((item, idx) => (
//                     <div key={idx} className="flex group/item stat-item">
//                       <div className="flex-shrink-0 mr-6">
//                         <div className="w-16 h-16 rounded bg-gray-800 flex items-center justify-center transform group-hover/item:scale-110 transition-transform duration-300 shadow-lg border border-green-500/20 overflow-hidden relative hexagon">
//                           <div className="absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
//                             <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
//                           </div>
//                           <div className="relative z-10 group-hover/item:text-green-400 transition-all duration-300">
//                             {item.icon}
//                           </div>
//                         </div>
//                       </div>
//                       <div>
//                         <h4 className="text-xl font-semibold text-white group-hover/item:text-green-400 transition-colors duration-300 flex items-center">
//                           <span className="icon-pulse mr-2">⚡</span>
//                           {item.title}
//                         </h4>
//                         {item.details.map((detail, i) => (
//                           <p key={i} className="text-gray-400 mt-1 group-hover/item:text-gray-200 transition-colors duration-300 font-mono text-sm">
//                             <span className="text-green-500">></span> {detail}
//                           </p>
//                         ))}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
            
//             {/* Skills & Power-ups */}
//             <div className="lg:col-span-2 flex flex-col space-y-8">
//               <div className="game-card p-8 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/50 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all duration-500 ease-out animate-item opacity-0 translate-y-10 flex-1 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] group">
//                 <div className="flex items-center mb-6">
//                   <div className="w-2 h-8 bg-blue-500 rounded mr-3 group-hover:h-10 transition-all duration-300"></div>
//                   <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center">
//                     Skill Tree
//                   </h3>
//                 </div>
//                 <p className="text-gray-400 mb-6 leading-relaxed font-mono text-sm">
//                   [Character Description]: I craft innovative solutions at the crossroads of software development and AI, building applications that make a difference.
//                 </p>
//                 <ul className="space-y-4">
//                   {[
//                     'Develop web applications with cutting-edge tech',
//                     'Dive deep into machine learning algorithms',
//                     'Tackle complex challenges with elegant solutions',
//                     'Always learning, always growing'
//                   ].map((item, idx) => (
//                     <li key={idx} className="flex items-center group/list skill-item">
//                       <div className="mr-3 relative flex items-center">
//                         <span className="absolute w-6 h-6 bg-blue-500/20 rounded-full transform group-hover/list:scale-125 transition-transform duration-300"></span>
//                         <Zap size={14} className="relative text-blue-400" />
//                       </div>
//                       <span className="text-gray-300 group-hover/list:text-blue-300 transition-colors duration-300">{item}</span>
//                     </li>
//                   ))}
//                 </ul>
//                 <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
//                   <div className="w-full h-32 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-1 flex items-center justify-center skill-map">
//                     <svg width="100%" height="100%" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
//                       <circle cx="50" cy="50" r="10" fill="#3B82F6" />
//                       <circle cx="150" cy="30" r="10" fill="#8B5CF6" />
//                       <circle cx="250" cy="50" r="10" fill="#10B981" />
//                       <circle cx="100" cy="80" r="10" fill="#EC4899" />
//                       <circle cx="200" cy="70" r="10" fill="#F59E0B" />
//                       <line x1="50" y1="50" x2="150" y2="30" stroke="#3B82F6" strokeWidth="2" />
//                       <line x1="150" y1="30" x2="250" y2="50" stroke="#8B5CF6" strokeWidth="2" />
//                       <line x1="150" y1="30" x2="100" y2="80" stroke="#8B5CF6" strokeWidth="2" />
//                       <line x1="100" y1="80" x2="200" y2="70" stroke="#EC4899" strokeWidth="2" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="game-card p-6 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/50 border border-purple-500/30 shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-500 ease-out animate-item opacity-0 translate-y-10 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] group">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h3 className="text-2xl font-semibold mb-2 text-white group-hover:text-purple-400 transition-colors duration-300">
//                       <span className="pixel-font">POWER UP</span>
//                     </h3>
//                     <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 font-mono text-sm">
//                       I debug with coffee and squash bugs with pizza!
//                     </p>
//                   </div>
//                   <div className="flex items-center space-x-3 relative">
//                     <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500/20 to-red-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                     <div className="power-up-icon">
//                       <Pizza size={30} className="text-red-400 group-hover:animate-bounce transition-all duration-300" />
//                     </div>
//                     <span className="text-white text-xl relative z-10">+</span>
//                     <div className="power-up-icon">
//                       <Code size={30} className="text-yellow-400 group-hover:animate-spin transition-all duration-300" />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       <style jsx>{`
//         @keyframes blink {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0; }
//         }
//         .animate-blink {
//           animation: blink 0.8s infinite;
//         }
//         @keyframes float {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-20px); }
//         }
//         .animate-float {
//           animation: float 4s ease-in-out infinite;
//         }
//         .animate-float-slow {
//           animation: float 6s ease-in-out infinite;
//         }
//         .animate-spin-slow {
//           animation: spin 8s linear infinite;
//         }
//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//         .skill-map circle {
//           animation: pulse 3s infinite alternate;
//           filter: drop-shadow(0 0 5px currentColor);
//         }
//         .skill-map line {
//           animation: linePulse 4s infinite alternate;
//           stroke-dasharray: 10;
//           stroke-dashoffset: 20;
//         }
//         @keyframes pulse {
//           0% { opacity: 0.7; r: 8; }
//           100% { opacity: 1; r: 12; }
//         }
//         @keyframes linePulse {
//           0% { stroke-dashoffset: 40; opacity: 0.5; }
//           100% { stroke-dashoffset: 0; opacity: 1; }
//         }
//         .power-bar {
//           animation: powerPulse 2s infinite alternate;
//         }
//         @keyframes powerPulse {
//           0% { width: 75%; }
//           100% { width: 85%; }
//         }
//         .icon-pulse {
//           animation: iconPulse 1.5s infinite alternate;
//         }
//         @keyframes iconPulse {
//           0% { opacity: 0.7; transform: scale(0.9); }
//           100% { opacity: 1; transform: scale(1.1); }
//         }
//         .game-console-border {
//           border: 2px solid #0f0;
//           border-radius: 4px;
//           box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
//           position: relative;
//         }
//         .game-console-border::before {
//           content: "";
//           position: absolute;
//           top: -2px;
//           left: -2px;
//           right: -2px;
//           bottom: -2px;
//           border: 1px solid #0f0;
//           border-radius: 6px;
//           animation: borderPulse 2s infinite alternate;
//           pointer-events: none;
//         }
//         @keyframes borderPulse {
//           0% { box-shadow: 0 0 5px rgba(0, 255, 0, 0.5); }
//           100% { box-shadow: 0 0 15px rgba(0, 255, 0, 0.8); }
//         }
//         .game-card {
//           position: relative;
//           overflow: hidden;
//         }
//         .game-card::before {
//           content: "";
//           position: absolute;
//           top: 0;
//           left: 0;
//           right: 0;
//           height: 2px;
//           background: linear-gradient(90deg, transparent, currentColor, transparent);
//           animation: scanline 3s linear infinite;
//         }
//         @keyframes scanline {
//           0% { transform: translateY(-100%); opacity: 0; }
//           50% { opacity: 0.5; }
//           100% { transform: translateY(1000%); opacity: 0; }
//         }
//         .power-up-icon {
//           position: relative;
//         }
//         .power-up-icon::after {
//           content: "";
//           position: absolute;
//           inset: -5px;
//           border-radius: 50%;
//           background: radial-gradient(circle, currentColor 0%, transparent 70%);
//           opacity: 0;
//           transition: opacity 0.3s;
//         }
//         .group:hover .power-up-icon::after {
//           opacity: 0.5;
//           animation: iconGlow 2s infinite alternate;
//         }
//         @keyframes iconGlow {
//           0% { opacity: 0.2; transform: scale(0.8); }
//           100% { opacity: 0.6; transform: scale(1.2); }
//         }
//         .pixel-font {
//           font-family: 'Courier New', monospace;
//           text-transform: uppercase;
//           letter-spacing: 1px;
//           position: relative;
//         }
//         .pixel-font::after {
//           content: "POWER UP";
//           position: absolute;
//           left: 0;
//           top: 0;
//           color: #ff00ff;
//           opacity: 0.5;
//           filter: blur(2px);
//           animation: glitchText 3s infinite alternate;
//         }
//         @keyframes glitchText {
//           0%, 100% { transform: translate(0); }
//           20% { transform: translate(-1px, 1px); }
//           40% { transform: translate(1px, -1px); }
//           60% { transform: translate(-1px, -1px); }
//           80% { transform: translate(1px, 1px); }
//         }
//         .hexagon {
//           clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
//         }
//         .glitch {
//           position: relative;
//           animation: glitch 0.5s infinite;
//         }
//         .glitch::before,
//         .glitch::after {
//           content: attr(data-text);
//           position: absolute;
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//         }
//         .glitch::before {
//           left: 2px;
//           text-shadow: -2px 0 #ff00ff;
//           clip: rect(24px, 550px, 90px, 0);
//           animation: glitch-anim 2s infinite linear alternate-reverse;
//         }
//         .glitch::after {
//           left: -2px;
//           text-shadow: -2px 0 #00ffff;
//           clip: rect(85px, 550px, 140px, 0);
//           animation: glitch-anim2 2s infinite linear alternate-reverse;
//         }
//         @keyframes glitch {
//           0% { transform: translate(0); }
//           20% { transform: translate(-2px, 2px); }
//           40% { transform: translate(2px, -2px); }
//           60% { transform: translate(-2px, -2px); }
//           80% { transform: translate(2px, 2px); }
//           100% { transform: translate(0); }
//         }
//         @keyframes glitch-anim {
//           0% { clip: rect(60px, 9999px, 76px, 0); }
//           10% { clip: rect(86px, 9999px, 146px, 0); }
//           20% { clip: rect(141px, 9999px, 11px, 0); }
//           30% { clip: rect(134px, 9999px, 4px, 0); }
//           40% { clip: rect(146px, 9999px, 137px, 0); }
//           50% { clip: rect(9px, 9999px, 32px, 0); }
//           60% { clip: rect(71px, 9999px, 68px, 0); }
//           70% { clip: rect(110px, 9999px, 15px, 0); }
//           80% { clip: rect(103px, 9999px, 50px, 0); }
//           90% { clip: rect(11px, 9999px, 142px, 0); }
//           100% { clip: rect(40px, 9999px, 5px, 0); }
//         }
//         @keyframes glitch-anim2 {
//           0% { clip: rect(96px, 9999px, 3px, 0); }
//           10% { clip: rect(77px, 9999px, 108px, 0); }
//           20% { clip: rect(95px, 9999px, 83px, 0); }
//           30% { clip: rect(54px, 9999px, 118px, 0); }
//           40% { clip: rect(31px, 9999px, 59px, 0); }
//           50% { clip: rect(81px, 9999px, 3px, 0); }
//           60% { clip: rect(119px, 9999px, 25px, 0); }
//           70% { clip: rect(146px, 9999px, 98px, 0); }
//           80% { clip: rect(62px, 9999px, 31px, 0); }
//           90% { clip: rect(24px, 9999px, 8px, 0); }
//           100% { clip: rect(24px, 9999px, 140px, 0); }
//         }
//       `}</style>
//     </section>
//   );
// };

// export default About;









import { useEffect, useRef, useState } from 'react';
import { 
  Gamepad2, Trophy, Target, Zap, Code, Brain, 
  Star, ShieldCheck, Flame, GitBranch, 
  MapPin, Pizza, Lock
} from 'lucide-react';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [typedText, setTypedText] = useState('');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('stats');
  const [glitchActive, setGlitchActive] = useState(false);
  
  const fullText = 'Passionate about creating solutions through code and exploring the frontiers of AI and machine learning';

// In your About component
useEffect(() => {
  const loadingInterval = setInterval(() => {
    setLoadingProgress(prev => {
      const newProgress = prev + 2;
      if (newProgress >= 100) {
        clearInterval(loadingInterval);
        setTimeout(() => setIsLoaded(true), 500);
        return 100;
      }
      return newProgress;
    });
  }, 100);
  
  // Add this safety timeout to ensure loading completes
  const safetyTimeout = setTimeout(() => {
    clearInterval(loadingInterval);
    setLoadingProgress(100);
    setIsLoaded(true);
  }, 5000); // Force loading to complete after 5 seconds
  
  return () => {
    clearInterval(loadingInterval);
    clearTimeout(safetyTimeout);
  };
}, []);

  // Typewriter effect
  useEffect(() => {
    if (!isLoaded) return;
    
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
  }, [isLoaded]);

  // Glitch animation trigger
  useEffect(() => {
    if (!isLoaded) return;
    
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 5000);
    
    return () => clearInterval(glitchInterval);
  }, [isLoaded]);

  // Intersection Observer for staggered animations
  useEffect(() => {
    if (!isLoaded) return;
    
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
  }, [isLoaded]);

  // Audio effect function
  const playButtonSound = () => {
    if (typeof window !== 'undefined') {
      try {
        const audio = new Audio('/button-click.mp3');
        audio.volume = 0.2;
        audio.play();
      } catch (e) {
        console.log('Audio play failed:', e);
      }
    }
  };

  const skills = [
    { name: 'Web Development', level: 85, icon: <Code size={18} /> },
    { name: 'Machine Learning', level: 75, icon: <Brain size={18} /> },
    { name: 'Problem Solving', level: 90, icon: <Target size={18} /> },
    { name: 'UI/UX Design', level: 70, icon: <Flame size={18} /> },
    { name: 'DevOps', level: 65, icon: <GitBranch size={18} /> }
  ];

  const achievements = [
    { icon: <Trophy size={20} className="text-yellow-400" />, name: 'Open Source Contributor', desc: 'Contributed to 5+ open source projects' },
    { icon: <Star size={20} className="text-blue-400" />, name: 'Fast Learner', desc: 'Mastered 3 new frameworks in 6 months' },
    { icon: <ShieldCheck size={20} className="text-green-400" />, name: 'Bug Slayer', desc: 'Eliminated 100+ critical bugs' }
  ];

 // Loading screen
if (!isLoaded) {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50 overflow-hidden">
      {/* Background matrix effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="matrix-bg"></div>
        <div className="grid-overlay"></div>
      </div>
      
      {/* Scanner line effect */}
      <div className="absolute inset-0 scanner-line"></div>
      <div className="absolute inset-0 scanner-line-secondary"></div>
      
      <div className="text-4xl font-bold mb-8 text-green-500 glitch-text" data-text="LOADING CHARACTER...">LOADING CHARACTER...</div>
      
      {/* Digital noise overlay */}
      <div className="absolute inset-0 digital-noise opacity-10"></div>
      
      <div className="w-64 h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700 relative">
        <div 
          className="h-full bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 rounded-full transition-all duration-300 pulse-glow"
          style={{ width: `${loadingProgress}%` }}
        >
          <div className="absolute inset-0 glow-overlay"></div>
        </div>
        {/* Progress bar scanline */}
        <div className="absolute inset-0 scanline"></div>
        
        {/* Notches on progress bar */}
        <div className="absolute inset-0 flex justify-between px-1">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-px h-full bg-gray-600 opacity-50"></div>
          ))}
        </div>
      </div>
      
      <div className="mt-2 text-green-400 font-mono flicker-text tracking-widest">{loadingProgress}%</div>
      
      <div className="mt-8 max-w-md text-center">
        <p className="text-gray-500 font-mono text-sm typing-animation">
          Loading character data...
          <br/>Initializing skill matrix...
          <br/>Calibrating achievements...
          <br/>Syncing neural interface...
          <br/>Compiling biometric data...
        </p>
        
        {/* Data streams */}
        <div className="mt-6 grid grid-cols-3 gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="data-stream-container">
              <div className="data-stream" style={{ animationDelay: `${i * 0.3}s` }}></div>
              <div className="text-xs text-cyan-500 opacity-70 absolute bottom-1 left-1 font-mono">
                {i === 0 ? "NEURAL" : i === 1 ? "SYSTEMS" : "NETWORK"}
              </div>
              <div className="blink-led"></div>
            </div>
          ))}
        </div>
        
        {/* Terminal messages */}
        <div className="mt-6 text-left font-mono text-xs text-green-600 bg-black bg-opacity-50 p-2 border border-green-900 terminal-text">
          <div>> Initializing character parameters</div>
          <div>> Syncing databases</div>
          <div>> Connecting to server node #42A7</div>
          <div className="cursor-blink">> _</div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 text-xs text-green-500 font-mono opacity-60">
        SYSTEM v2.077
      </div>
      <div className="absolute bottom-4 left-4 text-xs text-green-500 font-mono opacity-60">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 pulse-slow"></div>
          CONNECTION SECURE
        </div>
      </div>
      
      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
        
        @keyframes pulseSlow {
          0% { opacity: 0.5; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0.5; transform: scale(0.8); }
        }
        
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        @keyframes scanlineHorizontal {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }
        
        @keyframes flicker {
          0% { opacity: 1; }
          8% { opacity: 0.8; }
          10% { opacity: 1; }
          20% { opacity: 1; }
          20.5% { opacity: 0.5; }
          21% { opacity: 1; }
          60% { opacity: 1; }
          60.5% { opacity: 0.2; }
          61% { opacity: 1; }
          90% { opacity: 1; }
          95% { opacity: 0.8; }
          100% { opacity: 1; }
        }
        
        @keyframes dataStream {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        @keyframes blink {
          0%, 49% { opacity: 0; }
          50%, 100% { opacity: 1; }
        }
        
        @keyframes noise {
          0%, 100% { background-position: 0 0; }
          10% { background-position: -5% -10%; }
          20% { background-position: -15% 5%; }
          30% { background-position: 7% -25%; }
          40% { background-position: 20% 25%; }
          50% { background-position: -25% 10%; }
          60% { background-position: 15% 5%; }
          70% { background-position: 0% 15%; }
          80% { background-position: 25% 35%; }
          90% { background-position: -10% 10%; }
        }
        
        .pulse-glow {
          animation: pulse 1.5s infinite;
          box-shadow: 0 0 15px rgba(6, 182, 212, 0.7);
        }
        
        .pulse-slow {
          animation: pulseSlow 2.5s infinite;
        }
        
        .glow-overlay {
          box-shadow: 0 0 10px 2px rgba(6, 182, 212, 0.7) inset;
        }
        
        .typing-animation {
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid #22d3ee;
          animation: typing 6s steps(60), flicker 0.75s step-end infinite alternate;
        }
        
        .flicker-text {
          animation: flicker 3s infinite;
        }
        
        .matrix-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(rgba(0, 20, 0, 0.5), rgba(0, 20, 0, 0.5)), 
                      repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0, 255, 0, 0.1) 1px, rgba(0, 255, 0, 0.1) 2px);
          overflow: hidden;
        }
        
        .grid-overlay {
          position: absolute;
          inset: 0;
          background: 
            linear-gradient(90deg, rgba(6, 182, 212, 0.03) 1px, transparent 1px),
            linear-gradient(rgba(6, 182, 212, 0.03) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        .scanline {
          height: 2px;
          width: 100%;
          background-color: rgba(6, 182, 212, 0.5);
          position: absolute;
          animation: scanline 2s linear infinite;
        }
        
        .scanner-line {
          height: 2px;
          width: 100%;
          background: linear-gradient(to right, transparent, rgba(6, 182, 212, 0.8), transparent);
          opacity: 0.6;
          animation: scanline 4s linear infinite;
        }
        
        .scanner-line-secondary {
          width: 2px;
          height: 100%;
          background: linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.5), transparent);
          opacity: 0.3;
          animation: scanlineHorizontal 7s linear infinite;
        }
        
        .data-stream-container {
          height: 40px;
          overflow: hidden;
          background-color: rgba(2, 20, 20, 0.5);
          border: 1px solid rgba(6, 182, 212, 0.3);
          position: relative;
        }
        
        .data-stream {
          position: absolute;
          height: 300%;
          width: 100%;
          top: -100%;
          background: repeating-linear-gradient(
            0deg,
            rgba(6, 182, 212, 0.15) 0px,
            rgba(6, 182, 212, 0.15) 1px,
            transparent 1px,
            transparent 5px
          );
          animation: dataStream 8s linear infinite;
        }
        
        .glitch-text {
          position: relative;
          text-shadow: 0 0 5px rgba(6, 182, 212, 0.8);
        }
        
        .glitch-text:before, .glitch-text:after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .glitch-text:before {
          left: 2px;
          text-shadow: -2px 0 #ff00ff;
          animation: glitch-animation 1s infinite linear alternate-reverse;
        }
        
        .glitch-text:after {
          left: -2px;
          text-shadow: 2px 0 #00ffff;
          animation: glitch-animation 2s infinite linear alternate-reverse;
        }
        
        .blink-led {
          position: absolute;
          top: 2px;
          right: 2px;
          width: 4px;
          height: 4px;
          background-color: #00ffff;
          border-radius: 50%;
          animation: blink 1s infinite;
        }
        
        .cursor-blink {
          animation: blink 1s infinite;
        }
        
        .terminal-text {
          height: 80px;
          overflow: hidden;
          box-shadow: 0 0 10px rgba(0, 255, 0, 0.2);
        }
        
        .digital-noise {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          animation: noise 0.5s infinite;
          pointer-events: none;
        }
        
        @keyframes glitch-animation {
          0% {
            clip-path: inset(30% 0 70% 0);
            opacity: 0;
          }
          20% {
            clip-path: inset(10% 0 90% 0);
            opacity: 0;
          }
          41% {
            clip-path: inset(40% 0 60% 0);
            opacity: 0.8;
          }
          42% {
            clip-path: inset(40% 0 60% 0);
            opacity: 0;
          }
          45% {
            clip-path: inset(80% 0 20% 0);
            opacity: 1;
          }
          61% {
            clip-path: inset(20% 0 80% 0);
            opacity: 0;
          }
          62% {
            clip-path: inset(60% 0 40% 0);
            opacity: 0.5;
          }
          70% {
            clip-path: inset(10% 0 90% 0);
            opacity: 0;
          }
          100% {
            clip-path: inset(20% 0 80% 0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

  return (
    <section id="about" className="py-12 relative overflow-hidden bg-ml-dark min-h-screen game-container">
      {/* Game UI frame */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-green-500 opacity-70"></div>
        <div className="absolute top-0 right-0 w-32 h-32 border-t-4 border-r-4 border-green-500 opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 border-b-4 border-l-4 border-green-500 opacity-70"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-green-500 opacity-70"></div>
      </div>

      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        {/* <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(21,87,153,0.3)_0%,rgba(6,20,40,0.9)_70%,rgba(0,0,0,1)_100%)]"></div> */}
        
        {/* Grid lines */}
        <div className="absolute inset-0 grid-overlay"></div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i}
              className="absolute w-2 h-2 bg-green-500 rounded-full particle opacity-30"
              style={{ 
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%`,
                animationDuration: `${3 + Math.random() * 10}s`,
                animationDelay: `${Math.random() * 5}s` 
              }}
            ></div>
          ))}
        </div>


        
        
        {/* Glow effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-blue-500/20 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-green-500/20 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-purple-500/20 blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      <div className="section-container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div ref={sectionRef} className="mt-8">
          {/* Character Profile Header */}
          <div className="text-center mb-12">
            <div className="inline-block relative">
              <h2 
                className={`animate-item opacity-0 translate-y-10 transition-all duration-700 ease-out text-4xl md:text-5xl font-bold tracking-tight ${glitchActive ? 'glitch' : ''}`} 
                data-text="PLAYER PROFILE"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">PLAYER PROFILE</span>
              </h2>
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-green-500"></div>
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-green-500"></div>
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-green-500"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-green-500"></div>
            </div>
            
            <div className="max-w-2xl mx-auto mt-6 relative">
              <div className="h-1 w-24 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mb-6 animate-item opacity-0 translate-y-10 transition-all duration-700 ease-out"></div>
              <div className="terminal-window p-4 inline-block animate-item opacity-0 translate-y-10 transition-all duration-700 ease-out">
                <div className="flex items-center mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="ml-4 text-xs text-gray-400 font-mono">player_description.exe</div>
                </div>
                <p className="font-mono text-green-400">
                  <span className="text-blue-400">$ </span>
                  {typedText}
                  <span className="animate-blink text-green-400">_</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Game Menu Tabs */}
          <div className="game-tabs flex justify-center mb-8 animate-item opacity-0 translate-y-10 transition-all duration-700 ease-out">
            {[
              { id: 'stats', label: 'STATS', icon: <Gamepad2 size={16} /> },
              { id: 'skills', label: 'SKILLS', icon: <Zap size={16} /> },
              { id: 'achievements', label: 'ACHIEVEMENTS', icon: <Trophy size={16} /> }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`tab-button flex items-center px-6 py-2 font-mono text-sm transition-all duration-300 mx-1 ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-400 border-b-2 border-green-500' 
                    : 'text-gray-400 hover:text-gray-300 border-b-2 border-gray-800 hover:border-gray-700'
                }`}
                onClick={() => {
                  setActiveTab(tab.id);
                  playButtonSound();
                }}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="tab-content min-h-96">
            {/* STATS Tab */}
            {activeTab === 'stats' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
                {/* Character Display - 5 columns */}
                <div className="lg:col-span-5">
                  <div className="game-card character-card h-full p-6 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/40 border border-green-500/30 shadow-[0_0_15px_rgba(0,255,155,0.2)] group">
                    <div className="flex items-center mb-4">
                      <div className="w-1 h-6 bg-green-500 rounded mr-3"></div>
                      <h3 className="text-xl font-bold text-white">CHARACTER</h3>
                      <div className="status-indicator ml-auto text-xs font-mono flex items-center">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 pulse-opacity"></span>
                        <span className="text-green-400">ONLINE</span>
                      </div>
                    </div>
                    
                    <div className="character-display flex flex-col items-center">
                      <div className="character-avatar w-32 h-32 mb-6 rounded-full bg-gray-800 border-4 border-green-500/50 shadow-[0_0_20px_rgba(0,255,155,0.3)] overflow-hidden flex items-center justify-center">
                        <Gamepad2 size={64} className="text-green-400" />
                      </div>
                      
                      <div className="text-center mb-6">
                        <h4 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">Software Engineer</h4>
                        <p className="text-gray-400 font-mono">Level 3 Developer</p>
                      </div>
                      
                      <div className="w-full space-y-4">
                        <div className="stat-row">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-300 font-mono text-sm">XP</span>
                            <span className="text-green-400 font-mono text-sm">13840 / 15000</span>
                          </div>
                          <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full" style={{ width: '92%' }}></div>
                          </div>
                        </div>
                        
                        <div className="stat-row">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-300 font-mono text-sm">ENERGY</span>
                            <span className="text-blue-400 font-mono text-sm">85%</span>
                          </div>
                          <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                        
                        <div className="stat-row">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-300 font-mono text-sm">CREATIVITY</span>
                            <span className="text-purple-400 font-mono text-sm">78%</span>
                          </div>
                          <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: '78%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-800">
                      <div className="text-center">
                        <span className="text-xs font-mono text-gray-500 uppercase">Character Bio</span>
                        <p className="text-gray-400 mt-2 font-mono text-sm leading-relaxed">
                          A dedicated developer with a passion for creating elegant solutions to complex problems. Currently embarking on quests to master machine learning and build innovative web applications.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Primary & Secondary Stats - 7 columns */}
                <div className="lg:col-span-7 flex flex-col space-y-6">
                  {/* Primary Stats */}
                  <div className="game-card p-6 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/40 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)] group">
                    <div className="flex items-center mb-6">
                      <div className="w-1 h-6 bg-blue-500 rounded mr-3"></div>
                      <h3 className="text-xl font-bold text-white">PRIMARY STATS</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      {[
                        { name: 'Education', value: 'Islamic University of Technology', icon: <Trophy size={24} className="text-yellow-400" /> },
                        { name: 'Field', value: 'Software Engineering', icon: <Code size={24} className="text-blue-400" /> },
                        { name: 'Location', value: 'Bangladesh', icon: <MapPin size={24} className="text-red-400" /> },
                        { name: 'Availability', value: 'Open to remote opportunities', icon: <Target size={24} className="text-green-400" /> }
                      ].map((stat, idx) => (
                        <div key={idx} className="stat-block group/stat bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                          <div className="flex items-center mb-2">
                            <div className="mr-3 flex-shrink-0 w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center group-hover/stat:bg-blue-900/30 transition-all duration-300">
                              {stat.icon}
                            </div>
                            <div>
                              <h4 className="text-gray-400 text-sm font-mono uppercase">{stat.name}</h4>
                              <p className="text-white font-medium">{stat.value}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Secondary Stats */}
                  <div className="game-card p-6 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/40 border border-purple-500/30 shadow-[0_0_15px_rgba(139,92,246,0.2)] flex-1 group">
                    <div className="flex items-center mb-6">
                      <div className="w-1 h-6 bg-purple-500 rounded mr-3"></div>
                      <h3 className="text-xl font-bold text-white">SPECIALIZATIONS</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        'Develop web applications with cutting-edge tech',
                        'Dive deep into machine learning algorithms',
                        'Tackle complex challenges with elegant solutions',
                        'Always learning, always growing'
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start group/spec">
                          <div className="hexagon-bullet flex-shrink-0 w-6 h-6 bg-purple-900/50 mr-3 flex items-center justify-center rounded-lg group-hover/spec:bg-purple-500/30 transition-colors duration-300">
                            <Zap size={12} className="text-purple-400" />
                          </div>
                          <span className="text-gray-300 group-hover/spec:text-white transition-colors duration-300 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 border-t border-gray-800 pt-6">
                      <div className="flex items-center power-up-badge bg-gradient-to-r from-purple-900/30 to-pink-900/30 p-3 rounded-lg">
                        <div className="power-icons flex-shrink-0 flex items-center space-x-2 mr-4">
                          <div className="power-up-icon p-2 bg-gray-800 rounded-lg">
                            <Pizza size={24} className="text-red-400" />
                          </div>
                          <span className="text-white font-bold">+</span>
                          <div className="power-up-icon p-2 bg-gray-800 rounded-lg">
                            <Code size={24} className="text-yellow-400" />
                          </div>
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-sm">POWER COMBO</h4>
                          <p className="text-gray-400 text-sm">I debug with coffee and squash bugs with pizza!</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* SKILLS Tab */}
            {activeTab === 'skills' && (
              <div className="skills-section animate-fade-in">
                <div className="game-card p-8 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/40 border border-green-500/30 shadow-[0_0_15px_rgba(0,255,155,0.2)]">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Skill Bars */}
                    <div>
                      <div className="flex items-center mb-6">
                        <div className="w-1 h-6 bg-green-500 rounded mr-3"></div>
                        <h3 className="text-xl font-bold text-white">SKILL STATS</h3>
                      </div>
                      
                      <div className="space-y-6">
                        {skills.map((skill, idx) => (
                          <div key={idx} className="skill-item group">
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center">
                                <div className="w-6 h-6 rounded bg-gray-800 flex items-center justify-center mr-3">
                                  {skill.icon}
                                </div>
                                <span className="text-gray-300 group-hover:text-green-400 transition-colors duration-300">{skill.name}</span>
                              </div>
                              <span className="text-green-400 font-mono">{skill.level}/100</span>
                            </div>
                            <div className="h-3 w-full bg-gray-800 rounded-full overflow-hidden p-0.5">
                              <div 
                                className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-1000" 
                                style={{ width: '0%' }}
                                data-width={`${skill.level}%`}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Skill points */}
                      <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 font-mono text-sm">AVAILABLE SKILL POINTS</span>
                          <span className="text-green-400 font-bold">3</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Skill Tree */}
                    <div>
                      <div className="flex items-center mb-6">
                        <div className="w-1 h-6 bg-blue-500 rounded mr-3"></div>
                        <h3 className="text-xl font-bold text-white">SKILL TREE</h3>
                      </div>
                      
                      <div className="skill-tree-container h-80 relative bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                        <svg width="100%" height="100%" viewBox="0 0 400 300" className="skill-tree">
                          {/* Base skill */}
                          <circle cx="200" cy="260" r="25" className="skill-node active" />
                          <text x="200" y="265" textAnchor="middle" className="skill-text">Code</text>
                          
                          {/* Tier 1 skills */}
                          <line x1="200" y1="235" x2="130" y2="180" className="skill-line active" />
                          <line x1="200" y1="235" x2="270" y2="180" className="skill-line active" />
                          
                          <circle cx="130" cy="180" r="22" className="skill-node active" />
                          <text x="130" y="185" textAnchor="middle" className="skill-text">Web</text>
                          
                          <circle cx="270" cy="180" r="22" className="skill-node active" />
                          <text x="270" y="185" textAnchor="middle" className="skill-text">App</text>
                          
                          {/* Tier 2 skills */}
                          <line x1="130" y1="158" x2="70" y2="100" className="skill-line active" />
                          <line x1="130" y1="158" x2="190" y2="100" className="skill-line" />
                          <line x1="270" y1="158" x2="210" y2="100" className="skill-line" />
                          <line x1="270" y1="158" x2="330" y2="100" className="skill-line active" />
                          
                          <circle cx="70" cy="100" r="20" className="skill-node active" />
                          <text x="70" y="105" textAnchor="middle" className="skill-text">React</text>
                          
                          <circle cx="190" cy="100" r="20" className="skill-node locked" />
                          <text x="190" y="105" textAnchor="middle" className="skill-text">Node</text>
                          
                          <circle cx="210" cy="100" r="20" className="skill-node locked" />
                          <text x="210" y="105" textAnchor="middle" className="skill-text">Mobile</text>
                          
                          <circle cx="330" cy="100" r="20" className="skill-node active" />
                          <text x="330" y="105" textAnchor="middle" className="skill-text">ML</text>
                          
                          {/* Tier 3 skills */}
                          <line x1="70" y1="80" x2="70" y2="40" className="skill-line" />
                          <line x1="330" y1="80" x2="330" y2="40" className="skill-line" />
                          
                          <circle cx="70" cy="40" r="18" className="skill-node locked" />
                          <text x="70" y="45" textAnchor="middle" className="skill-text">Next</text>
                          
                          <circle cx="330" cy="40" r="18" className="skill-node locked" />
                          <text x="330" y="45" textAnchor="middle" className="skill-text">AI</text>
                        </svg>
                        
                        <div className="absolute bottom-4 right-4 text-xs font-mono text-gray-500">
                          <div className="flex items-center">
                            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                            <span>Unlocked</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <div className="w-3 h-3 rounded-full bg-gray-600 mr-2"></div>
                            <span>Locked</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* ACHIEVEMENTS Tab */}
            {activeTab === 'achievements' && (
              <div className="achievements-section animate-fade-in">
                <div className="game-card p-8 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/40 border border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                  <div className="mb-8">
                    <div className="flex items-center mb-6">
                      <div className="w-1 h-6 bg-yellow-500 rounded mr-3"></div>
                      <h3 className="text-xl font-bold text-white">ACHIEVEMENTS</h3>
                      <div className="flex-grow text-right">
                        <span className="text-yellow-400 font-mono text-sm">3/10 UNLOCKED</span>
                      </div>
                    </div>
                    
                    <div className="progress-bar h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {achievements.map((achievement, idx) => (
                      <div 
                        key={idx} 
                        className="achievement-card bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-[0_0_10px_rgba(234,179,8,0.3)] group"
                      >
                        <div className="flex items-center mb-4">
                          <div className="achievement-icon w-12 h-12 rounded-full bg-gray-900/80 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                            {achievement.icon}
                          </div>
                          <div>
                            <h4 className="text-white font-bold">{achievement.name}</h4>
                            <p className="text-gray-400 text-sm">{achievement.desc}</p>
                          </div>
                        </div>
                        <div className="achievement-date mt-2 text-xs font-mono text-gray-500 flex items-center">
                          <span className="mr-2">UNLOCKED</span>
                          <span className="text-gray-400">2023-09-15</span>
                        </div>
                      </div>
                    ))}
                    
                    {/* Locked achievements */}
                    {Array.from({ length: 3 }).map((_, idx) => (
                      <div 
                        key={`locked-${idx}`}
                        className="achievement-card locked bg-gray-900/30 p-6 rounded-lg border border-gray-800 group"
                      >
                        <div className="flex items-center mb-4">
                          <div className="achievement-icon w-12 h-12 rounded-full bg-gray-900 flex items-center justify-center mr-4 opacity-50">
                            <Lock size={20} className="text-gray-600" />
                          </div>
                          <div>
                            <h4 className="text-gray-500 font-bold">???????????</h4>
                            <p className="text-gray-600 text-sm">Achievement locked</p>
                          </div>
                        </div>
                        <div className="achievement-unlock text-xs font-mono text-gray-700">
                          UNLOCK CRITERIA UNKNOWN
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-800">
                    <div className="flex items-center">
                      <Trophy size={18} className="text-yellow-400 mr-2" />
                      <span className="text-gray-400 text-sm">Complete more projects to unlock achievements</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Cyberpunk decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black to-transparent pointer-events-none"></div>
      
      <style jsx>{`
        .game-container {
          perspective: 1000px;
        }
        
        .grid-overlay {
          background-image: linear-gradient(to right, rgba(0, 255, 155, 0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0, 255, 155, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        
        .typing-text {
          overflow: hidden;
        }
        
        @keyframes pulse-opacity {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        
        .pulse-opacity {
          animation: pulse-opacity 2s infinite;
        }
        
        .glitch {
          position: relative;
          animation: glitch 0.3s infinite;
        }
        
        .glitch:before,
        .glitch:after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .glitch:before {
          left: 2px;
          text-shadow: -1px 0 red;
          animation: glitch-anim 2s infinite linear alternate-reverse;
        }
        
        .glitch:after {
          left: -2px;
          text-shadow: 2px 0 blue;
          animation: glitch-anim2 1s infinite linear alternate-reverse;
        }
        
        @keyframes glitch-anim {
          0% { clip-path: inset(40% 0 61% 0); }
          20% { clip-path: inset(92% 0 1% 0); }
          40% { clip-path: inset(43% 0 1% 0); }
          60% { clip-path: inset(25% 0 58% 0); }
          80% { clip-path: inset(54% 0 7% 0); }
          100% { clip-path: inset(58% 0 43% 0); }
        }
        
        @keyframes glitch-anim2 {
          0% { clip-path: inset(25% 0 58% 0); }
          20% { clip-path: inset(54% 0 7% 0); }
          40% { clip-path: inset(58% 0 43% 0); }
          60% { clip-path: inset(40% 0 61% 0); }
          80% { clip-path: inset(92% 0 1% 0); }
          100% { clip-path: inset(43% 0 1% 0); }
        }
        
        .animate-blink {
          animation: blink 1s infinite;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        
        .terminal-window {
          background-color: rgba(30, 30, 30, 0.9);
          border-radius: 6px;
          border: 1px solid rgba(0, 255, 155, 0.3);
          box-shadow: 0 0 20px rgba(0, 255, 155, 0.2);
        }
        
        .particle {
          animation: float linear infinite;
        }
        
        @keyframes float {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.3; }
          90% { opacity: 0.3; }
          100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
        }
        
        .skill-node {
          fill: #1f2937;
          stroke: #6B7280;
          stroke-width: 2;
          transition: all 0.3s ease;
        }
        
        .skill-node.active {
          fill: #064e3b;
          stroke: #34d399;
          filter: drop-shadow(0 0 3px rgba(52, 211, 153, 0.5));
        }
        
        .skill-node.locked {
          fill: #1f2937;
          stroke: #4B5563;
        }
        
        .skill-line {
          stroke: #4B5563;
          stroke-width: 3;
          stroke-dasharray: 5;
        }
        
        .skill-line.active {
          stroke: #34d399;
          stroke-dasharray: none;
          filter: drop-shadow(0 0 1px rgba(52, 211, 153, 0.5));
        }
        
        .skill-text {
          fill: #D1D5DB;
          font-size: 10px;
          font-family: monospace;
          pointer-events: none;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default About;
