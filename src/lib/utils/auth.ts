import { AuthResponse, LoginCredentials } from '@/types/auth';
import { API_URL } from '@/lib/constants/config';
import Cookies from 'js-cookie';

export const authService = {
  login: async (credentials: LoginCredentials) => {
    try {
      if (!API_URL) throw new Error('API URL not configured');

      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...credentials,
          expiresInMins: 60,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data: AuthResponse = await response.json();
      
      // Store tokens in cookies
      Cookies.set('accessToken', data.accessToken, { expires: 1 }); // 1 day
      Cookies.set('refreshToken', data.refreshToken, { expires: 7 }); // 7 days
      
      return data;
    } catch (error) {
      throw error;
    }
  },

  getCurrentUser: async (token: string) => {
    try {
      if (!API_URL) throw new Error('API URL not configured');

      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get user');
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
  },
}; 