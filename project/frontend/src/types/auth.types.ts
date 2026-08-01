// src/types/auth.types.ts

export type UserRole = 'CUSTOMER' | 'SECURITY' | 'ADMIN';

export interface User {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  details?: { field: string; message: string }[];
}
