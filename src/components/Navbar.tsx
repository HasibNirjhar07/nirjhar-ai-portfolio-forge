import { useState, useEffect } from 'react';
import { Github, Linkedin } from 'lucide-react';
import StaggeredMenu from './StaggeredMenu';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
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

  return (
    <StaggeredMenu
      items={menuItems}
      socialItems={socialItems}
      isFixed={true}
      colors={["#1A1F2C", "#9b87f5"]}
      menuButtonColor="#ffffff"
      openMenuButtonColor="#000000"
      accentColor="#9b87f5"
      headerClassName={`transition-all duration-300 ease-in-out ${
        isScrolled ? 'bg-ml-dark/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
      logoContent={
        <a href="#hero" className="text-xl font-bold text-gradient pointer-events-auto">
          Nirjhar<span className="text-ml-accent">.dev</span>
        </a>
      }
    />
  );
};

export default Navbar;