import { useState, useEffect, useRef } from 'react';
import { AspectRatio } from './ui/aspect-ratio';
import { MessageSquareQuote, Check, Calendar, Clock, Users } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const PricingWithQuote = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return <section id="pricing" ref={sectionRef} className="section-padding relative overflow-hidden bg-mint/20 text-forest">
      {/* Background with overlay */}
      <div className="absolute inset-0 -z-10 opacity-20">
        <AspectRatio ratio={16 / 9} className="h-full">
          <img src="/lovable-uploads/bfcdd5e2-5796-4cc9-b81c-3651711c0440.png" alt="Forest background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-sage/20"></div>
        </AspectRatio>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5 -z-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-forest/40 to-transparent"></div>
        <div className="absolute top-0 left-0 right-0 w-px bg-gradient-to-b from-transparent via-forest/40 to-transparent"></div>
        <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-forest/40 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        {/* Title section */}
        <div className="max-w-4xl mx-auto mb-16 reveal-element">
          <div className="flex justify-center mb-2">
            <span className="px-3 py-1 text-xs font-medium bg-moss/20 rounded-full backdrop-blur-sm text-forest">
              Investition
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-4 text-forest">
            Investiere in dein Wohlbefinden
          </h2>
          <div className="w-16 h-1 bg-highlight mx-auto mb-8"></div>
          <p className="text-lg text-center text-forest/90 max-w-2xl mx-auto">
            Vor jedem Coaching machen wir zuerst ein kostenloses Kennenlerngespraech online oder per Telefon.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Quote */}
          <div className={`md:col-span-2 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="h-full flex items-center justify-center md:justify-start">
              <div className="bg-white/10 backdrop-blur-sm p-6 md:p-8 border border-transparent rounded-xl h-full flex items-center justify-center shadow-2xl transition-all duration-300 w-full max-w-md md:max-w-none">
                <div className="flex flex-col items-center">
                  <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mb-6 md:mb-8 rounded-xl bg-transparent">
                    <OptimizedImage 
                      src="/lovable-uploads/8a4be257-655e-4d69-b10e-5db95864ae5a.png" 
                      alt="Albert Einstein sketch" 
                      className="w-full h-full object-cover" 
                      priority="high" 
                    />
                  </div>
                  <div className="flex items-center mb-4 md:mb-6">
                    <MessageSquareQuote size={28} className="text-forest/80" />
                  </div>
                  <p className="text-xl md:text-2xl lg:text-3xl text-forest font-serif mb-4 md:mb-6 leading-relaxed text-center italic">
                    Unsere wichtigste Entscheidung ist, ob wir das Universum für einen freundlichen oder feindlichen Ort halten.
                  </p>
                  <p className="text-forest/80 font-medium text-base md:text-lg">― Albert Einstein</p>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="md:col-span-3">
            <div className="bg-white/90 shadow-xl overflow-hidden border border-forest/10 rounded-lg h-full">
              <div className="h-0.5 bg-forest/20"></div>
              <div className="bg-sage/30 p-6 md:p-8 text-forest">
                <h3 className="text-2xl font-serif font-medium mb-2">Coaching Einzelsitzung</h3>
                <p className="text-forest/90 mb-4">Individuelle Betreuung für deine Bedürfnisse</p>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">CHF 90</span>
                  <span className="text-forest/90 ml-2">pro Sitzung</span>
                </div>
              </div>
              
              <div className="p-6 md:p-8 text-forest">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-moss/20 rounded-full flex items-center justify-center">
                      <Clock size={20} className="text-forest" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Dauer</p>
                      <p className="text-forest/70">45 Min – 60 Min</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-moss/20 rounded-full flex items-center justify-center">
                      <Users size={20} className="text-forest" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Format</p>
                      <p className="text-forest/70">Online</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-moss/20 rounded-full flex items-center justify-center">
                      <Calendar size={20} className="text-forest" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Kennenlerngespräch</p>
                      <p className="text-forest/70">Kostenlos</p>
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {["Individuelle Betreuung auf deine Bedürfnisse zugeschnitten", 
                    "Praktische Übungen und Techniken für den Alltag", 
                    "Fokus auf deine persönlichen Ziele und Herausforderungen", 
                    "Flexible Terminvereinbarung"].map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check size={18} className="text-moss flex-shrink-0" />
                      <span className="text-forest/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div>
                  <a href="#contact" className="bg-forest hover:bg-forest/90 text-white w-full flex justify-center py-3 px-4 rounded-md transition-all">
                    Jetzt buchen
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};

export default PricingWithQuote;
