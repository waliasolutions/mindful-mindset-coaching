
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface MetaTagsFormProps {
  seoData: {
    title: string;
    description: string;
    keywords: string;
    ogImage: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const MetaTagsForm = ({ seoData, handleChange }: MetaTagsFormProps) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default MetaTagsForm;
