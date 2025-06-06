
import { useEffect } from 'react';

interface ContentDebuggerProps {
  sectionId: string;
  content: any;
  isVisible?: boolean;
}

const ContentDebugger = ({ sectionId, content, isVisible }: ContentDebuggerProps) => {
  useEffect(() => {
    console.group(`Content Debug - ${sectionId}`);
    console.log('Content loaded:', content);
    console.log('Content keys:', Object.keys(content || {}));
    console.log('Content values:', content);
    console.log('Is visible:', isVisible);
    
    // Check localStorage for admin overrides
    const adminOverrides = localStorage.getItem('adminContentOverrides');
    if (adminOverrides) {
      try {
        const overrides = JSON.parse(adminOverrides);
        console.log('Admin overrides for section:', overrides[sectionId]);
      } catch (e) {
        console.error('Corrupted admin overrides in localStorage:', e);
      }
    } else {
      console.log('No admin overrides found');
    }
    
    console.groupEnd();
  }, [sectionId, content, isVisible]);

  // Only show debug info in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-2 rounded text-xs max-w-xs z-50">
      <strong>{sectionId}</strong>
      <div>Keys: {Object.keys(content || {}).length}</div>
      <div>Visible: {isVisible ? 'Yes' : 'No'}</div>
    </div>
  );
};

export default ContentDebugger;
