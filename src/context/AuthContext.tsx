import React, {createContext, useEffect, useMemo, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthContextType = {
    token: string | null;
    login: (token: string) => Promise<void>
    logout: () => Promise<void>
    loading: boolean;
}
export const AuthContext = createContext<AuthContextType>(null!);

type Props = {
    children: React.ReactNode;
}

export const AuthProvider = ({children}: Props) => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const stored = await AsyncStorage.getItem('token');
            setToken(stored);
            setLoading(false);
        })();
    }, [])
    const login = async (token: string) => {
        await AsyncStorage.setItem('token', token);
        setToken(token);
    }
    const logout = async () => {
        await AsyncStorage.removeItem('token');
        setToken(null);
    }

    const value = useMemo(() => ({token, login, logout, loading}), [token, loading]);
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
};