
import { useState, useEffect } from 'react';
import { useAdminSession } from '@/hooks/useAdminSession';
import AdminDashboard from './AdminDashboard';
import SectionEditor from './SectionEditor';
import SectionList from './SectionList';
import SeoSettings from './SeoSettings';
import MediaLibrary from './MediaLibrary';
import PerformanceDashboard from './PerformanceDashboard';
import GlobalSettings from './GlobalSettings';
import BackupSection from './BackupSection';
import UserManagement from './UserManagement';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock } from 'lucide-react';

interface AdminSectionsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminSections: React.FC<AdminSectionsProps> = ({ activeTab, onTabChange }) => {
  const { userRole } = useAdminSession();
  const [selectedSection, setSelectedSection] = useState<any>(null);
  const [showSectionEditor, setShowSectionEditor] = useState<boolean>(false);

  // Reset state when navigating away from sections tab
  useEffect(() => {
    if (activeTab !== 'sections') {
      setShowSectionEditor(false);
      setSelectedSection(null);
    }
  }, [activeTab]);

  const handleSectionSelect = (section: any) => {
    setSelectedSection(section);
    setShowSectionEditor(true);
  };

  const handleSectionEditorClose = () => {
    setShowSectionEditor(false);
    setSelectedSection(null);
  };

  // Check if current tab requires admin access
  const adminOnlyTabs = ['seo', 'users', 'performance', 'backups'];
  const isAdminOnlyTab = adminOnlyTabs.includes(activeTab);
  const isClientUser = userRole === 'client';

  // Show access denied for client users trying to access admin-only sections
  if (isAdminOnlyTab && isClientUser) {
    return (
      <div className="px-4 sm:px-6 md:px-8 py-6 max-w-7xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Zugriff verweigert</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert>
              <Lock className="h-4 w-4" />
              <AlertDescription>
                Sie haben keine Berechtigung, auf diesen Bereich zuzugreifen. Diese Funktionen sind nur für Administratoren verfügbar.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard onNavigate={onTabChange} userRole={userRole} />;
      case 'sections':
        return showSectionEditor ? (
          <SectionEditor 
            section={selectedSection} 
            onClose={handleSectionEditorClose} 
          />
        ) : (
          <SectionList onSectionSelect={handleSectionSelect} />
        );
      case 'media':
        return <MediaLibrary />;
      case 'seo':
        return <SeoSettings />;
      case 'users':
        return <UserManagement />;
      case 'performance':
        return <PerformanceDashboard />;
      case 'settings':
        return <GlobalSettings />;
      case 'backups':
        return <BackupSection userRole={userRole} />;
      default:
        return <AdminDashboard onNavigate={onTabChange} userRole={userRole} />;
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-8 py-6 max-w-7xl mx-auto">
      {renderContent()}
    </div>
  );
};

export default AdminSections;
