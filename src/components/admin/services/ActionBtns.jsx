import styles from './ActionBtns.module.css';

const ActionBtns = ({ isLoading, isModalOpen, setFormValues, handleSubmit, handleModalOpen }) => {
    
    return (
        <div className={styles.actionBtns}>
            <button
                type="button"
                className={styles.cancelBtn} 
                onClick={() => {
                    handleModalOpen(false);
                    setFormValues({});
                }}
            >Atšaukti</button>

            <button 
                type="button"
                disabled={isLoading} 
                className={styles.saveBtn} 
                onClick={handleSubmit}
            >
                {isModalOpen.action === 'insert' ? 'Išsaugoti' : 'Atnaujinti'}
            </button>
        </div>
    );
};

export default ActionBtns;