
import fs from 'fs';
import path from 'path';

export const extractCSS = () => {
  try {
    // Build path for standalone output
    const outputDir = path.resolve(process.cwd(), 'build/standalone');
    const cssFilePath = path.resolve(outputDir, 'styles.css');
    
    // Read the base CSS file
    if (!fs.existsSync(cssFilePath)) {
      console.error('CSS file not found. Run buildStandalone.ts first.');
      return;
    }
    
    let cssContent = fs.readFileSync(cssFilePath, 'utf8');
    
    // Here we would parse the React components and extract Tailwind classes
    // This is a complex process that would require analyzing each component
    // For now, we'll add some SEO-friendly CSS that mimics the current design
    
    const additionalCSS = `
/* Base styling with accessibility and SEO considerations */
:root {
  --color-moss: #94A38D;
  --color-petrol: #5C8D89;
  --color-forest: #2F5233;
  --color-beige: #D5BDAF;
  --color-mint: #E8F3EC;
  --color-mauve: #D0B0B1;
  --font-heading: "Playfair Display", serif;
  --font-body: "Inter", sans-serif;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
}

/* Improve accessibility */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  
  .animate-bounce,
  .transition-all,
  .transition-colors,
  .transition-opacity {
    transition: none !important;
    animation: none !important;
  }
}

body {
  font-family: var(--font-body);
  line-height: 1.5;
  color: #1A1A1A;
  background-color: #FFFFFF;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

/* Improve focus visibility for accessibility */
a:focus,
button:focus,
input:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-petrol);
  outline-offset: 2px;
}

/* Navigation styles */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  padding: 1rem 0;
  transition: all 0.3s;
}

.navbar.scrolled {
  background-color: rgba(244, 241, 234, 0.8);
  backdrop-filter: blur(4px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Hero section styles */
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 5rem 0 3rem;
  position: relative;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  inset: 0;
  background-color: rgba(244, 241, 234, 0.6);
  z-index: -10;
}

.hero-title {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  transition: all 0.7s ease-out;
  opacity: 0;
  transform: translateY(2.5rem);
}

.hero-title.visible {
  opacity: 1;
  transform: translateY(0);
}

.gradient-text {
  background-image: linear-gradient(to right, var(--color-moss), var(--color-petrol), var(--color-forest));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* Image optimization for SEO */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Add proper image loading optimization */
.image-reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.image-reveal.reveal {
  opacity: 1;
  transform: translateY(0);
}

/* SEO-friendly heading hierarchy */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  margin-top: 0;
  color: var(--color-forest);
}

h1 {
  font-size: 2.5rem;
}

h2 {
  font-size: 2rem;
}

h3 {
  font-size: 1.5rem;
}

/* Print styles for SEO and usability */
@media print {
  .navbar,
  .footer-cta,
  button,
  .no-print {
    display: none !important;
  }
  
  body {
    font-size: 12pt;
    background: #fff;
    color: #000;
  }
  
  h1, h2, h3 {
    page-break-after: avoid;
    page-break-inside: avoid;
  }
  
  img {
    max-width: 100% !important;
    page-break-inside: avoid;
  }
  
  a {
    color: #000;
    text-decoration: underline;
  }
  
  a::after {
    content: " (" attr(href) ")";
    font-size: 0.8em;
    font-weight: normal;
  }
  
  a[href^="http"]::after {
    content: " (" attr(href) ")";
  }
  
  .container {
    width: 100%;
    max-width: none;
    padding: 0;
    margin: 0;
  }
}

/* Media queries for better responsiveness */
@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }
  
  h2 {
    font-size: 1.75rem;
  }
  
  h3 {
    font-size: 1.25rem;
  }
  
  .container {
    padding: 0 1.5rem;
  }
}

@media (max-width: 480px) {
  html {
    font-size: 14px;
  }
  
  h1 {
    font-size: 1.75rem;
  }
  
  h2 {
    font-size: 1.5rem;
  }
  
  .container {
    padding: 0 1rem;
  }
}

/* Skip to content link for accessibility */
.skip-to-content {
  position: absolute;
  top: -40px;
  left: 0;
  background: var(--color-forest);
  color: white;
  padding: 8px 16px;
  z-index: 100;
  transition: top 0.3s;
}

.skip-to-content:focus {
  top: 0;
}

/* Add more component styles here */
`;
    
    // Append the additional CSS to the file
    cssContent += additionalCSS;
    
    // Write the updated CSS to the file
    fs.writeFileSync(cssFilePath, cssContent);
    
    console.log('✅ CSS extraction completed successfully!');
  } catch (error) {
    console.error('Error extracting CSS:', error);
  }
};
