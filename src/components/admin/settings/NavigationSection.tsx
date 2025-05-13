
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { NavItem } from './types';

interface NavigationSectionProps {
  navigation: NavItem[];
  onNavigationChange: (id: string, field: string, value: string) => void;
  onAddItem: () => void;
  onRemoveItem: (id: string) => void;
}

export const NavigationSection: React.FC<NavigationSectionProps> = ({
  navigation,
  onNavigationChange,
  onAddItem,
  onRemoveItem
}) => {
  return (
    <div className="space-y-4">
      {navigation.map(item => (
        <div key={item.id} className="p-4 border rounded-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
            <div>
              <Label htmlFor={`nav-label-${item.id}`}>Label</Label>
              <Input 
                id={`nav-label-${item.id}`} 
                value={item.label}
                onChange={(e) => onNavigationChange(item.id, 'label', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor={`nav-url-${item.id}`}>URL</Label>
              <Input 
                id={`nav-url-${item.id}`} 
                value={item.url}
                onChange={(e) => onNavigationChange(item.id, 'url', e.target.value)}
              />
            </div>
          </div>
          
          <Button 
            variant="destructive" 
            size="sm"
            onClick={() => onRemoveItem(item.id)}
          >
            Remove
          </Button>
        </div>
      ))}
      
      <Button onClick={onAddItem}>
        Add Navigation Item
      </Button>
    </div>
  );
};
