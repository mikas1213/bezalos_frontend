import styles from './SearchRecipe.module.css';

const SearchRecipe = () => {
    return (
        <div className={styles.searchRecipe}>
            <input className={styles.searchRecipeInput} type='text' placeholder='Ieškoti'/>
        </div>
    );
};

export default SearchRecipe;