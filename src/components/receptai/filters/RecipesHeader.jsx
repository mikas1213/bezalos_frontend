import styles from './RecipesHeader.module.css';
import { Search } from 'lucide-react';

const RecipesHeader = () => {
    return (
        <div className={styles.recipesHeader}>
            <div className={styles.searchContainer}>
                <input type='text' className={styles.searchInput} placeholder='Paieška...' />    
                <Search className={styles.searchIcon} />
               
            </div>
            <img className={styles.signatureImg} src='../../../src/assets/images/homepage/signature.png' alt='Signature' />
        </div>
    );
};

export default RecipesHeader;