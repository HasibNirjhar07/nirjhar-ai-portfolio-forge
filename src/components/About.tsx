import { useEffect, useRef, useState } from "react";
import {
  Gamepad2,
  Trophy,
  Target,
  Zap,
  Code,
  Brain,
  Star,
  ShieldCheck,
  Flame,
  GitBranch,
  MapPin,
  Pizza,
  Lock,
} from "lucide-react";
import ElectricBorder from "./ElectricBorder";

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [typedText, setTypedText] = useState("");
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("stats");
  const [glitchActive, setGlitchActive] = useState(false);

  const fullText =
    "Passionate about creating solutions through code and exploring the frontiers of AI and machine learning";

  // In your About component
  useEffect(() => {
    const loadingInterval = setInterval(() => {
      setLoadingProgress((prev) => {
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
          const elements =
            sectionRef.current?.querySelectorAll(".animate-item");
          elements?.forEach((el, idx) => {
            setTimeout(() => {
              el.classList.add("opacity-100", "translate-y-0");
              el.classList.remove("opacity-0", "translate-y-10");
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
    if (typeof window !== "undefined") {
      try {
        const audio = new Audio("/button-click.mp3");
        audio.volume = 0.2;
        audio.play();
      } catch (e) {
        console.log("Audio play failed:", e);
      }
    }
  };

  const skills = [
    { name: "Web Development", level: 85, icon: <Code size={18} /> },
    { name: "Machine Learning", level: 75, icon: <Brain size={18} /> },
    { name: "Problem Solving", level: 90, icon: <Target size={18} /> },
    { name: "UI/UX Design", level: 70, icon: <Flame size={18} /> },
    { name: "DevOps", level: 65, icon: <GitBranch size={18} /> },
  ];

  const achievements = [
    {
      icon: <Trophy size={20} className="text-yellow-400" />,
      name: "Open Source Contributor",
      desc: "Contributed to 5+ open source projects",
    },
    {
      icon: <Star size={20} className="text-blue-400" />,
      name: "Fast Learner",
      desc: "Mastered 3 new frameworks in 6 months",
    },
    {
      icon: <ShieldCheck size={20} className="text-green-400" />,
      name: "Bug Slayer",
      desc: "Eliminated 100+ critical bugs",
    },
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

        <div
          className="text-4xl font-bold mb-8 text-green-500 glitch-text"
          data-text="LOADING CHARACTER..."
        >
          LOADING CHARACTER...
        </div>

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

        <div className="mt-2 text-green-400 font-mono flicker-text tracking-widest">
          {loadingProgress}%
        </div>

        <div className="mt-8 max-w-md text-center">
          <p className="text-gray-500 font-mono text-sm typing-animation">
            Loading character data...
            <br />
            Initializing skill matrix...
            <br />
            Calibrating achievements...
            <br />
            Syncing neural interface...
            <br />
            Compiling biometric data...
          </p>

          {/* Data streams */}
          <div className="mt-6 grid grid-cols-3 gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="data-stream-container">
                <div
                  className="data-stream"
                  style={{ animationDelay: `${i * 0.3}s` }}
                ></div>
                <div className="text-xs text-cyan-500 opacity-70 absolute bottom-1 left-1 font-mono">
                  {i === 0 ? "NEURAL" : i === 1 ? "SYSTEMS" : "NETWORK"}
                </div>
                <div className="blink-led"></div>
              </div>
            ))}
          </div>

          {/* Terminal messages */}
          <div className="mt-6 text-left font-mono text-xs text-green-600 bg-black bg-opacity-50 p-2 border border-green-900 terminal-text">
            <div> Initializing character parameters</div>
            <div> Syncing databases</div>
            <div> Connecting to server node #42A7</div>
            <div className="cursor-blink"> _</div>
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
      </div>
    );
  }

  return (
    <section
      id="about"
      className="py-12 relative overflow-hidden bg-ml-dark min-h-screen game-container"
    >
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
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>

        {/* Glow effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-blue-500/20 blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-green-500/20 blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full bg-purple-500/20 blur-2xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
      </div>

      <div className="section-container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div ref={sectionRef} className="mt-8">
          {/* Character Profile Header */}
          <div className="text-center mb-12">
            <div className="inline-block relative">
              <h2
                className={`animate-item opacity-0 translate-y-10 transition-all duration-700 ease-out text-4xl md:text-5xl font-bold tracking-tight ${
                  glitchActive ? "glitch" : ""
                }`}
                data-text="PLAYER PROFILE"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                  PLAYER PROFILE
                </span>
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
                  <div className="ml-4 text-xs text-gray-400 font-mono">
                    player_description.exe
                  </div>
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
              { id: "stats", label: "STATS", icon: <Gamepad2 size={16} /> },
              { id: "skills", label: "SKILLS", icon: <Zap size={16} /> },
              {
                id: "achievements",
                label: "ACHIEVEMENTS",
                icon: <Trophy size={16} />,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`tab-button flex items-center px-6 py-2 font-mono text-sm transition-all duration-300 mx-1 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-400 border-b-2 border-green-500"
                    : "text-gray-400 hover:text-gray-300 border-b-2 border-gray-800 hover:border-gray-700"
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
            {activeTab === "stats" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fade-in">
                {/* Character Display - 5 columns */}
                <div className="lg:col-span-5">
                  <ElectricBorder color="#22c55e" className="h-full">
                    <div className="game-card character-card h-full p-6 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/40 group">
                    <div className="flex items-center mb-4">
                      <div className="w-1 h-6 bg-green-500 rounded mr-3"></div>
                      <h3 className="text-xl font-bold text-white">
                        CHARACTER
                      </h3>
                      <div className="status-indicator ml-auto text-xs font-mono flex items-center">
                        <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 pulse-opacity"></span>
                        <span className="text-green-400">ONLINE</span>
                      </div>
                    </div>

                    <div className="character-display flex flex-col items-center">
                      <div className="character-avatar w-32 h-32 mb-6 rounded-full bg-gray-800 border-4 border-green-500/50 shadow-[0_0_20px_rgba(0,255,155,0.3)] overflow-hidden flex items-center justify-center">
                        <img
                          src="https://cdna.artstation.com/p/assets/images/images/019/226/712/original/anja-verhoeff-profilepic-5.gif?1562594634"
                          alt="Gaming Avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="text-center mb-6">
                        <h4 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
                          Software Engineer
                        </h4>
                        <p className="text-gray-400 font-mono">
                          Level 3 Developer
                        </p>
                      </div>

                      <div className="w-full space-y-4">
                        <div className="stat-row">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-300 font-mono text-sm">
                              XP
                            </span>
                            <span className="text-green-400 font-mono text-sm">
                              13840 / 15000
                            </span>
                          </div>
                          <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                              style={{ width: "92%" }}
                            ></div>
                          </div>
                        </div>

                        <div className="stat-row">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-300 font-mono text-sm">
                              ENERGY
                            </span>
                            <span className="text-blue-400 font-mono text-sm">
                              85%
                            </span>
                          </div>
                          <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                              style={{ width: "85%" }}
                            ></div>
                          </div>
                        </div>

                        <div className="stat-row">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-300 font-mono text-sm">
                              CREATIVITY
                            </span>
                            <span className="text-purple-400 font-mono text-sm">
                              78%
                            </span>
                          </div>
                          <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                              style={{ width: "78%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-800">
                      <div className="text-center">
                        <span className="text-xs font-mono text-gray-500 uppercase">
                          Character Bio
                        </span>
                        <p className="text-gray-400 mt-2 font-mono text-sm leading-relaxed">
                          A dedicated developer with a passion for creating
                          elegant solutions to complex problems. Currently
                          embarking on quests to master machine learning and
                          build innovative web applications.
                        </p>
                    </div>
                  </div>
                </div>
              </ElectricBorder>
                </div>

                {/* Primary & Secondary Stats - 7 columns */}
                <div className="lg:col-span-7 flex flex-col space-y-6">
                  {/* Primary Stats */}

                  <ElectricBorder color="#3b82f6">
                    <div className="game-card p-6 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/40 group">
                      <div className="flex items-center mb-6">
                        <div className="w-1 h-6 bg-blue-500 rounded mr-3"></div>
                        <h3 className="text-xl font-bold text-white">
                          PRIMARY STATS
                        </h3>
                      </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
    {[
      {
        name: "Education",
        value: "Islamic University of Technology",
        icon: <Trophy size={24} className="text-yellow-400" />,
      },
      {
        name: "Field",
        value: "Software Engineering",
        icon: <Code size={24} className="text-blue-400" />,
      },
      {
        name: "Location",
        value: "Bangladesh",
        icon: <MapPin size={24} className="text-red-400" />,
      },
      {
        name: "Availability",
        value: "Open to remote opportunities",
        icon: <Target size={24} className="text-green-400" />,
      },
    ].map((stat, idx) => (
      <div
        key={idx}
        className="stat-block group/stat bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)]"
      >
        <div className="flex items-center mb-2">
          <div className="mr-3 flex-shrink-0 w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center group-hover/stat:bg-blue-900/30 transition-all duration-300">
            {stat.icon}
          </div>
          <div>
            <h4 className="text-gray-400 text-sm font-mono uppercase">
              {stat.name}
            </h4>
            <p className="text-white font-medium">
              {stat.value}
            </p>
            </div>
          </div>
        </div>
      ))}
      </div>
    </div>
    </ElectricBorder>

               
                 

                    {/* Secondary Stats */}
                    <ElectricBorder color="#a855f7" className="flex-1">
                      <div className="game-card p-6 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/40 flex-1 group">
                    <div className="flex items-center mb-6">
                      <div className="w-1 h-6 bg-purple-500 rounded mr-3"></div>
                      <h3 className="text-xl font-bold text-white">
                        SPECIALIZATIONS
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Develop web applications with cutting-edge tech",
                        "Dive deep into machine learning algorithms",
                        "Tackle complex challenges with elegant solutions",
                        "Always learning, always growing",
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-start group/spec">
                          <div className="hexagon-bullet flex-shrink-0 w-6 h-6 bg-purple-900/50 mr-3 flex items-center justify-center rounded-lg group-hover/spec:bg-purple-500/30 transition-colors duration-300">
                            <Zap size={12} className="text-purple-400" />
                          </div>
                          <span className="text-gray-300 group-hover/spec:text-white transition-colors duration-300 text-sm">
                            {item}
                          </span>
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
                          <h4 className="text-white font-bold text-sm">
                            POWER COMBO
                          </h4>
                          <p className="text-gray-400 text-sm">
                            I debug with coffee and squash bugs with pizza!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  </ElectricBorder>
                </div>
              </div>
            )}

            {/* SKILLS Tab */}
            {activeTab === "skills" && (
              <div className="skills-section animate-fade-in">
                <ElectricBorder color="#22c55e">
                  <div className="game-card p-8 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/40">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Skill Bars */}
                    <div>
                      <div className="flex items-center mb-6">
                        <div className="w-1 h-6 bg-green-500 rounded mr-3"></div>
                        <h3 className="text-xl font-bold text-white">
                          SKILL STATS
                        </h3>
                      </div>

                      <div className="space-y-6">
                        {skills.map((skill, idx) => (
                          <div key={idx} className="skill-item group">
                            <div className="flex justify-between items-center mb-2">
                              <div className="flex items-center">
                                <div className="w-6 h-6 rounded bg-gray-800 flex items-center justify-center mr-3">
                                  {skill.icon}
                                </div>
                                <span className="text-gray-300 group-hover:text-green-400 transition-colors duration-300">
                                  {skill.name}
                                </span>
                              </div>
                              <span className="text-green-400 font-mono">
                                {skill.level}/100
                              </span>
                            </div>
                            <div className="h-3 w-full bg-gray-800 rounded-full overflow-hidden p-0.5">
                              <div
                                className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-1000"
                                style={{ width: "0%" }}
                                data-width={`${skill.level}%`}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Skill points */}
                      <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400 font-mono text-sm">
                            AVAILABLE SKILL POINTS
                          </span>
                          <span className="text-green-400 font-bold">3</span>
                        </div>
                      </div>
                    </div>

                    {/* Skill Tree */}
                    <div>
                      <div className="flex items-center mb-6">
                        <div className="w-1 h-6 bg-blue-500 rounded mr-3"></div>
                        <h3 className="text-xl font-bold text-white">
                          SKILL TREE
                        </h3>
                      </div>

                      <div className="skill-tree-container h-80 relative bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                        <svg
                          width="100%"
                          height="100%"
                          viewBox="0 0 400 300"
                          className="skill-tree"
                        >
                          {/* Base skill */}
                          <circle
                            cx="200"
                            cy="260"
                            r="25"
                            className="skill-node active"
                          />
                          <text
                            x="200"
                            y="265"
                            textAnchor="middle"
                            className="skill-text"
                          >
                            Code
                          </text>

                          {/* Tier 1 skills */}
                          <line
                            x1="200"
                            y1="235"
                            x2="130"
                            y2="180"
                            className="skill-line active"
                          />
                          <line
                            x1="200"
                            y1="235"
                            x2="270"
                            y2="180"
                            className="skill-line active"
                          />

                          <circle
                            cx="130"
                            cy="180"
                            r="22"
                            className="skill-node active"
                          />
                          <text
                            x="130"
                            y="185"
                            textAnchor="middle"
                            className="skill-text"
                          >
                            Web
                          </text>

                          <circle
                            cx="270"
                            cy="180"
                            r="22"
                            className="skill-node active"
                          />
                          <text
                            x="270"
                            y="185"
                            textAnchor="middle"
                            className="skill-text"
                          >
                            App
                          </text>

                          {/* Tier 2 skills */}
                          <line
                            x1="130"
                            y1="158"
                            x2="70"
                            y2="100"
                            className="skill-line active"
                          />
                          <line
                            x1="130"
                            y1="158"
                            x2="190"
                            y2="100"
                            className="skill-line"
                          />
                          <line
                            x1="270"
                            y1="158"
                            x2="210"
                            y2="100"
                            className="skill-line"
                          />
                          <line
                            x1="270"
                            y1="158"
                            x2="330"
                            y2="100"
                            className="skill-line active"
                          />

                          <circle
                            cx="70"
                            cy="100"
                            r="20"
                            className="skill-node active"
                          />
                          <text
                            x="70"
                            y="105"
                            textAnchor="middle"
                            className="skill-text"
                          >
                            React
                          </text>

                          <circle
                            cx="190"
                            cy="100"
                            r="20"
                            className="skill-node locked"
                          />
                          <text
                            x="190"
                            y="105"
                            textAnchor="middle"
                            className="skill-text"
                          >
                            Node
                          </text>

                          <circle
                            cx="210"
                            cy="100"
                            r="20"
                            className="skill-node locked"
                          />
                          <text
                            x="210"
                            y="105"
                            textAnchor="middle"
                            className="skill-text"
                          >
                            Mobile
                          </text>

                          <circle
                            cx="330"
                            cy="100"
                            r="20"
                            className="skill-node active"
                          />
                          <text
                            x="330"
                            y="105"
                            textAnchor="middle"
                            className="skill-text"
                          >
                            ML
                          </text>

                          {/* Tier 3 skills */}
                          <line
                            x1="70"
                            y1="80"
                            x2="70"
                            y2="40"
                            className="skill-line"
                          />
                          <line
                            x1="330"
                            y1="80"
                            x2="330"
                            y2="40"
                            className="skill-line"
                          />

                          <circle
                            cx="70"
                            cy="40"
                            r="18"
                            className="skill-node locked"
                          />
                          <text
                            x="70"
                            y="45"
                            textAnchor="middle"
                            className="skill-text"
                          >
                            Next
                          </text>

                          <circle
                            cx="330"
                            cy="40"
                            r="18"
                            className="skill-node locked"
                          />
                          <text
                            x="330"
                            y="45"
                            textAnchor="middle"
                            className="skill-text"
                          >
                            AI
                          </text>
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
              </ElectricBorder>
              </div>
            )}

            {/* ACHIEVEMENTS Tab */}
            {activeTab === "achievements" && (
              <div className="achievements-section animate-fade-in">
                <ElectricBorder color="#eab308">
                  <div className="game-card p-8 rounded-xl bg-gradient-to-br from-gray-900/80 to-gray-800/40">
                  <div className="mb-8">
                    <div className="flex items-center mb-6">
                      <div className="w-1 h-6 bg-yellow-500 rounded mr-3"></div>
                      <h3 className="text-xl font-bold text-white">
                        ACHIEVEMENTS
                      </h3>
                      <div className="flex-grow text-right">
                        <span className="text-yellow-400 font-mono text-sm">
                          3/10 UNLOCKED
                        </span>
                      </div>
                    </div>

                    <div className="progress-bar h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full"
                        style={{ width: "30%" }}
                      ></div>
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
                            <h4 className="text-white font-bold">
                              {achievement.name}
                            </h4>
                            <p className="text-gray-400 text-sm">
                              {achievement.desc}
                            </p>
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
                            <h4 className="text-gray-500 font-bold">
                              ???????????
                            </h4>
                            <p className="text-gray-600 text-sm">
                              Achievement locked
                            </p>
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
                      <span className="text-gray-400 text-sm">
                        Complete more projects to unlock achievements
                      </span>
                    </div>
                  </div>
                </div>
              </ElectricBorder>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cyberpunk decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-b from-black to-transparent pointer-events-none"></div>


    </section>
  );
};

export default About;
