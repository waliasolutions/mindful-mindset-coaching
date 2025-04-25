
import { lazy, Suspense } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import SectionLoader from '../components/SectionLoader';
import { useSections } from '../hooks/use-sections';
import { useGlobalSettings } from '../hooks/use-global-settings';
import { useAboveFold } from '../hooks/use-above-fold';
import { SEO } from '../components/SEO';

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
            />
          ) : null;
        }
        
        return Component ? (
          <Suspense key={section.id} fallback={<SectionLoader />}>
            {(!isAboveTheFold || index < 2) && (
              <Component 
                settings={globalSettings}
              />
            )}
          </Suspense>
        ) : null;
      });
  };

  return (
    <>
      <SEO />
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navbar />
        <main>
          {renderSections()}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
