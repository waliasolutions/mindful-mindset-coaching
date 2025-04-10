
import { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, Clock, ArrowRight, MessageSquare, Leaf } from 'lucide-react';

const Contact = () => {
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
      id="contact" 
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-mint/30"
    >
      {/* Decorative leaf pattern */}
      <div className="absolute inset-0 leaf-pattern -z-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-forest/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-moss/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto mb-16 reveal-element">
          <div className="flex justify-center mb-2">
            <span className="px-3 py-1 text-xs font-medium text-forest bg-highlight rounded-full">
              Kontakt
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-4 text-forest">
            Beginne deine Mindset-Reise heute
          </h2>
          <div className="w-16 h-1 bg-moss mx-auto mb-8"></div>
          <p className="text-lg text-center text-foreground/80 max-w-2xl mx-auto">
            Der erste Schritt zu einem erfüllteren Leben beginnt mit einem Gespräch. Kontaktiere mich für ein <span className="font-medium text-forest">kostenloses Erstgespräch</span>, in dem wir über deine Ziele sprechen und herausfinden, wie ich dich am besten unterstützen kann.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-stretch max-w-6xl mx-auto">
          {/* Contact info */}
          <div 
            className={`lg:col-span-5 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="bg-white shadow-lg p-8 border-t-2 border-moss h-full rounded-md">
              <div className="flex items-center gap-2 mb-6">
                <Leaf size={20} className="text-forest" />
                <h3 className="text-2xl font-serif font-medium text-forest">Kontaktinformationen</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-highlight flex items-center justify-center">
                    <Phone size={18} className="text-forest" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Telefon</p>
                    <a href="tel:+41788400481" className="text-foreground/70 hover:text-forest transition-colors">078 840 04 81</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-highlight flex items-center justify-center">
                    <Mail size={18} className="text-forest" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">E-Mail</p>
                    <a href="mailto:info@mindset-coach-martina.ch" className="text-foreground/70 hover:text-forest transition-colors">info@mindset-coach-martina.ch</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-highlight flex items-center justify-center">
                    <MapPin size={18} className="text-forest" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Adresse</p>
                    <p className="text-foreground/70">Martina Domeniconi</p>
                    <p className="text-foreground/70">Ruedi-Walter-strasse 4</p>
                    <p className="text-foreground/70">8050 Zürich</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-highlight flex items-center justify-center">
                    <Clock size={18} className="text-forest" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Telefonische Erreichbarkeit</p>
                    <p className="text-foreground/70">MO - FR: 8 - 18 Uhr</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-moss/20 flex flex-col sm:flex-row gap-4">
                <a 
                  href="tel:+41788400481" 
                  className="flex items-center justify-center py-3 bg-forest text-white hover:bg-forest/90 transition-colors focus-ring text-center gap-2 font-medium flex-1 rounded-md"
                >
                  <span>Jetzt anrufen</span>
                  <Phone size={16} />
                </a>
                
                <a 
                  href="mailto:info@mindset-coach-martina.ch" 
                  className="flex items-center justify-center py-3 bg-moss/20 hover:bg-moss/30 text-forest transition-colors focus-ring text-center gap-2 font-medium flex-1 rounded-md"
                >
                  <span>E-Mail senden</span>
                  <Mail size={16} />
                </a>
              </div>
            </div>
          </div>
          
          {/* Image and free call offer */}
          <div 
            className={`lg:col-span-7 transition-all duration-1000 ease-out delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="grid grid-cols-1 gap-8 h-full">
              <div className="aspect-[16/9] overflow-hidden shadow-xl rounded-lg">
                <div className="image-reveal reveal w-full h-full">
                  <img 
                    src="/lovable-uploads/41ccfa7b-2d21-4300-82ac-3cbd2ff728fe.png" 
                    alt="Martina Domeniconi with her dog" 
                    className="w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/30 to-transparent"></div>
                </div>
              </div>
              
              <div className="bg-forest p-8 text-white shadow-lg rounded-md">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <MessageSquare size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-serif font-medium">Kostenloses Erstgespräch</h3>
                </div>
                
                <p className="mb-6 text-white/90">
                  In einem unverbindlichen Erstgespräch können wir uns kennenlernen und herausfinden, ob wir zusammenpassen. Erzähle mir von deinen Zielen und Herausforderungen, und ich erkläre dir, wie mein Coaching dich unterstützen kann.
                </p>
                
                <a 
                  href="mailto:info@mindset-coach-martina.ch?subject=Erstgespräch%20Mindset%20Coaching" 
                  className="flex items-center justify-center w-full py-3 bg-white text-forest hover:bg-white/90 transition-colors shadow-md text-center gap-2 font-medium rounded-md"
                >
                  <span>Jetzt Termin vereinbaren</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
