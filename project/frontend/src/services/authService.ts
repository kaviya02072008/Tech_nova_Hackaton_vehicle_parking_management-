//src/services/authService.ts
// All auth-related HTTP calls live here so components/hooks never call
// axios directly.

import api from './api';
import type { AuthResponse, LoginPayload, RegisterPayload, User } from '@/types/auth.types';

export const authService = {
  async register(payload: RegisterPayload): Promise<AuthResponse['data']> {
    const { data } = await api.post<AuthResponse>('/auth/register', payload);
    return data.data;
  },

  async login(payload: LoginPayload): Promise<AuthResponse['data']> {
    const { data } = await api.post<AuthResponse>('/auth/login', payload);
    return data.data;
  },

  async getMe(): Promise<User> {
    const { data } = await api.get<{ success: boolean; data: { user: User } }>('/auth/me');
    return data.data.user;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
  },

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await api.post('/auth/change-password', { currentPassword, newPassword });
  }
}
