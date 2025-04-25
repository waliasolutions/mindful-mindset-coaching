
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Layers, Search, PaintBucket, Image, FileText, Settings } from 'lucide-react';
import SeoSettings from './SeoSettings';
import MediaLibrary from './MediaLibrary';
import ThemeSettings from './ThemeSettings';
import GlobalSettings from './GlobalSettings';
import LogoSettings from './LogoSettings';
import { useNavigate } from 'react-router-dom';

const AdminLayout = ({ children, onLogout }: { children: React.ReactNode; onLogout: () => void }) => {
  const [activeTab, setActiveTab] = useState('sections');
  
  // Function to render the active panel based on the activeTab state
  const renderActivePanel = () => {
    switch (activeTab) {
      case 'media':
        return <MediaLibrary />;
      case 'theme':
        return <ThemeSettings />;
      case 'seo':
        return <SeoSettings />;
      case 'settings':
        return <GlobalSettings />;
      default:
        return children;
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-forest text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="text-white border-white hover:bg-white hover:text-forest" asChild>
              <a href="/" target="_blank">View Site</a>
            </Button>
            <Button variant="ghost" onClick={onLogout} className="text-white">
              Logout
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8">
            {renderActivePanel()}
          </div>
          <div className="md:col-span-4 space-y-6">
            <LogoSettings />
            <div className="bg-white shadow rounded-lg p-4 h-fit">
              <nav className="space-y-2">
                <Button
                  variant={activeTab === 'sections' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('sections')}
                >
                  <Layers className="mr-2 h-4 w-4" />
                  Sections
                </Button>
                <Button
                  variant={activeTab === 'media' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('media')}
                >
                  <Image className="mr-2 h-4 w-4" />
                  Media Library
                </Button>
                <Button
                  variant={activeTab === 'theme' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('theme')}
                >
                  <PaintBucket className="mr-2 h-4 w-4" />
                  Theme
                </Button>
                <Button
                  variant={activeTab === 'seo' ? 'default' : 'ghost'} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab('seo')}
                >
                  <Search className="mr-2 h-4 w-4" />
                  SEO & Analytics
                </Button>
                <Button
                  variant={activeTab === 'settings' ? 'default' : 'ghost'} 
                  className="w-full justify-start"
                  onClick={() => setActiveTab('settings')}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Global Settings
                </Button>
              </nav>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
