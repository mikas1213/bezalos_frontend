import styles from './AvailableProducts.module.css';
import { useState } from 'react';
import { set_grams_keitykle } from '../../../utils/calculationsHelpers';
import { TbSortAscendingLetters, TbSortDescendingLetters, TbSortAscendingNumbers, TbSortDescendingNumbers } from 'react-icons/tb';

const avail_food_types = ['Mėsa', 'Žuvis', 'Kruopos', 'Pieno produktai', 'Ankštiniai'];
const AvailableProducts = ({ prodList, selectedProd }) => {

    const [sortOrder, setSortOrder] = useState({
        food_type: 'all',
        title: true,
        grams: true,
        sort: true
    });

    const sortTitle = (a, b) => sortOrder.title ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    const sortGrams = (a, b) => sortOrder.grams ? a.grams - b.grams : b.grams - a.grams;

    const [availableProducts, setAvailableProducts] = useState(prodList.filter(prod => prod.category === selectedProd.category));
    const food_types = Array.from(new Set(prodList.filter(prod => prod.category === selectedProd.category && avail_food_types.includes(prod.food_type)).map(prod => prod.food_type)));
    
    return (
        <>
            <div className={styles.groupFilters}>
                <button 
                    className={sortOrder.food_type === 'all' ? styles.active : ''}
                    onClick={() => {
                        setSortOrder(prevSort => ({...prevSort, food_type: 'all'}));
                        setAvailableProducts(prodList.filter(prod => prod.category === selectedProd.category))
                    }}
                >Visi</button>

                {food_types.map(food_type => <button
                    key={food_type}
                    className={sortOrder.food_type === food_type ? styles.active : ''}
                    onClick={() => {
                        setSortOrder(prevSort => ({...prevSort, food_type}));
                        setAvailableProducts(prodList.filter(prod => prod.category === selectedProd.category && prod.food_type === food_type))
                    }}
                >{food_type}</button>)}
            </div>

            <div className={styles.sort}>
                <div className={styles.title}
                    onClick={() => {
                        setSortOrder(prevSort => ({...prevSort, sort: true}));
                        setSortOrder(prevSort => ({...prevSort, title: prevSort.title ? false : true}));
                    }}
                >
                    <span>Pavadinimas</span> 
                    {sortOrder.title ? <TbSortAscendingLetters className={styles.icon} />
                    : <TbSortDescendingLetters className={styles.icon} />}
                </div>
                
                <div className={styles.grams}
                    onClick={() => {
                        setSortOrder(prevSort => ({...prevSort, sort: false}));
                        setSortOrder(prevSort => ({...prevSort, grams: prevSort.grams ? false : true}));
                    }}
                >
                    <span>Gramai</span> 
                    {sortOrder.grams ? <TbSortAscendingNumbers className={styles.icon} />
                    : <TbSortDescendingNumbers className={styles.icon} />}
                </div>
            </div>
            
            <div className={styles.availableProducts}>
                {availableProducts.map(prod => ({...prod, grams: set_grams_keitykle(selectedProd, prod)})).sort(sortOrder.sort ? sortTitle : sortGrams).map(prod => 
                    <div key={prod.id} className={styles.availProd}>
                        <span className={styles.prodTitle}>{prod.title}</span>
                        {/* <span style={{fontSize: '0.7rem'}}>{prod.food_type}</span> */}
                        <div className={styles.gramsContainer}>
                            <span>{prod.grams.toFixed(0)}</span>
                            <span>g</span>
                        </div>        
                    </div>
                )}
            </div>
        </>
    );
};

export default AvailableProducts;