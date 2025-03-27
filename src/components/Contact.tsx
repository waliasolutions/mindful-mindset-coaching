
import { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';

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
      className="section-padding bg-white"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex justify-center mb-4">
            <span className="px-3 py-1 text-xs font-medium text-petrol bg-petrol/5">
              Kontakt
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-sans font-semibold text-center mb-6">
            Beginne deine Mindset-Reise heute
          </h2>
          <div className="w-16 h-px bg-petrol/20 mx-auto mb-8"></div>
          <p className="text-lg text-center text-sage max-w-2xl mx-auto leading-relaxed">
            Der erste Schritt zu einem erfüllteren Leben beginnt mit einem Gespräch. Kontaktiere mich für ein <span className="font-medium text-petrol">kostenloses Erstgespräch</span>, in dem wir über deine Ziele sprechen und herausfinden, wie ich dich am besten unterstützen kann.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div 
            className={`transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="bg-white shadow-md p-8 border-t border-b border-sage/10">
              <h3 className="text-2xl font-medium mb-6 text-petrol">Kontaktinformationen</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-petrol/5 flex items-center justify-center">
                    <Phone size={18} className="text-petrol" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Telefon</p>
                    <p className="text-sage">078 840 04 81</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-petrol/5 flex items-center justify-center">
                    <Mail size={18} className="text-petrol" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">E-Mail</p>
                    <p className="text-sage">info@martinadomeniconi.ch</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-petrol/5 flex items-center justify-center">
                    <MapPin size={18} className="text-petrol" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Adresse</p>
                    <p className="text-sage">Martina Domeniconi</p>
                    <p className="text-sage">Ruedi-Walter-strasse 4</p>
                    <p className="text-sage">8050 Zürich</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-petrol/5 flex items-center justify-center">
                    <Clock size={18} className="text-petrol" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Telefonische Erreichbarkeit</p>
                    <p className="text-sage">MO - FR: 8 - 18 Uhr</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-sage/10">
                <a 
                  href="tel:+41788400481" 
                  className="flex items-center justify-center w-full py-3 bg-petrol text-white hover:bg-petrol/90 transition-colors focus-ring text-center gap-2 font-medium"
                >
                  <span>Jetzt anrufen</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
          
          <div 
            className={`transition-all duration-1000 ease-out delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="aspect-square overflow-hidden shadow-md">
              <img 
                src="/lovable-uploads/c3990bed-42a6-44c3-94fd-186347006165.png" 
                alt="Martina Domeniconi - Kontakt" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
