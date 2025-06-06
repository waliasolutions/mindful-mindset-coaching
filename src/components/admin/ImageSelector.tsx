
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Image, X, Info } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from '@/components/ui/badge';
import MediaLibrary from './MediaLibrary';
import { getImageRequirement } from '@/utils/imageRequirements';

interface ImageSelectorProps {
  value?: string;
  onChange: (imageUrl: string) => void;
  label: string;
  imageType?: string;
}

const ImageSelector = ({ value, onChange, label, imageType }: ImageSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const requirements = getImageRequirement(imageType);

  const handleImageSelect = (imageUrl: string) => {
    onChange(imageUrl);
    setIsOpen(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{label}</label>
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <Info className="h-3 w-3" />
          <span>{requirements.width}×{requirements.height}px optimal</span>
        </div>
      </div>

      {/* Image requirements info */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-3 space-y-2">
        <div className="flex flex-wrap gap-2 text-xs">
          <Badge variant="outline" className="bg-white">
            {requirements.aspectRatio} Format
          </Badge>
          <Badge variant="outline" className="bg-white">
            Max {requirements.maxFileSize}MB
          </Badge>
          <Badge variant="outline" className="bg-white">
            {requirements.formats.join(', ')}
          </Badge>
        </div>
        <p className="text-xs text-gray-600">{requirements.description}</p>
      </div>
      
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
            <DialogTitle>Bild auswählen - {requirements.description}</DialogTitle>
          </DialogHeader>
          <MediaLibrary 
            onSelectImage={handleImageSelect}
            selectedImage={value}
            imageRequirements={requirements}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageSelector;
