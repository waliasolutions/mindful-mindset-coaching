
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import ImageSelector from '../ImageSelector';

export const BrandingTab: React.FC = () => {
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    const savedLogo = localStorage.getItem('websiteLogo');
    if (savedLogo) {
      setLogoUrl(savedLogo);
    }
  }, []);

  const handleLogoChange = (newLogoUrl: string) => {
    setLogoUrl(newLogoUrl);
    localStorage.setItem('websiteLogo', newLogoUrl);
    
    window.dispatchEvent(new CustomEvent('localStorageUpdated', { 
      detail: { key: 'websiteLogo', newValue: newLogoUrl }
    }));
    
    toast.success('Logo updated successfully');
  };

  return (
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
  );
};
