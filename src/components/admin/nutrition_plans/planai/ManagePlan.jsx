import styles from './ManagePlan.module.css';
import { useState } from 'react';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import { default as MealSelect } from 'react-select/async';
import { default as ProdSelect } from 'react-select/async';
import { kcal } from '../../../../utils/calculationsHelpers';
import { LuWheatOff, LuMilkOff } from 'react-icons/lu';
import { DeleteBin_icon } from '../../../../svg/icons';
import { bar, mealProdBarSum } from '../../../../utils/calculationsHelpers';

const mealStyles = {
    container: (provider) => ({
        ...provider,
        width: '100%'
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
        height: '2.6rem'
    }),
    valueContainer: (provider) => ({
        ...provider,
        minHeight: 0,
        height: '2.6rem',
        fontSize: 'var(--font-size-h5)',
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

const ManagePlan = ({ plan: currentPlan, setPlan: setCurrentPlan, assignPlanToUser }) => {
    
    const axiosPrivate = useAxiosPrivate();
    const [mealTitle, setMealTitle] = useState('');
    const [prodTitle, setProdTitle] = useState('');
    const [selectMealIndex, setSelectMealIndex] = useState(null);
    const [selectProdIndex, setSelectProdIndex] = useState({m_index: null, p_index: null});
    
    const handleMealChange = (e, m_id) => {
        setCurrentPlan(prevState => ({
            ...prevState,
            b: prevState.meals.filter(meal => !meal.is_sport).map(meal => meal.id === m_id 
                // ? e.products.map(prod => bar(prod.b_100, prod.grams)).reduce((acc, val) => acc + val, 0)
                // : meal.products.map(prod => bar(prod.b_100, prod.grams)).reduce((acc, val) => acc + val, 0)
                ? mealProdBarSum(e.products, 'b_100')
                : mealProdBarSum(meal.products, 'b_100')
            ).reduce((acc, val) => acc + val, 0),

            a: prevState.meals.filter(meal => !meal.is_sport).map(meal => meal.id === m_id 
                // ? e.products.map(prod => bar(prod.a_100, prod.grams)).reduce((acc, val) => acc + val, 0)
                // : meal.products.map(prod => bar(prod.a_100, prod.grams)).reduce((acc, val) => acc + val, 0)
                ? mealProdBarSum(e.products, 'a_100')
                : mealProdBarSum(meal.products, 'a_100')
            ).reduce((acc, val) => acc + val, 0),

            r: prevState.meals.filter(meal => !meal.is_sport).map(meal => meal.id === m_id 
                // ? e.products.map(prod => bar(prod.r_100, prod.grams)).reduce((acc, val) => acc + val, 0)
                // : meal.products.map(prod => bar(prod.r_100, prod.grams)).reduce((acc, val) => acc + val, 0)
                ? mealProdBarSum(e.products, 'r_100')
                : mealProdBarSum(meal.products, 'r_100')
            ).reduce((acc, val) => acc + val, 0),

            meals: prevState.meals.map(meal => meal.id === m_id ? {
                ...meal,
                title: e.label,
                logic: e.logic,
                intolerance: e.intolerance,
                // b: e.products.map(prod => bar(prod.b_100, prod.grams)).reduce((acc, val) => acc + val, 0),
                // a: e.products.map(prod => bar(prod.a_100, prod.grams)).reduce((acc, val) => acc + val, 0),
                // r: e.products.map(prod => bar(prod.r_100, prod.grams)).reduce((acc, val) => acc + val, 0),
                b: mealProdBarSum(e.products, 'b_100'),
                a: mealProdBarSum(e.products, 'a_100'),
                r: mealProdBarSum(e.products, 'r_100'),
                kcal: 100,
                products: e.products
            } : meal)
        }));
    };

    const handleProdChange = (e, m_id, p_id) => {
        setCurrentPlan(prevState => ({
            ...prevState,
            b: prevState.meals.filter(meal => !meal.is_sport).map(meal => meal.products.map(prod => prod.id === p_id ? bar(e.b_100, prod.grams) : bar(prod.b_100, prod.grams)).reduce((acc, val) => acc + val, 0)).reduce((acc, val) => acc + val, 0),
            a: prevState.meals.filter(meal => !meal.is_sport).map(meal => meal.products.map(prod => prod.id === p_id ? bar(e.a_100, prod.grams) : bar(prod.a_100, prod.grams)).reduce((acc, val) => acc + val, 0)).reduce((acc, val) => acc + val, 0),
            r: prevState.meals.filter(meal => !meal.is_sport).map(meal => meal.products.map(prod => prod.id === p_id ? bar(e.r_100, prod.grams) : bar(prod.r_100, prod.grams)).reduce((acc, val) => acc + val, 0)).reduce((acc, val) => acc + val, 0),
            meals: prevState.meals.map(meal => meal.id === m_id ? {
                ...meal,
                b: meal.products.map(prod => prod.id === p_id 
                    ? bar(e.b_100, prod.grams)
                    : bar(prod.b_100, prod.grams)).reduce((acc, val) => acc + val, 0),

                a: meal.products.map(prod => prod.id === p_id 
                    ? bar(e.a_100, prod.grams)
                    : bar(prod.a_100, prod.grams)).reduce((acc, val) => acc + val, 0),

                r: meal.products.map(prod => prod.id === p_id 
                    ? bar(e.r_100, prod.grams)
                    : bar(prod.r_100, prod.grams)).reduce((acc, val) => acc + val, 0),

                products: meal.products.map(prod => prod.id === p_id ? {
                    ...prod,
                    title: e.label,
                    b_100: e.b_100,
                    a_100: e.a_100,
                    r_100: e.r_100
                } : prod)
            } : meal)
        }));
    };

    const handleGramsChange = (e, m_id, p_id) => {
        setCurrentPlan(prevState => ({
            ...prevState,
            b: prevState.meals.filter(meal => !meal.is_sport).map(meal => meal.products.map(prod => (meal.id === m_id && prod.id === p_id) ? bar(prod.b_100, e.target.value) : bar(prod.b_100, prod.grams)).reduce((acc, val) => acc + val, 0)).reduce((acc, val) => acc + val, 0),
            a: prevState.meals.filter(meal => !meal.is_sport).map(meal => meal.products.map(prod => (meal.id === m_id && prod.id === p_id) ? bar(prod.a_100, e.target.value) : bar(prod.a_100, prod.grams)).reduce((acc, val) => acc + val, 0)).reduce((acc, val) => acc + val, 0),
            r: prevState.meals.filter(meal => !meal.is_sport).map(meal => meal.products.map(prod => (meal.id === m_id && prod.id === p_id) ? bar(prod.r_100, e.target.value) : bar(prod.r_100, prod.grams)).reduce((acc, val) => acc + val, 0)).reduce((acc, val) => acc + val, 0),

            meals: prevState.meals.map(meal => meal.id === m_id ? {
                ...meal,
                b: meal.products.map(prod => prod.id === p_id 
                    ? bar(prod.b_100, +e.target.value)
                    : bar(prod.b_100, prod.grams)).reduce((acc, val) => acc + val, 0),

                a: meal.products.map(prod => prod.id === p_id 
                    ? bar(prod.a_100, +e.target.value)
                    : bar(prod.a_100, prod.grams)).reduce((acc, val) => acc + val, 0),

                r: meal.products.map(prod => prod.id === p_id 
                    ? bar(prod.r_100, +e.target.value)
                    : bar(prod.r_100, prod.grams)).reduce((acc, val) => acc + val, 0),

                products: meal.products.map(prod => prod.id === p_id ? {
                    ...prod,
                    grams: +e.target.value.replace(',', '.')
                } : prod)
            } : meal)
        }));
    };

    const handleProdDelete = (e, m_id, p_id) => {
        e.target.closest(`.${styles.prod}`).classList.add(styles.deletedProd);
        setTimeout(() => {
            setCurrentPlan(prevState => ({
                ...prevState,
                
                b: prevState.meals.map(meal => meal.id === m_id
                    // ? meal.products.filter(prod => prod.id !== p_id).map(prod => bar(prod.b_100, prod.grams)).reduce((acc, val) => acc + val, 0)
                    // : meal.products.map(prod => bar(prod.b_100, prod.grams)).reduce((acc, val) => acc + val, 0)
                    ? mealProdBarSum(meal.products.filter(prod => prod.id !== p_id), 'b_100')
                    : mealProdBarSum(meal.products, 'b_100')
                ).reduce((acc, val) => acc + val, 0),

                a: prevState.meals.map(meal => meal.id === m_id
                    // ? meal.products.filter(prod => prod.id !== p_id).map(prod => bar(prod.a_100, prod.grams)).reduce((acc, val) => acc + val, 0)
                    // : meal.products.map(prod => bar(prod.a_100, prod.grams)).reduce((acc, val) => acc + val, 0)
                    ? mealProdBarSum(meal.products.filter(prod => prod.id !== p_id), 'a_100')
                    : mealProdBarSum(meal.products, 'a_100')
                ).reduce((acc, val) => acc + val, 0),

                r: prevState.meals.map(meal => meal.id === m_id
                    // ? meal.products.filter(prod => prod.id !== p_id).map(prod => bar(prod.r_100, prod.grams)).reduce((acc, val) => acc + val, 0)
                    // : meal.products.map(prod => bar(prod.r_100, prod.grams)).reduce((acc, val) => acc + val, 0)
                    ? mealProdBarSum(meal.products.filter(prod => prod.id !== p_id), 'r_100')
                    : mealProdBarSum(meal.products, 'r_100')
                ).reduce((acc, val) => acc + val, 0),

                meals: prevState.meals.map(meal => meal.id === m_id ? {
                    ...meal,
                    // b: meal.products.filter(prod => prod.id !== p_id).map(prod => bar(prod.b_100, prod.grams)).reduce((acc, val) => acc + val, 0),
                    // a: meal.products.filter(prod => prod.id !== p_id).map(prod => bar(prod.a_100, prod.grams)).reduce((acc, val) => acc + val, 0),
                    // r: meal.products.filter(prod => prod.id !== p_id).map(prod => bar(prod.r_100, prod.grams)).reduce((acc, val) => acc + val, 0),
                    b: mealProdBarSum(meal.products.filter(prod => prod.id !== p_id), 'b_100'),
                    a: mealProdBarSum(meal.products.filter(prod => prod.id !== p_id), 'a_100'),
                    r: mealProdBarSum(meal.products.filter(prod => prod.id !== p_id), 'r_100'),
                    products: meal.products.filter(prod => prod.id !== p_id)
                } : meal)
            }));
        }, 100);
    };

    const loadOptions = async (inputValue, callback, type) => {
        try {
            const endpoint = type === 'meals' ? '/admin/plans/meals' : '/admin/plans/products';

            if(inputValue && inputValue.length > 2) {
                const { data } = await axiosPrivate.get(`${endpoint}?search=${inputValue}`);
                const options = data.map(item => ({
                    label: item.title,
                    value: item.id,
                    ...(type === 'meals' ? {
                        logic: item.logic,
                        intolerance: item.intolerance,
                        products: item.products
                    } : {
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
            <div className={styles.title}>
                <input type='text' 
                    value={currentPlan.title} 
                    onFocus={(e) => e.target.value = ''}
                    onBlur={(e) => e.target.value = e.target.value.length > 0 ? e.target.value : currentPlan.title}
                    onChange={e => setCurrentPlan(prevState => ({...prevState, title: e.target.value}))}
                />
                <div className={styles.planBar}>
                    <span>B {currentPlan.b?.toFixed(0)}</span>
                    <span>A {currentPlan.a?.toFixed(0)}</span>
                    <span>R {currentPlan.r?.toFixed(0)}</span>
                    <span>Kcal {kcal(currentPlan.b, currentPlan.a, currentPlan.r)?.toFixed(0)}</span>
                </div>
            </div>

            {currentPlan.meals.map(meal => 
                meal.meal_id ? <div key={meal.id} className={styles.meal}>
                    <div className={styles.mealLeft}>
                        <input type='text' value={meal.meal_time} onChange={(e) => setCurrentPlan(prevState => ({
                            ...prevState,
                            meals: [...prevState.meals.map(m => m.id === meal.id ? {...m, meal_time: e.target.value} : m)]
                        }))} />
                        <span className={`${styles.mealLogic} ${styles[meal.logic.replace('+', '_')]}`}>{meal.logic}</span>
                    </div>

                    <div className={styles.right}>
                        <div className={styles.mealHeader}>
                            <div className={styles.mealTitle}>
                                <MealSelect 
                                    components={{ DropdownIndicator: null, IndicatorSeparator: null, LoadingIndicator: null }}
                                    cacheOptions
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
                                <span>Kcal {kcal(meal.b, meal.a, meal.r)?.toFixed(0)}</span>
                            </div>
                        </div>    
                        
                        <div className={styles.products}>
                            {meal.products.map(prod => <div key={prod.id} className={styles.prod}>
                                <ProdSelect 
                                    components={{ DropdownIndicator: null, IndicatorSeparator: null, LoadingIndicator: null }}
                                    styles={productStyles}
                                    cacheOptions
                                    menuPosition='fixed'
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
                                    <input type='text' value={prod.grams} onChange={e => handleGramsChange(e, meal.id, prod.id)}/>
                                    <span>g</span>
                                </div>

                                <span className={styles.deleteProdIcon} onClick={(e) => handleProdDelete(e, meal.id, prod.id)}>
                                    <DeleteBin_icon icon={styles.icon} />
                                </span>
                            </div>)}
                        </div>
                    </div>
                </div>
            :
                <div key={meal.id} className={styles.sport}>
                    <span>SPORTAS</span>
                    <input type="text" value={meal.meal_time} onChange={(e) => setCurrentPlan(prevState => ({
                        ...prevState,
                        meals: [...prevState.meals.map(m => m.id === meal.id ? {...m, meal_time: e.target.value} : m)]
                    }))}/>
                </div>
            )}
            <button
                className={styles.assignPlanBtn}
                onClick={() => {
                    localStorage.removeItem('localPlan');
                    assignPlanToUser();
            }}>Priskirti</button>
        </div>
    );
};

export default ManagePlan;