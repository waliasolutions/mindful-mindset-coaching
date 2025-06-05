
import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  memoryUsage: number;
  navigationTiming: PerformanceNavigationTiming | null;
}

export const usePerformanceMonitor = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    navigationTiming: null
  });

  useEffect(() => {
    const measurePerformance = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      const loadTime = navigation.loadEventEnd - navigation.navigationStart;
      const renderTime = navigation.domContentLoadedEventEnd - navigation.navigationStart;
      
      // Memory usage (if available)
      const memory = (performance as any).memory;
      const memoryUsage = memory ? memory.usedJSHeapSize / 1048576 : 0; // Convert to MB

      setMetrics({
        loadTime,
        renderTime,
        memoryUsage,
        navigationTiming: navigation
      });
    };

    // Wait for page to fully load
    if (document.readyState === 'complete') {
      measurePerformance();
    } else {
      window.addEventListener('load', measurePerformance);
      return () => window.removeEventListener('load', measurePerformance);
    }
  }, []);

  return metrics;
};
