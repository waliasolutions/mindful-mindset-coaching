
// Lean performance utilities
export const measurePerformance = (name: string, fn: Function) => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  if (import.meta.env.DEV) {
    console.log(`${name} took ${end - start} milliseconds`);
  }
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
export const createCache = <T>(maxSize: number = 50) => {
  const cache = new Map<string, { value: T; timestamp: number }>();
  
  return {
    get: (key: string, ttl: number = 180000) => {
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
        
        const toDelete = Math.ceil(maxSize * 0.3);
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
    rootMargin: '50px 0px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
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
