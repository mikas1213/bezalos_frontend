import Modal from '../../../components/UI/Modal';
import Authentication from '../../../components/auth/Authentication';
import { useModal } from '../hooks/useModal';

export const ModalContainer = () => {
    const { modalState, closeModal } = useModal();

    if (!modalState.isOpen || !modalState.type) {
        return null;
    }

    const handleClose = () => {
        modalState.options.onCancel?.();
        closeModal();
    };

    return (
        <Modal onClose={handleClose}>
            {modalState.type === 'auth' && (
                <Authentication 
                    onSuccess={() => {
                        modalState.options.onSuccess?.();
                        closeModal();
                    }}
                    onCancel={handleClose}
                />
            )}
        </Modal>
    );
};
