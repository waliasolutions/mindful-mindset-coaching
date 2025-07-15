
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { ga4Manager } from '@/utils/ga4Manager';
import StructuredData from './StructuredData';

interface SeoData {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  gaTrackingId: string;
  enableGa: boolean;
}

interface SEOProps {
  pageType?: 'home' | 'services' | 'about' | 'pricing' | 'contact';
  customTitle?: string;
  customDescription?: string;
}

const defaultSeoData: SeoData = {
  title: 'Mindset Coach Martina Zürich | Entfalte dein Potenzial',
  description: 'Mindset Coaching mit Martina: Entfalten Sie Ihr Potenzial, stärken Sie Ihr Denken und finden Sie Klarheit – persönliche Online-Sessions aus Zürich.',
  keywords: 'mindset coaching zürich, life coach zürich, ziele erreichen zürich, coach martina, selbstbewusstsein stärken, persönlichkeitsentwicklung, lebensveränderung, mentales training zürich, lebenscoach schweiz, potenzial entfalten',
  ogImage: '/lovable-uploads/eff14ab3-8502-4ea4-9c20-75fe9b485119.png',
  gaTrackingId: 'G-CCD1ZR05L7',
  enableGa: true
};

const pageSpecificData = {
  home: {
    title: 'Mindset Coach Martina Zürich | Entfalte dein Potenzial',
    description: 'Mindset Coaching mit Martina: Entfalten Sie Ihr Potenzial, stärken Sie Ihr Denken und finden Sie Klarheit – persönliche Online-Sessions aus Zürich.'
  },
  services: {
    title: 'Mindset Coaching Services | Transformiere dein Leben',
    description: 'Professionelle Mindset Coaching Services: Persönliches Wachstum, Potenzialentfaltung, Selbstbewusstsein stärken. 1:1 Online Coaching aus Zürich.'
  },
  about: {
    title: 'Über Martina | Zertifizierte Mindset Coach Zürich',
    description: 'Lernen Sie Martina Domeniconi kennen - Ihre zertifizierte Mindset Coach aus Zürich. Erfahrung in Persönlichkeitsentwicklung und Transformation.'
  },
  pricing: {
    title: 'Mindset Coaching Preise | CHF 90 pro Sitzung',
    description: 'Transparente Preise für Mindset Coaching: CHF 90 pro Einzelsitzung (45-60 Min). Kostenloses Kennenlerngespräch. Online Coaching aus Zürich.'
  },
  contact: {
    title: 'Kontakt | Mindset Coach Martina Zürich',
    description: 'Kontaktieren Sie Martina für ein kostenloses Kennenlerngespräch. Mindset Coaching Termine online verfügbar. Tel: +41 788 400 481'
  }
};

export const SEO = ({ pageType = 'home', customTitle, customDescription }: SEOProps) => {
  const [seoData, setSeoData] = useState<SeoData>(defaultSeoData);
  const baseUrl = 'https://mindset-coach-martina.ch';
  
  // Get page-specific data
  const pageData = pageSpecificData[pageType];
  const finalTitle = customTitle || pageData.title;
  const finalDescription = customDescription || pageData.description;
  const canonicalUrl = pageType === 'home' ? baseUrl : `${baseUrl}/#${pageType}`;

  useEffect(() => {
    // Load initial SEO settings
    const loadSeoSettings = () => {
      const savedSeo = localStorage.getItem('seoSettings');
      if (savedSeo) {
        try {
          const parsedData = JSON.parse(savedSeo);
          setSeoData({ ...defaultSeoData, ...parsedData });
          return { ...defaultSeoData, ...parsedData };
        } catch (error) {
          console.error('Error parsing SEO settings:', error);
          return defaultSeoData;
        }
      }
      return defaultSeoData;
    };

    const initialData = loadSeoSettings();

    // Initialize GA4 with current settings
    ga4Manager.initialize({
      trackingId: initialData.gaTrackingId,
      enabled: initialData.enableGa
    });

    // Listen for real-time updates from admin
    const handleSeoUpdate = (event: CustomEvent) => {
      const newSeoData = event.detail;
      setSeoData(newSeoData);
      // SEO data updated
    };

    // Listen for localStorage changes from admin
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'seoSettings' && e.newValue) {
        try {
          const newData = JSON.parse(e.newValue);
          setSeoData(newData);
          
          // Re-initialize GA4 with new settings
          ga4Manager.initialize({
            trackingId: newData.gaTrackingId,
            enabled: newData.enableGa
          });
          
          // Updated from localStorage change
        } catch (error) {
          console.error('Error parsing updated SEO settings:', error);
        }
      }
    };

    window.addEventListener('seoSettingsUpdated', handleSeoUpdate as EventListener);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('seoSettingsUpdated', handleSeoUpdate as EventListener);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{finalTitle}</title>
        <meta name="title" content={finalTitle} />
        <meta name="description" content={finalDescription} />
        <meta name="keywords" content={seoData.keywords} />
        <meta name="author" content="Martina Domeniconi" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="language" content="de-CH" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content={pageType === 'home' ? 'website' : 'article'} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={finalTitle} />
        <meta property="og:description" content={finalDescription} />
        <meta property="og:image" content={`${baseUrl}${seoData.ogImage}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:site_name" content="Mindset Coaching mit Martina" />
        <meta property="og:locale" content="de_CH" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={finalTitle} />
        <meta name="twitter:description" content={finalDescription} />
        <meta name="twitter:image" content={`${baseUrl}${seoData.ogImage}`} />
        <meta name="twitter:site" content="@martinadomeniconi" />
        <meta name="twitter:creator" content="@martinadomeniconi" />
        
        {/* Additional Meta Tags for Better Indexing */}
        <meta name="theme-color" content="#41773a" />
        <meta name="msapplication-TileColor" content="#41773a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Mindset Coaching" />
        
        {/* Geo Tags */}
        <meta name="geo.region" content="CH-ZH" />
        <meta name="geo.placename" content="Zürich" />
        <meta name="geo.position" content="47.4108;8.5434" />
        <meta name="ICBM" content="47.4108, 8.5434" />
        
        {/* Business Information */}
        <meta name="contact" content="info@mindset-coach-martina.ch" />
        <meta name="copyright" content="Martina Domeniconi" />
        
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </Helmet>
      
      <StructuredData pageType={pageType} />
    </>
  );
};
