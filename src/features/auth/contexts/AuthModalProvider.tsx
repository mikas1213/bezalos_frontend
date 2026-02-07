import { useState, useCallback, type ReactNode } from 'react';
import { AuthModalContext } from './AuthModalContext';
import type { ModalState, ModalType, ModalOptions, AuthModalContextValue } from './types';

interface ModalProviderProps {
    children: ReactNode;
}

const initialState: ModalState = {
    isOpen: false,
    type: null,
    options: {}
};

export const AuthModalProvider = ({ children }: ModalProviderProps) => {
    const [modalState, setModalState] = useState<ModalState>(initialState);

    const openModal = useCallback((type: ModalType, options: ModalOptions = {}) => {
        setModalState({
            isOpen: true,
            type,
            options
        });
    }, []);

    const closeModal = useCallback(() => {
        setModalState(initialState);
    }, []);

    const value: AuthModalContextValue = {
        modalState,
        openModal,
        closeModal,
        setModalState
    };

    return (
        <AuthModalContext.Provider value={value}>
            {children}
        </AuthModalContext.Provider>
    );
};
