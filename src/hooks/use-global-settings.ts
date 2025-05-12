
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
  siteName: 'Mindset Coaching',
  contactEmail: 'info@mindset-coach-martina.ch',
  contactPhone: '+41 788 400 481',
  address: 'Ruedi-Walter-strasse 4, 8050 Zürich',
  navigation: [
    { id: 'home', label: 'Home', url: '#home' },
    { id: 'services', label: 'Services', url: '#services' },
    { id: 'about', label: 'About', url: '#about' },
    { id: 'pricing', label: 'Pricing', url: '#pricing' },
    { id: 'contact', label: 'Contact', url: '#contact' }
  ],
  footer: {
    contactText: 'Get in touch to learn more about our coaching services',
    socialLinks: [
      { id: 'instagram', platform: 'Instagram', url: 'https://instagram.com', icon: 'Instagram' },
      { id: 'facebook', platform: 'Facebook', url: 'https://facebook.com', icon: 'Facebook' }
    ],
    legalLinks: [
      { id: 'privacy', label: 'Privacy Policy', url: '/privacy' },
      { id: 'terms', label: 'Terms & Conditions', url: '/terms' }
    ],
    copyrightText: '© 2025 Mindset Coaching. All rights reserved.'
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
