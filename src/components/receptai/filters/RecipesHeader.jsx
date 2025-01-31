import styles from './RecipesHeader.module.css';
import { Search, Filter } from 'lucide-react';
import { getImageURL } from '../../../utils/images';

const RecipesHeader = ({ isOpenFilters, setIsOpenFilters }) => {
    return (
        <div className={styles.recipesHeader}>
            <div className={`${styles.searchContainer} ${isOpenFilters ? styles.filterOpen : ''}`}>
                <input type='text' className={styles.searchInput} placeholder='Paieška...' />    
                <button 
                    className={styles.filterBtn}
                    onClick={() => setIsOpenFilters(open => !open)}
                ><Filter className={styles.filterIcon}/></button>
                <Search className={styles.searchIcon} />
            </div>
            <img className={styles.signatureImg} src={getImageURL('homepage/signature.png')} alt='Signature' />
        </div>
    );
};

export default RecipesHeader;