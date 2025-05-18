import api from './index';

export const login = (email: string, password: string) =>
  api.post('/auth/login', { email, password });

export const register = (first_name: string, last_name: string, email: string, password: string, phone?: string) =>
  api.post('/auth/register', { first_name, last_name, email, password, phone });

export const getMe = () => api.get('/auth/me');

export const logout = () => api.post('/auth/logout');
