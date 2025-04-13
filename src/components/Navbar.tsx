import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? 'bg-ml-dark/80 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="#hero" className="text-xl font-bold text-gradient">
              Nirjhar<span className="text-ml-accent">.dev</span>
            </a>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <a href="#about" className="animated-underline text-white hover:text-ml-primary transition-colors duration-200 ease-in-out">
                About
              </a>
              <a href="#skills" className="animated-underline text-white hover:text-ml-primary transition-colors duration-200 ease-in-out">
                Skills
              </a>
              <a href="#projects" className="animated-underline text-white hover:text-ml-primary transition-colors duration-200 ease-in-out">
                Projects
              </a>
              <a href="#contact" className="animated-underline text-white hover:text-ml-primary transition-colors duration-200 ease-in-out">
                Contact
              </a>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="https://github.com/HasibNirjhar07" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Visit Hasibul's GitHub"
              className="text-white hover:text-ml-primary transition-colors duration-200 ease-in-out relative group"
            >
              <Github size={20} />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ml-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a 
              href="https://www.linkedin.com/in/hasibul-islam-nirjhar-b50925262/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Visit Hasibul's LinkedIn"
              className="text-white hover:text-ml-primary transition-colors duration-200 ease-in-out relative group"
            >
              <Linkedin size={20} />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-ml-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-ml-primary focus:outline-none transition-all duration-300 ease-in-out transform hover:scale-110"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <Menu 
                  size={24} 
                  className={`absolute transition-all duration-300 ease-in-out ${
                    isMenuOpen ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                  }`}
                />
                <X 
                  size={24} 
                  className={`absolute transition-all duration-300 ease-in-out ${
                    isMenuOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-ml-dark/95 backdrop-blur-lg">
          {['about', 'skills', 'projects', 'contact'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className="block px-3 py-2 rounded-md text-white hover:bg-ml-primary/20 transition-all duration-200 ease-in-out transform hover:translate-x-1"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
          
          <div className="flex space-x-4 px-3 py-2">
            <a 
              href="https://github.com/HasibNirjhar07" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-ml-primary transition-all duration-200 ease-in-out transform hover:scale-110"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/hasibul-islam-nirjhar-b50925262/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-ml-primary transition-all duration-200 ease-in-out transform hover:scale-110"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;