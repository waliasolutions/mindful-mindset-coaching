
// Secure hash function using modern browser APIs with fallback
export const hashString = async (str: string): Promise<string> => {
  try {
    // Check if the browser supports subtle crypto
    if (window.crypto && window.crypto.subtle) {
      const encoder = new TextEncoder();
      const data = encoder.encode(str);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } else {
      console.warn("WebCrypto API not available, using fallback authentication method");
      // If WebCrypto not available, use a simpler approach for development
      return `fallback_${str.length}_${str.charAt(0)}${str.charAt(str.length-1)}`;
    }
  } catch (error) {
    console.error("Hashing error:", error);
    // If something goes wrong with hashing, use a detectable fallback pattern
    return `error_${str.length}_${str.charAt(0)}${str.charAt(str.length-1)}`;
  }
};

// Constants for authentication
export const ADMIN_USERNAME_HASH = "f84e502066b0d8971d3c924bb28b8e40a59d493acc398b1e662db8ff74d7e851"; // adm_9f27b5a3c8d6e4
export const ADMIN_PASSWORD_HASH = "8bf5b72e9306e57848d2033e61ccf9f0cec543f4e8a39656a16893b75edd58b6"; // Kj8$p2@LmN7*xZ5!vQ9#

// Hardcoded credentials for fallback when WebCrypto is not available
export const ADMIN_USERNAME = "adm_9f27b5a3c8d6e4";
export const ADMIN_PASSWORD = "Kj8$p2@LmN7*xZ5!vQ9#";

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
