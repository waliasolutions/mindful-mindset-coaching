
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Hero";
import Services from "../components/Services";
import About from "../components/About";
import PricingWithQuote from "../components/PricingWithQuote";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { SEO } from "../components/SEO";
import EditModeToolbar from "../components/EditModeToolbar";
import LegalInfo from "../components/LegalInfo";

const Index = () => {
  const location = useLocation();
  const [showLegalInfo, setShowLegalInfo] = useState(false);
  const [legalType, setLegalType] = useState<'terms' | 'impressum' | 'datenschutz'>('terms');

  useEffect(() => {
    // Handle hash-based navigation for smooth scrolling
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const handleLegalClick = (type: 'terms' | 'impressum' | 'datenschutz') => {
    setLegalType(type);
    setShowLegalInfo(true);
  };

  const closeLegalInfo = () => {
    setShowLegalInfo(false);
  };

  return (
    <>
      <SEO />
      <EditModeToolbar />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <PricingWithQuote />
        <Contact />
      </main>
      <Footer 
        onTermsClick={() => handleLegalClick('terms')}
        onImpressumClick={() => handleLegalClick('impressum')}
        onDatenschutzClick={() => handleLegalClick('datenschutz')}
      />
      {showLegalInfo && (
        <LegalInfo 
          type={legalType} 
          onClose={closeLegalInfo} 
        />
      )}
    </>
  );
};

export default Index;
