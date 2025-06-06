
import { useState, useEffect } from 'react';
import { GlobalSettings, defaultSettings } from '@/components/admin/settings/types';

export const useGlobalSettings = () => {
  const [globalSettings, setGlobalSettings] = useState<GlobalSettings>(defaultSettings);

  const loadSettings = () => {
    console.log('Loading global settings from localStorage...');
    const storedSettings = localStorage.getItem('globalSettings');
    if (storedSettings) {
      try {
        const parsedSettings = JSON.parse(storedSettings);
        console.log('Parsed settings from localStorage:', parsedSettings);
        const mergedSettings = {
          ...defaultSettings,
          ...parsedSettings
        };
        console.log('Merged settings:', mergedSettings);
        setGlobalSettings(mergedSettings);
      } catch (error) {
        console.error('Error parsing global settings from localStorage:', error);
        setGlobalSettings(defaultSettings);
      }
    } else {
      console.log('No stored settings found, using defaults');
      setGlobalSettings(defaultSettings);
    }
  };

  useEffect(() => {
    loadSettings();

    const handleStorageChange = (e: StorageEvent) => {
      console.log('Storage event detected:', e);
      if (e.key === 'globalSettings') {
        loadSettings();
      }
    };

    // Also listen for custom events dispatched from GlobalSettings.tsx
    const handleCustomStorageEvent = (e: CustomEvent) => {
      console.log('Custom storage event detected:', e);
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
