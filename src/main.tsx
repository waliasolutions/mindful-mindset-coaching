
import { createRoot } from 'react-dom/client'
import { lazy, Suspense } from 'react'
import './styles/index.css'

// Lazy load the App component
const App = lazy(() => import('./App.tsx'))

// Create a simple loading state
const Loading = () => (
  <div className="h-screen w-screen flex items-center justify-center bg-background">
    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
)

// Check if Lovable script is already loaded
const isLovableScriptLoaded = () => {
  return !!document.querySelector('script[src="https://cdn.gpteng.co/gptengineer.js"]');
};

// Preload critical images with better prioritization
const preloadCriticalImages = () => {
  const images = [
    // Hero image (highest priority - LCP element)
    {
      src: '/lovable-uploads/7b4f0db6-80ea-4da6-b817-0f33ba7562b5.png',
      importance: 'high',
      type: 'image/png'
    },
    // About profile image (medium priority)
    {
      src: '/lovable-uploads/053f601c-1228-481c-9aca-d078fb3d7d8a.png',
      importance: 'auto',
      type: 'image/png'
    }
  ];
  
  images.forEach(img => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = img.src;
    link.fetchPriority = img.importance as 'high' | 'low' | 'auto';
    if (img.type) {
      link.type = img.type;
    }
    document.head.appendChild(link);
  });
};

// Optimize font loading by adding preconnects early
const optimizeFontLoading = () => {
  // Add font preconnects if not already present
  if (!document.querySelector('link[href*="fonts.googleapis.com"]')) {
    const domains = ['fonts.googleapis.com', 'fonts.gstatic.com'];
    domains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = `https://${domain}`;
      if (domain === 'fonts.gstatic.com') {
        link.crossOrigin = 'anonymous';
      }
      document.head.appendChild(link);
    });
  }
};

// Initialize application with performance optimizations
const initializeApp = async () => {
  try {
    // Skip loading Lovable script if it's already in the HTML
    if (!isLovableScriptLoaded()) {
      console.log('Lovable script not found in HTML, this should not happen');
    }
    
    // Optimize font loading first
    optimizeFontLoading();
    
    // Preload critical images
    preloadCriticalImages();
    
    // Finally render the React app
    createRoot(document.getElementById("root")!).render(
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    );
  } catch (error) {
    console.error('Error initializing application:', error);
  }
};

// Start initialization when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  // If DOMContentLoaded already fired, initialize immediately
  initializeApp();
}
