
// SEO optimization utilities for better Google indexing

interface PageData {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
}

export const updatePageMeta = (data: PageData) => {
  // Update document title
  document.title = data.title;
  
  // Update or create meta tags
  const updateOrCreateMeta = (name: string, content: string, isProperty = false) => {
    const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
    let meta = document.querySelector(selector) as HTMLMetaElement;
    
    if (!meta) {
      meta = document.createElement('meta');
      if (isProperty) {
        meta.setAttribute('property', name);
      } else {
        meta.setAttribute('name', name);
      }
      document.head.appendChild(meta);
    }
    
    meta.setAttribute('content', content);
  };

  // Update meta tags
  updateOrCreateMeta('description', data.description);
  updateOrCreateMeta('keywords', data.keywords.join(', '));
  updateOrCreateMeta('og:title', data.title, true);
  updateOrCreateMeta('og:description', data.description, true);
  updateOrCreateMeta('twitter:title', data.title);
  updateOrCreateMeta('twitter:description', data.description);
  
  // Update canonical URL
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }
  canonical.href = data.canonical;
};

export const preloadCriticalImages = () => {
  const criticalImages = [
    '/lovable-uploads/7b4f0db6-80ea-4da6-b817-0f33ba7562b5.png',
    '/lovable-uploads/eff14ab3-8502-4ea4-9c20-75fe9b485119.png'
  ];
  
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    link.fetchPriority = 'high';
    document.head.appendChild(link);
  });
};

export const trackPageView = (page: string) => {
  // Track page views for analytics
  if (window.gtag) {
    window.gtag('config', 'G-CCD1ZR05L7', {
      page_title: document.title,
      page_location: window.location.href,
      custom_map: { custom_parameter: page }
    });
  }
};

export const submitToSearchConsole = async (url: string) => {
  // This would typically be done through Search Console API
  // For now, just log the URL that should be submitted
  console.log('URL ready for Search Console submission:', url);
  
  // You can implement Google Search Console API integration here
  // or provide instructions to manually submit the URL
};

export const generateOpenGraphData = (pageType: string) => {
  const baseUrl = 'https://mindset-coach-martina.ch';
  
  const ogData = {
    home: {
      type: 'website',
      title: 'Mindset Coach Martina Zürich | Entfalte dein Potenzial',
      description: 'Mindset Coaching mit Martina: Entfalten Sie Ihr Potenzial, stärken Sie Ihr Denken und finden Sie Klarheit – persönliche Online-Sessions aus Zürich.',
      image: `${baseUrl}/lovable-uploads/eff14ab3-8502-4ea4-9c20-75fe9b485119.png`
    },
    services: {
      type: 'article',
      title: 'Mindset Coaching Services | Transformiere dein Leben',
      description: 'Professionelle Mindset Coaching Services: Persönliches Wachstum, Potenzialentfaltung, Selbstbewusstsein stärken.',
      image: `${baseUrl}/lovable-uploads/eff14ab3-8502-4ea4-9c20-75fe9b485119.png`
    }
  };
  
  return ogData[pageType as keyof typeof ogData] || ogData.home;
};

// Monitor Core Web Vitals for SEO
export const monitorWebVitals = () => {
  // LCP (Largest Contentful Paint)
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP:', lastEntry.startTime);
    
    // Send to analytics if needed
    if (window.gtag) {
      window.gtag('event', 'web_vitals', {
        event_category: 'Web Vitals',
        event_label: 'LCP',
        value: Math.round(lastEntry.startTime)
      });
    }
  }).observe({ entryTypes: ['largest-contentful-paint'] });

  // FID (First Input Delay)
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    entries.forEach((entry: any) => {
      const fid = entry.processingStart - entry.startTime;
      console.log('FID:', fid);
      
      if (window.gtag) {
        window.gtag('event', 'web_vitals', {
          event_category: 'Web Vitals',
          event_label: 'FID',
          value: Math.round(fid)
        });
      }
    });
  }).observe({ entryTypes: ['first-input'] });

  // CLS (Cumulative Layout Shift)
  let clsValue = 0;
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    entries.forEach((entry: any) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
        console.log('CLS:', clsValue);
        
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            event_category: 'Web Vitals',
            event_label: 'CLS',
            value: Math.round(clsValue * 1000)
          });
        }
      }
    });
  }).observe({ entryTypes: ['layout-shift'] });
};

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
