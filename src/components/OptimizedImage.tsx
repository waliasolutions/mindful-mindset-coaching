
import { useState, useEffect } from 'react';
import { getImageLoadingStrategy } from '../utils/image';
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
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const loading = getImageLoadingStrategy(priority);
  const fetchPriority = priority === 'high' ? 'high' : 'auto';
  
  const handleError = () => {
    setError(true);
    console.warn(`Failed to load image: ${src}`);
  };
  
  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) {
      onLoad();
    }
  };
  
  const objectFitClass = `object-${objectFit}`;
  const showPlaceholder = mounted && !isLoaded && !error;
  
  // This div will now default to w-full h-full, allowing it to fill its parent (e.g., the aspect-ratio box in Hero).
  // If width/height props are provided, the inline style will set specific pixel dimensions.
  return (
    <div 
      className="relative w-full h-full" 
      style={{ 
        zIndex: 0, // zIndex for stacking context if needed, kept from original
        width: width ? `${width}px` : undefined, // Apply explicit width if provided
        height: height ? `${height}px` : undefined // Apply explicit height if provided
      }}
    >
      {showPlaceholder && (
        <Skeleton 
          className={`absolute inset-0 ${className}`} // className prop from OptimizedImage is for styling the img, but Skeleton might need its own styles
                                                 // For now, this is kept, but review if Skeleton needs specific classes passed via a new prop
          style={{ 
            width: width ? `${width}px` : '100%', // Skeleton fills based on explicit or 100%
            height: height ? `${height}px` : '100%' 
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        // Pass width/height attributes to img tag if provided, helps browser with layout
        width={width} 
        height={height}
        loading={loading}
        fetchPriority={fetchPriority as any}
        className={`transition-opacity duration-300 ${objectFitClass} ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className} ${width && height ? '' : 'w-full h-full'}`} // Ensure img also fills its container if no explicit pixel dimensions
        onLoad={handleLoad}
        onError={handleError}
        onClick={onClick}
        decoding="async"
        style={{ zIndex: 1 }} // zIndex for the image itself, kept from original
        sizes={sizes} // Added sizes prop back to img tag
      />
    </div>
  );
};

export default OptimizedImage;
