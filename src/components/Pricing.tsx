
import { useState, useEffect, useRef } from 'react';

const Pricing = () => {
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
      className="section-padding relative overflow-hidden bg-gradient-to-t from-white to-beige/20"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex justify-center mb-2">
            <span className="px-3 py-1 text-xs font-medium text-petrol bg-petrol/10 rounded-full">
              Preise
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-4">
            Investiere in dein Wohlbefinden
          </h2>
          <div className="w-16 h-1 bg-mauve mx-auto mb-8"></div>
          <p className="text-lg text-center text-foreground/80 max-w-2xl mx-auto">
            Vor jedem 1:1 Coaching machen wir zuerst ein kostenloses Kennenlerngespräch online oder per Telefon.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div 
            className={`bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-1000 ease-out border border-sage/20 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
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
                  className="inline-flex items-center justify-center w-full px-6 py-3 rounded-md bg-petrol text-white hover:bg-petrol/90 transition-colors focus-ring text-center"
                >
                  Jetzt buchen
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
