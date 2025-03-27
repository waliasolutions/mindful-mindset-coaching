
import { useState, useEffect, useRef } from 'react';

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
        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex justify-center mb-2">
            <span className="px-3 py-1 text-xs font-medium text-petrol bg-petrol/10 rounded-full">
              Über mich
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold text-center mb-4">
            Martina Domeniconi – zertifizierter Mindset Coach
          </h2>
          <div className="w-16 h-1 bg-mauve mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`relative transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="aspect-square relative z-10 rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="/lovable-uploads/053f601c-1228-481c-9aca-d078fb3d7d8a.png" 
                alt="Martina mit Blumen" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute w-full h-full top-4 left-4 border-2 border-sage rounded-2xl -z-10"></div>
            
            <div className="hidden md:block absolute -bottom-12 -right-12 w-48 h-48 rounded-xl overflow-hidden shadow-lg">
              <img 
                src="/lovable-uploads/c3990bed-42a6-44c3-94fd-186347006165.png" 
                alt="Martina mit Hund" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          
          <div className={`transition-all duration-1000 ease-out delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <p className="text-lg text-foreground/80 mb-6">
              Als zertifizierter Mindset Coach nach Christian Bischoff habe ich in der 20-monatigen Ausbildung nicht nur theoretisches Wissen erworben, sondern auch wertvolle praktische Erfahrungen gesammelt. Durch verschiedene Challenges wurde mir bewusst, wie entscheidend eine positive mentale Grundhaltung ist – und welche transformative Kraft unsere Gedanken haben!
            </p>
            
            <p className="text-lg text-foreground/80 mb-6">
              Ich bin fasziniert davon, was mit dem richtigen Mindset alles möglich ist. Denn ich glaube fest daran: Alles im Leben geschieht dir aus einem bestimmten Grund.
            </p>
            
            <p className="text-lg text-foreground/80 mb-6">
              Mein Ziel ist es, das Wissen, das ich in dieser Ausbildung erlernt habe, weiterzugeben, damit auch andere ihr wahres Potenzial entfalten und ihren Herzensweg mit Freude und Gelassenheit gehen können.
            </p>
            
            <p className="text-lg text-foreground/80 mb-8">
              Seit 2019 bin ich als Ordnungs-Coach tätig (www.organize-my-space.ch). Beim Ordnungs-Coaching geht es vorrangig um die äußere Ordnung – darum, Dinge loszulassen, die man nicht mehr braucht oder die keinen Mehrwert mehr bieten. Durch diese Tätigkeit wurde mir zunehmend bewusst, dass Unordnung nicht nur im Außen existiert – sondern auch im Innern nämlich in unseren Gedanken.
            </p>
            
            <div className="p-5 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm border border-sage/30">
              <p className="text-petrol font-medium">
                "Was ist Mindset: Mindset ist die Art und Weise wie Du denkst. Deine Gedanken beeinflussen Deine Entscheidungen, Handlungen und somit Dein ganzes Leben. Willst Du etwas in Deinem Leben verändern, so musst Du als erstes lernen Deine Gedanken bewusst zu steuern."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
