
import { SEO } from '../components/SEO';
import Navbar from '../components/Navbar';
import PricingWithQuote from '../components/PricingWithQuote';
import Footer from '../components/Footer';
import Breadcrumbs from '../components/Breadcrumbs';
import { useState } from 'react';
import Terms from '../components/Terms';
import LegalInfo from '../components/LegalInfo';

const PricingPage = () => {
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
        pageType="pricing"
        customTitle="Mindset Coaching Preise Zürich | CHF 90 pro Sitzung | Martina"
        customDescription="Transparente Preise für Mindset Coaching: CHF 90 pro Einzelsitzung (45-60 Min). Kostenloses Kennenlerngespräch. Flexible Online Coaching Termine aus Zürich."
      />
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navbar />
        <main className="pt-20">
          <div className="container mx-auto px-4">
            <Breadcrumbs />
          </div>
          <PricingWithQuote />
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

export default PricingPage;
