
import { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
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
              <a href="#about" className="animated-underline text-white hover:text-ml-primary transition-colors">
                About
              </a>
              <a href="#skills" className="animated-underline text-white hover:text-ml-primary transition-colors">
                Skills
              </a>
              <a href="#projects" className="animated-underline text-white hover:text-ml-primary transition-colors">
                Projects
              </a>
              <a href="#contact" className="animated-underline text-white hover:text-ml-primary transition-colors">
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
    className="text-white hover:text-ml-primary transition-colors"
  >
    <Github size={20} />
  </a>
  <a 
    href="https://www.linkedin.com/in/hasibul-islam-nirjhar-b50925262/" 
    target="_blank" 
    rel="noopener noreferrer"
    aria-label="Visit Hasibul's LinkedIn"
    className="text-white hover:text-ml-primary transition-colors"
  >
    <Linkedin size={20} />
  </a>
</div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-ml-primary focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-ml-dark/90 backdrop-blur-lg">
          <a
            href="#about"
            className="block px-3 py-2 rounded-md text-white hover:bg-ml-primary/20"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </a>
          <a
            href="#skills"
            className="block px-3 py-2 rounded-md text-white hover:bg-ml-primary/20"
            onClick={() => setIsMenuOpen(false)}
          >
            Skills
          </a>
          <a
            href="#projects"
            className="block px-3 py-2 rounded-md text-white hover:bg-ml-primary/20"
            onClick={() => setIsMenuOpen(false)}
          >
            Projects
          </a>
          <a
            href="#contact"
            className="block px-3 py-2 rounded-md text-white hover:bg-ml-primary/20"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </a>
          
          <div className="flex space-x-4 px-3 py-2">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-ml-primary transition-colors"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-ml-primary transition-colors"
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
