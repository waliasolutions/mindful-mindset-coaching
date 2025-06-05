
import { useState, useEffect } from 'react';

interface ContentOverrides {
  [sectionId: string]: {
    [key: string]: any;
  };
}

export const useContentBridge = (sectionId: string, defaultContent: any) => {
  const [content, setContent] = useState(defaultContent);

  useEffect(() => {
    // Check for admin overrides in localStorage
    const adminOverrides = localStorage.getItem('adminContentOverrides');
    if (adminOverrides) {
      try {
        const overrides: ContentOverrides = JSON.parse(adminOverrides);
        if (overrides[sectionId]) {
          // Merge admin overrides with default content
          setContent({ ...defaultContent, ...overrides[sectionId] });
        }
      } catch (error) {
        console.error('Error parsing admin content overrides:', error);
      }
    }

    // Listen for admin content updates
    const handleStorageChange = (event: CustomEvent) => {
      if (event.detail.key === 'adminContentOverrides') {
        try {
          const overrides: ContentOverrides = JSON.parse(event.detail.newValue || '{}');
          if (overrides[sectionId]) {
            setContent({ ...defaultContent, ...overrides[sectionId] });
          } else {
            setContent(defaultContent);
          }
        } catch (error) {
          console.error('Error parsing admin content overrides:', error);
        }
      }
    };

    window.addEventListener('localStorageUpdated', handleStorageChange as EventListener);
    
    return () => {
      window.removeEventListener('localStorageUpdated', handleStorageChange as EventListener);
    };
  }, [sectionId, defaultContent]);

  return content;
};

// Helper function to save admin content overrides
export const saveContentOverride = (sectionId: string, overrides: any) => {
  try {
    const existingOverrides = localStorage.getItem('adminContentOverrides');
    const currentOverrides: ContentOverrides = existingOverrides ? JSON.parse(existingOverrides) : {};
    
    currentOverrides[sectionId] = overrides;
    
    const newValue = JSON.stringify(currentOverrides);
    localStorage.setItem('adminContentOverrides', newValue);
    
    // Dispatch custom event for same-tab communication
    window.dispatchEvent(new CustomEvent('localStorageUpdated', { 
      detail: { key: 'adminContentOverrides', newValue }
    }));
    
    return true;
  } catch (error) {
    console.error('Error saving content override:', error);
    return false;
  }
};

// Helper function to extract current content from DOM
export const extractContentFromDOM = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (!section) return {};

  const extractedContent: any = {};

  switch (sectionId) {
    case 'home': // Hero section
      const heroHeading = section.querySelector('h1');
      const heroSubtitle = section.querySelector('p');
      const heroButton = section.querySelector('a[href="#contact"]');
      
      if (heroHeading) extractedContent.title = heroHeading.textContent;
      if (heroSubtitle) extractedContent.subtitle = heroSubtitle.textContent;
      if (heroButton) extractedContent.buttonText = heroButton.textContent;
      break;

    case 'services':
      const servicesHeading = section.querySelector('h2');
      const servicesDescription = section.querySelector('p');
      
      if (servicesHeading) extractedContent.title = servicesHeading.textContent;
      if (servicesDescription) extractedContent.description = servicesDescription.textContent;
      break;

    case 'about':
      const aboutHeading = section.querySelector('h2');
      const aboutSubtitle = section.querySelector('h2 + div + p, h2 ~ p');
      
      if (aboutHeading) extractedContent.title = aboutHeading.textContent;
      if (aboutSubtitle) extractedContent.subtitle = aboutSubtitle.textContent;
      break;

    case 'pricing':
      const pricingHeading = section.querySelector('h2');
      const pricingDescription = section.querySelector('p');
      const priceElement = section.querySelector('[class*="text-3xl"], [class*="text-4xl"]');
      
      if (pricingHeading) extractedContent.title = pricingHeading.textContent;
      if (pricingDescription) extractedContent.description = pricingDescription.textContent;
      if (priceElement) extractedContent.price = priceElement.textContent;
      break;

    case 'contact':
      const contactHeading = section.querySelector('h2');
      const contactSubtitle = section.querySelector('p');
      
      if (contactHeading) extractedContent.title = contactHeading.textContent;
      if (contactSubtitle) extractedContent.subtitle = contactSubtitle.textContent;
      break;
  }

  return extractedContent;
};
