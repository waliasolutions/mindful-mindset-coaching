
import { useState, useEffect, useCallback } from 'react';

interface ContentOverrides {
  [sectionId: string]: {
    [key: string]: any;
  };
}

// Cache for content to prevent repeated localStorage reads
const contentCache = new Map<string, any>();
const cacheExpiry = new Map<string, number>();
const CACHE_DURATION = 5000; // 5 seconds

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

  const updateContent = useCallback((newOverrides: any) => {
    const mergedContent = { ...defaultContent, ...newOverrides };
    setContent(mergedContent);
    
    // Update cache
    const cacheKey = `content_${sectionId}`;
    contentCache.set(cacheKey, mergedContent);
    cacheExpiry.set(cacheKey, Date.now() + CACHE_DURATION);
  }, [defaultContent, sectionId]);

  useEffect(() => {
    // Listen for admin content updates with debouncing
    let debounceTimer: NodeJS.Timeout;
    
    const handleStorageChange = (event: CustomEvent) => {
      if (event.detail.key === 'adminContentOverrides') {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          try {
            const overrides: ContentOverrides = JSON.parse(event.detail.newValue || '{}');
            if (overrides[sectionId]) {
              updateContent(overrides[sectionId]);
            } else {
              updateContent({});
            }
          } catch (error) {
            console.error('Error parsing admin content overrides:', error);
          }
        }, 100); // 100ms debounce
      }
    };

    window.addEventListener('localStorageUpdated', handleStorageChange as EventListener);
    
    return () => {
      window.removeEventListener('localStorageUpdated', handleStorageChange as EventListener);
      clearTimeout(debounceTimer);
    };
  }, [sectionId, updateContent]);

  return content;
};

// Helper function to save admin content overrides with caching
export const saveContentOverride = (sectionId: string, overrides: any) => {
  try {
    const existingOverrides = localStorage.getItem('adminContentOverrides');
    const currentOverrides: ContentOverrides = existingOverrides ? JSON.parse(existingOverrides) : {};
    
    currentOverrides[sectionId] = overrides;
    
    const newValue = JSON.stringify(currentOverrides);
    localStorage.setItem('adminContentOverrides', newValue);
    
    // Update cache immediately
    const cacheKey = `content_${sectionId}`;
    const defaultContent = contentCache.get(cacheKey) || {};
    const mergedContent = { ...defaultContent, ...overrides };
    contentCache.set(cacheKey, mergedContent);
    cacheExpiry.set(cacheKey, Date.now() + CACHE_DURATION);
    
    // Dispatch custom event for same-tab communication
    window.dispatchEvent(new CustomEvent('localStorageUpdated', { 
      detail: { key: 'adminContentOverrides', newValue }
    }));
    
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
};
