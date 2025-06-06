
export interface NavItem {
  id: string;
  label: string;
  url: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export interface LegalLink {
  id: string;
  label: string;
  url: string;
}

export interface FooterSettings {
  socialLinks: SocialLink[];
  legalLinks: LegalLink[];
  copyrightText: string;
}

export interface GlobalSettings {
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  navigation: NavItem[];
  footer: FooterSettings;
}

export const defaultSettings: GlobalSettings = {
  siteName: 'Mindset Coach Martina',
  contactEmail: 'info@mindset-coach-martina.ch',
  contactPhone: '+41 78 840 04 81',
  address: '6300 Zug, Schweiz',
  navigation: [
    { id: 'home', label: 'Home', url: '#home' },
    { id: 'services', label: 'Services', url: '#services' },
    { id: 'about', label: 'About', url: '#about' },
    { id: 'pricing', label: 'Pricing', url: '#pricing' },
    { id: 'contact', label: 'Contact', url: '#contact' }
  ],
  footer: {
    socialLinks: [
      { id: 'instagram', platform: 'Instagram', url: 'https://www.instagram.com/mindset_coach_martina', icon: 'Instagram' },
      { id: 'facebook', platform: 'Facebook', url: 'https://www.facebook.com/mindset.coach.martina', icon: 'Facebook' }
    ],
    legalLinks: [
      { id: 'privacy', label: 'Datenschutz', url: '/privacy' },
      { id: 'terms', label: 'Nutzungsbedingungen', url: '/terms' }
    ],
    copyrightText: '© 2025 Mindset Coach Martina.'
  }
};
