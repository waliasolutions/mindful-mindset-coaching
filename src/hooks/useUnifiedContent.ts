
import { useState, useEffect, useCallback } from 'react';
import { 
  getUnifiedSectionContent, 
  saveUnifiedSectionContent,
  migrateLegacyContent 
} from '@/utils/unifiedContentStorage';
import { extractSectionContentFlexible } from '@/utils/improvedContentExtractor';

interface UseUnifiedContentReturn {
  content: any;
  isLoading: boolean;
  updateContent: (newContent: any) => boolean;
  refreshContent: () => void;
}

export const useUnifiedContent = (sectionId: string, defaultContent: any = {}): UseUnifiedContentReturn => {
  const [content, setContent] = useState(() => {
    // Get content from unified storage first, then extract from DOM as fallback
    const savedContent = getUnifiedSectionContent(sectionId, {});
    if (Object.keys(savedContent).length > 0) {
      return { ...defaultContent, ...savedContent };
    }
    
    // If no saved content, try to extract from DOM
    const extractedContent = extractSectionContentFlexible(sectionId);
    return { ...defaultContent, ...extractedContent };
  });
  
  const [isLoading, setIsLoading] = useState(false);

  // Migrate legacy content on first load
  useEffect(() => {
    migrateLegacyContent();
  }, []);

  const refreshContent = useCallback(() => {
    setIsLoading(true);
    
    // Get latest saved content
    const savedContent = getUnifiedSectionContent(sectionId, {});
    
    // If no saved content, extract from DOM
    if (Object.keys(savedContent).length === 0) {
      const extractedContent = extractSectionContentFlexible(sectionId);
      setContent({ ...defaultContent, ...extractedContent });
    } else {
      setContent({ ...defaultContent, ...savedContent });
    }
    
    setIsLoading(false);
  }, [sectionId, defaultContent]);

  const updateContent = useCallback((newContent: any) => {
    const success = saveUnifiedSectionContent(sectionId, 'section', newContent);
    if (success) {
      setContent({ ...defaultContent, ...newContent });
    }
    return success;
  }, [sectionId, defaultContent]);

  // Listen for unified content updates
  useEffect(() => {
    const handleContentUpdate = (event: CustomEvent) => {
      if (event.detail.sectionId === sectionId) {
        if (event.detail.deleted) {
          setContent(defaultContent);
        } else if (event.detail.data) {
          setContent({ ...defaultContent, ...event.detail.data });
        }
      }
    };

    const handleContentCleared = () => {
      setContent(defaultContent);
    };

    window.addEventListener('unifiedContentUpdated', handleContentUpdate as EventListener);
    window.addEventListener('unifiedContentCleared', handleContentCleared as EventListener);
    
    return () => {
      window.removeEventListener('unifiedContentUpdated', handleContentUpdate as EventListener);
      window.removeEventListener('unifiedContentCleared', handleContentCleared as EventListener);
    };
  }, [sectionId, defaultContent]);

  return {
    content,
    isLoading,
    updateContent,
    refreshContent
  };
};
