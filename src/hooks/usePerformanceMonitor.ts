
import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
  navigationTiming: PerformanceNavigationTiming | null;
  lcp: number;
  fid: number;
  cls: number;
}

export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    navigationTiming: null,
    lcp: 0,
    fid: 0,
    cls: 0
  });

  useEffect(() => {
    const measurePerformance = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      const loadTime = navigation.loadEventEnd - navigation.fetchStart;
      const renderTime = navigation.domContentLoadedEventEnd - navigation.fetchStart;
      
      // Memory usage (if available)
      const memory = (performance as any).memory;
      const memoryUsage = memory ? memory.usedJSHeapSize / 1048576 : 0; // Convert to MB

      setMetrics(prev => ({
        ...prev,
        loadTime,
        renderTime,
        memoryUsage,
        navigationTiming: navigation
      }));
    };

    // Measure Core Web Vitals
    const measureWebVitals = () => {
      // LCP (Largest Contentful Paint)
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // FID (First Input Delay)
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          setMetrics(prev => ({ ...prev, fid: entry.processingStart - entry.startTime }));
        });
      }).observe({ entryTypes: ['first-input'] });

      // CLS (Cumulative Layout Shift)
      let clsValue = 0;
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            setMetrics(prev => ({ ...prev, cls: clsValue }));
          }
        });
      }).observe({ entryTypes: ['layout-shift'] });
    };

    // Wait for page to fully load
    if (document.readyState === 'complete') {
      measurePerformance();
      measureWebVitals();
    } else {
      window.addEventListener('load', () => {
        measurePerformance();
        measureWebVitals();
      });
    }

    // Cleanup function
    return () => {
      // Clean up performance observers
    };
  }, []);

  return metrics;
};
