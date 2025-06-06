
import React, { useState, useCallback, useMemo, memo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, ChevronDown } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useDebounced } from '@/hooks/useDebounced';

interface IconSelectorProps {
  value?: string;
  onChange: (iconName: string) => void;
  label?: string;
}

const IconSelector = memo(({ value, onChange, label = "Icon" }: IconSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Debounce search to improve performance
  const debouncedSearchTerm = useDebounced(searchTerm, 200);

  // Memoize available icons to prevent recalculation
  const availableIcons = useMemo(() => {
    return Object.keys(LucideIcons).filter(
      (name) => 
        name !== 'default' && 
        name !== 'createLucideIcon' && 
        name !== 'Icon' &&
        typeof LucideIcons[name as keyof typeof LucideIcons] === 'function'
    );
  }, []);

  const filteredIcons = useMemo(() => {
    if (!debouncedSearchTerm) return availableIcons;
    return availableIcons.filter(iconName =>
      iconName.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [availableIcons, debouncedSearchTerm]);

  const renderIcon = useCallback((iconName: string) => {
    try {
      const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as any;
      if (!IconComponent) return null;
      return <IconComponent size={20} />;
    } catch (error) {
      console.warn(`Failed to render icon: ${iconName}`, error);
      return null;
    }
  }, []);

  const getDisplayName = useCallback((iconName: string) => {
    return iconName
      .split(/(?=[A-Z])/)
      .join(' ')
      .toLowerCase()
      .replace(/^\w/, c => c.toUpperCase());
  }, []);

  const handleIconSelect = useCallback((iconName: string) => {
    onChange(iconName);
    setIsOpen(false);
    setSearchTerm('');
  }, [onChange]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleOpenChange = useCallback((open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setSearchTerm('');
    }
  }, []);

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
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
                onChange={handleSearchChange}
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
                  onClick={() => handleIconSelect(iconName)}
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
}, (prevProps, nextProps) => {
  return prevProps.value === nextProps.value && prevProps.label === nextProps.label;
});

IconSelector.displayName = 'IconSelector';

export default IconSelector;
