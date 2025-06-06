
import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { ga4Manager } from '@/utils/ga4Manager';

interface SeoData {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  gaTrackingId: string;
  enableGa: boolean;
}

const defaultSeoData: SeoData = {
  title: 'Mindset Coach Martina Zürich | Entfalte dein Potenzial',
  description: 'Mindset Coaching mit Martina: Entfalten Sie Ihr Potenzial, stärken Sie Ihr Denken und finden Sie Klarheit – persönliche Online-Sessions aus Zürich.',
  keywords: 'mindset coaching zürich, life coach zürich, ziele erreichen zürich, coach martina, selbstbewusstsein stärken, persönlichkeitsentwicklung, lebensveränderung, mentales training zürich, lebenscoach schweiz, potenzial entfalten',
  ogImage: '/lovable-uploads/eff14ab3-8502-4ea4-9c20-75fe9b485119.png',
  gaTrackingId: 'G-CCD1ZR05L7',
  enableGa: true
};

export const SEO = () => {
  const [seoData, setSeoData] = useState<SeoData>(defaultSeoData);

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
      console.log('SEO.tsx: Received real-time SEO update', newSeoData);
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
          
          console.log('SEO.tsx: Updated from localStorage change', newData);
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
    <Helmet>
      {seoData.title && <title>{seoData.title}</title>}
      {seoData.description && <meta name="description" content={seoData.description} />}
      {seoData.keywords && <meta name="keywords" content={seoData.keywords} />}
      {seoData.ogImage && <meta property="og:image" content={seoData.ogImage} />}
    </Helmet>
  );
};
