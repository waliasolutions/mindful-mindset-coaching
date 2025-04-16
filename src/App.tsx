
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Function to update page metadata based on route
const updatePageMetadata = (pathname: string) => {
  const baseTitle = "Mindset Coaching mit Martina | Persönliche Entwicklung & Transformation";
  const baseDescription = "Entdecken Sie transformatives Mindset Coaching mit Martina Domeniconi. Entwickeln Sie ein positives Mindset, erreichen Sie Ihre Ziele und leben Sie ein erfülltes Leben.";
  const baseImage = "/lovable-uploads/eff14ab3-8502-4ea4-9c20-75fe9b485119.png";

  // Update title and meta tags based on current route
  document.title = pathname === "/" ? baseTitle : `${pathname.slice(1)} | ${baseTitle}`;
  
  // Update meta description
  updateMetaTag('description', baseDescription);
  
  // Update OG tags
  updateMetaTag('og:title', document.title, 'property');
  updateMetaTag('og:description', baseDescription, 'property');
  updateMetaTag('og:image', baseImage, 'property');
  
  // Update Twitter card
  updateMetaTag('twitter:image', baseImage, 'property');
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

const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    updatePageMetadata(location.pathname);
  }, [location]);

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
      <AuthProvider>
        <TooltipProvider>
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
