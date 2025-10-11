
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock } from 'lucide-react';
import BackupManager from './BackupManager';
import { AdminRole } from '@/utils/adminAuth';

interface BackupSectionProps {
  userRole: AdminRole;
}

const BackupSection: React.FC<BackupSectionProps> = ({ userRole }) => {
  // Show access denied for non-admin users
  if (userRole === 'user') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Website-Backups</h1>
          <p className="text-gray-600 mt-1">Sichern und wiederherstellen Sie Ihre Website</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Zugriff verweigert</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert>
              <Lock className="h-4 w-4" />
              <AlertDescription>
                Backup-Funktionen sind nur für Administratoren verfügbar. Wenden Sie sich an Ihren Administrator, wenn Sie Zugriff auf diese Funktionen benötigen.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Website-Backups</h1>
        <p className="text-gray-600 mt-1">Sichern und wiederherstellen Sie Ihre Website</p>
      </div>

      <BackupManager userRole={userRole} />
    </div>
  );
};

export default BackupSection;
