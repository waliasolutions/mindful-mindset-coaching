
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2 } from 'lucide-react';
import MetaTagsForm from './seo/MetaTagsForm';
import AnalyticsForm from './seo/AnalyticsForm';
import { useSeoSettings } from './seo/useSeoSettings';

const SeoSettings = () => {
  const { 
    seoData, 
    isLoading, 
    testingConnection, 
    handleChange, 
    handleSwitchChange, 
    handleSave, 
    testGa4Connection 
  } = useSeoSettings();

  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO & Analytics Einstellungen</CardTitle>
        <CardDescription>
          Konfigurieren Sie die SEO Meta-Tags und Google Analytics Tracking Ihrer Website
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="meta">
          <TabsList className="mb-4">
            <TabsTrigger value="meta">Meta-Tags</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="meta">
            <MetaTagsForm 
              seoData={seoData} 
              handleChange={handleChange} 
            />
          </TabsContent>
          
          <TabsContent value="analytics">
            <AnalyticsForm 
              seoData={seoData}
              testingConnection={testingConnection}
              handleChange={handleChange}
              handleSwitchChange={handleSwitchChange}
              testGa4Connection={testGa4Connection}
            />
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Wird gespeichert...
              </>
            ) : (
              'SEO Einstellungen speichern'
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SeoSettings;
