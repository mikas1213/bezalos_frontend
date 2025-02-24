import styles from './AddNewModal.module.css';

const AddNewModal = ({ children }) => {
    return  (
        <div className={styles.addNewModal}>
            {children}
        </div>
    );
};

export default AddNewModal;