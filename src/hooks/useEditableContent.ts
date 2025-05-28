
import { useState, useEffect } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';

interface UseEditableContentOptions {
  pageId: string;
  contentKey: string;
  defaultValue: any;
  contentType: 'text' | 'image' | 'rich_text';
}

export const useEditableContent = ({ pageId, contentKey, defaultValue, contentType }: UseEditableContentOptions) => {
  const { getContent, saveContent } = useEditMode();
  const [content, setContent] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      setIsLoading(true);
      try {
        const savedContent = await getContent(pageId, contentKey);
        if (savedContent) {
          setContent(savedContent);
        }
      } catch (error) {
        console.error('Error loading content:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [pageId, contentKey, getContent]);

  const updateContent = async (newContent: any) => {
    try {
      await saveContent(pageId, contentKey, newContent, contentType);
      setContent(newContent);
    } catch (error) {
      console.error('Error updating content:', error);
    }
  };

  return {
    content,
    updateContent,
    isLoading
  };
};
