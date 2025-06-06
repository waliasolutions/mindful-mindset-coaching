
import { Button } from '@/components/ui/button';
import { useUnifiedContent } from '@/hooks/useUnifiedContent';

const Hero = () => {
  const { content } = useUnifiedContent('hero', {
    title: "Mindset Coaching für ein glückliches und erfülltes Leben",
    subtitle: "Entfalte dein volles Potenzial und erschaffe das Leben, von dem du träumst. Mit dem richtigen Mindset sind deinen Möglichkeiten keine Grenzen gesetzt.",
    additionalText: "Das zentrale Thema bei Mindset Coaching sind deine persönlichen Überzeugungen und Glaubenssätze. Wovon du selber überzeugst bist, verwirklichst du in deinem Leben. In einem persönlichen Coaching lernst du deine negativen Glaubenssätze zu erkennen und abzulegen und stattdessen in jedem Lebensbereich bestärkende Glaubenssätze zu entwickeln. Dazu gehört auch ein positives Selbstbild aufzubauen und in den inneren Frieden mit dir, deinen Mitmenschen, deiner Vergangenheit und deiner Geschichte zu kommen.",
    buttonText: "Kennenlerngespräch vereinbaren",
    backgroundImage: "/lovable-uploads/7b4f0db6-80ea-4da6-b817-0f33ba7562b5.png"
  });

  return (
    <section id="hero" className="min-h-screen flex items-center relative overflow-hidden bg-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={content.backgroundImage}
          alt="Mindset Coaching Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {content.title}
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-3xl">
            {content.subtitle}
          </p>
          
          {content.additionalText && (
            <p className="text-base md:text-lg text-white/80 mb-8 leading-relaxed max-w-3xl">
              {content.additionalText}
            </p>
          )}
          
          <Button 
            size="lg" 
            className="bg-sage hover:bg-sage/90 text-white font-semibold px-8 py-4 text-lg"
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

export default Hero;
