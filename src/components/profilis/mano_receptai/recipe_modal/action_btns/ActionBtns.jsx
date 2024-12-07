import styles from './ActionBtns.module.css';

const ActionBtns = ({ setOpen, saveNewRecipe, isLoading }) => {
    return (
        <div className={styles.actionBtns}>
            <button disabled={isLoading} className={styles.saveBtn} onClick={saveNewRecipe}>Išsaugoti</button>
            <button className={styles.cancelBtn} onClick={() => setOpen(false)}>Atšaukti</button>
        </div>
    );
};

export default ActionBtns;