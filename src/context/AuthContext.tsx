import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as apiLogin, register as apiRegister, getMe, logout as apiLogout } from '../api/auth';

interface User {
  customer_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  created_at?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  register: (first_name: string, last_name: string, email: string, password: string, phone?: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user on app start (check if logged in)
  useEffect(() => {
    getMe()
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => setLoading(false));
    setLoading(false);
  }, []);

  const normalizeUser = (data: any): User => ({
    customer_id: data.customer_id,
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    phone: data.phone,
    created_at: data.created_at,
  });

  const register = async (
    first_name: string, 
    last_name: string, 
    email: string, 
    password: string,
    phone?: string) => {
    setError(null);
    try {
      await apiRegister(first_name, last_name, email, password, phone);
      const res = await getMe();
      setUser(normalizeUser(res.data));
      setLoading(false);
      return true; // success
    } catch (err) {
      setError('Invalid email or password');
      setUser(null);
      setLoading(false);
      return false; // failure
    }
  }


  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await apiLogin(email, password);
      const res = await getMe();
      setUser(normalizeUser(res.data));
      setLoading(false);
      return true; // success
    } catch (err) {
      setError('Invalid email or password');
      setUser(null);
      setLoading(false);
      return false; // failure
    }
  };



  const logout = async () => {
    setUser(null);
    await apiLogout();
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to consume auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
