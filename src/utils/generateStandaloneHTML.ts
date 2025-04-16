
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import ReactDOMServer from 'react-dom/server';
import React from 'react';
import Index from '../pages/Index';

export const generateHTML = () => {
  try {
    // Build path for standalone output
    const outputDir = path.resolve(process.cwd(), 'build/standalone');
    
    // Create the output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Read any saved SEO settings
    let seoSettings = {
      title: 'Mindset Coaching mit Martina | Persönliche Entwicklung & Transformation',
      description: 'Entdecken Sie transformatives Mindset Coaching mit Martina Domeniconi. Entwickeln Sie ein positives Mindset, erreichen Sie Ihre Ziele und leben Sie ein erfülltes Leben. Persönliche Online-Coachings in Zürich.',
      keywords: 'Mindset Coaching, Persönlichkeitsentwicklung, Life Coach Zürich, Online Coaching, Selbstentwicklung, Transformationscoaching, Martina Domeniconi, Positives Mindset, Lebensveränderung, Coaching Schweiz',
      ogImage: '/lovable-uploads/eff14ab3-8502-4ea4-9c20-75fe9b485119.png',
      gaTrackingId: '',
      enableGa: false
    };
    
    try {
      const savedSeo = localStorage.getItem('seoSettings');
      if (savedSeo) {
        seoSettings = JSON.parse(savedSeo);
      }
    } catch (e) {
      console.log('Using default SEO settings');
    }
    
    // Generate the HTML content
    // In a real implementation, you would use proper SSR for React components
    const appHtml = `
      <header>
        <nav class="navbar">
          <div class="container">
            <!-- Navigation content -->
          </div>
        </nav>
      </header>
      <main>
        <section id="home" class="hero-section">
          <div class="hero-background"></div>
          <div class="container">
            <h1 class="hero-title">Mindset Coaching für ein glückliches und erfülltes Leben</h1>
            <!-- Hero section content -->
          </div>
        </section>
        <section id="services">
          <!-- Services section content -->
        </section>
        <section id="about">
          <!-- About section content -->
        </section>
        <section id="pricing">
          <!-- Pricing section content -->
        </section>
        <section id="contact">
          <!-- Contact section content -->
        </section>
      </main>
      <footer>
        <!-- Footer content -->
      </footer>
    `;
    
    // Read the template HTML file
    const templatePath = path.resolve(outputDir, 'index.html');
    if (!fs.existsSync(templatePath)) {
      console.error('Template file not found. Run buildStandalone.ts first.');
      return;
    }
    
    const templateHtml = fs.readFileSync(templatePath, 'utf8');
    
    // Use JSDOM to modify the HTML
    const dom = new JSDOM(templateHtml);
    const document = dom.window.document;
    
    // Update title and meta tags for SEO
    document.title = seoSettings.title;
    
    // Add schema.org structured data for a service business
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "Mindset Coaching mit Martina",
      "description": seoSettings.description,
      "url": "https://mindset-coach-martina.ch",
      "logo": "https://mindset-coach-martina.ch/lovable-uploads/abb0bc70-ae8b-43ce-867f-d7beece5a8a2.png",
      "image": seoSettings.ogImage,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Ruedi-Walter-strasse 4",
        "addressLocality": "Zürich",
        "postalCode": "8050",
        "addressCountry": "CH"
      },
      "telephone": "+41 788 400 481",
      "email": "info@mindset-coach-martina.ch",
      "openingHours": "Mo-Fr 09:00-18:00",
      "priceRange": "$$"
    });
    document.head.appendChild(schemaScript);
    
    // Add canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link') as HTMLLinkElement;
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = 'https://mindset-coach-martina.ch/';
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', seoSettings.description);
    
    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', seoSettings.keywords);
    
    // Update Open Graph meta tags
    const ogTags = {
      'og:title': seoSettings.title,
      'og:description': seoSettings.description,
      'og:type': 'website',
      'og:url': 'https://mindset-coach-martina.ch/',
      'og:image': seoSettings.ogImage,
      'og:site_name': 'Mindset Coaching mit Martina'
    };
    
    Object.entries(ogTags).forEach(([property, content]) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    });
    
    // Add Twitter card meta tags
    const twitterTags = {
      'twitter:card': 'summary_large_image',
      'twitter:site': '@martinadomeniconi',
      'twitter:title': seoSettings.title,
      'twitter:description': seoSettings.description,
      'twitter:image': seoSettings.ogImage
    };
    
    Object.entries(twitterTags).forEach(([name, content]) => {
      let metaTag = document.querySelector(`meta[name="${name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', name);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    });
    
    // Find the root element and inject the content
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.innerHTML = appHtml;
    }
    
    // Add Google Analytics if enabled
    if (seoSettings.enableGa && seoSettings.gaTrackingId) {
      const gaScript = document.createElement('script');
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${seoSettings.gaTrackingId}`;
      
      const gaConfig = document.createElement('script');
      gaConfig.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${seoSettings.gaTrackingId}');
      `;
      
      document.head.appendChild(gaScript);
      document.head.appendChild(gaConfig);
    }
    
    // Write the final HTML to the output file
    fs.writeFileSync(templatePath, dom.serialize());
    
    console.log('✅ HTML generation completed successfully!');
  } catch (error) {
    console.error('Error generating HTML:', error);
  }
};
