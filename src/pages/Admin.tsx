
import { useEffect } from 'react';
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
  
  const navigate = useNavigate();

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
    <AdminLayout onLogout={handleLogout} userRole={userRole}>
      <AdminSections />
    </AdminLayout>
  );
};

export default Admin;
