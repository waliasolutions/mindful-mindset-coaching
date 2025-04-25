
import { useState, useEffect } from 'react';

interface GlobalSettings {
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  navigation: any[];
  footer: any;
}

export const useGlobalSettings = () => {
  const [globalSettings, setGlobalSettings] = useState<GlobalSettings | null>(null);

  const loadSettings = () => {
    const storedSettings = localStorage.getItem('globalSettings');
    if (storedSettings) {
      setGlobalSettings(JSON.parse(storedSettings));
    }
  };

  useEffect(() => {
    loadSettings();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'globalSettings') {
        loadSettings();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return globalSettings;
};
