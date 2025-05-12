
/**
 * Generates a WebP version of an image URL
 * Note: This works when your server supports WebP conversion with the .webp extension
 */
export const getWebPVersion = (imageUrl: string): string => {
  if (!imageUrl || typeof imageUrl !== 'string') return imageUrl;
  
  // Don't modify SVG images
  if (imageUrl.endsWith('.svg')) return imageUrl;
  
  // Check if the image is already a WebP
  if (imageUrl.endsWith('.webp')) return imageUrl;
  
  // For Lovable uploaded images (add .webp query parameter instead of changing extension)
  if (imageUrl.includes('/lovable-uploads/')) {
    return `${imageUrl}?format=webp`;
  }
  
  // For URLs with query parameters
  if (imageUrl.includes('?')) {
    const [path, query] = imageUrl.split('?');
    return `${path.replace(/\.(jpe?g|png|gif)$/i, '.webp')}?${query}`;
  }
  
  // Simple path replacement
  return imageUrl.replace(/\.(jpe?g|png|gif)$/i, '.webp');
};
