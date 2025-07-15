import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useSmoothScroll } from '@/hooks/use-smooth-scroll';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('services');
  const { scrollToElement } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      const sections = ['services', 'about', 'pricing', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
    e.preventDefault();
    scrollToElement(targetId);
    setActiveSection(targetId);
    
    if (isMenuOpen) {
      closeMenu();
    }
  };

  const navLinks = [
    { name: 'Mindset Coaching', href: '#services', id: 'services' },
    { name: 'Über mich', href: '#about', id: 'about' },
    { name: 'Preise', href: '#pricing', id: 'pricing' },
    { name: 'Kontakt', href: '#contact', id: 'contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-beige/80 shadow-md backdrop-blur-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <a 
            href="#services" 
            onClick={(e) => handleSmoothScroll(e, 'services')}
            className="flex items-center gap-2"
          >
            <img 
              src="/lovable-uploads/08e0eec6-35ce-426a-86e7-bc5626f9f9d1.png" 
              alt="Mindset Coach Martina Logo" 
              className="w-8 h-8 object-contain"
            />
            <span className="text-forest font-serif text-2xl md:text-3xl lg:text-4xl font-medium">
              Mindset <span className="text-petrol">Coach Martina</span>
            </span>
          </a>

          <div className="hidden md:flex space-x-4 lg:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.id)}
                className={`${
                  activeSection === link.id 
                    ? 'text-petrol font-medium' 
                    : 'text-foreground hover:text-moss'
                } transition-colors link-hover focus-ring text-sm lg:text-base`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <button
            className="md:hidden text-forest focus:outline-none focus-ring rounded-md p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-beige/90 backdrop-blur-sm shadow-lg animate-fade-in mb-8">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.id)}
                className={`${
                  activeSection === link.id 
                    ? 'text-petrol font-medium' 
                    : 'text-foreground hover:text-moss'
                } py-2 transition-colors focus-ring`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
