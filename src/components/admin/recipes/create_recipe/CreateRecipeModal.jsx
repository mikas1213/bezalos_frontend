import styles from './CreateRecipeModal.module.css';
import NewRecipe from './new_recipe/NewRecipe';
import ActionBtns from './action_btns/ActionBtns';
import Spinner from '../../../UI/Spinner';

const CreateRecipeModal = ({ isLoading, modalControl, setModalControl, prodList, handleNewRecipe, handleEditRecipe, newRecipe, setNewRecipe, emptyRecipe }) => {

    return  (
        <div className={styles.recipeModal}>
            {isLoading && <Spinner />}
            <NewRecipe prodList={prodList} newRecipe={newRecipe} setNewRecipe={setNewRecipe} />
            <ActionBtns 
                modalControl={modalControl}
                setModalControl={setModalControl} 
                emptyRecipe={emptyRecipe}
                newRecipe={newRecipe} 
                handleNewRecipe={handleNewRecipe} 
                handleEditRecipe={handleEditRecipe}
                setNewRecipe={setNewRecipe}
                isLoading={isLoading} 
            />
        </div>
    );
};

export default CreateRecipeModal;