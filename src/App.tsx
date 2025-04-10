
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Function to initialize SEO settings
const initializeSeoSettings = () => {
  // Only run on non-admin routes
  if (window.location.pathname !== '/admin') {
    const seoSettings = localStorage.getItem('seoSettings');
    if (seoSettings) {
      const { title, description, keywords, ogImage, gaTrackingId, enableGa } = JSON.parse(seoSettings);
      
      // Update title
      if (title) document.title = title;
      
      // Update meta tags
      updateMetaTag('description', description);
      updateMetaTag('keywords', keywords);
      updateMetaTag('og:image', ogImage, 'property');
      
      // Handle Google Analytics
      if (enableGa && gaTrackingId) {
        setupGoogleAnalytics(gaTrackingId);
      }
    }
  }
};

const updateMetaTag = (name: string, content: string, attribute = 'name') => {
  if (!content) return;
  
  let meta = document.querySelector(`meta[${attribute}="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
};

const setupGoogleAnalytics = (trackingId: string) => {
  // Check if GA is already initialized
  if (document.getElementById('ga-script')) return;
  
  // Create GA4 script
  const scriptGA = document.createElement('script');
  scriptGA.async = true;
  scriptGA.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
  scriptGA.id = 'ga-script';
  
  // Create config script
  const scriptConfig = document.createElement('script');
  scriptConfig.id = 'ga-config';
  scriptConfig.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${trackingId}');
  `;
  
  // Add scripts to document
  document.head.appendChild(scriptGA);
  document.head.appendChild(scriptConfig);
};

const AppContent = () => {
  useEffect(() => {
    initializeSeoSettings();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/admin" element={<Admin />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
