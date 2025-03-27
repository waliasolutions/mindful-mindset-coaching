
import { useState, useEffect, useRef } from 'react';

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
      className="py-20 md:py-32 relative overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <img 
          src="/lovable-uploads/abb0bc70-ae8b-43ce-867f-d7beece5a8a2.png" 
          alt="Inspiration" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-petrol/90"></div>
      </div>
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 -z-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"></div>
        <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-white to-transparent"></div>
        <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-white to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div 
          className={`max-w-4xl mx-auto text-center transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="text-6xl text-white/30 font-serif mb-6">"</div>
          <p className="text-xl md:text-2xl lg:text-3xl text-white font-serif mb-8 leading-relaxed">
            Unsere wichtigste Entscheidung ist, ob wir das Universum für einen freundlichen oder feindlichen Ort halten.
          </p>
          <p className="text-white/80 font-medium mb-10">Albert Einstein</p>
          
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center px-8 py-3 rounded-md bg-white text-petrol hover:bg-white/90 transition-colors focus-ring shadow-lg font-medium text-center"
          >
            Starte jetzt deine Transformation
          </a>
        </div>
      </div>
    </section>
  );
};

export default Quote;
