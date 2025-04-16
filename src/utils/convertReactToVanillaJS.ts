
import fs from 'fs';
import path from 'path';

export const convertToVanillaJS = () => {
  try {
    // Build path for standalone output
    const outputDir = path.resolve(process.cwd(), 'build/standalone');
    const jsFilePath = path.resolve(outputDir, 'scripts.js');
    
    // Read the base JS file
    if (!fs.existsSync(jsFilePath)) {
      console.error('JS file not found. Run buildStandalone.ts first.');
      return;
    }
    
    let jsContent = fs.readFileSync(jsFilePath, 'utf8');
    
    // Here we would convert React functionality to vanilla JS
    // This is a simplified version of the essential functionality
    
    const additionalJS = `
// Navbar scroll effect
function handleScroll() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Active section tracking
  const sections = ['services', 'about', 'pricing', 'contact'];
  const scrollPosition = window.scrollY + 100;
  
  for (const sectionId of sections) {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop;
      const offsetHeight = element.offsetHeight;
      
      if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
        setActiveSection(sectionId);
        break;
      }
    }
  }
}

function setActiveSection(sectionId) {
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('href') === '#' + sectionId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
  const target = e.target;
  if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
    e.preventDefault();
    const id = target.getAttribute('href')?.slice(1);
    const element = document.getElementById(id);
    
    if (element) {
      const navbarHeight = 80;
      const top = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
      
      window.scrollTo({
        top,
        behavior: 'smooth'
      });
    }
  }
});

// Reveal animations
function handleRevealElements() {
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
}

// Initialize elements
function initHeroElements() {
  const elements = [
    document.querySelector('.hero-title'),
    document.querySelector('.hero-subtitle'),
    document.querySelector('.hero-text'),
    document.querySelector('.hero-cta')
  ];
  
  elements.forEach((el, index) => {
    if (el) {
      setTimeout(() => {
        el.classList.add('visible');
      }, 300 * (index + 1));
    }
  });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize hero animations
  initHeroElements();
  
  // Setup scroll handlers
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('scroll', handleRevealElements);
  
  // Initial calls
  handleScroll();
  handleRevealElements();
  
  console.log('Standalone website initialized successfully');
});
`;
    
    // Append the additional JS to the file
    jsContent += additionalJS;
    
    // Write the updated JS to the file
    fs.writeFileSync(jsFilePath, jsContent);
    
    console.log('✅ JavaScript conversion completed successfully!');
  } catch (error) {
    console.error('Error converting JavaScript:', error);
  }
};
