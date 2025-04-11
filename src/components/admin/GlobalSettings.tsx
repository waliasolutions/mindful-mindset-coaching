import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface NavItem {
  id: string;
  label: string;
  url: string;
}

interface FooterSettings {
  contactText: string;
  socialLinks: {
    id: string;
    platform: string;
    url: string;
    icon: string;
  }[];
  legalLinks: {
    id: string;
    label: string;
    url: string;
  }[];
  copyrightText: string;
}

interface GlobalSettings {
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  navigation: NavItem[];
  footer: FooterSettings;
}

const defaultSettings: GlobalSettings = {
  siteName: 'Mindset Coaching',
  contactEmail: 'info@mindset-coach-martina.ch',
  contactPhone: '+41 788 400 481',
  address: 'Ruedi-Walter-strasse 4, 8050 Zürich',
  navigation: [
    { id: 'home', label: 'Home', url: '#home' },
    { id: 'services', label: 'Services', url: '#services' },
    { id: 'about', label: 'About', url: '#about' },
    { id: 'pricing', label: 'Pricing', url: '#pricing' },
    { id: 'contact', label: 'Contact', url: '#contact' }
  ],
  footer: {
    contactText: 'Get in touch to learn more about our coaching services',
    socialLinks: [
      { id: 'instagram', platform: 'Instagram', url: 'https://instagram.com', icon: 'Instagram' },
      { id: 'facebook', platform: 'Facebook', url: 'https://facebook.com', icon: 'Facebook' }
    ],
    legalLinks: [
      { id: 'privacy', label: 'Privacy Policy', url: '/privacy' },
      { id: 'terms', label: 'Terms & Conditions', url: '/terms' }
    ],
    copyrightText: '© 2025 Mindset Coaching. All rights reserved.'
  }
};

const GlobalSettings = () => {
  const [settings, setSettings] = useState<GlobalSettings>(defaultSettings);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    const savedSettings = localStorage.getItem('globalSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
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
            <TabsTrigger value="navigation">Navigation</TabsTrigger>
            <TabsTrigger value="footer">Footer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="site-name">Site Name</Label>
                <Input 
                  id="site-name" 
                  value={settings.siteName}
                  onChange={(e) => handleGeneralChange('siteName', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="contact-email">Contact Email</Label>
                <Input 
                  id="contact-email" 
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => handleGeneralChange('contactEmail', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="contact-phone">Contact Phone</Label>
                <Input 
                  id="contact-phone" 
                  value={settings.contactPhone}
                  onChange={(e) => handleGeneralChange('contactPhone', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea 
                  id="address" 
                  value={settings.address}
                  onChange={(e) => handleGeneralChange('address', e.target.value)}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="navigation" className="space-y-4">
            <div className="space-y-4">
              {settings.navigation.map(item => (
                <div key={item.id} className="p-4 border rounded-md">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
                    <div>
                      <Label htmlFor={`nav-label-${item.id}`}>Label</Label>
                      <Input 
                        id={`nav-label-${item.id}`} 
                        value={item.label}
                        onChange={(e) => handleNavigationChange(item.id, 'label', e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor={`nav-url-${item.id}`}>URL</Label>
                      <Input 
                        id={`nav-url-${item.id}`} 
                        value={item.url}
                        onChange={(e) => handleNavigationChange(item.id, 'url', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => removeNavigationItem(item.id)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
              
              <Button onClick={addNavigationItem}>
                Add Navigation Item
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="footer" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="contact-text">Contact Text</Label>
                <Textarea 
                  id="contact-text" 
                  value={settings.footer.contactText}
                  onChange={(e) => handleFooterChange('contactText', e.target.value)}
                />
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Social Links</h3>
                {settings.footer.socialLinks.map(link => (
                  <div key={link.id} className="p-4 border rounded-md mb-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
                      <div>
                        <Label htmlFor={`social-platform-${link.id}`}>Platform</Label>
                        <Input 
                          id={`social-platform-${link.id}`} 
                          value={link.platform}
                          onChange={(e) => handleSocialLinkChange(link.id, 'platform', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`social-url-${link.id}`}>URL</Label>
                        <Input 
                          id={`social-url-${link.id}`} 
                          value={link.url}
                          onChange={(e) => handleSocialLinkChange(link.id, 'url', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`social-icon-${link.id}`}>Icon</Label>
                        <Input 
                          id={`social-icon-${link.id}`} 
                          value={link.icon}
                          onChange={(e) => handleSocialLinkChange(link.id, 'icon', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => removeSocialLink(link.id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                
                <Button onClick={addSocialLink}>
                  Add Social Link
                </Button>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Legal Links</h3>
                {settings.footer.legalLinks.map(link => (
                  <div key={link.id} className="p-4 border rounded-md mb-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
                      <div>
                        <Label htmlFor={`legal-label-${link.id}`}>Label</Label>
                        <Input 
                          id={`legal-label-${link.id}`} 
                          value={link.label}
                          onChange={(e) => handleLegalLinkChange(link.id, 'label', e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor={`legal-url-${link.id}`}>URL</Label>
                        <Input 
                          id={`legal-url-${link.id}`} 
                          value={link.url}
                          onChange={(e) => handleLegalLinkChange(link.id, 'url', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => removeLegalLink(link.id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
                
                <Button onClick={addLegalLink}>
                  Add Legal Link
                </Button>
              </div>
              
              <div>
                <Label htmlFor="copyright-text">Copyright Text</Label>
                <Input 
                  id="copyright-text" 
                  value={settings.footer.copyrightText}
                  onChange={(e) => handleFooterChange('copyrightText', e.target.value)}
                />
              </div>
            </div>
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
