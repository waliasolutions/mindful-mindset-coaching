
import React from 'react';
import { NavigationSection } from './NavigationSection';
import { useGlobalSettingsContext } from './GlobalSettingsProvider';

export const NavigationTab: React.FC = () => {
  const { settings, setSettings } = useGlobalSettingsContext();

  const handleNavigationChange = (id: string, field: string, value: string) => {
    const updatedNavigation = settings.navigation.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    );
    
    setSettings({
      ...settings,
      navigation: updatedNavigation
    });
  };

  const addNavigationItem = () => {
    const newId = `nav-${Date.now()}`;
    setSettings({
      ...settings,
      navigation: [
        ...settings.navigation,
        { id: newId, label: 'New Item', url: '#' }
      ]
    });
  };

  const removeNavigationItem = (id: string) => {
    setSettings({
      ...settings,
      navigation: settings.navigation.filter(item => item.id !== id)
    });
  };

  return (
    <NavigationSection 
      navigation={settings.navigation}
      onNavigationChange={handleNavigationChange}
      onAddItem={addNavigationItem}
      onRemoveItem={removeNavigationItem}
    />
  );
};
