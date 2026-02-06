import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { authService, type UserData } from '../services/AuthService';
import { AuthContext } from './AuthContext';
import type { AuthContextValue } from './types';

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    
    const [user, setUser] = useState<UserData | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpenModal, setIsOpenModal] = useState(false);

    // Try to restore session on mount
    const refreshAuth = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await authService.refresh();
            setUser(response.user);
            setAccessToken(response.accessToken);
        } catch {
            // If refresh fails, user is not authenticated
            setUser(null);
            setAccessToken(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Initialize auth state on mount
    useEffect(() => {
        refreshAuth();
    }, [refreshAuth]);

    const login = useCallback(async (email: string, password: string) => {
        const response = await authService.login({ email, password });
        setUser(response.user);
        setAccessToken(response.accessToken);
    }, []);

    const logout = useCallback(async () => {
        try {
            await authService.logout();
        } catch {
            // Even if logout fails on server, clear local state
        } finally {
            setUser(null);
            setAccessToken(null);
        }
    }, []);

    const value: AuthContextValue = {
        user,
        accessToken,
        isLoading,
        isAuthenticated: !!user && !!accessToken,
        login,
        logout,
        refreshAuth,
        setAccessToken,
        setUser,
        isOpenModal,
        setIsOpenModal
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
