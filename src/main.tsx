
import { createRoot } from 'react-dom/client'
import { lazy, Suspense } from 'react'
import './styles/index.css'

// Lazy load the App component
const App = lazy(() => import('./App.tsx'))

// Optimized loading state with minimal DOM
const Loading = () => (
  <div className="h-screen w-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
)

// Optimized font loading with preload
const optimizeFontLoading = () => {
  const fontPreload = document.createElement('link');
  fontPreload.rel = 'preload';
  fontPreload.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap';
  fontPreload.as = 'style';
  fontPreload.onload = () => {
    fontPreload.rel = 'stylesheet';
  };
  document.head.appendChild(fontPreload);
};

// Preload only critical images with high priority
const preloadCriticalImages = () => {
  const heroImage = document.createElement('link');
  heroImage.rel = 'preload';
  heroImage.as = 'image';
  heroImage.href = '/lovable-uploads/7b4f0db6-80ea-4da6-b817-0f33ba7562b5.png';
  heroImage.fetchPriority = 'high';
  heroImage.type = 'image/png';
  document.head.appendChild(heroImage);
};

// Optimized initialization - remove unnecessary checks
const initializeApp = () => {
  // Optimize font loading first
  optimizeFontLoading();
  
  // Preload only hero image
  preloadCriticalImages();
  
  // Render React app immediately
  createRoot(document.getElementById("root")!).render(
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
  );
};

// Start immediately without waiting for DOM
initializeApp();
