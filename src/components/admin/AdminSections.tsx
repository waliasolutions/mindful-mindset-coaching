
import { useState } from 'react';
import { useAdminSession } from '@/hooks/useAdminSession';
import AdminDashboard from './AdminDashboard';
import SectionEditor from './SectionEditor';
import SectionList from './SectionList';
import SeoSettings from './SeoSettings';
import MediaLibrary from './MediaLibrary';
import PerformanceDashboard from './PerformanceDashboard';
import GlobalSettings from './GlobalSettings';
import BackupSection from './BackupSection';

interface AdminSectionsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminSections: React.FC<AdminSectionsProps> = ({ activeTab, onTabChange }) => {
  const { userRole } = useAdminSession();
  const [selectedSection, setSelectedSection] = useState<any>(null);
  const [showSectionEditor, setShowSectionEditor] = useState<boolean>(false);

  const handleSectionSelect = (section: any) => {
    setSelectedSection(section);
    setShowSectionEditor(true);
  };

  const handleSectionEditorClose = () => {
    setShowSectionEditor(false);
    // Don't reset selectedSection immediately to avoid rendering issues
    setTimeout(() => {
      setSelectedSection(null);
    }, 100);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard onNavigate={onTabChange} userRole={userRole} />;
      case 'sections':
        // Simplified condition - only check showSectionEditor
        return showSectionEditor && selectedSection ? (
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
