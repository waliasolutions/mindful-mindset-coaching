
import { useState, useEffect, useRef } from 'react';
import { AspectRatio } from './ui/aspect-ratio';
import { MessageSquareQuote } from 'lucide-react';

const PricingWithQuote = () => {
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
      id="pricing" 
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
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
        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex justify-center mb-2">
            <span className="px-3 py-1 text-xs font-medium text-white bg-white/10 rounded-full">
              Investition
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-4 text-white">
            Investiere in dein Wohlbefinden
          </h2>
          <div className="w-16 h-1 bg-mauve mx-auto mb-8"></div>
          <p className="text-lg text-center text-white/80 max-w-2xl mx-auto">
            Vor jedem 1:1 Coaching machen wir zuerst ein kostenloses Kennenlerngespräch online oder per Telefon.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Quote */}
          <div 
            className={`transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            <div className="h-full flex items-center">
              <div className="bg-white/90 backdrop-blur-sm p-8 md:p-10 shadow-xl border border-white/20">
                <div className="flex items-center mb-6">
                  <MessageSquareQuote size={32} className="text-petrol/70 mr-3" />
                  <div className="text-3xl text-petrol/70 font-serif">"</div>
                </div>
                <p className="text-xl md:text-2xl text-petrol font-serif mb-6 leading-relaxed">
                  Unsere wichtigste Entscheidung ist, ob wir das Universum für einen freundlichen oder feindlichen Ort halten.
                </p>
                <p className="text-petrol/80 font-medium">― Albert Einstein</p>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div 
            className={`transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="bg-white rounded-none shadow-xl overflow-hidden border border-sage/20 h-full">
              <div className="bg-petrol/90 p-8 text-white text-center">
                <h3 className="text-2xl font-serif font-medium mb-2">Coaching Einzelsitzung</h3>
                <p className="text-white/80 mb-4">Individuelle Betreuung für deine Bedürfnisse</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold">CHF 90</span>
                  <span className="text-white/80 ml-2">pro Sitzung</span>
                </div>
              </div>
              
              <div className="p-8">
                <ul className="space-y-4">
                  <li className="flex items-center justify-between pb-4 border-b border-sage/20">
                    <span className="font-medium">Dauer</span>
                    <span>45 Min – 1 Std.</span>
                  </li>
                  <li className="flex items-center justify-between pb-4 border-b border-sage/20">
                    <span className="font-medium">Format</span>
                    <span>Online oder vor Ort</span>
                  </li>
                  <li className="flex items-center justify-between pb-4 border-b border-sage/20">
                    <span className="font-medium">Erstgespräch</span>
                    <span className="text-coral">Kostenlos</span>
                  </li>
                </ul>
                
                <div className="mt-8">
                  <a 
                    href="#contact" 
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-petrol text-white hover:bg-petrol/90 transition-colors focus-ring text-center"
                  >
                    Jetzt buchen
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-petrol hover:bg-white/90 transition-colors shadow-lg font-medium"
          >
            Starte jetzt deine persönliche Reise
          </a>
        </div>
      </div>
    </section>
  );
};

export default PricingWithQuote;
