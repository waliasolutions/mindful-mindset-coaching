
import { useEffect } from 'react';

export const useServiceWorker = () => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            if (import.meta.env.DEV) {
              console.log('SW registered: ', registration);
            }
          })
          .catch((registrationError) => {
            console.error('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);
};
