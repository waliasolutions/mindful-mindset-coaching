
import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface LogoSettings {
  url: string | null;
  alt: string;
}

const LogoSettings = () => {
  const [isUploading, setIsUploading] = useState(false);
  const queryClient = useQueryClient();

  // Query site_settings to get the partner_logo data
  const { data: logoSettings, isLoading } = useQuery({
    queryKey: ['site-settings', 'partner_logo'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('name', 'partner_logo')
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching logo settings:', error);
        return { url: null, alt: 'Organize My Space Logo' };
      }
      
      // Check if data exists and has the expected structure
      if (data && data.settings && typeof data.settings === 'object') {
        const settings = data.settings as Record<string, unknown>;
        // Validate that the settings object has the required properties
        if (typeof settings.url === 'string' || settings.url === null) {
          return {
            url: settings.url as string | null,
            alt: typeof settings.alt === 'string' ? settings.alt : "Organize My Space Logo"
          };
        }
      }
      
      return { url: null, alt: 'Organize My Space Logo' };
    }
  });

  // Update logo mutation
  const updateLogoMutation = useMutation({
    mutationFn: async ({ url, alt }: LogoSettings) => {
      // First check if the partner_logo record exists
      const { data: existingData, error: fetchError } = await supabase
        .from('site_settings')
        .select('*')
        .eq('name', 'partner_logo')
        .maybeSingle();
      
      if (fetchError && fetchError.code !== 'PGRST116') {
        throw fetchError;
      }

      if (existingData) {
        // Update existing record
        const { error } = await supabase
          .from('site_settings')
          .update({ 
            settings: { url, alt }
          })
          .eq('name', 'partner_logo');
        
        if (error) throw error;
      } else {
        // Insert new record
        const { error } = await supabase
          .from('site_settings')
          .insert({ 
            name: 'partner_logo',
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
          {/* Current Logo Preview */}
          <div>
            <Label>Current Logo</Label>
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

          {/* Upload New Logo */}
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
        </div>
      </CardContent>
    </Card>
  );
};

export default LogoSettings;
