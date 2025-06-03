
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { toast } from 'sonner';
import { useContentSettings } from '@/hooks/useContentSettings';

const defaultContactContent = {
  title: 'Bereit für Veränderung?',
  subtitle: 'Lass uns gemeinsam den ersten Schritt gehen',
  email: 'info@mindset-coach-martina.ch',
  phone: '+41 78 840 04 81'
};

const Contact = ({ settings }: { settings?: any }) => {
  const { content } = useContentSettings('contact', defaultContactContent);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Nachricht erfolgreich gesendet! Wir melden uns bald bei Ihnen.');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      toast.error('Fehler beim Senden der Nachricht. Bitte versuchen Sie es erneut.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-forest/5 to-sage/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-forest mb-4 reveal-up">
            {content.title}
          </h2>
          <p className="text-lg text-forest/80 max-w-2xl mx-auto reveal-up delay-200">
            {content.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <Card className="reveal-left bg-white/80 backdrop-blur-sm border-sage/20">
            <CardHeader>
              <CardTitle className="text-2xl text-forest">Kontaktformular</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    name="name"
                    placeholder="Ihr Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-sage/30 focus:border-forest"
                  />
                </div>
                
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Ihre E-Mail"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border-sage/30 focus:border-forest"
                  />
                </div>
                
                <div>
                  <Input
                    name="phone"
                    type="tel"
                    placeholder="Ihre Telefonnummer"
                    value={formData.phone}
                    onChange={handleChange}
                    className="border-sage/30 focus:border-forest"
                  />
                </div>
                
                <div>
                  <Textarea
                    name="message"
                    placeholder="Ihre Nachricht"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="border-sage/30 focus:border-forest resize-none"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-forest hover:bg-forest/90 text-white py-3 text-lg font-semibold rounded-lg transition-all duration-300 hover:shadow-lg"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Nachricht senden
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6 reveal-right">
            <Card className="bg-white/80 backdrop-blur-sm border-sage/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-forest rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-forest">E-Mail</h3>
                    <a 
                      href={`mailto:${content.email}`}
                      className="text-forest/70 hover:text-forest transition-colors"
                    >
                      {content.email}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-sage/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-forest rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-forest">Telefon</h3>
                    <a 
                      href={`tel:${content.phone}`}
                      className="text-forest/70 hover:text-forest transition-colors"
                    >
                      {content.phone}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm border-sage/20">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-forest rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-forest">Standort</h3>
                    <p className="text-forest/70">Zürich, Schweiz</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
