
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';
import { useGlobalSettings } from '../hooks/use-global-settings';
import OptimizedImage from './OptimizedImage';

const Footer = () => {
  const globalSettings = useGlobalSettings();
  const { footer, contactEmail, contactPhone, address } = globalSettings;
  const navigate = useNavigate();
  
  // Add a hidden admin link that becomes visible when pressing Alt+Shift+A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.shiftKey && e.key === 'A') {
        navigate('/dashboard-management-portal-9a7b2c3d');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);
  
  const renderSocialIcon = (platform: string) => {
    switch (platform) {
      case 'Instagram':
        return <Instagram className="h-5 w-5" />;
      case 'Facebook':
        return <Facebook className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <footer className="bg-sage text-white" id="contact">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Kontakt</h3>
            <p className="mb-2">{footer?.contactText || 'Kontaktieren Sie uns, um mehr über unsere Coaching-Dienstleistungen zu erfahren'}</p>
            <div className="space-y-2 mt-4">
              <a href={`mailto:${contactEmail}`} className="flex items-center gap-2 hover:text-beige transition-colors">
                <Mail className="h-4 w-4" />
                <span>{contactEmail}</span>
              </a>
              <a href={`tel:${contactPhone}`} className="flex items-center gap-2 hover:text-beige transition-colors">
                <Phone className="h-4 w-4" />
                <span>{contactPhone}</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{address}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Schnellzugriff</h3>
            <ul className="space-y-2">
              {footer?.legalLinks?.map((link) => (
                <li key={link.id}>
                  <a href={link.url} className="hover:text-beige transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Partner Logo */}
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Partner</h4>
              <a 
                href="https://organize-my-space.ch" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block hover:opacity-80 transition-opacity"
              >
                <OptimizedImage 
                  src="/lovable-uploads/0bacd932-81ec-4c1b-b330-546f5a1116dd.png"
                  alt="Organize My Space Logo"
                  width={120}
                  className="bg-white p-2 rounded"
                  priority="low"
                />
              </a>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Folgen Sie uns</h3>
            <div className="flex space-x-4">
              {footer?.socialLinks?.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-forest hover:bg-beige text-white hover:text-forest p-2 rounded-full transition-colors"
                >
                  {renderSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p>{footer?.copyrightText || '© 2025 Mindset Coaching. Alle Rechte vorbehalten.'}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
