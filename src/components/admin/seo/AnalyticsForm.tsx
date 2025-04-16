
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';

interface AnalyticsFormProps {
  seoData: {
    gaTrackingId: string;
    enableGa: boolean;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSwitchChange: (checked: boolean) => void;
}

const AnalyticsForm = ({ seoData, handleChange, handleSwitchChange }: AnalyticsFormProps) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default AnalyticsForm;
