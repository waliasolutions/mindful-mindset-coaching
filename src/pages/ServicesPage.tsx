
import { SEO } from '../components/SEO';
import Navbar from '../components/Navbar';
import Services from '../components/Services';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import { useGlobalSettings } from '../hooks/use-global-settings';
import { useState } from 'react';
import Terms from '../components/Terms';
import LegalInfo from '../components/LegalInfo';

const ServicesPage = () => {
  const globalSettings = useGlobalSettings();
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isLegalInfoOpen, setIsLegalInfoOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("impressum");

  const openTerms = () => setIsTermsOpen(true);
  const closeTerms = () => setIsTermsOpen(false);
  
  const openImpressum = () => {
    setActiveTab("impressum");
    setIsLegalInfoOpen(true);
  };
  
  const openDatenschutz = () => {
    setActiveTab("datenschutz");
    setIsLegalInfoOpen(true);
  };
  
  const closeLegalInfo = () => setIsLegalInfoOpen(false);

  return (
    <>
      <SEO 
        pageType="services"
        customTitle="Mindset Coaching Services | Transformiere dein Leben mit Martina"
        customDescription="Entdecken Sie professionelle Mindset Coaching Services: Persönliches Wachstum, Potenzialentfaltung, Selbstbewusstsein stärken. 1:1 Online Coaching aus Zürich mit Martina Domeniconi."
      />
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navbar />
        <main className="pt-20">
          <div className="container mx-auto px-4">
            <Breadcrumbs />
          </div>
          <Services settings={globalSettings} />
        </main>
        <Footer 
          onTermsClick={openTerms}
          onImpressumClick={openImpressum}
          onDatenschutzClick={openDatenschutz}
        />
        
        <Terms isOpen={isTermsOpen} onClose={closeTerms} />
        <LegalInfo 
          isOpen={isLegalInfoOpen} 
          onClose={closeLegalInfo} 
          defaultTab={activeTab}
        />
      </div>
    </>
  );
};

export default ServicesPage;
