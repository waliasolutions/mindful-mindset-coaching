
/**
 * Determines appropriate loading strategy based on image position
 */
export const getImageLoadingStrategy = (priority: 'high' | 'medium' | 'low' = 'medium'): 'eager' | 'lazy' => {
  switch (priority) {
    case 'high':
      return 'eager'; // Load immediately, good for above-the-fold content
    case 'low':
    case 'medium':
    default:
      return 'lazy'; // Load when user scrolls near it
  }
};
