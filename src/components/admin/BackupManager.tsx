import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { WebsiteBackup, getBackups, createBackup, deleteBackup, restoreFromBackup, formatFileSize } from '@/utils/backupManager';
import { Loader2, Save, Trash, RefreshCcw, FileText, AlertTriangle, Info } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { AdminRole } from '@/utils/adminAuth';
import { supabase } from '@/integrations/supabase/client';

interface BackupManagerProps {
  userRole: AdminRole;
}

const BackupManager: React.FC<BackupManagerProps> = ({ userRole }) => {
  const [backups, setBackups] = useState<WebsiteBackup[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [previewBackup, setPreviewBackup] = useState<WebsiteBackup | null>(null);
  const [restoreConfirmOpen, setRestoreConfirmOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [selectedBackupId, setSelectedBackupId] = useState<string | null>(null);
  
  // Form state for creating a new backup
  const [backupName, setBackupName] = useState('');
  const [backupDescription, setBackupDescription] = useState('');
  
  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      console.log('Authentication status:', !!session);
    };
    
    checkAuth();
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      console.log('Auth state changed:', event, !!session);
    });
    
    return () => subscription.unsubscribe();
  }, []);
  
  // Load backups on component mount and when authentication changes
  useEffect(() => {
    if (isAuthenticated) {
      loadBackups();
    } else {
      setBackups([]);
      setLoading(false);
    }
  }, [isAuthenticated]);
  
  const loadBackups = async () => {
    setLoading(true);
    try {
      console.log('Loading backups...');
      const data = await getBackups();
      console.log('Loaded backups:', data);
      setBackups(data);
    } catch (error) {
      console.error('Error loading backups:', error);
      toast({
        title: 'Fehler',
        description: 'Die Backups konnten nicht geladen werden.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleCreateBackup = async () => {
    if (!backupName.trim()) {
      toast({
        title: 'Fehlende Informationen',
        description: 'Bitte geben Sie einen Namen für das Backup ein.',
        variant: 'destructive',
      });
      return;
    }
    
    setCreating(true);
    try {
      const newBackup = await createBackup({
        name: backupName,
        description: backupDescription,
      });
      
      if (newBackup) {
        // Add the new backup to the list
        setBackups([newBackup, ...backups]);
        // Reset form
        setBackupName('');
        setBackupDescription('');
      }
    } catch (error) {
      console.error('Error creating backup:', error);
      toast({
        title: 'Fehler',
        description: 'Das Backup konnte nicht erstellt werden.',
        variant: 'destructive',
      });
    } finally {
      setCreating(false);
    }
  };
  
  const handleDeleteBackup = async (id: string) => {
    setSelectedBackupId(id);
    setDeleteConfirmOpen(true);
  };
  
  const confirmDeleteBackup = async () => {
    if (!selectedBackupId) return;
    
    try {
      const success = await deleteBackup(selectedBackupId);
      if (success) {
        setBackups(backups.filter(backup => backup.id !== selectedBackupId));
      }
    } catch (error) {
      console.error('Error deleting backup:', error);
      toast({
        title: 'Fehler',
        description: 'Das Backup konnte nicht gelöscht werden.',
        variant: 'destructive',
      });
    } finally {
      setSelectedBackupId(null);
      setDeleteConfirmOpen(false);
    }
  };
  
  const handleRestoreBackup = (backup: WebsiteBackup) => {
    setPreviewBackup(backup);
    setRestoreConfirmOpen(true);
  };
  
  const confirmRestoreBackup = async () => {
    if (!previewBackup) return;
    
    setRestoring(true);
    try {
      const success = await restoreFromBackup(previewBackup);
      if (success) {
        toast({
          title: 'Erfolg',
          description: 'Die Website wurde erfolgreich wiederhergestellt. Die Seite wird in 3 Sekunden neu geladen...',
          variant: 'default',
        });
        
        // Reload the page after a short delay to apply all restored settings
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.error('Error restoring backup:', error);
      toast({
        title: 'Fehler',
        description: 'Die Website konnte nicht wiederhergestellt werden.',
        variant: 'destructive',
      });
    } finally {
      setRestoring(false);
      setRestoreConfirmOpen(false);
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('de-DE', {
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Show authentication required message if not authenticated
  if (!isAuthenticated) {
    return (
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Website-Backups</CardTitle>
          <CardDescription>
            Erstellen und verwalten Sie Backups Ihrer Website
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Sie müssen angemeldet sein, um Backups zu erstellen und zu verwalten. Bitte melden Sie sich zuerst an.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Website-Backups</CardTitle>
        <CardDescription>
          Erstellen und verwalten Sie Backups Ihrer Website
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="list">
          <TabsList className="mb-4">
            <TabsTrigger value="list">Gespeicherte Backups</TabsTrigger>
            <TabsTrigger value="create">Neues Backup erstellen</TabsTrigger>
          </TabsList>
          
          <TabsContent value="list">
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-forest" />
              </div>
            ) : backups.length === 0 ? (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Es wurden noch keine Backups erstellt. Wechseln Sie zur Registerkarte "Neues Backup erstellen", um Ihr erstes Backup zu erstellen.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="space-y-4">
                {backups.map((backup) => (
                  <div key={backup.id} className="border rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-50">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{backup.name}</h3>
                        <Badge variant="outline" className="bg-blue-50 text-blue-600 text-xs">v{backup.version}</Badge>
                      </div>
                      <p className="text-sm text-gray-500">{formatDate(backup.created_at)}</p>
                      {backup.description && (
                        <p className="text-sm text-gray-700 mt-1">{backup.description}</p>
                      )}
                      <div className="text-xs text-gray-500 mt-1">
                        Größe: {formatFileSize(backup.file_size)}
                      </div>
                    </div>
                    <div className="flex gap-2 self-end sm:self-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        onClick={() => handleRestoreBackup(backup)}
                      >
                        <RefreshCcw className="h-4 w-4 mr-1" />
                        Wiederherstellen
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm" 
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteBackup(backup.id)}
                      >
                        <Trash className="h-4 w-4 mr-1" />
                        Löschen
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="create">
            <div className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Ein Backup speichert alle aktuellen Website-Inhalte, Einstellungen und Layoutkonfigurationen.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="backup-name">Backup-Name</Label>
                  <Input
                    id="backup-name"
                    placeholder="z.B. Vor Neugestaltung der Startseite"
                    value={backupName}
                    onChange={(e) => setBackupName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="backup-description">Beschreibung (optional)</Label>
                  <Textarea
                    id="backup-description"
                    placeholder="Beschreiben Sie kurz den aktuellen Stand der Website"
                    value={backupDescription}
                    onChange={(e) => setBackupDescription(e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                </div>
                
                <Button 
                  onClick={handleCreateBackup} 
                  disabled={creating || !backupName.trim()}
                  className="mt-4"
                >
                  {creating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Backup wird erstellt...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Backup erstellen
                    </>
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Backup löschen</DialogTitle>
              <DialogDescription>
                Sind Sie sicher, dass Sie dieses Backup löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setDeleteConfirmOpen(false)}
              >
                Abbrechen
              </Button>
              <Button 
                variant="destructive" 
                onClick={confirmDeleteBackup}
              >
                <Trash className="h-4 w-4 mr-2" />
                Backup löschen
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Restore Confirmation Dialog */}
        <Dialog open={restoreConfirmOpen} onOpenChange={setRestoreConfirmOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Website wiederherstellen</DialogTitle>
              <DialogDescription>
                Möchten Sie die Website auf den Stand des Backups "{previewBackup?.name}" vom {previewBackup && formatDate(previewBackup.created_at)} zurücksetzen?
              </DialogDescription>
            </DialogHeader>
            
            <div className="bg-orange-50 border border-orange-200 rounded-md p-3 my-4">
              <div className="flex gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500 flex-shrink-0" />
                <div className="text-sm text-orange-800">
                  <p className="font-medium">Wichtiger Hinweis</p>
                  <p>Alle nicht gespeicherten Änderungen gehen verloren. Ein automatisches Backup des aktuellen Zustands wird erstellt, bevor die Wiederherstellung durchgeführt wird.</p>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setRestoreConfirmOpen(false)}
              >
                Abbrechen
              </Button>
              <Button 
                onClick={confirmRestoreBackup}
                disabled={restoring}
              >
                {restoring ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Wird wiederhergestellt...
                  </>
                ) : (
                  <>
                    <RefreshCcw className="h-4 w-4 mr-2" />
                    Website wiederherstellen
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default BackupManager;
