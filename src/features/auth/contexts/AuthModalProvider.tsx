import { useState, useCallback, type ReactNode } from 'react';
import { AuthModalContext } from './AuthModalContext';
import type { AuthModalState, AuthModalType, ModalOptions, AuthModalContextValue } from './types';

const initialState: AuthModalState = {
    isOpen: false,
    type: null,
    options: {}
};

export const AuthModalProvider = ({ children }: { children: ReactNode }) => {
    const [authModalState, setAuthModalState] = useState<AuthModalState>(initialState);

    const authOpenModal = useCallback((type: AuthModalType, options: ModalOptions = {}) => {
        setAuthModalState({
            isOpen: true,
            type,
            options
        });
    }, []);

    const closeModal = useCallback(() => {
        setAuthModalState(initialState);
    }, []);

    const value: AuthModalContextValue = {
        authModalState,
        authOpenModal,
        closeModal,
        setAuthModalState
    };

    return (
        <AuthModalContext.Provider value={value}>
            { children }
        </AuthModalContext.Provider>
    );
};
