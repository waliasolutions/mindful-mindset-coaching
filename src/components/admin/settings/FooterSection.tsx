
import React from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FooterSettings } from './types';
import { SocialLinksSection } from './SocialLinksSection';
import { LegalLinksSection } from './LegalLinksSection';
import { CopyrightSection } from './CopyrightSection';

interface FooterSectionProps {
  footer: FooterSettings;
  onFooterChange: (field: string, value: string) => void;
  onSocialLinkChange: (id: string, field: string, value: string) => void;
  onAddSocialLink: () => void;
  onRemoveSocialLink: (id: string) => void;
  onLegalLinkChange: (id: string, field: string, value: string) => void;
  onAddLegalLink: () => void;
  onRemoveLegalLink: (id: string) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  footer,
  onFooterChange,
  onSocialLinkChange,
  onAddSocialLink,
  onRemoveSocialLink,
  onLegalLinkChange,
  onAddLegalLink,
  onRemoveLegalLink
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="contact-text">Contact Text</Label>
        <Textarea 
          id="contact-text" 
          value={footer.contactText}
          onChange={(e) => onFooterChange('contactText', e.target.value)}
        />
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
