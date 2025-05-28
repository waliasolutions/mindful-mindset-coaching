
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface EditModeContextType {
  isEditMode: boolean;
  setIsEditMode: (mode: boolean) => void;
  isAdmin: boolean;
  saveContent: (pageId: string, contentKey: string, contentValue: any, contentType: string) => Promise<void>;
  getContent: (pageId: string, contentKey: string) => Promise<any>;
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

export const EditModeProvider = ({ children }: { children: ReactNode }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { user } = useAuth();
  const isAdmin = !!user; // For now, any authenticated user is admin

  const saveContent = async (pageId: string, contentKey: string, contentValue: any, contentType: string) => {
    if (!user) {
      toast.error('You must be logged in to edit content');
      return;
    }

    try {
      // Check if content already exists
      const { data: existingContent } = await supabase
        .from('page_content')
        .select('*')
        .eq('page_id', pageId)
        .eq('content_key', contentKey)
        .single();

      if (existingContent) {
        // Create version backup
        await supabase
          .from('content_versions')
          .insert({
            content_id: existingContent.id,
            version_number: Date.now(), // Simple versioning
            content_value: existingContent.content_value,
            created_by: user.id
          });

        // Update existing content
        const { error } = await supabase
          .from('page_content')
          .update({
            content_value: contentValue,
            updated_at: new Date().toISOString(),
            updated_by: user.id
          })
          .eq('id', existingContent.id);

        if (error) throw error;
      } else {
        // Create new content
        const { error } = await supabase
          .from('page_content')
          .insert({
            page_id: pageId,
            content_key: contentKey,
            content_value: contentValue,
            content_type: contentType,
            updated_by: user.id
          });

        if (error) throw error;
      }

      toast.success('Content saved successfully');
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Failed to save content');
    }
  };

  const getContent = async (pageId: string, contentKey: string) => {
    try {
      const { data, error } = await supabase
        .from('page_content')
        .select('content_value')
        .eq('page_id', pageId)
        .eq('content_key', contentKey)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      return data?.content_value || null;
    } catch (error) {
      console.error('Error getting content:', error);
      return null;
    }
  };

  return (
    <EditModeContext.Provider value={{
      isEditMode,
      setIsEditMode,
      isAdmin,
      saveContent,
      getContent
    }}>
      {children}
    </EditModeContext.Provider>
  );
};

export const useEditMode = () => {
  const context = useContext(EditModeContext);
  if (!context) {
    throw new Error('useEditMode must be used within EditModeProvider');
  }
  return context;
};
