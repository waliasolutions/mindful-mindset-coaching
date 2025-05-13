
/**
 * Get WebP version of an image if supported, otherwise return original
 * This is a simplified version that doesn't depend on Sharp
 */
export const getWebPVersion = (src: string): string => {
  // Simply return the original source for now
  // In a real implementation, you could check if there's already a .webp version available
  return src;
};
