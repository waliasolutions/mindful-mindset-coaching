
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import PricingWithQuote from '../components/PricingWithQuote';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

// Define the section type
interface Section {
  id: string;
  name: string;
  component: string;
  visible: boolean;
  order: number;
}

// Map from component name to the actual component
const componentMap: Record<string, React.ComponentType<any>> = {
  Hero,
  About,
  Services,
  PricingWithQuote,
  Contact
};

// Default section order if not found in localStorage
const defaultSections: Section[] = [
  { id: 'hero', name: 'Hero', component: 'Hero', visible: true, order: 0 },
  { id: 'services', name: 'Services', component: 'Services', visible: true, order: 1 },
  { id: 'about', name: 'About', component: 'About', visible: true, order: 2 },
  { id: 'pricing', name: 'Pricing', component: 'PricingWithQuote', visible: true, order: 3 },
  { id: 'contact', name: 'Contact', component: 'Contact', visible: true, order: 4 },
];

interface GlobalSettings {
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  navigation: any[];
  footer: any;
}

const Index = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [globalSettings, setGlobalSettings] = useState<GlobalSettings | null>(null);
  
  useEffect(() => {
    // Load section order from localStorage
    const storedSections = localStorage.getItem('sectionOrder');
    if (storedSections) {
      setSections(JSON.parse(storedSections));
    } else {
      setSections(defaultSections);
    }
    
    // Load global settings from localStorage
    const storedSettings = localStorage.getItem('globalSettings');
    if (storedSettings) {
      setGlobalSettings(JSON.parse(storedSettings));
    }
    
    // Apply theme settings if available
    const storedTheme = localStorage.getItem('themeSettings');
    if (storedTheme) {
      applyThemeSettings(JSON.parse(storedTheme));
    }
    
    // Apply SEO settings if available
    const storedSeo = localStorage.getItem('seoSettings');
    if (storedSeo) {
      applySeoSettings(JSON.parse(storedSeo));
    }
    
    // Smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.slice(1);
        const element = document.getElementById(id as string);
        if (element) {
          const navbarHeight = 80; // approximate navbar height
          const top = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
          window.scrollTo({
            top,
            behavior: 'smooth'
          });
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    
    // Reveal animation on scroll
    const handleReveal = () => {
      const reveals = document.querySelectorAll('.reveal-element');
      const images = document.querySelectorAll('.image-reveal');
      
      reveals.forEach((el) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          el.classList.add('revealed');
        }
      });
      
      images.forEach((el) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          el.classList.add('reveal');
        }
      });
    };
    
    window.addEventListener('scroll', handleReveal);
    handleReveal(); // Trigger on initial load
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('scroll', handleReveal);
    };
  }, []);
  
  const applyThemeSettings = (theme: any) => {
    // Create or update theme CSS variables
    let styleTag = document.getElementById('theme-variables');
    
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'theme-variables';
      document.head.appendChild(styleTag);
    }
    
    styleTag.innerHTML = `
      :root {
        --color-primary: ${theme.colors.primary};
        --color-secondary: ${theme.colors.secondary};
        --color-accent: ${theme.colors.accent};
        --color-background: ${theme.colors.background};
        --color-text: ${theme.colors.text};
        
        --font-heading: ${theme.typography.headingFont};
        --font-body: ${theme.typography.bodyFont};
        --font-size-base: ${theme.typography.baseFontSize};
        
        --section-padding: ${theme.spacing.sectionPadding};
        --container-max-width: ${theme.spacing.containerMaxWidth};
      }
    `;
  };
  
  const applySeoSettings = (seo: any) => {
    // Update document title
    if (seo.title) {
      document.title = seo.title;
    }
    
    // Update meta tags
    updateMetaTag('description', seo.description);
    updateMetaTag('keywords', seo.keywords);
    updateMetaTag('og:image', seo.ogImage, 'property');
    
    // Handle Google Analytics
    if (seo.enableGa && seo.gaTrackingId) {
      addGoogleAnalytics(seo.gaTrackingId);
    }
  };
  
  const updateMetaTag = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
    if (!content) return;
    
    let meta = document.querySelector(`meta[${attribute}="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attribute, name);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };
  
  const addGoogleAnalytics = (trackingId: string) => {
    if (!trackingId) return;
    
    // Check if GA script already exists
    if (document.getElementById('ga-script')) return;
    
    // Create GA4 script
    const scriptGA = document.createElement('script');
    scriptGA.async = true;
    scriptGA.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    scriptGA.id = 'ga-script';
    
    // Create config script
    const scriptConfig = document.createElement('script');
    scriptConfig.id = 'ga-config';
    scriptConfig.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${trackingId}');
    `;
    
    // Add scripts to document
    document.head.appendChild(scriptGA);
    document.head.appendChild(scriptConfig);
  };
  
  // Render each section according to the order and visibility
  const renderSections = () => {
    return sections
      .sort((a, b) => a.order - b.order)
      .filter(section => section.visible)
      .map(section => {
        const Component = componentMap[section.component];
        // Pass global settings as props to each component if needed
        return Component ? (
          <Component 
            key={section.id} 
            settings={globalSettings}
          />
        ) : null;
      });
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Don't pass navigation prop to Navbar since it doesn't accept it */}
      <Navbar />
      <main>
        {renderSections()}
      </main>
      {/* Don't pass props to Footer since it doesn't accept them */}
      <Footer />
    </div>
  );
};

export default Index;
