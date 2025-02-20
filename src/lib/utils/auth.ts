import { AuthResponse, LoginCredentials } from '@/types/auth';
import Cookies from 'js-cookie';

const API_URL = 'https://dummyjson.com';

export const authService = {
  login: async (credentials: LoginCredentials) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...credentials,
        //   username: 'emilys',
        //   password: 'emilyspass',
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