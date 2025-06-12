
import { useState, useEffect, useRef } from 'react';
import { AspectRatio } from './ui/aspect-ratio';
import { MessageSquareQuote, Check, Clock, Users, Phone } from 'lucide-react';
import OptimizedImage from './OptimizedImage';
import { useContentBridge } from '@/hooks/useContentBridge';

const PricingWithQuote = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Default content (original website content)
  const defaultContent = {
    title: "Investiere in dein Wohlbefinden",
    description: "Mir ist wichtig, dass du dich wohlfühlst – deshalb starten wir mit einem kostenlosen Kennenlerngespräch. In einem kurzen Telefonat können wir erste Fragen klären und gemeinsam sehen, ob die Zusammenarbeit für beide Seiten passt.",
    quote: "Unsere wichtigste Entscheidung ist, ob wir das Universum für einen freundlichen oder feindlichen Ort halten.",
    quoteAuthor: "― Albert Einstein",
    quoteImage: "/lovable-uploads/8a4be257-655e-4d69-b10e-5db95864ae5a.png",
    price: "CHF 90",
    pricePeriod: "pro Sitzung",
    packageTitle: "Coaching Einzelsitzung"
  };

  // Use content bridge to allow admin overrides
  const content = useContentBridge('pricing', defaultContent);

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

  return (
    <section id="pricing" ref={sectionRef} className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 relative overflow-hidden text-primary bg-mint">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12 md:mb-16 lg:mb-20 reveal-element">
          <div className="flex justify-center mb-2 sm:mb-3">
            <span className="px-3 py-1 text-xs sm:text-sm font-medium bg-moss/20 rounded-full backdrop-blur-sm text-primary">Preise</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-center mb-3 sm:mb-4 md:mb-6 text-primary leading-tight">
            {content.title}
          </h2>
          <div className="w-12 sm:w-16 h-1 mx-auto mb-4 sm:mb-6 md:mb-8 bg-moss"></div>
          <p className="text-base sm:text-lg md:text-xl text-center text-primary/90 max-w-3xl mx-auto leading-relaxed">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 md:gap-10 lg:gap-12 max-w-7xl mx-auto">
          <div className={`lg:col-span-2 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="h-full flex items-center justify-center">
              <div className="backdrop-blur-sm p-4 sm:p-5 md:p-6 lg:p-8 border border-transparent rounded-xl h-full flex items-center justify-center shadow-2xl transition-all duration-300 w-full max-w-md lg:max-w-none bg-card">
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 mb-4 sm:mb-5 md:mb-6 lg:mb-8 rounded-xl bg-transparent">
                    <OptimizedImage 
                      src={content.quoteImage} 
                      alt="Albert Einstein sketch" 
                      className="w-full h-full object-cover rounded-xl" 
                      priority="high" 
                      sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 256px"
                    />
                  </div>
                  <div className="flex items-center mb-3 sm:mb-4 md:mb-6">
                    <MessageSquareQuote size={20} className="text-primary/80" />
                  </div>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary font-serif mb-3 sm:mb-4 md:mb-6 leading-relaxed text-center italic">
                    {content.quote}
                  </p>
                  <p className="text-primary/80 font-medium text-xs sm:text-sm md:text-base">{content.quoteAuthor}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-card shadow-xl overflow-hidden border border-primary/10 rounded-lg h-full">
              <div className="h-0.5 bg-primary/20"></div>
              <div className="p-4 sm:p-5 md:p-6 lg:p-8 text-primary bg-secondary/20">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-medium mb-2">
                  {content.packageTitle}
                </h3>
                <p className="text-primary/90 mb-3 sm:mb-4 text-sm sm:text-base">Individuelle Betreuung für deine Bedürfnisse</p>
                <div className="flex items-baseline">
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">{content.price}</span>
                  <span className="text-primary/90 ml-2 text-sm sm:text-base">{content.pricePeriod}</span>
                </div>
              </div>
              
              <div className="p-4 sm:p-5 md:p-6 lg:p-8 text-primary">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                    <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-moss/20 rounded-full flex items-center justify-center">
                      <Clock size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium mb-0.5 text-sm sm:text-base">Dauer</p>
                      <p className="text-xs sm:text-sm md:text-base text-primary/70">45 Min – 60 Min</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                    <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-moss/20 rounded-full flex items-center justify-center">
                      <Users size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium mb-0.5 text-sm sm:text-base">Format</p>
                      <p className="text-xs sm:text-sm md:text-base text-primary/70">Online</p>
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6 md:mb-8">
                  {["Individuelle Betreuung auf deine Bedürfnisse zugeschnitten", "Praktische Übungen und Techniken für den Alltag", "Fokus auf deine persönlichen Ziele und Herausforderungen", "Flexible Terminvereinbarung"].map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <Check size={14} className="text-moss flex-shrink-0 mt-1" />
                      <span className="text-xs sm:text-sm md:text-base text-primary/80 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div>
                  <a href="#contact" className="bg-primary hover:bg-primary/90 text-primary-foreground w-full flex justify-center py-2.5 sm:py-3 md:py-3.5 px-4 rounded-md transition-all text-sm sm:text-base md:text-lg font-medium min-h-[44px] touch-manipulation">
                    Jetzt buchen
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingWithQuote;
