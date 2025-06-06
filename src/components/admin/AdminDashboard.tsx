
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, Users, FileText, Image, Globe, TrendingUp, Trash, X } from 'lucide-react';
import { AdminRole } from '@/utils/adminAuth';
import { toast } from '@/components/ui/use-toast';

interface DashboardStats {
  totalSections: number;
  imagesUploaded: number;
  lastUpdated: string;
  websiteViews: number;
}

interface AdminDashboardProps {
  onNavigate?: (tab: string) => void;
  userRole: AdminRole;
}

interface ActivityItem {
  id: string;
  type: 'blue' | 'green' | 'purple';
  text: string;
  time: string;
}

const AdminDashboard = ({ onNavigate, userRole }: AdminDashboardProps) => {
  const [stats] = useState<DashboardStats>({
    totalSections: 5,
    imagesUploaded: 8,
    lastUpdated: new Date().toLocaleDateString('de-DE'),
    websiteViews: 0
  });

  // Convert hardcoded activities to state
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: '1',
      type: 'blue',
      text: 'Hero-Bereich aktualisiert',
      time: 'vor 2 Stunden'
    },
    {
      id: '2',
      type: 'green',
      text: 'Neues Bild hochgeladen',
      time: 'vor 1 Tag'
    },
    {
      id: '3',
      type: 'purple',
      text: 'SEO-Einstellungen optimiert',
      time: 'vor 3 Tagen'
    }
  ]);

  const isAdmin = userRole === 'admin';

  // Filter quick actions based on role
  const quickActions = [
    { icon: FileText, label: 'Inhalte bearbeiten', action: 'sections' },
    { icon: Image, label: 'Medienbibliothek', action: 'media' },
    { icon: Globe, label: 'SEO Einstellungen', action: 'seo' },
    ...(isAdmin ? [{ icon: Activity, label: 'Leistung', action: 'performance' }] : [])
  ];

  const handleQuickAction = (action: string) => {
    if (onNavigate) {
      onNavigate(action);
    }
  };

  // Handler to delete a single activity
  const handleDeleteActivity = (id: string) => {
    setActivities(activities.filter(activity => activity.id !== id));
    toast({
      title: "Aktivität gelöscht",
      description: "Die Aktivität wurde erfolgreich entfernt."
    });
  };

  // Handler to delete all activities
  const handleDeleteAllActivities = () => {
    setActivities([]);
    toast({
      title: "Alle Aktivitäten gelöscht",
      description: "Alle Aktivitäten wurden erfolgreich entfernt."
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Verwalten Sie Ihre Website-Inhalte und Einstellungen</p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
          Website Online
        </Badge>
      </div>

      {/* Stats Grid - Only show for admin users */}
      {isAdmin && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Inhaltsbereiche</CardTitle>
              <FileText className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">{stats.totalSections}</div>
              <p className="text-xs text-blue-600 mt-1">Aktive Bereiche</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700">Mediendateien</CardTitle>
              <Image className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">{stats.imagesUploaded}</div>
              <p className="text-xs text-green-600 mt-1">Hochgeladene Bilder</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700">Letzte Aktualisierung</CardTitle>
              <Activity className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-purple-900">{stats.lastUpdated}</div>
              <p className="text-xs text-purple-600 mt-1">Inhalt geändert</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700">Leistung</CardTitle>
              <TrendingUp className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">Schnell</div>
              <p className="text-xs text-orange-600 mt-1">Ladegeschwindigkeit</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Schnellaktionen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="h-20 flex flex-col gap-2 hover:bg-gray-50 transition-colors"
                  onClick={() => handleQuickAction(action.action)}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-sm">{action.label}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Letzte Aktivitäten</CardTitle>
          {activities.length > 0 && (
            <Button 
              variant="outline" 
              size="sm" 
              className="text-red-500 hover:bg-red-50 hover:text-red-600 border-red-200"
              onClick={handleDeleteAllActivities}
            >
              <Trash className="h-4 w-4 mr-1" />
              Alle löschen
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {activities.length === 0 ? (
            <p className="text-sm text-gray-500 italic text-center py-4">Keine Aktivitäten vorhanden</p>
          ) : (
            <div className="space-y-3">
              {activities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'blue' ? 'bg-blue-500' : 
                      activity.type === 'green' ? 'bg-green-500' : 'bg-purple-500'
                    }`}></div>
                    <span className="text-sm">{activity.text}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{activity.time}</span>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 text-gray-400 hover:text-red-500"
                      onClick={() => handleDeleteActivity(activity.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
