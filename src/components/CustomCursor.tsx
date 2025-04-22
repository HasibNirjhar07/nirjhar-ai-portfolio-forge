// components/CustomCursor.tsx
import { useState, useEffect } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

const CustomCursor = (): JSX.Element => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [clicked, setClicked] = useState<boolean>(false);
  
  useEffect(() => {
    // Hide the default cursor
    document.body.style.cursor = 'none';
    
    // Add robotic click sound
    const clickSound = new Audio('/robot-click.mp3');
    
    const updatePosition = (e: MouseEvent): void => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleClick = (): void => {
      // Play sound
      clickSound.currentTime = 0;
      clickSound.play();
      
      // Animate cursor
      setClicked(true);
      setTimeout(() => setClicked(false), 150);
    };
    
    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('click', handleClick);
    
    return () => {
      document.body.style.cursor = 'default';
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('click', handleClick);
    };
  }, []);
  
  return (
    <div 
      className={`custom-cursor ${clicked ? 'cursor-clicked' : ''}`} 
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
      }}
    />
  );
};

export default CustomCursor;