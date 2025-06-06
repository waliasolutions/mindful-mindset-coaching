
// Unified content storage system to replace the dual storage approach
interface ContentData {
  [key: string]: any;
}

interface SectionContent {
  id: string;
  type: string;
  data: ContentData;
  lastModified: string;
  version: number;
}

const UNIFIED_CONTENT_KEY = 'unifiedSiteContent';
const CONTENT_VERSION_KEY = 'contentVersion';

// Get current content version
export const getCurrentContentVersion = (): number => {
  try {
    const version = localStorage.getItem(CONTENT_VERSION_KEY);
    return version ? parseInt(version, 10) : 1;
  } catch (error) {
    console.error('Error getting content version:', error);
    return 1;
  }
};

// Increment content version
export const incrementContentVersion = (): number => {
  const currentVersion = getCurrentContentVersion();
  const newVersion = currentVersion + 1;
  localStorage.setItem(CONTENT_VERSION_KEY, newVersion.toString());
  return newVersion;
};

// Get all unified content
export const getUnifiedContent = (): Record<string, SectionContent> => {
  try {
    const content = localStorage.getItem(UNIFIED_CONTENT_KEY);
    return content ? JSON.parse(content) : {};
  } catch (error) {
    console.error('Error parsing unified content:', error);
    return {};
  }
};

// Save section content
export const saveUnifiedSectionContent = (sectionId: string, sectionType: string, data: ContentData): boolean => {
  try {
    const allContent = getUnifiedContent();
    const newVersion = incrementContentVersion();
    
    allContent[sectionId] = {
      id: sectionId,
      type: sectionType,
      data,
      lastModified: new Date().toISOString(),
      version: newVersion
    };
    
    localStorage.setItem(UNIFIED_CONTENT_KEY, JSON.stringify(allContent));
    
    // Dispatch update event
    window.dispatchEvent(new CustomEvent('unifiedContentUpdated', { 
      detail: { sectionId, data, version: newVersion }
    }));
    
    return true;
  } catch (error) {
    console.error('Error saving unified content:', error);
    return false;
  }
};

// Get section content
export const getUnifiedSectionContent = (sectionId: string, defaultContent: ContentData = {}): ContentData => {
  try {
    const allContent = getUnifiedContent();
    const sectionContent = allContent[sectionId];
    
    if (sectionContent && sectionContent.data) {
      return { ...defaultContent, ...sectionContent.data };
    }
    
    return defaultContent;
  } catch (error) {
    console.error('Error getting unified section content:', error);
    return defaultContent;
  }
};

// Delete section content
export const deleteUnifiedSectionContent = (sectionId: string): boolean => {
  try {
    const allContent = getUnifiedContent();
    delete allContent[sectionId];
    
    localStorage.setItem(UNIFIED_CONTENT_KEY, JSON.stringify(allContent));
    
    window.dispatchEvent(new CustomEvent('unifiedContentUpdated', { 
      detail: { sectionId, data: null, deleted: true }
    }));
    
    return true;
  } catch (error) {
    console.error('Error deleting unified section content:', error);
    return false;
  }
};

// Migrate legacy content to unified system
export const migrateLegacyContent = (): void => {
  try {
    console.log('Starting content migration...');
    
    // Migrate from adminContentOverrides
    const adminOverrides = localStorage.getItem('adminContentOverrides');
    if (adminOverrides) {
      const overrides = JSON.parse(adminOverrides);
      Object.keys(overrides).forEach(sectionId => {
        const existingUnified = getUnifiedSectionContent(sectionId);
        if (Object.keys(existingUnified).length === 0) {
          saveUnifiedSectionContent(sectionId, 'section', overrides[sectionId]);
        }
      });
    }
    
    // Migrate from section_ prefixed storage
    const sectionPrefixes = ['hero', 'services', 'pricing', 'about', 'contact'];
    sectionPrefixes.forEach(sectionId => {
      const sectionKey = `section_${sectionId}`;
      const sectionData = localStorage.getItem(sectionKey);
      if (sectionData) {
        try {
          const parsedData = JSON.parse(sectionData);
          const existingUnified = getUnifiedSectionContent(sectionId);
          if (Object.keys(existingUnified).length === 0) {
            saveUnifiedSectionContent(sectionId, 'section', parsedData);
          }
        } catch (e) {
          console.error(`Error migrating section ${sectionId}:`, e);
        }
      }
    });
    
    console.log('Content migration completed');
  } catch (error) {
    console.error('Error during content migration:', error);
  }
};

// Clear all content (for reset functionality)
export const clearAllUnifiedContent = (): void => {
  localStorage.removeItem(UNIFIED_CONTENT_KEY);
  localStorage.removeItem(CONTENT_VERSION_KEY);
  window.dispatchEvent(new CustomEvent('unifiedContentCleared'));
};
