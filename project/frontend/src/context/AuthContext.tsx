// src/context/AuthContext.tsx
// Holds the current user + token, persists to localStorage, and exposes
// login/register/logout actions to the rest of the app via useAuth().

import React, { createContext, useState, useEffect, useCallback } from 'react';
import { authService } from '@/services/authService';
import type { LoginPayload, RegisterPayload, User } from '@/types/auth.types';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<User>;
  register: (payload: RegisterPayload) => Promise<User>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = 'smp_token';
const USER_KEY = 'smp_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Rehydrate session on first load
  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));

      // Verify the token is still valid against the backend
      authService
        .getMe()
        .then((freshUser) => {
          setUser(freshUser);
          localStorage.setItem(USER_KEY, JSON.stringify(freshUser));
        })
        .catch(() => {
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem(USER_KEY);
          setUser(null);
          setToken(null);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const persistSession = (nextUser: User, nextToken: string) => {
    localStorage.setItem(TOKEN_KEY, nextToken);
    localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
    setToken(nextToken);
  };

  const login = useCallback(async (payload: LoginPayload) => {
    const { user: loggedInUser, token: newToken } = await authService.login(payload);
    persistSession(loggedInUser, newToken);
    return loggedInUser;
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    const { user: newUser, token: newToken } = await authService.register(payload);
    persistSession(newUser, newToken);
    return newUser;
  }, []);

  const logout = useCallback(() => {
    authService.logout().catch(() => {
      /* ignore network errors on logout */
    });
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    setToken(null);
  }, []);

  const value: AuthContextValue = {
    user,
    token,
    isAuthenticated: !!user && !!token,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
