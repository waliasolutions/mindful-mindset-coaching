
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import ImageSelector from './ImageSelector';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Import types and default settings
import { GlobalSettings as GlobalSettingsType, defaultSettings } from './settings/types';

// Import section components
import { GeneralSection } from './settings/GeneralSection';
import { NavigationSection } from './settings/NavigationSection';
import { FooterSection } from './settings/FooterSection';

const GlobalSettings = () => {
  const [settings, setSettings] = useState<GlobalSettingsType>(defaultSettings);
  const [activeTab, setActiveTab] = useState('general');
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    const savedSettings = localStorage.getItem('globalSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    
    // Load logo URL
    const savedLogo = localStorage.getItem('websiteLogo');
    if (savedLogo) {
      setLogoUrl(savedLogo);
    }
  }, []);

  const handleGeneralChange = (field: string, value: string) => {
    setSettings({
      ...settings,
      [field]: value
    });
  };

  const handleNavigationChange = (id: string, field: string, value: string) => {
    const updatedNavigation = settings.navigation.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    
    setSettings({
      ...settings,
      navigation: updatedNavigation
    });
  };

  const addNavigationItem = () => {
    const newId = `nav-${Date.now()}`;
    setSettings({
      ...settings,
      navigation: [
        ...settings.navigation,
        { id: newId, label: 'New Item', url: '#' }
      ]
    });
  };

  const removeNavigationItem = (id: string) => {
    setSettings({
      ...settings,
      navigation: settings.navigation.filter(item => item.id !== id)
    });
  };

  const handleFooterChange = (field: string, value: string) => {
    setSettings({
      ...settings,
      footer: {
        ...settings.footer,
        [field]: value
      }
    });
  };

  const handleSocialLinkChange = (id: string, field: string, value: string) => {
    const updatedSocialLinks = settings.footer.socialLinks.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    );
    
    setSettings({
      ...settings,
      footer: {
        ...settings.footer,
        socialLinks: updatedSocialLinks
      }
    });
  };

  const addSocialLink = () => {
    const newId = `social-${Date.now()}`;
    setSettings({
      ...settings,
      footer: {
        ...settings.footer,
        socialLinks: [
          ...settings.footer.socialLinks,
          { id: newId, platform: 'New Platform', url: '#', icon: 'Link' }
        ]
      }
    });
  };

  const removeSocialLink = (id: string) => {
    setSettings({
      ...settings,
      footer: {
        ...settings.footer,
        socialLinks: settings.footer.socialLinks.filter(link => link.id !== id)
      }
    });
  };

  const handleLegalLinkChange = (id: string, field: string, value: string) => {
    const updatedLegalLinks = settings.footer.legalLinks.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    );
    
    setSettings({
      ...settings,
      footer: {
        ...settings.footer,
        legalLinks: updatedLegalLinks
      }
    });
  };

  const addLegalLink = () => {
    const newId = `legal-${Date.now()}`;
    setSettings({
      ...settings,
      footer: {
        ...settings.footer,
        legalLinks: [
          ...settings.footer.legalLinks,
          { id: newId, label: 'New Legal Link', url: '#' }
        ]
      }
    });
  };

  const removeLegalLink = (id: string) => {
    setSettings({
      ...settings,
      footer: {
        ...settings.footer,
        legalLinks: settings.footer.legalLinks.filter(link => link.id !== id)
      }
    });
  };

  const handleLogoChange = (newLogoUrl: string) => {
    setLogoUrl(newLogoUrl);
    localStorage.setItem('websiteLogo', newLogoUrl);
    
    // Dispatch storage event for logo change
    window.dispatchEvent(new CustomEvent('localStorageUpdated', { 
      detail: { key: 'websiteLogo', newValue: newLogoUrl }
    }));
    
    toast.success('Logo updated successfully');
  };

  const handleSave = () => {
    localStorage.setItem('globalSettings', JSON.stringify(settings));
    
    dispatchStorageEvent('globalSettings');
    
    toast.success('Global settings saved successfully');
  };

  const handleReset = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('globalSettings');
    
    dispatchStorageEvent('globalSettings');
    
    toast.success('Settings reset to default');
  };

  const dispatchStorageEvent = (key: string) => {
    window.dispatchEvent(new CustomEvent('localStorageUpdated', { 
      detail: { key, newValue: JSON.stringify(settings) }
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Global Settings</CardTitle>
        <CardDescription>
          Manage site-wide settings and configurations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="navigation">Navigation</TabsTrigger>
            <TabsTrigger value="footer">Footer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <GeneralSection 
              settings={settings}
              onGeneralChange={handleGeneralChange}
            />
          </TabsContent>
          
          <TabsContent value="branding" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Logo & Branding</h3>
              <ImageSelector
                value={logoUrl}
                onChange={handleLogoChange}
                label="Website Logo"
              />
              {logoUrl && (
                <div className="p-4 border rounded-lg bg-gray-50">
                  <p className="text-sm text-gray-600 mb-2">Current Logo Preview:</p>
                  <img 
                    src={logoUrl} 
                    alt="Website Logo" 
                    className="max-h-16 object-contain"
                  />
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="navigation" className="space-y-4">
            <NavigationSection 
              navigation={settings.navigation}
              onNavigationChange={handleNavigationChange}
              onAddItem={addNavigationItem}
              onRemoveItem={removeNavigationItem}
            />
          </TabsContent>
          
          <TabsContent value="footer" className="space-y-4">
            <FooterSection 
              footer={settings.footer}
              onFooterChange={handleFooterChange}
              onSocialLinkChange={handleSocialLinkChange}
              onAddSocialLink={addSocialLink}
              onRemoveSocialLink={removeSocialLink}
              onLegalLinkChange={handleLegalLinkChange}
              onAddLegalLink={addLegalLink}
              onRemoveLegalLink={removeLegalLink}
            />
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 flex justify-between">
          <Button variant="outline" onClick={handleReset}>
            Reset to Default
          </Button>
          <Button onClick={handleSave}>
            Save Global Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GlobalSettings;
