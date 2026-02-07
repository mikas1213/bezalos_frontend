import type { Dispatch, SetStateAction } from 'react';

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

export interface ModalContextValue {
    modalState: ModalState;
    openModal: (type: ModalType, options?: ModalOptions) => void;
    closeModal: () => void;
    setModalState: Dispatch<SetStateAction<ModalState>>;
}
