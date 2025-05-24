import styles from './ActionBtns.module.css';

const ActionBtns = ({ 
        isLoading, 
        // isModalOpen, 
        // setFormValues, 
        // handleSubmit, 
        setIsModalOpen
    }) => {
    
    return (
        <div className={styles.actionBtns}>
            <button 
                className={styles.cancelBtn} 
                onClick={() => {
                    setIsModalOpen(false);
                    // setFormValues({});
                }}
            >Atšaukti</button>

            <button 
                disabled={isLoading} 
                className={styles.saveBtn} 
                // onClick={handleSubmit}
            >Išsaugoti</button>
        </div>
    );
};

export default ActionBtns;