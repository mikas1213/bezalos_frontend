import styles from './MakeRecipeForm.module.css';
import { useState } from 'react';

const MakeRecipeForm = ({ prodList, selectedProds, setSelectedProds }) => {
    const [searchInput, setSearchInput] = useState('');
    const [isShowResults, setIsShowResults] = useState(false);
    const [results, setResults] = useState([]);
    
    const handleProdSearch = e => {
        setSearchInput(e.target.value);
        const filteredResults = prodList.filter(prod => prod.title.toLowerCase().includes(e.target.value.toLowerCase()))

        if(e.target.value.length > 2) {
            setIsShowResults(true);
            setResults(filteredResults);
        } else {
            setIsShowResults(false);
            setResults([]);
        }
    };

    const handleProdSelect = (prod) => {
        setIsShowResults(false);
        setSearchInput('');
        setSelectedProds(prev => [...prev, prod]);
    };

    return (
        <div className={styles.makeRecipeForm}>
            <input type='text' className={styles.recipeTitleInput} placeholder='Recepto pavadinimas' /> 
            <input 
                type='text' 
                className={styles.productSearchInput} 
                placeholder='Produkto paieška'
                value={searchInput}
                onChange={handleProdSearch}
            />

            {isShowResults && <div className={styles.productsResult}>
                {results.map(prod => <div onClick={() => handleProdSelect(prod)} className={styles.product} key={prod.id}>
                    {prod.title}
                </div>)}
            </div>}

            {selectedProds.map(p => <div key={p.title}>
                {p.title}
            </div>)}
        </div>
    );
};

export default MakeRecipeForm;