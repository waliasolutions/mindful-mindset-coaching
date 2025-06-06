
import { useState } from 'react';
import { useAdminSession } from '@/hooks/useAdminSession';
import AdminDashboard from './AdminDashboard';
import SectionEditor from './SectionEditor';
import SeoSettings from './SeoSettings';
import MediaLibrary from './MediaLibrary';
import PerformanceDashboard from './PerformanceDashboard';
import GlobalSettings from './GlobalSettings';
import BackupSection from './BackupSection';

const AdminSections = () => {
  const { userRole } = useAdminSession();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedSection, setSelectedSection] = useState<any>(null);
  const [showSectionEditor, setShowSectionEditor] = useState<boolean>(false);

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
        return <AdminDashboard onNavigate={setActiveTab} userRole={userRole} />;
      case 'sections':
        return showSectionEditor && selectedSection ? (
          <SectionEditor 
            section={selectedSection} 
            onClose={handleSectionEditorClose} 
          />
        ) : (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Content Sections</h1>
            <p>Select a section to edit</p>
            {/* Placeholder for section selection UI */}
          </div>
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
        return <AdminDashboard onNavigate={setActiveTab} userRole={userRole} />;
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-8 py-6 max-w-7xl mx-auto">
      {renderContent()}
    </div>
  );
};

export default AdminSections;
