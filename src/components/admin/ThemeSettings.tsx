
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface ThemeSettings {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    baseFontSize: string;
  };
  spacing: {
    sectionPadding: string;
    containerMaxWidth: string;
  };
}

const defaultTheme: ThemeSettings = {
  colors: {
    primary: '#2F5233',  // forest
    secondary: '#94A38D', // sage
    accent: '#D5BDAF',   // beige
    background: '#FFFFFF', // white
    text: '#1A1A1A',     // dark gray
  },
  typography: {
    headingFont: '"Playfair Display", serif',
    bodyFont: '"Inter", sans-serif',
    baseFontSize: '16px',
  },
  spacing: {
    sectionPadding: '4rem',
    containerMaxWidth: '1200px',
  }
};

const ThemeSettings = () => {
  const [theme, setTheme] = useState<ThemeSettings>(defaultTheme);
  const [activeTab, setActiveTab] = useState('colors');

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('themeSettings');
    if (savedTheme) {
      setTheme(JSON.parse(savedTheme));
    }
    
    // Apply theme to the document
    applyTheme(savedTheme ? JSON.parse(savedTheme) : defaultTheme);
  }, []);

  const applyTheme = (themeToApply: ThemeSettings) => {
    // In a real implementation, this would update CSS variables or a theme provider
    // For this demo, we'll create/update a style tag with CSS variables
    let styleTag = document.getElementById('theme-variables');
    
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'theme-variables';
      document.head.appendChild(styleTag);
    }
    
    styleTag.innerHTML = `
      :root {
        --color-primary: ${themeToApply.colors.primary};
        --color-secondary: ${themeToApply.colors.secondary};
        --color-accent: ${themeToApply.colors.accent};
        --color-background: ${themeToApply.colors.background};
        --color-text: ${themeToApply.colors.text};
        
        --font-heading: ${themeToApply.typography.headingFont};
        --font-body: ${themeToApply.typography.bodyFont};
        --font-size-base: ${themeToApply.typography.baseFontSize};
        
        --section-padding: ${themeToApply.spacing.sectionPadding};
        --container-max-width: ${themeToApply.spacing.containerMaxWidth};
      }
    `;
  };

  const handleColorChange = (color: string, value: string) => {
    const newTheme = {
      ...theme,
      colors: {
        ...theme.colors,
        [color]: value
      }
    };
    setTheme(newTheme);
  };

  const handleTypographyChange = (property: string, value: string) => {
    const newTheme = {
      ...theme,
      typography: {
        ...theme.typography,
        [property]: value
      }
    };
    setTheme(newTheme);
  };

  const handleSpacingChange = (property: string, value: string) => {
    const newTheme = {
      ...theme,
      spacing: {
        ...theme.spacing,
        [property]: value
      }
    };
    setTheme(newTheme);
  };

  const handleSave = () => {
    localStorage.setItem('themeSettings', JSON.stringify(theme));
    applyTheme(theme);
    toast.success('Theme settings saved successfully');
  };

  const handleReset = () => {
    setTheme(defaultTheme);
    localStorage.removeItem('themeSettings');
    applyTheme(defaultTheme);
    toast.success('Theme reset to default');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Settings</CardTitle>
        <CardDescription>
          Customize the appearance of your website
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="colors" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="typography">Typography</TabsTrigger>
            <TabsTrigger value="spacing">Spacing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="colors" className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primary-color">Primary Color (Forest)</Label>
                <div className="flex items-center">
                  <div 
                    className="w-10 h-10 rounded-md mr-2 border" 
                    style={{ backgroundColor: theme.colors.primary }}
                  ></div>
                  <Input 
                    id="primary-color" 
                    type="text" 
                    value={theme.colors.primary}
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="secondary-color">Secondary Color (Sage)</Label>
                <div className="flex items-center">
                  <div 
                    className="w-10 h-10 rounded-md mr-2 border" 
                    style={{ backgroundColor: theme.colors.secondary }}
                  ></div>
                  <Input 
                    id="secondary-color" 
                    type="text" 
                    value={theme.colors.secondary}
                    onChange={(e) => handleColorChange('secondary', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="accent-color">Accent Color (Beige)</Label>
                <div className="flex items-center">
                  <div 
                    className="w-10 h-10 rounded-md mr-2 border" 
                    style={{ backgroundColor: theme.colors.accent }}
                  ></div>
                  <Input 
                    id="accent-color" 
                    type="text" 
                    value={theme.colors.accent}
                    onChange={(e) => handleColorChange('accent', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="background-color">Background Color</Label>
                <div className="flex items-center">
                  <div 
                    className="w-10 h-10 rounded-md mr-2 border" 
                    style={{ backgroundColor: theme.colors.background }}
                  ></div>
                  <Input 
                    id="background-color" 
                    type="text" 
                    value={theme.colors.background}
                    onChange={(e) => handleColorChange('background', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="text-color">Text Color</Label>
                <div className="flex items-center">
                  <div 
                    className="w-10 h-10 rounded-md mr-2 border" 
                    style={{ backgroundColor: theme.colors.text }}
                  ></div>
                  <Input 
                    id="text-color" 
                    type="text" 
                    value={theme.colors.text}
                    onChange={(e) => handleColorChange('text', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="typography" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="heading-font">Heading Font</Label>
                <Input 
                  id="heading-font" 
                  value={theme.typography.headingFont}
                  onChange={(e) => handleTypographyChange('headingFont', e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Example: "Playfair Display", serif
                </p>
              </div>
              
              <div>
                <Label htmlFor="body-font">Body Font</Label>
                <Input 
                  id="body-font" 
                  value={theme.typography.bodyFont}
                  onChange={(e) => handleTypographyChange('bodyFont', e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Example: "Inter", sans-serif
                </p>
              </div>
              
              <div>
                <Label htmlFor="base-font-size">Base Font Size</Label>
                <Input 
                  id="base-font-size" 
                  value={theme.typography.baseFontSize}
                  onChange={(e) => handleTypographyChange('baseFontSize', e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Example: 16px
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="spacing" className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="section-padding">Section Padding</Label>
                <Input 
                  id="section-padding" 
                  value={theme.spacing.sectionPadding}
                  onChange={(e) => handleSpacingChange('sectionPadding', e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Example: 4rem
                </p>
              </div>
              
              <div>
                <Label htmlFor="container-max-width">Container Max Width</Label>
                <Input 
                  id="container-max-width" 
                  value={theme.spacing.containerMaxWidth}
                  onChange={(e) => handleSpacingChange('containerMaxWidth', e.target.value)}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Example: 1200px
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 flex justify-between">
          <Button variant="outline" onClick={handleReset}>
            Reset to Default
          </Button>
          <Button onClick={handleSave}>
            Save Theme Settings
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemeSettings;
