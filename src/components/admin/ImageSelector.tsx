
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Image, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MediaLibrary from './MediaLibrary';

interface ImageSelectorProps {
  value?: string;
  onChange: (imageUrl: string) => void;
  label: string;
}

const ImageSelector = ({ value, onChange, label }: ImageSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleImageSelect = (imageUrl: string) => {
    onChange(imageUrl);
    setIsOpen(false);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      
      {value && (
        <div className="relative w-full h-32 border rounded-md overflow-hidden bg-gray-100">
          <img 
            src={value} 
            alt="Selected image" 
            className="w-full h-full object-cover"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6"
            onClick={() => onChange('')}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
      
      <Button
        type="button"
        variant="outline"
        onClick={() => setIsOpen(true)}
        className="w-full"
      >
        <Image className="mr-2 h-4 w-4" />
        {value ? 'Bild ändern' : 'Bild auswählen'}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Bild auswählen</DialogTitle>
          </DialogHeader>
          <MediaLibrary 
            onSelectImage={handleImageSelect}
            selectedImage={value}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageSelector;
