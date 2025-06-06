import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { adminAuthService } from '@/services/adminAuthService';
import { AdminRole, getUserRole } from '@/utils/adminAuth';

// Define the credential validator schema
const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof loginFormSchema>;

type LoginFormProps = {
  loginAttempts: number;
  setLoginAttempts: (attempts: number) => void;
  lockedUntil: number | null;
  setLockedUntil: (until: number | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setUserRole: (role: AdminRole) => void;
};

const LoginForm: React.FC<LoginFormProps> = ({ 
  loginAttempts, 
  setLoginAttempts, 
  lockedUntil, 
  setLockedUntil, 
  setIsAuthenticated,
  setUserRole 
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFormSubmit = async (formValues: FormValues) => {
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

    setIsLoading(true);

    try {
      const result = await adminAuthService.login(formValues.email, formValues.password);

      if (result.success && result.user_data) {
        // Determine and set user role based on the role from database
        const role = result.user_data.role;
        setUserRole(role);

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
        // Handle failed login
        const newAttempts = loginAttempts + 1;
        setLoginAttempts(newAttempts);
        
        // Check if max attempts reached (using client-side tracking for UI)
        if (newAttempts >= 5) {
          const lockoutTime = Date.now() + (15 * 60 * 1000);
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
            description: result.message || `Invalid credentials. ${5 - newAttempts} attempts remaining.`,
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
    } finally {
      setIsLoading(false);
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
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email"
                      placeholder="Enter your email" 
                      {...field} 
                      disabled={isLoading || (!!lockedUntil && Date.now() < lockedUntil)}
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
                      disabled={isLoading || (!!lockedUntil && Date.now() < lockedUntil)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-forest hover:bg-forest/90" 
              disabled={isLoading || (!!lockedUntil && Date.now() < lockedUntil)}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
            
            <div className="text-center mt-4">
              <a href="/" className="text-sm text-gray-500 hover:text-forest">
                Return to homepage
              </a>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
