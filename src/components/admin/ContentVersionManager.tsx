import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RotateCcw, Download, Upload, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ContentVersion {
  id: string;
  timestamp: number;
  contentOverrides: any;
  imageOverrides: any;
  description: string;
}

const ContentVersionManager = () => {
  const [versions, setVersions] = useState<ContentVersion[]>([]);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadVersions();
    checkForChanges();
  }, []);

  const loadVersions = () => {
    try {
      const savedVersions = localStorage.getItem('adminContentVersions');
      if (savedVersions) {
        const parsedVersions = JSON.parse(savedVersions);
        setVersions(parsedVersions.sort((a: ContentVersion, b: ContentVersion) => b.timestamp - a.timestamp));
      }
    } catch (error) {
      console.error('Error loading versions:', error);
    }
  };

  const checkForChanges = () => {
    const contentOverrides = localStorage.getItem('adminContentOverrides');
    const imageOverrides = localStorage.getItem('adminImageOverrides');
    
    const hasContentChanges = contentOverrides && contentOverrides !== '{}';
    const hasImageChanges = imageOverrides && imageOverrides !== '{}';
    
    setHasChanges(hasContentChanges || hasImageChanges);
  };

  const saveCurrentAsVersion = () => {
    try {
      const contentOverrides = localStorage.getItem('adminContentOverrides') || '{}';
      const imageOverrides = localStorage.getItem('adminImageOverrides') || '{}';
      
      const newVersion: ContentVersion = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        contentOverrides: JSON.parse(contentOverrides),
        imageOverrides: JSON.parse(imageOverrides),
        description: `Version vom ${new Date().toLocaleString('de-DE')}`
      };

      const existingVersions = [...versions];
      existingVersions.unshift(newVersion);
      
      // Keep only last 10 versions
      const trimmedVersions = existingVersions.slice(0, 10);
      
      localStorage.setItem('adminContentVersions', JSON.stringify(trimmedVersions));
      setVersions(trimmedVersions);
      
      toast.success('Aktuelle Version gespeichert');
    } catch (error) {
      console.error('Error saving version:', error);
      toast.error('Fehler beim Speichern der Version');
    }
  };

  const restoreVersion = (version: ContentVersion) => {
    try {
      localStorage.setItem('adminContentOverrides', JSON.stringify(version.contentOverrides));
      localStorage.setItem('adminImageOverrides', JSON.stringify(version.imageOverrides));
      
      // Dispatch events to update the UI
      window.dispatchEvent(new CustomEvent('localStorageUpdated', { 
        detail: { key: 'adminContentOverrides', newValue: JSON.stringify(version.contentOverrides) }
      }));
      window.dispatchEvent(new CustomEvent('localStorageUpdated', { 
        detail: { key: 'adminImageOverrides', newValue: JSON.stringify(version.imageOverrides) }
      }));
      
      checkForChanges();
      toast.success('Version wiederhergestellt');
    } catch (error) {
      console.error('Error restoring version:', error);
      toast.error('Fehler beim Wiederherstellen der Version');
    }
  };

  const resetAllChanges = () => {
    localStorage.removeItem('adminContentOverrides');
    localStorage.removeItem('adminImageOverrides');
    
    // Dispatch events to update the UI
    window.dispatchEvent(new CustomEvent('localStorageUpdated', { 
      detail: { key: 'adminContentOverrides', newValue: '{}' }
    }));
    window.dispatchEvent(new CustomEvent('localStorageUpdated', { 
      detail: { key: 'adminImageOverrides', newValue: '{}' }
    }));
    
    checkForChanges();
    toast.success('Alle Änderungen zurückgesetzt');
  };

  const deleteVersion = (versionId: string) => {
    const updatedVersions = versions.filter(v => v.id !== versionId);
    setVersions(updatedVersions);
    localStorage.setItem('adminContentVersions', JSON.stringify(updatedVersions));
    toast.success('Version gelöscht');
  };

  const exportSettings = () => {
    try {
      const contentOverrides = localStorage.getItem('adminContentOverrides') || '{}';
      const imageOverrides = localStorage.getItem('adminImageOverrides') || '{}';
      
      const exportData = {
        contentOverrides: JSON.parse(contentOverrides),
        imageOverrides: JSON.parse(imageOverrides),
        exportedAt: new Date().toISOString(),
        version: '1.0'
      };
      
      const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `website-settings-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success('Einstellungen exportiert');
    } catch (error) {
      console.error('Error exporting settings:', error);
      toast.error('Fehler beim Exportieren');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Versionsverwaltung & Backup</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button 
            onClick={saveCurrentAsVersion}
            disabled={!hasChanges}
            className="flex-1 sm:flex-none"
          >
            <Download className="mr-2 h-4 w-4" />
            Aktuelle Version speichern
          </Button>
          
          <Button onClick={exportSettings} variant="outline" className="flex-1 sm:flex-none">
            <Upload className="mr-2 h-4 w-4" />
            Einstellungen exportieren
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={!hasChanges} className="flex-1 sm:flex-none">
                <RotateCcw className="mr-2 h-4 w-4" />
                Alle zurücksetzen
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Alle Änderungen zurücksetzen?</AlertDialogTitle>
                <AlertDialogDescription>
                  Diese Aktion kann nicht rückgängig gemacht werden. Alle Ihre Änderungen werden entfernt und die Website wird zu den Standardinhalten zurückgesetzt.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                <AlertDialogAction onClick={resetAllChanges}>
                  Zurücksetzen
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {hasChanges && (
          <Badge variant="secondary" className="w-fit">
            Ungespeicherte Änderungen vorhanden
          </Badge>
        )}

        <div className="space-y-2">
          <h4 className="font-medium">Gespeicherte Versionen</h4>
          {versions.length === 0 ? (
            <p className="text-sm text-gray-500">Noch keine Versionen gespeichert</p>
          ) : (
            versions.map((version) => (
              <div key={version.id} className="flex items-center justify-between p-3 border rounded-md">
                <div>
                  <p className="font-medium text-sm">{version.description}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(version.timestamp).toLocaleString('de-DE')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => restoreVersion(version)}
                  >
                    <RotateCcw className="mr-1 h-3 w-3" />
                    Wiederherstellen
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => deleteVersion(version.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ContentVersionManager;
