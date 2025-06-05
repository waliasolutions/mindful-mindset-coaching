
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MetaTagsForm from './seo/MetaTagsForm';
import AnalyticsForm from './seo/AnalyticsForm';
import { useSeoSettings } from './seo/useSeoSettings';

const SeoSettings = () => {
  const { seoData, handleChange, handleSwitchChange, handleSave } = useSeoSettings();

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
              handleChange={handleChange}
              handleSwitchChange={handleSwitchChange}
            />
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 flex justify-end">
          <Button onClick={handleSave}>
            SEO Einstellungen speichern
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SeoSettings;
