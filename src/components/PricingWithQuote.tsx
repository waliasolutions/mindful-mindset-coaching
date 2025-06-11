
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
    <section id="pricing" ref={sectionRef} className="section-padding relative overflow-hidden text-forest bg-[#e8f1e8]">
      <div className="container mx-auto content-padding">
        <div className="max-w-4xl mx-auto section-margin-bottom reveal-element">
          <div className="flex justify-center mb-3 sm:mb-4">
            <span className="px-4 py-2 text-xs sm:text-sm font-medium bg-moss/20 rounded-full backdrop-blur-sm text-forest">Preise</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-center mb-4 sm:mb-6 md:mb-8 text-forest leading-tight">
            {content.title}
          </h2>
          <div className="w-12 sm:w-16 h-1 mx-auto mb-6 sm:mb-8 md:mb-10 bg-[#41773a]"></div>
          <p className="text-base sm:text-lg md:text-xl text-center text-forest/90 max-w-3xl mx-auto leading-relaxed">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-10 md:gap-12 lg:gap-16 max-w-7xl mx-auto">
          <div className={`lg:col-span-2 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="h-full flex items-center justify-center">
              <div className="backdrop-blur-sm p-6 sm:p-7 md:p-8 lg:p-10 border border-transparent rounded-xl h-full flex items-center justify-center shadow-2xl transition-all duration-300 w-full max-w-md lg:max-w-none bg-[#f0f7f0]">
                <div className="flex flex-col items-center">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 mb-6 sm:mb-7 md:mb-8 lg:mb-10 rounded-xl bg-transparent">
                    <OptimizedImage 
                      src={content.quoteImage} 
                      alt="Albert Einstein sketch" 
                      className="w-full h-full object-cover rounded-xl" 
                      priority="high" 
                      sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 256px"
                    />
                  </div>
                  <div className="flex items-center mb-4 sm:mb-5 md:mb-6">
                    <MessageSquareQuote size={20} className="text-forest/80" />
                  </div>
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-forest font-serif mb-4 sm:mb-5 md:mb-6 leading-relaxed text-center italic">
                    {content.quote}
                  </p>
                  <p className="text-forest/80 font-medium text-xs sm:text-sm md:text-base">{content.quoteAuthor}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white/90 shadow-xl overflow-hidden border border-forest/10 rounded-lg h-full">
              <div className="h-0.5 bg-forest/20"></div>
              <div className="p-6 sm:p-7 md:p-8 lg:p-10 text-forest bg-[#41773a]/20">
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif font-medium mb-3">
                  {content.packageTitle}
                </h3>
                <p className="text-forest/90 mb-4 sm:mb-5 text-sm sm:text-base">Individuelle Betreuung für deine Bedürfnisse</p>
                <div className="flex items-baseline">
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">{content.price}</span>
                  <span className="text-forest/90 ml-2 text-sm sm:text-base">{content.pricePeriod}</span>
                </div>
              </div>
              
              <div className="p-6 sm:p-7 md:p-8 lg:p-10 text-forest">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mb-6 sm:mb-7 md:mb-8 lg:mb-10">
                  <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-moss/20 rounded-full flex items-center justify-center">
                      <Clock size={16} className="text-forest" />
                    </div>
                    <div>
                      <p className="font-medium mb-1 text-sm sm:text-base">Dauer</p>
                      <p className="text-xs sm:text-sm md:text-base text-forest/70">45 Min – 60 Min</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 sm:gap-4 md:gap-5">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-moss/20 rounded-full flex items-center justify-center">
                      <Users size={16} className="text-forest" />
                    </div>
                    <div>
                      <p className="font-medium mb-1 text-sm sm:text-base">Format</p>
                      <p className="text-xs sm:text-sm md:text-base text-forest/70">Online</p>
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-7 md:mb-8 lg:mb-10">
                  {["Individuelle Betreuung auf deine Bedürfnisse zugeschnitten", "Praktische Übungen und Techniken für den Alltag", "Fokus auf deine persönlichen Ziele und Herausforderungen", "Flexible Terminvereinbarung"].map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 sm:gap-4">
                      <Check size={14} className="text-moss flex-shrink-0 mt-1" />
                      <span className="text-xs sm:text-sm md:text-base text-forest/80 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div>
                  <a href="#contact" className="bg-forest hover:bg-forest/90 text-white w-full flex justify-center py-3 sm:py-3.5 md:py-4 px-4 rounded-md transition-all text-sm sm:text-base md:text-lg font-medium min-h-[48px] touch-manipulation">
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
