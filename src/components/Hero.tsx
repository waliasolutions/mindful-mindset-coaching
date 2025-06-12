
import { ArrowDown, Leaf, Shield } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '../hooks/use-mobile';
import { Badge } from '@/components/ui/badge';
import OptimizedImage from './OptimizedImage';
import { useContentBridge } from '@/hooks/useContentBridge';

const Hero = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const additionalTextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [imageLoaded, setImageLoaded] = useState(false);

  // Default content (original website content)
  const defaultContent = {
    title: "Mindset Coaching für ein glückliches und erfülltes Leben",
    subtitle: "Entfalte dein volles Potenzial und erschaffe das Leben, von dem du träumst. Mit dem richtigen Mindset sind deinen Möglichkeiten keine Grenzen gesetzt.",
    additionalText: "Das zentrale Thema bei Mindset Coaching sind deine persönlichen Überzeugungen und Glaubenssätze. Wovon du selber überzeugst bist, verwirklichst du in deinem Leben. In einem persönlichen Coaching lernst du deine negativen Glaubenssätze zu erkennen und abzulegen und stattdessen in jedem Lebensbereich bestärkende Glaubenssätze zu entwickeln. Dazu gehört auch ein positives Selbstbild aufzubauen und in den inneren Frieden mit dir, deinen Mitmenschen, deiner Vergangenheit und deiner Geschichte zu kommen.",
    buttonText: "Kennenlerngespräch vereinbaren",
    backgroundImage: "/lovable-uploads/7b4f0db6-80ea-4da6-b817-0f33ba7562b5.png"
  };

  // Use content bridge to allow admin overrides
  const content = useContentBridge('hero', defaultContent);

  useEffect(() => {
    // Reduced animation delays for faster perceived loading
    const elements = [headingRef.current, subtitleRef.current, additionalTextRef.current, ctaRef.current];
    elements.forEach((el, index) => {
      if (el) {
        setTimeout(() => {
          el.classList.add('opacity-100');
          el.classList.remove('opacity-0', 'translate-y-10');
        }, 50 * (index + 1)); // Reduced from 150ms to 50ms
      }
    });
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-28 sm:pt-32 md:pt-36 pb-20 sm:pb-24 md:pb-28 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-beige/60 leaf-pattern -z-10"></div>
      
      {/* Reduced decorative elements for better performance */}
      <div className="absolute top-32 sm:top-40 right-4 sm:right-10 w-24 h-24 sm:w-32 sm:h-32 bg-sage/10 rounded-full blur-2xl -z-10"></div>
      <div className="absolute bottom-16 sm:bottom-20 left-4 sm:left-10 w-24 h-24 sm:w-32 sm:h-32 bg-mauve/10 rounded-full blur-2xl -z-10"></div>
      
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 sm:gap-16 lg:gap-20">
          <div className="max-w-2xl w-full text-center lg:text-left">
            <div className="hero-spacing">
              <h1 ref={headingRef} className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight mb-6 sm:mb-8 transition-all duration-300 ease-out opacity-0 translate-y-10 text-center lg:text-left">
                <span className="bg-gradient-to-r from-moss via-petrol to-forest bg-clip-text text-transparent">Mindset Coaching</span> für ein glückliches und erfülltes Leben
              </h1>

              {/* Mobile image - optimized loading */}
              <div className="block lg:hidden mb-8 sm:mb-10 text-center">
                <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto">
                  <div className="aspect-[3/4] overflow-hidden shadow-xl transition-all duration-200 hover:shadow-2xl rounded-lg">
                    <div className="image-reveal reveal w-full h-full relative">
                      <OptimizedImage 
                        src={content.backgroundImage} 
                        alt="Martina Domeniconi - Mindset Coach" 
                        className="w-full h-full object-cover object-center" 
                        priority="high" 
                        sizes="(max-width: 640px) 80vw, (max-width: 768px) 60vw, 50vw" 
                        onLoad={() => setImageLoaded(true)} 
                      />
                      <div className="absolute inset-0 bg-forest/20 rounded-lg"></div>
                      
                      <div className="absolute bottom-4 sm:bottom-5 right-4 sm:right-5 z-10">
                        <Badge variant="default" className="bg-white text-forest flex items-center gap-2 py-2 sm:py-2.5 px-3 sm:px-4 shadow-lg text-xs sm:text-sm">
                          <Shield size={14} className="text-forest" />
                          <span className="hidden sm:inline">Zertifizierter</span> Mindset Coach
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <p ref={subtitleRef} className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/90 mb-6 sm:mb-8 md:mb-10 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left transition-all duration-300 ease-out opacity-0 translate-y-10 delay-50 leading-relaxed">
                {content.subtitle}
              </p>
              <p ref={additionalTextRef} className="text-sm sm:text-base md:text-lg text-foreground/80 mb-8 sm:mb-10 max-w-xl mx-auto lg:mx-0 text-center lg:text-left transition-all duration-300 ease-out opacity-0 translate-y-10 delay-100 leading-relaxed">
                {content.additionalText}
              </p>
              <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center lg:justify-start transition-all duration-300 ease-out opacity-0 translate-y-10 delay-150">
                <a href="#contact" className="inline-flex items-center justify-center px-6 sm:px-7 md:px-8 lg:px-10 py-3 sm:py-3.5 md:py-4 bg-petrol text-white hover:bg-petrol/90 transition-colors shadow-lg font-medium rounded-md text-sm sm:text-base md:text-lg min-h-[48px] touch-manipulation">
                  {content.buttonText}
                </a>
                <a href="#services" className="hidden lg:inline-flex items-center justify-center px-6 sm:px-7 md:px-8 lg:px-10 py-3 sm:py-3.5 md:py-4 bg-sage/30 hover:bg-sage/40 text-forest transition-colors focus-ring text-center rounded-md text-sm sm:text-base md:text-lg min-h-[48px] touch-manipulation">
                  Mehr erfahren
                </a>
              </div>
            </div>
          </div>
          
          {/* Desktop image - high priority loading */}
          <div className="hidden lg:block relative w-full max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-xl">
            <div className="aspect-[3/4] overflow-hidden shadow-xl transition-all duration-200 hover:shadow-2xl rounded-lg">
              <div className="image-reveal reveal w-full h-full relative">
                <OptimizedImage 
                  src={content.backgroundImage} 
                  alt="Martina Domeniconi - Mindset Coach" 
                  className="w-full h-full object-cover object-center" 
                  priority="high" 
                  sizes="(max-width: 1024px) 40vw, (max-width: 1280px) 35vw, 30vw" 
                  onLoad={() => setImageLoaded(true)} 
                />
                <div className="absolute inset-0 bg-forest/20 rounded-lg"></div>
                
                <div className="absolute bottom-5 right-5 z-10">
                  <Badge variant="default" className="bg-white text-forest flex items-center gap-2 py-2.5 px-4 shadow-lg">
                    <Shield size={16} className="text-forest" />
                    Zertifizierter Mindset Coach
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {!isMobile && (
        <div className="absolute bottom-8 sm:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce max-lg:hidden">
          <a href="#services" className="flex flex-col items-center text-forest/70 hover:text-forest transition-colors">
            <span className="text-xs sm:text-sm mb-2">Mehr</span>
            <ArrowDown size={18} />
          </a>
        </div>
      )}
    </section>
  );
};

export default Hero;
