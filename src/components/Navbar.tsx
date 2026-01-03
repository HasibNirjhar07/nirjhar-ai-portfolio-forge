import { useState, useEffect } from 'react';
import { Github, Linkedin } from 'lucide-react';
import StaggeredMenu from './StaggeredMenu';
import ThemeToggle from './ThemeToggle';

import { useTheme } from '@/context/ThemeContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'About', link: '#about', ariaLabel: 'About Section' },
    { label: 'Skills', link: '#skills', ariaLabel: 'Skills Section' },
    { label: 'Projects', link: '#projects', ariaLabel: 'Projects Section' },
    { label: 'Contact', link: '#contact', ariaLabel: 'Contact Section' },
  ];

  const socialItems = [
    { label: <Github size={20} />, link: 'https://github.com/HasibNirjhar07' },
    { label: <Linkedin size={20} />, link: 'https://www.linkedin.com/in/hasibul-islam-nirjhar-b50925262/' },
  ];

  // Determine button color based on theme
  // In light mode, use black. In dark mode, use white.
  // Exception: If menu is open, the panel is dark (based on colors prop), so close button should be white?
  // The 'openMenuButtonColor' prop handles the close button color.
  // The 'menuButtonColor' handles the hamburger button color.
  
  const menuBtnColor = theme === 'light' ? '#000000' : '#ffffff';
  const openMenuBtnColor = '#ffffff'; // Keep white for contrast against dark menu panel

  return (
    <StaggeredMenu
      items={menuItems}
      socialItems={socialItems}
      isFixed={true}
      colors={["#1A1F2C", "#9b87f5"]}
      menuButtonColor={menuBtnColor}
      openMenuButtonColor={openMenuBtnColor}
      accentColor="#9b87f5"
      headerClassName={`transition-all duration-300 ease-in-out ${
        isScrolled ? 'bg-ml-dark/80 dark:bg-ml-dark/80 light:bg-white/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
      logoContent={
        <div className="flex items-center gap-4 pointer-events-auto">
          <a href="#hero" className="text-xl font-bold text-gradient">
            Nirjhar<span className="text-ml-accent">.dev</span>
          </a>
          <ThemeToggle />
        </div>
      }
    />
  );
};

export default Navbar;
