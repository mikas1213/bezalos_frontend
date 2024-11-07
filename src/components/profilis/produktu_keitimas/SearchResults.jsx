import styles from './SearchResults.module.css';

const SearchResults = ({ filteredProducts, setSelectedProd, setIsShowSearchResults, setSearchQuery }) => {
    return (
        <div className={styles.searchResults}>
            {filteredProducts.map(prod => <p key={prod.id} onClick={() => {
                setSelectedProd(prod);
                setIsShowSearchResults(false);
                setSearchQuery(prod.title)
            }}>{prod.title}</p>)}
        </div>
    );
};

export default SearchResults;







