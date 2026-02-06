import type { Dispatch, SetStateAction } from "react";
import type { UserData } from "../services/AuthService";

export interface PendingCheckout {
    type: 'subscription' | 'service';
    data: unknown;
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
    isOpenModal: boolean;
    setIsOpenModal: Dispatch<SetStateAction<boolean>>;
    pendingCheckout: PendingCheckout | null;
    setPendingCheckout: Dispatch<SetStateAction<PendingCheckout | null>>;
}