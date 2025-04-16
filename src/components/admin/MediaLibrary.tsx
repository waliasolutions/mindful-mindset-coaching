import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Copy, Trash2, ImagePlus, AlertCircle } from 'lucide-react';
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

interface ImageUsage {
  inHero?: boolean;
  inServices?: boolean;
  inAbout?: boolean;
  inMeta?: boolean;
  count: number;
}

const MediaLibrary = () => {
  const { user } = useAuth();
  const [images, setImages] = useState<MediaItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<MediaItem | null>(null);
  const [imageUsage, setImageUsage] = useState<Record<string, ImageUsage>>({});

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
      console.log('Loaded images from Supabase:', data?.length);
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
      if (selectedImage?.id === imageToDelete.id) {
        setSelectedImage(null);
      }
      
      toast.success('Image deleted');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete image');
    }
  };

  const copyImagePath = (image: string) => {
    navigator.clipboard.writeText(image);
    toast.success('Image path copied to clipboard');
  };

  const scanForImageUsage = () => {
    const usage: Record<string, ImageUsage> = {};
    
    images.forEach(img => {
      usage[img.image_url] = { count: 0 };
    });

    const previewFrame = document.getElementById('preview-frame') as HTMLIFrameElement;
    if (previewFrame && previewFrame.contentDocument) {
      const doc = previewFrame.contentDocument;

      const heroSection = doc.getElementById('hero');
      const servicesSection = doc.getElementById('services');
      const aboutSection = doc.getElementById('about');

      images.forEach(image => {
        if (heroSection?.innerHTML.includes(image.image_url)) {
          usage[image.image_url].inHero = true;
          usage[image.image_url].count++;
        }

        if (servicesSection?.innerHTML.includes(image.image_url)) {
          usage[image.image_url].inServices = true;
          usage[image.image_url].count++;
        }

        if (aboutSection?.innerHTML.includes(image.image_url)) {
          usage[image.image_url].inAbout = true;
          usage[image.image_url].count++;
        }
      });

      const metaTags = doc.querySelectorAll('meta[property="og:image"], meta[name="twitter:image"]');
      metaTags.forEach(tag => {
        const content = tag.getAttribute('content');
        if (content && images.map(img => img.image_url).includes(content)) {
          usage[content].inMeta = true;
          usage[content].count++;
        }
      });
    }

    setImageUsage(usage);
  };

  useEffect(() => {
    if (images.length > 0) {
      scanForImageUsage();
    }
  }, [images]);

  const renderUsageBadges = (image: string) => {
    const usage = imageUsage[image];
    if (!usage) return null;

    return (
      <div className="flex gap-1 mt-1 flex-wrap">
        {usage.inHero && (
          <Badge variant="secondary" className="text-xs">Hero</Badge>
        )}
        {usage.inServices && (
          <Badge variant="secondary" className="text-xs">Services</Badge>
        )}
        {usage.inAbout && (
          <Badge variant="secondary" className="text-xs">About</Badge>
        )}
        {usage.inMeta && (
          <Badge variant="secondary" className="text-xs">Meta</Badge>
        )}
        {usage.count === 0 && (
          <Badge variant="destructive" className="text-xs">Unused</Badge>
        )}
      </div>
    );
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
          {images.map((image) => (
            <div 
              key={image.id} 
              className={`relative group overflow-hidden rounded-md border ${
                selectedImage?.id === image.id ? 'ring-2 ring-forest ring-offset-2' : ''
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <div className="aspect-square bg-gray-100">
                <img 
                  src={image.image_url} 
                  alt={image.alt_text || `Image ${image.id}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center p-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20 h-8 w-8"
                  onClick={(e) => {
                    e.stopPropagation();
                    copyImagePath(image.image_url);
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
              {renderUsageBadges(image.image_url)}
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
                  src={selectedImage.image_url} 
                  alt={selectedImage.alt_text || 'Selected image'}
                  className="w-full max-h-48 object-contain border rounded-md"
                />
              </div>
              <div>
                <Label htmlFor="image-path">Image Path</Label>
                <div className="flex mt-1">
                  <Input 
                    id="image-path" 
                    value={selectedImage.image_url}
                    readOnly
                    className="rounded-r-none"
                  />
                  <Button 
                    variant="default"
                    className="rounded-l-none"
                    onClick={() => copyImagePath(selectedImage.image_url)}
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
