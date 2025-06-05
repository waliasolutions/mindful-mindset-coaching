// Legacy auth utilities - now replaced by Supabase authentication
// Keeping for backwards compatibility during transition

export const hashString = async (str: string): Promise<string> => {
  console.warn('hashString is deprecated - using Supabase authentication instead');
  return str;
};

export const ADMIN_USERNAME_HASH = "deprecated";
export const ADMIN_PASSWORD_HASH = "deprecated";
export const ADMIN_USERNAME = "deprecated";
export const ADMIN_PASSWORD = "deprecated";

export const MAX_LOGIN_ATTEMPTS = 5;
export const LOCKOUT_DURATION = 15 * 60 * 1000;
export const SESSION_TIMEOUT = 30 * 60 * 1000;

export const dispatchStorageEvent = (key: string, newValue?: string) => {
  window.dispatchEvent(new CustomEvent('localStorageUpdated', { 
    detail: { key, newValue }
  }));
};
