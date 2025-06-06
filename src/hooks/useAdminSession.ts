
import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';
import { adminAuthService } from '@/services/adminAuthService';
import { AdminRole } from '@/utils/adminAuth';

const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds

export const useAdminSession = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [previewLoaded, setPreviewLoaded] = useState(false);
  const [userRole, setUserRole] = useState<AdminRole>('client');

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
    const checkAuth = async () => {
      setIsLoading(true);
      
      try {
        // Check if we have a session token
        if (adminAuthService.isAuthenticated()) {
          // Validate the session with the server
          const validationResult = await adminAuthService.validateSession();
          
          if (validationResult.valid && validationResult.user_data) {
            setIsAuthenticated(true);
            setUserRole(validationResult.user_data.role);
          } else {
            // Session invalid, clear local storage
            await adminAuthService.logout();
            setIsAuthenticated(false);
          }
        } else {
          // No session token found
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Auth validation error:', error);
        // On error, assume not authenticated
        await adminAuthService.logout();
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

  const handleLogout = useCallback(async () => {
    try {
      await adminAuthService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    
    // Clear authentication state
    setIsAuthenticated(false);
    setUserRole('client');
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
    userRole,
    setUserRole,
    handleLogout
  };
};
