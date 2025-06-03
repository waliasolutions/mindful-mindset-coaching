
import { Star, Heart, Target, Lightbulb, Users, Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useContentSettings } from '@/hooks/useContentSettings';

const iconMap = {
  Star, Heart, Target, Lightbulb, Users, Trophy
};

const defaultServicesContent = {
  title: 'Meine Coaching-Services',
  description: 'Entdecke die Kraft deines Mindsets und verwandle Herausforderungen in Chancen',
  benefits: [
    {
      title: 'Selbstbewusstsein stärken',
      description: 'Entwickle ein starkes Selbstvertrauen und lerne, an dich selbst zu glauben.',
      icon: 'Star'
    },
    {
      title: 'Ängste überwinden',
      description: 'Befreie dich von limitierenden Glaubenssätzen und Ängsten, die dich zurückhalten.',
      icon: 'Heart'
    },
    {
      title: 'Ziele erreichen',
      description: 'Setze klare Ziele und entwickle einen strukturierten Plan zu deren Umsetzung.',
      icon: 'Target'
    },
    {
      title: 'Denkweise verändern',
      description: 'Transformiere negative Gedankenmuster in positive und konstruktive Denkweisen.',
      icon: 'Lightbulb'
    },
    {
      title: 'Beziehungen verbessern',
      description: 'Stärke deine zwischenmenschlichen Beziehungen durch bessere Kommunikation.',
      icon: 'Users'
    },
    {
      title: 'Erfolg manifestieren',
      description: 'Lerne, wie du deine Träume in die Realität umsetzen und nachhaltigen Erfolg erzielen kannst.',
      icon: 'Trophy'
    }
  ]
};

const Services = ({ settings }: { settings?: any }) => {
  const { content } = useContentSettings('services', defaultServicesContent);

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-sage/10 to-cream/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-forest mb-4 reveal-up">
            {content.title}
          </h2>
          <p className="text-lg text-forest/80 max-w-2xl mx-auto reveal-up delay-200">
            {content.description}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.benefits?.map((benefit: any, index: number) => {
            const IconComponent = iconMap[benefit.icon as keyof typeof iconMap] || Star;
            return (
              <Card 
                key={index} 
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-sage/20 reveal-up"
                style={{ animationDelay: `${index * 100 + 400}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-forest to-sage rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-forest mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-forest/70 leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
