import styles from './Keitykle.module.css';
import { useState } from 'react';
import { set_grams_keitykle } from '../../../utils/calculationsHelpers';
import { CiSearch } from "react-icons/ci";

const Keitykle = ({ prodList }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [grams, setGrams] = useState('');
    const [gramsPlaceholder, setGramsPlaceholder] = useState('g');
    const [filteredProducts, setFilteredProducts] = useState(prodList);
    const [isShowSearchResults, setIsShowSearchResults] = useState(false);
    const [selectedProd, setSelectedProd] = useState(null);

    console.log('selectedProd: ',{...selectedProd, grams: +grams})
    const handleSearch = e => {
        setSearchQuery(e.target.value);
        setSelectedProd(null);
        const filtered = prodList.filter((product) =>
            product.title.toLowerCase().includes(e.target.value.toLowerCase())
        );

        if(e.target.value.length > 2) {
            setIsShowSearchResults(true)
            setFilteredProducts(filtered);
        } else {
            setIsShowSearchResults(false);
            setFilteredProducts([]);
        }
    };

    const handleGrams = e => {
        console.log('grams: ', e.target.value)
        setGrams(e.target.value)
    };


    return (
        <div className={styles.keitykle}>
            <div className={styles.searchProductContainer}>
                <div className={styles.searchProductInputs}>
                    <CiSearch className={styles.icon} />
                    <input 
                        type='text' 
                        value={searchQuery} 
                        className={styles.prod} 
                        onChange={handleSearch} 
                        placeholder='Produkto paieška'
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

                {isShowSearchResults && <div className={styles.searchResults}>
                    {filteredProducts.map(prod => <p key={prod.id} onClick={() => {
                        setSelectedProd(prod);
                        setIsShowSearchResults(false);
                        setSearchQuery(prod.title)
                    }}>{prod.title}</p>)}
                </div>}

                {selectedProd && <div className={styles.availableProducts}>
                    {prodList.filter(prod => prod.category === selectedProd.category).map(prod => 
                        <div key={prod.id} className={styles.availProd}>
                            <span className={styles.prodTitle}>{prod.title}</span>
                            <div className={styles.gramsContainer}>
                                <span>{set_grams_keitykle({...selectedProd, grams: +grams.replace(',', '.')}, prod ).toFixed(0)}</span>
                                <span>g</span>
                            </div>
                            
                        </div>)}
                </div>}
            </div>
        </div>
    );
};

export default Keitykle;