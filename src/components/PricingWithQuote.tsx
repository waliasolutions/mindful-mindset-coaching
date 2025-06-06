
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useUnifiedContent } from '@/hooks/useUnifiedContent';

const PricingWithQuote = () => {
  const { content } = useUnifiedContent('pricing', {
    title: "Investiere in dein Wohlbefinden",
    description: "Mir ist wichtig, dass du dich wohlfühlst – deshalb starten wir mit einem kostenlosen Kennenlerngespräch. In einem kurzen Telefonat können wir erste Fragen klären und gemeinsam sehen, ob die Zusammenarbeit für beide Seiten passt.",
    quote: "Unsere wichtigste Entscheidung ist, ob wir das Universum für einen freundlichen oder feindlichen Ort halten.",
    quoteAuthor: "― Albert Einstein",
    quoteImage: "/lovable-uploads/8a4be257-655e-4d69-b10e-5db95864ae5a.png",
    price: "CHF 90",
    pricePeriod: "pro Sitzung",
    packageTitle: "Coaching Einzelsitzung"
  });

  const features = [
    "Persönliches 1:1 Coaching",
    "Individuelle Lösungsansätze",
    "Flexible Terminplanung",
    "Nachbetreuung per E-Mail",
    "Praktische Übungen und Tools"
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-forest mb-6">
              {content.title}
            </h2>
            <p className="text-lg text-forest/80 max-w-2xl mx-auto leading-relaxed">
              {content.description}
            </p>
          </div>

          {/* Einstein Quote with Image */}
          <div className="bg-sage/5 rounded-2xl p-8 mb-16">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3">
                <img 
                  src={content.quoteImage}
                  alt="Albert Einstein" 
                  className="w-full max-w-[200px] mx-auto rounded-lg shadow-lg"
                />
              </div>
              <div className="md:w-2/3">
                <blockquote className="text-xl md:text-2xl font-medium text-forest mb-4 leading-relaxed">
                  "{content.quote}"
                </blockquote>
                <cite className="text-forest/70 font-medium">
                  {content.quoteAuthor}
                </cite>
              </div>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="max-w-md mx-auto">
            <div className="bg-white border-2 border-sage/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-sage to-sage/80 p-6 text-white text-center">
                <h3 className="text-2xl font-bold mb-2">{content.packageTitle}</h3>
                <div className="text-4xl font-bold">{content.price}</div>
                <div className="text-sage/90 font-medium">{content.pricePeriod}</div>
              </div>
              
              <div className="p-8">
                <ul className="space-y-3 mb-8">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-center text-forest/80">
                      <Check className="h-5 w-5 text-sage mr-3 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  size="lg" 
                  className="w-full bg-sage hover:bg-sage/90 text-white font-semibold"
                  asChild
                >
                  <a href="#contact">
                    Kennenlerngespräch vereinbaren
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingWithQuote;
