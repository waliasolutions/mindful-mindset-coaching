
/**
 * Get the correct loading strategy based on priority
 */
export const getImageLoadingStrategy = (priority: 'high' | 'medium' | 'low'): 'eager' | 'lazy' => {
  switch (priority) {
    case 'high':
      return 'eager';
    default:
      return 'lazy';
  }
};
