
import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { SESSION_TIMEOUT } from '@/utils/adminAuth';

export const useAdminSession = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [previewLoaded, setPreviewLoaded] = useState(false);

  // Update last activity timestamp
  const updateLastActivity = useCallback(() => {
    setLastActivity(Date.now());
  }, []);

  // Check for user activity and auto-logout after timeout
  useEffect(() => {
    if (!isAuthenticated) return;

    const activityEvents = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    activityEvents.forEach(event => {
      window.addEventListener(event, updateLastActivity);
    });
    
    const intervalId = setInterval(() => {
      const now = Date.now();
      if (now - lastActivity > SESSION_TIMEOUT) {
        handleLogout();
        toast({
          title: "Session expired",
          description: "You have been logged out due to inactivity.",
          variant: "default",
        });
      }
    }, 60000); // Check every minute
    
    return () => {
      activityEvents.forEach(event => {
        window.removeEventListener(event, updateLastActivity);
      });
      clearInterval(intervalId);
    };
  }, [isAuthenticated, lastActivity, updateLastActivity]);

  // Check if the user is locked out
  useEffect(() => {
    if (lockedUntil) {
      const now = Date.now();
      if (now < lockedUntil) {
        const timeLeft = Math.ceil((lockedUntil - now) / 1000 / 60);
        toast({
          title: "Account temporarily locked",
          description: `Too many failed login attempts. Please try again in ${timeLeft} minutes.`,
          variant: "destructive",
        });
      } else {
        setLockedUntil(null);
        setLoginAttempts(0);
      }
    }
  }, [lockedUntil]);

  // Check for saved authentication state on component mount
  useEffect(() => {
    const checkAuth = () => {
      setIsLoading(true);
      
      // Get the current timestamp
      const now = Date.now();
      
      // Get the stored auth data
      const adminAuthData = localStorage.getItem('adminAuthData');
      
      if (adminAuthData) {
        try {
          const authData = JSON.parse(adminAuthData);
          
          // Check if the auth data has expired
          if (authData.expires && authData.expires > now) {
            setIsAuthenticated(true);
          } else {
            // Auth data has expired, remove it
            localStorage.removeItem('adminAuthData');
            setIsAuthenticated(false);
          }
        } catch (error) {
          // Invalid JSON data, remove it
          localStorage.removeItem('adminAuthData');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      
      setIsLoading(false);
    };
    
    checkAuth();

    // Display admin URL notification
    toast({
      title: "Admin Portal",
      description: "You are at the admin login page. Use your admin credentials to log in.",
    });
  }, []);

  // Check for lockout state in local storage
  useEffect(() => {
    // Check if we're in a locked out state from storage
    const storedLockout = localStorage.getItem('adminLockout');
    if (storedLockout) {
      try {
        const lockoutData = JSON.parse(storedLockout);
        if (lockoutData.until && lockoutData.until > Date.now()) {
          setLockedUntil(lockoutData.until);
        } else {
          // Lockout period expired, remove it
          localStorage.removeItem('adminLockout');
        }
      } catch (error) {
        // Invalid JSON data, remove it
        localStorage.removeItem('adminLockout');
      }
    }
  }, []);

  const handleLogout = useCallback(() => {
    // Clear authentication data
    localStorage.removeItem('adminAuthData');
    setIsAuthenticated(false);
  }, []);

  return {
    isAuthenticated,
    setIsAuthenticated,
    isLoading,
    loginAttempts,
    setLoginAttempts,
    lockedUntil,
    setLockedUntil,
    lastActivity,
    previewLoaded,
    setPreviewLoaded,
    handleLogout
  };
};
