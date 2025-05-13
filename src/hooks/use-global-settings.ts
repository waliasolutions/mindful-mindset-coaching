
import { useState, useEffect } from 'react';

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

interface LegalLink {
  id: string;
  label: string;
  url: string;
}

interface FooterSettings {
  contactText: string;
  socialLinks: SocialLink[];
  legalLinks: LegalLink[];
  copyrightText: string;
}

interface GlobalSettings {
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  navigation: any[];
  footer: FooterSettings;
}

const defaultSettings: GlobalSettings = {
  siteName: 'Mindset Coach Martina',
  contactEmail: 'info@mindset-coach-martina.ch',
  contactPhone: '+41 78 840 04 81',
  address: 'Ruedi-Walter-strasse 4, 8050 Zürich',
  navigation: [
    { id: 'home', label: 'Home', url: '#home' },
    { id: 'services', label: 'Services', url: '#services' },
    { id: 'about', label: 'About', url: '#about' },
    { id: 'pricing', label: 'Pricing', url: '#pricing' },
    { id: 'contact', label: 'Contact', url: '#contact' }
  ],
  footer: {
    contactText: 'Kontaktieren Sie uns, um mehr über unsere Coaching-Dienstleistungen zu erfahren',
    socialLinks: [
      { id: 'instagram', platform: 'Instagram', url: 'https://www.instagram.com/organize.my.space/', icon: 'Instagram' },
      { id: 'facebook', platform: 'Facebook', url: 'https://ne-np.facebook.com/organizemyspace.ch/', icon: 'Facebook' }
    ],
    legalLinks: [
      { id: 'privacy', label: 'Datenschutz', url: '/privacy' },
      { id: 'terms', label: 'Nutzungsbedingungen', url: '/terms' }
    ],
    copyrightText: '© 2025 Mindset Coach Martina.'
  }
};

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
