
/**
 * Generate alt text for images
 */
export const generateOptimizedAlt = (baseName: string): string => {
  return baseName.replace(/-/g, ' ').replace(/\.\w+$/, '');
};
