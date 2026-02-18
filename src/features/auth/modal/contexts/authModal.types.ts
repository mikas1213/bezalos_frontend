import type { Dispatch, SetStateAction } from "react";

export type AuthModalType = "auth" | "confirm" | "info" | null;
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
