import styles from './ActionBtns.module.css';

const ActionBtns = ({ modalControl, setModalControl, handleNewRecipe, handleEditRecipe, newRecipe, setNewRecipe, emptyRecipe, isLoading }) => {
    
    return (
        <div className={styles.actionBtns}>

            <button className={styles.cancelBtn} onClick={() => {
                setModalControl({isOpen: false, action: ''});
                setNewRecipe(emptyRecipe);
            }}>Atšaukti</button>

            <button 
                disabled={isLoading} 
                className={styles.saveBtn} 
                onClick={() => (modalControl.action === 'add' ?  handleNewRecipe() : handleEditRecipe(newRecipe.id)) }
            >{modalControl.action === 'add' ? 'Išsaugoti' : 'Atnaujinti'}</button>
        </div>
    );
};

export default ActionBtns;