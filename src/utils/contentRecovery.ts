
import { resetContentOverrides } from '@/hooks/useContentBridge';

export const diagnoseContentIssues = () => {
  console.group('Content Diagnosis');
  
  // Check localStorage
  try {
    const adminOverrides = localStorage.getItem('adminContentOverrides');
    console.log('Admin overrides in localStorage:', adminOverrides);
    
    if (adminOverrides) {
      const parsed = JSON.parse(adminOverrides);
      console.log('Parsed overrides:', parsed);
      console.log('Override keys:', Object.keys(parsed));
    }
  } catch (error) {
    console.error('Error reading admin overrides:', error);
  }
  
  // Check for React errors
  const errors = (window as any).__REACT_ERROR_OVERLAY_GLOBAL_HOOK__;
  if (errors) {
    console.log('React errors detected:', errors);
  }
  
  console.groupEnd();
};

export const recoverContent = () => {
  console.log('Attempting content recovery...');
  
  // Clear potentially corrupted data
  try {
    localStorage.removeItem('adminContentOverrides');
    console.log('Cleared admin overrides');
  } catch (error) {
    console.error('Error clearing admin overrides:', error);
  }
  
  // Reset content bridge
  resetContentOverrides();
};

// Add global functions for debugging
if (typeof window !== 'undefined') {
  (window as any).diagnoseContent = diagnoseContentIssues;
  (window as any).recoverContent = recoverContent;
}
