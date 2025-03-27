
import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { AspectRatio } from './ui/aspect-ratio';

const Quote = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-32 relative overflow-hidden"
    >
      {/* Background with overlay */}
      <div className="absolute inset-0 -z-10">
        <AspectRatio ratio={16/9} className="h-full">
          <img 
            src="/lovable-uploads/5ffe71dc-5b50-4709-af7a-73c5424b6a05.png" 
            alt="Mindset Inspiration" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-petrol/90 to-petrol/80"></div>
        </AspectRatio>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10 -z-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
        <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-white to-transparent"></div>
        <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-white to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div 
          className={`max-w-3xl mx-auto transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Quote content */}
          <div className="bg-white/10 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-xl border border-white/20">
            <div className="text-6xl text-white/50 font-serif mb-4">"</div>
            <p className="text-xl md:text-2xl lg:text-3xl text-white font-serif mb-6 leading-relaxed">
              Unsere wichtigste Entscheidung ist, ob wir das Universum für einen freundlichen oder feindlichen Ort halten.
            </p>
            <p className="text-white/80 font-medium mb-8">― Albert Einstein</p>
            
            <div className="flex justify-center mt-8">
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-white text-petrol hover:bg-white/90 transition-colors shadow-lg font-medium"
              >
                Starte jetzt deine persönliche Reise
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quote;
