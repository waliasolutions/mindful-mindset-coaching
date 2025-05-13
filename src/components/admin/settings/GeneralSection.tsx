
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { GlobalSettings } from './types';

interface GeneralSectionProps {
  settings: GlobalSettings;
  onGeneralChange: (field: string, value: string) => void;
}

export const GeneralSection: React.FC<GeneralSectionProps> = ({ 
  settings, 
  onGeneralChange 
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="site-name">Site Name</Label>
        <Input 
          id="site-name" 
          value={settings.siteName}
          onChange={(e) => onGeneralChange('siteName', e.target.value)}
        />
      </div>
      
      <div>
        <Label htmlFor="contact-email">Contact Email</Label>
        <Input 
          id="contact-email" 
          type="email"
          value={settings.contactEmail}
          onChange={(e) => onGeneralChange('contactEmail', e.target.value)}
        />
      </div>
      
      <div>
        <Label htmlFor="contact-phone">Contact Phone</Label>
        <Input 
          id="contact-phone" 
          value={settings.contactPhone}
          onChange={(e) => onGeneralChange('contactPhone', e.target.value)}
        />
      </div>
      
      <div>
        <Label htmlFor="address">Address</Label>
        <Textarea 
          id="address" 
          value={settings.address}
          onChange={(e) => onGeneralChange('address', e.target.value)}
        />
      </div>
    </div>
  );
};
