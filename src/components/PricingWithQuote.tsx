
import { useState, useEffect, useRef } from 'react';
import { AspectRatio } from './ui/aspect-ratio';
import { MessageSquareQuote, Check, Calendar, Clock, Users } from 'lucide-react';
import OptimizedImage from './OptimizedImage';
import InlineEditor from './admin/InlineEditor';

const PricingWithQuote = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [content, setContent] = useState<any>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Check if we're in edit mode
    setIsEditMode(localStorage.getItem('editMode') === 'true');
    
    // Load section content
    const sectionContent = localStorage.getItem('section_pricing');
    if (sectionContent) {
      setContent(JSON.parse(sectionContent));
    }
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleContentSave = (key: string, value: string) => {
    if (!content) return;
    
    const updatedContent = { ...content, [key]: value };
    setContent(updatedContent);
    localStorage.setItem('section_pricing', JSON.stringify(updatedContent));
  };

  // Use default content if not loaded from storage
  const title = content?.title || "Investiere in dein Wohlbefinden";
  const description = content?.description || "Vor jedem Coaching machen wir zuerst ein kostenloses Kennenlerngespraech online oder per Telefon.";
  const quote = content?.quote || "Unsere wichtigste Entscheidung ist, ob wir das Universum für einen freundlichen oder feindlichen Ort halten.";
  const quoteAuthor = content?.quoteAuthor || "― Albert Einstein";
  const price = content?.price || "CHF 90";
  const pricePeriod = content?.pricePeriod || "pro Sitzung";
  const packageTitle = content?.packageTitle || "Coaching Einzelsitzung";
  const packageDescription = content?.packageDescription || "Individuelle Betreuung für deine Bedürfnisse";
  const features = content?.features || [
    "Individuelle Betreuung auf deine Bedürfnisse zugeschnitten",
    "Praktische Übungen und Techniken für den Alltag",
    "Fokus auf deine persönlichen Ziele und Herausforderungen",
    "Flexible Terminvereinbarung"
  ];

  return (
    <section 
      id="pricing" 
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-mint text-forest"
    >
      {/* Background with overlay */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <AspectRatio ratio={16/9} className="h-full">
          <img 
            src="/lovable-uploads/bfcdd5e2-5796-4cc9-b81c-3651711c0440.png" 
            alt="Forest background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-mint/80"></div>
        </AspectRatio>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10 -z-10">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sage to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sage to-transparent"></div>
        <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-sage to-transparent"></div>
        <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-sage to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto mb-16 reveal-element">
          <div className="flex justify-center mb-2">
            <span className="px-3 py-1 text-xs font-medium bg-highlight/20 rounded-full backdrop-blur-sm text-forest">
              Investition
            </span>
          </div>
          <InlineEditor
            content={title}
            onSave={(value) => handleContentSave('title', value)}
            isEditMode={isEditMode}
            className="text-3xl md:text-4xl font-serif font-semibold text-center mb-4 text-forest"
          />
          <div className="w-16 h-1 bg-highlight mx-auto mb-8"></div>
          <InlineEditor
            content={description}
            onSave={(value) => handleContentSave('description', value)}
            isEditMode={isEditMode}
            className="text-lg text-center text-forest/90 max-w-2xl mx-auto"
          />
        </div>

        <div className="grid md:grid-cols-5 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Quote */}
          <div 
            className={`md:col-span-2 transition-all duration-1000 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="h-full flex items-center">
              <div className="bg-white/10 backdrop-blur-sm p-5 border border-sage/20 rounded-lg h-full flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-40 h-40 md:w-48 md:h-48 mb-4 rounded-lg overflow-hidden bg-white/20">
                    <OptimizedImage
                      src="/lovable-uploads/eff14ab3-8502-4ea4-9c20-75fe9b485119.png"
                      alt="Albert Einstein portrait"
                      className="w-full h-full object-cover"
                      priority="high"
                    />
                  </div>
                  <div className="flex items-center mb-3">
                    <MessageSquareQuote size={24} className="text-highlight mr-2" />
                  </div>
                  <InlineEditor
                    content={quote}
                    onSave={(value) => handleContentSave('quote', value)}
                    isEditMode={isEditMode}
                    className="text-xl text-forest font-serif mb-3 leading-relaxed text-center"
                  />
                  <InlineEditor
                    content={quoteAuthor}
                    onSave={(value) => handleContentSave('quoteAuthor', value)}
                    isEditMode={isEditMode}
                    className="text-forest/70 font-medium"
                    simpleEditor={true}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="md:col-span-3">
            <div className="bg-white shadow-xl overflow-hidden border border-sage/20 rounded-lg h-full">
              <div className="h-0.5 bg-forest"></div>
              <div className="bg-gradient-to-r from-highlight/50 to-highlight p-6 md:p-8 text-forest">
                <InlineEditor
                  content={packageTitle}
                  onSave={(value) => handleContentSave('packageTitle', value)}
                  isEditMode={isEditMode}
                  className="text-2xl font-serif font-medium mb-2"
                />
                <InlineEditor
                  content={packageDescription}
                  onSave={(value) => handleContentSave('packageDescription', value)}
                  isEditMode={isEditMode}
                  className="text-forest/90 mb-4"
                />
                <div className="flex items-baseline">
                  <InlineEditor
                    content={price}
                    onSave={(value) => handleContentSave('price', value)}
                    isEditMode={isEditMode}
                    className="text-4xl font-bold"
                    simpleEditor={true}
                  />
                  <InlineEditor
                    content={pricePeriod}
                    onSave={(value) => handleContentSave('pricePeriod', value)}
                    isEditMode={isEditMode}
                    className="text-forest/90 ml-2"
                    simpleEditor={true}
                  />
                </div>
              </div>
              
              <div className="p-6 md:p-8 text-foreground">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-highlight rounded-full flex items-center justify-center">
                      <Clock size={20} className="text-forest" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Dauer</p>
                      <p className="text-foreground/70">45 Min – 1 Std.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-highlight rounded-full flex items-center justify-center">
                      <Users size={20} className="text-forest" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Format</p>
                      <p className="text-foreground/70">Online</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-highlight rounded-full flex items-center justify-center">
                      <Calendar size={20} className="text-forest" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Erstgespraech</p>
                      <p className="text-coral font-medium">Kostenlos</p>
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check size={18} className="text-moss flex-shrink-0 mt-0.5" />
                      {isEditMode ? (
                        <InlineEditor
                          content={feature}
                          onSave={(value) => {
                            const newFeatures = [...features];
                            newFeatures[index] = value;
                            handleContentSave('features', newFeatures);
                          }}
                          isEditMode={isEditMode}
                          className="text-foreground/80"
                          simpleEditor={true}
                        />
                      ) : (
                        <span className="text-foreground/80">{feature}</span>
                      )}
                    </li>
                  ))}
                </ul>
                
                <div>
                  <a 
                    href="#contact" 
                    className="bg-highlight hover:bg-highlight/90 text-forest w-full flex justify-center py-3 px-4 rounded-md transition-all"
                  >
                    Jetzt buchen
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingWithQuote;
