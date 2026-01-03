
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
    
    const ctx = canvas.getContext('2d', { alpha: true }); // Optimized context
    if (!ctx) return;
    
    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasSize();
    
    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(setCanvasSize, 100);
    };

    window.addEventListener('resize', handleResize);
    
    // Create particles
    const createParticles = () => {
      const particles: Particle[] = [];
      // Reduce particle count slightly for performance on lower-end devices
      const isMobile = window.innerWidth < 768;
      const particleCount = Math.min(window.innerWidth / (isMobile ? 15 : 12), isMobile ? 50 : 80); 
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: Math.random() * 0.8 - 0.4, // Slightly slower for smoother feel
          speedY: Math.random() * 0.8 - 0.4,
          color: getRandomColor(),
        });
      }
      
      particlesRef.current = particles;
    };
    
    const getRandomColor = () => {
      const colors = ['#9b87f5', '#D6BCFA', '#1EAEDB', '#8a76e4'];
      return colors[Math.floor(Math.random() * colors.length)];
    };
    
    // Pre-calculate squared distances to avoid Math.sqrt
    const CONNECTION_DIST_SQ = 100 * 100;
    const MOUSE_DIST_SQ = 120 * 120;
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const particles = particlesRef.current;
      const len = particles.length;
      const mouseX = mousePosition.current.x;
      const mouseY = mousePosition.current.y;

      // Update and Draw loop optimized
      for (let i = 0; i < len; i++) {
        const p1 = particles[i];
        
        // Update position
        p1.x += p1.speedX;
        p1.y += p1.speedY;
        
        // Bounce off walls
        if (p1.x < 0 || p1.x > canvas.width) p1.speedX *= -1;
        if (p1.y < 0 || p1.y > canvas.height) p1.speedY *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.size, 0, Math.PI * 2);
        ctx.fillStyle = p1.color;
        
        // Batch global alpha for particles? No, they might be different in future.
        // But keeping it simple:
        ctx.globalAlpha = 0.5;
        ctx.fill();
        
        // Mouse connections (Squared distance)
        // Only if mouse has moved at least once (initial is 0,0)
        if (mouseX > 0 || mouseY > 0) {
          const dx = mouseX - p1.x;
          const dy = mouseY - p1.y;
          const distSq = dx * dx + dy * dy;
          
          if (distSq < MOUSE_DIST_SQ) {
            ctx.beginPath();
            ctx.strokeStyle = p1.color;
            ctx.globalAlpha = 0.2 * (1 - Math.sqrt(distSq) / 120); // sqrt needed for linear fade, but acceptable once per close particle
            ctx.lineWidth = 1;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
          }
        }

        // Particle-to-Particle connections (Optimized loop: j = i + 1)
        for (let j = i + 1; j < len; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx*dx + dy*dy;
          
          if (distSq < CONNECTION_DIST_SQ) {
            ctx.beginPath();
            ctx.strokeStyle = p1.color;
            ctx.globalAlpha = 0.1 * (1 - Math.sqrt(distSq) / 100);
            ctx.lineWidth = 0.5;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      
      animationFrameId.current = requestAnimationFrame(animate);
    };
    
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current.x = event.clientX;
      mousePosition.current.y = event.clientY;
    };
    
    // Use passive listener for better scroll performance
    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    // Start animation
    createParticles();
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
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
