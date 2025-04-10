
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import PricingWithQuote from '../components/PricingWithQuote';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Save, X } from 'lucide-react';
import { toast } from 'sonner';

// Define the section type
interface Section {
  id: string;
  name: string;
  component: string;
  visible: boolean;
  order: number;
}

// Map from component name to the actual component
const componentMap: Record<string, React.ComponentType<any>> = {
  Hero,
  About,
  Services,
  PricingWithQuote,
  Contact
};

// Default section order if not found in localStorage
const defaultSections: Section[] = [
  { id: 'hero', name: 'Hero', component: 'Hero', visible: true, order: 0 },
  { id: 'services', name: 'Services', component: 'Services', visible: true, order: 1 },
  { id: 'about', name: 'About', component: 'About', visible: true, order: 2 },
  { id: 'pricing', name: 'Pricing', component: 'PricingWithQuote', visible: true, order: 3 },
  { id: 'contact', name: 'Contact', component: 'Contact', visible: true, order: 4 },
];

const Index = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  
  useEffect(() => {
    // Check if we're in edit mode (from admin panel)
    setIsEditMode(localStorage.getItem('editMode') === 'true');
    
    // Load section order from localStorage or use default
    const storedSections = localStorage.getItem('sectionOrder');
    if (storedSections) {
      setSections(JSON.parse(storedSections));
    } else {
      setSections(defaultSections);
    }
    
    // Add edit mode class to body if editing
    if (localStorage.getItem('editMode') === 'true') {
      document.body.classList.add('edit-mode');
      
      // Show edit mode toolbar
      const toolbar = document.createElement('div');
      toolbar.id = 'edit-mode-toolbar';
      toolbar.className = 'fixed bottom-0 left-0 right-0 bg-forest text-white p-3 flex items-center justify-between z-50';
      toolbar.innerHTML = `
        <div class="flex items-center">
          <span class="font-medium mr-2">WYSIWYG Edit Mode</span>
          <span class="text-sm bg-green-700 px-2 py-0.5 rounded">Active</span>
        </div>
        <div class="flex items-center space-x-2">
          <button id="exit-edit-mode" class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded flex items-center">
            <span class="mr-1">Exit</span>
          </button>
        </div>
      `;
      document.body.appendChild(toolbar);
      
      // Add event listener to exit button
      const exitButton = document.getElementById('exit-edit-mode');
      if (exitButton) {
        exitButton.addEventListener('click', () => {
          localStorage.removeItem('editMode');
          window.close();
        });
      }
      
      toast.info('WYSIWYG Edit Mode Active. Hover over content to edit.', {
        duration: 5000,
      });
    }
    
    // Smooth scrolling for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href')?.slice(1);
        const element = document.getElementById(id as string);
        if (element) {
          const navbarHeight = 80; // approximate navbar height
          const top = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
          window.scrollTo({
            top,
            behavior: 'smooth'
          });
        }
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    
    // Reveal animation on scroll
    const handleReveal = () => {
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
    };
    
    window.addEventListener('scroll', handleReveal);
    handleReveal(); // Trigger on initial load
    
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('scroll', handleReveal);
      
      // Clean up edit mode toolbar
      const toolbar = document.getElementById('edit-mode-toolbar');
      if (toolbar) {
        document.body.removeChild(toolbar);
      }
      
      document.body.classList.remove('edit-mode');
    };
  }, []);
  
  // Render each section according to the order and visibility
  const renderSections = () => {
    return sections
      .sort((a, b) => a.order - b.order)
      .filter(section => section.visible)
      .map(section => {
        const Component = componentMap[section.component];
        return Component ? <Component key={section.id} /> : null;
      });
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        {renderSections()}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
