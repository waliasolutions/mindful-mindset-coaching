
import { optimizeImageForSEO } from './seo';

export const generateImageAttributes = (
  src: string,
  alt: string = '',
  priority: 'high' | 'medium' | 'low' = 'medium'
) => {
  // Get optimized image attributes
  const imageProps = optimizeImageForSEO(src, alt, priority);
  
  // Add structured data
  const structuredData = {
    '@context': 'https://schema.org/',
    '@type': 'ImageObject',
    contentUrl: src,
    caption: alt,
    description: alt
  };

  return {
    ...imageProps,
    'data-structured': JSON.stringify(structuredData)
  };
};
