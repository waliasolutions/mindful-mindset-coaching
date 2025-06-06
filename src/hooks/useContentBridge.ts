
import { useState, useEffect, useCallback, useRef } from 'react';

interface ContentOverrides {
  [sectionId: string]: {
    [key: string]: any;
  };
}

// Enhanced cache for content with better invalidation
const contentCache = new Map<string, any>();
const cacheExpiry = new Map<string, number>();
const CACHE_DURATION = 10000; // 10 seconds for better stability

// Improved debounce map for preventing rapid updates
const debounceTimers = new Map<string, NodeJS.Timeout>();

export const useContentBridge = (sectionId: string, defaultContent: any) => {
  const [content, setContent] = useState(() => {
    console.log(`[ContentBridge] Initializing ${sectionId} with default:`, defaultContent);
    
    // Check cache first
    const cacheKey = `content_${sectionId}`;
    const cached = contentCache.get(cacheKey);
    const expiry = cacheExpiry.get(cacheKey);
    
    if (cached && expiry && Date.now() < expiry) {
      console.log(`[ContentBridge] Using cached content for ${sectionId}:`, cached);
      return cached;
    }
    
    // If not cached, try localStorage with better error handling
    try {
      const adminOverrides = localStorage.getItem('adminContentOverrides');
      if (adminOverrides) {
        const overrides: ContentOverrides = JSON.parse(adminOverrides);
        if (overrides[sectionId]) {
          const mergedContent = { ...defaultContent, ...overrides[sectionId] };
          console.log(`[ContentBridge] Using admin overrides for ${sectionId}:`, mergedContent);
          // Cache the result
          contentCache.set(cacheKey, mergedContent);
          cacheExpiry.set(cacheKey, Date.now() + CACHE_DURATION);
          return mergedContent;
        }
      }
    } catch (error) {
      console.error(`[ContentBridge] Error parsing admin content overrides for ${sectionId}:`, error);
      // Clear corrupted localStorage
      try {
        localStorage.removeItem('adminContentOverrides');
        console.log('[ContentBridge] Cleared corrupted localStorage');
      } catch (e) {
        console.error('[ContentBridge] Failed to clear corrupted localStorage:', e);
      }
    }
    
    // Cache default content
    console.log(`[ContentBridge] Using default content for ${sectionId}:`, defaultContent);
    contentCache.set(cacheKey, defaultContent);
    cacheExpiry.set(cacheKey, Date.now() + CACHE_DURATION);
    return defaultContent;
  });

  const updateContentRef = useRef<(newOverrides: any) => void>();

  updateContentRef.current = useCallback((newOverrides: any) => {
    const mergedContent = { ...defaultContent, ...newOverrides };
    console.log(`[ContentBridge] Updating content for ${sectionId}:`, mergedContent);
    setContent(mergedContent);
    
    // Update cache
    const cacheKey = `content_${sectionId}`;
    contentCache.set(cacheKey, mergedContent);
    cacheExpiry.set(cacheKey, Date.now() + CACHE_DURATION);
  }, [defaultContent, sectionId]);

  useEffect(() => {
    // Listen for admin content updates with enhanced error handling
    const handleStorageChange = (event: CustomEvent) => {
      if (event.detail.key === 'adminContentOverrides') {
        // Clear existing debounce timer
        const timerId = debounceTimers.get(sectionId);
        if (timerId) {
          clearTimeout(timerId);
        }
        
        // Set new debounced update with better error handling
        const newTimerId = setTimeout(() => {
          try {
            const overrides: ContentOverrides = JSON.parse(event.detail.newValue || '{}');
            if (overrides[sectionId]) {
              updateContentRef.current?.(overrides[sectionId]);
            } else {
              updateContentRef.current?.({});
            }
          } catch (error) {
            console.error(`[ContentBridge] Error parsing admin content overrides in storage change for ${sectionId}:`, error);
            // Don't update content if parsing fails
          }
          debounceTimers.delete(sectionId);
        }, 300); // Longer debounce for stability
        
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

  // Add validation to ensure content is not empty
  useEffect(() => {
    if (!content || Object.keys(content).length === 0) {
      console.warn(`[ContentBridge] Empty content detected for ${sectionId}, using defaults`);
      setContent(defaultContent);
    }
  }, [content, defaultContent, sectionId]);

  return content;
};

// Enhanced save function with better error handling and performance
export const saveContentOverride = (sectionId: string, overrides: any) => {
  try {
    console.log(`[ContentBridge] Saving content override for ${sectionId}:`, overrides);
    
    // Get existing overrides with better error handling
    let currentOverrides: ContentOverrides = {};
    try {
      const existingOverrides = localStorage.getItem('adminContentOverrides');
      if (existingOverrides) {
        currentOverrides = JSON.parse(existingOverrides);
      }
    } catch (error) {
      console.error('[ContentBridge] Error parsing existing overrides, starting fresh:', error);
      currentOverrides = {};
    }
    
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
    
    // Dispatch custom event for same-tab communication with improved debouncing
    const eventKey = `localStorageUpdated_${sectionId}`;
    const existingTimer = debounceTimers.get(eventKey);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }
    
    const timer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('localStorageUpdated', { 
        detail: { key: 'adminContentOverrides', newValue }
      }));
      debounceTimers.delete(eventKey);
    }, 150); // Shorter delay for immediate feedback
    
    debounceTimers.set(eventKey, timer);
    
    return true;
  } catch (error) {
    console.error('[ContentBridge] Error saving content override:', error);
    return false;
  }
};

// Clear cache function for admin use
export const clearContentCache = () => {
  console.log('[ContentBridge] Clearing content cache');
  contentCache.clear();
  cacheExpiry.clear();
  // Clear all debounce timers
  debounceTimers.forEach(timer => clearTimeout(timer));
  debounceTimers.clear();
};

// Reset function to clear corrupted data
export const resetContentOverrides = () => {
  try {
    localStorage.removeItem('adminContentOverrides');
    clearContentCache();
    console.log('[ContentBridge] Reset content overrides and cache');
    // Reload the page to ensure fresh content
    window.location.reload();
  } catch (error) {
    console.error('[ContentBridge] Error resetting content overrides:', error);
  }
};
