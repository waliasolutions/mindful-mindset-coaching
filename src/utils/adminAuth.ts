// Role types for the admin portal
export type AdminRole = 'admin' | 'client';

// Check if a user is an admin based on email domain or role
export const isAdminUser = (email: string): boolean => {
  return email.includes('admin') || email.endsWith('@mindset-coaching.com');
};

// Determine role based on user data from database
export const getUserRole = (email: string): AdminRole => {
  // This is now handled by the database, but we keep this for compatibility
  return email.includes('admin') ? 'admin' : 'client';
};

// Authentication constants
export const MAX_LOGIN_ATTEMPTS = 5;
export const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds
export const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds

// Add a helper function to dispatch storage event for same-tab updates
export const dispatchStorageEvent = (key: string, newValue?: string) => {
  window.dispatchEvent(new CustomEvent('localStorageUpdated', { 
    detail: { key, newValue }
  }));
};
