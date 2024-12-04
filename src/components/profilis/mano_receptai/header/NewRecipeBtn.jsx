import styles from './NewRecipeBtn.module.css';

const NewRecipeBtn = ({ setOpen }) => {
    return (
        <div className={styles.newRecipe}>
            <button 
                onClick={() => setOpen(true)}
                className={styles.newRecipeBtn}>
                Kurti naują receptą
            </button>
        </div>
    );
};

export default NewRecipeBtn;