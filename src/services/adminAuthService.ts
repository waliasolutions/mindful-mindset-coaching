
import { supabase } from '@/integrations/supabase/client';

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin' | 'client';
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

class AdminAuthService {
  private sessionToken: string | null = null;

  constructor() {
    // Load session token from localStorage on initialization
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

      // Clear local storage regardless of server response
      this.sessionToken = null;
      localStorage.removeItem('admin_session_token');
      localStorage.removeItem('admin_user_data');

      return data?.success || true;
    } catch (error) {
      console.error('Logout error:', error);
      // Clear local storage even if server request fails
      this.sessionToken = null;
      localStorage.removeItem('admin_session_token');
      localStorage.removeItem('admin_user_data');
      return true;
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
