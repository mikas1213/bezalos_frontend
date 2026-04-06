import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

import { axiosPrivate } from "../../../../api/axios";
import type { MessageResponse, SignupRequest, UserData, ValidateResetTokenResponse } from "../services";
import { authService } from "../services";
import { createRefreshFn } from "../services/refreshToken";

import { AuthContext } from "./AuthContext";
import type { AuthContextValue, AuthProviderProps } from "./types";

const AUTH_CHANNEL_NAME = "bezalos_auth";

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const channelRef = useRef<BroadcastChannel | null>(null);

    // Keep a ref always in sync with the latest accessToken.
    // The interceptor reads this ref at call time, so it never captures a stale closure.
    const accessTokenRef = useRef<string | null>(null);
    accessTokenRef.current = accessToken;

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

    // Attach axios interceptors synchronously before paint, so they are guaranteed
    // to be registered before any child component's useEffect fires API requests.
    useLayoutEffect(() => {
        const refreshFn = createRefreshFn(setAccessToken, setUser);

        const logout = async () => {
            try {
                await authService.logout();
            } catch {
                // ignore
            } finally {
                setAccessToken(null);
                setUser(null);
            }
        };

        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                // accessTokenRef.current is always up-to-date (set on every render)
                const token = accessTokenRef.current;
                if (token && !config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error),
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                // Aborted in useEffect cleanup
                if (error.code === "ERR_CANCELED") {
                    return Promise.resolve({ status: 499 });
                }

                const prevRequest = error?.config;

                // Don't retry auth endpoints to avoid infinite loops or swallowing login errors
                const isAuthEndpoint = prevRequest?.url?.includes("/auth/refresh") ||
                    prevRequest?.url?.includes("/auth/login");

                if (
                    (error?.response?.status === 401 || error?.response?.status === 403) &&
                    !prevRequest?.sent &&
                    !isAuthEndpoint
                ) {
                    prevRequest.sent = true;

                    try {
                        const newAccessToken = await refreshFn();
                        prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                        return axiosPrivate(prevRequest);
                    } catch (refreshError) {
                        // Refresh failed — user needs to log in again
                        await logout();
                        return Promise.reject(refreshError);
                    }
                }

                return Promise.reject(error);
            },
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, []); // Empty deps — interceptors registered once; accessTokenRef always current

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
