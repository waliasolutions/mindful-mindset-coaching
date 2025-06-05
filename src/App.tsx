
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import { HelmetProvider } from "react-helmet-async";
import { toast } from "@/components/ui/use-toast";

// Create a query client with error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
    mutations: {
      onError: (error) => {
        console.error('Mutation error:', error);
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      },
    }
  },
});

// Create an admin redirect page that will help users access the admin panel
const AdminRedirect = () => {
  return <Navigate to="/dashboard-management-portal-9a7b2c3d" replace />;
};

const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    // Update page metadata based on route
    const pathname = location.pathname;
    const baseTitle = "Mindset Coaching mit Martina | Persönliche Entwicklung & Transformation";
    
    // Update document title based on current route
    document.title = pathname === "/" ? baseTitle : `${pathname.slice(1)} | ${baseTitle}`;
    
    // Add hotkey for admin access (Alt+Shift+A)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.shiftKey && e.key === 'A') {
        window.location.href = '/dashboard-management-portal-9a7b2c3d';
        toast({
          title: "Admin Access",
          description: "Redirecting to admin panel...",
        });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/dashboard-management-portal-9a7b2c3d" element={<Admin />} />
      <Route path="/admin" element={<AdminRedirect />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <HelmetProvider>
    <ThemeProvider attribute="class" defaultTheme="light">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <AppContent />
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
