
import { createRoot } from 'react-dom/client'
import { lazy, Suspense } from 'react'
import './index.css'

// Lazy load the App component
const App = lazy(() => import('./App.tsx'))

// Create a simple loading state
const Loading = () => (
  <div className="h-screen w-screen flex items-center justify-center bg-background">
    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
)

// Preload critical images
const preloadCriticalImages = () => {
  const images = [
    '/lovable-uploads/7b4f0db6-80ea-4da6-b817-0f33ba7562b5.png', // Hero image
    '/lovable-uploads/abb0bc70-ae8b-43ce-867f-d7beece5a8a2.png', // Favicon
  ];
  
  images.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Set up a global storage event handler for admin-frontend communication
const setupStorageEventHandler = () => {
  // This is needed for admin panel updates to be reflected in the frontend
  // without a full page reload
  window.addEventListener('storage', (e) => {
    if (['globalSettings', 'themeSettings', 'seoSettings', 'sectionOrder', 'mediaLibrary'].includes(e.key || '')) {
      console.log(`Storage updated: ${e.key}`);
      // The Index component will handle the actual refresh logic
    }
  });
};

// Execute setup functions
preloadCriticalImages();
setupStorageEventHandler();

// Ensure the DOM is fully loaded before rendering
document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById("root")!).render(
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
  );
});
