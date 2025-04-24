import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  Cpu,
  Code,
  Brain,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
} from "lucide-react";

// Define types for our component
interface TechItem {
  name: string;
  color: string;
}

interface SocialLink {
  icon: JSX.Element;
  href: string;
  label: string;
}

// Define Particle class type
class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
    this.color = `rgba(99, 102, 241, ${Math.random() * 0.5 + 0.2})`;
  }

  update(): void {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > window.innerWidth) this.speedX *= -1;
    if (this.y < 0 || this.y > window.innerHeight) this.speedY *= -1;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const [scrollY, setScrollY] = useState<number>(0);
  const [typingComplete, setTypingComplete] = useState<boolean>(false);

  // Typing animation state
  const [displayedCode, setDisplayedCode] = useState<string>("");
  const fullCode = `const hasibul = {
  name: "Hasibul Islam Nirjhar",
  location: "Bangladesh",
  education: "Software Engineering",
  skills: ["AI/ML", "Web Dev", "Mobile"],
  debugWith: (bugs) => "☕ + 🍕",
  solveProblems: true
};`;

  // Particle animation ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Tech stack with icons
  const techStack: TechItem[] = [
    { name: "TensorFlow", color: "bg-orange-500" },
    { name: "PyTorch", color: "bg-red-500" },
    { name: "React", color: "bg-blue-400" },
    { name: "Node.js", color: "bg-green-500" },
    { name: "Python", color: "bg-yellow-500" },
    { name: "JavaScript", color: "bg-yellow-300" },
  ];

  // Handle canvas animation
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    const particles: Particle[] = [];
    let animationFrameId: number;

    // Set canvas dimensions
    const resizeCanvas = (): void => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create particles
    const createParticles = (): void => {
      const particleCount = Math.min(window.innerWidth / 10, 100);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    createParticles();

    // Animation loop
    const animate = (): void => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections between nearby particles
      ctx.strokeStyle = "rgba(99, 102, 241, 0.1)";
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    // Handle scroll events
    const handleScroll = (): void => {
      setScrollY(window.scrollY);
    };

    // Visibility observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    window.addEventListener("scroll", handleScroll);

    // Typing animation
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < fullCode.length) {
        setDisplayedCode(fullCode.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTypingComplete(true);
      }
    }, 40);

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
      clearInterval(typingInterval);
    };
  }, [fullCode]);

  // Compute animation classes
  const containerClasses = isVisible
    ? "opacity-100 translate-y-0"
    : "opacity-0 translate-y-10";

  // Calculate parallax effect
  const parallaxOffset = scrollY * 0.15;

  // Define social links
  const socialLinks: SocialLink[] = [
    { icon: <Github size={20} />, href: "#github", label: "GitHub" },
    { icon: <Linkedin size={20} />, href: "#linkedin", label: "LinkedIn" },
    { icon: <Mail size={20} />, href: "#contact", label: "Email" },
  ];

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-screen  flex items-center justify-center relative overflow-hidden bg-ml-dark"
    >
      {/* Particle Background */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-20 bg-ml-primary animate-float"></div>
        <div className="absolute top-1/3 right-20 w-80 h-80 rounded-full blur-3xl opacity-15 bg-indigo-500 animate-pulse"></div>
        <div className="absolute -bottom-20 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-10 bg-ml-accent animate-float-slow"></div>
      </div>

      <div className="container z-10 px-4 sm:px-6 lg:px-8 mx-auto">
        <div
          className={`transition-all duration-1000 ease-out ${containerClasses}`}
        >
          <div className="grid grid-cols-1 mt-10 lg:grid-cols-12 gap-8 items-center">
            {/* LEFT: TEXT CONTENT (7 columns) */}
            <div className="lg:col-span-7 space-y-6">
              <div
                className="inline-block"
                style={{
                  animation: isVisible
                    ? "fadeSlideUp 0.8s ease forwards"
                    : "none",
                  opacity: 0,
                }}
              >
                <div className="inline-flex items-center space-x-2 mt-4 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10">
                  <Brain size={18} className="text-ml-accent" />
                  <span className="text-white/80">AI & ML Enthusiast</span>
                </div>
              </div>

              <h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                style={{
                  animation: isVisible
                    ? "fadeSlideUp 0.8s 0.2s ease forwards"
                    : "none",
                  opacity: 0,
                }}
              >
                Hi, I'm{" "}
                <span className="relative">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-ml-primary to-ml-accent animate-gradient-animation">
                    Hasibul Islam Nirjhar
                  </span>
                  <span className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-1 md:h-2 bg-gradient-to-r from-ml-primary to-ml-accent rounded opacity-70"></span>
                </span>
              </h1>

              <p
                className="text-xl text-white/80 leading-relaxed"
                style={{
                  animation: isVisible
                    ? "fadeSlideUp 0.8s 0.4s ease forwards"
                    : "none",
                  opacity: 0,
                }}
              >
                A passionate{" "}
                <span className="text-ml-primary font-semibold relative inline-block group">
                  Software Engineering
                  <span className="absolute -bottom-1 left-0 w-0 h-1 bg-ml-accent opacity-70 rounded group-hover:w-full transition-all duration-300"></span>
                </span>{" "}
                student exploring the frontiers of AI, Machine Learning, and Web
                Development.
              </p>

              {/* Social icons */}
              <div
                className="flex space-x-4 pt-2"
                style={{
                  animation: isVisible
                    ? "fadeSlideUp 0.8s 0.6s ease forwards"
                    : "none",
                  opacity: 0,
                }}
              >
                {socialLinks.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/30 hover:scale-110 transition-all duration-300"
                    style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>

              <div
                className="flex flex-wrap gap-4 pt-4"
                style={{
                  animation: isVisible
                    ? "fadeSlideUp 0.8s 0.8s ease forwards"
                    : "none",
                  opacity: 0,
                }}
              >
                <a
                  href="/resume.pdf"
                  download
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-ml-primary to-ml-accent rounded-lg text-white font-medium shadow-lg hover:shadow-ml-primary/40 transition-all duration-300 hover:scale-105 hover:-translate-y-1"
                >
                  <Download size={18} />
                  <span>Download CV</span>
                </a>
                <a
                  href="#contact"
                  className="flex items-center space-x-2 px-6 py-3 border border-white/20 rounded-lg text-white font-medium backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:border-white/40 hover:-translate-y-1"
                >
                  <span>Contact Me</span>
                  <ExternalLink size={16} />
                </a>
              </div>

              {/* Tech stack animation */}
              <div
                className="pt-6"
                style={{
                  animation: isVisible
                    ? "fadeSlideUp 0.8s 1s ease forwards"
                    : "none",
                  opacity: 0,
                }}
              >
                <p className="text-white/60 text-sm mb-3">
                  Technologies I work with:
                </p>
                <div className="flex flex-wrap gap-3">
                  {techStack.map((tech, index) => (
                    <div
                      key={tech.name}
                      className={`px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white/80 backdrop-blur-sm hover:scale-110 transition-all duration-300 group hover:bg-white/10 hover:shadow-lg`}
                      style={{
                        animationDelay: `${1.2 + index * 0.1}s`,
                        animation: isVisible
                          ? "fadeIn 0.5s ease forwards"
                          : "none",
                        opacity: 0,
                      }}
                    >
                      <div className="flex items-center space-x-1.5">
                        <span
                          className={`inline-block w-2 h-2 rounded-full ${tech.color}`}
                        ></span>
                        <span>{tech.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: PROFILE IMAGE + CODE (5 columns) */}
            <div className="lg:col-span-5 relative">
              {/* Floating elements */}
              <div className="absolute -top-10 -left-10 w-20 h-20 opacity-20 animate-spin-slow">
                <div className="absolute inset-0 border-4 border-dashed border-ml-primary rounded-full"></div>
              </div>
              <div className="absolute -bottom-5 -right-5 w-16 h-16 opacity-20 animate-spin-slow-reverse">
                <div className="absolute inset-0 border-4 border-dashed border-ml-accent rounded-full"></div>
              </div>

              {/* PROFILE IMAGE */}
              <div
                className="relative mx-auto w-40 h-40 md:w-48 md:h-48"
                style={{
                  animation: isVisible ? "fadeIn 1s ease forwards" : "none",
                  opacity: 0,
                  transform: isVisible
                    ? `translateY(${-parallaxOffset}px)`
                    : "translateY(20px)",
                  transition: "transform 0.3s ease-out",
                }}
              >
                <div className="absolute inset-0 blur-md bg-ml-primary/30 rounded-full animate-pulse"></div>
                <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-ml-accent/80 shadow-lg shadow-ml-primary/30 hover:scale-105 transition-transform duration-300">
                  <img
                    src="/profile.jpg"
                    alt="Hasibul Islam Nirjhar"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Orbiting circle */}
                <div className="absolute inset-0 animate-orbit pointer-events-none">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 w-4 h-4 rounded-full bg-ml-accent/70"></div>
                </div>
              </div>

              {/* CODE CARD */}
              <div
                className="relative z-10 p-2 md:p-4 rounded-2xl overflow-hidden mt-8 bg-[rgba(16,20,30,0.8)] backdrop-blur-md border border-white/10 shadow-lg hover:shadow-ml-primary/20 transition-all duration-300"
                style={{
                  animation: isVisible
                    ? "fadeIn 1s 0.3s ease forwards, floatAnimation 5s ease-in-out infinite"
                    : "none",
                  opacity: 0,
                  transform: isVisible
                    ? `translateY(${parallaxOffset * 0.5}px)`
                    : "translateY(40px)",
                  transition: "transform 0.3s ease-out",
                }}
              >
                <div className="coding-animation text-left p-4 bg-ml-dark rounded-lg overflow-hidden border border-white/10">
                  <div className="flex space-x-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>

                  <pre className="text-sm font-mono text-green-400 leading-relaxed overflow-x-auto">
                    <code>{displayedCode}</code>
                    <span
                      className={`h-4 w-2 bg-white/70 inline-block ${
                        typingComplete
                          ? "animate-pulse"
                          : "animate-typing-cursor"
                      }`}
                    ></span>
                  </pre>
                </div>

                {/* Floating ML icons */}
                <div className="absolute top-3 right-3 opacity-40 animate-float">
                  <Cpu size={20} className="text-ml-accent" />
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-2 -left-2 w-8 h-8 text-ml-primary/40 animate-spin-slow">
                  <div className="w-full h-full border-4 border-current rounded-full border-t-transparent"></div>
                </div>
              </div>

              {/* Small code snippets floating */}
              <div
                className="absolute -right-4 top-12 p-2 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm"
                style={{
                  animation:
                    "float 3s ease-in-out infinite, fadeIn 1s 0.8s forwards",
                  opacity: 0,
                }}
              >
                <div className="text-xs text-ml-accent font-mono">ML.run()</div>
              </div>

              <div
                className="absolute -left-2 bottom-8 p-2 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm"
                style={{
                  animation:
                    "float 4s ease-in-out infinite, fadeIn 1s 1s forwards",
                  animationDelay: "0.5s, 1s",
                  opacity: 0,
                }}
              >
                <div className="text-xs text-green-400 font-mono">
                  {"{"} AI: true {"}"}
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div
            className="mt-16 w-full flex justify-center"
            style={{
              animation: isVisible ? "fadeIn 1s 1.2s ease forwards" : "none",
              opacity: 0,
            }}
          >
            <a
              href="#about"
              className="flex flex-col items-center justify-center text-white/60 hover:text-white transition-colors animate-bounce"
              onClick={(e) => {
                e.preventDefault();
                const aboutSection = document.getElementById("about");
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <span className="mb-2 text-sm">Scroll Down</span>
              <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center">
                <ArrowDown size={16} />
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Global animation styles */}
      <style jsx global>{`
        @keyframes fadeSlideUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes floatAnimation {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes orbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes typing-cursor {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        .animate-float-slow {
          animation: floatAnimation 8s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin 8s linear infinite;
        }

        .animate-spin-slow-reverse {
          animation: spin 8s linear infinite reverse;
        }

        .animate-orbit {
          animation: orbit 8s linear infinite;
        }

        .animate-gradient-animation {
          background-size: 200% 200%;
          animation: gradientAnimation 4s ease infinite;
        }

        @keyframes gradientAnimation {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
