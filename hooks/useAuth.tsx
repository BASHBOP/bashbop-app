import { useState, useEffect } from 'react';
import SecureStore from './useSecureStore';
import { User, login, signUp, getCurrentUser, logout as apiLogout } from '@/api/api';
import { ApiError } from '@/api/client';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await SecureStore.getItem('token');
      if (!token) {
        setState(prev => ({ ...prev, loading: false }));
        return;
      }

      const user = await getCurrentUser();
      setState({
        user,
        token,
        loading: false,
        error: null,
      });
    } catch (err) {
      console.error('Auth status check failed:', err);
      await SecureStore.removeItem('token');
      setState({
        user: null,
        token: null,
        loading: false,
        error: err instanceof ApiError ? err.message : 'Authentication failed',
      });
    }
  };

  const loginUser = async (email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await login({ email, password });
      
      await SecureStore.setItem('token', response.token);
      
      setState({
        user: response.user,
        token: response.token,
        loading: false,
        error: null,
      });
      
      return response;
    } catch (err) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: err instanceof ApiError ? err.message : 'Login failed',
      }));
      throw err;
    }
  };

  const signUpUser = async (name: string, email: string, password: string) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const response = await signUp({ name, email, password });
      
      await SecureStore.setItem('token', response.token);
      
      setState({
        user: response.user,
        token: response.token,
        loading: false,
        error: null,
      });
      
      return response;
    } catch (err) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: err instanceof ApiError ? err.message : 'Sign up failed',
      }));
      throw err;
    }
  };

  const logout = async () => {
    try {
      setState(prev => ({ ...prev, loading: true }));
      await apiLogout();
      await SecureStore.removeItem('token');
      setState({
        user: null,
        token: null,
        loading: false,
        error: null,
      });
    } catch (err) {
      console.error('Logout error:', err);
      setState(prev => ({
        ...prev,
        loading: false,
        error: err instanceof ApiError ? err.message : 'Logout failed',
      }));
      throw err;
    }
  };

  return {
    ...state,
    login: loginUser,
    signUp: signUpUser,
    logout,
  };
}; 