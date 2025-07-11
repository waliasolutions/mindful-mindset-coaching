
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

// Define types for backup data
export interface WebsiteBackup {
  id: string;
  name: string;
  description: string | null;
  backup_data: Record<string, any>;
  created_at: string;
  created_by: string | null;
  file_size: number | null;
  version: string;
}

export interface BackupMetadata {
  timestamp: string;
  backupName: string;
  description?: string;
  version: string;
}

export interface CreateBackupOptions {
  name: string;
  description?: string;
}

// Helper to check if user is authenticated
const checkAuthentication = async (): Promise<boolean> => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.user) {
    toast({
      title: "Anmeldung erforderlich",
      description: "Sie müssen angemeldet sein, um Backups zu erstellen oder zu verwalten.",
      variant: "destructive",
    });
    return false;
  }
  return true;
};

// Helper to collect all website data that needs to be backed up
const collectWebsiteData = async (): Promise<Record<string, any>> => {
  // Collect all data from localStorage
  const localStorageData: Record<string, any> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key) {
      try {
        // Skip session-related data
        if (key.startsWith('supabase.auth') || key.startsWith('adminLockout') || key.startsWith('adminAuth')) {
          continue;
        }
        
        const value = localStorage.getItem(key);
        if (value) {
          // Try to parse JSON if possible
          try {
            localStorageData[key] = JSON.parse(value);
          } catch {
            localStorageData[key] = value;
          }
        }
      } catch (error) {
        console.error(`Error collecting localStorage data for key ${key}:`, error);
      }
    }
  }

  return {
    localStorageData,
    timestamp: new Date().toISOString(),
    version: '1.0'
  };
};

// Create a new backup and store it in Supabase
export const createBackup = async (options: CreateBackupOptions): Promise<WebsiteBackup | null> => {
  try {
    // Check authentication first
    if (!(await checkAuthentication())) {
      return null;
    }

    const websiteData = await collectWebsiteData();
    const serializedData = JSON.stringify(websiteData);
    const fileSize = new Blob([serializedData]).size;
    
    const { data, error } = await supabase
      .from('website_backups')
      .insert({
        name: options.name,
        description: options.description || null,
        backup_data: websiteData,
        file_size: fileSize,
      })
      .select()
      .single();
    
    if (error) {
      console.error('Error creating backup:', error);
      
      // Provide more specific error messages
      if (error.code === 'PGRST116') {
        toast({
          title: "Backup fehlgeschlagen",
          description: "Sie sind nicht berechtigt, Backups zu erstellen. Bitte melden Sie sich an.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Backup fehlgeschlagen",
          description: `Fehler beim Erstellen des Backups: ${error.message}`,
          variant: "destructive",
        });
      }
      return null;
    }
    
    toast({
      title: "Backup erstellt",
      description: `Das Backup "${options.name}" wurde erfolgreich erstellt.`,
      variant: "default",
    });
    
    return data as WebsiteBackup;
  } catch (error) {
    console.error('Error in createBackup:', error);
    toast({
      title: "Backup fehlgeschlagen",
      description: "Ein unerwarteter Fehler ist aufgetreten.",
      variant: "destructive",
    });
    return null;
  }
};

// Get all backups for the current user
export const getBackups = async (): Promise<WebsiteBackup[]> => {
  try {
    // Check authentication first
    if (!(await checkAuthentication())) {
      return [];
    }

    const { data, error } = await supabase
      .from('website_backups')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching backups:', error);
      
      if (error.code === 'PGRST116') {
        toast({
          title: "Zugriff verweigert",
          description: "Sie sind nicht berechtigt, Backups anzuzeigen. Bitte melden Sie sich an.",
          variant: "destructive",
        });
      }
      return [];
    }
    
    return data as WebsiteBackup[];
  } catch (error) {
    console.error('Error in getBackups:', error);
    return [];
  }
};

