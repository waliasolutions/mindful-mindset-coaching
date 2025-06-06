
import { useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import IconSelector from './IconSelector';
import * as LucideIcons from 'lucide-react';

interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface BenefitsEditorProps {
  benefits: Benefit[];
  onChange: (benefits: Benefit[]) => void;
}

const BenefitsEditor = ({ benefits, onChange }: BenefitsEditorProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);

  const addBenefit = useCallback(() => {
    const newBenefit: Benefit = {
      id: `benefit-${Date.now()}`,
      title: 'Neuer Vorteil',
      description: 'Beschreibung des Vorteils',
      icon: 'Star'
    };
    onChange([...benefits, newBenefit]);
    setEditingId(newBenefit.id);
  }, [benefits, onChange]);

  const updateBenefit = useCallback((id: string, updates: Partial<Benefit>) => {
    const updatedBenefits = benefits.map(benefit => 
      benefit.id === id ? { ...benefit, ...updates } : benefit
    );
    onChange(updatedBenefits);
  }, [benefits, onChange]);

  const deleteBenefit = useCallback((id: string) => {
    const filteredBenefits = benefits.filter(benefit => benefit.id !== id);
    onChange(filteredBenefits);
    if (editingId === id) {
      setEditingId(null);
    }
  }, [benefits, onChange, editingId]);

  const toggleEditing = useCallback((id: string) => {
    setEditingId(current => current === id ? null : id);
  }, []);

  const renderIcon = useCallback((iconName: string) => {
    const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as any;
    if (!IconComponent) return null;
    return <IconComponent size={20} className="text-white" />;
  }, []);

  const benefitItems = useMemo(() => {
    return benefits.map((benefit) => (
      <Card key={benefit.id} className="relative">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-gray-400" />
              <div className="w-8 h-8 rounded-full bg-forest flex items-center justify-center">
                {renderIcon(benefit.icon)}
              </div>
              <CardTitle className="text-base">{benefit.title}</CardTitle>
            </div>
            <div className="flex gap-2">
              <Button
                variant={editingId === benefit.id ? "default" : "outline"}
                size="sm"
                onClick={() => toggleEditing(benefit.id)}
              >
                {editingId === benefit.id ? 'Fertig' : 'Bearbeiten'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => deleteBenefit(benefit.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        {editingId === benefit.id && (
          <CardContent className="space-y-4">
            <div>
              <Input
                value={benefit.title}
                onChange={(e) => updateBenefit(benefit.id, { title: e.target.value })}
                placeholder="Titel des Vorteils"
              />
            </div>
            <div>
              <Textarea
                value={benefit.description}
                onChange={(e) => updateBenefit(benefit.id, { description: e.target.value })}
                placeholder="Beschreibung des Vorteils"
                className="min-h-[80px]"
              />
            </div>
            <IconSelector
              value={benefit.icon}
              onChange={(iconName) => updateBenefit(benefit.id, { icon: iconName })}
              label="Icon auswählen"
            />
          </CardContent>
        )}
      </Card>
    ));
  }, [benefits, editingId, renderIcon, toggleEditing, deleteBenefit, updateBenefit]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Vorteile verwalten</h3>
        <Button onClick={addBenefit} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Vorteil hinzufügen
        </Button>
      </div>
      
      <div className="space-y-3">
        {benefitItems}
      </div>

      {benefits.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>Noch keine Vorteile hinzugefügt.</p>
          <Button onClick={addBenefit} className="mt-2">
            Ersten Vorteil hinzufügen
          </Button>
        </div>
      )}
    </div>
  );
};

export default BenefitsEditor;
