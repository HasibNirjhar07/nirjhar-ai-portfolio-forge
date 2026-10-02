import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Github, Linkedin } from 'lucide-react';
import StaggeredMenu from './StaggeredMenu';
import ThemeToggle from './ThemeToggle';
import NavLogo from './NavLogo';
import { useTheme } from '@/context/ThemeContext';
import './nav.css';

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

// Inline quick links, in page order.
const quickLinks = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Work' },
  { id: 'skills', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
];

/** Tracks the section under ~40% of the viewport height. */
const useActiveSection = () => {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const onScroll = () => {
      const probe = window.innerHeight * 0.4;
      let current: string | null = null;
      for (const { id } of quickLinks) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= probe) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return active;
};

/** Hidden while scrolling down, revealed on scroll up or near the top. */
const useHideOnScroll = () => {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (Math.abs(y - last) < 6) return;
      setHidden(y > last && y > 160);
      last = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return { hidden, scrolled };
};

const QuickLinks = ({ active }: { active: string | null }) => {
  const navRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [pill, setPill] = useState({ x: 0, w: 0, visible: false });
  const target = hovered ?? active;

  useLayoutEffect(() => {
    const nav = navRef.current;
    const el = target ? nav?.querySelector<HTMLElement>(`[data-id="${target}"]`) : null;
    if (!el) {
      setPill((p) => ({ ...p, visible: false }));
      return;
    }
    setPill({ x: el.offsetLeft, w: el.offsetWidth, visible: true });
  }, [target]);

  return (
    <nav className="nv-links" ref={navRef} aria-label="Sections" onMouseLeave={() => setHovered(null)}>
      <span
        className="nv-indicator"
        aria-hidden="true"
        style={{ transform: `translateX(${pill.x}px)`, width: pill.w, opacity: pill.visible ? 1 : 0 }}
      />
      {quickLinks.map((l) => (
        <a
          key={l.id}
          href={`#${l.id}`}
          data-id={l.id}
          className={target === l.id ? 'is-on' : ''}
          aria-current={active === l.id ? 'true' : undefined}
          onMouseEnter={() => setHovered(l.id)}
        >
          {l.label}
        </a>
      ))}
      <span className="nv-sep" aria-hidden="true" />
      <div className="nv-theme">
        <ThemeToggle />
      </div>
    </nav>
  );
};

const Navbar = () => {
  const { theme } = useTheme();
  const active = useActiveSection();
  const { hidden, scrolled } = useHideOnScroll();
  const [menuOpen, setMenuOpen] = useState(false);

  const ink = theme === 'light' ? '#14111d' : '#eeecf7';
  const collapsed = hidden && !menuOpen;
  const stateClass = `${collapsed ? 'nv-hidden' : ''} ${scrolled ? 'nv-scrolled' : ''} ${menuOpen ? 'nv-open' : ''}`;

  return (
    <div className={`nv ${stateClass}`}>
      <StaggeredMenu
        className="nv-menu"
        items={menuItems}
        socialItems={socialItems}
        isFixed={true}
        colors={theme === 'light' ? ['#cfc4ff', '#9b87f5'] : ['#9b87f5', '#38e1ff']}
        menuButtonColor={ink}
        openMenuButtonColor={ink}
        changeMenuColorOnOpen={false}
        accentColor={theme === 'light' ? '#6a4cf5' : '#9b87f5'}
        headerClassName="nv-header"
        onMenuOpen={() => setMenuOpen(true)}
        onMenuClose={() => setMenuOpen(false)}
        logoContent={
          <div className="nv-left">
            <NavLogo />
            <div className="nv-theme nv-theme-mobile">
              <ThemeToggle />
            </div>
          </div>
        }
      />
      <QuickLinks active={active} />
    </div>
  );
};

export default Navbar;
