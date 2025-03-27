
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 bg-beige/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#home" className="text-petrol font-serif text-xl font-medium">
              Mindful <span className="text-mauve">Mindset</span>
            </a>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
            <a href="#home" className="text-foreground/70 hover:text-petrol transition-colors">
              Home
            </a>
            <a href="#about" className="text-foreground/70 hover:text-petrol transition-colors">
              Über mich
            </a>
            <a href="#services" className="text-foreground/70 hover:text-petrol transition-colors">
              Angebot
            </a>
            <a href="#pricing" className="text-foreground/70 hover:text-petrol transition-colors">
              Preise
            </a>
            <a href="#contact" className="text-foreground/70 hover:text-petrol transition-colors">
              Kontakt
            </a>
          </div>
        </div>
        
        <div className="border-t border-sage/20 mt-8 pt-8 text-center">
          <p className="text-foreground/60 text-sm">
            © {currentYear} Martina Domeniconi. Alle Rechte vorbehalten.
          </p>
          <p className="text-foreground/60 text-sm mt-2 flex items-center justify-center">
            Made with <Heart size={12} className="text-mauve mx-1" /> for mindful mothers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
