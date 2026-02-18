import { useCallback, useEffect, useRef, useState } from "react";

import type { MessageResponse, SignupRequest, UserData, ValidateResetTokenResponse } from "../services";
import { authService } from "../services";

import { AuthContext } from "./AuthContext";
import type { AuthContextValue, AuthProviderProps } from "./types";

const AUTH_CHANNEL_NAME = "bezalos_auth";

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const channelRef = useRef<BroadcastChannel | null>(null);

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

    // Cross-tab synchronization
    useEffect(() => {
        channelRef.current = new BroadcastChannel(AUTH_CHANNEL_NAME);

        channelRef.current.onmessage = (event) => {
            if (event.data.type === "logout") {
                setUser(null);
                setAccessToken(null);
            }
            if (event.data.type === "login") {
                // Refresh auth state from server when another tab logs in
                refreshAuth();
            }
        };

        return () => {
            channelRef.current?.close();
        };
    }, [refreshAuth]);

    const login = useCallback(async (email: string, password: string) => {
        const response = await authService.login({ email, password });
        setUser(response.user);
        setAccessToken(response.accessToken);

        // Notify other tabs about login
        channelRef.current?.postMessage({ type: "login" });
    }, []);

    const logout = useCallback(async () => {
        try {
            await authService.logout();
        } catch {
            // Even if logout fails on server, clear local state
        } finally {
            setUser(null);
            setAccessToken(null);

            // Notify other tabs about logout
            channelRef.current?.postMessage({ type: "logout" });
        }
    }, []);

    const signup = useCallback(async (data: SignupRequest): Promise<MessageResponse> => {
        const response = await authService.signup(data);
        return response;
    }, []);

    const forgotPassword = useCallback(async (email: string): Promise<MessageResponse> => {
        const response = await authService.forgotPassword({ email });
        return response;
    }, []);

    const validateResetToken = useCallback(async (token: string): Promise<ValidateResetTokenResponse> => {
        const response = await authService.validateResetToken(token);
        return response;
    }, []);

    const updatePassword = useCallback(
        async (token: string, password: string, passwordConfirmed: string): Promise<MessageResponse> => {
            const response = await authService.updatePassword(token, { password, passwordConfirmed });
            return response;
        },
        [],
    );

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
        signup,
        forgotPassword,
        validateResetToken,
        updatePassword,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
