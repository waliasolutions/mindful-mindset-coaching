
import { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

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
      className="section-padding relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-sage/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-mauve/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex justify-center mb-2">
            <span className="px-3 py-1 text-xs font-medium text-petrol bg-petrol/10 rounded-full">
              Kontakt
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-4">
            Beginne deine Mindset-Reise
          </h2>
          <div className="w-16 h-1 bg-mauve mx-auto mb-8"></div>
          <p className="text-lg text-center text-foreground/80 max-w-2xl mx-auto">
            Ich bin gerne hier, um dir zu helfen. Ruf mich für ein kostenloses Beratungsgespräch an, in dem wir dein Mindset-Coaching vorab besprechen können.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div 
            className={`transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="bg-white rounded-xl shadow-lg p-8 border border-sage/20">
              <h3 className="text-2xl font-serif font-medium mb-6 text-petrol">Kontaktinformationen</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center">
                    <Phone size={18} className="text-petrol" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Telefon</p>
                    <p className="text-foreground/70">078 840 04 81</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center">
                    <Mail size={18} className="text-petrol" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">E-Mail</p>
                    <p className="text-foreground/70">info@martinadomeniconi.ch</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center">
                    <MapPin size={18} className="text-petrol" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Adresse</p>
                    <p className="text-foreground/70">Martina Domeniconi</p>
                    <p className="text-foreground/70">Ruedi-Walter-strasse 4</p>
                    <p className="text-foreground/70">8050 Zürich</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center">
                    <Clock size={18} className="text-petrol" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Telefonische Erreichbarkeit</p>
                    <p className="text-foreground/70">MO - FR: 8 - 18 Uhr</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div 
            className={`transition-all duration-1000 ease-out delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="aspect-square rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="/lovable-uploads/5ffe71dc-5b50-4709-af7a-73c5424b6a05.png" 
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
