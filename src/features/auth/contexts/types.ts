import type { UserData } from "../services/AuthService";

export interface AuthState {
    user: UserData | null;
    accessToken: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

export interface AuthContextValue extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshAuth: () => Promise<void>;
    setAccessToken: (token: string) => void;
    setUser: (user: UserData) => void;
}