import styles from './Recipes.module.css';
import Recipe from './Recipe';

const Recipes = ({ recipes, handleLike }) => {
    return (
        <div className={styles.recipes}>
            {recipes.map(recipe => 
                <Recipe key={recipe.id} recipe={recipe} handleLike={handleLike} />
            )}
        </div>
    );
};

export default Recipes;