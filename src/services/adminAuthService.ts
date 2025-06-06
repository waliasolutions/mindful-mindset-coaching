import { supabase } from '@/integrations/supabase/client';

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'client';
}

export interface AdminUserWithDetails extends AdminUser {
  is_active: boolean;
  created_at: string;
  last_login_at: string | null;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user_data?: AdminUser;
  session_token?: string;
}

export interface SessionValidationResponse {
  valid: boolean;
  user_data?: AdminUser;
}

export interface RegisterUserResponse {
  success: boolean;
  message: string;
  user?: AdminUserWithDetails;
}

export interface GetUsersResponse {
  success: boolean;
  users?: AdminUserWithDetails[];
  message?: string;
}

class AdminAuthService {
  private sessionToken: string | null = null;

  constructor() {
    this.sessionToken = localStorage.getItem('admin_session_token');
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const { data, error } = await supabase.functions.invoke('admin-auth', {
        body: {
          action: 'login',
          email,
          password
        }
      });

      if (error) {
        console.error('Login request error:', error);
        return { success: false, message: 'Authentication failed' };
      }

      if (data.success && data.session_token) {
        this.sessionToken = data.session_token;
        localStorage.setItem('admin_session_token', data.session_token);
        localStorage.setItem('admin_user_data', JSON.stringify(data.user_data));
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error occurred' };
    }
  }

  async validateSession(): Promise<SessionValidationResponse> {
    if (!this.sessionToken) {
      return { valid: false };
    }

    try {
      const { data, error } = await supabase.functions.invoke('admin-auth', {
        body: {
          action: 'validate',
          sessionToken: this.sessionToken
        }
      });

      if (error) {
        console.error('Session validation error:', error);
        return { valid: false };
      }

      return data;
    } catch (error) {
      console.error('Session validation error:', error);
      return { valid: false };
    }
  }

  async logout(): Promise<boolean> {
    if (!this.sessionToken) {
      return true;
    }

    try {
      const { data, error } = await supabase.functions.invoke('admin-auth', {
        body: {
          action: 'logout',
          sessionToken: this.sessionToken
        }
      });

      if (error) {
        console.error('Logout error:', error);
      }

      this.sessionToken = null;
      localStorage.removeItem('admin_session_token');
      localStorage.removeItem('admin_user_data');

      return data?.success || true;
    } catch (error) {
      console.error('Logout error:', error);
      this.sessionToken = null;
      localStorage.removeItem('admin_session_token');
      localStorage.removeItem('admin_user_data');
      return true;
    }
  }

  async registerUser(email: string, password: string, role: 'admin' | 'client' = 'client'): Promise<RegisterUserResponse> {
    if (!this.sessionToken) {
      return { success: false, message: 'Not authenticated' };
    }

    try {
      const { data, error } = await supabase.functions.invoke('admin-auth', {
        body: {
          action: 'register',
          sessionToken: this.sessionToken,
          newUserEmail: email,
          newUserPassword: password,
          newUserRole: role
        }
      });

      if (error) {
        console.error('User registration error:', error);
        return { success: false, message: 'Registration failed' };
      }

      return data;
    } catch (error) {
      console.error('User registration error:', error);
      return { success: false, message: 'Network error occurred' };
    }
  }

  async getUsers(): Promise<GetUsersResponse> {
    if (!this.sessionToken) {
      return { success: false, message: 'Not authenticated' };
    }

    try {
      const { data, error } = await supabase.functions.invoke('admin-auth', {
        body: {
          action: 'getUsers',
          sessionToken: this.sessionToken
        }
      });

      if (error) {
        console.error('Get users error:', error);
        return { success: false, message: 'Failed to fetch users' };
      }

      return data;
    } catch (error) {
      console.error('Get users error:', error);
      return { success: false, message: 'Network error occurred' };
    }
  }

  getStoredUserData(): AdminUser | null {
    const userData = localStorage.getItem('admin_user_data');
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        return null;
      }
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!this.sessionToken;
  }
}

export const adminAuthService = new AdminAuthService();
