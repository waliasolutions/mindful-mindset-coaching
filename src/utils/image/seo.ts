
// Add the missing function that's being imported in seoOptimizer.ts
export const generateAltText = (src: string): string => {
  // Extract filename from path
  const filename = src.split('/').pop() || '';
  
  // Remove extension and replace dashes/underscores with spaces
  const baseFilename = filename.split('.')[0].replace(/[-_]/g, ' ');
  
  // Capitalize first letter of each word
  return baseFilename
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const optimizeImageForSEO = (src: string, alt: string): string => {
  // This is a placeholder function that would normally transform the src
  // for better SEO, but for now we just return the original src
  return src;
};
