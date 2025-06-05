
import { useState, useEffect } from 'react';
import { useContentBridge } from './useContentBridge';

interface ImageOverrides {
  [key: string]: string;
}

export const useImageBridge = (imageKey: string, defaultImageUrl: string) => {
  const [imageUrl, setImageUrl] = useState(defaultImageUrl);

  useEffect(() => {
    // Check for image overrides in localStorage
    const imageOverrides = localStorage.getItem('adminImageOverrides');
    if (imageOverrides) {
      try {
        const overrides: ImageOverrides = JSON.parse(imageOverrides);
        if (overrides[imageKey]) {
          setImageUrl(overrides[imageKey]);
        }
      } catch (error) {
        console.error('Error parsing image overrides:', error);
      }
    }

    // Listen for image override updates
    const handleImageUpdate = (event: CustomEvent) => {
      if (event.detail.key === 'adminImageOverrides') {
        try {
          const overrides: ImageOverrides = JSON.parse(event.detail.newValue || '{}');
          setImageUrl(overrides[imageKey] || defaultImageUrl);
        } catch (error) {
          console.error('Error parsing image overrides:', error);
        }
      }
    };

    window.addEventListener('localStorageUpdated', handleImageUpdate as EventListener);
    
    return () => {
      window.removeEventListener('localStorageUpdated', handleImageUpdate as EventListener);
    };
  }, [imageKey, defaultImageUrl]);

  return imageUrl;
};

// Helper function to save image overrides
export const saveImageOverride = (imageKey: string, imageUrl: string) => {
  try {
    const existingOverrides = localStorage.getItem('adminImageOverrides');
    const currentOverrides: ImageOverrides = existingOverrides ? JSON.parse(existingOverrides) : {};
    
    if (imageUrl === '' || imageUrl === null) {
      // Remove the override
      delete currentOverrides[imageKey];
    } else {
      currentOverrides[imageKey] = imageUrl;
    }
    
    const newValue = JSON.stringify(currentOverrides);
    localStorage.setItem('adminImageOverrides', newValue);
    
    // Dispatch custom event for same-tab communication
    window.dispatchEvent(new CustomEvent('localStorageUpdated', { 
      detail: { key: 'adminImageOverrides', newValue }
    }));
    
    return true;
  } catch (error) {
    console.error('Error saving image override:', error);
    return false;
  }
};
