// src/services/api.ts
// Single Axios instance used across the whole app. Automatically attaches
// the JWT (if present) and normalizes 401s by clearing stale auth state.

import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('smp_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('smp_token');
      localStorage.removeItem('smp_user');
      // Let the AuthContext / ProtectedRoute handle the redirect on next render
    }
    return Promise.reject(error);
  }
);

export default api;
