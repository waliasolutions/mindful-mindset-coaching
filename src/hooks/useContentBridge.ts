
import { useState, useEffect, useCallback, useRef } from 'react';

interface ContentOverrides {
  [sectionId: string]: {
    [key: string]: any;
  };
}

// Cache for content to prevent repeated localStorage reads
const contentCache = new Map<string, any>();
const cacheExpiry = new Map<string, number>();
const CACHE_DURATION = 5000; // 5 seconds

// Debounce map for preventing rapid updates
const debounceTimers = new Map<string, NodeJS.Timeout>();

export const useContentBridge = (sectionId: string, defaultContent: any) => {
  const [content, setContent] = useState(() => {
    // Check cache first
    const cacheKey = `content_${sectionId}`;
    const cached = contentCache.get(cacheKey);
    const expiry = cacheExpiry.get(cacheKey);
    
    if (cached && expiry && Date.now() < expiry) {
      return cached;
    }
    
    // If not cached, try localStorage
    try {
      const adminOverrides = localStorage.getItem('adminContentOverrides');
      if (adminOverrides) {
        const overrides: ContentOverrides = JSON.parse(adminOverrides);
        if (overrides[sectionId]) {
          const mergedContent = { ...defaultContent, ...overrides[sectionId] };
          // Cache the result
          contentCache.set(cacheKey, mergedContent);
          cacheExpiry.set(cacheKey, Date.now() + CACHE_DURATION);
          return mergedContent;
        }
      }
    } catch (error) {
      console.error('Error parsing admin content overrides:', error);
    }
    
    // Cache default content
    contentCache.set(cacheKey, defaultContent);
    cacheExpiry.set(cacheKey, Date.now() + CACHE_DURATION);
    return defaultContent;
  });

  const updateContentRef = useRef<(newOverrides: any) => void>();

  updateContentRef.current = useCallback((newOverrides: any) => {
    const mergedContent = { ...defaultContent, ...newOverrides };
    setContent(mergedContent);
    
    // Update cache
    const cacheKey = `content_${sectionId}`;
    contentCache.set(cacheKey, mergedContent);
    cacheExpiry.set(cacheKey, Date.now() + CACHE_DURATION);
  }, [defaultContent, sectionId]);

  useEffect(() => {
    // Listen for admin content updates with enhanced debouncing
    const handleStorageChange = (event: CustomEvent) => {
      if (event.detail.key === 'adminContentOverrides') {
        // Clear existing debounce timer
        const timerId = debounceTimers.get(sectionId);
        if (timerId) {
          clearTimeout(timerId);
        }
        
        // Set new debounced update
        const newTimerId = setTimeout(() => {
          try {
            const overrides: ContentOverrides = JSON.parse(event.detail.newValue || '{}');
            if (overrides[sectionId]) {
              updateContentRef.current?.(overrides[sectionId]);
            } else {
              updateContentRef.current?.({});
            }
          } catch (error) {
            console.error('Error parsing admin content overrides:', error);
          }
          debounceTimers.delete(sectionId);
        }, 200); // Increased debounce time for stability
        
        debounceTimers.set(sectionId, newTimerId);
      }
    };

    window.addEventListener('localStorageUpdated', handleStorageChange as EventListener);
    
    return () => {
      window.removeEventListener('localStorageUpdated', handleStorageChange as EventListener);
      // Clean up debounce timer
      const timerId = debounceTimers.get(sectionId);
      if (timerId) {
        clearTimeout(timerId);
        debounceTimers.delete(sectionId);
      }
    };
  }, [sectionId]);

  return content;
};

// Enhanced save function with better error handling and batching
export const saveContentOverride = (sectionId: string, overrides: any) => {
  try {
    // Batch updates to prevent rapid localStorage writes
    const existingOverrides = localStorage.getItem('adminContentOverrides');
    const currentOverrides: ContentOverrides = existingOverrides ? JSON.parse(existingOverrides) : {};
    
    // Deep clone to prevent reference issues
    currentOverrides[sectionId] = JSON.parse(JSON.stringify(overrides));
    
    const newValue = JSON.stringify(currentOverrides);
    localStorage.setItem('adminContentOverrides', newValue);
    
    // Update cache immediately
    const cacheKey = `content_${sectionId}`;
    const cached = contentCache.get(cacheKey) || {};
    const mergedContent = { ...cached, ...overrides };
    contentCache.set(cacheKey, mergedContent);
    cacheExpiry.set(cacheKey, Date.now() + CACHE_DURATION);
    
    // Dispatch custom event for same-tab communication with debouncing
    const eventKey = 'localStorageUpdated';
    const existingTimer = debounceTimers.get(eventKey);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }
    
    const timer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('localStorageUpdated', { 
        detail: { key: 'adminContentOverrides', newValue }
      }));
      debounceTimers.delete(eventKey);
    }, 100);
    
    debounceTimers.set(eventKey, timer);
    
    return true;
  } catch (error) {
    console.error('Error saving content override:', error);
    return false;
  }
};

// Clear cache function for admin use
export const clearContentCache = () => {
  contentCache.clear();
  cacheExpiry.clear();
  // Clear all debounce timers
  debounceTimers.forEach(timer => clearTimeout(timer));
  debounceTimers.clear();
};
