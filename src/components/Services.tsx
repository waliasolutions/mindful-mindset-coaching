
import { useState, useEffect, useRef } from 'react';
import { Check } from 'lucide-react';

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
    "ein erfülltes und selbstbestimmtes Leben führen möchtest",
    "endlich deine Ziele erreichen und dein volles Potenzial entfalten willst",
    "mehr Selbstbewusstsein und Vertrauen aufbauen möchtest",
    "dich nach mehr Klarheit, Gelassenheit und Lebensfreude sehnst",
    "eine liebevolle Beziehung führen willst",
    "gesunde Routinen und Gewohnheiten entwickeln möchtest",
    "bereit bist, alte Ängste und Zweifel hinter dir zu lassen",
  ];

  return (
    <section 
      id="services" 
      ref={sectionRef}
      className="section-padding bg-beige"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex justify-center mb-4">
            <span className="px-3 py-1 text-xs font-medium text-petrol bg-petrol/5">
              Angebot
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-sans font-semibold text-center mb-6">
            Mindset Coaching für dich
          </h2>
          <div className="w-16 h-px bg-petrol/20 mx-auto mb-8"></div>
          <p className="text-lg text-center text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            In einem 1:1 Coaching lösen wir Blockaden, bringen Klarheit in dein Gedanken-Karussell und richten deinen Fokus auf das, was wirklich zählt: Deine Träume, Deine Lebenszufriedenheit und Deine innere Ruhe und Gelassenheit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="bg-white p-8 shadow-md border-t border-b border-sage/10">
              <h3 className="text-2xl font-medium mb-6 text-petrol">Mindset Coaching ist etwas für Dich, wenn Du:</h3>
              
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-petrol/5 flex items-center justify-center mt-0.5">
                      <Check size={12} className="text-petrol" />
                    </div>
                    <span className="text-foreground/80">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8">
                <a 
                  href="#contact" 
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-petrol text-white hover:bg-petrol/90 transition-colors focus-ring text-center"
                >
                  Kontaktiere mich
                </a>
              </div>
            </div>
          </div>
          
          <div className={`transition-all duration-1000 ease-out delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="aspect-[4/5] overflow-hidden shadow-md">
              <img 
                src="/lovable-uploads/abb0bc70-ae8b-43ce-867f-d7beece5a8a2.png" 
                alt="Coaching Session" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent/0 opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
