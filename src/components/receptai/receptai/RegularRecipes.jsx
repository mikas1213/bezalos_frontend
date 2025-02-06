import styles from './RegularRecipes.module.css';
import RegularRecipe from './RegularRecipe';

const RegularRecipes = ({ recipes }) => {
    return (
        <div className={styles.regularRecipes}>
            {recipes.map(recipe => 
                <RegularRecipe key={recipe.id} recipe={recipe} />
            )}
        </div>
    );
};

export default RegularRecipes;