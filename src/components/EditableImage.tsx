
import { useState, useEffect } from 'react';
import { useEditMode } from '@/contexts/EditModeContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ImagePlus, Edit } from 'lucide-react';
import MediaLibrary from '@/components/admin/MediaLibrary';
import OptimizedImage from '@/components/OptimizedImage';

interface EditableImageProps {
  pageId: string;
  contentKey: string;
  defaultSrc: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}

const EditableImage = ({ 
  pageId, 
  contentKey, 
  defaultSrc, 
  alt, 
  className = '',
  width,
  height
}: EditableImageProps) => {
  const { isEditMode, isAdmin, saveContent, getContent } = useEditMode();
  const [imageSrc, setImageSrc] = useState(defaultSrc);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);

  // Load content from database on mount
  useEffect(() => {
    const loadContent = async () => {
      const savedContent = await getContent(pageId, contentKey);
      if (savedContent?.url) {
        setImageSrc(savedContent.url);
      }
    };
    loadContent();
  }, [pageId, contentKey, getContent]);

  const handleImageSelect = async (imageUrl: string) => {
    await saveContent(pageId, contentKey, { url: imageUrl, alt }, 'image');
    setImageSrc(imageUrl);
    setShowMediaLibrary(false);
  };

  const handleEdit = () => {
    if (!isEditMode || !isAdmin) return;
    setShowMediaLibrary(true);
  };

  if (!isEditMode || !isAdmin) {
    return (
      <OptimizedImage
        src={imageSrc || defaultSrc}
        alt={alt}
        className={className}
        width={width}
        height={height}
      />
    );
  }

  return (
    <>
      <div 
        className="relative group cursor-pointer"
        onClick={handleEdit}
      >
        <OptimizedImage
          src={imageSrc || defaultSrc}
          alt={alt}
          className={`${className} border-2 border-dashed border-transparent hover:border-blue-300 transition-all duration-200`}
          width={width}
          height={height}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="secondary"
              className="text-white bg-blue-600 hover:bg-blue-700"
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Change Image
            </Button>
          </div>
        </div>
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="ghost"
            className="h-6 w-6 p-0 text-blue-600 bg-white shadow-md"
          >
            <Edit className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <Dialog open={showMediaLibrary} onOpenChange={setShowMediaLibrary}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Select Image</DialogTitle>
          </DialogHeader>
          <MediaLibrary 
            onSelectImage={handleImageSelect}
            selectedImage={imageSrc}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditableImage;
