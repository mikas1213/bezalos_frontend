import styles from './ActionBtns.module.css';

const ActionBtns = ({ setOpen, saveNewRecipe, setNewRecipe, emptyRecipe, isLoading }) => {
    return (
        <div className={styles.actionBtns}>
            <button disabled={isLoading} className={styles.saveBtn} onClick={() => {
                saveNewRecipe();
                setNewRecipe(emptyRecipe);
            }}>Išsaugoti</button>
            <button className={styles.cancelBtn} onClick={() => {
                setOpen(false);
                setNewRecipe(emptyRecipe);
            }}>Atšaukti</button>
        </div>
    );
};

export default ActionBtns;