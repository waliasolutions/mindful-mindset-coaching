
import { supabase } from '@/integrations/supabase/client';

export interface ContentSection {
  id: string;
  name: string;
  content: any;
  updated_at: string;
}

// Storage key prefix for content sections
const CONTENT_PREFIX = 'section_';

// Dispatch custom event for content updates
export const dispatchContentUpdate = (sectionId: string, content: any) => {
  window.dispatchEvent(new CustomEvent('contentUpdated', { 
    detail: { sectionId, content }
  }));
};

// Get content from localStorage with fallback to default
export const getContentFromStorage = (sectionId: string, defaultContent: any = {}) => {
  try {
    const stored = localStorage.getItem(`${CONTENT_PREFIX}${sectionId}`);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error parsing stored content:', error);
  }
  return defaultContent;
};

// Save content to localStorage and dispatch update event
export const saveContentToStorage = (sectionId: string, content: any) => {
  try {
    localStorage.setItem(`${CONTENT_PREFIX}${sectionId}`, JSON.stringify(content));
    dispatchContentUpdate(sectionId, content);
    return true;
  } catch (error) {
    console.error('Error saving content to storage:', error);
    return false;
  }
};

// Extract content from DOM element with improved selectors
export const extractContentFromDOM = (sectionId: string): any => {
  const section = document.getElementById(sectionId);
  if (!section) return null;

  switch (sectionId) {
    case 'hero': {
      const title = section.querySelector('h1')?.textContent || '';
      const subtitle = section.querySelector('p')?.textContent || '';
      const buttonText = section.querySelector('a[href="#contact"]')?.textContent?.trim() || '';
      const backgroundImage = section.querySelector('img')?.src || '';
      
      return { title, subtitle, buttonText, backgroundImage };
    }
    
    case 'services': {
      const title = section.querySelector('h2')?.textContent || '';
      const description = section.querySelector('p')?.textContent || '';
      
      const benefitElements = section.querySelectorAll('.grid > div');
      const benefits = Array.from(benefitElements).map(el => {
        const title = el.querySelector('h3')?.textContent || '';
        const description = el.querySelector('p')?.textContent || '';
        return { title, description, icon: 'Star' };
      });
      
      return { title, description, benefits: benefits.length > 0 ? benefits : undefined };
    }
    
    case 'pricing': {
      const title = section.querySelector('h2')?.textContent || '';
      const description = section.querySelector('.max-w-2xl p')?.textContent || '';
      
      const quote = section.querySelector('.text-xl')?.textContent || '';
      const quoteAuthor = section.querySelector('.text-forest\\/70')?.textContent || '';
      
      const packageTitle = section.querySelector('.bg-gradient-to-r h3')?.textContent || '';
      const price = section.querySelector('.text-4xl')?.textContent || '';
      const pricePeriod = section.querySelector('.text-forest\\/90')?.textContent || '';
      
      const featureElements = section.querySelectorAll('.space-y-3 li');
      const features = Array.from(featureElements).map(el => 
        el.textContent?.replace(/✓/g, '').trim() || ''
      );
      
      return {
        title, description, quote, quoteAuthor,
        packageTitle, price, pricePeriod,
        features: features.length > 0 ? features : undefined
      };
    }
    
    case 'about': {
      const title = section.querySelector('h2')?.textContent || '';
      const subtitle = section.querySelector('p')?.textContent || '';
      const description = section.querySelector('.reveal-right p')?.textContent || '';
      
      return { title, subtitle, description };
    }
    
    case 'contact': {
      const title = section.querySelector('h2')?.textContent || '';
      const subtitle = section.querySelector('p')?.textContent || '';
      
      const emailElement = section.querySelector('a[href^="mailto:"]');
      const email = emailElement?.getAttribute('href')?.replace('mailto:', '') || '';
      
      const phoneElement = section.querySelector('a[href^="tel:"]');
      const phone = phoneElement?.textContent?.trim() || '';
      
      return { title, subtitle, email, phone };
    }
    
    default:
      return null;
  }
};

// Sync content between admin panel and website
export const syncContentWithWebsite = () => {
  const sections = ['hero', 'services', 'pricing', 'about', 'contact'];
  
  sections.forEach(sectionId => {
    const extractedContent = extractContentFromDOM(sectionId);
    if (extractedContent && Object.keys(extractedContent).length > 0) {
      const existingContent = getContentFromStorage(sectionId);
      
      // Only update if the extracted content is different or more complete
      if (!existingContent || Object.keys(extractedContent).length > Object.keys(existingContent).length) {
        saveContentToStorage(sectionId, extractedContent);
      }
    }
  });
};
