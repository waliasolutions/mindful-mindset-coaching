
import { Button } from '@/components/ui/button';
import { useUnifiedContent } from '@/hooks/useUnifiedContent';

const Services = () => {
  const { content } = useUnifiedContent('services', {
    title: "Transformiere dein Leben durch Mindset Coaching",
    description: "In einem 1:1 Coaching löst du Blockaden, bringst Klarheit in dein Gedanken-Karussell und richtest deinen Fokus auf das, was wirklich zählt: Deine Träume, Deine Lebenszufriedenheit und Deine innere Ruhe und Gelassenheit.",
    buttonText: "Kontaktiere mich"
  });

  const benefits = [
    {
      title: "Blockaden lösen",
      description: "Erkenne und überwinde mentale Barrieren, die dich davon abhalten, dein volles Potenzial zu entfalten."
    },
    {
      title: "Klarheit gewinnen",
      description: "Bringe Ordnung in dein Gedanken-Karussell und entwickle einen klaren Fokus auf deine Ziele."
    },
    {
      title: "Selbstvertrauen stärken",
      description: "Baue ein starkes Selbstbild auf und entwickle das Vertrauen in deine eigenen Fähigkeiten."
    },
    {
      title: "Inneren Frieden finden",
      description: "Komme in Harmonie mit dir selbst, deinen Mitmenschen und deiner Vergangenheit."
    },
    {
      title: "Glaubenssätze transformieren",
      description: "Wandle negative Überzeugungen in kraftvolle, unterstützende Glaubenssätze um."
    },
    {
      title: "Lebensfreude steigern",
      description: "Entdecke neue Wege zu mehr Zufriedenheit und Erfüllung in allen Lebensbereichen."
    }
  ];

  return (
    <section id="services" className="py-20 bg-sage/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-forest mb-6">
            {content.title}
          </h2>
          <p className="text-lg text-forest/80 max-w-3xl mx-auto leading-relaxed">
            {content.description}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-forest mb-3">
                {benefit.title}
              </h3>
              <p className="text-forest/70 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-sage hover:bg-sage/90 text-white font-semibold px-8 py-4"
            asChild
          >
            <a href="#contact">
              {content.buttonText}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;
