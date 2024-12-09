import styles from './SearchRecipe.module.css';

const SearchRecipe = ({searchRecipe, setSearchRecipe}) => {
    return (
        <div className={styles.searchRecipe}>
            <input 
                type='text'
                placeholder='Ieškoti'
                className={styles.searchRecipeInput}

                value={searchRecipe}
                onChange={e => setSearchRecipe(e.target.value)}
            />
        </div>
    );
};

export default SearchRecipe;