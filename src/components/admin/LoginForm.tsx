
import React from 'react';
import { Lock } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  hashString, 
  ADMIN_USERNAME_HASH, 
  ADMIN_PASSWORD_HASH, 
  ADMIN_USERNAME, 
  ADMIN_PASSWORD,
  MAX_LOGIN_ATTEMPTS,
  LOCKOUT_DURATION,
  SESSION_TIMEOUT
} from '@/utils/adminAuth';

// Define the credential validator schema
const loginFormSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormProps = {
  loginAttempts: number;
  setLoginAttempts: React.Dispatch<React.SetStateAction<number>>;
  lockedUntil: number | null;
  setLockedUntil: React.Dispatch<React.SetStateAction<number | null>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginForm: React.FC<LoginFormProps> = ({ 
  loginAttempts, 
  setLoginAttempts, 
  lockedUntil, 
  setLockedUntil, 
  setIsAuthenticated 
}) => {
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

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
};

export default LoginForm;
