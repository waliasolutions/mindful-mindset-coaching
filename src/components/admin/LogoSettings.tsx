import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, ImageIcon, Download } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { downloadFile } from '@/utils/downloadFile';
import MediaLibrary from './MediaLibrary';

// Define a proper interface for logo settings
interface LogoSettings {
  url: string | null;
  alt: string;
}

// Define the type for the Supabase response to avoid infinite type instantiation
interface SupabaseSettingsResponse {
  id: string;
  settings: {
    url?: string | null;
    alt?: string;
  } | null;
  created_at?: string;
  updated_at?: string;
}

const LogoSettings = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedMediaUrl, setSelectedMediaUrl] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: logoSettings, isLoading } = useQuery({
    queryKey: ['site-settings', 'partner_logo'],
    queryFn: async () => {
      // Updated query to fetch by ID instead of name since there's no name column
      const { data, error } = await supabase
        .from('site_settings')
        .select('settings')
        .eq('id', 'partner_logo')
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching logo settings:', error);
        return { url: null, alt: 'Organize My Space Logo' };
      }
      
      if (data && data.settings && typeof data.settings === 'object') {
        const settings = data.settings as Record<string, unknown>;
        return {
          url: typeof settings.url === 'string' ? settings.url : null,
          alt: typeof settings.alt === 'string' ? settings.alt : "Organize My Space Logo"
        };
      }
      
      return { url: null, alt: 'Organize My Space Logo' };
    }
  });

  const updateLogoMutation = useMutation({
    mutationFn: async ({ url, alt }: LogoSettings) => {
      const { data: existingData, error: fetchError } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 'partner_logo')
        .maybeSingle();
      
      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      if (existingData) {
        const { error } = await supabase
          .from('site_settings')
          .update({ 
            settings: { url, alt }
          })
          .eq('id', 'partner_logo');
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('site_settings')
          .insert({ 
            id: 'partner_logo',
            settings: { url, alt }
          });
        
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-settings', 'partner_logo'] });
      toast.success('Logo settings updated successfully');
    },
    onError: (error) => {
      console.error('Error updating logo:', error);
      toast.error('Failed to update logo settings');
    }
  });

  const handleUseMediaImage = () => {
    if (selectedMediaUrl) {
      updateLogoMutation.mutateAsync({
        url: selectedMediaUrl,
        alt: 'Organize My Space Logo'
      });
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `partner-logo-${Date.now()}.${fileExt}`;
      const { error: uploadError, data } = await supabase.storage
        .from('media')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(fileName);

      await updateLogoMutation.mutateAsync({
        url: publicUrl,
        alt: 'Organize My Space Logo'
      });

      toast.success('Logo uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload logo');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = async (format: 'svg' | 'png') => {
    if (!logoSettings?.url) {
      toast.error('No logo available to download');
      return;
    }

    try {
      const filename = `organize-my-space-logo.${format}`;
      await downloadFile(logoSettings.url, filename);
      toast.success(`Logo downloaded as ${format.toUpperCase()}`);
    } catch (error) {
      toast.error(`Failed to download logo as ${format.toUpperCase()}`);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Partner Logo Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-32 flex items-center justify-center">
            Loading...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Partner Logo Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label>Current Logo</Label>
              {logoSettings?.url && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleDownload('svg')}>
                      Download as SVG
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDownload('png')}>
                      Download as PNG
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <div className="mt-2 h-32 border rounded-lg overflow-hidden">
              {logoSettings?.url ? (
                <img
                  src={logoSettings.url}
                  alt={logoSettings.alt || "Organize My Space Logo"}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                </div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="logo-upload">Upload New Logo</Label>
            <div className="mt-2">
              <Input
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={isUploading}
                className="hidden"
              />
              <Label
                htmlFor="logo-upload"
                className="cursor-pointer block w-full p-4 border-2 border-dashed rounded-lg text-center hover:border-primary/50 transition-colors"
              >
                <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                <span className="text-sm text-gray-500">
                  {isUploading ? 'Uploading...' : 'Click to upload a new logo'}
                </span>
              </Label>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Recommended size: 200x60px. Supported formats: PNG, JPG, SVG
            </p>
          </div>

          <div>
            <Label>Media Library</Label>
            <div className="mt-2 border rounded-lg p-4">
              <MediaLibrary 
                onSelectImage={(imageUrl) => setSelectedMediaUrl(imageUrl)}
                selectedImage={selectedMediaUrl}
              />
              {selectedMediaUrl && (
                <Button 
                  onClick={handleUseMediaImage} 
                  className="mt-2"
                >
                  Use Selected Image as Logo
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LogoSettings;
