
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Copy, Trash2, ImagePlus, Check } from 'lucide-react';
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
}

interface MediaLibraryProps {
  onSelectImage?: (imageUrl: string) => void;
  selectedImage?: string | null;
}

const MediaLibrary = ({ onSelectImage, selectedImage }: MediaLibraryProps) => {
  const [images, setImages] = useState<MediaItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadImages();
    
    // Set up realtime subscription for media_library changes
    const channel = supabase
      .channel('media-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'media_library'
        },
        (payload) => {
          console.log('Media library change:', payload);
          loadImages(); // Reload images when changes occur
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
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

      // Also load from storage to catch any images not in the database
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

      setImages(combinedImages);
      console.log('Loaded images:', combinedImages.length);
    } catch (error) {
      console.error('Error loading media library:', error);
      toast.error('Failed to load images');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
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

      toast.success('Image uploaded successfully');
      
      // Clear the input
      e.target.value = '';
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (imageToDelete: MediaItem) => {
    try {
      // Delete from database
      const { error: dbError } = await supabase
        .from('media_library')
        .delete()
        .eq('id', imageToDelete.id);

      if (dbError) {
        console.error('Database delete error:', dbError);
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

      toast.success('Image deleted');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete image');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-forest mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500">Loading media library...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
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
            {isUploading ? 'Uploading...' : 'Click to upload an image'}
          </span>
        </Label>
      </div>

      {images.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <ImagePlus className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>No images uploaded yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((image) => (
            <div 
              key={image.id} 
              className={`relative group overflow-hidden rounded-md border cursor-pointer ${
                selectedImage === image.image_url ? 'ring-2 ring-forest ring-offset-2' : ''
              }`}
              onClick={() => onSelectImage && onSelectImage(image.image_url)}
            >
              <div className="aspect-square bg-gray-100">
                <img 
                  src={image.image_url} 
                  alt={image.alt_text || `Image ${image.id}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Image failed to load:', image.image_url);
                    e.currentTarget.src = '/placeholder.svg';
                  }}
                />
              </div>
              {onSelectImage && selectedImage === image.image_url && (
                <div className="absolute top-2 right-2 bg-forest text-white rounded-full p-1">
                  <Check className="h-4 w-4" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(image.image_url);
                    toast.success('Image URL copied');
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
        </div>
      )}
    </div>
  );
};

export default MediaLibrary;
