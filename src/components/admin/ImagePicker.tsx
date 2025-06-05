
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Image, Upload, X } from 'lucide-react';
import MediaLibrary from './MediaLibrary';

interface ImagePickerProps {
  currentImage?: string;
  onImageSelect: (imageUrl: string) => void;
  label?: string;
  placeholder?: string;
}

const ImagePicker = ({ 
  currentImage, 
  onImageSelect, 
  label = "Bild auswählen",
  placeholder = "Bild-URL eingeben oder aus Medienbibliothek auswählen"
}: ImagePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [manualUrl, setManualUrl] = useState(currentImage || '');

  const handleImageSelect = (imageUrl: string) => {
    onImageSelect(imageUrl);
    setManualUrl(imageUrl);
    setIsOpen(false);
  };

  const handleManualUrlSubmit = () => {
    onImageSelect(manualUrl);
  };

  const handleRemoveImage = () => {
    onImageSelect('');
    setManualUrl('');
  };

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      
      {currentImage && (
        <div className="relative w-32 h-32 border rounded-md overflow-hidden">
          <img 
            src={currentImage} 
            alt="Aktuelles Bild" 
            className="w-full h-full object-cover"
          />
          <Button
            variant="destructive"
            size="icon"
            className="absolute top-1 right-1 h-6 w-6"
            onClick={handleRemoveImage}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}
      
      <div className="flex gap-2">
        <Input
          value={manualUrl}
          onChange={(e) => setManualUrl(e.target.value)}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button onClick={handleManualUrlSubmit} size="sm">
          Übernehmen
        </Button>
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="w-full">
            <Image className="mr-2 h-4 w-4" />
            Aus Medienbibliothek auswählen
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Bild aus Medienbibliothek auswählen</DialogTitle>
          </DialogHeader>
          <MediaLibrary 
            onSelectImage={handleImageSelect}
            selectedImage={currentImage}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImagePicker;
