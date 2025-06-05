import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Copy, Trash2, ImagePlus, Check, Globe } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';

interface MediaItem {
  id: string;
  image_url: string;
  file_name?: string;
  file_size?: number;
  file_type?: string;
  alt_text?: string;
  created_at: string;
  is_website_image?: boolean;
  usage_description?: string;
}

interface MediaLibraryProps {
  onSelectImage?: (imageUrl: string) => void;
  selectedImage?: string | null;
}

// Complete list of website images that are currently in use
const websiteImages = [
  {
    url: '/lovable-uploads/7b4f0db6-80ea-4da6-b817-0f33ba7562b5.png',
    usage: 'Hero Background Image',
    fileName: 'hero-background.png'
  },
  {
    url: '/lovable-uploads/053f601c-1228-481c-9aca-d078fb3d7d8a.png',
    usage: 'About Profile Image',
    fileName: 'martina-profile.png'
  },
  {
    url: '/lovable-uploads/0bacd932-81ec-4c1b-b330-546f5a1116dd.png',
    usage: 'Partner Logo (Footer)',
    fileName: 'organize-my-space-logo.png'
  },
  {
    url: '/lovable-uploads/abb0bc70-ae8b-43ce-867f-d7beece5a8a2.png',
    usage: 'Website Favicon',
    fileName: 'favicon.png'
  },
  {
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    usage: 'Einstein Quote Image (Pricing)',
    fileName: 'einstein-quote.jpg'
  },
  {
    url: '/lovable-uploads/8a4be257-655e-4d69-b10e-5db95864ae5a.png',
    usage: 'Contact Section Image',
    fileName: 'contact-image.png'
  }
];

const MediaLibrary = ({ onSelectImage, selectedImage }: MediaLibraryProps) => {
  const [images, setImages] = useState<MediaItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      setIsLoading(true);
      
      // Load from media_library table
      const { data: dbImages, error: dbError } = await supabase
        .from('media_library')
        .select('*')
        .order('created_at', { ascending: false });

      if (dbError) {
        console.error('Error loading from media_library:', dbError);
      }

      // Also check for storage files to catch any images not in the database
      const { data: storageFiles, error: storageError } = await supabase.storage
        .from('media')
        .list('', { limit: 100 });

      if (storageError) {
        console.error('Error loading from storage:', storageError);
      }

      // Combine results, prioritizing database entries
      const combinedImages: MediaItem[] = [];
      const dbImageUrls = new Set((dbImages || []).map(img => img.image_url));

      // Add database images first
      if (dbImages) {
        combinedImages.push(...dbImages);
      }

      // Add storage files that aren't in the database
      if (storageFiles) {
        for (const file of storageFiles) {
          const { data: { publicUrl } } = supabase.storage
            .from('media')
            .getPublicUrl(file.name);
          
          if (!dbImageUrls.has(publicUrl)) {
            combinedImages.push({
              id: file.id || file.name,
              image_url: publicUrl,
              file_name: file.name,
              file_size: file.metadata?.size,
              file_type: file.metadata?.mimetype,
              created_at: file.created_at || new Date().toISOString()
            });
          }
        }
      }

      // Add website images to the list
      const websiteImageItems: MediaItem[] = websiteImages.map((img, index) => ({
        id: `website-${index}`,
        image_url: img.url,
        file_name: img.fileName,
        created_at: new Date().toISOString(),
        is_website_image: true,
        usage_description: img.usage
      }));

      // Combine all images
      const allImages = [...websiteImageItems, ...combinedImages];
      setImages(allImages);
    } catch (error) {
      console.error('Error loading media library:', error);
      toast.error('Bilder konnten nicht geladen werden');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
      toast.error('Bitte wählen Sie eine Bilddatei');
      return;
    }

    setIsUploading(true);
    
    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('media')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(fileName);

      // Save to media_library table
      const { error: dbError } = await supabase
        .from('media_library')
        .insert({
          image_url: publicUrl,
          file_name: file.name,
          file_size: file.size,
          file_type: file.type
        });

      if (dbError) {
        console.error('Database error:', dbError);
        // Continue anyway as the file was uploaded successfully
      }

      toast.success('Bild erfolgreich hochgeladen');
      loadImages(); // Reload the images
      
      // Clear the input
      e.target.value = '';
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Bild konnte nicht hochgeladen werden');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (imageToDelete: MediaItem) => {
    if (imageToDelete.is_website_image) {
      toast.error('Website-Bilder können nicht gelöscht werden');
      return;
    }

    try {
      // Delete from database if it exists there
      if (imageToDelete.id) {
        const { error: dbError } = await supabase
          .from('media_library')
          .delete()
          .eq('id', imageToDelete.id);

        if (dbError) {
          console.error('Database delete error:', dbError);
        }
      }

      // Try to delete from storage
      const fileName = imageToDelete.image_url.split('/').pop();
      if (fileName) {
        const { error: storageError } = await supabase.storage
          .from('media')
          .remove([fileName]);
        
        if (storageError) {
          console.error('Storage delete error:', storageError);
        }
      }

      toast.success('Bild gelöscht');
      loadImages(); // Reload the images
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Bild konnte nicht gelöscht werden');
    }
  };

  const renderImageGrid = (imagesList: MediaItem[], title: string, showUpload: boolean = false) => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      
      {showUpload && (
        <div className="mb-4">
          <Input 
            id="image-upload" 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            className="hidden" 
            disabled={isUploading}
          />
          <Label 
            htmlFor="image-upload" 
            className={`cursor-pointer block w-full p-4 border-2 border-dashed rounded-lg text-center hover:border-primary/50 transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
            <span className="text-sm text-gray-500">
              {isUploading ? 'Wird hochgeladen...' : 'Klicken Sie hier, um ein Bild hochzuladen'}
            </span>
          </Label>
        </div>
      )}

      {imagesList.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <ImagePlus className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>Keine Bilder verfügbar</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {imagesList.map((image) => (
            <div 
              key={image.id} 
              className={`relative group overflow-hidden rounded-md border cursor-pointer transition-all hover:shadow-lg ${
                selectedImage === image.image_url ? 'ring-2 ring-forest ring-offset-2' : ''
              }`}
              onClick={() => onSelectImage && onSelectImage(image.image_url)}
            >
              <div className="aspect-square bg-gray-100">
                <img 
                  src={image.image_url} 
                  alt={image.usage_description || image.alt_text || `Bild ${image.id}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Image failed to load:', image.image_url);
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
              </div>
              
              {image.is_website_image && (
                <div className="absolute top-2 left-2">
                  <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                    <Globe className="h-3 w-3 mr-1" />
                    Website
                  </Badge>
                </div>
              )}
              
              {onSelectImage && selectedImage === image.image_url && (
                <div className="absolute top-2 right-2 bg-forest text-white rounded-full p-1">
                  <Check className="h-4 w-4" />
                </div>
              )}
              
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-2">
                <p className="text-xs truncate">
                  {image.usage_description || image.file_name || 'Unbenannt'}
                </p>
              </div>
              
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(image.image_url);
                    toast.success('Bild-URL kopiert');
                  }}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                {!image.is_website_image && (
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
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500">Medienbibliothek wird geladen...</p>
        </div>
      </div>
    );
  }

  const websiteImagesList = images.filter(img => img.is_website_image);
  const uploadedImagesList = images.filter(img => !img.is_website_image);

  return (
    <div>
      {renderImageGrid(websiteImagesList, "Website-Bilder", false)}
      {renderImageGrid(uploadedImagesList, "Hochgeladene Bilder", true)}
    </div>
  );
};

export default MediaLibrary;
