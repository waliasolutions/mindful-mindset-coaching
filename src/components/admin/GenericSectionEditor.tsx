
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Save, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { saveUnifiedSectionContent, getUnifiedSectionContent } from '@/utils/unifiedContentStorage';
import { extractSectionContentFlexible } from '@/utils/improvedContentExtractor';
import ImageSelector from './ImageSelector';

interface Section {
  id: string;
  name: string;
  component: string;
  visible: boolean;
  order: number;
}

interface GenericSectionEditorProps {
  section: Section;
  onClose: () => void;
}

interface FieldConfig {
  type: 'text' | 'textarea' | 'image' | 'email' | 'tel' | 'url';
  label: string;
  required?: boolean;
  rows?: number;
  imageType?: string;
}

// Dynamic field configurations based on section type
const getFieldConfigurations = (sectionId: string): Record<string, FieldConfig> => {
  const commonConfigs: Record<string, Record<string, FieldConfig>> = {
    hero: {
      title: { type: 'textarea', label: 'Haupttitel', required: true, rows: 2 },
      subtitle: { type: 'textarea', label: 'Untertitel', rows: 3 },
      additionalText: { type: 'textarea', label: 'Zusätzlicher Text', rows: 4 },
      buttonText: { type: 'text', label: 'Button-Text' },
      backgroundImage: { type: 'image', label: 'Hintergrundbild', imageType: 'hero_background' }
    },
    services: {
      title: { type: 'text', label: 'Bereich-Titel', required: true },
      description: { type: 'textarea', label: 'Bereich-Beschreibung', rows: 3 },
      buttonText: { type: 'text', label: 'Button-Text' }
    },
    pricing: {
      title: { type: 'text', label: 'Bereich-Titel', required: true },
      description: { type: 'textarea', label: 'Bereich-Beschreibung', rows: 3 },
      quote: { type: 'textarea', label: 'Zitat-Text', rows: 3 },
      quoteAuthor: { type: 'text', label: 'Zitat-Autor' },
      quoteImage: { type: 'image', label: 'Zitat-Bild', imageType: 'quote_image' },
      price: { type: 'text', label: 'Preis', required: true },
      pricePeriod: { type: 'text', label: 'Zeitraum' },
      packageTitle: { type: 'text', label: 'Paket-Titel', required: true }
    },
    about: {
      title: { type: 'text', label: 'Titel', required: true },
      subtitle: { type: 'text', label: 'Untertitel' },
      description: { type: 'textarea', label: 'Beschreibung', rows: 4 },
      profileImage: { type: 'image', label: 'Profilbild', imageType: 'profile' }
    },
    contact: {
      title: { type: 'text', label: 'Titel', required: true },
      subtitle: { type: 'textarea', label: 'Untertitel', rows: 3 },
      email: { type: 'email', label: 'E-Mail', required: true },
      phone: { type: 'tel', label: 'Telefon', required: true },
      sectionImage: { type: 'image', label: 'Bereich-Bild', imageType: 'section_image' }
    }
  };

  return commonConfigs[sectionId] || {};
};

const GenericSectionEditor: React.FC<GenericSectionEditorProps> = ({ section, onClose }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // Get field configurations for this section
  const fieldConfigs = getFieldConfigurations(section.id);

  // Get current content (unified + extracted)
  const getCurrentContent = () => {
    // Start with extracted content from DOM
    const extractedContent = extractSectionContentFlexible(section.id);
    // Override with saved unified content
    const savedContent = getUnifiedSectionContent(section.id, {});
    return { ...extractedContent, ...savedContent };
  };

  const form = useForm({
    defaultValues: getCurrentContent()
  });

  useEffect(() => {
    const currentContent = getCurrentContent();
    form.reset(currentContent);
  }, [section.id]);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const values = form.getValues();
      
      if (saveUnifiedSectionContent(section.id, 'section', values)) {
        toast.success(`${section.name} section updated successfully`);
        handleClose();
      } else {
        toast.error('Failed to save content');
      }
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Failed to save content');
    } finally {
      setIsLoading(false);
    }
  };

  const renderField = (fieldName: string, config: FieldConfig) => {
    return (
      <FormField
        key={fieldName}
        control={form.control}
        name={fieldName}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{config.label}</FormLabel>
            <FormControl>
              {config.type === 'image' ? (
                <ImageSelector
                  value={field.value || ''}
                  onChange={field.onChange}
                  label={config.label}
                  imageType={config.imageType}
                />
              ) : config.type === 'textarea' ? (
                <Textarea 
                  {...field} 
                  rows={config.rows || 3}
                  className="min-h-[80px]" 
                />
              ) : (
                <Input 
                  {...field} 
                  type={config.type}
                  required={config.required}
                />
              )}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) handleClose();
    }}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{section?.name || 'Bereich'} bearbeiten</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form className="space-y-4">
            {Object.entries(fieldConfigs).map(([fieldName, config]) =>
              renderField(fieldName, config)
            )}
            
            {Object.keys(fieldConfigs).length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>Keine bearbeitbaren Felder für diesen Bereich verfügbar.</p>
                <p className="text-sm mt-2">
                  Bereich "{section.id}" wird automatisch erkannt, aber noch nicht unterstützt.
                </p>
              </div>
            )}
          </form>
        </Form>
        
        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Abbrechen
          </Button>
          <Button onClick={handleSave} disabled={isLoading || Object.keys(fieldConfigs).length === 0}>
            <Save className="mr-2 h-4 w-4" />
            {isLoading ? 'Speichern...' : 'Änderungen speichern'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GenericSectionEditor;
