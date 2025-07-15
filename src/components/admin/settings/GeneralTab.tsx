
import React from 'react';
import { GeneralSection } from './GeneralSection';
import { useGlobalSettingsContext } from './GlobalSettingsProvider';

export const GeneralTab: React.FC = () => {
  const { settings, setSettings } = useGlobalSettingsContext();

  const handleGeneralChange = (field: string, value: string) => {
    setSettings({
      ...settings,
      [field]: value
    });
  };

  return (
    <GeneralSection 
      settings={settings}
      onGeneralChange={handleGeneralChange}
    />
  );
};
