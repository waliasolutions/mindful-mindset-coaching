
import { useState, useEffect } from 'react';

interface CoreWebVitals {
  lcp: number | null; // Largest Contentful Paint
  fid: number | null; // First Input Delay
  cls: number; // Cumulative Layout Shift
  fcp: number | null; // First Contentful Paint
  ttfb: number | null; // Time to First Byte
}

interface VitalsThresholds {
  lcp: { good: number; poor: number };
  fid: { good: number; poor: number };
  cls: { good: number; poor: number };
  fcp: { good: number; poor: number };
  ttfb: { good: number; poor: number };
}

const THRESHOLDS: VitalsThresholds = {
  lcp: { good: 2500, poor: 4000 },
  fid: { good: 100, poor: 300 },
  cls: { good: 0.1, poor: 0.25 },
  fcp: { good: 1800, poor: 3000 },
  ttfb: { good: 800, poor: 1800 }
};

export const useCoreWebVitals = () => {
  const [vitals, setVitals] = useState<CoreWebVitals>({
    lcp: null,
    fid: null,
    cls: 0,
    fcp: null,
    ttfb: null
  });

  const [vitalsRatings, setVitalsRatings] = useState<Record<string, 'good' | 'needs-improvement' | 'poor'>>({});

  const getRating = (metric: keyof CoreWebVitals, value: number | null): 'good' | 'needs-improvement' | 'poor' => {
    if (value === null) return 'good';
    const threshold = THRESHOLDS[metric];
    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  };

  const sendToAnalytics = (metric: string, value: number, rating: string) => {
    // Send to GA4 if available
    if (window.gtag) {
      window.gtag('event', 'web_vitals', {
        event_category: 'Web Vitals',
        event_label: metric.toUpperCase(),
        value: Math.round(value),
        custom_parameter_1: rating
      });
    }

    // Send to Console for debugging
    // Log Core Web Vitals in development only
    if (import.meta.env.DEV) {
      console.log(`Core Web Vital - ${metric.toUpperCase()}:`, {
        value: Math.round(value),
        rating,
        threshold: THRESHOLDS[metric as keyof VitalsThresholds]
      });
    }
  };

  useEffect(() => {
    // Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      const lcpValue = lastEntry.startTime;
      
      setVitals(prev => ({ ...prev, lcp: lcpValue }));
      const rating = getRating('lcp', lcpValue);
      setVitalsRatings(prev => ({ ...prev, lcp: rating }));
      sendToAnalytics('lcp', lcpValue, rating);
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay (FID)
    const fidObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry: any) => {
        const fidValue = entry.processingStart - entry.startTime;
        setVitals(prev => ({ ...prev, fid: fidValue }));
        const rating = getRating('fid', fidValue);
        setVitalsRatings(prev => ({ ...prev, fid: rating }));
        sendToAnalytics('fid', fidValue, rating);
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          setVitals(prev => ({ ...prev, cls: clsValue }));
          const rating = getRating('cls', clsValue);
          setVitalsRatings(prev => ({ ...prev, cls: rating }));
          sendToAnalytics('cls', clsValue, rating);
        }
      });
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    // First Contentful Paint (FCP)
    const fcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry: any) => {
        if (entry.name === 'first-contentful-paint') {
          const fcpValue = entry.startTime;
          setVitals(prev => ({ ...prev, fcp: fcpValue }));
          const rating = getRating('fcp', fcpValue);
          setVitalsRatings(prev => ({ ...prev, fcp: rating }));
          sendToAnalytics('fcp', fcpValue, rating);
        }
      });
    });
    fcpObserver.observe({ entryTypes: ['paint'] });

    // Time to First Byte (TTFB)
    const measureTTFB = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        const ttfbValue = navigation.responseStart - navigation.fetchStart;
        setVitals(prev => ({ ...prev, ttfb: ttfbValue }));
        const rating = getRating('ttfb', ttfbValue);
        setVitalsRatings(prev => ({ ...prev, ttfb: rating }));
        sendToAnalytics('ttfb', ttfbValue, rating);
      }
    };

    if (document.readyState === 'complete') {
      measureTTFB();
    } else {
      window.addEventListener('load', measureTTFB);
    }

    return () => {
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
      fcpObserver.disconnect();
      window.removeEventListener('load', measureTTFB);
    };
  }, []);

  return {
    vitals,
    vitalsRatings,
    thresholds: THRESHOLDS
  };
};

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
