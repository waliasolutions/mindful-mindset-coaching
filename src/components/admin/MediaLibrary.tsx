
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Copy, Trash2, ImagePlus, Check } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

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
  const { user } = useAuth();
  const [images, setImages] = useState<MediaItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const { data, error } = await supabase
        .from('media_library')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setImages(data || []);
    } catch (error) {
      console.error('Error loading media library:', error);
      toast.error('Failed to load images');
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
      const fileName = `${Math.random()}.${fileExt}`;
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
          user_id: user?.id,
          image_url: publicUrl,
          file_name: file.name,
          file_size: file.size,
          file_type: file.type
        });

      if (dbError) throw dbError;

      await loadImages();
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (imageToDelete: MediaItem) => {
    try {
      const { error } = await supabase
        .from('media_library')
        .delete()
        .eq('id', imageToDelete.id);

      if (error) throw error;

      // Also try to delete from storage if it exists there
      const fileName = imageToDelete.image_url.split('/').pop();
      if (fileName) {
        await supabase.storage
          .from('media')
          .remove([fileName]);
      }

      setImages(images.filter(image => image.id !== imageToDelete.id));
      toast.success('Image deleted');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete image');
    }
  };

  return (
    <div>
      <div className="mb-4">
        <Input 
          id="image-upload" 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          className="hidden" 
        />
        <Label 
          htmlFor="image-upload" 
          className="cursor-pointer block w-full p-4 border-2 border-dashed rounded-lg text-center hover:border-primary/50 transition-colors"
        >
          <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
          <span className="text-sm text-gray-500">
            {isUploading ? 'Uploading...' : 'Click to upload an image'}
          </span>
        </Label>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((image) => (
          <div 
            key={image.id} 
            className={`relative group overflow-hidden rounded-md border ${
              selectedImage === image.image_url ? 'ring-2 ring-forest ring-offset-2' : ''
            }`}
            onClick={() => onSelectImage && onSelectImage(image.image_url)}
          >
            <div className="aspect-square bg-gray-100">
              <img 
                src={image.image_url} 
                alt={image.alt_text || `Image ${image.id}`}
                className="w-full h-full object-cover"
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
    </div>
  );
};

export default MediaLibrary;
