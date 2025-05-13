
import { useState, useEffect } from 'react';
import { GlobalSettings, defaultSettings } from '@/components/admin/settings/types';

export const useGlobalSettings = () => {
  const [globalSettings, setGlobalSettings] = useState<GlobalSettings>(defaultSettings);

  const loadSettings = () => {
    const storedSettings = localStorage.getItem('globalSettings');
    if (storedSettings) {
      try {
        setGlobalSettings({
          ...defaultSettings,
          ...JSON.parse(storedSettings)
        });
      } catch (error) {
        console.error('Error parsing global settings from localStorage:', error);
        setGlobalSettings(defaultSettings);
      }
    }
  };

  useEffect(() => {
    loadSettings();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'globalSettings') {
        loadSettings();
      }
    };

    // Also listen for custom events dispatched from GlobalSettings.tsx
    const handleCustomStorageEvent = (e: CustomEvent) => {
      if (e.detail?.key === 'globalSettings') {
        loadSettings();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageUpdated', handleCustomStorageEvent as EventListener);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageUpdated', handleCustomStorageEvent as EventListener);
    };
  }, []);

  return globalSettings;
};
