
import { useState, useEffect, useRef } from 'react';
import { AspectRatio } from './ui/aspect-ratio';
import { MessageSquareQuote, Check, Calendar, Clock, Users } from 'lucide-react';

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
          <div className="absolute inset-0 bg-gradient-to-r from-petrol/95 to-petrol/80"></div>
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
        <div className="max-w-4xl mx-auto mb-16 reveal-element">
          <div className="flex justify-center mb-2">
            <span className="px-3 py-1 text-xs font-medium bg-white/20 rounded-full backdrop-blur-sm text-white">
              Investition
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-4 text-white drop-shadow-lg">
            Investiere in dein Wohlbefinden
          </h2>
          <div className="w-16 h-1 bg-mauve mx-auto mb-8"></div>
          <p className="text-lg text-center text-white/90 max-w-2xl mx-auto drop-shadow">
            Vor jedem 1:1 Coaching machen wir zuerst ein kostenloses Kennenlerngespräch online oder per Telefon.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Quote */}
          <div 
            className={`md:col-span-2 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="h-full flex items-center">
              <div className="bg-white/95 backdrop-blur-sm p-6 md:p-8 shadow-xl border border-white/20 rounded-lg h-full">
                <div className="flex items-center mb-6">
                  <MessageSquareQuote size={32} className="text-petrol/80 mr-3" />
                </div>
                <p className="text-xl text-petrol font-serif mb-6 leading-relaxed">
                  Unsere wichtigste Entscheidung ist, ob wir das Universum für einen freundlichen oder feindlichen Ort halten.
                </p>
                <p className="text-petrol/80 font-medium">― Albert Einstein</p>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div 
            className={`md:col-span-3 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-white shadow-xl overflow-hidden border border-sage/20 rounded-lg h-full">
              <div className="bg-gradient-to-r from-petrol to-petrol/80 p-6 md:p-8 text-white">
                <h3 className="text-2xl font-serif font-medium mb-2">Coaching Einzelsitzung</h3>
                <p className="text-white/90 mb-4">Individuelle Betreuung für deine Bedürfnisse</p>
                <div className="flex items-baseline">
                  <span className="text-4xl font-bold">CHF 90</span>
                  <span className="text-white/90 ml-2">pro Sitzung</span>
                </div>
              </div>
              
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-sage/20 rounded-full flex items-center justify-center">
                      <Clock size={20} className="text-petrol" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Dauer</p>
                      <p className="text-foreground/70">45 Min – 1 Std.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-sage/20 rounded-full flex items-center justify-center">
                      <Users size={20} className="text-petrol" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Format</p>
                      <p className="text-foreground/70">Online oder vor Ort</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-sage/20 rounded-full flex items-center justify-center">
                      <Calendar size={20} className="text-petrol" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Erstgespräch</p>
                      <p className="text-coral font-medium">Kostenlos</p>
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {[
                    "Individuelle Betreuung auf deine Bedürfnisse zugeschnitten",
                    "Praktische Übungen und Techniken für den Alltag",
                    "Fokus auf deine persönlichen Ziele und Herausforderungen",
                    "Flexible Terminvereinbarung"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check size={18} className="text-petrol flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div>
                  <a 
                    href="#contact" 
                    className="btn-primary w-full flex justify-center rounded-md"
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
            className="inline-flex items-center justify-center px-8 py-3 bg-white/95 text-petrol hover:bg-white transition-colors shadow-lg font-medium rounded-md backdrop-blur-sm"
          >
            Starte jetzt deine persönliche Reise
          </a>
        </div>
      </div>
    </section>
  );
};

export default PricingWithQuote;
