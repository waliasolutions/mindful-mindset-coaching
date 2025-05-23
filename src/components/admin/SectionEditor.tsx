
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
import { getContentFromStorage, saveContentToStorage, extractContentFromDOM } from '@/utils/contentSync';

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
      return {
        title: "Mindset Coaching für ein glückliches und erfülltes Leben",
        subtitle: "Entfalte dein volles Potenzial und erschaffe das Leben, von dem du träumst.",
        backgroundImage: "/lovable-uploads/7b4f0db6-80ea-4da6-b817-0f33ba7562b5.png",
        buttonText: "Kennenlerngespräch vereinbaren"
      };
    case 'services':
      return {
        title: "Transformiere dein Leben durch Mindset Coaching",
        description: "In einem 1:1 Coaching lösen wir Blockaden, bringen Klarheit in dein Gedanken-Karussell und richten deinen Fokus auf das, was wirklich zählt.",
        benefits: [
          { title: "Persönliches Wachstum", icon: "Brain", description: "Du möchtest ein erfülltes und selbstbestimmtes Leben führen" },
          { title: "Potenzialentfaltung", icon: "Star", description: "Du willst endlich deine Ziele erreichen und dein volles Potenzial entfalten" },
          { title: "Selbstbewusstsein", icon: "Heart", description: "Du möchtest mehr Selbstbewusstsein und Vertrauen aufbauen" }
        ]
      };
    case 'pricing':
      return {
        title: "Investiere in dein Wohlbefinden",
        description: "Vor jedem Coaching machen wir zuerst ein kostenloses Kennenlerngespraech online oder per Telefon.",
        quote: "Unsere wichtigste Entscheidung ist, ob wir das Universum für einen freundlichen oder feindlichen Ort halten.",
        quoteAuthor: "― Albert Einstein",
        price: "CHF 90",
        pricePeriod: "pro Sitzung",
        packageTitle: "Coaching Einzelsitzung",
        features: [
          "Individuelle Betreuung auf deine Bedürfnisse zugeschnitten",
          "Praktische Übungen und Techniken für den Alltag"
        ]
      };
    case 'about':
      return {
        title: "Über mich",
        subtitle: "Ein neuer Blickwinkel für deine Herausforderungen",
        description: "Als Mindset Coach begleite ich dich dabei, hinderliche Denkmuster zu erkennen und in kraftvolle, positive Gedanken umzuwandeln."
      };
    case 'contact':
      return {
        title: "Kontakt",
        subtitle: "Lass uns gemeinsam an deinem Mindset arbeiten",
        email: "info@mindset-coach-martina.ch",
        phone: "+41 78 840 04 81"
      };
    default:
      return {};
  }
};

const SectionEditor = ({ section, onClose }: SectionEditorProps) => {
  const [isOpen, setIsOpen] = useState(true);
  
  // Try to get content from storage first, then extract from DOM, then use defaults
  const getInitialContent = () => {
    let content = getContentFromStorage(section.id);
    
    if (!content || Object.keys(content).length === 0) {
      // Try to extract from current DOM
      const extractedContent = extractContentFromDOM(section.id);
      if (extractedContent && Object.keys(extractedContent).length > 0) {
        content = extractedContent;
        // Save the extracted content for future use
        saveContentToStorage(section.id, content);
      } else {
        // Fall back to defaults
        content = getDefaultContent(section.id);
      }
    }
    
    return content;
  };

  const [content, setContent] = useState(getInitialContent());
  
  const form = useForm({
    defaultValues: content
  });

  useEffect(() => {
    form.reset(content);
  }, [content, form]);

  useEffect(() => {
    // Listen for content updates from other parts of the app
    const handleContentUpdate = (event: CustomEvent) => {
      if (event.detail.sectionId === section.id) {
        setContent(event.detail.content);
        form.reset(event.detail.content);
      }
    };

    window.addEventListener('contentUpdated', handleContentUpdate as EventListener);
    return () => {
      window.removeEventListener('contentUpdated', handleContentUpdate as EventListener);
    };
  }, [section.id, form]);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300);
  };

  const handleSave = () => {
    const values = form.getValues();
    
    // Update the content state
    setContent(values);
    
    // Save to localStorage and trigger update event
    if (saveContentToStorage(section.id, values)) {
      toast.success(`${section.name} section updated successfully`);
      handleClose();
    } else {
      toast.error('Failed to save content');
    }
  };

  const renderEditorFields = () => {
    switch (section.id) {
      case 'hero':
        return (
          <>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
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
                  <FormLabel>Subtitle</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="min-h-[60px]" />
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
                  <FormLabel>Button Text</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
                  <FormLabel>Section Title</FormLabel>
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
                  <FormLabel>Section Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="min-h-[80px]" />
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
                  <FormLabel>Section Title</FormLabel>
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
                  <FormLabel>Section Description</FormLabel>
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
                  <FormLabel>Quote Text</FormLabel>
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
                  <FormLabel>Quote Author</FormLabel>
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
                    <FormLabel>Price</FormLabel>
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
                    <FormLabel>Period</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                  <FormLabel>Title</FormLabel>
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
                  <FormLabel>Subtitle</FormLabel>
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="min-h-[100px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
                  <FormLabel>Title</FormLabel>
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
                  <FormLabel>Subtitle</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <FormLabel>Email</FormLabel>
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
                    <FormLabel>Phone</FormLabel>
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
        return <p>No editable fields available for this section.</p>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit {section.name} Section</DialogTitle>
          <DialogDescription>
            Make changes to the content of this section. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="content" className="mt-4">
          <TabsList>
            <TabsTrigger value="content">Content</TabsTrigger>
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
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SectionEditor;
