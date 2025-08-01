
// Utility to extract current content from the website components
export const extractCurrentContent = (sectionId: string) => {
  // Get admin overrides first
  const adminOverrides = localStorage.getItem('adminContentOverrides');
  let overrides = {};
  
  if (adminOverrides) {
    try {
      overrides = JSON.parse(adminOverrides);
      // Content extractor loaded overrides
    } catch (error) {
      console.error('Error parsing admin overrides:', error);
    }
  }

  // Get the actual current content being displayed
  const getCurrentContent = (sectionId: string) => {
    switch (sectionId) {
      case 'hero':
        return {
          title: "Mindset Coaching für ein glückliches und erfülltes Leben",
          subtitle: "Entfalte dein volles Potenzial und erschaffe das Leben, von dem du träumst. Mit dem richtigen Mindset sind deinen Möglichkeiten keine Grenzen gesetzt.",
          additionalText: "Das zentrale Thema bei Mindset Coaching sind deine persönlichen Überzeugungen und Glaubenssätze. Wovon du selber überzeugst bist, verwirklichst du in deinem Leben. In einem persönlichen Coaching lernst du deine negativen Glaubenssätze zu erkennen und abzulegen und stattdessen in jedem Lebensbereich bestärkende Glaubenssätze zu entwickeln. Dazu gehört auch ein positives Selbstbild aufzubauen und in den inneren Frieden mit dir, deinen Mitmenschen, deiner Vergangenheit und deiner Geschichte zu kommen.",
          buttonText: "Kennenlerngespräch vereinbaren",
          backgroundImage: "/lovable-uploads/7b4f0db6-80ea-4da6-b817-0f33ba7562b5.png"
        };
      case 'services':
        return {
          title: "Transformiere dein Leben durch Mindset Coaching",
          description: "In einem 1:1 Coaching löst du Blockaden, bringst Klarheit in dein Gedanken-Karussell und richtest deinen Fokus auf das, was wirklich zählt: Deine Träume, Deine Lebenszufriedenheit und Deine innere Ruhe und Gelassenheit.",
          buttonText: "Kontaktiere mich",
          benefits: [
            {
              id: 'benefit-1',
              title: "Persönliches Wachstum",
              description: "Du möchtest ein erfülltes und selbstbestimmtes Leben führen",
              icon: "Brain"
            },
            {
              id: 'benefit-2',
              title: "Potenzialentfaltung",
              description: "Du willst endlich deine Ziele erreichen und dein volles Potenzial entfalten",
              icon: "Star"
            },
            {
              id: 'benefit-3',
              title: "Selbstbewusstsein",
              description: "Du möchtest mehr Selbstbewusstsein und Vertrauen aufbauen",
              icon: "Heart"
            },
            {
              id: 'benefit-4',
              title: "Klarheit & Gelassenheit",
              description: "Du sehnst dich nach mehr Klarheit, Gelassenheit und Lebensfreude",
              icon: "Lightbulb"
            },
            {
              id: 'benefit-5',
              title: "Beziehungen",
              description: "Du willst eine liebevolle Beziehung führen",
              icon: "Heart"
            },
            {
              id: 'benefit-6',
              title: "Gesunde Routinen",
              description: "Du möchtest gesunde Routinen und Gewohnheiten entwickeln",
              icon: "Sun"
            }
          ]
        };
      case 'pricing':
        return {
          title: "Investiere in dein Wohlbefinden",
          description: "Mir ist wichtig, dass du dich wohlfühlst – deshalb starten wir mit einem kostenlosen Kennenlerngespräch. In einem kurzen Telefonat können wir erste Fragen klären und gemeinsam sehen, ob die Zusammenarbeit für beide Seiten passt.",
          quote: "Unsere wichtigste Entscheidung ist, ob wir das Universum für einen freundlichen oder feindlichen Ort halten.",
          quoteAuthor: "― Albert Einstein",
          quoteImage: "/lovable-uploads/8a4be257-655e-4d69-b10e-5db95864ae5a.png",
          price: "CHF 90",
          pricePeriod: "pro Sitzung",
          packageTitle: "Coaching Einzelsitzung"
        };
      case 'about':
        return {
          title: "Martina Domeniconi – zertifizierter Mindset Coach",
          subtitle: "Über mich",
          profileImage: "/lovable-uploads/053f601c-1228-481c-9aca-d078fb3d7d8a.png"
        };
      case 'contact':
        return {
          title: "Beginne deine Mindset-Reise heute",
          subtitle: "Der erste Schritt zu einem erfüllteren Leben beginnt mit einem Gespräch. Kontaktiere mich für ein kostenloses Kennenlerngespräch, in dem wir über deine Ziele sprechen und herausfinden, wie ich dich am besten unterstützen kann.",
          email: "info@mindset-coach-martina.ch",
          phone: "078 840 04 81",
          sectionImage: "/lovable-uploads/41ccfa7b-2d21-4300-82ac-3cbd2ff728fe.png"
        };
      default:
        return {};
    }
  };

  const defaultContent = getCurrentContent(sectionId);
  const currentOverrides = overrides[sectionId] || {};
  
  // Merge default content with any admin overrides
  const result = { ...defaultContent, ...currentOverrides };
  // Content extracted for section
  return result;
};

// Extract navigation content from global settings
export const extractNavigationContent = () => {
  const savedSettings = localStorage.getItem('globalSettings');
  if (savedSettings) {
    try {
      const settings = JSON.parse(savedSettings);
      // Navigation settings loaded
      return settings.navigation || [];
    } catch (error) {
      console.error('Error parsing global settings:', error);
    }
  }
  
  // Return default navigation if no saved settings
  return [
    { id: 'nav-1', label: 'Home', url: '#home' },
    { id: 'nav-2', label: 'Services', url: '#services' },
    { id: 'nav-3', label: 'About', url: '#about' },
    { id: 'nav-4', label: 'Pricing', url: '#pricing' },
    { id: 'nav-5', label: 'Contact', url: '#contact' }
  ];
};

// Extract footer content with proper fallbacks
export const extractFooterContent = () => {
  const savedSettings = localStorage.getItem('globalSettings');
  if (savedSettings) {
    try {
      const settings = JSON.parse(savedSettings);
      // Footer settings loaded
      return {
        socialLinks: settings.footer?.socialLinks || [
          { id: 'instagram', platform: 'Instagram', url: 'https://www.instagram.com/mindset_coach_martina' },
          { id: 'facebook', platform: 'Facebook', url: 'https://www.facebook.com/mindset.coach.martina' }
        ],
        copyrightText: settings.footer?.copyrightText || '© 2025 Mindset Coach Martina.',
        contactEmail: settings.contactEmail || 'info@mindset-coach-martina.ch',
        contactPhone: settings.contactPhone || '+41 78 840 04 81',
        address: settings.address || '6300 Zug, Schweiz'
      };
    } catch (error) {
      console.error('Error parsing global settings:', error);
    }
  }
  
  // Return default footer content with correct URLs
  return {
    socialLinks: [
      { id: 'instagram', platform: 'Instagram', url: 'https://www.instagram.com/mindset_coach_martina' },
      { id: 'facebook', platform: 'Facebook', url: 'https://www.facebook.com/mindset.coach.martina' }
    ],
    copyrightText: '© 2025 Mindset Coach Martina.',
    contactEmail: 'info@mindset-coach-martina.ch',
    contactPhone: '+41 78 840 04 81',
    address: '6300 Zug, Schweiz'
  };
};
