import styles from './ProductInput.module.css';
import { CiSearch } from 'react-icons/ci';

const ProductInput = ({ handleProductSearch, searchQuery, grams, handleGrams, setGramsPlaceholder, gramsPlaceholder }) => {
    return (
        <div className={styles.productInput}>
        
                    <CiSearch className={styles.icon} />
                    <input 
                        type='text' 
                        value={searchQuery} 
                        className={styles.prodTitle} 
                        onChange={handleProductSearch} 
                        placeholder='Ieškoti produktų...'
                    />
                    <input 
                        type='text' 
                        value={grams} 
                        onChange={handleGrams} 
                        onFocus={() => setGramsPlaceholder('')}
                        onBlur={e => !e.target.value.length > 0 && setGramsPlaceholder('g')}
                        className={styles.grams} 
                        placeholder={gramsPlaceholder}
                    />
        </div>
    );
};

export default ProductInput;