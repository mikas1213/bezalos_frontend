import type { ReactNode } from "react";

import type { MessageResponse, SignupRequest, UserData, ValidateResetTokenResponse } from "../services";

export interface AuthProviderProps {
    children: ReactNode;
}

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
    signup: (data: SignupRequest) => Promise<MessageResponse>;
    forgotPassword: (email: string) => Promise<MessageResponse>;
    validateResetToken: (token: string) => Promise<ValidateResetTokenResponse>;
    updatePassword: (token: string, password: string, passwordConfirmed: string) => Promise<MessageResponse>;
}
