import styles from './NewRecipe.module.css';
import { useState, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import RecipeProduct from './RecipeProduct';
import { Flame } from 'lucide-react';
import { kcal, mealProdBarSum, productsBarSum, isBarInRange } from '../../../../../utils/calculationsHelpers';

const NewRecipe = ({ prodList, selectedMeal, newRecipe, setNewRecipe }) => {

    const is_error = key => (Object.keys(selectedMeal).length === 0 || newRecipe.products.length === 0) || isBarInRange(newRecipe[key], selectedMeal[key], 5) ? '' : 'notInRange';
    
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
            products: [...prev.products, {...prod, product_id: prod.id, id: newId, grams: 0}]
        }));


        setTimeout(() => {
            refs.current[newId]?.focus(); 
        }, 0)
    };

    const handleEditGrams = (e, prod) => {
        const newGrams = e.target.value.replace(',', '.');
        setNewRecipe(prev => ({
            ...prev,
            products: prev.products.map(product => product.id === prod.id ? {
                ...product,
                grams: newGrams,
            } : product),
            b: productsBarSum(prev.products, prod, newGrams, 'proteins'),
            a: productsBarSum(prev.products, prod, newGrams, 'carbs'),
            r: productsBarSum(prev.products, prod, newGrams, 'fat'),
            kcal: kcal(
                productsBarSum(prev.products, prod, newGrams, 'proteins'), 
                productsBarSum(prev.products, prod, newGrams, 'carbs'), 
                productsBarSum(prev.products, prod, newGrams, 'fat'))
        }));
    };

    const handleProductDelete = (prod_id) => {
        setNewRecipe(prev => ({
            ...prev, 
            products: prev.products.filter(prod => prod.id !== prod_id),
            b: mealProdBarSum(prev.products.filter(prod => prod.id !== prod_id), 'proteins'),
            a: mealProdBarSum(prev.products.filter(prod => prod.id !== prod_id), 'carbs'),
            r: mealProdBarSum(prev.products.filter(prod => prod.id !== prod_id), 'fat'),
            kcal: kcal(mealProdBarSum(prev.products.filter(prod => prod.id !== prod_id), 'proteins'),
                mealProdBarSum(prev.products.filter(prod => prod.id !== prod_id), 'carbs'),
                mealProdBarSum(prev.products.filter(prod => prod.id !== prod_id), 'fat'))
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
                {newRecipe.products.map(prod => <RecipeProduct 
                    key={prod.id} 
                    prod={prod} 
                    handleProductDelete={handleProductDelete}
                >
                    <input 
                        ref={el => refs.current[prod.id] = el}
                        type='text' 
                        // maxLength={4}
                        inputMode='numeric'
                        autoComplete='off'
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
                    {results.map(prod => <div onClick={() => handleAddProduct(prod)} className={styles.searchProduct} key={prod.id}>
                        {prod.title}
                    </div>)}
                </div>}

            </div>
            
            <div className={styles.recipeSummary}>
                <div className={styles.bar}>
                    <span className={`${styles.b} ${styles[is_error('b')]}`}>B {newRecipe.b.toFixed(0)}</span>
                    <span className={`${styles.a} ${styles[is_error('a')]}`}>A {newRecipe.a.toFixed(0)}</span>
                    <span className={`${styles.r} ${styles[is_error('r')]}`}>R {newRecipe.r.toFixed(0)}</span>
                </div>
                <span className={styles.k}><Flame className={styles.kcalIcon}/>{newRecipe.kcal.toFixed(0)} <small>kcal</small></span>
            </div>
        </div>
    );
};

export default NewRecipe;