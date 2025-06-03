
import { ArrowRight, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import OptimizedImage from './OptimizedImage';
import { useContentSettings } from '@/hooks/useContentSettings';

const defaultHeroContent = {
  title: 'Verwandle dein Leben mit Mindset Coaching',
  subtitle: 'Entdecke dein wahres Potenzial und erreiche deine Ziele mit professionellem Mindset Coaching in Zürich. Ich begleite dich auf deinem Weg zu einem erfüllteren Leben.',
  buttonText: 'Kostenloses Erstgespräch',
  backgroundImage: '/lovable-uploads/eff14ab3-8502-4ea4-9c20-75fe9b485119.png'
};

const Hero = ({ settings }: { settings?: any }) => {
  const { content } = useContentSettings('hero', defaultHeroContent);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src={content.backgroundImage}
          alt="Mindset Coach Martina Background"
          className="w-full h-full object-cover"
          priority="high"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight reveal-up">
          {content.title}
        </h1>
        
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90 reveal-up delay-200">
          {content.subtitle}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center reveal-up delay-400">
          <Button 
            asChild 
            size="lg" 
            className="bg-forest hover:bg-forest/90 text-white px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <a href="#contact" className="inline-flex items-center gap-2">
              {content.buttonText}
              <ArrowRight className="h-5 w-5" />
            </a>
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-white text-white hover:bg-white hover:text-forest px-8 py-3 text-lg font-semibold rounded-full backdrop-blur-sm bg-white/10 transition-all duration-300 hover:scale-105"
            asChild
          >
            <a href="#about" className="inline-flex items-center gap-2">
              <PlayCircle className="h-5 w-5" />
              Mehr erfahren
            </a>
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
