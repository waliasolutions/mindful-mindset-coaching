
import React, { ReactNode } from 'react';
import { LogOut, Settings, FileText, Users, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';

interface AdminLayoutProps {
  children: ReactNode;
  onLogout: () => void;
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

const AdminLayout = ({ children, onLogout, activeSection = 'content', onSectionChange }: AdminLayoutProps) => {
  const { user, userRole, isSuperAdmin } = useAuth();

  const menuItems = [
    {
      id: 'content',
      label: 'Inhalte verwalten',
      icon: FileText,
      description: 'Website-Inhalte und Medien bearbeiten'
    },
    ...(isSuperAdmin ? [{
      id: 'users',
      label: 'Benutzerverwaltung',
      icon: Users,
      description: 'Benutzer und Rollen verwalten'
    }] : []),
  ];

  const getRoleDisplay = (role: string | null) => {
    switch (role) {
      case 'super_admin':
        return { label: 'Super Admin', color: 'bg-red-100 text-red-800' };
      case 'admin':
        return { label: 'Administrator', color: 'bg-blue-100 text-blue-800' };
      default:
        return { label: 'Redakteur', color: 'bg-green-100 text-green-800' };
    }
  };

  const roleDisplay = getRoleDisplay(userRole);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-forest">Admin Portal</h1>
          <div className="mt-2">
            <div className="text-sm text-gray-600 truncate">
              {user?.email}
            </div>
            <Badge className={`mt-1 ${roleDisplay.color}`}>
              {roleDisplay.label}
            </Badge>
          </div>
        </div>
        
        <nav className="p-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange?.(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors ${
                    isActive 
                      ? 'bg-forest text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <div className={`text-xs ${isActive ? 'text-gray-200' : 'text-gray-500'}`}>
                      {item.description}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </nav>
        
        <div className="absolute bottom-4 left-4 right-4">
          <Button
            onClick={onLogout}
            variant="outline"
            className="w-full flex items-center gap-2 text-gray-700 hover:text-red-600 hover:border-red-300"
          >
            <LogOut className="h-4 w-4" />
            Abmelden
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {menuItems.find(item => item.id === activeSection)?.label || 'Dashboard'}
              </h2>
              <p className="text-sm text-gray-600">
                {menuItems.find(item => item.id === activeSection)?.description || 'Willkommen im Admin-Bereich'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Monitor className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-600">Live-Vorschau aktiv</span>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
