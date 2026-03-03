import styles from './ProdItem.module.css';
import AsyncSelect from 'react-select/async';
import { axiosPrivate } from '../../../../api/axios';
import { useState, useRef } from 'react';
import { kcal } from '../../../../utils/calculationsHelpers';
import { DeleteBin_icon } from '../../../../svg/icons';

const height = 26;
const minHeight = 0;
const customStyles = {
    control: (provided, state) => ({
        ...provided,
        '&:hover': { cursor: 'pointer', borderColor: '#ddd', boxShadow: '#ddd' },
        boxShadow: state.isFocused || state.isSelected ? '#ddd' : '#fff',
        borderColor: state.isFocused || state.isSelected ? '#ddd' : '#fff',
        fontSize: 14,
        fontWeight: 600,
        minHeight,
        height,
        maxWidth: '245px',
        width: '220px',
        minWidth: '150px',
    }),
    valueContainer: (provided) => ({
        ...provided,
        minHeight,
        height,
        paddingLeft: 1
    }),
    singleValue: (provided) =>({
        ...provided,
        minHeight
    }),
    input: (provided) => ({
        ...provided,
        minHeight,
        paddingBottom: 3
    }),
    option: (provider, state) => ({
        ...provider,
        fontSize: 13,
        fontWeight: 500,
        padding: '3px 5px 3px 5px',
        borderBottom: '0.5px solid #ccc',
        backgroundColor: state.isFocused ? '#245D6B' : '#fff',
        color: state.isFocused ? '#fff' : '#245D6B',
        
        '&:hover': { cursor: 'pointer', 
            backgroundColor: '#245D6B',
            boxShadow: '#245D6B'
        }
    })
}

const ProdItem = ({ prod, handleMealProductEdit, handleMealProductDelete}) => {
    
    const inputGrams = useRef(null);
    const prodcutcRef = useRef(null);
    const [gramsValue, setGramsValue] = useState(prod.grams);
    const [currentSelectValue, setCurrentSelectValue] = useState({ 
        label: prod.title, 
        value: prod.product_id, 
        b_100: prod.b_100, 
        a_100: prod.a_100, 
        r_100: prod.r_100
    });


    const loadProductOptions = (inputValue, callback) => {
        if(inputValue && inputValue.length > 2) {
            axiosPrivate.get(`/admin/plans/products?search=${inputValue}`).then(response => {
                const options = response.data.map(item => ({
                    label: item.title,
                    value: item.id,
                    b_100: +item.proteins,
                    a_100: +item.carbs,
                    r_100: +item.fat
                }));

                callback(options);
            }).catch(error => {
                console.error('Error fetching data:', error);
                callback([]);
            });
        }
    };

    const handleEditProdTitle = (e, e_sel) => {
        inputGrams.current.focus();
        setCurrentSelectValue(e);
        handleMealProductEdit(
            e_sel.action, 
            prod.id, 
            prod.meal_id, 
            e.label, 
            e.value, 
            prod.grams,
            e.b_100,
            e.a_100,
            e.r_100
        );
    };

    const handleEditProdGrams = e => {
        handleMealProductEdit(
            e.type, 
            prod.id, 
            prod.meal_id, 
            currentSelectValue.label, 
            currentSelectValue.value, 
            +e.target.value.replace(',', '.'),
            currentSelectValue.b_100,
            currentSelectValue.a_100,
            currentSelectValue.r_100
        );
    };

    const handleDelete = async (id, meal_id) => {
        prodcutcRef.current.classList.add(styles.deleted);
        setTimeout(() => {
            handleMealProductDelete(id, meal_id);        
        }, 250);
    };
    
    return (
        <div ref={prodcutcRef} className={styles.prodItem}>
            <div className={styles.title}>
                <AsyncSelect 
                    components={{ DropdownIndicator: null, IndicatorSeparator: null }}
                    cacheOptions
                    menuPosition='fixed'
                    isSearchable={true}
                    loadOptions={loadProductOptions} 
                    defaultOptions={[currentSelectValue]}
                    loadingMessage={() => null}
                    styles={customStyles}
                    name='product_id'
                    onChange={handleEditProdTitle}
                    value={currentSelectValue}
                />
                <div className={styles.grams}>
                    <form onSubmit={e => {
                        e.preventDefault();
                        inputGrams.current.blur();
                    }} 
                        onChange={handleEditProdGrams} 
                        onBlur={handleEditProdGrams}
                    >
                        <input 
                            ref={inputGrams}
                            autoFocus={!!prod.isGramsFocus}
                            type='text' 
                            name='grams'
                            value={gramsValue} 
                            onChange={e => setGramsValue(e.target.value)} 
                        />
                    </form>
                    <span>g</span>
                </div>
            </div>
            <div className={styles.bar}>
                <span className={styles.b}>B {prod.b.toFixed(1)}</span>
                <span className={styles.a}>A {prod.a.toFixed(1)}</span>
                <span className={styles.r}>R {prod.r.toFixed(1)}</span>
                <span className={styles.kcal}>Kcal {kcal(prod.b, prod.a, prod.r).toFixed(0)}</span>
                <span onClick={() => handleDelete(prod.id, prod.meal_id)}>
                    <DeleteBin_icon icon={styles.icon}  />
                </span>
            </div>
        </div>
    );
};

export default ProdItem;