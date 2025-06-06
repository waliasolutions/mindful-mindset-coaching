
import { useState, useEffect } from 'react';
import { getImageLoadingStrategy } from '../utils/image';

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
  title?: string;
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
  title,
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // Determine loading strategy
  const loading = getImageLoadingStrategy(priority);
  const fetchPriority = priority === 'high' ? 'high' : 'auto';
  
  // Handle image load error
  const handleError = () => {
    setError(true);
    console.warn(`Failed to load image: ${src}`);
  };
  
  // Handle image load success
  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad();
    }
  };
  
  // Basic styling based on objectFit
  const objectFitClass = `object-${objectFit}`;
  
  // Show minimal placeholder only for non-critical images
  const showPlaceholder = !isLoaded && !error && priority !== 'high';
  
  return (
    <div 
      className={`relative ${width ? 'w-full' : ''} ${height ? 'h-full' : ''}`} 
      style={{ 
        width: width ? `${width}px` : undefined,
        height: height ? `${height}px` : undefined
      }}
    >
      {showPlaceholder && (
        <div 
          className={`absolute inset-0 bg-gray-200 animate-pulse ${className}`} 
          style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : '100%' }}
        />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        title={title}
        loading={loading}
        fetchPriority={fetchPriority as any}
        className={`transition-opacity duration-200 ${objectFitClass} ${className} ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={handleLoad}
        onError={handleError}
        onClick={onClick}
        decoding="async"
      />
    </div>
  );
};

export default OptimizedImage;
