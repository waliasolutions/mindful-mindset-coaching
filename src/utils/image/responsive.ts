
import { getWebPVersion } from './webp';

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
