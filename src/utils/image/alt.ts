
/**
 * Generates appropriate alt text if none provided
 */
export const generateAltText = (filename: string, fallback: string = 'Website image'): string => {
  if (!filename || typeof filename !== 'string') return fallback;
  
  // Extract just the filename without path and extension
  const basename = filename.split('/').pop()?.split('.')[0] || '';
  
  // Convert kebab/snake case to readable text
  const readable = basename
    .replace(/[-_]/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2') // handle camelCase
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
    
  return readable || fallback;
};
