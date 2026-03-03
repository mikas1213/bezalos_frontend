import styles from './EditUserPlan.module.css';
import { useState } from 'react';
import { axiosPrivate } from '../../../../api/axios';
import { default as MealSelect } from 'react-select/async';
import { default as ProdSelect } from 'react-select/async';
import { LuWheatOff, LuMilkOff } from 'react-icons/lu';
import { DeleteBin_icon } from '../../../../svg/icons';

const mealStyles = {
    container: (provider) => ({
        ...provider,
    }),
    control: (provider, state) => ({
        ...provider,
        backgroundColor: 'var(--color-bgr-light)',
        borderRadius: '30px',
        boxShadow: state.isFocused ? 'var(--color-radio-border)' : 'var(--color-bgr-light)',
        borderColor: state.isFocused ? 'var(--color-radio-border)' : 'var(--color-bgr-light)',
        '&:hover': { 
            cursor: 'pointer', 
            borderColor: !state.isFocused ? 'var(--color-bgr-card)' : 'var(--color-radio-border)', 
            boxShadow: !state.isFocused ? 'var(--color-bgr-card)' : 'var(--color-radio-border)'
        },
        transition: 'all 0.15s ease-in-out',
        width: 400, 
        minHeight: 0,
        height: '2.6rem',
        '@media only screen and (max-width: 576px)': {
            width: 'clamp(0rem, 50vw, 18rem)',
            height: 'clamp(0rem, 6.944vw, 2.5rem)',
        },
    }),
    valueContainer: (provider) => ({
        ...provider,
        minHeight: 0,
        height: '2.6rem',
        fontSize: 'var(--font-size-h5)',
        '@media only screen and (max-width: 576px)': {
            fontSize: 'var(--font-size-dynamic-h4-sm)',
            fontWeight: '500',
            height: 'clamp(0rem, 6.944vw, 2.5rem)',
        },
    }),
    singleValue: (provider) =>({
        ...provider,
        color: 'var(--color-bgr-top)'
    }),
    input: (provider) => ({
        ...provider,
        minHeight: 0,
        color: 'var(--color-bgr-top)'
    }),
    menu: (provider) => ({
        ...provider,
        marginTop: 2,
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
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
const productStyles = {
    control: (provider, state) => ({
        ...provider,
        backgroundColor: 'var(--color-bgr-light)',
        borderRadius: '20px',
        boxShadow: state.isFocused ? 'var(--color-radio-border)' : 'var(--color-bgr-light)',
        borderColor: state.isFocused ? 'var(--color-radio-border)' : 'var(--color-bgr-light)',
        '&:hover': { 
            cursor: 'pointer', 
            borderColor: !state.isFocused ? 'var(--color-bgr-card)' : 'var(--color-radio-border)', 
            boxShadow: !state.isFocused ? 'var(--color-bgr-card)' : 'var(--color-radio-border)'
        },
        width: 300,
        minHeight: 0,
        height: '2.2rem'
    }),
    valueContainer: (provider) => ({
        ...provider,
        minHeight: 0,
        height: '2.2rem',
        fontSize: 'var(--font-size-h6)',
    }),
    singleValue: (provider) =>({
        ...provider,
        color: 'var(--color-bgr-top)',
        minHeight: 0
    }),
    input: (provider) => ({
        ...provider,
        minHeight: 0,
        color: 'var(--color-bgr-top)'
    }),
    menu: (provider) => ({
        ...provider,
        marginTop: 2,
        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
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

const EditUserPlan = ({ currentUserPlan, onPlanChange, onPlanUpdate }) => {


    const [mealTitle, setMealTitle] = useState('');
    const [prodTitle, setProdTitle] = useState('');
    const [selectMealIndex, setSelectMealIndex] = useState(null);
    const [selectProdIndex, setSelectProdIndex] = useState({m_index: null, p_index: null});

    const handleMealChange = (e, m_id) => {
        onPlanChange('update-meal-title', {...e, m_id});
        onPlanUpdate('update-meal-title', {meal: e, meal_id: m_id});
    };

    const handleProdChange = (e, m_id, p_id) => {
        onPlanChange('update-product-title', {...e, m_id, p_id})
        onPlanUpdate('update-product-title', { prod: e, meal_id: m_id, prod_id: p_id });
    };

    const handleProdDelete = (e, m_id, p_id) => {
        onPlanUpdate('delete-product', {meal_id: m_id, prod_id: p_id});

        e.target.closest(`.${styles.prod}`).classList.add(styles.deletedProd);
        setTimeout(() => {
            onPlanChange('delete-product', {m_id, p_id});
        }, 100);
    };

    const loadOptions = async (inputValue, callback, type) => {
        try {
            const endpoint = type === 'meals' ? '/admin/plans/meals' : '/admin/plans/products';

            if(inputValue && inputValue.length > 2) {
                const { data } = await axiosPrivate.get(`${endpoint}?search=${inputValue}`);
                // skirtingi resp meals ir products
                const resp = data.length ? [...data] : [...data.data];
                const options = resp.map(item => ({
                    label: item.title,
                    value: item.id,
                        // jei renkiesi valgį
                    ...(type === 'meals' ? {
                        logic: item.logic,
                        intolerance: item.intolerance,
                        products: item.products
                    } : {
                        // jei renkiesi produktą
                        category: item.category,
                        sub_category: item.sub_category,
                        b_100: +item.proteins,
                        a_100: +item.carbs,
                        r_100: +item.fat
                    })
                }));
                callback(options);
            }
        } catch (err) {
            callback([]);
        }
    };

    return (
        <div className={styles.plan}>
            <span className={styles.deleteBtnContainer} onClick={() => {
                const isDelete = window.confirm('Ištrinti planą?');
                if(isDelete) {
                    onPlanChange('delete-plan');
                    onPlanUpdate('delete-plan', {});
                }
            }}>
                <DeleteBin_icon icon={styles.planDeleteBtn} />
            </span>

            <div className={styles.title}>
                <input type='text' 
                    value={currentUserPlan.title}
                    name='title'
                    onChange={e => onPlanChange('update-plan-title', {title: e.target.value})}
                    onBlur={e => onPlanUpdate('update-plan-title', {title: e.target.value})}
                />
                <div className={styles.planBar}>
                    <span>B {currentUserPlan.b?.toFixed(0)}</span>
                    <span>A {currentUserPlan.a?.toFixed(0)}</span>
                    <span>R {currentUserPlan.r?.toFixed(0)}</span>
                    <span>Kcal {currentUserPlan.kcal?.toFixed(0)}</span>
                </div>
            </div>

            {currentUserPlan.meals.map(meal => 
                !meal.is_sport ? <div key={meal.id} className={styles.meal}>
                    <div className={styles.mealLeft}>
                        <input 
                            type='text' 
                            name='meal_time'
                            value={meal.meal_time} 
                            onChange={e => onPlanChange('update-meal-time', {meal_time: e.target.value, meal_id: meal.id})}
                            onBlur={e => onPlanUpdate('update-meal-time', {meal_time: e.target.value, meal_id: meal.id})} 
                        />
                        <span className={`${styles.mealLogic} ${styles[meal.logic.replace('+', '_')]}`}>{meal.logic}</span>
                    </div>

                    <div className={styles.right}>
                        <div className={styles.mealHeader}>
                            <div className={styles.mealTitle}>
                                <MealSelect 
                                    components={{ DropdownIndicator: null, IndicatorSeparator: null, LoadingIndicator: null }}
                                    cacheOptions
                                    name='title'
                                    menuPosition='fixed'
                                    isSearchable={true}
                                    styles={mealStyles}
                                    loadOptions={(inputVal, cb) => loadOptions(inputVal, cb, 'meals')} 
                                    defaultOptions={false}
                                    loadingMessage={() => null}
                                    onFocus={() => setSelectMealIndex(meal.id)}
                                    onBlur={() => setSelectMealIndex(null)}
                                    menuIsOpen={mealTitle.length > 2 && selectMealIndex === meal.id}
                                    onInputChange={setMealTitle}
                                    onChange={e => handleMealChange(e, meal.id)}
                                    value={{value: meal.meal_id, label: meal.title}}
                                />
                                {meal.intolerance === 'gluten_free' && <LuWheatOff className={styles.intolerance}/>}
                                {meal.intolerance === 'lactose_free' && <LuMilkOff className={styles.intolerance}/>}
                            </div>

                            <div className={styles.bar}>
                                <span>B {meal.b?.toFixed(0)}</span>
                                <span>A {meal.a?.toFixed(0)}</span>
                                <span>R {meal.r?.toFixed(0)}</span>
                                <span>Kcal {meal.kcal?.toFixed(0)}</span>
                            </div>
                        </div>    
                        
                        <div className={styles.products}>
                            {meal.products.map(prod => <div key={prod.id} className={styles.prod}>
                                <ProdSelect 
                                    components={{ DropdownIndicator: null, IndicatorSeparator: null, LoadingIndicator: null }}
                                    styles={productStyles}
                                    cacheOptions
                                    menuPosition='fixed'
                                    name='title'
                                    isSearchable={true}
                                    defaultOptions={false}
                                    loadingMessage={() => null}
                                    loadOptions={(inputVal, cb) => loadOptions(inputVal, cb, 'products')}
                                    onFocus={() => setSelectProdIndex({m_index: meal.id, p_index: prod.id})}
                                    onBlur={() => setSelectProdIndex({m_index: null, p_index: null})}
                                    menuIsOpen={prodTitle.length > 2 && selectProdIndex.m_index === meal.id && selectProdIndex.p_index === prod.id}
                                    onInputChange={setProdTitle}
                                    onChange={e => handleProdChange(e, meal.id, prod.id)}
                                    value={{value: prod.product_id ,label: prod.title}}
                                />
                                <div className={styles.grams}>
                                    <input 
                                        type='text' 
                                        name='grams'
                                        value={prod.grams} 
                                        onChange={e => onPlanChange('update-prod-grams', {grams: e.target.value, m_id: meal.id, p_id: prod.id})}
                                        onBlur={e => onPlanUpdate('update-prod-grams', {grams: e.target.value, prod_id: prod.id})}
                                    />
                                    <span>g</span>
                                </div>

                                <span className={styles.deleteProdIcon} onClick={(e) => handleProdDelete(e, meal.id, prod.id)}>
                                    <DeleteBin_icon className={styles.planDeleteBtn} icon={styles.icon} />
                                </span>
                            </div>)}
                        </div>
                    </div>
                </div>
            :
                <div key={meal.id} className={styles.sport}>
                    <span>SPORTAS</span>
                    <input 
                        type='text' 
                        name='meal_time'
                        value={meal.meal_time} 
                        onChange={e => onPlanChange('update-meal-time', {meal_time: e.target.value, meal_id: meal.id})}
                        onBlur={e => onPlanUpdate('update-meal-time', {meal_time: e.target.value, meal_id: meal.id})} 
                    />
                </div>
            )}
        </div>
    );
};

export default EditUserPlan;