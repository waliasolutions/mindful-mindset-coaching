
import { useState, useEffect, useRef } from 'react';
import { Check, Brain, Heart, Star, Lightbulb, Sun } from 'lucide-react';
import { useContentBridge } from '@/hooks/useContentBridge';
import * as LucideIcons from 'lucide-react';

interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Default content with benefits array
  const defaultContent = {
    title: "Transformiere dein Leben durch Mindset Coaching",
    description: "In einem 1:1 Coaching löst du Blockaden, bringst Klarheit in dein Gedanken-Karussell und richtest deinen Fokus auf das, was wirklich zählt: Deine Träume, Deine Lebenszufriedenheit und Deine innere Ruhe und Gelassenheit.",
    buttonText: "Kontaktiere mich",
    benefits: [
      {
        id: 'benefit-1',
        title: "Persönliches Wachstum",
        description: "Du möchtest ein erfülltes und selbstbestimmtes Leben führen",
        icon: "Brain"
      },
      {
        id: 'benefit-2',
        title: "Potenzialentfaltung",
        description: "Du willst endlich deine Ziele erreichen und dein volles Potenzial entfalten",
        icon: "Star"
      },
      {
        id: 'benefit-3',
        title: "Selbstbewusstsein",
        description: "Du möchtest mehr Selbstbewusstsein und Vertrauen aufbauen",
        icon: "Heart"
      },
      {
        id: 'benefit-4',
        title: "Klarheit & Gelassenheit",
        description: "Du sehnst dich nach mehr Klarheit, Gelassenheit und Lebensfreude",
        icon: "Lightbulb"
      },
      {
        id: 'benefit-5',
        title: "Beziehungen",
        description: "Du willst eine liebevolle Beziehung führen",
        icon: "Heart"
      },
      {
        id: 'benefit-6',
        title: "Gesunde Routinen",
        description: "Du möchtest gesunde Routinen und Gewohnheiten entwickeln",
        icon: "Sun"
      }
    ] as Benefit[]
  };

  // Use content bridge to allow admin overrides
  const content = useContentBridge('services', defaultContent);

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

  const renderIcon = (iconName: string) => {
    const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as any;
    if (!IconComponent) {
      // Fallback to Star icon if the specified icon doesn't exist
      return <Star size={20} className="text-primary-foreground" aria-hidden="true" />;
    }
    return <IconComponent size={20} className="text-primary-foreground" aria-hidden="true" />;
  };

  return (
    <section 
      id="services" 
      ref={sectionRef} 
      className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 relative overflow-hidden bg-mint"
      aria-labelledby="services-heading"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-mint to-background/30 -z-10" aria-hidden="true"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 md:w-80 md:h-80 bg-forest/5 rounded-full blur-3xl -z-10" aria-hidden="true"></div>
      <div className="absolute bottom-1/4 right-0 w-72 h-72 md:w-96 md:h-96 bg-moss/5 rounded-full blur-3xl -z-10" aria-hidden="true"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12 md:mb-16 lg:mb-20 reveal-element">
          <div className="flex justify-center mb-2 sm:mb-3">
            <span className="px-3 py-1 text-xs sm:text-sm font-medium text-primary bg-highlight rounded-full">
              Mindset Coaching
            </span>
          </div>
          <h2 id="services-heading" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-center mb-3 sm:mb-4 md:mb-6 text-primary leading-tight">
            {content.title}
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-moss mx-auto mb-4 sm:mb-6 md:mb-8" aria-hidden="true"></div>
          <p className="text-base sm:text-lg md:text-xl text-center text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            {content.description}
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-8 sm:mb-12 md:mb-16 lg:mb-20" role="list">
          {content.benefits?.map((benefit: Benefit, index: number) => (
            <li 
              key={benefit.id} 
              className={`reveal-element transition-all duration-500 ease-out delay-${index * 100}`}
            >
              <article className="bg-card shadow-lg p-4 sm:p-5 md:p-6 lg:p-7 h-full flex flex-col hover:shadow-xl transition-all duration-300 border-t-2 border-moss rounded-md group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-primary flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300">
                  {renderIcon(benefit.icon)}
                </div>
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif font-medium mb-2 sm:mb-3 text-primary leading-tight">
                  {benefit.title}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-foreground/80 leading-relaxed flex-1">
                  {benefit.description}
                </p>
              </article>
            </li>
          ))}
        </ul>

        <div className="flex justify-center mt-4 sm:mt-6 md:mt-8">
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 lg:py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg font-medium rounded-md text-sm sm:text-base md:text-lg min-h-[44px] touch-manipulation"
            aria-label="Kontaktiere mich für Mindset Coaching"
          >
            {content.buttonText}
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
