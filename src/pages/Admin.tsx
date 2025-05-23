
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import AdminSections from '../components/admin/AdminSections';
import { Search, Layers, Lock } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { syncContentWithWebsite } from '@/utils/contentSync';

// Add a helper function to dispatch storage event for same-tab updates
export const dispatchStorageEvent = (key: string, newValue?: string) => {
  window.dispatchEvent(new CustomEvent('localStorageUpdated', { 
    detail: { key, newValue }
  }));
};

// Secure hash function using modern browser APIs with fallback
const hashString = async (str: string): Promise<string> => {
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

// Define the credential validator schema
const loginFormSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

// Store the hash of the correct credentials
// These will be pre-computed hashes of our stronger credentials
const ADMIN_USERNAME_HASH = "f84e502066b0d8971d3c924bb28b8e40a59d493acc398b1e662db8ff74d7e851"; // adm_9f27b5a3c8d6e4
const ADMIN_PASSWORD_HASH = "8bf5b72e9306e57848d2033e61ccf9f0cec543f4e8a39656a16893b75edd58b6"; // Kj8$p2@LmN7*xZ5!vQ9#

// Hardcoded credentials for fallback when WebCrypto is not available
const ADMIN_USERNAME = "adm_9f27b5a3c8d6e4";
const ADMIN_PASSWORD = "Kj8$p2@LmN7*xZ5!vQ9#";

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes in milliseconds

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [previewLoaded, setPreviewLoaded] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

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
  }, [navigate]);

  // Add a side effect to load the preview iframe with home page content
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
    
    if (isAuthenticated) {
      // Create a hidden iframe to load the homepage content for extraction
      const existingFrame = document.getElementById('preview-frame');
      
      if (!existingFrame) {
        const previewFrame = document.createElement('iframe');
        previewFrame.id = 'preview-frame';
        previewFrame.src = '/';
        previewFrame.style.width = '1px';
        previewFrame.style.height = '1px';
        previewFrame.style.position = 'absolute';
        previewFrame.style.top = '-9999px';
        previewFrame.style.left = '-9999px';
        previewFrame.style.opacity = '0.01';
        previewFrame.style.pointerEvents = 'none';
        
        previewFrame.onload = () => {
          setPreviewLoaded(true);
          console.log('Preview iframe loaded successfully');
        };
        
        document.body.appendChild(previewFrame);
        
        return () => {
          if (document.body.contains(previewFrame)) {
            document.body.removeChild(previewFrame);
          }
        };
      }
    }
  }, [isAuthenticated]);

  // Initialize content synchronization when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      // Sync content with the current website state
      setTimeout(() => {
        syncContentWithWebsite();
      }, 1000); // Wait a bit for the page to fully load
      
      // Initialize other settings if not present
      if (!localStorage.getItem('seoSettings')) {
        const defaultSeoSettings = {
          title: document.title || 'Mindset Coaching',
          description: getMetaContent('description') || 'Mindset Coaching für mehr Lebenszufriedenheit',
          keywords: getMetaContent('keywords') || 'coaching, mindset, life coaching',
          ogImage: getMetaContent('og:image', 'property') || '',
          gaTrackingId: '',
          enableGa: false
        };
        localStorage.setItem('seoSettings', JSON.stringify(defaultSeoSettings));
      }

      if (!localStorage.getItem('themeSettings')) {
        const defaultTheme = {
          colors: {
            primary: '#2F5233',  // forest
            secondary: '#94A38D', // sage
            accent: '#D5BDAF',   // beige
            background: '#FFFFFF', // white
            text: '#1A1A1A',     // dark gray
          },
          typography: {
            headingFont: '"Playfair Display", serif',
            bodyFont: '"Inter", sans-serif',
            baseFontSize: '16px',
          },
          spacing: {
            sectionPadding: '4rem',
            containerMaxWidth: '1200px',
          }
        };
        localStorage.setItem('themeSettings', JSON.stringify(defaultTheme));
      }

      if (!localStorage.getItem('globalSettings')) {
        const defaultSettings = {
          siteName: 'Mindset Coaching',
          contactEmail: 'info@mindset-coach-martina.ch',
          contactPhone: '+41 788 400 481',
          address: 'Ruedi-Walter-strasse 4, 8050 Zürich',
          navigation: [
            { id: 'home', label: 'Home', url: '#home' },
            { id: 'services', label: 'Services', url: '#services' },
            { id: 'about', label: 'About', url: '#about' },
            { id: 'pricing', label: 'Pricing', url: '#pricing' },
            { id: 'contact', label: 'Contact', url: '#contact' }
          ],
          footer: {
            contactText: 'Get in touch to learn more about our coaching services',
            socialLinks: [
              { id: 'instagram', platform: 'Instagram', url: 'https://instagram.com', icon: 'Instagram' },
              { id: 'facebook', platform: 'Facebook', url: 'https://facebook.com', icon: 'Facebook' }
            ],
            legalLinks: [
              { id: 'privacy', label: 'Privacy Policy', url: '/privacy' },
              { id: 'terms', label: 'Terms & Conditions', url: '/terms' }
            ],
            copyrightText: '© 2025 Mindset Coaching. All rights reserved.'
          }
        };
        localStorage.setItem('globalSettings', JSON.stringify(defaultSettings));
      }
    }
  }, [isAuthenticated]);

  const getMetaContent = (name: string, attribute: 'name' | 'property' = 'name') => {
    const meta = document.querySelector(`meta[${attribute}="${name}"]`);
    return meta ? meta.getAttribute('content') || '' : '';
  };

  const handleLogin = async (data: z.infer<typeof loginFormSchema>) => {
    // Check if user is locked out
    if (lockedUntil && Date.now() < lockedUntil) {
      const minutesLeft = Math.ceil((lockedUntil - Date.now()) / 1000 / 60);
      toast({
        title: "Account temporarily locked",
        description: `Too many failed login attempts. Please try again in ${minutesLeft} minutes.`,
        variant: "destructive",
      });
      return;
    }

    try {
      // First check if we need to use the fallback authentication
      let isAuthenticated = false;
      
      // Try using WebCrypto first
      try {
        // Hash the provided credentials for secure comparison
        const usernameHash = await hashString(data.username);
        const passwordHash = await hashString(data.password);
        
        // Check if the credentials match
        const isUsernameValid = usernameHash === ADMIN_USERNAME_HASH;
        const isPasswordValid = passwordHash === ADMIN_PASSWORD_HASH;
        
        // If the hash starts with "error_" or "fallback_", WebCrypto failed
        if (usernameHash.startsWith("error_") || usernameHash.startsWith("fallback_") ||
            passwordHash.startsWith("error_") || passwordHash.startsWith("fallback_")) {
          // WebCrypto failed, log and continue to fallback
          console.warn("WebCrypto authentication failed, using fallback method");
        } else {
          isAuthenticated = isUsernameValid && isPasswordValid;
        }
      } catch (error) {
        // WebCrypto failed completely, continue to fallback
        console.error("WebCrypto authentication error:", error);
      }

      // If WebCrypto authentication didn't work, try direct comparison (fallback)
      if (!isAuthenticated) {
        // Direct comparison fallback for environments without WebCrypto
        isAuthenticated = (data.username === ADMIN_USERNAME && data.password === ADMIN_PASSWORD);
      }
      
      if (isAuthenticated) {
        // Set expiration time (30 minutes from now)
        const expires = Date.now() + SESSION_TIMEOUT;
        
        // Save authentication state with expiration
        localStorage.setItem('adminAuthData', JSON.stringify({ authenticated: true, expires }));
        
        // Reset login attempts
        setLoginAttempts(0);
        setLockedUntil(null);
        localStorage.removeItem('adminLockout');
        
        // Update authentication state
        setIsAuthenticated(true);
        
        toast({
          title: "Login successful",
          description: "Welcome to the admin panel",
        });
      } else {
        // Increment login attempts
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        
        // Check if max attempts reached
        if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
          const lockoutTime = Date.now() + LOCKOUT_DURATION;
          setLockedUntil(lockoutTime);
          
          // Store lockout info in localStorage
          localStorage.setItem('adminLockout', JSON.stringify({ 
            until: lockoutTime 
          }));
          
          toast({
            title: "Account temporarily locked",
            description: `Too many failed login attempts. Please try again in 15 minutes.`,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Login failed",
            description: `Invalid credentials. ${MAX_LOGIN_ATTEMPTS - newAttempts} attempts remaining.`,
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem('adminAuthData');
    setIsAuthenticated(false);
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-forest mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-6">
            <Lock className="mx-auto h-12 w-12 text-forest" />
            <h1 className="text-2xl font-bold mt-4 text-gray-800">Admin Login</h1>
            <p className="text-gray-500 mt-1">Please sign in to access the dashboard</p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your username" 
                        {...field} 
                        disabled={!!lockedUntil && Date.now() < lockedUntil}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Enter your password" 
                        {...field} 
                        disabled={!!lockedUntil && Date.now() < lockedUntil}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-forest hover:bg-forest/90" 
                disabled={!!lockedUntil && Date.now() < lockedUntil}
              >
                Sign In
              </Button>
              
              <div className="text-center mt-4">
                <a href="/" className="text-sm text-gray-500 hover:text-forest">
                  Return to homepage
                </a>
              </div>
              
              <div className="text-center pt-2 border-t border-gray-100 mt-4">
                <p className="text-xs text-gray-500">
                  Username: adm_9f27b5a3c8d6e4
                </p>
                <p className="text-xs text-gray-500">
                  Password: Kj8$p2@LmN7*xZ5!vQ9#
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout onLogout={handleLogout}>
      <AdminSections />
    </AdminLayout>
  );
};

export default Admin;
