
// Performance utilities for admin and website optimization
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

// Cache utilities
export const createCache = <T>(maxSize: number = 100) => {
  const cache = new Map<string, { value: T; timestamp: number }>();
  
  return {
    get: (key: string, ttl: number = 300000) => { // 5 minutes default TTL
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
        const firstKey = cache.keys().next().value;
        cache.delete(firstKey);
      }
      
      cache.set(key, { value, timestamp: Date.now() });
    },
    
    clear: () => cache.clear(),
    size: () => cache.size
  };
};

// Image optimization
export const optimizeImageLoading = () => {
  // Intersection Observer for lazy loading
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      }
    });
  });

  // Observe all images with data-src
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });

  return imageObserver;
};

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalImages = [
    '/lovable-uploads/7b4f0db6-80ea-4da6-b817-0f33ba7562b5.png', // Hero
    '/lovable-uploads/053f601c-1228-481c-9aca-d078fb3d7d8a.png'  // Profile
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
