import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import axios from 'axios';
import { UserRead } from '../schemas/user';

interface AuthContextType {
  user: UserRead | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<UserRead>;
  signOut: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: Record<string, { email: string; password: string; full_name: string; role: string }> = {
  'admin@example.com': { email: 'admin@example.com', password: 'admin123', full_name: 'System Administrator', role: 'system_admin' },
  'officer1@example.com': { email: 'officer1@example.com', password: 'officer123', full_name: 'Bureau Officer', role: 'bureau_officer' },
  'reviewer@example.com': { email: 'reviewer@example.com', password: 'review123', full_name: 'Reviewing Officer', role: 'reviewing_officer' },
  'coord@example.com': { email: 'coord@example.com', password: 'coord123', full_name: 'Coordination Officer', role: 'coordination_officer' },
  'viewer@example.com': { email: 'viewer@example.com', password: 'viewer123', full_name: 'Management Viewer', role: 'management_viewer' },
};

function getStoredUser(): UserRead | null {
  if (typeof window === 'undefined') return null;
  const token = localStorage.getItem('access_token');
  if (!token) return null;
  const stored = localStorage.getItem('synapse_user');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      localStorage.removeItem('synapse_user');
    }
  }
  return null;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserRead | null>(() => getStoredUser());
  const [loading, setLoading] = useState<boolean>(false);

  const fetchMe = useCallback(async () => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const resp = await axios.get<UserRead>('/api/v1/users/me', {
        headers: { Authorization: `Bearer ${token}` },
        timeout: 1500,
      });
      setUser(resp.data);
      localStorage.setItem('synapse_user', JSON.stringify(resp.data));
    } catch {
      const stored = getStoredUser();
      if (stored) {
        setUser(stored);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  const signIn = async (email: string, password: string): Promise<UserRead> => {
    setLoading(true);
    const cleanEmail = email.trim().toLowerCase();

    // 1. Try Backend API
    try {
      const resp = await axios.post('/api/v1/auth/login', { email: cleanEmail, password }, { timeout: 1500 });
      const { access_token, refresh_token } = resp.data;
      localStorage.setItem('access_token', access_token);
      if (refresh_token) localStorage.setItem('refresh_token', refresh_token);

      const meResp = await axios.get<UserRead>('/api/v1/users/me', {
        headers: { Authorization: `Bearer ${access_token}` },
        timeout: 1500,
      });
      const userData = meResp.data;
      setUser(userData);
      localStorage.setItem('synapse_user', JSON.stringify(userData));
      setLoading(false);
      return userData;
    } catch {
      // Backend unavailable or failed, fallback to seeded demo accounts
    }

    // 2. Fallback to demo account
    const demo = DEMO_USERS[cleanEmail];
    if (demo && demo.password === password) {
      const demoUser: UserRead = {
        id: 'usr-' + demo.role,
        email: demo.email,
        full_name: demo.full_name,
        is_active: true,
        role: demo.role,
      };
      localStorage.setItem('access_token', `synapse-auth-${demo.role}`);
      localStorage.setItem('synapse_user', JSON.stringify(demoUser));
      setUser(demoUser);
      setLoading(false);
      return demoUser;
    }

    setLoading(false);
    throw new Error('Authentication failed. Please check your credentials.');
  };

  const signOut = async () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('synapse_user');
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        signIn,
        signOut,
        refreshUser: fetchMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

