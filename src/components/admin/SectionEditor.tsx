import { useState, useEffect, useCallback, useMemo } from 'react';
import { X, Save, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import ImageSelector from './ImageSelector';
import BenefitsEditor from './BenefitsEditor';
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
import { saveContentOverride } from '@/hooks/useContentBridge';
import { extractCurrentContent } from '@/utils/contentExtractor';

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

const SectionEditor = ({ section, onClose }: SectionEditorProps) => {
  const [isOpen, setIsOpen] = useState(true);
  
  // Memoize initial content to prevent unnecessary recalculations
  const initialContent = useMemo(() => {
    if (!section || !section.id) {
      return {};
    }
    return extractCurrentContent(section.id);
  }, [section?.id]);

  const form = useForm({
    defaultValues: initialContent
  });

  // Get benefits specifically for the benefits editor to prevent unnecessary re-renders
  const benefitsValue = form.watch('benefits');

  useEffect(() => {
    if (section && section.id) {
      const currentContent = extractCurrentContent(section.id);
      form.reset(currentContent);
    }
  }, [section?.id, form]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    onClose();
  }, [onClose]);

  const handleSave = useCallback(() => {
    const values = form.getValues();
    
    if (!section || !section.id) {
      toast.error('No section selected');
      return;
    }
    
    // Save to localStorage using the content bridge system
    if (saveContentOverride(section.id, values)) {
      toast.success(`${section.name} section updated successfully`);
      handleClose();
    } else {
      toast.error('Failed to save content');
    }
  }, [section, form, handleClose]);

  // Stable benefits change handler with useCallback and dependencies
  const handleBenefitsChange = useCallback((benefits: any[]) => {
    form.setValue('benefits', benefits, { shouldValidate: false, shouldDirty: true });
  }, [form]);

  // If no section provided, don't render anything
  if (!section) {
    return null;
  }

  const renderEditorFields = () => {
    switch (section.id) {
      case 'hero':
      case 'home':
        return (
          <>
            <FormField
              control={form.control}
              name="backgroundImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hintergrundbild</FormLabel>
                  <FormControl>
                    <ImageSelector
                      value={field.value}
                      onChange={field.onChange}
                      label="Hero Hintergrundbild"
                      imageType="hero_background"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <div className="mt-6">
              <BenefitsEditor
                benefits={benefitsValue || []}
                onChange={handleBenefitsChange}
              />
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
              name="quoteImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zitat-Bild</FormLabel>
                  <FormControl>
                    <ImageSelector
                      value={field.value}
                      onChange={field.onChange}
                      label="Einstein Zitat Bild"
                      imageType="quote_image"
                    />
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
          </>
        );
        
      case 'about':
        return (
          <>
            <FormField
              control={form.control}
              name="profileImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profilbild</FormLabel>
                  <FormControl>
                    <ImageSelector
                      value={field.value}
                      onChange={field.onChange}
                      label="Über uns Profilbild"
                      imageType="profile"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
          </>
        );
        
      case 'contact':
        return (
          <>
            <FormField
              control={form.control}
              name="sectionImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bereich-Bild</FormLabel>
                  <FormControl>
                    <ImageSelector
                      value={field.value}
                      onChange={field.onChange}
                      label="Kontakt Bereich Bild"
                      imageType="section_image"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) handleClose();
    }}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{section?.name || 'Bereich'} bearbeiten</DialogTitle>
          <DialogDescription>
            Nehmen Sie Änderungen am Inhalt dieses Bereichs vor. Klicken Sie auf Speichern, wenn Sie fertig sind.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="content" className="mt-4">
          <TabsList>
            <TabsTrigger value="content">Inhalt</TabsTrigger>
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
