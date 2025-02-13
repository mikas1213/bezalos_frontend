import styles from './Recipes.module.css';
import Recipe from './Recipe';

const Recipes = ({ recipes, onToggleLikes }) => {
    return (
        <div className={styles.recipes}>
            {recipes.map(recipe => 
                <Recipe key={recipe.id} recipe={recipe} onToggleLikes={onToggleLikes} />
            )}
        </div>
    );
};

export default Recipes;