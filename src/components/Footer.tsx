
import { useState } from 'react';
import { MapPin, Mail, Phone, Leaf, Facebook, Instagram, FileText, Shield, ScrollText } from 'lucide-react';
import Terms from './Terms';
import LegalInfo from './LegalInfo';
import { AspectRatio } from "./ui/aspect-ratio";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import OptimizedImage from './OptimizedImage';

// Define the interface for logo settings to prevent excessive type instantiation
interface LogoSettings {
  url: string | null;
  alt: string;
}

const Footer = () => {
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isLegalInfoOpen, setIsLegalInfoOpen] = useState(false);
  const [legalInfoTab, setLegalInfoTab] = useState<string>("impressum");

  // Define the return type explicitly to avoid type instantiation issues
  const {
    data: logoSettings
  } = useQuery<LogoSettings>({
    queryKey: ['site-settings', 'partner_logo'],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from('site_settings').select('settings').eq('name', 'partner_logo').maybeSingle();
      if (error && error.code !== 'PGRST116') {
        console.error("Error fetching logo:", error);
        return {
          url: null,
          alt: "Organize My Space Logo"
        };
      }
      if (data?.settings && typeof data.settings === 'object') {
        const settings = data.settings as Record<string, unknown>;
        return {
          url: typeof settings.url === 'string' ? settings.url : null,
          alt: typeof settings.alt === 'string' ? settings.alt : "Organize My Space Logo"
        };
      }
      return {
        url: null,
        alt: "Organize My Space Logo"
      };
    }
  });

  const openTerms = () => setIsTermsOpen(true);
  const closeTerms = () => setIsTermsOpen(false);
  const openLegalInfo = (tab: string) => {
    setLegalInfoTab(tab);
    setIsLegalInfoOpen(true);
  };
  const closeLegalInfo = () => setIsLegalInfoOpen(false);
  
  return <footer className="py-16 bg-[#E8F1E8] text-forest relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-4">
              <a href="#home" className="flex items-center gap-2 text-forest">
                <Leaf size={24} className="text-moss" />
                <span className="font-serif text-2xl font-medium">
                  Mindset <span className="text-moss">Coach Martina</span>
                </span>
              </a>
            </div>
            
            <p className="text-forest/90 max-w-md">
              Mit dem richtigen Mindset sind deinen Möglichkeiten keine Grenzen gesetzt. 
              Entfalte dein volles Potenzial und erschaffe das Leben, von dem du träumst.
            </p>

            <div className="flex items-center gap-6">
              <a href="https://ne-np.facebook.com/organizemyspace.ch/" target="_blank" rel="nofollow noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-forest/10 text-forest hover:bg-forest/20 transition-colors rounded-full" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com/organize.my.space/" target="_blank" rel="nofollow noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-forest/10 text-forest hover:bg-forest/20 transition-colors rounded-full" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              
              <div className="relative w-36">
                <a href="https://organize-my-space.ch" target="_blank" rel="noopener noreferrer" className="block" aria-label="Organize My Space">
                  <div className="relative">
                    <AspectRatio ratio={4 / 3} className="w-full">
                      <img src="/lovable-uploads/0bacd932-81ec-4c1b-b330-546f5a1116dd.png" alt={logoSettings?.alt || "Organize My Space Logo"} className="w-full h-full object-contain" />
                    </AspectRatio>
                    <span className="text-xs text-moss absolute bottom-0 right-0 font-normal mx-[45px]">Partner</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <h4 className="font-serif text-lg font-medium mb-4 text-moss">Navigation</h4>
            <nav>
              <ul className="space-y-3">
                <li>
                  <a href="#services" className="text-forest/80 hover:text-moss transition-colors">
                    Mindset Coaching
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-forest/80 hover:text-moss transition-colors">
                    Über mich
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-forest/80 hover:text-moss transition-colors">
                    Preise
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-forest/80 hover:text-moss transition-colors">
                    Kontakt
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          
          <div className="md:col-span-4">
            <h4 className="font-serif text-lg font-medium mb-4 text-moss">Kontakt</h4>
            <address className="not-italic">
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
                    +41 788 400 481
                  </a>
                </li>
              </ul>
            </address>
          </div>
        </div>
        
        <div className="border-t border-forest/20 pt-8">
          <div className="flex justify-center items-center gap-8 text-center">
            <button onClick={openTerms} className="text-forest/75 text-sm hover:text-moss transition-colors flex items-center gap-1">
              <ScrollText size={14} />
              <span>AGB</span>
            </button>
            <button onClick={() => openLegalInfo("impressum")} className="text-forest/75 text-sm hover:text-moss transition-colors flex items-center gap-1">
              <FileText size={14} />
              <span>Impressum</span>
            </button>
            <button onClick={() => openLegalInfo("datenschutz")} className="text-forest/75 text-sm hover:text-moss transition-colors flex items-center gap-1">
              <Shield size={14} />
              <span>Datenschutz</span>
            </button>
          </div>
        </div>
      </div>
      
      <Terms isOpen={isTermsOpen} onClose={closeTerms} />
      <LegalInfo isOpen={isLegalInfoOpen} onClose={closeLegalInfo} defaultTab={legalInfoTab} />
    </footer>;
};

export default Footer;
