import styles from './NewRecipe.module.css';
import { useState, useRef } from 'react';
import { FaRegArrowAltCircleUp } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import RecipeProduct from './RecipeProduct';
import { Flame } from 'lucide-react';
import { kcal, mealProdBarSum, productsBarSum } from '../../../../../utils/calculationsHelpers';
import Select from './Select';
import CheckBox from './CheckBox';
import Textarea from './Textarea';

const recipeTypes = ['Pusryčiai', 'Pietūs', 'Vakarienė', 'Užkandžiai'];
const tastes = ['Aštru', 'Saldu', 'Sūru'];
const foodLogic = ['A+B', 'B+R', 'A+R'];
const durations = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90];

const NewRecipe = ({ prodList, newRecipe, setNewRecipe }) => {

    const refs = useRef({});
    const [searchInput, setSearchInput] = useState('');
    const [isShowResults, setIsShowResults] = useState(false);
    const [results, setResults] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [photoPreview, setPhotoPreview] = useState(null);
    
    const handleKeyDown = (e) => {
        if (results.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1));
        } else if (e.key === 'Enter') {
            if (activeIndex >= 0) {
                handleAddProduct(results[activeIndex]);
                setSearchInput('');
                setIsShowResults(false);
                setActiveIndex(-1);
            }
        }
    };
    
    const handleProdSearch = e => {
        setSearchInput(e.target.value);
        setActiveIndex(-1);
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
            products: [...prev.products, {...prod, product_id: prod.id, id: newId}]
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

            <div className={styles.section}>
                <div className={styles.inputGroup}>
                    <span className={styles.inputLabel}>Pavadinimas</span>
                    <input 
                        type='text' 
                        value={newRecipe.title}
                        onChange={e => setNewRecipe(prev => ({...prev, title: e.target.value}))}
                        className={styles.recipeTitleInput} 
                        placeholder='Recepto pavadinimas' 
                    />
                </div>

                <div className={styles.inputGroup}>
                    <span className={styles.inputLabel}>Trumpas Pavadinimas <small>(SEO)</small></span>
                    <input 
                        type='text' 
                        value={newRecipe.title_short}
                        onChange={e => setNewRecipe(prev => ({...prev, title_short: e.target.value}))}
                        className={styles.recipeTitleInput} 
                        placeholder='Trumpas pavadinimas' 
                    />
                </div>

                <div className={styles.inputGroup}>
                    <span className={styles.inputLabel}>Valgio tipas</span>
                    <Select options={recipeTypes} newRecipe={newRecipe} setNewRecipe={setNewRecipe} field='recipe_type' />
                </div>
                
                <div className={styles.inputGroup}>
                    <span className={styles.inputLabel}>Logika</span>
                    <Select options={foodLogic} newRecipe={newRecipe} setNewRecipe={setNewRecipe} field='food_logic' />
                </div>
                
                <div className={styles.inputGroup}>
                    <span className={styles.inputLabel}>Skonis</span>
                    <Select options={tastes} newRecipe={newRecipe} setNewRecipe={setNewRecipe} field='taste' />
                </div>

                <div className={styles.inputGroup}>
                    <span className={styles.inputLabel}>Trukmė</span>
                    <Select options={durations} newRecipe={newRecipe} setNewRecipe={setNewRecipe} field='duration' />
                </div>

                <div className={styles.inputGroup}>
                    <span className={styles.inputLabel}>Be mėsos</span>
                    <CheckBox newRecipe={newRecipe} setNewRecipe={setNewRecipe} />
                </div>
            </div>

            <div className={styles.section}>

                <div className={styles.inputGroup}>
                    {newRecipe?.products?.length > 0 && 
                        <>
                            <span className={styles.inputLabel}>Produktai</span>
                            <div className={styles.recipeProducts}>
                                {newRecipe.products.map(prod => <RecipeProduct 
                                    key={prod.id} 
                                    prod={prod} 
                                    handleProductDelete={handleProductDelete}
                                >
                                    <input 
                                        ref={el => refs.current[prod.id] = el}
                                        type='text' 
                                        maxLength={5}
                                        inputMode='numeric'
                                        autoComplete='off'
                                        value={prod.grams ?? ''}
                                        onBlur={() => setNewRecipe(prev => ({
                                                ...prev, products: prev.products.map(p => p.id === prod.id ? ({
                                                ...p, grams: prod.grams ? prod.grams : 0
                                            }): p)
                                        }))}
                                        onFocus={() => setNewRecipe(prev => ({
                                            ...prev, products: prev.products.map(p => p.id === prod.id ? ({
                                                ...p, grams: prod.grams == '0' ? '' : prod.grams
                                            }): p)
                                        }))}
                                        onChange={e => handleEditGrams(e, prod)} 
                                        className={styles.gramsInput}
                                    />
                                </RecipeProduct>)}
                            </div>
                        </>
                    }

                    <div className={styles.searchProductContainer}>
                        <span className={styles.inputLabel}>Paieška</span>
                        <input 
                            type='text' 
                            className={styles.productSearchInput} 
                            placeholder='Produkto paieška'
                            value={searchInput}
                            onChange={handleProdSearch}
                            onKeyDown={handleKeyDown}
                        />

                        {isShowResults && <div className={styles.searchProductsList}>
                            {results.map((prod, index) => <div 
                                key={prod.id}
                                onClick={() => handleAddProduct(prod)} 
                                className={`${styles.searchProduct} ${index === activeIndex ? styles.focused : ''}`} 
                            >
                                {prod.title}
                            </div>)}
                        </div>}
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <span className={styles.inputLabel}>Aprašymas</span>
                    <Textarea placeholder='Aprašymas' newRecipe={newRecipe} setNewRecipe={setNewRecipe} />

                    <div className={styles.inputGroup}>
                        <span className={styles.inputLabel}>Video link</span>
                        <input 
                            type='text' 
                            name='video_link'
                            value={newRecipe.video_link}
                            onChange={e => setNewRecipe(prev => ({...prev, video_link: e.target.value}))}
                            className={styles.recipeVideoLink} 
                            placeholder='URL' 
                        />
                    </div>

                    <div className={styles.photoInputContainer}>
                        <span className={styles.inputLabel}>Foto</span>
                        <div className={styles.fileUpload}>
                            <input 
                                type='file' 
                                accept='image/*' 
                                name='photo' 
                                id='fileInput' 
                                className={styles.inputFile} 
                                onChange={e => {
                                    const selectedFile = e.target.files[0];
                                    setNewRecipe(prev => ({ ...prev, photo: selectedFile }));
                                    setPhotoPreview(URL.createObjectURL(selectedFile));
                                }}
                            />
                            <div 
                                className={styles.uploadFileBtn}
                                onClick={() => {
                                    document.getElementById('fileInput').click();
                                }}
                            >
                                <FaRegArrowAltCircleUp className={styles.icon} />
                                <span>Pasirinkti failą</span>
                            </div>
                            {photoPreview && <img src={photoPreview} alt='Preview' width='230' style={{borderRadius: '0.5rem'}} />}
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.recipeSummary}>
                <div className={styles.bar}>
                    <span className={styles.b}>B {newRecipe.b?.toFixed(0)}</span>
                    <span className={styles.a}>A {newRecipe.a?.toFixed(0)}</span>
                    <span className={styles.r}>R {newRecipe.r?.toFixed(0)}</span>
                </div>
                <span className={styles.k}><Flame className={styles.kcalIcon}/>{newRecipe.kcal?.toFixed(0)} <small>kcal</small></span>
            </div>
        </div>
    );
};

export default NewRecipe;