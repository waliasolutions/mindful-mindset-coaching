
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

// Mock section content that would typically come from a database
const getSectionContent = (sectionId: string) => {
  const savedContent = localStorage.getItem(`section_${sectionId}`);
  if (savedContent) return JSON.parse(savedContent);
  
  // Default content by section type
  switch (sectionId) {
    case 'hero':
      return {
        title: "Reframe Your Thinking, Transform Your Life",
        subtitle: "Mindset Coaching für mehr Lebenszufriedenheit",
        backgroundImage: "/lovable-uploads/bfcdd5e2-5796-4cc9-b81c-3651711c0440.png",
        buttonText: "Mehr Erfahren"
      };
    case 'services':
      return {
        title: "Transformiere dein Leben durch Mindset Coaching",
        description: "In einem 1:1 Coaching lösen wir Blockaden, bringen Klarheit in dein Gedanken-Karussell und richten deinen Fokus auf das, was wirklich zählt: Deine Träume, Deine Lebenszufriedenheit und Deine innere Ruhe und Gelassenheit.",
        benefits: [
          { title: "Persönliches Wachstum", icon: "Brain", description: "Du möchtest ein erfülltes und selbstbestimmtes Leben führen" },
          { title: "Potenzialentfaltung", icon: "Star", description: "Du willst endlich deine Ziele erreichen und dein volles Potenzial entfalten" },
          { title: "Selbstbewusstsein", icon: "Heart", description: "Du möchtest mehr Selbstbewusstsein und Vertrauen aufbauen" },
          { title: "Klarheit & Gelassenheit", icon: "Lightbulb", description: "Du sehnst dich nach mehr Klarheit, Gelassenheit und Lebensfreude" },
          { title: "Beziehungen", icon: "Heart", description: "Du willst eine liebevolle Beziehung führen" },
          { title: "Gesunde Routinen", icon: "Sun", description: "Du möchtest gesunde Routinen und Gewohnheiten entwickeln" }
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
        packageDescription: "Individuelle Betreuung für deine Bedürfnisse",
        features: [
          "Individuelle Betreuung auf deine Bedürfnisse zugeschnitten",
          "Praktische Übungen und Techniken für den Alltag",
          "Fokus auf deine persönlichen Ziele und Herausforderungen",
          "Flexible Terminvereinbarung"
        ]
      };
    case 'about':
      return {
        title: "Über mich",
        subtitle: "Ein neuer Blickwinkel für deine Herausforderungen",
        description: "Als Mindset Coach begleite ich dich dabei, hinderliche Denkmuster zu erkennen und in kraftvolle, positive Gedanken umzuwandeln.",
        backgroundStory: "Mein eigener Weg hat mich durch viele Höhen und Tiefen geführt. Diese Erfahrungen haben mich gelehrt, wie wichtig unsere Gedanken für unser Wohlbefinden sind."
      };
    case 'contact':
      return {
        title: "Kontakt",
        subtitle: "Lass uns gemeinsam an deinem Mindset arbeiten",
        description: "Ich freue mich darauf, von dir zu hören und gemeinsam den ersten Schritt zu gehen.",
        email: "kontakt@example.com",
        phone: "+41 123 456 789",
        address: "Ruedi-Walter-strasse 4, 8050 Zürich"
      };
    default:
      return {};
  }
};

const SectionEditor = ({ section, onClose }: SectionEditorProps) => {
  const [content, setContent] = useState(getSectionContent(section.id));
  const [isOpen, setIsOpen] = useState(true);
  
  const form = useForm({
    defaultValues: content
  });

  useEffect(() => {
    form.reset(content);
  }, [content, form]);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300); // Allow animation to complete
  };

  const handleSave = () => {
    const values = form.getValues();
    localStorage.setItem(`section_${section.id}`, JSON.stringify(values));
    toast.success(`${section.name} section updated successfully`);
    handleClose();
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
              name="backgroundImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background Image</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Textarea {...field} className="min-h-[100px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="border rounded-md p-4 mt-4">
              <h4 className="font-medium mb-3">Service Benefits</h4>
              {content.benefits && content.benefits.map((benefit: any, index: number) => (
                <div key={index} className="mb-4 p-3 border rounded-md">
                  <div className="grid grid-cols-2 gap-3 mb-2">
                    <div>
                      <Label htmlFor={`benefit-title-${index}`}>Title</Label>
                      <Input
                        id={`benefit-title-${index}`}
                        value={benefit.title}
                        onChange={(e) => {
                          const newBenefits = [...content.benefits];
                          newBenefits[index].title = e.target.value;
                          setContent({...content, benefits: newBenefits});
                        }}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`benefit-icon-${index}`}>Icon</Label>
                      <Input
                        id={`benefit-icon-${index}`}
                        value={benefit.icon}
                        onChange={(e) => {
                          const newBenefits = [...content.benefits];
                          newBenefits[index].icon = e.target.value;
                          setContent({...content, benefits: newBenefits});
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor={`benefit-desc-${index}`}>Description</Label>
                    <Input
                      id={`benefit-desc-${index}`}
                      value={benefit.description}
                      onChange={(e) => {
                        const newBenefits = [...content.benefits];
                        newBenefits[index].description = e.target.value;
                        setContent({...content, benefits: newBenefits});
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
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
            
            <div className="border rounded-md p-4 mt-4 mb-4">
              <h4 className="font-medium mb-3">Quote</h4>
              <div className="space-y-3">
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
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="border rounded-md p-4 mt-4">
              <h4 className="font-medium mb-3">Pricing Package</h4>
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="packageTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Package Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="packageDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Package Description</FormLabel>
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
              </div>
            </div>
            
            <div className="border rounded-md p-4 mt-4">
              <h4 className="font-medium mb-3">Features</h4>
              {content.features && content.features.map((feature: string, index: number) => (
                <div key={index} className="mb-2">
                  <Input
                    value={feature}
                    onChange={(e) => {
                      const newFeatures = [...content.features];
                      newFeatures[index] = e.target.value;
                      setContent({...content, features: newFeatures});
                    }}
                  />
                </div>
              ))}
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
            <FormField
              control={form.control}
              name="backgroundStory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background Story</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="min-h-[150px]" />
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <TabsTrigger value="styling">Styling</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          <TabsContent value="content" className="py-4">
            <Form {...form}>
              <form className="space-y-4">
                {renderEditorFields()}
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="styling" className="py-4">
            <div className="flex flex-col space-y-4">
              <p className="text-gray-500">
                The styling options allow you to customize colors, spacing, and other visual aspects of the section.
              </p>
              <div className="border p-4 rounded-md bg-gray-50 text-center">
                Styling options coming soon...
              </div>
            </div>
          </TabsContent>
          <TabsContent value="advanced" className="py-4">
            <div className="flex flex-col space-y-4">
              <p className="text-gray-500">
                Advanced settings give you more control over the behavior and rendering of this section.
              </p>
              <div className="border p-4 rounded-md bg-gray-50 text-center">
                Advanced options coming soon...
              </div>
            </div>
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
