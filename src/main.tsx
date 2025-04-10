
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

// Execute preload
preloadCriticalImages();

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<Loading />}>
    <App />
  </Suspense>
);
