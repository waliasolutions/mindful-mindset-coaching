
import { supabase } from '@/integrations/supabase/client';

export async function uploadPartnerLogo() {
  // Read the logo file
  const response = await fetch('/lovable-uploads/c4c9647e-ea24-451e-b5a7-94cf38dc28b3.png');
  const blob = await response.blob();
  
  // Generate a unique filename
  const fileName = `partner-logo-${Date.now()}.png`;
  
  // Upload to Supabase storage
  const { data, error } = await supabase.storage
    .from('media')
    .upload(fileName, blob, {
      cacheControl: '3600',
      upsert: true
    });
  
  if (error) {
    console.error('Error uploading logo:', error);
    return null;
  }
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('media')
    .getPublicUrl(fileName);
  
  // Update site settings with logo URL
  const { error: settingsError } = await supabase
    .from('site_settings')
    .upsert({
      id: 'partner_logo',
      settings: {
        url: publicUrl,
        alt: 'Organize My Space Logo'
      }
    });
  
  if (settingsError) {
    console.error('Error updating site settings:', settingsError);
  }
  
  return publicUrl;
}
