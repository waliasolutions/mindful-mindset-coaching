
import { lazy, Suspense, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import SectionLoader from '../components/SectionLoader';
import { useSections } from '../hooks/use-sections';
import { useGlobalSettings } from '../hooks/use-global-settings';
import { useAboveFold } from '../hooks/use-above-fold';
import { SEO } from '../components/SEO';
import Terms from '../components/Terms';
import LegalInfo from '../components/LegalInfo';

const About = lazy(() => import('../components/About'));
const Services = lazy(() => import('../components/Services'));
const PricingWithQuote = lazy(() => import('../components/PricingWithQuote'));
const Contact = lazy(() => import('../components/Contact'));

const componentMap: Record<string, React.ComponentType<any>> = {
  Hero,
  About,
  Services,
  PricingWithQuote,
  Contact
};

const Index = () => {
  const { sections } = useSections();
  const globalSettings = useGlobalSettings();
  const isAboveTheFold = useAboveFold();
  
  // Dialog states for legal popups
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isLegalInfoOpen, setIsLegalInfoOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("impressum");

  // Track current section for dynamic SEO
  const [currentSection, setCurrentSection] = useState<'home' | 'services' | 'about' | 'pricing' | 'contact'>('home');

  // Open dialog handlers
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

  // Handle section visibility for dynamic SEO
  const handleSectionInView = (sectionId: string) => {
    const sectionMap: Record<string, 'home' | 'services' | 'about' | 'pricing' | 'contact'> = {
      'Hero': 'home',
      'Services': 'services', 
      'About': 'about',
      'PricingWithQuote': 'pricing',
      'Contact': 'contact'
    };
    
    const pageType = sectionMap[sectionId];
    if (pageType && pageType !== currentSection) {
      setCurrentSection(pageType);
      
      // Update URL hash without scrolling
      if (pageType !== 'home') {
        window.history.replaceState(null, '', `#${pageType}`);
      } else {
        window.history.replaceState(null, '', '/');
      }
    }
  };

  const renderSections = () => {
    return sections
      .sort((a, b) => a.order - b.order)
      .filter(section => section.visible)
      .map((section, index) => {
        const Component = componentMap[section.component];
        
        if (index === 0) {
          return Component ? (
            <Component 
              key={section.id} 
              settings={globalSettings}
              onInView={() => handleSectionInView(section.component)}
            />
          ) : null;
        }
        
        return Component ? (
          <Suspense key={section.id} fallback={<SectionLoader />}>
            {(!isAboveTheFold || index < 2) && (
              <Component 
                settings={globalSettings}
                onInView={() => handleSectionInView(section.component)}
              />
            )}
          </Suspense>
        ) : null;
      });
  };

  return (
    <>
      <SEO pageType={currentSection} />
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navbar />
        <main>
          {renderSections()}
        </main>
        <Footer 
          onTermsClick={openTerms}
          onImpressumClick={openImpressum}
          onDatenschutzClick={openDatenschutz}
        />
        
        {/* Legal Popups */}
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

export default Index;
