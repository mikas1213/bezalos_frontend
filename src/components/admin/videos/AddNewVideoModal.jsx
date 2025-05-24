import styles from './AddNewVideoModal.module.css';

const AddNewVideoModal = ({ children }) => {
    return  (
        <div className={styles.addNewVideoModal}>
            {children}
        </div>
    );
};

export default AddNewVideoModal;