
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface SeoData {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  gaTrackingId: string;
  enableGa: boolean;
}

const defaultSeoData: SeoData = {
  title: 'Mindset Coaching',
  description: 'Professional coaching services to improve your mindset and achieve your goals',
  keywords: 'coaching, mindset, personal development, goals',
  ogImage: '',
  gaTrackingId: '',
  enableGa: false
};

export const useSeoSettings = () => {
  const [seoData, setSeoData] = useState<SeoData>(defaultSeoData);

  useEffect(() => {
    const savedSeo = localStorage.getItem('seoSettings');
    if (savedSeo) {
      try {
        setSeoData(JSON.parse(savedSeo));
      } catch (error) {
        console.error('Error parsing SEO settings:', error);
        setSeoData(defaultSeoData);
      }
    }
  }, []);

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

  const updateGoogleAnalytics = (trackingId: string) => {
    removeGoogleAnalytics();
    
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

  const removeGoogleAnalytics = () => {
    const gaScript = document.getElementById('ga-script');
    const gaConfig = document.getElementById('ga-config');
    
    if (gaScript) {
      gaScript.remove();
    }
    
    if (gaConfig) {
      gaConfig.remove();
    }
  };

  const handleSave = () => {
    localStorage.setItem('seoSettings', JSON.stringify(seoData));

    if (seoData.enableGa && seoData.gaTrackingId) {
      updateGoogleAnalytics(seoData.gaTrackingId);
    } else {
      removeGoogleAnalytics();
    }

    updateMetaTags();
    
    toast.success('SEO settings saved successfully');
  };

  return {
    seoData,
    handleChange,
    handleSwitchChange,
    handleSave
  };
};
