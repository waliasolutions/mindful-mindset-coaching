
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GlobalSettings as GlobalSettingsType, defaultSettings } from './types';
import { extractNavigationContent } from '@/utils/contentExtractor';
import { toast } from 'sonner';

interface GlobalSettingsContextType {
  settings: GlobalSettingsType;
  setSettings: React.Dispatch<React.SetStateAction<GlobalSettingsType>>;
  handleSave: () => void;
  handleReset: () => void;
  dispatchStorageEvent: (key: string) => void;
}

const GlobalSettingsContext = createContext<GlobalSettingsContextType | undefined>(undefined);

export const useGlobalSettingsContext = () => {
  const context = useContext(GlobalSettingsContext);
  if (!context) {
    throw new Error('useGlobalSettingsContext must be used within a GlobalSettingsProvider');
  }
  return context;
};

interface GlobalSettingsProviderProps {
  children: ReactNode;
}

export const GlobalSettingsProvider: React.FC<GlobalSettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<GlobalSettingsType>(() => {
    const currentNav = extractNavigationContent();
    return {
      ...defaultSettings,
      navigation: currentNav
    };
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem('globalSettings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        const currentNav = extractNavigationContent();
        setSettings({
          ...parsedSettings,
          navigation: currentNav
        });
      } catch (error) {
        console.error('Error parsing global settings:', error);
      }
    }
  }, []);

  const dispatchStorageEvent = (key: string) => {
    window.dispatchEvent(new CustomEvent('localStorageUpdated', { 
      detail: { key, newValue: JSON.stringify(settings) }
    }));
  };

  const handleSave = () => {
    localStorage.setItem('globalSettings', JSON.stringify(settings));
    dispatchStorageEvent('globalSettings');
    toast.success('Global settings saved successfully');
  };

  const handleReset = () => {
    const currentNav = extractNavigationContent();
    const resetSettings = {
      ...defaultSettings,
      navigation: currentNav
    };
    setSettings(resetSettings);
    localStorage.removeItem('globalSettings');
    dispatchStorageEvent('globalSettings');
    toast.success('Settings reset to default');
  };

  return (
    <GlobalSettingsContext.Provider value={{
      settings,
      setSettings,
      handleSave,
      handleReset,
      dispatchStorageEvent
    }}>
      {children}
    </GlobalSettingsContext.Provider>
  );
};
