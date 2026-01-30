
import React, { useState, useCallback, useMemo, memo, lazy, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, ChevronDown } from 'lucide-react';
import { useDebounced } from '@/hooks/useDebounced';

// Common icons subset for immediate loading - most frequently used
const COMMON_ICONS = [
  'Heart', 'Star', 'Check', 'X', 'Plus', 'Minus', 'ArrowRight', 'ArrowLeft',
  'ChevronRight', 'ChevronLeft', 'ChevronDown', 'ChevronUp', 'Menu', 'Home',
  'User', 'Settings', 'Mail', 'Phone', 'Calendar', 'Clock', 'Search', 'Filter',
  'Edit', 'Trash', 'Save', 'Download', 'Upload', 'Share', 'Copy', 'Link',
  'Eye', 'EyeOff', 'Lock', 'Unlock', 'Key', 'Shield', 'Award', 'Gift',
  'MessageCircle', 'MessageSquare', 'Bell', 'AlertCircle', 'Info', 'HelpCircle',
  'Leaf', 'Sun', 'Moon', 'Cloud', 'Sparkles', 'Zap', 'Target', 'TrendingUp',
  'BarChart', 'PieChart', 'Activity', 'Cpu', 'Database', 'Server', 'Globe',
  'Map', 'MapPin', 'Navigation', 'Compass', 'Flag', 'Bookmark', 'Tag',
  'Folder', 'File', 'FileText', 'Image', 'Video', 'Music', 'Camera', 'Mic',
  'Play', 'Pause', 'Square', 'Circle', 'Triangle', 'Hexagon', 'Box',
  'Package', 'ShoppingCart', 'ShoppingBag', 'CreditCard', 'DollarSign', 'Wallet',
  'Users', 'UserPlus', 'UserMinus', 'UserCheck', 'Building', 'Briefcase',
  'GraduationCap', 'BookOpen', 'Lightbulb', 'Rocket', 'Flame', 'Coffee'
];

interface IconSelectorProps {
  value?: string;
  onChange: (iconName: string) => void;
  label?: string;
}

// Dynamic icon component that loads icons on demand
const DynamicIcon = memo(({ name, size = 20 }: { name: string; size?: number }) => {
  const [IconComponent, setIconComponent] = useState<React.ComponentType<any> | null>(null);
  
  React.useEffect(() => {
    let mounted = true;
    
    import('lucide-react').then((module) => {
      if (mounted && module[name as keyof typeof module]) {
        setIconComponent(() => module[name as keyof typeof module] as React.ComponentType<any>);
      }
    }).catch(() => {
      // Icon not found, ignore
    });
    
    return () => { mounted = false; };
  }, [name]);
  
  if (!IconComponent) return <div className="w-5 h-5 bg-muted rounded animate-pulse" />;
  
  return <IconComponent size={size} />;
});

DynamicIcon.displayName = 'DynamicIcon';

const IconSelector = memo(({ value, onChange, label = "Icon" }: IconSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [allIcons, setAllIcons] = useState<string[]>(COMMON_ICONS);
  const [iconsLoaded, setIconsLoaded] = useState(false);
  
  // Debounce search to improve performance
  const debouncedSearchTerm = useDebounced(searchTerm, 200);

  // Load all icons only when popover opens
  const loadAllIcons = useCallback(() => {
    if (iconsLoaded) return;
    
    import('lucide-react').then((module) => {
      const allIconNames = Object.keys(module).filter(
        (name) => 
          name !== 'default' && 
          name !== 'createLucideIcon' && 
          name !== 'Icon' &&
          typeof module[name as keyof typeof module] === 'function'
      );
      setAllIcons(allIconNames);
      setIconsLoaded(true);
    });
  }, [iconsLoaded]);

  // Load all icons when popover opens
  React.useEffect(() => {
    if (isOpen && !iconsLoaded) {
      loadAllIcons();
    }
  }, [isOpen, iconsLoaded, loadAllIcons]);

  const filteredIcons = useMemo(() => {
    if (!debouncedSearchTerm) return allIcons;
    return allIcons.filter(iconName =>
      iconName.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [allIcons, debouncedSearchTerm]);

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
              {value && <DynamicIcon name={value} />}
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
            {!iconsLoaded && (
              <p className="text-xs text-muted-foreground mt-2">Loading all icons...</p>
            )}
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
                    <DynamicIcon name={iconName} />
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
