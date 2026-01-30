

import { useState, useEffect } from 'react';

export const useAboveFold = () => {
  const [isAboveTheFold, setIsAboveTheFold] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal-element');
      const images = document.querySelectorAll('.image-reveal');
      
      reveals.forEach((el) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          el.classList.add('revealed');
        }
      });
      
      images.forEach((el) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          el.classList.add('reveal');
        }
      });
      
      // Once user scrolls past fold, set to false to trigger loading remaining sections
      if (window.scrollY > 100) {
        setIsAboveTheFold(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    // Fallback: load all sections after 3 seconds even without scroll
    const timeout = setTimeout(() => {
      setIsAboveTheFold(false);
    }, 3000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return isAboveTheFold;
};
