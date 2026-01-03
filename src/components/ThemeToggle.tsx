import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { flushSync } from 'react-dom';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggle = async () => {
    // Fallback if View Transitions API is not supported
    if (!(document as any).startViewTransition) {
      toggleTheme();
      return;
    }

    const button = buttonRef.current;
    if (!button) return;

    await (document as any).startViewTransition(() => {
      flushSync(() => {
        toggleTheme();
        
        // Manual DOM update to ensure View Transition captures the new state immediately
        // (Since context useEffect runs slightly later)
        const root = document.documentElement;
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        
        if (newTheme === 'dark') {
          root.classList.remove('light');
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
          root.classList.add('light');
        }
      });
    }).ready;

    // Get button geometry for the ripple effect origin
    const { top, left, width, height } = button.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    
    // Calculate the radius needed to cover the whole screen
    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRadius = Math.hypot(
      Math.max(left, right),
      Math.max(top, bottom)
    );

    // Animate the clip-path
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      }
    );
  };

  return (
    <motion.button
      ref={buttonRef}
      onClick={handleToggle}
      className={`relative p-2.5 rounded-full backdrop-blur-sm transition-all duration-300 group z-50 ${
        theme === 'dark' 
          ? 'bg-white/10 border border-white/20 hover:border-yellow-400/50 hover:bg-white/15' 
          : 'bg-slate-900/10 border border-slate-300/50 hover:border-indigo-500/50 hover:bg-slate-900/15'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
        ) : (
          <Moon className="w-5 h-5 text-indigo-600 group-hover:text-indigo-500 transition-colors" />
        )}
      </motion.div>
      
      {/* Glow effect */}
      <div className={`absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity -z-10 ${
        theme === 'dark' ? 'bg-yellow-400/30' : 'bg-indigo-500/30'
      }`} />
    </motion.button>
  );
};

export default ThemeToggle;
