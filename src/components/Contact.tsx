
import { useUnifiedContent } from '@/hooks/useUnifiedContent';

const Contact = () => {
  const { content } = useUnifiedContent('contact', {
    title: "Beginne deine Mindset-Reise heute",
    subtitle: "Der erste Schritt zu einem erfüllteren Leben beginnt mit einem Gespräch. Kontaktiere mich für ein kostenloses Kennenlerngespräch, in dem wir über deine Ziele sprechen und herausfinden, wie ich dich am besten unterstützen kann.",
    email: "info@mindset-coach-martina.ch",
    phone: "078 840 04 81",
    sectionImage: "/lovable-uploads/41ccfa7b-2d21-4300-82ac-3cbd2ff728fe.png"
  });

  return (
    <section id="contact" className="py-20 bg-sage/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-forest mb-6">
                {content.title}
              </h2>
              
              <p className="text-lg text-forest/80 mb-8 leading-relaxed">
                {content.subtitle}
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-forest">E-Mail</p>
                    <a href={`mailto:${content.email}`} className="text-sage hover:text-sage/80 transition-colors">
                      {content.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-forest">Telefon</p>
                    <a href={`tel:+41${content.phone.replace(/\s/g, '')}`} className="text-sage hover:text-sage/80 transition-colors">
                      {content.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:pl-8">
              <img 
                src={content.sectionImage}
                alt="Kontakt" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
