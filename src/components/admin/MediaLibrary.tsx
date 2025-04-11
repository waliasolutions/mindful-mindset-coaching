import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Copy, Trash2, ImagePlus } from 'lucide-react';
import { toast } from 'sonner';

const MediaLibrary = () => {
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // Load saved images from localStorage
    const savedImages = localStorage.getItem('mediaLibrary');
    if (savedImages) {
      try {
        const parsedImages = JSON.parse(savedImages);
        setImages(Array.isArray(parsedImages) ? parsedImages : []);
        console.log('Loaded images from storage:', parsedImages.length);
      } catch (error) {
        console.error('Error parsing media library data:', error);
        // Initialize with empty array if parsing fails
        localStorage.setItem('mediaLibrary', JSON.stringify([]));
      }
    } else {
      // Initialize media library in localStorage if it doesn't exist
      localStorage.setItem('mediaLibrary', JSON.stringify([]));
      console.log('Initialized empty media library');
    }
  }, []);

  // Helper function to dispatch storage event for same-tab updates
  const dispatchStorageEvent = (key: string) => {
    window.dispatchEvent(new CustomEvent('localStorageUpdated', { 
      detail: { key, newValue: JSON.stringify(images) }
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // In a real implementation, this would upload to a server or cloud storage
    // For this demo, we'll use base64 encoding to simulate storage
    setIsUploading(true);
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      const newImages = [...images, result];
      setImages(newImages);
      localStorage.setItem('mediaLibrary', JSON.stringify(newImages));
      
      // Dispatch event for same-tab updates
      dispatchStorageEvent('mediaLibrary');
      
      setIsUploading(false);
      toast.success('Image uploaded successfully');
    };
    
    reader.onerror = () => {
      toast.error('Failed to upload image');
      setIsUploading(false);
    };
    
    reader.readAsDataURL(file);
  };

  const handleDelete = (imageToDelete: string) => {
    const newImages = images.filter(image => image !== imageToDelete);
    setImages(newImages);
    localStorage.setItem('mediaLibrary', JSON.stringify(newImages));
    
    // Dispatch event for same-tab updates
    dispatchStorageEvent('mediaLibrary');
    
    if (selectedImage === imageToDelete) {
      setSelectedImage(null);
    }
    
    toast.success('Image deleted');
  };

  const copyImagePath = (image: string) => {
    // In a real app, this would be a URL to the image
    // For this demo, we'll just copy the base64 string
    navigator.clipboard.writeText(image);
    toast.success('Image path copied to clipboard');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Media Library</CardTitle>
        <CardDescription>
          Upload and manage images for your website
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Label htmlFor="image-upload" className="cursor-pointer">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors">
              <Upload className="h-12 w-12 mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-500">
                Drag and drop an image, or click to browse
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Supported formats: JPG, PNG, GIF, WebP
              </p>
              <Button 
                variant="default" 
                className="mt-4"
                disabled={isUploading}
              >
                <ImagePlus className="mr-2 h-4 w-4" />
                {isUploading ? 'Uploading...' : 'Upload Image'}
              </Button>
            </div>
            <Input 
              id="image-upload" 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              className="hidden" 
            />
          </Label>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div 
              key={index} 
              className={`relative group overflow-hidden rounded-md border aspect-square bg-gray-100 ${
                selectedImage === image ? 'ring-2 ring-forest ring-offset-2' : ''
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <img 
                src={image} 
                alt={`Uploaded image ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center p-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    copyImagePath(image);
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 h-8 w-8 mt-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(image);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          {images.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
              <p>No images uploaded yet</p>
            </div>
          )}
        </div>

        {selectedImage && (
          <div className="mt-6 p-4 border rounded-md">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium">Selected Image</h3>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <img 
                  src={selectedImage} 
                  alt="Selected image"
                  className="w-full max-h-48 object-contain border rounded-md"
                />
              </div>
              <div>
                <Label htmlFor="image-path">Image Path</Label>
                <div className="flex mt-1">
                  <Input 
                    id="image-path" 
                    value={selectedImage}
                    readOnly
                    className="rounded-r-none"
                  />
                  <Button 
                    variant="default"
                    className="rounded-l-none"
                    onClick={() => copyImagePath(selectedImage)}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Use this path to reference this image in your content
                </p>
                <Button 
                  variant="destructive" 
                  className="mt-4 w-full"
                  onClick={() => handleDelete(selectedImage)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Image
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MediaLibrary;
