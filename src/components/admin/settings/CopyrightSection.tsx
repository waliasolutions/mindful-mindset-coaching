
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface CopyrightSectionProps {
  copyrightText: string;
  onChange: (value: string) => void;
}

export const CopyrightSection: React.FC<CopyrightSectionProps> = ({
  copyrightText,
  onChange
}) => {
  return (
    <div>
      <Label htmlFor="copyright-text">Copyright Text</Label>
      <Input 
        id="copyright-text" 
        value={copyrightText}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
