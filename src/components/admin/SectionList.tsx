
import { useState } from 'react';
import { useSections } from '@/hooks/use-sections';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Eye, EyeOff, FileText, Users, Mail, DollarSign, User, Upload } from 'lucide-react';
import ContentImportDialog from './ContentImportDialog';

interface Section {
  id: string;
  name: string;
  component: string;
  visible: boolean;
  order: number;
}

interface SectionListProps {
  onSectionSelect: (section: Section) => void;
}

const SectionList = ({ onSectionSelect }: SectionListProps) => {
  const { sections } = useSections();
  const [showImportDialog, setShowImportDialog] = useState(false);

  const getSectionIcon = (sectionId: string) => {
    switch (sectionId) {
      case 'hero':
        return <FileText className="h-5 w-5" />;
      case 'services':
        return <Users className="h-5 w-5" />;
      case 'about':
        return <User className="h-5 w-5" />;
      case 'pricing':
        return <DollarSign className="h-5 w-5" />;
      case 'contact':
        return <Mail className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getSectionDescription = (sectionId: string) => {
    switch (sectionId) {
      case 'hero':
        return 'Hauptbereich mit Titel, Untertitel und Call-to-Action';
      case 'services':
        return 'Dienstleistungen und Vorteile des Mindset Coachings';
      case 'about':
        return 'Über uns Bereich mit Profilbild und Beschreibung';
      case 'pricing':
        return 'Preise und Pakete mit Einstein-Zitat';
      case 'contact':
        return 'Kontaktinformationen und Kontaktformular';
      default:
        return 'Bearbeitbarer Inhaltsbereich';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">Inhalt verwalten</h1>
          <p className="text-gray-600">
            Wählen Sie einen Bereich aus, um den Inhalt zu bearbeiten.
          </p>
        </div>
        <Button onClick={() => setShowImportDialog(true)} variant="outline">
          <Upload className="h-4 w-4 mr-2" />
          Content Tools
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => (
          <Card key={section.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getSectionIcon(section.id)}
                  <CardTitle className="text-lg">{section.name}</CardTitle>
                </div>
                <Badge variant={section.visible ? "default" : "secondary"}>
                  {section.visible ? (
                    <><Eye className="h-3 w-3 mr-1" /> Sichtbar</>
                  ) : (
                    <><EyeOff className="h-3 w-3 mr-1" /> Versteckt</>
                  )}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">
                {getSectionDescription(section.id)}
              </CardDescription>
              <Button 
                onClick={() => onSectionSelect(section)}
                className="w-full"
                size="sm"
              >
                <Edit className="h-4 w-4 mr-2" />
                Bearbeiten
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <ContentImportDialog 
        isOpen={showImportDialog}
        onClose={() => setShowImportDialog(false)}
      />
    </div>
  );
};

export default SectionList;
