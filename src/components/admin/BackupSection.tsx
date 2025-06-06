
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BackupManager from './BackupManager';
import { AdminRole } from '@/utils/adminAuth';

interface BackupSectionProps {
  userRole: AdminRole;
}

const BackupSection: React.FC<BackupSectionProps> = ({ userRole }) => {
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
