import styles from './Recipes.module.css';
import Recipe from './Recipe';

const Recipes = ({ isLoading, recipes, onToggleLikes }) => {
    
    return (
        <div style={{minHeight: '50vh'}}>
            <div className={styles.recipes}>
                {!isLoading && recipes.map(recipe => 
                    <Recipe key={recipe.id} recipe={recipe} onToggleLikes={onToggleLikes} />
                )}
            </div>
        </div>
    );
};

export default Recipes;