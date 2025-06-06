
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import PricingPage from "./pages/PricingPage";
import ContactPage from "./pages/ContactPage";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import { HelmetProvider } from "react-helmet-async";
import { toast } from "@/components/ui/use-toast";
import { useServiceWorker } from "./hooks/useServiceWorker";
import { preloadCriticalResources } from "./utils/performance";
import { ga4Manager } from "./utils/ga4Manager";

// Create a query client with error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000, // Cache for 10 minutes
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

const AppContent = () => {
  const location = useLocation();

  // Initialize service worker
  useServiceWorker();

  useEffect(() => {
    // Preload critical resources
    preloadCriticalResources();

    // Initialize GA4 on app startup
    const initializeGA4 = () => {
      const savedSeo = localStorage.getItem('seoSettings');
      if (savedSeo) {
        try {
          const seoData = JSON.parse(savedSeo);
          ga4Manager.initialize({
            trackingId: seoData.gaTrackingId || 'G-CCD1ZR05L7',
            enabled: seoData.enableGa !== false
          });
        } catch (error) {
          console.error('Error initializing GA4 from localStorage:', error);
          // Fallback to default
          ga4Manager.initialize({
            trackingId: 'G-CCD1ZR05L7',
            enabled: true
          });
        }
      } else {
        // Initialize with defaults
        ga4Manager.initialize({
          trackingId: 'G-CCD1ZR05L7',
          enabled: true
        });
      }
    };

    initializeGA4();

    // Update page metadata based on route
    const pathname = location.pathname;
    const baseTitle = "Mindset Coaching mit Martina | Persönliche Entwicklung & Transformation";
    
    // Update document title based on current route
    const routeTitles = {
      '/': baseTitle,
      '/services': 'Services | Mindset Coaching mit Martina',
      '/about': 'Über Martina | Mindset Coaching mit Martina',
      '/pricing': 'Preise | Mindset Coaching mit Martina',
      '/contact': 'Kontakt | Mindset Coaching mit Martina'
    };
    
    document.title = routeTitles[pathname as keyof typeof routeTitles] || baseTitle;
    
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
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/dashboard-management-portal-9a7b2c3d" element={<Admin />} />
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
