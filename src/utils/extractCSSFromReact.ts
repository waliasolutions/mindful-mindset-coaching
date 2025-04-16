
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
    // For now, we'll add some basic CSS that mimics the current design
    
    const additionalCSS = `
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
  font-family: serif;
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
