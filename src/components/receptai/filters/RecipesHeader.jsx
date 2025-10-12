import styles from './RecipesHeader.module.css';
import { Search, CircleX, Filter } from 'lucide-react';
import signatureImg from '../../../assets/images/homepage/signature.png';

const RecipesHeader = ({ isOpenFilters, setIsOpenFilters, search, setSearch, setCurrentPage }) => {
    return (
        <div className={styles.recipesHeader}>
            <div className={`${styles.searchContainer} ${isOpenFilters ? styles.filterOpen : ''}`}>
                <input 
                    type='text' 
                    value={search}
                    onChange={e => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                    className={styles.searchInput} 
                    placeholder='Paieška...' 
                />    
                <button 
                    className={styles.filterBtn}
                    onClick={() => setIsOpenFilters(open => !open)}
                ><Filter className={styles.filterIcon}/></button>
                <Search className={styles.searchIcon} />

                <CircleX className={styles.iconClear} onClick={() => setSearch('')} />
                
            </div>
            <img className={styles.signatureImg} src={signatureImg} alt='Signature' />
        </div>
    );
};

export default RecipesHeader;