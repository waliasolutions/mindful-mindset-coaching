
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const SeoSettings = () => {
  const [seoData, setSeoData] = useState({
    title: '',
    description: '',
    keywords: '',
    ogImage: '',
    gaTrackingId: '',
    enableGa: false
  });

  useEffect(() => {
    // Load saved SEO settings from localStorage
    const savedSeo = localStorage.getItem('seoSettings');
    if (savedSeo) {
      setSeoData(JSON.parse(savedSeo));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSeoData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setSeoData(prev => ({
      ...prev,
      enableGa: checked
    }));
  };

  const handleSave = () => {
    localStorage.setItem('seoSettings', JSON.stringify(seoData));

    // If GA is enabled, update the script in the document head
    if (seoData.enableGa && seoData.gaTrackingId) {
      updateGoogleAnalytics(seoData.gaTrackingId);
    } else {
      // Remove GA script if disabled
      removeGoogleAnalytics();
    }

    // Update meta tags
    updateMetaTags();
    
    toast.success('SEO settings saved successfully');
  };

  const updateMetaTags = () => {
    // Update title
    document.title = seoData.title;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', seoData.description);
    
    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', seoData.keywords);
    
    // Update OG image
    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    ogImage.setAttribute('content', seoData.ogImage);
  };

  const updateGoogleAnalytics = (trackingId: string) => {
    removeGoogleAnalytics(); // Remove existing GA script if any
    
    // Create GA4 script
    const scriptGA = document.createElement('script');
    scriptGA.async = true;
    scriptGA.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    scriptGA.id = 'ga-script';
    
    // Create config script
    const scriptConfig = document.createElement('script');
    scriptConfig.id = 'ga-config';
    scriptConfig.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${trackingId}');
    `;
    
    // Add scripts to document
    document.head.appendChild(scriptGA);
    document.head.appendChild(scriptConfig);
  };

  const removeGoogleAnalytics = () => {
    // Remove existing GA scripts if they exist
    const gaScript = document.getElementById('ga-script');
    const gaConfig = document.getElementById('ga-config');
    
    if (gaScript) {
      gaScript.remove();
    }
    
    if (gaConfig) {
      gaConfig.remove();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO & Analytics Settings</CardTitle>
        <CardDescription>
          Configure your website's SEO meta tags and Google Analytics tracking
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="meta">
          <TabsList className="mb-4">
            <TabsTrigger value="meta">Meta Tags</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="meta" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Page Title</Label>
              <Input 
                id="title" 
                name="title" 
                value={seoData.title} 
                onChange={handleChange} 
                placeholder="My Mindset Coaching Website" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Meta Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={seoData.description} 
                onChange={handleChange}
                placeholder="A short description of your website (150-160 characters recommended)"
                className="min-h-[80px]"
              />
              <p className="text-xs text-muted-foreground">
                {seoData.description.length} characters (150-160 recommended)
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords</Label>
              <Input 
                id="keywords" 
                name="keywords" 
                value={seoData.keywords} 
                onChange={handleChange}
                placeholder="coaching, mindset, life coaching, etc."
              />
              <p className="text-xs text-muted-foreground">
                Separate keywords with commas
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ogImage">Open Graph Image URL</Label>
              <Input 
                id="ogImage" 
                name="ogImage" 
                value={seoData.ogImage} 
                onChange={handleChange}
                placeholder="/lovable-uploads/your-image.png"
              />
              <p className="text-xs text-muted-foreground">
                This image appears when sharing your site on social media
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="enableGa" 
                checked={seoData.enableGa} 
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="enableGa">Enable Google Analytics</Label>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gaTrackingId">Google Analytics 4 Measurement ID</Label>
              <Input 
                id="gaTrackingId" 
                name="gaTrackingId" 
                value={seoData.gaTrackingId} 
                onChange={handleChange}
                placeholder="G-XXXXXXXXXX"
                disabled={!seoData.enableGa}
              />
              <p className="text-xs text-muted-foreground">
                Enter your GA4 measurement ID (starts with G-)
              </p>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSave}>
            Save SEO Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SeoSettings;
