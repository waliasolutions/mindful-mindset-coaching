
import { supabase } from '@/integrations/supabase/client';

// UUID for the partner logo setting in the site_settings table
const PARTNER_LOGO_ID = '6c375a0d-f89a-4b9c-a79c-43b8f5c93bca';

export async function uploadPartnerLogo() {
  // Read the logo file
  const response = await fetch('/assets/images/partner-logo.png');
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
  
  // Update site settings with logo URL using the fixed UUID
  const { error: settingsError } = await supabase
    .from('site_settings')
    .upsert({
      id: PARTNER_LOGO_ID,
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
