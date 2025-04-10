
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronLeft, LogOut, Layout, Settings, 
  Layers, Image, Type, BarChart 
} from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Toaster } from "@/components/ui/sonner";
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

const AdminLayout = ({ children, onLogout }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Desktop sidebar */}
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-20'
      } hidden md:flex flex-col`}>
        <div className="p-4 border-b flex items-center justify-between">
          <h1 className={`font-bold text-forest ${sidebarOpen ? 'block' : 'hidden'}`}>Admin Panel</h1>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 hover:text-forest"
          >
            <ChevronLeft className={`h-5 w-5 transition-transform ${sidebarOpen ? '' : 'rotate-180'}`} />
          </Button>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {[
              { name: 'Dashboard', icon: <Layout className="h-5 w-5" />, path: '/admin' },
              { name: 'Content Sections', icon: <Layers className="h-5 w-5" />, path: '/admin' },
              { name: 'Images', icon: <Image className="h-5 w-5" />, path: '/admin' },
              { name: 'Typography', icon: <Type className="h-5 w-5" />, path: '/admin' },
              { name: 'Statistics', icon: <BarChart className="h-5 w-5" />, path: '/admin' },
              { name: 'Settings', icon: <Settings className="h-5 w-5" />, path: '/admin' },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className="flex items-center p-2 text-gray-600 rounded-md hover:bg-gray-100 hover:text-forest"
                >
                  {item.icon}
                  <span className={`ml-3 ${sidebarOpen ? 'block' : 'hidden'}`}>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className={`flex items-center w-full justify-${sidebarOpen ? 'start' : 'center'} text-gray-600 hover:text-red-500`}
            onClick={onLogout}
          >
            <LogOut className="h-5 w-5" />
            <span className={`ml-2 ${sidebarOpen ? 'block' : 'hidden'}`}>Logout</span>
          </Button>
          <Link 
            to="/" 
            className={`flex items-center mt-4 p-2 text-gray-600 rounded-md hover:bg-gray-100 hover:text-forest justify-${sidebarOpen ? 'start' : 'center'}`}
          >
            <ChevronLeft className="h-5 w-5" />
            <span className={`ml-2 ${sidebarOpen ? 'block' : 'hidden'}`}>Back to Site</span>
          </Link>
        </div>
      </div>

      {/* Mobile sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden fixed top-4 left-4 z-50">
            <Layers className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <div className="p-4 border-b">
            <h1 className="font-bold text-forest">Admin Panel</h1>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              {[
                { name: 'Dashboard', icon: <Layout className="h-5 w-5" />, path: '/admin' },
                { name: 'Content Sections', icon: <Layers className="h-5 w-5" />, path: '/admin' },
                { name: 'Images', icon: <Image className="h-5 w-5" />, path: '/admin' },
                { name: 'Typography', icon: <Type className="h-5 w-5" />, path: '/admin' },
                { name: 'Statistics', icon: <BarChart className="h-5 w-5" />, path: '/admin' },
                { name: 'Settings', icon: <Settings className="h-5 w-5" />, path: '/admin' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="flex items-center p-2 text-gray-600 rounded-md hover:bg-gray-100 hover:text-forest"
                  >
                    {item.icon}
                    <span className="ml-3">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="p-4 border-t mt-auto">
            <Button
              variant="ghost"
              className="flex items-center w-full justify-start text-gray-600 hover:text-red-500"
              onClick={onLogout}
            >
              <LogOut className="h-5 w-5" />
              <span className="ml-2">Logout</span>
            </Button>
            <Link 
              to="/" 
              className="flex items-center mt-4 p-2 text-gray-600 rounded-md hover:bg-gray-100 hover:text-forest"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="ml-2">Back to Site</span>
            </Link>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
          <h2 className="text-xl font-medium text-forest">Content Management</h2>
          <div className="flex items-center space-x-2">
            <Link to="/">
              <Button variant="outline">View Site</Button>
            </Link>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
      
      <Toaster />
    </div>
  );
};

export default AdminLayout;
