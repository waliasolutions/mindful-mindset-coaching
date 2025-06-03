
import { useEffect } from 'react';
import { toast } from 'sonner';

export const useAdminNotifications = () => {
  useEffect(() => {
    const handleContentUpdate = (e: CustomEvent) => {
      const { sectionId } = e.detail;
      toast.success(`${sectionId} content updated successfully`, {
        description: 'Changes are now live on the website',
        duration: 3000,
      });
    };

    window.addEventListener('contentUpdated', handleContentUpdate as EventListener);
    
    return () => {
      window.removeEventListener('contentUpdated', handleContentUpdate as EventListener);
    };
  }, []);
};
