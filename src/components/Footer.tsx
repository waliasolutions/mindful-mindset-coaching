
import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 bg-beige">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-sage/10 pb-8 mb-8">
          <div className="mb-6 md:mb-0">
            <a href="#home" className="text-petrol font-sans text-xl font-semibold tracking-tight">
              Mindful <span className="text-sage">Mindset</span>
            </a>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
            <a href="#home" className="text-sage hover:text-petrol transition-colors text-sm">
              Home
            </a>
            <a href="#about" className="text-sage hover:text-petrol transition-colors text-sm">
              Über mich
            </a>
            <a href="#services" className="text-sage hover:text-petrol transition-colors text-sm">
              Angebot
            </a>
            <a href="#pricing" className="text-sage hover:text-petrol transition-colors text-sm">
              Preise
            </a>
            <a href="#contact" className="text-sage hover:text-petrol transition-colors text-sm">
              Kontakt
            </a>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-sage text-sm">
            © {currentYear} Martina Domeniconi. Alle Rechte vorbehalten.
          </p>
          <p className="text-sage text-sm mt-2 flex items-center justify-center">
            Made with <Heart size={12} className="text-petrol mx-1" /> for mindful mothers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
