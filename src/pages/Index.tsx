
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Pricing from '../components/Pricing';
import Quote from '../components/Quote';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    const handleReveal = () => {
      const reveals = document.querySelectorAll('.image-reveal');
      
      reveals.forEach((el) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          el.classList.add('reveal');
        }
      });
    };
    
    window.addEventListener('scroll', handleReveal);
    handleReveal(); // Trigger on initial load
    
    return () => window.removeEventListener('scroll', handleReveal);
  }, []);
  
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Pricing />
      <Quote />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
