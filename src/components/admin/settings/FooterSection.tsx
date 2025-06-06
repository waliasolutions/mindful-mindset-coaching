
import React from 'react';
import { FooterSettings } from './types';
import { SocialLinksSection } from './SocialLinksSection';
import { LegalLinksSection } from './LegalLinksSection';
import { CopyrightSection } from './CopyrightSection';

interface FooterSectionProps {
  footer: FooterSettings;
  onSocialLinkChange: (id: string, field: string, value: string) => void;
  onAddSocialLink: () => void;
  onRemoveSocialLink: (id: string) => void;
  onLegalLinkChange: (id: string, field: string, value: string) => void;
  onAddLegalLink: () => void;
  onRemoveLegalLink: (id: string) => void;
  onFooterChange: (field: string, value: string) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  footer,
  onSocialLinkChange,
  onAddSocialLink,
  onRemoveSocialLink,
  onLegalLinkChange,
  onAddLegalLink,
  onRemoveLegalLink,
  onFooterChange
}) => {
  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-700">
          <strong>Note:</strong> Contact information (email, phone, address) is managed in the General settings tab and will be automatically displayed in the footer.
        </p>
      </div>
      
      <SocialLinksSection 
        socialLinks={footer.socialLinks}
        onSocialLinkChange={onSocialLinkChange}
        onAddLink={onAddSocialLink}
        onRemoveLink={onRemoveSocialLink}
      />
      
      <LegalLinksSection 
        legalLinks={footer.legalLinks}
        onLegalLinkChange={onLegalLinkChange}
        onAddLink={onAddLegalLink}
        onRemoveLink={onRemoveLegalLink}
      />
      
      <CopyrightSection 
        copyrightText={footer.copyrightText}
        onChange={(value) => onFooterChange('copyrightText', value)}
      />
    </div>
  );
};
