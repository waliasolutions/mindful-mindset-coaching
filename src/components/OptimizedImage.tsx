
import { useState } from 'react';
import { getWebPVersion, getImageLoadingStrategy } from '../utils/imageOptimizer';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: 'high' | 'medium' | 'low';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  onClick?: () => void;
}

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = 'medium',
  objectFit = 'cover',
  onClick,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Generate WebP version if possible
  const webpSrc = getWebPVersion(src);
  
  // Determine loading strategy
  const loading = getImageLoadingStrategy(priority);
  
  // Handle image load error
  const handleError = () => {
    setError(true);
    console.warn(`Failed to load optimized image: ${webpSrc}, falling back to original: ${src}`);
  };
  
  // Basic styling based on objectFit
  const objectFitClass = `object-${objectFit}`;
  
  // Placeholder for loading state
  const placeholderClass = !isLoaded ? 'bg-gray-200 animate-pulse' : '';
  
  return (
    <img
      src={error ? src : webpSrc}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      className={`transition-opacity duration-300 ${objectFitClass} ${placeholderClass} ${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      onLoad={() => setIsLoaded(true)}
      onError={handleError}
      onClick={onClick}
      decoding="async"
    />
  );
};

export default OptimizedImage;
