import { supabase } from '@/integrations/supabase/client';

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

export interface AdminUserWithDetails extends AdminUser {
  created_at: string;
  full_name?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user_data?: AdminUser;
}

export interface SessionValidationResponse {
  valid: boolean;
  user_data?: AdminUser;
}

export interface RegisterUserResponse {
  success: boolean;
  message: string;
}

export interface UpdateUserResponse {
  success: boolean;
  message: string;
}

export interface GetUsersResponse {
  success: boolean;
  users?: AdminUserWithDetails[];
  message?: string;
}

export interface UpdateUserData {
  role?: 'admin' | 'user';
}

/**
 * AdminAuthService handles authentication using Supabase Auth with role-based access
 */
class AdminAuthService {
  private readonly USER_DATA_KEY = 'admin_user_data';

  /**
   * Logs in a user with email and password using Supabase Auth
   */
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        return {
          success: false,
          message: authError.message || 'Login failed',
        };
      }

      if (!authData.user) {
        return {
          success: false,
          message: 'Authentication failed',
        };
      }

      // Get user role from user_roles table
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', authData.user.id)
        .single();

      if (roleError || !roleData) {
        // If no role found, user is not authorized for admin panel
        await supabase.auth.signOut();
        return {
          success: false,
          message: 'You do not have permission to access the admin panel',
        };
      }

      const userData: AdminUser = {
        id: authData.user.id,
        email: authData.user.email!,
        role: roleData.role as 'admin' | 'user',
      };

      // Store user data for quick access
      localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(userData));

      return {
        success: true,
        message: 'Login successful',
        user_data: userData,
      };
    } catch (error) {
      console.error('Login exception:', error);
      return {
        success: false,
        message: 'An unexpected error occurred during login',
      };
    }
  }

  /**
   * Validates the current session using Supabase Auth
   */
  async validateSession(): Promise<SessionValidationResponse> {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error || !session) {
        this.clearSession();
        return { valid: false };
      }

      // Get user role
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', session.user.id)
        .single();

      if (roleError || !roleData) {
        this.clearSession();
        return { valid: false };
      }

      const userData: AdminUser = {
        id: session.user.id,
        email: session.user.email!,
        role: roleData.role as 'admin' | 'user',
      };

      // Update stored user data
      localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(userData));

      return {
        valid: true,
        user_data: userData,
      };
    } catch (error) {
      console.error('Session validation error:', error);
      this.clearSession();
      return { valid: false };
    }
  }

  /**
   * Logs out the current user
   */
  async logout(): Promise<boolean> {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearSession();
    }
    return true;
  }

  /**
   * Registers a new user using Supabase Auth (admin only)
   */
  async registerUser(
    email: string,
    password: string,
    role: 'admin' | 'user' = 'user'
  ): Promise<RegisterUserResponse> {
    try {
      // Check if current user is admin
      const currentUser = this.getStoredUserData();
      if (!currentUser || currentUser.role !== 'admin') {
        return {
          success: false,
          message: 'Only administrators can register new users',
        };
      }

      // Create user via Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/admin`,
        },
      });

      if (authError) {
        return {
          success: false,
          message: authError.message || 'Failed to create user',
        };
      }

      if (!authData.user) {
        return {
          success: false,
          message: 'Failed to create user',
        };
      }

      // Set user role
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: authData.user.id,
          role: role,
        });

      if (roleError) {
        return {
          success: false,
          message: 'User created but failed to assign role',
        };
      }

      return {
        success: true,
        message: 'User registered successfully',
      };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        message: 'An unexpected error occurred during registration',
      };
    }
  }

  /**
   * Updates a user's role (admin only)
   */
  async updateUser(
    userId: string,
    updateData: UpdateUserData
  ): Promise<UpdateUserResponse> {
    try {
      // Check if current user is admin
      const currentUser = this.getStoredUserData();
      if (!currentUser || currentUser.role !== 'admin') {
        return {
          success: false,
          message: 'Only administrators can update user roles',
        };
      }

      if (updateData.role) {
        const { error } = await supabase
          .from('user_roles')
          .update({ role: updateData.role })
          .eq('user_id', userId);

        if (error) {
          return {
            success: false,
            message: error.message || 'Failed to update role',
          };
        }
      }

      return {
        success: true,
        message: 'User updated successfully',
      };
    } catch (error) {
      console.error('Update user error:', error);
      return {
        success: false,
        message: 'An unexpected error occurred during update',
      };
    }
  }

  /**
   * Gets all users with their roles (admin only)
   */
  async getUsers(): Promise<GetUsersResponse> {
    try {
      const { data, error } = await supabase.rpc('get_users_for_admin');

      if (error) {
        return {
          success: false,
          message: error.message || 'Failed to fetch users',
        };
      }

      return {
        success: true,
        users: data as AdminUserWithDetails[],
      };
    } catch (error) {
      console.error('Get users error:', error);
      return {
        success: false,
        message: 'An unexpected error occurred while fetching users',
      };
    }
  }

  /**
   * Gets stored user data from localStorage
   */
  getStoredUserData(): AdminUser | null {
    try {
      const userData = localStorage.getItem(this.USER_DATA_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch {
      return null;
    }
  }

  /**
   * Checks if user is authenticated via Supabase session
   */
  async isAuthenticated(): Promise<boolean> {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  }

  /**
   * Clears session data from localStorage
   */
  private clearSession(): void {
    localStorage.removeItem(this.USER_DATA_KEY);
  }
}

export const adminAuthService = new AdminAuthService();
