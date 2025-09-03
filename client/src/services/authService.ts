import { api } from '@/lib/api';

export interface AdminUser {
  id: number;
  email: string;
  name: string;
  // Add other admin user fields as needed
}

export const authService = {
  /**
   * Login with email and password
   */
  async login(email: string, password: string): Promise<{ user: AdminUser; token: string }> {
    try {
      const response = await api.post<{ user: AdminUser; token: string }>('/api/admin/login', {
        email,
        password,
      });

      // Store the token in localStorage
      if (response.token) {
        localStorage.setItem('admin_token', response.token);
      }

      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw new Error(
        error instanceof Error 
          ? error.message 
          : 'Giriş yapılırken bir hata oluştu. Lütfen bilgilerinizi kontrol edip tekrar deneyin.'
      );
    }
  },

  /**
   * Logout the current admin user
   */
  logout(): void {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin/login';
  },

  /**
   * Get the current admin user
   */
  async getCurrentUser(): Promise<AdminUser | null> {
    const token = localStorage.getItem('admin_token');
    if (!token) return null;

    try {
      // This endpoint should validate the token and return the user
      const response = await api.get<{ user: AdminUser }>('/api/admin/me');
      return response.user;
    } catch (error) {
      console.error('Failed to fetch current user:', error);
      this.logout();
      return null;
    }
  },

  /**
   * Check if the user is authenticated
   */
  isAuthenticated(): boolean {
    return !!localStorage.getItem('admin_token');
  },

  /**
   * Get the auth token
   */
  getToken(): string | null {
    return localStorage.getItem('admin_token');
  },
};
