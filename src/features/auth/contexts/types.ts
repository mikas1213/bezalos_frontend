import type { Dispatch, SetStateAction, ChangeEvent, FormEvent } from 'react';
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
export type AuthModalType = 'auth' | 'confirm' | 'info' | null;

export interface ModalOptions {
    onSuccess?: () => void;
    onCancel?: () => void;
    props?: Record<string, unknown>;
}

export interface AuthModalState {
    isOpen: boolean;
    type: AuthModalType;
    options: ModalOptions;
}

export interface AuthModalContextValue {
    authModalState: AuthModalState;
    authOpenModal: (type: AuthModalType, options?: ModalOptions) => void;
    closeModal: () => void;
    setAuthModalState: Dispatch<SetStateAction<AuthModalState>>;
}
export type AuthMode = "login" | "signup" | "initialTarget" | "forgot" | "forgot";
export interface AuthActions {
    title: string;
    subTitle: string;
    btnLabel: string;
    authCta: string;
    authCtaBtn: string;
    authAction: AuthMode;
}

export type InitialTarget = "profilis" | "virtuve" | "abu" | "nezinau";
export interface FormData {
    name: string;
    email: string;
    password: string;
    passwordConfirmed: string;
    initialTarget: InitialTarget;
    acceptTerms: boolean;
}

export interface AuthenticationContextValue {
    authMode: AuthMode;
    authActions: Record<AuthMode, AuthActions>;
    formData: FormData;
    setFormData: Dispatch<SetStateAction<FormData>>;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    setAuthMode: Dispatch<SetStateAction<AuthMode>>;
    handleTargetSelect: (targetId: InitialTarget) => void;
}
