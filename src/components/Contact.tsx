
import { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, Clock, ArrowRight, MessageSquare, Leaf } from 'lucide-react';
import EditableText from './EditableText';
import EditableImage from './EditableImage';

const Contact = () => {
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

  return (
    <section id="contact" ref={sectionRef} className="section-padding relative overflow-hidden bg-mint/30">
      <div className="absolute inset-0 leaf-pattern -z-10"></div>
      
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-forest/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-moss/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto mb-16 reveal-element">
          <div className="flex justify-center mb-2">
            <span className="px-3 py-1 text-xs font-medium text-forest bg-highlight rounded-full">
              Kontakt
            </span>
          </div>
          <EditableText
            pageId="contact"
            contentKey="main-heading"
            defaultContent="Beginne deine Mindset-Reise heute"
            tag="h2"
            className="text-3xl md:text-4xl font-serif font-semibold text-center mb-4 text-forest"
          />
          <div className="w-16 h-1 bg-moss mx-auto mb-8"></div>
          <EditableText
            pageId="contact"
            contentKey="intro-text"
            defaultContent="Der erste Schritt zu einem erfüllteren Leben beginnt mit einem Gespräch. Kontaktiere mich für ein <span className='font-medium text-forest'>kostenloses Kennenlerngespräch</span>, in dem wir über deine Ziele sprechen und herausfinden, wie ich dich am besten unterstützen kann."
            tag="p"
            className="text-lg text-center text-foreground/80 max-w-2xl mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-stretch max-w-6xl mx-auto">
          <div className={`lg:col-span-5 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="bg-[#e8f1e8] text-forest shadow-lg p-8 border-t-2 border-moss/30 h-full rounded-md">
              <div className="flex items-center gap-2 mb-6">
                <Leaf size={20} className="text-forest" />
                <EditableText
                  pageId="contact"
                  contentKey="contact-info-heading"
                  defaultContent="Kontaktinformationen"
                  tag="h3"
                  className="text-2xl font-serif font-medium text-forest"
                />
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-highlight flex items-center justify-center">
                    <Phone size={18} className="text-forest" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Telefon</p>
                    <a href="tel:+41788400481" className="text-forest/70 hover:text-forest transition-colors">
                      <EditableText
                        pageId="contact"
                        contentKey="phone-number"
                        defaultContent="078 840 04 81"
                        tag="span"
                        className="text-forest/70 hover:text-forest transition-colors"
                      />
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-highlight flex items-center justify-center">
                    <Mail size={18} className="text-forest" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">E-Mail</p>
                    <a href="mailto:info@mindset-coach-martina.ch" className="text-forest/70 hover:text-forest transition-colors">
                      <EditableText
                        pageId="contact"
                        contentKey="email"
                        defaultContent="info@mindset-coach-martina.ch"
                        tag="span"
                        className="text-forest/70 hover:text-forest transition-colors"
                      />
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-highlight flex items-center justify-center">
                    <MapPin size={18} className="text-forest" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Adresse</p>
                    <EditableText
                      pageId="contact"
                      contentKey="address-name"
                      defaultContent="Martina Domeniconi"
                      tag="p"
                      className="text-forest/70"
                    />
                    <EditableText
                      pageId="contact"
                      contentKey="address-street"
                      defaultContent="Ruedi-Walter-strasse 4"
                      tag="p"
                      className="text-forest/70"
                    />
                    <EditableText
                      pageId="contact"
                      contentKey="address-city"
                      defaultContent="8050 Zürich"
                      tag="p"
                      className="text-forest/70"
                    />
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-highlight flex items-center justify-center">
                    <Clock size={18} className="text-forest" />
                  </div>
                  <div>
                    <p className="font-medium mb-1">Telefonische Erreichbarkeit</p>
                    <EditableText
                      pageId="contact"
                      contentKey="availability"
                      defaultContent="MO - FR: 8 - 18 Uhr"
                      tag="p"
                      className="text-forest/70"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-moss/20 flex flex-col sm:flex-row gap-4">
                <a href="tel:+41788400481" className="flex items-center justify-center py-3 bg-forest text-white hover:bg-forest/90 transition-colors focus-ring text-center gap-2 font-medium flex-1 rounded-md">
                  <span>Jetzt anrufen</span>
                  <Phone size={16} />
                </a>
                
                <a href="mailto:info@mindset-coach-martina.ch" className="flex items-center justify-center py-3 bg-moss/20 hover:bg-moss/30 text-forest transition-colors focus-ring text-center gap-2 font-medium flex-1 rounded-md">
                  <span>E-Mail senden</span>
                  <Mail size={16} />
                </a>
              </div>
            </div>
          </div>
          
          <div className={`lg:col-span-7 transition-all duration-1000 ease-out delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="grid grid-cols-1 gap-8 h-full">
              <div className="aspect-[16/9] overflow-hidden shadow-xl rounded-lg">
                <div className="image-reveal reveal w-full h-full">
                  <EditableImage
                    pageId="contact"
                    contentKey="contact-image"
                    defaultSrc="/lovable-uploads/41ccfa7b-2d21-4300-82ac-3cbd2ff728fe.png"
                    alt="Martina Domeniconi with her dog"
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/30 to-transparent"></div>
                </div>
              </div>
              
              <div className="bg-sage p-8 text-white shadow-lg rounded-md">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                    <MessageSquare size={24} className="text-white" />
                  </div>
                  <EditableText
                    pageId="contact"
                    contentKey="meeting-title"
                    defaultContent="Kennenlerngespräch"
                    tag="h3"
                    className="text-xl font-serif font-medium"
                  />
                </div>
                
                <EditableText
                  pageId="contact"
                  contentKey="meeting-description"
                  defaultContent="In einem unverbindlichen Erstgespräch können wir uns kennenlernen und herausfinden, ob wir zusammenpassen. Erzähle mir von deinen Zielen und Herausforderungen, und ich erkläre dir, wie mein Coaching dich unterstützen kann."
                  tag="p"
                  className="mb-6 text-white/90"
                />
                
                <a href="mailto:info@mindset-coach-martina.ch?subject=Kennenlerngespräch%20Mindset%20Coaching" className="flex items-center justify-center w-full py-3 bg-white text-moss hover:bg-white/90 transition-colors shadow-md text-center gap-2 font-medium rounded-md">
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
