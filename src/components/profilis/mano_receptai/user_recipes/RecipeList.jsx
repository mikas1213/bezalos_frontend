import UserRecipe from './UserRecipe';

import styles from './RecipeList.module.css';

const RecipeList = ({ recipes, handleDeleteRecipe }) => {
    return (
        <div className={styles.recipeList}>
            {recipes.map(recipe => <UserRecipe key={recipe.id} recipe={recipe} handleDeleteRecipe={handleDeleteRecipe} />)}
        </div>
    );
};

export default RecipeList;