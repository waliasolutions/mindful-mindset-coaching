
import { generateAltText, optimizeImageForSEO } from './seo';

interface SeoImageProps {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  loading?: 'lazy' | 'eager';
  className?: string;
}

export const optimizeImageSeo = (
  src: string,
  alt?: string
): string => {
  // Generate alt text if none provided
  const altText = alt || generateAltText(src);
  
  // Optimize image
  return optimizeImageForSEO(src, altText);
};

export const createSeoImageProps = (props: SeoImageProps): SeoImageProps => {
  const { src, alt, ...rest } = props;
  
  return {
    src: optimizeImageSeo(src, alt),
    alt: alt || generateAltText(src),
    loading: props.loading || 'lazy',
    ...rest
  };
};
