
import { useState, useEffect } from 'react';
import OptimizedImage from './OptimizedImage';

interface SEOOptimizedImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: 'high' | 'medium' | 'low';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  onClick?: () => void;
  onLoad?: () => void;
  sizes?: string;
  title?: string;
  caption?: string;
  credit?: string;
}

const SEOOptimizedImage = ({
  src,
  alt,
  title,
  caption,
  credit,
  ...props
}: SEOOptimizedImageProps) => {
  const [optimizedAlt, setOptimizedAlt] = useState(alt || '');
  const [structuredData, setStructuredData] = useState<any>(null);

  useEffect(() => {
    // Generate SEO-optimized alt text if not provided
    if (!alt && src) {
      const filename = src.split('/').pop() || '';
      const baseFilename = filename.split('.')[0].replace(/[-_]/g, ' ');
      const generatedAlt = baseFilename
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
      
      setOptimizedAlt(`${generatedAlt} - Mindset Coaching mit Martina`);
    }

    // Generate structured data for the image
    const imageSchema = {
      "@context": "https://schema.org",
      "@type": "ImageObject",
      "url": src.startsWith('http') ? src : `https://mindset-coach-martina.ch${src}`,
      "name": title || optimizedAlt,
      "description": caption || optimizedAlt,
      "width": props.width,
      "height": props.height,
      "encodingFormat": src.includes('.webp') ? 'image/webp' : src.includes('.jpg') || src.includes('.jpeg') ? 'image/jpeg' : 'image/png',
      "copyrightHolder": {
        "@type": "Organization",
        "name": "Mindset Coaching mit Martina"
      },
      ...(credit && { "creditText": credit }),
      "isAccessibleForFree": true,
      "license": "https://mindset-coach-martina.ch/terms"
    };

    setStructuredData(imageSchema);
  }, [src, alt, title, caption, credit, optimizedAlt, props.width, props.height]);

  return (
    <figure className="relative">
      <OptimizedImage
        {...props}
        src={src}
        alt={optimizedAlt}
        title={title || optimizedAlt}
      />
      {caption && (
        <figcaption className="text-sm text-gray-600 mt-2 text-center">
          {caption}
        </figcaption>
      )}
      {structuredData && (
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </figure>
  );
};

export default SEOOptimizedImage;
