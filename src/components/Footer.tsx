
import { useState, useEffect } from 'react';
import { MapPin, Mail, Phone, Leaf, Facebook, Instagram, FileText, Shield, ScrollText } from 'lucide-react';
import Terms from './Terms';
import LegalInfo from './LegalInfo';
import OptimizedImage from './OptimizedImage';
import OrganizeMySpaceLogo from '@/assets/organize-my-space-logo.png';

const Footer = () => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isLegalInfoOpen, setIsLegalInfoOpen] = useState(false);
  const [legalInfoTab, setLegalInfoTab] = useState<string>("impressum");
  const [logoLoaded, setLogoLoaded] = useState(false);
  
  const openTerms = () => setIsTermsOpen(true);
  const closeTerms = () => setIsTermsOpen(false);
  
  const openLegalInfo = (tab: string) => {
    setLegalInfoTab(tab);
    setIsLegalInfoOpen(true);
  };
  const closeLegalInfo = () => setIsLegalInfoOpen(false);
  
  useEffect(() => {
    console.log('Organize My Space Logo Path:', OrganizeMySpaceLogo);
  }, []);

  const handleLogoLoad = () => {
    setLogoLoaded(true);
    console.log("Logo loaded successfully");
  };

  return (
    <footer className="py-16 bg-[#E8F1E8] text-forest relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4 mb-4">
              <a href="#home" className="flex items-center gap-2 text-forest">
                <Leaf size={24} className="text-moss" />
                <span className="font-serif text-2xl font-medium inline-block">
                  Mindset <span className="text-moss">Coach Martina</span>
                </span>
              </a>
            </div>
            
            <p className="text-forest/90 max-w-md mb-6">
              Mit dem richtigen Mindset sind deinen Möglichkeiten keine Grenzen gesetzt. Entfalte dein volles Potenzial und erschaffe das Leben, von dem du träumst.
            </p>
            <div className="flex items-center space-x-6">
              <a 
                href="https://ne-np.facebook.com/organizemyspace.ch/" 
                target="_blank" 
                rel="nofollow noopener noreferrer" 
                className="w-10 h-10 flex items-center justify-center bg-forest/10 text-forest hover:bg-forest/20 transition-colors rounded-full"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://www.instagram.com/organize.my.space/" 
                target="_blank" 
                rel="nofollow noopener noreferrer" 
                className="w-10 h-10 flex items-center justify-center bg-forest/10 text-forest hover:bg-forest/20 transition-colors rounded-full"
              >
                <Instagram size={18} />
              </a>
              
              <div className="flex flex-col items-center">
                <a 
                  href="https://organize-my-space.ch" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex flex-col items-center"
                >
                  <img 
                    src={OrganizeMySpaceLogo} 
                    alt="Organize My Space Logo" 
                    className="h-12 w-auto object-contain"
                    onLoad={handleLogoLoad}
                    style={{ zIndex: 5 }}
                  />
                  <span className="text-xs text-moss mt-1">Partner</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <h4 className="font-serif text-lg font-medium mb-4 text-moss">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-forest/80 hover:text-moss transition-colors">Mindset Coaching</a>
              </li>
              <li>
                <a href="#about" className="text-forest/80 hover:text-moss transition-colors">Über mich</a>
              </li>
              <li>
                <a href="#pricing" className="text-forest/80 hover:text-moss transition-colors">Preise</a>
              </li>
              <li>
                <a href="#contact" className="text-forest/80 hover:text-moss transition-colors">Kontakt</a>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-4">
            <h4 className="font-serif text-lg font-medium mb-4 text-moss">Kontakt</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-moss flex-shrink-0 mt-0.5" />
                <span className="text-forest/80">
                  Ruedi-Walter-strasse 4<br />
                  8050 Zürich
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-moss flex-shrink-0" />
                <a href="mailto:info@mindset-coach-martina.ch" className="text-forest/80 hover:text-moss transition-colors">
                  info@mindset-coach-martina.ch
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-moss flex-shrink-0" />
                <a href="tel:+41788400481" className="text-forest/80 hover:text-moss transition-colors">
                  078 840 04 81
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-forest/20 pt-8">
          <div className="flex justify-center items-center gap-8 text-center">
            <button 
              onClick={openTerms} 
              className="text-forest/75 text-sm hover:text-moss transition-colors flex items-center gap-1"
            >
              <ScrollText size={14} />
              <span>AGB</span>
            </button>
            <button 
              onClick={() => openLegalInfo("impressum")} 
              className="text-forest/75 text-sm hover:text-moss transition-colors flex items-center gap-1"
            >
              <FileText size={14} />
              <span>Impressum</span>
            </button>
            <button 
              onClick={() => openLegalInfo("datenschutz")} 
              className="text-forest/75 text-sm hover:text-moss transition-colors flex items-center gap-1"
            >
              <Shield size={14} />
              <span>Datenschutz</span>
            </button>
          </div>
        </div>
      </div>
      
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
