
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GlobalSettingsProvider, useGlobalSettingsContext } from './settings/GlobalSettingsProvider';
import { GeneralTab } from './settings/GeneralTab';
import { BrandingTab } from './settings/BrandingTab';
import { NavigationTab } from './settings/NavigationTab';
import { FooterTab } from './settings/FooterTab';

const GlobalSettingsContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const { handleSave, handleReset } = useGlobalSettingsContext();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Global Settings</CardTitle>
        <CardDescription>
          Manage site-wide settings and configurations. Contact information is centralized in the General tab and automatically used throughout the site.
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
            <GeneralTab />
          </TabsContent>
          
          <TabsContent value="branding" className="space-y-4">
            <BrandingTab />
          </TabsContent>
          
          <TabsContent value="navigation" className="space-y-4">
            <NavigationTab />
          </TabsContent>
          
          <TabsContent value="footer" className="space-y-4">
            <FooterTab />
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

const GlobalSettings: React.FC = () => {
  return (
    <GlobalSettingsProvider>
      <GlobalSettingsContent />
    </GlobalSettingsProvider>
  );
};

export default GlobalSettings;
