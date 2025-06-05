
import React, { useState } from 'react';
import { Lock, User } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/hooks/useAuth';

const loginSchema = z.object({
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein'),
  password: z.string().min(6, 'Das Passwort muss mindestens 6 Zeichen lang sein'),
});

const signupSchema = z.object({
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein'),
  password: z.string().min(6, 'Das Passwort muss mindestens 6 Zeichen lang sein'),
  fullName: z.string().min(2, 'Der vollständige Name muss mindestens 2 Zeichen lang sein'),
});

const AuthLogin = () => {
  const { signIn, signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signupForm = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
    },
  });

  const handleLogin = async (data: z.infer<typeof loginSchema>) => {
    setIsLoading(true);
    try {
      const { error } = await signIn(data.email, data.password);
      
      if (error) {
        toast({
          title: 'Anmeldung fehlgeschlagen',
          description: error.message === 'Invalid login credentials' 
            ? 'Ungültige E-Mail-Adresse oder Passwort' 
            : error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Erfolgreich angemeldet',
          description: 'Willkommen im Admin-Portal',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Anmeldung fehlgeschlagen',
        description: 'Ein unerwarteter Fehler ist aufgetreten',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (data: z.infer<typeof signupSchema>) => {
    setIsLoading(true);
    try {
      const { error } = await signUp(data.email, data.password, data.fullName);
      
      if (error) {
        toast({
          title: 'Registrierung fehlgeschlagen',
          description: error.message === 'User already registered' 
            ? 'Ein Benutzer mit dieser E-Mail-Adresse existiert bereits' 
            : error.message,
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Registrierung erfolgreich',
          description: 'Bitte überprüfen Sie Ihre E-Mail für die Bestätigung',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Registrierung fehlgeschlagen',
        description: 'Ein unerwarteter Fehler ist aufgetreten',
        variant: 'destructive',
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
          <h1 className="text-2xl font-bold mt-4 text-gray-800">Admin Portal</h1>
          <p className="text-gray-500 mt-1">Bitte melden Sie sich an, um auf das Dashboard zuzugreifen</p>
        </div>
        
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Anmelden</TabsTrigger>
            <TabsTrigger value="signup">Registrieren</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-Mail</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="ihre.email@beispiel.de" 
                          {...field} 
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Passwort</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Ihr Passwort eingeben" 
                          {...field} 
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-forest hover:bg-forest/90" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Anmelden...' : 'Anmelden'}
                </Button>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="signup">
            <Form {...signupForm}>
              <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
                <FormField
                  control={signupForm.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vollständiger Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Max Mustermann" 
                          {...field} 
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={signupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-Mail</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="ihre.email@beispiel.de" 
                          {...field} 
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={signupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Passwort</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="Mindestens 6 Zeichen" 
                          {...field} 
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-forest hover:bg-forest/90" 
                  disabled={isLoading}
                >
                  {isLoading ? 'Registrieren...' : 'Registrieren'}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
        
        <div className="text-center mt-4">
          <a href="/" className="text-sm text-gray-500 hover:text-forest">
            Zur Startseite zurückkehren
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;