// Get a single backup by ID
export const getBackupById = async (id: string): Promise<WebsiteBackup | null> => {
  try {
    // Check authentication first
    if (!(await checkAuthentication())) {
      return null;
    }

    const { data, error } = await supabase
      .from('website_backups')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('Error fetching backup:', error);
      return null;
    }
    
    return data as WebsiteBackup;
  } catch (error) {
    console.error('Error in getBackupById:', error);
    return null;
  }
};

// Delete a backup by ID
export const deleteBackup = async (id: string): Promise<boolean> => {
  try {
    // Check authentication first
    if (!(await checkAuthentication())) {
      return false;
    }

    const { error } = await supabase
      .from('website_backups')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting backup:', error);
      
      if (error.code === 'PGRST116') {
        toast({
          title: "Löschen fehlgeschlagen",
          description: "Sie sind nicht berechtigt, dieses Backup zu löschen.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Löschen fehlgeschlagen",
          description: `Fehler beim Löschen des Backups: ${error.message}`,
          variant: "destructive",
        });
      }
      return false;
    }
    
    toast({
      title: "Backup gelöscht",
      description: "Das Backup wurde erfolgreich gelöscht.",
      variant: "default",
    });
    
    return true;
  } catch (error) {
    console.error('Error in deleteBackup:', error);
    toast({
      title: "Löschen fehlgeschlagen",
      description: "Ein unerwarteter Fehler ist aufgetreten.",
      variant: "destructive",
    });
    return false;
  }
};

// Restore website from a backup
export const restoreFromBackup = async (backup: WebsiteBackup): Promise<boolean> => {
  try {
    // Check authentication first
    if (!(await checkAuthentication())) {
      return false;
    }

    // Create a backup before restoring as a safety measure
    await createBackup({
      name: `Auto-Backup vor Wiederherstellung (${new Date().toLocaleString('de-DE')})`,
      description: `Automatisches Backup vor der Wiederherstellung von "${backup.name}"`
    });
    
    // Restore data to localStorage
    const { localStorageData } = backup.backup_data;
    
    if (!localStorageData) {
      toast({
        title: "Wiederherstellung fehlgeschlagen",
        description: "Die Backup-Daten sind ungültig oder beschädigt.",
        variant: "destructive",
      });
      return false;
    }
    
    // Clear existing localStorage items (except authentication)
    const keysToPreserve = Object.keys(localStorage).filter(key => 
      key.startsWith('supabase.auth') || 
      key.startsWith('adminLockout') || 
      key.startsWith('adminAuth')
    );
    
    const preservedData: Record<string, string> = {};
    keysToPreserve.forEach(key => {
      const value = localStorage.getItem(key);
      if (value) preservedData[key] = value;
    });
    
    // Clear localStorage (non-auth items)
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key && !keysToPreserve.includes(key)) {
        localStorage.removeItem(key);
      }
    }
    
    // Restore from backup
    Object.entries(localStorageData).forEach(([key, value]) => {
      try {
        localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
      } catch (error) {
        console.error(`Error restoring key ${key}:`, error);
      }
    });
    
    // Restore preserved auth data
    Object.entries(preservedData).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
    
    // Trigger a storage event so components can react to the changes
    window.dispatchEvent(new CustomEvent('localStorageUpdated', { 
      detail: { key: 'backupRestored', newValue: new Date().toISOString() }
    }));
    
    toast({
      title: "Wiederherstellung erfolgreich",
      description: `Die Website wurde erfolgreich auf den Stand "${backup.name}" zurückgesetzt.`,
      variant: "default",
    });
    
    return true;
  } catch (error) {
    console.error('Error in restoreFromBackup:', error);
    toast({
      title: "Wiederherstellung fehlgeschlagen",
      description: "Ein unerwarteter Fehler ist aufgetreten.",
      variant: "destructive",
    });
    return false;
  }
};

// Check if user is authenticated and can access backups
export const checkBackupAccess = async (): Promise<boolean> => {
  return await checkAuthentication();
};

// Format file size for display
export const formatFileSize = (bytes: number | null): string => {
  if (bytes === null) return 'Unbekannt';
  
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  else return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
};
