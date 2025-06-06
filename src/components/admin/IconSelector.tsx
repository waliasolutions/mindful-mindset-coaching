
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, ChevronDown } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface IconSelectorProps {
  value?: string;
  onChange: (iconName: string) => void;
  label?: string;
}

const IconSelector = ({ value, onChange, label = "Icon" }: IconSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Get all available icons (excluding React components and other non-icon exports)
  const availableIcons = Object.keys(LucideIcons).filter(
    (name) => 
      name !== 'default' && 
      name !== 'createLucideIcon' && 
      name !== 'Icon' &&
      typeof LucideIcons[name as keyof typeof LucideIcons] === 'function'
  );

  const filteredIcons = availableIcons.filter(iconName =>
    iconName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderIcon = (iconName: string) => {
    const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as any;
    if (!IconComponent) return null;
    return <IconComponent size={20} />;
  };

  const getDisplayName = (iconName: string) => {
    return iconName
      .split(/(?=[A-Z])/)
      .join(' ')
      .toLowerCase()
      .replace(/^\w/, c => c.toUpperCase());
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            className="w-full justify-between"
          >
            <div className="flex items-center gap-2">
              {value && renderIcon(value)}
              <span>{value ? getDisplayName(value) : "Select icon..."}</span>
            </div>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search icons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
          <ScrollArea className="h-60">
            <div className="grid grid-cols-1 gap-1 p-2">
              {filteredIcons.map((iconName) => (
                <Button
                  key={iconName}
                  variant={value === iconName ? "default" : "ghost"}
                  className="justify-start h-auto p-2"
                  onClick={() => {
                    onChange(iconName);
                    setIsOpen(false);
                  }}
                >
                  <div className="flex items-center gap-2">
                    {renderIcon(iconName)}
                    <span className="text-sm">{getDisplayName(iconName)}</span>
                  </div>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default IconSelector;
