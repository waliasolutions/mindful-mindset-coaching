
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import OptimizedImage from './OptimizedImage';
import { useContentBridge } from '@/hooks/useContentBridge';
import { useImageBridge } from '@/hooks/useImageBridge';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Default content (original website content)
  const defaultContent = {
    title: "Mindset Coaching für ein glückliches und erfülltes Leben",
    subtitle: "Entfalte dein volles Potenzial und erschaffe das Leben, von dem du träumst. Mit dem richtigen Mindset sind deinen Möglichkeiten keine Grenzen gesetzt.",
    additionalText: "Das zentrale Thema bei Mindset Coaching sind deine persönlichen Überzeugungen und Glaubenssätze. Wovon du selber überzeugst bist, verwirklichst du in deinem Leben. In einem persönlichen Coaching lernst du deine negativen Glaubenssätze zu erkennen und abzulegen und stattdessen in jedem Lebensbereich bestärkende Glaubenssätze zu entwickeln. Dazu gehört auch ein positives Selbstbild aufzubauen und in den inneren Frieden mit dir, deinen Mitmenschen, deiner Vergangenheit und deiner Geschichte zu kommen.",
    buttonText: "Kennenlerngespräch vereinbaren"
  };

  // Use content bridge to allow admin overrides
  const content = useContentBridge('hero', defaultContent);

  // Use image bridge for the background image
  const backgroundImageUrl = useImageBridge('hero-background', '/lovable-uploads/7b4f0db6-80ea-4da6-b817-0f33ba7562b5.png');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src={backgroundImageUrl}
          alt="Mindset Coaching Hintergrund"
          className="w-full h-full object-cover"
          priority="high"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold mb-6 leading-tight">
            {content.title}
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 font-light leading-relaxed max-w-3xl mx-auto">
            {content.subtitle}
          </p>
          
          <p className="text-lg mb-10 leading-relaxed max-w-4xl mx-auto opacity-90">
            {content.additionalText}
          </p>
          
          <a href="#contact" className="inline-flex items-center">
            <Button size="lg" className="bg-beige hover:bg-beige/90 text-forest font-medium px-8 py-4 text-lg">
              {content.buttonText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
