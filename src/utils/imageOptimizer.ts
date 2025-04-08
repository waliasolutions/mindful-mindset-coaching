
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
  
  // For URLs with query parameters
  if (imageUrl.includes('?')) {
    const [path, query] = imageUrl.split('?');
    return `${path.replace(/\.(jpe?g|png|gif)$/i, '.webp')}?${query}`;
  }
  
  // Simple path replacement
  return imageUrl.replace(/\.(jpe?g|png|gif)$/i, '.webp');
};

/**
 * Helper function to create srcset for responsive images
 */
export const generateSrcSet = (baseUrl: string, widths: number[] = [640, 960, 1280, 1920]): string => {
  if (!baseUrl || typeof baseUrl !== 'string') return baseUrl;
  
  // SVGs don't need srcset
  if (baseUrl.endsWith('.svg')) return baseUrl;
  
  // Create WebP version of base URL
  const webpUrl = getWebPVersion(baseUrl);
  
  // For URLs that might have query parameters
  let prefix = webpUrl;
  let suffix = '';
  
  if (webpUrl.includes('?')) {
    [prefix, suffix] = webpUrl.split('?');
    suffix = `?${suffix}`;
  }
  
  return widths
    .map(width => `${prefix}?width=${width}${suffix} ${width}w`)
    .join(', ');
};

/**
 * Determines appropriate loading strategy based on image position
 */
export const getImageLoadingStrategy = (priority: 'high' | 'medium' | 'low' = 'medium'): 'eager' | 'lazy' => {
  switch (priority) {
    case 'high':
      return 'eager'; // Load immediately, good for above-the-fold content
    case 'low':
    case 'medium':
    default:
      return 'lazy'; // Load when user scrolls near it
  }
};
