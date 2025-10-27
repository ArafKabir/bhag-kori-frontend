import React, { createContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (userData: User, token?: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType>(null!);

type Props = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load stored user/token on startup
  useEffect(() => {
    (async () => {
      const storedToken = await AsyncStorage.getItem('token');
      const storedUser = await AsyncStorage.getItem('user');
      if (storedToken) setToken(storedToken);
      if (storedUser) setUser(JSON.parse(storedUser));
      setLoading(false);
    })();
  }, []);

  // Save user and token on login
  const login = async (userData: User, token: string = 'dummy-token') => {
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    await AsyncStorage.setItem('token', token);
    setUser(userData);
    setToken(token);
  };

  // Clear both on logout
  const logout = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  const value = useMemo(
    () => ({ user, token, login, logout, loading }),
    [user, token, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
