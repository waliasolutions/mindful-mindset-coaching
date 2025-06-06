import { useState, useEffect, useRef } from 'react';
import { Check, Brain, Heart, Star, Lightbulb, Sun } from 'lucide-react';
import { useContentBridge } from '@/hooks/useContentBridge';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Default content (original website content)
  const defaultContent = {
    title: "Transformiere dein Leben durch Mindset Coaching",
    description: "In einem 1:1 Coaching löst du Blockaden, bringst Klarheit in dein Gedanken-Karussell und richtest deinen Fokus auf das, was wirklich zählt: Deine Träume, Deine Lebenszufriedenheit und Deine innere Ruhe und Gelassenheit.",
    buttonText: "Kontaktiere mich"
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

  const benefits = [{
    icon: <Brain size={20} className="text-white" aria-hidden="true" />,
    title: "Persönliches Wachstum",
    description: "Du möchtest ein erfülltes und selbstbestimmtes Leben führen"
  }, {
    icon: <Star size={20} className="text-white" aria-hidden="true" />,
    title: "Potenzialentfaltung",
    description: "Du willst endlich deine Ziele erreichen und dein volles Potenzial entfalten"
  }, {
    icon: <Heart size={20} className="text-white" aria-hidden="true" />,
    title: "Selbstbewusstsein",
    description: "Du möchtest mehr Selbstbewusstsein und Vertrauen aufbauen"
  }, {
    icon: <Lightbulb size={20} className="text-white" aria-hidden="true" />,
    title: "Klarheit & Gelassenheit",
    description: "Du sehnst dich nach mehr Klarheit, Gelassenheit und Lebensfreude"
  }, {
    icon: <Heart size={20} className="text-white" aria-hidden="true" />,
    title: "Beziehungen",
    description: "Du willst eine liebevolle Beziehung führen"
  }, {
    icon: <Sun size={20} className="text-white" aria-hidden="true" />,
    title: "Gesunde Routinen",
    description: "Du möchtest gesunde Routinen und Gewohnheiten entwickeln"
  }];

  return (
    <section 
      id="services" 
      ref={sectionRef} 
      className="section-padding relative overflow-hidden bg-white"
      aria-labelledby="services-heading"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-mint to-white/30 -z-10" aria-hidden="true"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-forest/5 rounded-full blur-3xl -z-10" aria-hidden="true"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-moss/5 rounded-full blur-3xl -z-10" aria-hidden="true"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto mb-12 md:mb-16 reveal-element">
          <div className="flex justify-center mb-2">
            <span className="px-3 py-1 text-xs font-medium text-forest bg-highlight rounded-full">
              Mindset Coaching
            </span>
          </div>
          <h2 id="services-heading" className="text-3xl md:text-4xl font-serif font-semibold text-center mb-4 text-forest">
            {content.title}
          </h2>
          <div className="w-16 h-1 bg-moss mx-auto mb-6 md:mb-8" aria-hidden="true"></div>
          <p className="text-lg text-center text-foreground/80 max-w-2xl mx-auto">
            {content.description}
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16" role="list">
          {benefits.map((benefit, index) => (
            <li 
              key={index} 
              className={`reveal-element transition-all duration-500 ease-out delay-${index * 100}`}
            >
              <article className="bg-white shadow-lg p-5 md:p-6 h-full flex flex-col hover:shadow-xl transition-all duration-300 border-t-2 border-moss rounded-md">
                <div className="w-10 h-10 rounded-full bg-forest flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg md:text-xl font-serif font-medium mb-2 md:mb-3 text-forest">
                  {benefit.title}
                </h3>
                <p className="text-sm md:text-base text-foreground/80">
                  {benefit.description}
                </p>
              </article>
            </li>
          ))}
        </ul>

        <div className="flex justify-center mt-6 md:mt-8">
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center px-5 md:px-6 py-2.5 md:py-3 bg-forest text-white hover:bg-forest/90 transition-colors shadow-lg font-medium rounded-md text-sm md:text-base"
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
