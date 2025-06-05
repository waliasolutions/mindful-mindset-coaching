
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface AnalyticsFormProps {
  seoData: {
    gaTrackingId: string;
    enableGa: boolean;
  };
  testingConnection: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSwitchChange: (checked: boolean) => void;
  testGa4Connection: () => Promise<boolean>;
}

const AnalyticsForm = ({ 
  seoData, 
  testingConnection, 
  handleChange, 
  handleSwitchChange, 
  testGa4Connection 
}: AnalyticsFormProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch 
          id="enableGa" 
          checked={seoData.enableGa} 
          onCheckedChange={handleSwitchChange}
        />
        <Label htmlFor="enableGa">Google Analytics aktivieren</Label>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="gaTrackingId">Google Analytics 4 Mess-ID</Label>
        <div className="flex gap-2">
          <Input 
            id="gaTrackingId" 
            name="gaTrackingId" 
            value={seoData.gaTrackingId} 
            onChange={handleChange}
            placeholder="G-XXXXXXXXXX"
            disabled={!seoData.enableGa}
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            onClick={testGa4Connection}
            disabled={!seoData.enableGa || !seoData.gaTrackingId || testingConnection}
            className="shrink-0"
          >
            {testingConnection ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              'Testen'
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Geben Sie Ihre GA4 Mess-ID ein (beginnt mit G-)
        </p>
      </div>

      {seoData.enableGa && seoData.gaTrackingId === 'G-CCD1ZR05L7' && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-md">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <p className="text-sm text-green-700">
              Google Analytics ist korrekt konfiguriert mit ID: G-CCD1ZR05L7
            </p>
          </div>
        </div>
      )}

      {seoData.enableGa && seoData.gaTrackingId && seoData.gaTrackingId !== 'G-CCD1ZR05L7' && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <p className="text-sm text-amber-700">
              Benutzerdefinierte GA4 ID konfiguriert. Testen Sie die Verbindung um sicherzustellen, dass sie korrekt ist.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsForm;
