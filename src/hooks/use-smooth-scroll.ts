
import { useCallback } from 'react';

export const useSmoothScroll = () => {
  const scrollToElement = useCallback((targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      const navbarHeight = 80; // Adjust this value based on your navbar height
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  return { scrollToElement };
};
