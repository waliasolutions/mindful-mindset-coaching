
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Star } from 'lucide-react';
import { useContentSettings } from '@/hooks/useContentSettings';

const defaultPricingContent = {
  title: 'Investiere in deine Zukunft',
  description: 'Wähle das Coaching-Paket, das am besten zu deinen Zielen passt',
  quote: 'Der beste Zeitpunkt, einen Baum zu pflanzen, war vor 20 Jahren. Der zweitbeste Zeitpunkt ist jetzt.',
  quoteAuthor: 'Chinesisches Sprichwort',
  packageTitle: 'Mindset Transformation',
  price: 'CHF 197',
  pricePeriod: 'pro Session',
  features: [
    '90 Minuten intensive Coaching-Session',
    'Persönliche Potenzialanalyse',
    'Individuelle Strategieentwicklung',
    'Praktische Übungen für den Alltag',
    'Follow-up per E-Mail',
    '100% Vertraulichkeit garantiert'
  ]
};

const PricingWithQuote = ({ settings }: { settings?: any }) => {
  const { content } = useContentSettings('pricing', defaultPricingContent);

  return (
    <section id="pricing" className="py-20 bg-gradient-to-br from-cream/30 to-sage/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-forest mb-4 reveal-up">
            {content.title}
          </h2>
          <p className="text-lg text-forest/80 max-w-2xl mx-auto reveal-up delay-200">
            {content.description}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="mb-12 bg-gradient-to-r from-forest to-sage text-white reveal-up delay-400">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-current text-yellow-300" />
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl font-medium italic mb-4">
                "{content.quote}"
              </blockquote>
              <cite className="text-forest/90 font-medium">
                — {content.quoteAuthor}
              </cite>
            </CardContent>
          </Card>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <Card className="reveal-left bg-white/90 backdrop-blur-sm border-2 border-forest/20 hover:border-forest/40 transition-all duration-300 hover:shadow-xl">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl text-forest mb-2">
                  {content.packageTitle}
                </CardTitle>
                <div className="text-center">
                  <span className="text-4xl font-bold text-forest">{content.price}</span>
                  <span className="text-forest/90 ml-2">{content.pricePeriod}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3 mb-6">
                  {content.features?.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-forest mt-0.5 flex-shrink-0" />
                      <span className="text-forest/80">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  asChild
                  className="w-full bg-forest hover:bg-forest/90 text-white py-3 text-lg font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  <a href="#contact">
                    Jetzt Termin buchen
                  </a>
                </Button>
              </CardContent>
            </Card>

            <div className="reveal-right space-y-6">
              <Card className="bg-sage/10 border-sage/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-forest mb-3">
                    Warum Mindset Coaching?
                  </h3>
                  <p className="text-forest/80 leading-relaxed">
                    Unser Mindset bestimmt, wie wir die Welt wahrnehmen und auf Herausforderungen reagieren. 
                    Durch gezieltes Coaching lernst du, limitierende Glaubenssätze zu erkennen und in kraftvolle, 
                    unterstützende Überzeugungen umzuwandeln.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-cream/30 border-cream/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-forest mb-3">
                    Deine Investition
                  </h3>
                  <p className="text-forest/80 leading-relaxed">
                    Eine Session ist mehr als nur ein Gespräch - es ist eine Investition in deine Zukunft. 
                    Du erhältst konkrete Werkzeuge und Strategien, die du sofort in deinem Leben anwenden kannst.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingWithQuote;
