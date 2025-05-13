
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LegalLink } from './types';

interface LegalLinksSectionProps {
  legalLinks: LegalLink[];
  onLegalLinkChange: (id: string, field: string, value: string) => void;
  onAddLink: () => void;
  onRemoveLink: (id: string) => void;
}

export const LegalLinksSection: React.FC<LegalLinksSectionProps> = ({
  legalLinks,
  onLegalLinkChange,
  onAddLink,
  onRemoveLink
}) => {
  return (
    <div>
      <h3 className="text-sm font-medium mb-2">Legal Links</h3>
      {legalLinks.map(link => (
        <div key={link.id} className="p-4 border rounded-md mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
            <div>
              <Label htmlFor={`legal-label-${link.id}`}>Label</Label>
              <Input 
                id={`legal-label-${link.id}`} 
                value={link.label}
                onChange={(e) => onLegalLinkChange(link.id, 'label', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor={`legal-url-${link.id}`}>URL</Label>
              <Input 
                id={`legal-url-${link.id}`} 
                value={link.url}
                onChange={(e) => onLegalLinkChange(link.id, 'url', e.target.value)}
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
        Add Legal Link
      </Button>
    </div>
  );
};
