
import { ArrowDown, Leaf, Shield } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import { Badge } from '@/components/ui/badge';
import OptimizedImage from './OptimizedImage';

const Hero = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    // Staggered reveal animation
    const elements = [headingRef.current, subtitleRef.current, ctaRef.current];
    
    elements.forEach((el, index) => {
      if (el) {
        setTimeout(() => {
          el.classList.add('opacity-100');
          el.classList.remove('opacity-0', 'translate-y-10');
        }, 300 * (index + 1));
      }
    });

    // Pre-connect to external domains if any
    const domains = ['fonts.googleapis.com', 'fonts.gstatic.com'];
    domains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = `https://${domain}`;
      document.head.appendChild(link);
    });
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden">
      {/* Background pattern and gradient */}
      <div className="absolute inset-0 bg-beige/60 leaf-pattern -z-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-40 right-10 w-64 h-64 bg-sage/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-mauve/20 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <div className="mb-10">
              <h1 
                ref={headingRef}
                className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6 transition-all duration-700 ease-out opacity-0 translate-y-10"
              >
                <span className="bg-gradient-to-r from-moss via-petrol to-forest bg-clip-text text-transparent">Mindset Coaching</span> für ein glückliches und erfülltes Leben
              </h1>
              <p 
                ref={subtitleRef}
                className="text-lg md:text-xl text-foreground/90 mb-8 max-w-xl transition-all duration-700 ease-out opacity-0 translate-y-10 delay-100"
              >
                Entfalte dein volles Potenzial und erschaffe das Leben, von dem du träumst. Mit dem richtigen Mindset sind deinen Möglichkeiten keine Grenzen gesetzt.
              </p>
              <div 
                ref={ctaRef}
                className="flex flex-col sm:flex-row gap-4 transition-all duration-700 ease-out opacity-0 translate-y-10 delay-200"
              >
                <a 
                  href="#contact" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-petrol text-white hover:bg-petrol/90 transition-colors shadow-lg font-medium rounded-md"
                >
                  Kostenloses Erstgespräch vereinbaren
                </a>
                <a 
                  href="#services" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-sage/30 hover:bg-sage/40 text-forest transition-colors focus-ring text-center"
                >
                  Mehr erfahren
                </a>
              </div>
            </div>
          </div>
          
          <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
            <div className="aspect-[3/4] overflow-hidden shadow-xl transition-all duration-500 hover:shadow-2xl rounded-lg">
              <div className="image-reveal reveal w-full h-full relative">
                <OptimizedImage 
                  src="/lovable-uploads/7b4f0db6-80ea-4da6-b817-0f33ba7562b5.png" 
                  alt="Martina Domeniconi - Mindset Coach" 
                  className="w-full h-full object-cover object-center"
                  priority="high"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onLoad={() => setImageLoaded(true)}
                />
                <div className="absolute inset-0 bg-forest/20 rounded-lg"></div>
                
                {/* Add badge overlay - now aligned to the right */}
                <div className="absolute bottom-4 right-4 z-10">
                  <Badge variant="default" className="bg-white text-forest flex items-center gap-2 py-2 px-3 shadow-lg">
                    <Shield size={16} className="text-forest" />
                    Zertifizierter Mindset Coach
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator - hidden on mobile */}
      {!isMobile && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#services" className="flex flex-col items-center text-forest/70 hover:text-forest transition-colors">
            <span className="text-sm mb-2">Mehr</span>
            <ArrowDown size={20} />
          </a>
        </div>
      )}
    </section>
  );
};

export default Hero;
