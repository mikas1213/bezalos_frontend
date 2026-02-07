import { useState, useCallback, type ReactNode } from 'react';
import { ModalContext } from './ModalContext';
import type { ModalState, ModalType, ModalOptions, ModalContextValue } from './types';

interface ModalProviderProps {
    children: ReactNode;
}

const initialState: ModalState = {
    isOpen: false,
    type: null,
    options: {}
};

export const ModalProvider = ({ children }: ModalProviderProps) => {
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

    const value: ModalContextValue = {
        modalState,
        openModal,
        closeModal,
        setModalState
    };

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    );
};
