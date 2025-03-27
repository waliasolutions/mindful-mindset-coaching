
import { ArrowDown } from 'lucide-react';
import { useEffect, useRef } from 'react';

const Hero = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
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
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <div className="mb-10">
              <h1 
                ref={headingRef}
                className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 transition-all duration-700 ease-out opacity-0 translate-y-10"
              >
                <span className="text-petrol">Mindset Coaching</span> für ein glückliches und erfülltes Leben
              </h1>
              <p 
                ref={subtitleRef}
                className="text-lg md:text-xl text-sage mb-8 max-w-xl leading-relaxed transition-all duration-700 ease-out opacity-0 translate-y-10 delay-100"
              >
                Entfalte dein volles Potenzial und erschaffe das Leben, von dem du träumst. Mit dem richtigen Mindset sind deinen Möglichkeiten keine Grenzen gesetzt.
              </p>
              <div 
                ref={ctaRef}
                className="flex flex-col sm:flex-row gap-4 transition-all duration-700 ease-out opacity-0 translate-y-10 delay-200"
              >
                <a 
                  href="#contact" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-petrol text-white transition-colors focus-ring text-center font-medium"
                >
                  Kostenloses Erstgespräch vereinbaren
                </a>
                <a 
                  href="#services" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-white border border-sage/20 text-petrol transition-colors focus-ring text-center"
                >
                  Mehr erfahren
                </a>
              </div>
            </div>
          </div>
          
          <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
            <div className="aspect-[3/4] overflow-hidden shadow-md transition-all duration-500">
              <img 
                src="/lovable-uploads/7b4f0db6-80ea-4da6-b817-0f33ba7562b5.png" 
                alt="Martina Domeniconi - Mindset Coach" 
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-40"></div>
            </div>
            <div className="mt-4 p-4 bg-white shadow-md max-w-xs ml-auto -mr-6 -mt-16 relative z-10">
              <p className="text-sm font-medium text-petrol">Martina Domeniconi</p>
              <p className="text-xs text-sage">Zertifizierter Mindset Coach</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="flex flex-col items-center text-sage hover:text-petrol transition-colors">
          <span className="text-sm mb-2 font-medium">Mehr</span>
          <ArrowDown size={20} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
