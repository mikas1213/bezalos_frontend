import styles from './Recipes.module.css';
import Recipe from './Recipe';

const Recipes = ({ recipes }) => {
    return (
        <div className={styles.recipes}>
            {recipes.map(recipe => 
                <Recipe key={recipe.id} recipe={recipe} />
            )}
        </div>
    );
};

export default Recipes;