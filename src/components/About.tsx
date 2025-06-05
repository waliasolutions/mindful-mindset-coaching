
import { useState, useEffect, useRef } from 'react';
import { CheckCircle } from 'lucide-react';
import OptimizedImage from './OptimizedImage';
import { useContentBridge } from '@/hooks/useContentBridge';
import { useImageBridge } from '@/hooks/useImageBridge';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Default content (original website content)
  const defaultContent = {
    title: "Martina Domeniconi – zertifizierter Mindset Coach",
    subtitle: "Über mich"
  };

  // Use content bridge to allow admin overrides
  const content = useContentBridge('about', defaultContent);

  // Use image bridge for the profile image
  const profileImageUrl = useImageBridge('about-profile', '/lovable-uploads/053f601c-1228-481c-9aca-d078fb3d7d8a.png');

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
    <section id="about" ref={sectionRef} className="section-padding bg-white text-forest">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Image Column */}
            <div className={`reveal-left ${isVisible ? 'animate-reveal-left' : ''}`}>
              <div className="relative">
                <div className="aspect-square max-w-md mx-auto md:max-w-none">
                  <OptimizedImage
                    src={profileImageUrl}
                    alt="Martina Domeniconi - Mindset Coach"
                    className="w-full h-full object-cover rounded-lg shadow-lg"
                    priority="low"
                  />
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className={`reveal-right ${isVisible ? 'animate-reveal-right' : ''}`}>
              <div className="flex justify-start mb-2">
                <span className="px-3 py-1 text-xs font-medium bg-moss/20 rounded-full backdrop-blur-sm text-forest">{content.subtitle}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4 text-forest">
                {content.title}
              </h2>
              <div className="w-16 h-1 mb-6 md:mb-8 bg-[#41773a]"></div>
              <p className="text-lg leading-relaxed mb-8 text-forest/90">
                Ich bin Martina, zertifizierter Mindset Coach und deine Begleiterin auf dem Weg zu einem erfüllteren Leben. 
                Mit jahrelanger Erfahrung helfe ich Menschen dabei, ihre inneren Blockaden zu lösen und ihr volles Potenzial zu entfalten.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Zertifizierter Mindset Coach",
                  "Spezialisierung auf Glaubenssätze und Selbstbild",
                  "Individuelle 1:1 Coaching-Programme",
                  "Fokus auf nachhaltige Veränderung"
                ].map((point, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-moss flex-shrink-0" />
                    <span className="text-forest/80">{point}</span>
                  </div>
                ))}
              </div>
              
              <p className="text-forest/80 leading-relaxed">
                Mein Ziel ist es, dir dabei zu helfen, ein Leben zu erschaffen, das wirklich zu dir passt. 
                Gemeinsam arbeiten wir daran, deine limitierenden Glaubenssätze zu transformieren und neue, 
                bestärkende Denkweisen zu entwickeln.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
