
import { getWebPVersion } from './webp';
import { generateSrcSet } from './responsive';
import { generateAltText } from './alt';
import { getImageLoadingStrategy } from './loading';

/**
 * Optimizes image delivery for SEO
 */
export const optimizeImageForSEO = (
  src: string,
  alt: string = '',
  priority: 'high' | 'medium' | 'low' = 'medium',
  widths: number[] = [640, 960, 1280, 1920],
  sizes: string = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
) => {
  return {
    src,
    srcSet: generateSrcSet(src, widths),
    alt: alt || generateAltText(src),
    loading: getImageLoadingStrategy(priority),
    decoding: 'async',
    sizes
  };
};
