
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
  onLoad?: () => void;
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
  onLoad,
  sizes = '100vw',
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Set mounted state after component mounts to prevent hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Explicitly use the original source instead of trying WebP conversion
  // This avoids the WebP conversion issues shown in console logs
  
  // Determine loading strategy
  const loading = getImageLoadingStrategy(priority);
  
  // Handle image load error
  const handleError = () => {
    setError(true);
    console.warn(`Failed to load image: ${src}`);
  };
  
  // Handle image load success
  const handleLoad = () => {
    setIsLoaded(true);
    // Call the onLoad prop if it exists
    if (onLoad) {
      onLoad();
    }
  };
  
  // Basic styling based on objectFit
  const objectFitClass = `object-${objectFit}`;
  
  // Don't show placeholder during SSR to prevent hydration mismatch
  const showPlaceholder = mounted && !isLoaded && !error;
  
  return (
    <div className={`relative ${width ? 'w-full' : ''} ${height ? 'h-full' : ''}`} style={{ zIndex: 0 }}>
      {showPlaceholder && (
        <Skeleton 
          className={`absolute inset-0 ${className}`} 
          style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : '100%' }}
        />
      )}
      <img
        src={src} /* Use original source directly */
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        className={`transition-opacity duration-300 ${objectFitClass} ${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={handleLoad}
        onError={handleError}
        onClick={onClick}
        decoding="async"
        style={{ zIndex: 1 }}
      />
    </div>
  );
};

export default OptimizedImage;
