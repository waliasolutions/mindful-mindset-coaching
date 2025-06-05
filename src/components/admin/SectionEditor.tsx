
import { useState, useEffect } from 'react';
import { X, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { saveContentOverride, extractContentFromDOM } from '@/hooks/useContentBridge';
import { saveImageOverride } from '@/hooks/useImageBridge';
import ImagePicker from './ImagePicker';

interface Section {
  id: string;
  name: string;
  component: string;
  visible: boolean;
  order: number;
}

interface SectionEditorProps {
  section: Section;
  onClose: () => void;
}

const getDefaultContent = (sectionId: string) => {
  switch (sectionId) {
    case 'hero':
    case 'home':
      return {
        title: "Mindset Coaching für ein glückliches und erfülltes Leben",
        subtitle: "Entfalte dein volles Potenzial und erschaffe das Leben, von dem du träumst. Mit dem richtigen Mindset sind deinen Möglichkeiten keine Grenzen gesetzt.",
        additionalText: "Das zentrale Thema bei Mindset Coaching sind deine persönlichen Überzeugungen und Glaubenssätze. Wovon du selber überzeugst bist, verwirklichst du in deinem Leben. In einem persönlichen Coaching lernst du deine negativen Glaubenssätze zu erkennen und abzulegen und stattdessen in jedem Lebensbereich bestärkende Glaubenssätze zu entwickeln. Dazu gehört auch ein positives Selbstbild aufzubauen und in den inneren Frieden mit dir, deinen Mitmenschen, deiner Vergangenheit und deiner Geschichte zu kommen.",
        buttonText: "Kennenlerngespräch vereinbaren",
        backgroundImage: "/lovable-uploads/7b4f0db6-80ea-4da6-b817-0f33ba7562b5.png"
      };
    case 'services':
      return {
        title: "Transformiere dein Leben durch Mindset Coaching",
        description: "In einem 1:1 Coaching löst du Blockaden, bringst Klarheit in dein Gedanken-Karussell und richtest deinen Fokus auf das, was wirklich zählt: Deine Träume, Deine Lebenszufriedenheit und Deine innere Ruhe und Gelassenheit.",
        buttonText: "Kontaktiere mich"
      };
    case 'pricing':
      return {
        title: "Investiere in dein Wohlbefinden",
        description: "Mir ist wichtig, dass du dich wohlfühlst – deshalb starten wir mit einem kostenlosen Kennenlerngespräch. In einem kurzen Telefonat können wir erste Fragen klären und gemeinsam sehen, ob die Zusammenarbeit für beide Seiten passt.",
        quote: "Unsere wichtigste Entscheidung ist, ob wir das Universum für einen freundlichen oder feindlichen Ort halten.",
        quoteAuthor: "― Albert Einstein",
        price: "CHF 90",
        pricePeriod: "pro Sitzung",
        packageTitle: "Coaching Einzelsitzung",
        einsteinImage: "/lovable-uploads/8a4be257-655e-4d69-b10e-5db95864ae5a.png"
      };
    case 'about':
      return {
        title: "Martina Domeniconi – zertifizierter Mindset Coach",
        subtitle: "Über mich",
        profileImage: "/lovable-uploads/053f601c-1228-481c-9aca-d078fb3d7d8a.png"
      };
    case 'contact':
      return {
        title: "Beginne deine Mindset-Reise heute",
        subtitle: "Der erste Schritt zu einem erfüllteren Leben beginnt mit einem Gespräch. Kontaktiere mich für ein kostenloses Kennenlerngespräch, in dem wir über deine Ziele sprechen und herausfinden, wie ich dich am besten unterstützen kann.",
        email: "info@mindset-coach-martina.ch",
        phone: "078 840 04 81"
      };
    default:
      return {};
  }
};

const getDefaultImages = (sectionId: string) => {
  switch (sectionId) {
    case 'hero':
    case 'home':
      return {
        'hero-background': '/lovable-uploads/7b4f0db6-80ea-4da6-b817-0f33ba7562b5.png'
      };
    case 'about':
      return {
        'about-profile': '/lovable-uploads/053f601c-1228-481c-9aca-d078fb3d7d8a.png'
      };
    case 'pricing':
      return {
        'pricing-einstein': '/lovable-uploads/8a4be257-655e-4d69-b10e-5db95864ae5a.png'
      };
    default:
      return {};
  }
};

const SectionEditor = ({ section, onClose }: SectionEditorProps) => {
  const [isOpen, setIsOpen] = useState(true);
  
  // Get initial content from localStorage or use defaults
  const getInitialContent = () => {
    try {
      const adminOverrides = localStorage.getItem('adminContentOverrides');
      if (adminOverrides) {
        const overrides = JSON.parse(adminOverrides);
        if (overrides[section.id]) {
          return { ...getDefaultContent(section.id), ...overrides[section.id] };
        }
      }
    } catch (error) {
      console.error('Error parsing admin content overrides:', error);
    }
    
    return getDefaultContent(section.id);
  };

  const getInitialImages = () => {
    try {
      const imageOverrides = localStorage.getItem('adminImageOverrides');
      if (imageOverrides) {
        const overrides = JSON.parse(imageOverrides);
        return { ...getDefaultImages(section.id), ...overrides };
      }
    } catch (error) {
      console.error('Error parsing image overrides:', error);
    }
    
    return getDefaultImages(section.id);
  };

  const [content, setContent] = useState(getInitialContent());
  const [images, setImages] = useState(getInitialImages());
  
  const form = useForm({
    defaultValues: content
  });

  useEffect(() => {
    form.reset(content);
  }, [content, form]);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300);
  };

  const handleSave = () => {
    const values = form.getValues();
    
    // Save content to localStorage using the content bridge system
    if (saveContentOverride(section.id, values)) {
      toast.success(`${section.name} Bereich erfolgreich aktualisiert`);
      handleClose();
    } else {
      toast.error('Fehler beim Speichern des Inhalts');
    }
  };

  const handleImageChange = (imageKey: string, imageUrl: string) => {
    if (saveImageOverride(imageKey, imageUrl)) {
      setImages(prev => ({ ...prev, [imageKey]: imageUrl }));
      toast.success('Bild erfolgreich aktualisiert');
    } else {
      toast.error('Fehler beim Speichern des Bildes');
    }
  };

  const renderEditorFields = () => {
    switch (section.id) {
      case 'hero':
      case 'home':
        return (
          <>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Haupttitel</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="min-h-[60px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Untertitel</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="min-h-[60px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="additionalText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zusätzlicher Text</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="min-h-[100px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buttonText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Button-Text</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ImagePicker
              currentImage={images['hero-background']}
              onImageSelect={(url) => handleImageChange('hero-background', url)}
              label="Hintergrundbild"
              placeholder="URL für das Hero-Hintergrundbild eingeben"
            />
          </>
        );
        
      case 'services':
        return (
          <>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bereich-Titel</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bereich-Beschreibung</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="min-h-[80px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buttonText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Button-Text</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );
        
      case 'pricing':
        return (
          <>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bereich-Titel</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bereich-Beschreibung</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="min-h-[80px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zitat-Text</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="min-h-[80px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quoteAuthor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zitat-Autor</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preis</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pricePeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zeitraum</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="packageTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Paket-Titel</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ImagePicker
              currentImage={images['pricing-einstein']}
              onImageSelect={(url) => handleImageChange('pricing-einstein', url)}
              label="Einstein Bild"
              placeholder="URL für das Einstein-Bild eingeben"
            />
          </>
        );
        
      case 'about':
        return (
          <>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titel</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Untertitel</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ImagePicker
              currentImage={images['about-profile']}
              onImageSelect={(url) => handleImageChange('about-profile', url)}
              label="Profilbild"
              placeholder="URL für das Profilbild eingeben"
            />
          </>
        );
        
      case 'contact':
        return (
          <>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titel</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Untertitel</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="min-h-[80px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-Mail</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefon</FormLabel>
                    <FormControl>
                      <Input {...field} type="tel" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        );
        
      default:
        return <p>Keine bearbeitbaren Felder für diesen Bereich verfügbar.</p>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{section.name} Bereich bearbeiten</DialogTitle>
          <DialogDescription>
            Nehmen Sie Änderungen am Inhalt dieses Bereichs vor. Klicken Sie auf Speichern, wenn Sie fertig sind.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="content" className="mt-4">
          <TabsList>
            <TabsTrigger value="content">Inhalt & Bilder</TabsTrigger>
          </TabsList>
          <TabsContent value="content" className="py-4">
            <Form {...form}>
              <form className="space-y-4">
                {renderEditorFields()}
              </form>
            </Form>
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Abbrechen
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Änderungen speichern
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SectionEditor;
