
// Enhanced performance utilities for optimization
export const measurePerformance = (name: string, fn: Function) => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds`);
  return result;
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Enhanced cache with memory management
export const createCache = <T>(maxSize: number = 50) => { // Reduced from 100 to 50
  const cache = new Map<string, { value: T; timestamp: number }>();
  
  return {
    get: (key: string, ttl: number = 180000) => { // Reduced TTL to 3 minutes
      const item = cache.get(key);
      if (!item) return null;
      
      if (Date.now() - item.timestamp > ttl) {
        cache.delete(key);
        return null;
      }
      
      return item.value;
    },
    
    set: (key: string, value: T) => {
      if (cache.size >= maxSize) {
        // Remove oldest entries
        const sortedEntries = Array.from(cache.entries())
          .sort(([,a], [,b]) => a.timestamp - b.timestamp);
        
        const toDelete = Math.ceil(maxSize * 0.3); // Remove 30% of oldest
        for (let i = 0; i < toDelete; i++) {
          cache.delete(sortedEntries[i][0]);
        }
      }
      
      cache.set(key, { value, timestamp: Date.now() });
    },
    
    clear: () => cache.clear(),
    size: () => cache.size
  };
};

// Optimized intersection observer for lazy loading
export const createIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
) => {
  const defaultOptions = {
    rootMargin: '50px 0px', // Load 50px before entering viewport
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
};

// Preload critical resources with priority
export const preloadCriticalResources = () => {
  const criticalResources = [
    {
      href: '/lovable-uploads/7b4f0db6-80ea-4da6-b817-0f33ba7562b5.png',
      as: 'image',
      type: 'image/png',
      priority: 'high'
    }
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = resource.as;
    link.href = resource.href;
    link.fetchPriority = resource.priority;
    if (resource.type) {
      link.type = resource.type;
    }
    document.head.appendChild(link);
  });
};

// Memory cleanup utility
export const cleanupMemory = () => {
  // Force garbage collection if available
  if ('gc' in window && typeof (window as any).gc === 'function') {
    (window as any).gc();
  }
  
  // Clear unused image objects
  const images = document.querySelectorAll('img[data-cleanup="true"]');
  images.forEach(img => {
    if (img instanceof HTMLImageElement) {
      img.src = '';
      img.srcset = '';
    }
  });
};

// Performance monitoring with Core Web Vitals
export const trackPerformanceMetrics = () => {
  // Track LCP (Largest Contentful Paint)
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP:', lastEntry.startTime);
  }).observe({ entryTypes: ['largest-contentful-paint'] });

  // Track FID (First Input Delay)
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    entries.forEach((entry: any) => {
      console.log('FID:', entry.processingStart - entry.startTime);
    });
  }).observe({ entryTypes: ['first-input'] });

  // Track CLS (Cumulative Layout Shift)
  let clsValue = 0;
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    entries.forEach((entry: any) => {
      if (!entry.hadRecentInput) {
        clsValue += entry.value;
        console.log('CLS:', clsValue);
      }
    });
  }).observe({ entryTypes: ['layout-shift'] });
};
