
import { useState, useEffect, useRef } from 'react';
import { Award, BookOpen, Users, Leaf } from 'lucide-react';
import EditableText from './EditableText';
import EditableImage from './EditableImage';

const About = () => {
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
    <section id="about" ref={sectionRef} className="section-padding relative overflow-hidden bg-mint/30">
      {/* Background texture */}
      <div className="absolute inset-0 bg-pattern-light -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto mb-16 reveal-element">
          <div className="flex justify-center mb-2">
            <span className="px-3 py-1 text-xs font-medium text-forest bg-highlight rounded-full">
              Über mich
            </span>
          </div>
          <EditableText
            pageId="about"
            contentKey="main-heading"
            defaultContent="Martina Domeniconi – zertifizierter Mindset Coach"
            tag="h2"
            className="text-3xl md:text-4xl font-serif font-semibold text-center mb-4 text-forest"
          />
          <div className="w-16 h-1 bg-moss mx-auto mb-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className={`relative reveal-left ${isVisible ? 'revealed' : ''}`}>
            <div className="aspect-[4/5] relative z-10 overflow-hidden rounded-lg">
              <div className="image-reveal reveal w-full h-full">
                <EditableImage
                  pageId="about"
                  contentKey="profile-image"
                  defaultSrc="/lovable-uploads/053f601c-1228-481c-9aca-d078fb3d7d8a.png"
                  alt="Martina Domeniconi - Mindset Coach"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/20 to-transparent"></div>
              </div>
            </div>
            <div className="absolute w-full h-full top-4 left-4 border-2 border-moss -z-10 rounded-lg"></div>
          </div>
          
          <div className={`reveal-right ${isVisible ? 'revealed' : ''}`}>
            <EditableText
              pageId="about"
              contentKey="intro-paragraph"
              defaultContent="Als zertifizierter Mindset Coach nach Christian Bischoff habe ich in der 20-monatigen Ausbildung nicht nur theoretisches Wissen erworben, sondern auch wertvolle praktische Erfahrungen gesammelt. Durch verschiedene Challenges wurde mir bewusst, wie entscheidend eine positive mentale Grundhaltung ist – und welche transformative Kraft unsere Gedanken haben!"
              tag="p"
              className="text-lg text-foreground/80 mb-6"
            />
            
            <EditableText
              pageId="about"
              contentKey="belief-paragraph"
              defaultContent="Ich bin fasziniert davon, was mit dem richtigen Mindset alles möglich ist. Denn ich glaube fest daran: <span className='italic font-medium'>Alles im Leben geschieht dir aus einem bestimmten Grund.</span>"
              tag="p"
              className="text-lg text-foreground/80 mb-6"
            />
            
            <EditableText
              pageId="about"
              contentKey="goal-paragraph"
              defaultContent="Mein Ziel ist es, das Wissen, das ich in dieser Ausbildung erlernt habe, weiterzugeben, damit auch <span className='text-forest font-medium'>du dein wahres Potenzial entfalten und deinen Herzensweg mit Freude und Gelassenheit gehen kannst</span>."
              tag="p"
              className="text-lg text-foreground/80 mb-6"
            />
            
            <EditableText
              pageId="about"
              contentKey="experience-paragraph"
              defaultContent="Seit 2019 bin ich als Ordnungs-Coach tätig. Beim Ordnungs-Coaching geht es vorrangig um die äußere Ordnung – darum, Dinge loszulassen, die keinen Mehrwert mehr bieten. Durch diese Tätigkeit wurde mir zunehmend bewusst, dass Unordnung nicht nur im Aussen existiert – sondern auch im Innern: in unseren Gedanken."
              tag="p"
              className="text-lg text-foreground/80 mb-8"
            />
            
            <div className="p-5 bg-white backdrop-blur-sm shadow-sm border-l-2 border-moss rounded-r-md">
              <div className="flex items-start gap-3">
                <Leaf size={20} className="text-forest flex-shrink-0 mt-1" />
                <EditableText
                  pageId="about"
                  contentKey="mindset-quote"
                  defaultContent="Was ist Mindset: Mindset ist die Art und Weise wie Du denkst. Deine Gedanken beeinflussen Deine Entscheidungen, Handlungen und somit Dein ganzes Leben. Willst Du etwas in Deinem Leben verändern, so musst Du als erstes lernen Deine Gedanken bewusst zu steuern."
                  tag="p"
                  className="text-forest font-medium"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="reveal-element">
            <div className="bg-white p-6 shadow-md h-full flex flex-col items-center text-center rounded-md border-b-2 border-moss">
              <Award size={32} className="text-forest mb-4" />
              <EditableText
                pageId="about"
                contentKey="certification-title"
                defaultContent="Zertifizierte Ausbildung"
                tag="h3"
                className="text-xl font-serif font-medium mb-2"
              />
              <EditableText
                pageId="about"
                contentKey="certification-description"
                defaultContent="20-monatige Mindset Coach Ausbildung nach Christian Bischoff"
                tag="p"
                className="text-foreground/70"
              />
            </div>
          </div>
          
          <div className="reveal-element delay-100">
            <div className="bg-white p-6 shadow-md h-full flex flex-col items-center text-center rounded-md border-b-2 border-moss">
              <BookOpen size={32} className="text-forest mb-4" />
              <EditableText
                pageId="about"
                contentKey="experience-title"
                defaultContent="Erfahrung"
                tag="h3"
                className="text-xl font-serif font-medium mb-2"
              />
              <EditableText
                pageId="about"
                contentKey="experience-description"
                defaultContent="Seit 2019 als Ordnungs-Coach tätig mit Fokus auf ganzheitliches Wohlbefinden"
                tag="p"
                className="text-foreground/70"
              />
            </div>
          </div>
          
          <div className="reveal-element delay-200">
            <div className="bg-white p-6 shadow-md h-full flex flex-col items-center text-center rounded-md border-b-2 border-moss">
              <Users size={32} className="text-forest mb-4" />
              <EditableText
                pageId="about"
                contentKey="personal-care-title"
                defaultContent="Persönliche Betreuung"
                tag="h3"
                className="text-xl font-serif font-medium mb-2"
              />
              <EditableText
                pageId="about"
                contentKey="personal-care-description"
                defaultContent="Individuelles Coaching für deine einzigartigen Bedürfnisse und Ziele"
                tag="p"
                className="text-foreground/70"
              />
            </div>
          </div>
        </div>
            
        <div className="mt-12 text-center">
          <a href="#services" className="inline-flex items-center justify-center px-6 py-3 bg-forest text-white hover:bg-forest/90 transition-colors shadow-lg font-medium rounded-md">
            Entdecke meine Coaching-Angebote
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
