import { useEffect, useState, lazy, Suspense } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { Skeleton } from '@/components/ui/skeleton';

const About = lazy(() => import('../components/About'));
const Services = lazy(() => import('../components/Services'));
const PricingWithQuote = lazy(() => import('../components/PricingWithQuote'));
const Contact = lazy(() => import('../components/Contact'));

const SectionLoader = () => (
  <div className="w-full py-20">
    <div className="container mx-auto px-4">
      <Skeleton className="h-10 w-1/3 mx-auto mb-8" />
      <Skeleton className="h-4 w-full mb-4" />
      <Skeleton className="h-4 w-4/5 mb-4" />
      <Skeleton className="h-4 w-3/5" />
    </div>
  </div>
);

interface Section {
  id: string;
  name: string;
  component: string;
  visible: boolean;
  order: number;
}

const componentMap: Record<string, React.ComponentType<any>> = {
  Hero,
  About,
  Services,
  PricingWithQuote,
  Contact
};

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
  const [isAboveTheFold, setIsAboveTheFold] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  
  const loadSettings = () => {
    console.log('Loading settings from localStorage');
    
    const storedSections = localStorage.getItem('sectionOrder');
    if (storedSections) {
      setSections(JSON.parse(storedSections));
    } else {
      setSections(defaultSections);
    }
    
    const storedSettings = localStorage.getItem('globalSettings');
    if (storedSettings) {
      setGlobalSettings(JSON.parse(storedSettings));
    }
    
    const storedTheme = localStorage.getItem('themeSettings');
    if (storedTheme) {
      applyThemeSettings(JSON.parse(storedTheme));
    }
    
    const storedSeo = localStorage.getItem('seoSettings');
    if (storedSeo) {
      applySeoSettings(JSON.parse(storedSeo));
    }
  };
  
  useEffect(() => {
    loadSettings();
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'globalSettings' || e.key === 'themeSettings' || 
          e.key === 'seoSettings' || e.key === 'sectionOrder') {
        console.log(`Storage changed: ${e.key}`);
        setLastUpdate(Date.now());
        loadSettings();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  useEffect(() => {
    const handleCustomStorageChange = () => {
      console.log('Same-tab storage change detected');
      setLastUpdate(Date.now());
      loadSettings();
    };
    
    window.addEventListener('localStorageUpdated', handleCustomStorageChange);
    
    return () => {
      window.removeEventListener('localStorageUpdated', handleCustomStorageChange);
    };
  }, []);
  
  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.slice(1);
        const element = document.getElementById(id as string);
        
        if (element) {
          const navbarHeight = 80;
          const top = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
          
          window.scrollTo({
            top,
            behavior: 'smooth'
          });
        }
      }
    };
    
    document.addEventListener('click', handleSmoothScroll);
    
    const handleScroll = () => {
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
      
      if (window.scrollY > 100 && isAboveTheFold) {
        setIsAboveTheFold(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    handleScroll();
    
    const timeout = setTimeout(() => {
      setIsAboveTheFold(false);
    }, 3000);
    
    return () => {
      document.removeEventListener('click', handleSmoothScroll);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, [isAboveTheFold]);
  
  const applyThemeSettings = (theme: any) => {
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
    if (seo.title) {
      document.title = seo.title;
    }
    
    updateMetaTag('description', seo.description);
    updateMetaTag('keywords', seo.keywords);
    updateMetaTag('og:image', seo.ogImage, 'property');
    
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
    
    if (document.getElementById('ga-script')) return;
    
    const scriptGA = document.createElement('script');
    scriptGA.async = true;
    scriptGA.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    scriptGA.id = 'ga-script';
    
    const scriptConfig = document.createElement('script');
    scriptConfig.id = 'ga-config';
    scriptConfig.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${trackingId}');
    `;
    
    document.head.appendChild(scriptGA);
    document.head.appendChild(scriptConfig);
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
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        {renderSections()}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
