import type { Dispatch, SetStateAction } from 'react';
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

/* AUTH MODAL TYPES*/
export type ModalType = 'auth' | 'confirm' | 'info' | null;

export interface ModalOptions {
    onSuccess?: () => void;
    onCancel?: () => void;
    props?: Record<string, unknown>;
}

export interface ModalState {
    isOpen: boolean;
    type: ModalType;
    options: ModalOptions;
}

export interface AuthModalContextValue {
    modalState: ModalState;
    openModal: (type: ModalType, options?: ModalOptions) => void;
    closeModal: () => void;
    setModalState: Dispatch<SetStateAction<ModalState>>;
}
