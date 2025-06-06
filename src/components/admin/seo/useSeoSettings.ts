
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { ga4Manager } from '@/utils/ga4Manager';
import { supabase } from '@/integrations/supabase/client';

export interface SeoData {
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

export const useSeoSettings = () => {
  const [seoData, setSeoData] = useState<SeoData>(defaultSeoData);
  const [isLoading, setIsLoading] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);

  useEffect(() => {
    loadSeoSettings();
  }, []);

  const loadSeoSettings = async () => {
    try {
      // First try to load from database
      const { data, error } = await supabase
        .from('seo_settings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        console.error('Error loading SEO settings from database:', error);
        // Fallback to localStorage
        loadFromLocalStorage();
        return;
      }

      if (data) {
        const dbSeoData: SeoData = {
          title: data.title,
          description: data.description,
          keywords: data.keywords || '',
          ogImage: data.og_image || defaultSeoData.ogImage,
          gaTrackingId: data.ga_tracking_id || defaultSeoData.gaTrackingId,
          enableGa: data.enable_ga !== false
        };
        setSeoData(dbSeoData);
        
        // Also sync to localStorage for real-time updates
        localStorage.setItem('seoSettings', JSON.stringify(dbSeoData));
      } else {
        // No data in database, use localStorage or defaults
        loadFromLocalStorage();
      }
    } catch (error) {
      console.error('Error loading SEO settings:', error);
      loadFromLocalStorage();
    }
  };

  const loadFromLocalStorage = () => {
    const savedSeo = localStorage.getItem('seoSettings');
    if (savedSeo) {
      try {
        const parsedData = JSON.parse(savedSeo);
        setSeoData({ ...defaultSeoData, ...parsedData });
      } catch (error) {
        console.error('Error parsing SEO settings from localStorage:', error);
        setSeoData(defaultSeoData);
      }
    } else {
      setSeoData(defaultSeoData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSeoData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setSeoData(prev => ({
      ...prev,
      enableGa: checked
    }));
  };

  const testGa4Connection = async (): Promise<boolean> => {
    if (!seoData.gaTrackingId) {
      toast.error('Bitte geben Sie eine gültige GA4 Tracking-ID ein');
      return false;
    }

    setTestingConnection(true);
    try {
      const isValid = await ga4Manager.testConnection(seoData.gaTrackingId);
      if (isValid) {
        toast.success('GA4 Tracking-ID ist gültig');
        return true;
      } else {
        toast.error('Ungültige GA4 Tracking-ID Format (muss mit G- beginnen)');
        return false;
      }
    } catch (error) {
      toast.error('Fehler beim Testen der GA4 Verbindung');
      return false;
    } finally {
      setTestingConnection(false);
    }
  };

  const updateMetaTags = () => {
    document.title = seoData.title;
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', seoData.description);
    
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', seoData.keywords);
    
    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    ogImage.setAttribute('content', seoData.ogImage);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Save to database
      const { error } = await supabase
        .from('seo_settings')
        .upsert({
          title: seoData.title,
          description: seoData.description,
          keywords: seoData.keywords,
          og_image: seoData.ogImage,
          ga_tracking_id: seoData.gaTrackingId,
          enable_ga: seoData.enableGa
        });

      if (error) {
        console.error('Error saving SEO settings to database:', error);
        toast.error('Fehler beim Speichern der SEO Einstellungen in der Datenbank');
        return;
      }

      // Also save to localStorage for real-time sync
      localStorage.setItem('seoSettings', JSON.stringify(seoData));

      // Initialize GA4 with new settings
      const ga4Success = await ga4Manager.initialize({
        trackingId: seoData.gaTrackingId,
        enabled: seoData.enableGa
      });

      if (!ga4Success && seoData.enableGa) {
        toast.error('GA4 konnte nicht initialisiert werden');
      }

      // Update meta tags
      updateMetaTags();
      
      // Dispatch storage event for real-time sync
      window.dispatchEvent(new CustomEvent('seoSettingsUpdated', { 
        detail: seoData 
      }));
      
      toast.success('SEO Einstellungen erfolgreich gespeichert');
    } catch (error) {
      console.error('Error saving SEO settings:', error);
      toast.error('Fehler beim Speichern der SEO Einstellungen');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    seoData,
    isLoading,
    testingConnection,
    handleChange,
    handleSwitchChange,
    handleSave,
    testGa4Connection
  };
};
