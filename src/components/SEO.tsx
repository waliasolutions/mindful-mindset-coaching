
import { Helmet } from 'react-helmet-async';
import { useSeoSettings } from '../components/admin/seo/useSeoSettings';
import { useEffect } from 'react';

export const SEO = () => {
  const { seoData } = useSeoSettings();
  
  useEffect(() => {
    // Handle Google Analytics script if enabled
    if (seoData.enableGa && seoData.gaTrackingId) {
      // Remove any existing GA scripts first
      const existingGaScript = document.getElementById('ga-script');
      const existingGaConfig = document.getElementById('ga-config');
      
      if (existingGaScript) existingGaScript.remove();
      if (existingGaConfig) existingGaConfig.remove();
      
      // Add GA script
      const scriptGA = document.createElement('script');
      scriptGA.async = true;
      scriptGA.src = `https://www.googletagmanager.com/gtag/js?id=${seoData.gaTrackingId}`;
      scriptGA.id = 'ga-script';
      
      const scriptConfig = document.createElement('script');
      scriptConfig.id = 'ga-config';
      scriptConfig.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${seoData.gaTrackingId}');
      `;
      
      document.head.appendChild(scriptGA);
      document.head.appendChild(scriptConfig);

      // For debugging
      console.log(`Google Analytics initialized with ID: ${seoData.gaTrackingId}`);
    }
  }, [seoData.enableGa, seoData.gaTrackingId]);

  return (
    <Helmet>
      {seoData.title && <title>{seoData.title}</title>}
      {seoData.description && <meta name="description" content={seoData.description} />}
      {seoData.keywords && <meta name="keywords" content={seoData.keywords} />}
      {seoData.ogImage && <meta property="og:image" content={seoData.ogImage} />}
    </Helmet>
  );
};
