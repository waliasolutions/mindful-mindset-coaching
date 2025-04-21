import { useState, useEffect, useRef } from 'react';
import { AspectRatio } from './ui/aspect-ratio';
import { MessageSquareQuote, Check, Calendar, Clock, Users, Phone } from 'lucide-react';
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

  return <section id="pricing" ref={sectionRef} className="section-padding relative overflow-hidden text-forest bg-[#e8f1e8]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto mb-12 md:mb-16 reveal-element">
          <div className="flex justify-center mb-2">
            <span className="px-3 py-1 text-xs font-medium bg-moss/20 rounded-full backdrop-blur-sm text-forest">Preise</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-4 text-forest">
            Investiere in dein Wohlbefinden
          </h2>
          <div className="w-16 h-1 mx-auto mb-6 md:mb-8 bg-[f0f7f0] bg-[#41773a]"></div>
          <p className="text-lg text-center text-forest/90 max-w-2xl mx-auto">
            Mir ist wichtig, dass du dich wohlfühlst – deshalb starten wir mit einem kostenlosen Kennenlerngespräch. 
            In einem kurzen Telefonat können wir erste Fragen klären und gemeinsam sehen, ob die Zusammenarbeit für beide Seiten passt.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-6 lg:gap-12 max-w-6xl mx-auto">
          <div className={`md:col-span-2 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="h-full flex items-center justify-center md:justify-start">
              <div className="backdrop-blur-sm p-5 md:p-6 lg:p-8 border border-transparent rounded-xl h-full flex items-center justify-center shadow-2xl transition-all duration-300 w-full max-w-md md:max-w-none bg-[e8f1e8] bg-[#f0f7f0]">
                <div className="flex flex-col items-center">
                  <div className="w-40 h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 mb-5 md:mb-6 lg:mb-8 rounded-xl bg-transparent">
                    <OptimizedImage src="/lovable-uploads/8a4be257-655e-4d69-b10e-5db95864ae5a.png" alt="Albert Einstein sketch" className="w-full h-full object-cover" priority="high" />
                  </div>
                  <div className="flex items-center mb-3 md:mb-4 lg:mb-6">
                    <MessageSquareQuote size={24} className="text-forest/80" />
                  </div>
                  <p className="text-lg md:text-xl lg:text-2xl text-forest font-serif mb-3 md:mb-4 lg:mb-6 leading-relaxed text-center italic">
                    Unsere wichtigste Entscheidung ist, ob wir das Universum für einen freundlichen oder feindlichen Ort halten.
                  </p>
                  <p className="text-forest/80 font-medium text-sm md:text-base">― Albert Einstein</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="bg-white/90 shadow-xl overflow-hidden border border-forest/10 rounded-lg h-full">
              <div className="h-0.5 bg-forest/20"></div>
              <div className="p-5 md:p-6 lg:p-8 text-forest bg-[#41773a]/20">
                <h3 className="text-xl md:text-2xl font-serif font-medium mb-2">Coaching Einzelsitzung</h3>
                <p className="text-forest/90 mb-4">Individuelle Betreuung für deine Bedürfnisse</p>
                <div className="flex items-baseline">
                  <span className="text-3xl md:text-4xl font-bold">CHF 90</span>
                  <span className="text-forest/90 ml-2">pro Sitzung</span>
                </div>
              </div>
              
              <div className="p-5 md:p-6 lg:p-8 text-forest">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="flex-shrink-0 w-9 h-9 md:w-10 md:h-10 bg-moss/20 rounded-full flex items-center justify-center">
                      <Clock size={18} className="text-forest" />
                    </div>
                    <div>
                      <p className="font-medium mb-0.5 md:mb-1">Dauer</p>
                      <p className="text-sm md:text-base text-forest/70">45 Min – 60 Min</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="flex-shrink-0 w-9 h-9 md:w-10 md:h-10 bg-moss/20 rounded-full flex items-center justify-center">
                      <Users size={18} className="text-forest" />
                    </div>
                    <div>
                      <p className="font-medium mb-0.5 md:mb-1">Format</p>
                      <p className="text-sm md:text-base text-forest/70">Online</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="flex-shrink-0 w-9 h-9 md:w-10 md:h-10 bg-moss/20 rounded-full flex items-center justify-center">
                      <Calendar size={18} className="text-forest" />
                    </div>
                    <div>
                      <p className="font-medium mb-0.5 md:mb-1">Kennenlerngespräch</p>
                      <p className="text-sm md:text-base text-forest/70">Kostenlos, telefonisch 10-15 Min</p>
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-2 md:space-y-3 mb-6 md:mb-8">
                  {["Individuelle Betreuung auf deine Bedürfnisse zugeschnitten", "Praktische Übungen und Techniken für den Alltag", "Fokus auf deine persönlichen Ziele und Herausforderungen", "Flexible Terminvereinbarung"].map((feature, index) => <li key={index} className="flex items-start gap-2 md:gap-3">
                      <Check size={16} className="text-moss flex-shrink-0 mt-1" />
                      <span className="text-sm md:text-base text-forest/80">{feature}</span>
                    </li>)}
                </ul>
                
                <div>
                  <a href="#contact" className="bg-forest hover:bg-forest/90 text-white w-full flex justify-center py-2.5 md:py-3 px-4 rounded-md transition-all text-sm md:text-base font-medium">
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
