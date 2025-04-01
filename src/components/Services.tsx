
import { useState, useEffect, useRef } from 'react';
import { Check, Brain, Heart, Star, Lightbulb, Sun } from 'lucide-react';

const Services = () => {
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

  const benefits = [
    {
      icon: <Brain size={20} className="text-white" />,
      title: "Persönliches Wachstum",
      description: "Du möchtest ein erfülltes und selbstbestimmtes Leben führen"
    },
    {
      icon: <Star size={20} className="text-white" />,
      title: "Potenzialentfaltung",
      description: "Du willst endlich deine Ziele erreichen und dein volles Potenzial entfalten"
    },
    {
      icon: <Heart size={20} className="text-white" />,
      title: "Selbstbewusstsein",
      description: "Du möchtest mehr Selbstbewusstsein und Vertrauen aufbauen"
    },
    {
      icon: <Lightbulb size={20} className="text-white" />,
      title: "Klarheit & Gelassenheit",
      description: "Du sehnst dich nach mehr Klarheit, Gelassenheit und Lebensfreude"
    },
    {
      icon: <Heart size={20} className="text-white" />,
      title: "Beziehungen",
      description: "Du willst eine liebevolle Beziehung führen"
    },
    {
      icon: <Sun size={20} className="text-white" />,
      title: "Gesunde Routinen",
      description: "Du möchtest gesunde Routinen und Gewohnheiten entwickeln"
    },
  ];

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-lavender/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-sage/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto mb-16 reveal-element">
          <div className="flex justify-center mb-2">
            <span className="px-3 py-1 text-xs font-medium text-sage bg-sage/10">
              Mindset Coaching
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-4">
            Transformiere dein Leben durch Mindset Coaching
          </h2>
          <div className="w-16 h-1 bg-sage mx-auto mb-8"></div>
          <p className="text-lg text-center text-foreground/80 max-w-2xl mx-auto">
            In einem 1:1 Coaching lösen wir Blockaden, bringen Klarheit in dein Gedanken-Karussell und richten deinen Fokus auf das, was wirklich zählt: Deine Träume, Deine Lebenszufriedenheit und Deine innere Ruhe und Gelassenheit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className={`reveal-element transition-all duration-500 ease-out delay-${index * 100}`}
            >
              <div className="bg-white shadow-lg p-6 h-full flex flex-col hover:shadow-xl transition-all duration-300 border-t-2 border-sage">
                <div className="w-10 h-10 rounded-full bg-sage flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-serif font-medium mb-3 text-sage">
                  {benefit.title}
                </h3>
                <p className="text-foreground/80">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <a 
            href="#contact" 
            className="inline-flex items-center justify-center px-6 py-3 bg-sage text-white hover:bg-sage/90 transition-colors shadow-lg font-medium rounded-md"
          >
            Kontaktiere mich
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
