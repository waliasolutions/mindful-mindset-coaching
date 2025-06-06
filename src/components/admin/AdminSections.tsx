
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
