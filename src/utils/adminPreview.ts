
import { syncContentWithWebsite } from '@/utils/contentSync';

// Helper function to get meta content
export const getMetaContent = (name: string, attribute: 'name' | 'property' = 'name') => {
  const meta = document.querySelector(`meta[${attribute}="${name}"]`);
  return meta ? meta.getAttribute('content') || '' : '';
};

// Initialize content synchronization and default settings
export const initializeAdminContent = () => {
  // Initialize other settings if not present
  if (!localStorage.getItem('seoSettings')) {
    const defaultSeoSettings = {
      title: document.title || 'Mindset Coaching',
      description: getMetaContent('description') || 'Mindset Coaching für mehr Lebenszufriedenheit',
      keywords: getMetaContent('keywords') || 'coaching, mindset, life coaching',
      ogImage: getMetaContent('og:image', 'property') || '',
      gaTrackingId: '',
      enableGa: false
    };
    localStorage.setItem('seoSettings', JSON.stringify(defaultSeoSettings));
  }

  if (!localStorage.getItem('themeSettings')) {
    const defaultTheme = {
      colors: {
        primary: '#2F5233',  // forest
        secondary: '#94A38D', // sage
        accent: '#D5BDAF',   // beige
        background: '#FFFFFF', // white
        text: '#1A1A1A',     // dark gray
      },
      typography: {
        headingFont: '"Playfair Display", serif',
        bodyFont: '"Inter", sans-serif',
        baseFontSize: '16px',
      },
      spacing: {
        sectionPadding: '4rem',
        containerMaxWidth: '1200px',
      }
    };
    localStorage.setItem('themeSettings', JSON.stringify(defaultTheme));
  }

  if (!localStorage.getItem('globalSettings')) {
    const defaultSettings = {
      siteName: 'Mindset Coaching',
      contactEmail: 'info@mindset-coach-martina.ch',
      contactPhone: '+41 788 400 481',
      address: 'Ruedi-Walter-strasse 4, 8050 Zürich',
      navigation: [
        { id: 'home', label: 'Home', url: '#home' },
        { id: 'services', label: 'Services', url: '#services' },
        { id: 'about', label: 'About', url: '#about' },
        { id: 'pricing', label: 'Pricing', url: '#pricing' },
        { id: 'contact', label: 'Contact', url: '#contact' }
      ],
      footer: {
        contactText: 'Get in touch to learn more about our coaching services',
        socialLinks: [
          { id: 'instagram', platform: 'Instagram', url: 'https://instagram.com', icon: 'Instagram' },
          { id: 'facebook', platform: 'Facebook', url: 'https://facebook.com', icon: 'Facebook' }
        ],
        legalLinks: [
          { id: 'privacy', label: 'Privacy Policy', url: '/privacy' },
          { id: 'terms', label: 'Terms & Conditions', url: '/terms' }
        ],
        copyrightText: '© 2025 Mindset Coaching. All rights reserved.'
      }
    };
    localStorage.setItem('globalSettings', JSON.stringify(defaultSettings));
  }

  // Sync content with the website
  setTimeout(() => {
    syncContentWithWebsite();
  }, 1000);
};

// Function to create and manage preview iframe
export const createPreviewIframe = (setPreviewLoaded: (loaded: boolean) => void) => {
  // Create a hidden iframe to load the homepage content for extraction
  const existingFrame = document.getElementById('preview-frame');
  
  if (!existingFrame) {
    const previewFrame = document.createElement('iframe');
    previewFrame.id = 'preview-frame';
    previewFrame.src = '/';
    previewFrame.style.width = '1px';
    previewFrame.style.height = '1px';
    previewFrame.style.position = 'absolute';
    previewFrame.style.top = '-9999px';
    previewFrame.style.left = '-9999px';
    previewFrame.style.opacity = '0.01';
    previewFrame.style.pointerEvents = 'none';
    
    previewFrame.onload = () => {
      setPreviewLoaded(true);
      console.log('Preview iframe loaded successfully');
    };
    
    document.body.appendChild(previewFrame);
    
    // Return cleanup function
    return () => {
      if (document.body.contains(previewFrame)) {
        document.body.removeChild(previewFrame);
      }
    };
  }
  
  return () => {}; // Return no-op if iframe already exists
};
