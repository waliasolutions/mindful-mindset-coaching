
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Image, 
  Settings, 
  Globe, 
  Activity, 
  LogOut,
  Save,
  Menu,
  Users
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAdminSession } from '@/hooks/useAdminSession';
import { Button } from '@/components/ui/button';
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { AdminRole } from '@/utils/adminAuth';

interface AdminLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
  userRole: AdminRole;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  onLogout, 
  userRole, 
  activeTab, 
  onTabChange 
}) => {
  // Function to determine if a menu item should be shown based on role
  const isAdminOnly = (item: { adminOnly?: boolean }) => {
    return item.adminOnly ? userRole === 'admin' : true;
  };

  // Navigation items
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'sections', label: 'Inhalt', icon: FileText },
    { id: 'media', label: 'Medien', icon: Image },
    { id: 'seo', label: 'SEO', icon: Globe },
    { id: 'users', label: 'Users', icon: Users, adminOnly: true },
    { id: 'settings', label: 'Einstellungen', icon: Settings },
    { id: 'backups', label: 'Backups', icon: Save },
    { id: 'performance', label: 'Leistung', icon: Activity, adminOnly: true },
  ];

  const handleTabClick = (tabId: string) => {
    onTabChange(tabId);
  };
  
  return (
    <div className="flex h-screen bg-gray-100 text-gray-700 flex-col">
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Sidebar Trigger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden ml-2 mt-2">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-64 dark:bg-gray-900 bg-white border-r p-0">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold">Content Management</h2>
              </div>
              <ScrollArea className="flex-1">
                <div className="py-4">
                  <div className="px-3 py-2">
                    {navItems.map((item) =>
                      isAdminOnly(item) ? (
                        <Button
                          key={item.id}
                          variant="ghost"
                          className={`w-full justify-start font-normal ${
                            activeTab === item.id ? "bg-gray-100 dark:bg-gray-800" : ""
                          }`}
                          onClick={() => handleTabClick(item.id)}
                        >
                          <item.icon className="mr-2 h-4 w-4" />
                          <span>{item.label}</span>
                        </Button>
                      ) : null
                    )}
                  </div>
                </div>
              </ScrollArea>
              <div className="p-4 border-t">
                <Button 
                  variant="ghost" 
                  className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                  onClick={onLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop Sidebar */}
        <div className="hidden md:flex w-64 bg-white dark:bg-gray-900 border-r flex-col">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Content Management</h2>
          </div>
          
          <ScrollArea className="flex-1 py-4">
            <div className="px-3 space-y-1">
              {navItems.map((item) =>
                isAdminOnly(item) ? (
                  <Button
                    key={item.id}
                    variant="ghost"
                    className={`w-full justify-start font-normal ${
                      activeTab === item.id ? "bg-gray-100 dark:bg-gray-800" : ""
                    }`}
                    onClick={() => handleTabClick(item.id)}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.label}</span>
                  </Button>
                ) : null
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t">
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
              onClick={onLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="flex items-center justify-end h-16 px-6 border-b dark:bg-gray-800 bg-white">
            <div className="flex items-center gap-4">
              <ModeToggle />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                      <AvatarFallback>AU</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Content Area */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-700">
            {children}
          </main>
          
          {/* Footer with credit */}
          <footer className="bg-white dark:bg-gray-900 border-t text-center py-3 text-sm text-gray-500 dark:text-gray-400">
            CMS by walia solutions
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
