
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import AdminSections from '../components/admin/AdminSections';
import { Search, Layers } from 'lucide-react';

// Import SEO component
import SeoSettings from '../components/admin/SeoSettings';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [previewLoaded, setPreviewLoaded] = useState(false);
  const navigate = useNavigate();
  
  // Simple password protection for demo purposes
  // In a real app, you would use proper authentication
  useEffect(() => {
    const checkAuth = () => {
      setIsLoading(true);
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
      setIsLoading(false);
    };
    
    checkAuth();
  }, [navigate]);

  // Add a side effect to load the preview iframe with home page content
  useEffect(() => {
    if (isAuthenticated) {
      // Create a hidden iframe to load the homepage content for extraction
      const existingFrame = document.getElementById('preview-frame');
      
      if (!existingFrame) {
        const previewFrame = document.createElement('iframe');
        previewFrame.id = 'preview-frame';
        previewFrame.src = '/';
        previewFrame.style.width = '1px';
        previewFrame.style.height = '1px';
        previewFrame.style.position = 'absolute';
        previewFrame.style.top = '-9999px';
        previewFrame.style.left = '-9999px';
        previewFrame.style.opacity = '0.01';
        previewFrame.style.pointerEvents = 'none';
        
        previewFrame.onload = () => {
          setPreviewLoaded(true);
          console.log('Preview iframe loaded successfully');
        };
        
        document.body.appendChild(previewFrame);
        
        return () => {
          if (document.body.contains(previewFrame)) {
            document.body.removeChild(previewFrame);
          }
        };
      }
    }
  }, [isAuthenticated]);

  // Load SEO settings on admin panel load
  useEffect(() => {
    if (isAuthenticated) {
      // Initialize SEO settings if not present
      if (!localStorage.getItem('seoSettings')) {
        const defaultSeoSettings = {
          title: document.title || 'Mindset Coaching',
          description: getMetaContent('description') || 'Mindset Coaching für mehr Lebenszufriedenheit',
          keywords: getMetaContent('keywords') || 'coaching, mindset, life coaching',
          ogImage: getMetaContent('og:image', 'property') || '',
          gaTrackingId: '',
          enableGa: false
        };
        
        localStorage.setItem('seoSettings', JSON.stringify(defaultSeoSettings));
      }
    }
  }, [isAuthenticated]);

  const getMetaContent = (name: string, attribute: 'name' | 'property' = 'name') => {
    const meta = document.querySelector(`meta[${attribute}="${name}"]`);
    return meta ? meta.getAttribute('content') || '' : '';
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

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
