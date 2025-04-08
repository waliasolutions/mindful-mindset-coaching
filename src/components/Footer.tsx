
import { useState, useEffect } from 'react';
import { MapPin, Mail, Phone, Leaf, Facebook, Instagram, FileText, Shield, ScrollText } from 'lucide-react';
import Terms from './Terms';
import LegalInfo from './LegalInfo';

const Footer = () => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isLegalInfoOpen, setIsLegalInfoOpen] = useState(false);
  const [legalInfoTab, setLegalInfoTab] = useState<string>("impressum");
  
  const openTerms = () => setIsTermsOpen(true);
  const closeTerms = () => setIsTermsOpen(false);
  
  const openLegalInfo = (tab: string) => {
    setLegalInfoTab(tab);
    setIsLegalInfoOpen(true);
  };
  const closeLegalInfo = () => setIsLegalInfoOpen(false);
  
  return (
    <footer className="py-16 bg-forest text-white relative overflow-hidden">
      {/* Decorative leaf pattern */}
      <div className="absolute inset-0 opacity-5 leaf-pattern -z-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-5">
            <a href="#home" className="flex items-center gap-2 mb-4 text-white">
              <Leaf size={24} className="text-mint" />
              <span className="font-serif text-2xl font-medium inline-block">
                Mindful <span className="text-mint">Mindset</span>
              </span>
            </a>
            <p className="text-white/80 max-w-md mb-6">
              Mit dem richtigen Mindset sind deinen Möglichkeiten keine Grenzen gesetzt. Entfalte dein volles Potenzial und erschaffe das Leben, von dem du träumst.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-colors rounded-full">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-colors rounded-full">
                <Instagram size={18} />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <h4 className="font-serif text-lg font-medium mb-4 text-mint">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-white/70 hover:text-mint transition-colors">Mindset Coaching</a>
              </li>
              <li>
                <a href="#about" className="text-white/70 hover:text-mint transition-colors">Über mich</a>
              </li>
              <li>
                <a href="#pricing" className="text-white/70 hover:text-mint transition-colors">Preise</a>
              </li>
              <li>
                <a href="#contact" className="text-white/70 hover:text-mint transition-colors">Kontakt</a>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-4">
            <h4 className="font-serif text-lg font-medium mb-4 text-mint">Kontakt</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-mint flex-shrink-0 mt-0.5" />
                <span className="text-white/70">
                  Ruedi-Walter-strasse 4<br />
                  8050 Zürich
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-mint flex-shrink-0" />
                <a href="mailto:info@martinadomeniconi.ch" className="text-white/70 hover:text-mint transition-colors">
                  info@martinadomeniconi.ch
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-mint flex-shrink-0" />
                <a href="tel:+41788400481" className="text-white/70 hover:text-mint transition-colors">
                  078 840 04 81
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/20 pt-8">
          <div className="flex justify-center items-center gap-8 text-center">
            <button 
              onClick={openTerms} 
              className="text-white/60 text-sm hover:text-mint transition-colors flex items-center gap-1"
            >
              <ScrollText size={14} />
              <span>AGB</span>
            </button>
            <button 
              onClick={() => openLegalInfo("impressum")} 
              className="text-white/60 text-sm hover:text-mint transition-colors flex items-center gap-1"
            >
              <FileText size={14} />
              <span>Impressum</span>
            </button>
            <button 
              onClick={() => openLegalInfo("datenschutz")} 
              className="text-white/60 text-sm hover:text-mint transition-colors flex items-center gap-1"
            >
              <Shield size={14} />
              <span>Datenschutz</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Legal popups */}
      <Terms isOpen={isTermsOpen} onClose={closeTerms} />
      <LegalInfo 
        isOpen={isLegalInfoOpen} 
        onClose={closeLegalInfo} 
        defaultTab={legalInfoTab} 
      />
    </footer>
  );
};

export default Footer;
