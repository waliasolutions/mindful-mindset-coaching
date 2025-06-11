
import { useState, useEffect, useRef } from 'react';
import { Award, BookOpen, Users, Leaf } from 'lucide-react';
import { useContentBridge } from '@/hooks/useContentBridge';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Default content (original website content)
  const defaultContent = {
    title: "Martina Domeniconi – zertifizierter Mindset Coach",
    subtitle: "Über mich",
    profileImage: "/lovable-uploads/053f601c-1228-481c-9aca-d078fb3d7d8a.png"
  };

  // Use content bridge to allow admin overrides
  const content = useContentBridge('about', defaultContent);

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
    <section id="about" ref={sectionRef} className="section-padding relative overflow-hidden bg-mint/30">
      {/* Background texture */}
      <div className="absolute inset-0 bg-pattern-light -z-10"></div>
      
      <div className="container mx-auto content-padding">
        <div className="max-w-4xl mx-auto section-margin-bottom reveal-element">
          <div className="flex justify-center mb-3 sm:mb-4">
            <span className="px-4 py-2 text-xs sm:text-sm font-medium text-forest bg-highlight rounded-full">
              {content.subtitle}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-semibold text-center mb-4 sm:mb-6 md:mb-8 text-forest leading-tight">
            {content.title}
          </h2>
          <div className="w-12 sm:w-16 h-1 bg-moss mx-auto mb-8 sm:mb-10"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 lg:gap-20 items-center section-margin-bottom">
          <div className={`relative reveal-left ${isVisible ? 'revealed' : ''}`}>
            <div className="aspect-[4/5] relative z-10 overflow-hidden rounded-lg max-w-sm sm:max-w-md md:max-w-lg mx-auto lg:mx-0">
              <div className="image-reveal reveal w-full h-full">
                <img src={content.profileImage} alt="Martina Domeniconi - Mindset Coach" className="w-full h-full object-cover object-center" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/20 to-transparent"></div>
              </div>
            </div>
            <div className="absolute w-full h-full top-4 sm:top-5 left-4 sm:left-5 border-2 border-moss -z-10 rounded-lg max-w-sm sm:max-w-md md:max-w-lg mx-auto lg:mx-0"></div>
          </div>
          
          <div className={`reveal-right ${isVisible ? 'revealed' : ''} content-spacing`}>
            <p className="text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed">
              Als zertifizierter Mindset Coach nach Christian Bischoff habe ich in der 20-monatigen Ausbildung nicht nur theoretisches Wissen erworben, sondern auch wertvolle praktische Erfahrungen gesammelt. Durch verschiedene Challenges wurde mir bewusst, wie entscheidend eine positive mentale Grundhaltung ist – und welche transformative Kraft unsere Gedanken haben!
            </p>
            
            <p className="text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed">
              Ich bin fasziniert davon, was mit dem richtigen Mindset alles möglich ist. Denn ich glaube fest daran: <span className="italic font-medium">Alles im Leben geschieht dir aus einem bestimmten Grund.</span>
            </p>
            
            <p className="text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed">
              Mein Ziel ist es, das Wissen, das ich in dieser Ausbildung erlernt habe, weiterzugeben, damit auch <span className="text-forest font-medium">du dein wahres Potenzial entfalten und deinen Herzensweg mit Freude und Gelassenheit gehen kannst</span>.
            </p>
            
            <p className="text-base sm:text-lg md:text-xl text-foreground/80 leading-relaxed">Seit 2019 bin ich als Ordnungs-Coach tätig. Beim Ordnungs-Coaching geht es vorrangig um die äußere Ordnung – darum, Dinge loszulassen, die keinen Mehrwert mehr bieten. Durch diese Tätigkeit wurde mir zunehmend bewusst, dass Unordnung nicht nur im Aussen existiert – sondern auch im Innern: in unseren Gedanken.</p>
            
            <div className="p-6 sm:p-7 md:p-8 bg-white backdrop-blur-sm shadow-sm border-l-2 border-moss rounded-r-md">
              <div className="flex items-start gap-4 sm:gap-5">
                <Leaf size={20} className="text-forest flex-shrink-0 mt-1" />
                <p className="text-forest font-medium text-sm sm:text-base md:text-lg leading-relaxed">
                  "Was ist Mindset: Mindset ist die Art und Weise wie Du denkst. Deine Gedanken beeinflussen Deine Entscheidungen, Handlungen und somit Dein ganzes Leben. Willst Du etwas in Deinem Leben verändern, so musst Du als erstes lernen Deine Gedanken bewusst zu steuern."
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 section-margin-bottom">
          <div className="reveal-element">
            <div className="bg-white card-padding shadow-md h-full flex flex-col items-center text-center rounded-md border-b-2 border-moss hover:shadow-lg transition-shadow duration-300">
              <Award size={32} className="text-forest mb-4 sm:mb-5" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-medium mb-3 sm:mb-4 leading-tight">Zertifizierte Ausbildung</h3>
              <p className="text-foreground/70 text-sm sm:text-base leading-relaxed">20-monatige Mindset Coach Ausbildung nach Christian Bischoff</p>
            </div>
          </div>
          
          <div className="reveal-element delay-100">
            <div className="bg-white card-padding shadow-md h-full flex flex-col items-center text-center rounded-md border-b-2 border-moss hover:shadow-lg transition-shadow duration-300">
              <BookOpen size={32} className="text-forest mb-4 sm:mb-5" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-medium mb-3 sm:mb-4 leading-tight">Erfahrung</h3>
              <p className="text-foreground/70 text-sm sm:text-base leading-relaxed">Seit 2019 als Ordnungs-Coach tätig mit Fokus auf ganzheitliches Wohlbefinden</p>
            </div>
          </div>
          
          <div className="reveal-element delay-200">
            <div className="bg-white card-padding shadow-md h-full flex flex-col items-center text-center rounded-md border-b-2 border-moss hover:shadow-lg transition-shadow duration-300">
              <Users size={32} className="text-forest mb-4 sm:mb-5" />
              <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-medium mb-3 sm:mb-4 leading-tight">Persönliche Betreuung</h3>
              <p className="text-foreground/70 text-sm sm:text-base leading-relaxed">Individuelles Coaching für deine einzigartigen Bedürfnisse und Ziele</p>
            </div>
          </div>
        </div>
            
        <div className="text-center">
          <a href="#services" className="inline-flex items-center justify-center px-6 sm:px-7 md:px-8 lg:px-10 py-3 sm:py-3.5 md:py-4 bg-forest text-white hover:bg-forest/90 transition-colors shadow-lg font-medium rounded-md text-sm sm:text-base md:text-lg min-h-[48px] touch-manipulation">
            Entdecke meine Coaching-Angebote
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
