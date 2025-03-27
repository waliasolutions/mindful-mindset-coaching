
import { Heart, MapPin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-16 bg-beige/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sage/40 to-transparent"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-5">
            <a href="#home" className="text-petrol font-serif text-2xl font-medium inline-block mb-4">
              Mindful <span className="text-mauve">Mindset</span>
            </a>
            <p className="text-foreground/70 max-w-md mb-6">
              Mit dem richtigen Mindset sind deinen Möglichkeiten keine Grenzen gesetzt. Entfalte dein volles Potenzial und erschaffe das Leben, von dem du träumst.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#contact" className="w-10 h-10 flex items-center justify-center bg-petrol/10 text-petrol hover:bg-petrol/20 transition-colors">
                <Mail size={18} />
              </a>
              <a href="tel:+41788400481" className="w-10 h-10 flex items-center justify-center bg-petrol/10 text-petrol hover:bg-petrol/20 transition-colors">
                <Phone size={18} />
              </a>
              <a href="#contact" className="w-10 h-10 flex items-center justify-center bg-petrol/10 text-petrol hover:bg-petrol/20 transition-colors">
                <MapPin size={18} />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <h4 className="font-serif text-lg font-medium mb-4">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-foreground/70 hover:text-petrol transition-colors">Home</a>
              </li>
              <li>
                <a href="#services" className="text-foreground/70 hover:text-petrol transition-colors">Mindset Coaching</a>
              </li>
              <li>
                <a href="#about" className="text-foreground/70 hover:text-petrol transition-colors">Über mich</a>
              </li>
              <li>
                <a href="#pricing" className="text-foreground/70 hover:text-petrol transition-colors">Preise</a>
              </li>
              <li>
                <a href="#contact" className="text-foreground/70 hover:text-petrol transition-colors">Kontakt</a>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-4">
            <h4 className="font-serif text-lg font-medium mb-4">Kontakt</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-petrol flex-shrink-0 mt-0.5" />
                <span className="text-foreground/70">
                  Ruedi-Walter-strasse 4<br />
                  8050 Zürich
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-petrol flex-shrink-0" />
                <a href="mailto:info@martinadomeniconi.ch" className="text-foreground/70 hover:text-petrol transition-colors">
                  info@martinadomeniconi.ch
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-petrol flex-shrink-0" />
                <a href="tel:+41788400481" className="text-foreground/70 hover:text-petrol transition-colors">
                  078 840 04 81
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-sage/20 pt-8 text-center">
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
