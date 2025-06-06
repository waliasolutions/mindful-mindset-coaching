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
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, onLogout, userRole }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

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
    { id: 'settings', label: 'Einstellungen', icon: Settings },
    { id: 'backups', label: 'Backups', icon: Save },
    { id: 'performance', label: 'Leistung', icon: Activity, adminOnly: true },
  ];

  const renderTab = (tabId: string) => {
    setActiveTab(tabId);
  };
  
  return (
    <div className="flex h-screen bg-gray-100 text-gray-700">
      {/* Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <LayoutDashboard className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:w-64 dark:bg-gray-900 bg-white border-r">
          <SheetHeader className="text-left">
            <SheetTitle>Admin Panel</SheetTitle>
            <SheetDescription>
              Manage your website content and settings.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="h-[calc(100vh-10rem)]">
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
                      onClick={() => renderTab(item.id)}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.label}</span>
                    </Button>
                  ) : null
                )}
              </div>
            </div>
          </ScrollArea>
          <Separator />
          <div className="p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2 w-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">
                    Admin User
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 px-6 border-b dark:bg-gray-800 bg-white">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="mr-4 md:hidden">
              <LayoutDashboard className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-semibold">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">
                    Admin User
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onLogout}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-700">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
