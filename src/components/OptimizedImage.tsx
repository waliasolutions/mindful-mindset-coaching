
import { useState, useEffect } from 'react';
import { getWebPVersion, getImageLoadingStrategy, generateSrcSet } from '../utils/imageOptimizer';
import { Skeleton } from '@/components/ui/skeleton';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: 'high' | 'medium' | 'low';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  onClick?: () => void;
  sizes?: string;
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
  sizes = '100vw',
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Set mounted state after component mounts to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Generate WebP version if possible
  const webpSrc = getWebPVersion(src);
  
  // Generate srcset for responsive images
  const srcSet = generateSrcSet(src);
  
  // Determine loading strategy
  const loading = getImageLoadingStrategy(priority);
  
  // Handle image load error
  const handleError = () => {
    setError(true);
    console.warn(`Failed to load optimized image: ${webpSrc}, falling back to original: ${src}`);
  };
  
  // Basic styling based on objectFit
  const objectFitClass = `object-${objectFit}`;
  
  // Don't show placeholder during SSR to prevent hydration mismatch
  const showPlaceholder = mounted && !isLoaded;
  
  return (
    <div className={`relative ${width ? 'w-full' : ''} ${height ? 'h-full' : ''}`}>
      {showPlaceholder && (
        <Skeleton 
          className={`absolute inset-0 ${className}`} 
          style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : '100%' }}
        />
      )}
      <img
        src={error ? src : webpSrc}
        srcSet={!error ? srcSet : undefined}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        className={`transition-opacity duration-300 ${objectFitClass} ${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        onClick={onClick}
        decoding="async"
      />
    </div>
  );
};

export default OptimizedImage;
