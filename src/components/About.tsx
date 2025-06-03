
import OptimizedImage from './OptimizedImage';
import { useContentSettings } from '@/hooks/useContentSettings';

const defaultAboutContent = {
  title: 'Über mich',
  subtitle: 'Deine Begleiterin auf dem Weg zu einem erfüllteren Leben',
  description: 'Als zertifizierte Mindset Coachin bringe ich jahrelange Erfahrung in der persönlichen Entwicklung mit. Meine Mission ist es, Menschen dabei zu helfen, ihre mentalen Blockaden zu überwinden und ihr volles Potenzial zu entfalten. Durch eine Kombination aus bewährten Coaching-Techniken und individueller Betreuung begleite ich dich auf deinem Weg zu mehr Selbstvertrauen, Klarheit und Erfolg.'
};

const About = ({ settings }: { settings?: any }) => {
  const { content } = useContentSettings('about', defaultAboutContent);

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="reveal-left">
            <OptimizedImage
              src="/lovable-uploads/bd5be052-018c-4d84-a5b7-2a3deeab2715.png"
              alt="Mindset Coach Martina"
              className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              priority="medium"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          
          <div className="reveal-right">
            <h2 className="text-3xl md:text-4xl font-bold text-forest mb-6">
              {content.title}
            </h2>
            <h3 className="text-xl text-sage font-medium mb-6">
              {content.subtitle}
            </h3>
            <p className="text-forest/80 leading-relaxed text-lg mb-8">
              {content.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
