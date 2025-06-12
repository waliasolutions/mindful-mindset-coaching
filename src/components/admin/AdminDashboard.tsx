
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Image, Settings, Activity, Save, Users, Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AdminRole } from '@/utils/adminAuth';

interface AdminDashboardProps {
  onNavigate: (section: string) => void;
  userRole: AdminRole;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate, userRole }) => {
  const [stats, setStats] = useState({
    totalSections: 0,
    mediaItems: 0,
    recentUpdates: 0
  });

  useEffect(() => {
    // Load dashboard statistics
    const loadStats = () => {
      // Get sections count from localStorage
      const sections = JSON.parse(localStorage.getItem('sections') || '[]');
      
      // Get media items count (if available)
      const mediaItems = JSON.parse(localStorage.getItem('mediaLibrary') || '[]');
      
      setStats({
        totalSections: sections.length,
        mediaItems: mediaItems.length,
        recentUpdates: sections.filter((section: any) => {
          const updated = new Date(section.updatedAt || section.createdAt);
          const weekAgo = new Date();
          weekAgo.setDate(weekAgo.getDate() - 7);
          return updated > weekAgo;
        }).length
      });
    };

    loadStats();
    
    // Listen for storage changes to update stats
    const handleStorageChange = () => loadStats();
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageUpdated', handleStorageChange);
    };
  }, []);

  // Define quick actions based on user role
  const getQuickActions = () => {
    const baseActions = [
      { 
        id: 'sections', 
        title: 'Neuen Inhalt erstellen', 
        description: 'Erstellen Sie neue Abschnitte für Ihre Website',
        icon: Plus,
        color: 'bg-blue-500'
      },
      { 
        id: 'media', 
        title: 'Medien verwalten', 
        description: 'Bilder und Dateien hochladen und verwalten',
        icon: Image,
        color: 'bg-green-500'
      },
      { 
        id: 'settings', 
        title: 'Einstellungen', 
        description: 'Website-Einstellungen konfigurieren',
        icon: Settings,
        color: 'bg-gray-500'
      },
    ];

    // Add admin-only actions
    if (userRole === 'admin') {
      baseActions.push(
        { 
          id: 'seo', 
          title: 'SEO optimieren', 
          description: 'Meta-Tags und SEO-Einstellungen verwalten',
          icon: Globe,
          color: 'bg-purple-500'
        },
        { 
          id: 'users', 
          title: 'Benutzer verwalten', 
          description: 'Benutzer und Berechtigungen verwalten',
          icon: Users,
          color: 'bg-orange-500'
        },
        { 
          id: 'backups', 
          title: 'Backup erstellen', 
          description: 'Sichern Sie Ihre Website-Daten',
          icon: Save,
          color: 'bg-indigo-500'
        },
        { 
          id: 'performance', 
          title: 'Leistung', 
          description: 'Website-Performance überwachen',
          icon: Activity,
          color: 'bg-red-500'
        }
      );
    }

    return baseActions;
  };

  const quickActions = getQuickActions();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Willkommen im Content Management System</p>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="outline">{userRole === 'admin' ? 'Administrator' : 'Client'}</Badge>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inhaltsbereiche</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSections}</div>
            <p className="text-xs text-muted-foreground">Aktive Abschnitte</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medien</CardTitle>
            <Image className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.mediaItems}</div>
            <p className="text-xs text-muted-foreground">Hochgeladene Dateien</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Letzte Änderungen</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.recentUpdates}</div>
            <p className="text-xs text-muted-foreground">Diese Woche</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Schnellaktionen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action) => (
              <Button
                key={action.id}
                variant="outline"
                className="h-auto p-4 flex flex-col items-start space-y-2 hover:shadow-md transition-shadow"
                onClick={() => onNavigate(action.id)}
              >
                <div className={`p-2 rounded-md ${action.color} text-white`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-sm text-muted-foreground">{action.description}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Letzte Aktivitäten</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Hier werden Ihre letzten Änderungen angezeigt...
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
