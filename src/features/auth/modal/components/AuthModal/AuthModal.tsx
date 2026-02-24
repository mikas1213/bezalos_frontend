import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import cx from "classnames";

import { AuthenticationProvider } from "../../contexts/AuthenticationProvider";
import { useAuthModal } from "../../hooks/useAuthModal";
import { Authentication } from "../Authentication";

import styles from "./AuthModal.module.scss";

export const AuthModal = () => {
    const { authModalState, closeModal } = useAuthModal();
    const ref = useRef<HTMLDivElement>(null);
    const [isClosingModal, setIsClosingModal] = useState<boolean>(false);

    const startClosing = useCallback(() => {
        setIsClosingModal(true);
        setTimeout(() => {
            closeModal();
            setIsClosingModal(false);
        }, 200);
    }, [closeModal]);

    const handleClose = useCallback(() => {
        authModalState.options.onCancel?.();
        startClosing();
    }, [authModalState.options, startClosing]);

    const handleSuccess = useCallback(() => {
        authModalState.options.onSuccess?.();
        startClosing();
    }, [authModalState.options, startClosing]);

    // Close on click outside
    useEffect(() => {
        if (!authModalState.isOpen) return;

        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                handleClose();
            }
        };

        document.addEventListener("click", handleClick, true);
        return () => document.removeEventListener("click", handleClick, true);
    }, [authModalState.isOpen, handleClose]);

    if (!authModalState.isOpen && !isClosingModal) return null;

    return createPortal(
        <div className={cx(styles.overlay, isClosingModal && styles.closingOverlay)}>
            <div ref={ref} className={cx(styles.authModal, isClosingModal && styles.closingModal)}>
                <AuthenticationProvider>
                    <Authentication onSuccess={handleSuccess} onCancel={handleClose} />
                </AuthenticationProvider>
            </div>
        </div>,
        document.body,
    );
};
