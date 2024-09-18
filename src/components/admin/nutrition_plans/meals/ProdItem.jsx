import styles from './ProdItem.module.css';
import AsyncSelect from 'react-select/async';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import { useState, useRef } from 'react';
import { kcal } from '../../../../utils/calculationsHelpers';

const height = 26;
const minHeight = 0;
const customStyles = {
    control: (provided, state) => ({
        ...provided,
        '&:hover': { cursor: 'pointer', borderColor: '#999', boxShadow: '#999' },
        boxShadow: state.isFocused || state.isSelected ? '#999' : '#fff',
        borderColor: state.isFocused || state.isSelected ? '#999' : '#fff',
        fontSize: 14,
        fontWeight: 600,
        minHeight,
        height,
        maxWidth: '150px',
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
        backgroundColor: state.isSelected ? '#245D6B' : state.isFocused ? '#245D6B11' : '#fff',
        color: state.isSelected ? '#fff' : state.isFocused ? '#245D6B' : '#777',
        '&:hover': {
            backgroundColor: state.isSelected ? '#245D6B' : '#245D6B11',
            color: state.isSelected ? '#fff' : '#245D6B',
        }
    })
}

const ProdItem = ({ prod, handleMealProductEdit }) => {
    
    const inputGrams = useRef(null);
    const [gramsValue, setGramsValue] = useState(prod.grams);
    const [currentSelectValue, setCurrentSelectValue] = useState({ 
        label: prod.title, 
        value: prod.product_id, 
        b_100: prod.b_100, 
        a_100: prod.a_100, 
        r_100: prod.r_100
    });

    const axiosPrivate = useAxiosPrivate();
    const loadOptions = (inputValue, callback) => {
        if(inputValue && inputValue.length > 2) {
            axiosPrivate.get(`/admin/plans/products?search=${inputValue}`).then(response => {
                const options = response.data.data.map(item => ({
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

    return (
        <div className={styles.prodItem}>
            <div className={styles.title}>
                <AsyncSelect 
                    components={{ DropdownIndicator: null, IndicatorSeparator: null }}
                    cacheOptions
                    isSearchable={true}
                    loadOptions={loadOptions} 
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
            </div>
        </div>
    );
};

export default ProdItem;