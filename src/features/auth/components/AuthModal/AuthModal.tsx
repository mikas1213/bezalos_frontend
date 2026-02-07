import styles from './AuthModal.module.css';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import { useEffect, useRef, useCallback } from 'react';
import { useAuthModal } from '../../hooks/useAuthModal';
import Authentication from '../../../../components/auth/Authentication';

export const AuthModal = () => {
    const { modalState, closeModal } = useAuthModal();
    const ref = useRef<HTMLDivElement>(null);

    const handleClose = useCallback(() => {
        modalState.options.onCancel?.();
        closeModal();
    }, [modalState.options, closeModal]);

    const handleSuccess = useCallback(() => {
        modalState.options.onSuccess?.();
        closeModal();
    }, [modalState.options, closeModal]);

    // Close on click outside
    useEffect(() => {
        if (!modalState.isOpen) return;

        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                handleClose();
            }
        };

        document.addEventListener('click', handleClick, true);
        return () => document.removeEventListener('click', handleClick, true);
    }, [modalState.isOpen, handleClose]);

    if (!modalState.isOpen) return null;

    return createPortal(
        <div className={styles.overlay}>
            <div ref={ref} className={styles.modal}>
                <HiXMark className={styles.closeIcon} onClick={handleClose} />
                <Authentication onSuccess={handleSuccess} onCancel={handleClose} />
            </div>
        </div>,
        document.body
    );
};
