
import { useState, useEffect, useRef } from 'react';
import { Award, BookOpen, Users } from 'lucide-react';

const About = () => {
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
      id="about" 
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-gradient-to-b from-white to-beige/20"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto mb-16 reveal-element">
          <div className="flex justify-center mb-2">
            <span className="px-3 py-1 text-xs font-medium text-petrol bg-petrol/10">
              Über mich
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-4">
            Martina Domeniconi – zertifizierter Mindset Coach
          </h2>
          <div className="w-16 h-1 bg-mauve mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className={`relative reveal-left ${isVisible ? 'revealed' : ''}`}>
            <div className="aspect-square relative z-10 overflow-hidden shadow-lg">
              <div className="image-reveal reveal w-full h-full">
                <img 
                  src="/lovable-uploads/053f601c-1228-481c-9aca-d078fb3d7d8a.png" 
                  alt="Martina Domeniconi - Mindset Coach" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="absolute w-full h-full top-4 left-4 border-2 border-sage -z-10"></div>
          </div>
          
          <div className={`reveal-right ${isVisible ? 'revealed' : ''}`}>
            <p className="text-lg text-foreground/80 mb-6">
              Als zertifizierter Mindset Coach nach Christian Bischoff habe ich in der 20-monatigen Ausbildung nicht nur theoretisches Wissen erworben, sondern auch wertvolle praktische Erfahrungen gesammelt. Durch verschiedene Challenges wurde mir bewusst, wie entscheidend eine positive mentale Grundhaltung ist – und welche transformative Kraft unsere Gedanken haben!
            </p>
            
            <p className="text-lg text-foreground/80 mb-6">
              Ich bin fasziniert davon, was mit dem richtigen Mindset alles möglich ist. Denn ich glaube fest daran: <span className="italic font-medium">Alles im Leben geschieht dir aus einem bestimmten Grund.</span>
            </p>
            
            <p className="text-lg text-foreground/80 mb-6">
              Mein Ziel ist es, das Wissen, das ich in dieser Ausbildung erlernt habe, weiterzugeben, damit auch <span className="text-petrol font-medium">du dein wahres Potenzial entfalten und deinen Herzensweg mit Freude und Gelassenheit gehen kannst</span>.
            </p>
            
            <p className="text-lg text-foreground/80 mb-8">
              Seit 2019 bin ich als Ordnungs-Coach tätig. Beim Ordnungs-Coaching geht es vorrangig um die äußere Ordnung – darum, Dinge loszulassen, die keinen Mehrwert mehr bieten. Durch diese Tätigkeit wurde mir zunehmend bewusst, dass Unordnung nicht nur im Außen existiert – sondern auch im Innern: in unseren Gedanken.
            </p>
            
            <div className="p-5 bg-white/80 backdrop-blur-sm shadow-sm border-l-2 border-petrol">
              <p className="text-petrol font-medium">
                "Was ist Mindset: Mindset ist die Art und Weise wie Du denkst. Deine Gedanken beeinflussen Deine Entscheidungen, Handlungen und somit Dein ganzes Leben. Willst Du etwas in Deinem Leben verändern, so musst Du als erstes lernen Deine Gedanken bewusst zu steuern."
              </p>
            </div>
          </div>
        </div>
        
        {/* Additional credentials section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="reveal-element">
            <div className="bg-white p-6 shadow-md h-full flex flex-col items-center text-center">
              <Award size={32} className="text-petrol mb-4" />
              <h3 className="text-xl font-serif font-medium mb-2">Zertifizierte Ausbildung</h3>
              <p className="text-foreground/70">20-monatige Mindset Coach Ausbildung nach Christian Bischoff</p>
            </div>
          </div>
          
          <div className="reveal-element delay-100">
            <div className="bg-white p-6 shadow-md h-full flex flex-col items-center text-center">
              <BookOpen size={32} className="text-petrol mb-4" />
              <h3 className="text-xl font-serif font-medium mb-2">Erfahrung</h3>
              <p className="text-foreground/70">Seit 2019 als Ordnungs-Coach tätig mit Fokus auf ganzheitliches Wohlbefinden</p>
            </div>
          </div>
          
          <div className="reveal-element delay-200">
            <div className="bg-white p-6 shadow-md h-full flex flex-col items-center text-center">
              <Users size={32} className="text-petrol mb-4" />
              <h3 className="text-xl font-serif font-medium mb-2">Persönliche Betreuung</h3>
              <p className="text-foreground/70">Individuelles Coaching für deine einzigartigen Bedürfnisse und Ziele</p>
            </div>
          </div>
        </div>
            
        <div className="mt-12 text-center">
          <a 
            href="#services" 
            className="btn-primary"
          >
            Entdecke meine Coaching-Angebote
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
