
import React from 'react';
import { FooterSection } from './FooterSection';
import { useGlobalSettingsContext } from './GlobalSettingsProvider';

export const FooterTab: React.FC = () => {
  const { settings, setSettings } = useGlobalSettingsContext();

  const handleFooterChange = (field: string, value: string) => {
    setSettings({
      ...settings,
      footer: {
        ...settings.footer,
        [field]: value
      }
    });
  };

  const handleSocialLinkChange = (id: string, field: string, value: string) => {
    const updatedSocialLinks = settings.footer.socialLinks.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    );
    
    setSettings({
      ...settings,
      footer: {
        ...settings.footer,
        socialLinks: updatedSocialLinks
      }
    });
  };

  const addSocialLink = () => {
    const newId = `social-${Date.now()}`;
    setSettings({
      ...settings,
      footer: {
        ...settings.footer,
        socialLinks: [
          ...settings.footer.socialLinks,
          { id: newId, platform: 'New Platform', url: '#', icon: 'Link' }
        ]
      }
    });
  };

  const removeSocialLink = (id: string) => {
    setSettings({
      ...settings,
      footer: {
        ...settings.footer,
        socialLinks: settings.footer.socialLinks.filter(link => link.id !== id)
      }
    });
  };

  const handleLegalLinkChange = (id: string, field: string, value: string) => {
    const updatedLegalLinks = settings.footer.legalLinks.map(link => 
      link.id === id ? { ...link, [field]: value } : link
    );
    
    setSettings({
      ...settings,
      footer: {
        ...settings.footer,
        legalLinks: updatedLegalLinks
      }
    });
  };

  const addLegalLink = () => {
    const newId = `legal-${Date.now()}`;
    setSettings({
      ...settings,
      footer: {
        ...settings.footer,
        legalLinks: [
          ...settings.footer.legalLinks,
          { id: newId, label: 'New Legal Link', url: '#' }
        ]
      }
    });
  };

  const removeLegalLink = (id: string) => {
    setSettings({
      ...settings,
      footer: {
        ...settings.footer,
        legalLinks: settings.footer.legalLinks.filter(link => link.id !== id)
      }
    });
  };

  return (
    <FooterSection 
      footer={settings.footer}
      onFooterChange={handleFooterChange}
      onSocialLinkChange={handleSocialLinkChange}
      onAddSocialLink={addSocialLink}
      onRemoveSocialLink={removeSocialLink}
      onLegalLinkChange={handleLegalLinkChange}
      onAddLegalLink={addLegalLink}
      onRemoveLegalLink={removeLegalLink}
    />
  );
};
