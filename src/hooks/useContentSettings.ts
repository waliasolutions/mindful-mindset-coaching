
import { useState, useEffect } from 'react';
import { dispatchStorageEvent } from '@/utils/storageEvents';

export interface ContentSettings {
  [sectionId: string]: any;
}

export const useContentSettings = (sectionId: string, defaultContent: any = {}) => {
  const [content, setContent] = useState(defaultContent);

  const loadContent = () => {
    try {
      const stored = localStorage.getItem(`section_${sectionId}`);
      if (stored) {
        const parsedContent = JSON.parse(stored);
        setContent({ ...defaultContent, ...parsedContent });
      } else {
        setContent(defaultContent);
      }
    } catch (error) {
      console.error(`Error loading content for ${sectionId}:`, error);
      setContent(defaultContent);
    }
  };

  useEffect(() => {
    loadContent();

    // Listen for storage changes from other tabs
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === `section_${sectionId}`) {
        loadContent();
      }
    };

    // Listen for custom storage events (same tab)
    const handleCustomStorageChange = (e: CustomEvent) => {
      if (e.detail?.key === `section_${sectionId}`) {
        loadContent();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageUpdated', handleCustomStorageChange as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageUpdated', handleCustomStorageChange as EventListener);
    };
  }, [sectionId]);

  const updateContent = (newContent: any) => {
    try {
      const mergedContent = { ...defaultContent, ...content, ...newContent };
      localStorage.setItem(`section_${sectionId}`, JSON.stringify(mergedContent));
      setContent(mergedContent);
      dispatchStorageEvent(`section_${sectionId}`, JSON.stringify(mergedContent));
    } catch (error) {
      console.error(`Error updating content for ${sectionId}:`, error);
    }
  };

  return { content, updateContent, loadContent };
};
