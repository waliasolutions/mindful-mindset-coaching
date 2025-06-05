
import React, { useState, useEffect } from 'react';
import { User, Shield, Edit, Trash2, Plus, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  role: 'super_admin' | 'admin' | 'editor';
}

const newUserSchema = z.object({
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein'),
  fullName: z.string().min(2, 'Der Name muss mindestens 2 Zeichen lang sein'),
  role: z.enum(['admin', 'editor']),
});

const UserManagement = () => {
  const { isSuperAdmin, user } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(newUserSchema),
    defaultValues: {
      email: '',
      fullName: '',
      role: 'editor' as const,
    },
  });

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id,
          full_name,
          created_at,
          user_roles (role)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching users:', error);
        toast({
          title: 'Fehler beim Laden der Benutzer',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      // Get emails from auth.users via the profiles_with_email view
      const { data: usersWithEmail, error: emailError } = await supabase
        .from('profiles_with_email')
        .select('id, email');

      if (emailError) {
        console.error('Error fetching emails:', emailError);
      }

      const emailMap = new Map(usersWithEmail?.map(u => [u.id, u.email]) || []);

      const formattedUsers: UserProfile[] = data?.map(profile => ({
        id: profile.id,
        email: emailMap.get(profile.id) || '',
        full_name: profile.full_name || '',
        created_at: profile.created_at,
        role: (profile.user_roles as any)?.[0]?.role || 'editor',
      })) || [];

      setUsers(formattedUsers);
    } catch (error) {
      console.error('Error in fetchUsers:', error);
      toast({
        title: 'Fehler',
        description: 'Ein unerwarteter Fehler ist aufgetreten',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isSuperAdmin) {
      fetchUsers();
    }
  }, [isSuperAdmin]);

  const handleCreateUser = async (data: z.infer<typeof newUserSchema>) => {
    try {
      // Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: data.email,
        password: Math.random().toString(36).slice(-12), // Generate random password
        email_confirm: true,
        user_metadata: {
          full_name: data.fullName,
        },
      });

      if (authError) {
        toast({
          title: 'Fehler beim Erstellen des Benutzers',
          description: authError.message,
          variant: 'destructive',
        });
        return;
      }

      // Update role if not default
      if (data.role !== 'editor') {
        const { error: roleError } = await supabase
          .from('user_roles')
          .update({ role: data.role })
          .eq('user_id', authData.user.id);

        if (roleError) {
          console.error('Error updating role:', roleError);
        }
      }

      toast({
        title: 'Benutzer erfolgreich erstellt',
        description: `${data.fullName} wurde als ${data.role === 'admin' ? 'Administrator' : 'Redakteur'} hinzugefügt`,
      });

      setIsDialogOpen(false);
      form.reset();
      fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error);
      toast({
        title: 'Fehler',
        description: 'Ein unerwarteter Fehler ist aufgetreten',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateUserRole = async (userId: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: newRole })
        .eq('user_id', userId);

      if (error) {
        toast({
          title: 'Fehler beim Aktualisieren der Rolle',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Rolle aktualisiert',
        description: 'Die Benutzerrolle wurde erfolgreich geändert',
      });

      fetchUsers();
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: 'Fehler',
        description: 'Ein unerwarteter Fehler ist aufgetreten',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Sind Sie sicher, dass Sie diesen Benutzer löschen möchten?')) {
      return;
    }

    try {
      const { error } = await supabase.auth.admin.deleteUser(userId);

      if (error) {
        toast({
          title: 'Fehler beim Löschen des Benutzers',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Benutzer gelöscht',
        description: 'Der Benutzer wurde erfolgreich gelöscht',
      });

      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: 'Fehler',
        description: 'Ein unerwarteter Fehler ist aufgetreten',
        variant: 'destructive',
      });
    }
  };

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'super_admin':
        return { label: 'Super Admin', color: 'bg-red-100 text-red-800' };
      case 'admin':
        return { label: 'Administrator', color: 'bg-blue-100 text-blue-800' };
      default:
        return { label: 'Redakteur', color: 'bg-green-100 text-green-800' };
    }
  };

  if (!isSuperAdmin) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center text-gray-500">
            <Shield className="mx-auto h-12 w-12 mb-4" />
            <p>Sie haben keine Berechtigung für die Benutzerverwaltung.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Benutzerverwaltung</h2>
          <p className="text-gray-600">Verwalten Sie Benutzer und deren Rollen</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-forest hover:bg-forest/90">
              <Plus className="mr-2 h-4 w-4" />
              Neuer Benutzer
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Neuen Benutzer erstellen</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleCreateUser)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-Mail</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="benutzer@beispiel.de" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vollständiger Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Max Mustermann" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rolle</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Rolle auswählen" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="admin">Administrator</SelectItem>
                          <SelectItem value="editor">Redakteur</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <Button type="submit" className="bg-forest hover:bg-forest/90">
                    Benutzer erstellen
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Abbrechen
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Alle Benutzer ({users.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4">Benutzer werden geladen...</div>
          ) : users.length === 0 ? (
            <div className="text-center py-4 text-gray-500">Keine Benutzer gefunden</div>
          ) : (
            <div className="space-y-4">
              {users.map((userData) => {
                const roleDisplay = getRoleDisplay(userData.role);
                const isCurrentUser = userData.id === user?.id;
                
                return (
                  <div key={userData.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium">
                          {userData.full_name || 'Kein Name'}
                          {isCurrentUser && (
                            <Badge variant="outline" className="ml-2">Sie</Badge>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">{userData.email}</div>
                        <div className="text-xs text-gray-400">
                          Erstellt: {new Date(userData.created_at).toLocaleDateString('de-DE')}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={roleDisplay.color}>
                        {roleDisplay.label}
                      </Badge>
                      {userData.role !== 'super_admin' && !isCurrentUser && (
                        <>
                          <Select
                            value={userData.role}
                            onValueChange={(value: 'admin' | 'editor') => handleUpdateUserRole(userData.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="admin">Administrator</SelectItem>
                              <SelectItem value="editor">Redakteur</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteUser(userData.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
