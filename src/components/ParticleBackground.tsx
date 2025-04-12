
import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
}

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mousePosition = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Create particles
    const createParticles = () => {
      const particles: Particle[] = [];
      const particleCount = Math.min(window.innerWidth / 10, 100); // Limit based on screen size
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: Math.random() * 1 - 0.5,
          speedY: Math.random() * 1 - 0.5,
          color: getRandomColor(),
        });
      }
      
      particlesRef.current = particles;
    };
    
    const getRandomColor = () => {
      const colors = ['#9b87f5', '#D6BCFA', '#1EAEDB', '#8a76e4'];
      return colors[Math.floor(Math.random() * colors.length)];
    };
    
    // Update particle positions
    const updateParticles = () => {
      particlesRef.current.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }
      });
    };
    
    // Draw particles & connections
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = 0.5;
        ctx.fill();
        
        // Draw connections near mouse
        if (mousePosition.current.x > 0) {
          const dx = mousePosition.current.x - particle.x;
          const dy = mousePosition.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = 0.2 * (1 - distance / 120);
            ctx.lineWidth = 1;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(mousePosition.current.x, mousePosition.current.y);
            ctx.stroke();
          }
        }
        
        // Draw connections between close particles
        particlesRef.current.forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = particle.color;
            ctx.globalAlpha = 0.1 * (1 - distance / 100);
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });
    };
    
    // Animation loop
    const animate = () => {
      updateParticles();
      drawParticles();
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = {
        x: event.clientX,
        y: event.clientY,
      };
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    
    // Start animation
    createParticles();
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      className="particles-container"
      style={{ opacity: 0.3 }}
    />
  );
};

export default ParticleBackground;
