import styles from './NewRecipe.module.css';
import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import RecipeProduct from './RecipeProduct';
import { Flame } from 'lucide-react';

const NewRecipe = ({ prodList, newRecipe, setNewRecipe }) => {
    const refs = useRef({});
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

    const handleAddProduct = prod => {
        const newId = uuidv4();
        setIsShowResults(false);
        setSearchInput('');
        setNewRecipe(prev => ({
            ...prev,
            products: [...prev.products, {...prod, prduct_id: prod.id, id: newId, grams: 0}]
        }));
        setTimeout(() => {
            refs.current[newId]?.focus();
        }, 0)
    };

    const handleEditGrams = (e, prod) => {
        setNewRecipe(prev => ({
            ...prev,
            products: prev.products.map(product => product.id === prod.id ? {
                ...product,
                grams: e.target.value
            } : product)
        }));
    };

    return (
        <div className={styles.newRecipe}>
            <input 
                type='text' 
                value={newRecipe.title}
                onChange={e => setNewRecipe(prev => ({...prev, title: e.target.value}))}
                className={styles.recipeTitleInput} 
                placeholder='Recepto pavadinimas' 
            />

            {newRecipe.products.length > 0 && <div className={styles.recipeProducts}>
                {newRecipe.products.map(prod => <RecipeProduct key={prod.id} prod={prod} >
                    <input 
                        ref={el => refs.current[prod.id] = el}
                        type='text' 
                        value={prod.grams ?? ''}
                        onChange={e => handleEditGrams(e, prod)} 
                        className={styles.gramsInput}
                    />
                </RecipeProduct>)}
            </div>}

            <div className={styles.searchProductContainer}>
                <input 
                    type='text' 
                    className={styles.productSearchInput} 
                    placeholder='Produkto paieška'
                    value={searchInput}
                    onChange={handleProdSearch}
                />

                {isShowResults && <div className={styles.searchProductsList}>
                    {results.map(prod => <div onClick={() => handleAddProduct(prod)} className={styles.product} key={prod.id}>
                        {prod.title}
                    </div>)}
                </div>}

            </div>
            

            <div className={styles.recipeSummary}>
                <div className={styles.bar}>
                    <span className={styles.b}>B 25</span>
                    <span className={styles.a}>A 16</span>
                    <span className={styles.r}>R 75</span>
                </div>
                <span className={styles.k}><Flame className={styles.kcalIcon}/>354 <small>kcal</small></span>
            </div>
            
        </div>
    );
};

export default NewRecipe;