
import { useUnifiedContent } from '@/hooks/useUnifiedContent';

const About = () => {
  const { content } = useUnifiedContent('about', {
    title: "Martina Domeniconi – zertifizierter Mindset Coach",
    subtitle: "Über mich",
    profileImage: "/lovable-uploads/053f601c-1228-481c-9aca-d078fb3d7d8a.png",
    description: "Als zertifizierter Mindset Coach begleite ich Menschen dabei, ihr volles Potenzial zu entfalten und ein erfülltes Leben zu führen."
  });

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-forest mb-4">
              {content.title}
            </h2>
            <p className="text-lg text-forest/80">
              {content.subtitle}
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="prose prose-lg text-forest/80 max-w-none">
                {content.description && (
                  <p className="text-lg leading-relaxed mb-6">
                    {content.description}
                  </p>
                )}
                
                <p className="leading-relaxed mb-6">
                  Ich glaube fest daran, dass jeder Mensch die Kraft in sich trägt, sein Leben positiv zu verändern. 
                  Meine Mission ist es, dir dabei zu helfen, diese Kraft zu entdecken und zu nutzen.
                </p>
                
                <p className="leading-relaxed mb-6">
                  In meiner Arbeit als Mindset Coach kombiniere ich bewährte Coaching-Methoden mit einem 
                  einfühlsamen und individuellen Ansatz. Jeder Mensch ist einzigartig, und so ist auch 
                  jeder Coaching-Weg maßgeschneidert auf deine persönlichen Bedürfnisse und Ziele.
                </p>
                
                <p className="leading-relaxed">
                  Gemeinsam werden wir deine Blockaden überwinden, dein Selbstvertrauen stärken und 
                  den Weg zu einem glücklicheren und erfüllteren Leben ebnen.
                </p>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="relative">
                <img 
                  src={content.profileImage}
                  alt="Martina Domeniconi - Mindset Coach" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
