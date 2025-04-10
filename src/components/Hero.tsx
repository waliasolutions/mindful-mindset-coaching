import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield } from 'lucide-react';

const Hero = () => {
  return (
    <section id="hero" className="relative section-padding">
      
      <div className="absolute bottom-4 left-4 z-10">
        <Badge variant="default" className="flex items-center gap-2 text-xs sm:text-sm">
          <Shield size={16} />
          Martina Domeniconi, Zertifizierter Mindset Coach
        </Badge>
      </div>
    </section>
  );
};

export default Hero;
