/**
 * Generate alt text for images
 */
export const generateOptimizedAlt = (baseName: string): string => {
  return baseName.replace(/-/g, ' ').replace(/\.\w+$/, '');
};

/**
 * Optimize image for SEO
 */
export const optimizeImageForSEO = (src: string, alt: string) => {
  // Simple implementation that returns the original src
  // since we removed the Sharp dependency
  return src;
};
