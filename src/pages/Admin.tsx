
import { useAuth } from '@/hooks/useAuth';
import AdminLayout from '../components/admin/AdminLayout';
import AdminSections from '../components/admin/AdminSections';
import AuthLogin from '../components/admin/AuthLogin';
import UserManagement from '../components/admin/UserManagement';
import LoadingState from '../components/admin/LoadingState';
import { useState, useEffect } from 'react';
import { createPreviewIframe, initializeAdminContent } from '@/utils/adminPreview';

const Admin = () => {
  const { user, isLoading, isAdmin, signOut } = useAuth();
  const [activeSection, setActiveSection] = useState('content');
  const [previewLoaded, setPreviewLoaded] = useState(false);

  // Initialize content synchronization when authenticated
  useEffect(() => {
    if (user && isAdmin) {
      initializeAdminContent();
    }
  }, [user, isAdmin]);

  // Set up preview iframe when authenticated
  useEffect(() => {
    if (user && isAdmin) {
      return createPreviewIframe(setPreviewLoaded);
    }
    return () => {};
  }, [user, isAdmin, setPreviewLoaded]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (!user) {
    return <AuthLogin />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Zugriff verweigert</h1>
          <p className="text-gray-600 mb-4">Sie haben keine Berechtigung für diesen Bereich.</p>
          <button 
            onClick={signOut}
            className="text-forest hover:underline"
          >
            Abmelden
          </button>
        </div>
      </div>
    );
  }

  const handleLogout = async () => {
    await signOut();
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'users':
        return <UserManagement />;
      case 'content':
      default:
        return <AdminSections />;
    }
  };

  return (
    <AdminLayout 
      onLogout={handleLogout}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      {renderContent()}
    </AdminLayout>
  );
};

export default Admin;
