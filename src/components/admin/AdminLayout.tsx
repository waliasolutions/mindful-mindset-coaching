
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Layers, Search, PaintBucket, Image, FileText, Settings, BarChart3, Bell } from 'lucide-react';
import SeoSettings from './SeoSettings';
import MediaLibrary from './MediaLibrary';
import ThemeSettings from './ThemeSettings';
import GlobalSettings from './GlobalSettings';
import AdminDashboard from './AdminDashboard';
import PerformanceDashboard from './PerformanceDashboard';
import AdminNotificationCenter from './AdminNotificationCenter';
import AdminErrorBoundary from './AdminErrorBoundary';
import { AdminRole } from '@/utils/adminAuth';

interface AdminLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
  userRole: AdminRole;
}

const AdminLayout = ({ children, onLogout, userRole }: AdminLayoutProps) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const isAdmin = userRole === 'admin';
  
  // Function to handle navigation from dashboard quick actions
  const handleNavigate = (tab: string) => {
    // Prevent clients from accessing the performance tab
    if (tab === 'performance' && !isAdmin) {
      return;
    }
    setActiveTab(tab);
  };
  
  // Function to render the active panel based on the activeTab state
  const renderActivePanel = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard onNavigate={handleNavigate} userRole={userRole} />;
      case 'media':
        return <MediaLibrary />;
      case 'theme':
        return <ThemeSettings />;
      case 'seo':
        return <SeoSettings />;
      case 'settings':
        return <GlobalSettings />;
      case 'performance':
        // Only show performance dashboard to admins
        return isAdmin ? <PerformanceDashboard /> : <AdminDashboard onNavigate={handleNavigate} userRole={userRole} />;
      default:
        return children;
    }
  };
  
  return (
    <AdminErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-forest text-white shadow-md border-b border-forest/20">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
              <div className="hidden md:flex items-center space-x-1 bg-forest/20 rounded-lg px-3 py-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Online</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <AdminNotificationCenter />
              <Button variant="outline" className="text-white border-white hover:bg-white hover:text-forest transition-colors" asChild>
                <a href="/" target="_blank" rel="noopener noreferrer">Website ansehen</a>
              </Button>
              <Button variant="ghost" onClick={onLogout} className="text-white hover:bg-white/10 transition-colors">
                Abmelden
              </Button>
            </div>
          </div>
        </header>
        
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-9">
              {renderActivePanel()}
            </div>
            <div className="lg:col-span-3 space-y-6">
              <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-200">
                <nav className="space-y-2">
                  <Button
                    variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
                    className="w-full justify-start text-left"
                    onClick={() => setActiveTab('dashboard')}
                  >
                    <BarChart3 className="mr-3 h-4 w-4" />
                    Dashboard
                  </Button>
                  <Button
                    variant={activeTab === 'sections' ? 'default' : 'ghost'}
                    className="w-full justify-start text-left"
                    onClick={() => setActiveTab('sections')}
                  >
                    <Layers className="mr-3 h-4 w-4" />
                    Bereiche
                  </Button>
                  <Button
                    variant={activeTab === 'media' ? 'default' : 'ghost'}
                    className="w-full justify-start text-left"
                    onClick={() => setActiveTab('media')}
                  >
                    <Image className="mr-3 h-4 w-4" />
                    Medienbibliothek
                  </Button>
                  <Button
                    variant={activeTab === 'theme' ? 'default' : 'ghost'}
                    className="w-full justify-start text-left"
                    onClick={() => setActiveTab('theme')}
                  >
                    <PaintBucket className="mr-3 h-4 w-4" />
                    Design
                  </Button>
                  <Button
                    variant={activeTab === 'seo' ? 'default' : 'ghost'} 
                    className="w-full justify-start text-left"
                    onClick={() => setActiveTab('seo')}
                  >
                    <Search className="mr-3 h-4 w-4" />
                    SEO & Analyse
                  </Button>
                  {/* Only show the Performance button to admins */}
                  {isAdmin && (
                    <Button
                      variant={activeTab === 'performance' ? 'default' : 'ghost'} 
                      className="w-full justify-start text-left"
                      onClick={() => setActiveTab('performance')}
                    >
                      <BarChart3 className="mr-3 h-4 w-4" />
                      Leistung
                    </Button>
                  )}
                  <Button
                    variant={activeTab === 'settings' ? 'default' : 'ghost'} 
                    className="w-full justify-start text-left"
                    onClick={() => setActiveTab('settings')}
                  >
                    <Settings className="mr-3 h-4 w-4" />
                    Globale Einstellungen
                  </Button>
                </nav>
              </div>

              {/* Quick Stats */}
              <div className="bg-white shadow-sm rounded-lg p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3">Schnellübersicht</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Website Status</span>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">Online</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Letzte Aktualisierung</span>
                    <span className="text-sm font-medium">Heute</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Leistung</span>
                    <span className="text-sm font-medium text-green-600">Ausgezeichnet</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AdminErrorBoundary>
  );
};

export default AdminLayout;
