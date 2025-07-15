/**
 * Production-ready logging utility
 * Only logs errors in production, full logging in development
 */

const isDevelopment = import.meta.env.DEV;

export const logger = {
  info: (message: string, data?: any) => {
    if (isDevelopment) {
      console.log(message, data);
    }
  },
  
  warn: (message: string, data?: any) => {
    if (isDevelopment) {
      console.warn(message, data);
    }
  },
  
  error: (message: string, error?: any) => {
    // Always log errors, even in production
    console.error(message, error);
  },
  
  debug: (message: string, data?: any) => {
    if (isDevelopment) {
      console.debug(message, data);
    }
  }
};