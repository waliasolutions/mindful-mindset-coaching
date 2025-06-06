
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import AdminSections from '../components/admin/AdminSections';
import LoginForm from '../components/admin/LoginForm';
import LoadingState from '../components/admin/LoadingState';
import { useAdminSession } from '@/hooks/useAdminSession';
import { createPreviewIframe, initializeAdminContent } from '@/utils/adminPreview';

const Admin = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    loginAttempts,
    setLoginAttempts,
    lockedUntil,
    setLockedUntil,
    previewLoaded,
    setPreviewLoaded,
    userRole,
    setUserRole,
    handleLogout
  } = useAdminSession();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const navigate = useNavigate();

  // Navigation items to determine default tab
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', adminOnly: false },
    { id: 'sections', label: 'Inhalt', adminOnly: false },
    { id: 'media', label: 'Medien', adminOnly: false },
    { id: 'seo', label: 'SEO', adminOnly: true },
    { id: 'users', label: 'Users', adminOnly: true },
    { id: 'settings', label: 'Einstellungen', adminOnly: false },
    { id: 'backups', label: 'Backups', adminOnly: false },
    { id: 'performance', label: 'Leistung', adminOnly: true },
  ];

  // Set default tab based on user role when authenticated
  useEffect(() => {
    if (isAuthenticated && userRole) {
      const availableTabs = navItems.filter(item => 
        !item.adminOnly || userRole === 'admin'
      );
      
      // Set to first available tab for the user's role
      if (availableTabs.length > 0) {
        setActiveTab(availableTabs[0].id);
      }
    }
  }, [isAuthenticated, userRole]);

  // Initialize content synchronization when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      initializeAdminContent();
    }
  }, [isAuthenticated]);

  // Set up preview iframe when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      return createPreviewIframe(setPreviewLoaded);
    }
    return () => {};
  }, [isAuthenticated, setPreviewLoaded]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (!isAuthenticated) {
    return (
      <LoginForm
        loginAttempts={loginAttempts}
        setLoginAttempts={setLoginAttempts}
        lockedUntil={lockedUntil}
        setLockedUntil={setLockedUntil}
        setIsAuthenticated={setIsAuthenticated}
        setUserRole={setUserRole}
      />
    );
  }

  return (
    <AdminLayout 
      onLogout={handleLogout} 
      userRole={userRole}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      <AdminSections 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </AdminLayout>
  );
};

export default Admin;
