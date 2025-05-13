
// Export everything from image utilities
export * from './loading';
export * from './responsive';
export * from './webp';

// For the generateAltText function, explicitly re-export it from alt.ts
export { generateAltText } from './alt';

// Export other functions from seo.ts (but not generateAltText which would cause ambiguity)
export { optimizeImageForSEO } from './seo';
