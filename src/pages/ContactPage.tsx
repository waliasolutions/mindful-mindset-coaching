
import { SEO } from '../components/SEO';
import Navbar from '../components/Navbar';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import { useGlobalSettings } from '../hooks/use-global-settings';
import { useState } from 'react';
import Terms from '../components/Terms';
import LegalInfo from '../components/LegalInfo';

const ContactPage = () => {
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
        pageType="contact"
        customTitle="Kontakt | Mindset Coach Martina Zürich | Kostenloses Erstgespräch"
        customDescription="Kontaktieren Sie Martina für ein kostenloses Kennenlerngespräch. Mindset Coaching Termine online verfügbar. Tel: +41 788 400 481 | Email: info@mindset-coach-martina.ch"
      />
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navbar />
        <main className="pt-20">
          <div className="container mx-auto px-4">
            <Breadcrumbs />
          </div>
          <Contact settings={globalSettings} />
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

export default ContactPage;
