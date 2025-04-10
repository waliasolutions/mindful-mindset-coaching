
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import AdminSections from '../components/admin/AdminSections';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  
  // Simple password protection for demo purposes
  // In a real app, you would use proper authentication
  useEffect(() => {
    const checkAuth = () => {
      const adminAuth = localStorage.getItem('adminAuth');
      if (adminAuth === 'true') {
        setIsAuthenticated(true);
      } else {
        const password = prompt("Enter admin password (use 'admin123' for demo)");
        if (password === 'admin123') {
          localStorage.setItem('adminAuth', 'true');
          setIsAuthenticated(true);
        } else {
          navigate('/');
        }
      }
    };
    
    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AdminLayout onLogout={handleLogout}>
      <AdminSections />
    </AdminLayout>
  );
};

export default Admin;
