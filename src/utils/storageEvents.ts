
/**
 * Utility function to dispatch a custom storage event for same-tab communication
 * between admin and frontend components
 */
export const dispatchStorageEvent = (key: string, newValue?: string) => {
  window.dispatchEvent(new CustomEvent('localStorageUpdated', { 
    detail: { key, newValue }
  }));
};
