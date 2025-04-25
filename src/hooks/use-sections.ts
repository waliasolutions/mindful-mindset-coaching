
import { useState, useEffect } from 'react';

interface Section {
  id: string;
  name: string;
  component: string;
  visible: boolean;
  order: number;
}

const defaultSections: Section[] = [
  { id: 'hero', name: 'Hero', component: 'Hero', visible: true, order: 0 },
  { id: 'services', name: 'Services', component: 'Services', visible: true, order: 1 },
  { id: 'about', name: 'About', component: 'About', visible: true, order: 2 },
  { id: 'pricing', name: 'Pricing', component: 'PricingWithQuote', visible: true, order: 3 },
  { id: 'contact', name: 'Contact', component: 'Contact', visible: true, order: 4 },
];

export const useSections = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  const loadSettings = () => {
    console.log('Loading settings from localStorage');
    const storedSections = localStorage.getItem('sectionOrder');
    if (storedSections) {
      setSections(JSON.parse(storedSections));
    } else {
      setSections(defaultSections);
    }
  };

  useEffect(() => {
    loadSettings();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'sectionOrder') {
        console.log('Storage changed: sectionOrder');
        setLastUpdate(Date.now());
        loadSettings();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    const handleCustomStorageChange = () => {
      console.log('Same-tab storage change detected');
      setLastUpdate(Date.now());
      loadSettings();
    };

    window.addEventListener('localStorageUpdated', handleCustomStorageChange);
    return () => window.removeEventListener('localStorageUpdated', handleCustomStorageChange);
  }, []);

  return {
    sections,
    lastUpdate
  };
};
