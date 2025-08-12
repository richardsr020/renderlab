"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../utils/api';

interface AuthContextType {
  user: any;
  token: string | null;
  refreshToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshJwt: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(
    typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null
  );
  const [token, setToken] = useState<string | null>(
    typeof window !== 'undefined' ? localStorage.getItem('token') : null
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    typeof window !== 'undefined' ? localStorage.getItem('refresh_token') : null
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
    } else {
      localStorage.removeItem('refresh_token');
    }
  }, [refreshToken]);

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/login`, { email, password });
      if (res.data && res.data.token) {
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
        if (res.data.refresh_token) {
          setRefreshToken(res.data.refresh_token);
          localStorage.setItem('refresh_token', res.data.refresh_token);
        }
        // Récupère l'id utilisateur si présent dans la réponse
        const userData: any = { email };
        if (res.data.id) userData.id = res.data.id;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        throw new Error('Token not received');
      }
    } catch (error: any) {
      // Optionally, you can parse error.response.data for API error messages
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Login failed');
      }
    }
  };

  const router = typeof window !== 'undefined' ? require('next/navigation').useRouter() : null;
  const logout = async () => {
    if (refreshToken) {
      try {
        await axios.post(`${API_BASE_URL}/api/logout`, { refresh_token: refreshToken });
      } catch (error) {
        // Ignorer l'erreur, on veut juste révoquer côté serveur
      }
    }
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    localStorage.removeItem('user');
    if (router) router.replace('/');
  };

  // Fonction pour rafraîchir le JWT
  const refreshJwt = async () => {
    if (!refreshToken) return;
    try {
      const res = await axios.post(`${API_BASE_URL}/api/refresh_token`, { refresh_token: refreshToken });
      setToken(res.data.token);
      if (res.data.refresh_token) {
        setRefreshToken(res.data.refresh_token);
        localStorage.setItem('refresh_token', res.data.refresh_token);
      }
    } catch (error) {
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, refreshToken, login, logout, refreshJwt }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
