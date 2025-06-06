
// Improved content extraction that doesn't rely on hardcoded CSS selectors
interface ExtractedContent {
  [key: string]: any;
}

interface ContentPattern {
  selector: string;
  attribute?: string;
  fallbackSelectors?: string[];
}

// Flexible content patterns for different section types
const CONTENT_PATTERNS: Record<string, Record<string, ContentPattern>> = {
  hero: {
    title: {
      selector: 'h1',
      fallbackSelectors: ['[data-title]', '.hero-title', '.main-title']
    },
    subtitle: {
      selector: 'h1 + p, .hero-subtitle',
      fallbackSelectors: ['[data-subtitle]', '.subtitle', 'h2']
    },
    buttonText: {
      selector: 'a[href*="contact"], .cta-button, .hero-button',
      fallbackSelectors: ['button', '.btn']
    },
    backgroundImage: {
      selector: 'img',
      attribute: 'src',
      fallbackSelectors: ['[style*="background-image"]']
    }
  },
  services: {
    title: {
      selector: 'h2',
      fallbackSelectors: ['[data-title]', '.services-title']
    },
    description: {
      selector: 'h2 + p, .services-description',
      fallbackSelectors: ['[data-description]', '.description']
    }
  },
  pricing: {
    title: {
      selector: 'h2',
      fallbackSelectors: ['[data-title]', '.pricing-title']
    },
    description: {
      selector: 'h2 + p',
      fallbackSelectors: ['[data-description]', '.pricing-description']
    },
    quote: {
      selector: '.text-xl, blockquote',
      fallbackSelectors: ['[data-quote]', '.quote']
    },
    price: {
      selector: '.text-4xl, .price',
      fallbackSelectors: ['[data-price]', '.amount']
    }
  },
  about: {
    title: {
      selector: 'h2',
      fallbackSelectors: ['[data-title]', '.about-title']
    },
    profileImage: {
      selector: 'img',
      attribute: 'src',
      fallbackSelectors: ['[data-profile-image]']
    }
  },
  contact: {
    title: {
      selector: 'h2',
      fallbackSelectors: ['[data-title]', '.contact-title']
    },
    email: {
      selector: 'a[href^="mailto:"]',
      attribute: 'href',
      fallbackSelectors: ['[data-email]']
    },
    phone: {
      selector: 'a[href^="tel:"]',
      fallbackSelectors: ['[data-phone]']
    }
  }
};

// Extract text content with fallbacks
const extractTextContent = (element: Element, pattern: ContentPattern): string => {
  if (pattern.attribute) {
    const attrValue = element.getAttribute(pattern.attribute);
    if (attrValue) {
      return pattern.attribute === 'href' && attrValue.startsWith('mailto:') 
        ? attrValue.replace('mailto:', '') 
        : attrValue;
    }
  }
  return element.textContent?.trim() || '';
};

// Try multiple selectors until one works
const findElementWithFallbacks = (container: Element, pattern: ContentPattern): Element | null => {
  // Try main selector first
  let element = container.querySelector(pattern.selector);
  if (element) return element;
  
  // Try fallback selectors
  if (pattern.fallbackSelectors) {
    for (const fallbackSelector of pattern.fallbackSelectors) {
      element = container.querySelector(fallbackSelector);
      if (element) return element;
    }
  }
  
  return null;
};

// Extract content from a section using flexible patterns
export const extractSectionContentFlexible = (sectionId: string): ExtractedContent => {
  const section = document.getElementById(sectionId);
  if (!section) {
    console.warn(`Section ${sectionId} not found in DOM`);
    return {};
  }

  const patterns = CONTENT_PATTERNS[sectionId];
  if (!patterns) {
    console.warn(`No content patterns defined for section ${sectionId}`);
    return {};
  }

  const extractedContent: ExtractedContent = {};

  Object.entries(patterns).forEach(([field, pattern]) => {
    const element = findElementWithFallbacks(section, pattern);
    if (element) {
      const content = extractTextContent(element, pattern);
      if (content) {
        extractedContent[field] = content;
      }
    }
  });

  return extractedContent;
};

// Extract all visible sections automatically
export const extractAllSectionsFlexible = (): Record<string, ExtractedContent> => {
  const allContent: Record<string, ExtractedContent> = {};
  
  // Find all sections with IDs that match our patterns
  Object.keys(CONTENT_PATTERNS).forEach(sectionId => {
    const sectionContent = extractSectionContentFlexible(sectionId);
    if (Object.keys(sectionContent).length > 0) {
      allContent[sectionId] = sectionContent;
    }
  });
  
  return allContent;
};

// Auto-discover content structure from DOM
export const discoverContentStructure = (): Record<string, string[]> => {
  const structure: Record<string, string[]> = {};
  
  // Find all sections in the page
  const sections = document.querySelectorAll('section[id], div[id]');
  
  sections.forEach(section => {
    const sectionId = section.id;
    if (!sectionId) return;
    
    const fields: string[] = [];
    
    // Look for common content elements
    const headings = section.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const paragraphs = section.querySelectorAll('p');
    const images = section.querySelectorAll('img');
    const links = section.querySelectorAll('a');
    const buttons = section.querySelectorAll('button, .btn');
    
    if (headings.length > 0) fields.push('title');
    if (paragraphs.length > 0) fields.push('description');
    if (images.length > 0) fields.push('image');
    if (links.length > 0) fields.push('links');
    if (buttons.length > 0) fields.push('buttonText');
    
    if (fields.length > 0) {
      structure[sectionId] = fields;
    }
  });
  
  return structure;
};
