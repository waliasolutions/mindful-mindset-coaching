
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SocialLink } from './types';

interface SocialLinksSectionProps {
  socialLinks: SocialLink[];
  onSocialLinkChange: (id: string, field: string, value: string) => void;
  onAddLink: () => void;
  onRemoveLink: (id: string) => void;
}

export const SocialLinksSection: React.FC<SocialLinksSectionProps> = ({
  socialLinks,
  onSocialLinkChange,
  onAddLink,
  onRemoveLink
}) => {
  return (
    <div>
      <h3 className="text-sm font-medium mb-2">Social Links</h3>
      {socialLinks.map(link => (
        <div key={link.id} className="p-4 border rounded-md mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
            <div>
              <Label htmlFor={`social-platform-${link.id}`}>Platform</Label>
              <Input 
                id={`social-platform-${link.id}`} 
                value={link.platform}
                onChange={(e) => onSocialLinkChange(link.id, 'platform', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor={`social-url-${link.id}`}>URL</Label>
              <Input 
                id={`social-url-${link.id}`} 
                value={link.url}
                onChange={(e) => onSocialLinkChange(link.id, 'url', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor={`social-icon-${link.id}`}>Icon</Label>
              <Input 
                id={`social-icon-${link.id}`} 
                value={link.icon}
                onChange={(e) => onSocialLinkChange(link.id, 'icon', e.target.value)}
              />
            </div>
          </div>
          
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => onRemoveLink(link.id)}
          >
            Remove
          </Button>
        </div>
      ))}
      
      <Button onClick={onAddLink}>
        Add Social Link
      </Button>
    </div>
  );
};
