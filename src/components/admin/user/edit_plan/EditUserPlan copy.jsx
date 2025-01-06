import styles from './EditUserPlan.module.css';
import { useState } from 'react';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import { default as MealSelect } from 'react-select/async';
import { default as ProdSelect } from 'react-select/async';
import { bar, kcal, mealProdBarSum } from '../../../../utils/calculationsHelpers';
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

const EditUserPlan = ({ plan: currentPlan, setPlan: setCurrentPlan, onPlanUpdate, user, setUser }) => {

    const currentPlanTest = user.plans.find(plan => plan.id === currentPlan.id)
    console.log('testCurPlan: ', currentPlanTest)

    const axiosPrivate = useAxiosPrivate();
    const [mealTitle, setMealTitle] = useState('');
    const [prodTitle, setProdTitle] = useState('');
    const [selectMealIndex, setSelectMealIndex] = useState(null);
    const [selectProdIndex, setSelectProdIndex] = useState({m_index: null, p_index: null});

    const handleMealChange = (e, m_id) => {
        onPlanUpdate('update-meal', {meal: e, meal_id: m_id});

        setCurrentPlan(prevState => ({
            ...prevState,
            b: prevState.meals.filter(meal => !meal.is_sport).map(meal => meal.id === m_id 
                ? mealProdBarSum(e.products, 'b_100')
                : mealProdBarSum(meal.products, 'b_100')
            ).reduce((acc, val) => acc + val, 0),

            a: prevState.meals.filter(meal => !meal.is_sport).map(meal => meal.id === m_id 
                ? mealProdBarSum(e.products, 'a_100')
                : mealProdBarSum(meal.products, 'a_100')
            ).reduce((acc, val) => acc + val, 0),

            r: prevState.meals.filter(meal => !meal.is_sport).map(meal => meal.id === m_id 
                ? mealProdBarSum(e.products, 'r_100')
                : mealProdBarSum(meal.products, 'r_100')
            ).reduce((acc, val) => acc + val, 0),

            kcal: kcal(
                prevState.meals.filter(meal => !meal.is_sport).map(meal => meal.id === m_id ? mealProdBarSum(e.products, 'b_100') : mealProdBarSum(meal.products, 'b_100')).reduce((acc, val) => acc + val, 0),
                prevState.meals.filter(meal => !meal.is_sport).map(meal => meal.id === m_id ? mealProdBarSum(e.products, 'a_100') : mealProdBarSum(meal.products, 'a_100')).reduce((acc, val) => acc + val, 0),
                prevState.meals.filter(meal => !meal.is_sport).map(meal => meal.id === m_id ? mealProdBarSum(e.products, 'r_100') : mealProdBarSum(meal.products, 'r_100')).reduce((acc, val) => acc + val, 0)
            ),

            meals: prevState.meals.map(meal => meal.id === m_id ? {
                ...meal,
                title: e.label,
                logic: e.logic,
                intolerance: e.intolerance,
                b: mealProdBarSum(e.products, 'b_100'),
                a: mealProdBarSum(e.products, 'a_100'),
                r: mealProdBarSum(e.products, 'r_100'),
                kcal: kcal(
                    mealProdBarSum(e.products, 'b_100'),
                    mealProdBarSum(e.products, 'a_100'),
                    mealProdBarSum(e.products, 'r_100')
                ),
                products: e.products
            } : meal)
        }));
    };

    const handleProdChange = (e, m_id, p_id) => {
        onPlanUpdate('update-product', { prod: e, meal_id: m_id, prod_id: p_id });

        setCurrentPlan(prevState => ({
            ...prevState,
            b: prevState.meals.filter(meal => !meal.is_sport).map(meal => meal.products.map(prod => prod.id === p_id ? bar(e.b_100, prod.grams) : bar(prod.b_100, prod.grams)).reduce((acc, val) => acc + val, 0)).reduce((acc, val) => acc + val, 0),
            a: prevState.meals.filter(meal => !meal.is_sport).map(meal => meal.products.map(prod => prod.id === p_id ? bar(e.a_100, prod.grams) : bar(prod.a_100, prod.grams)).reduce((acc, val) => acc + val, 0)).reduce((acc, val) => acc + val, 0),
            r: prevState.meals.filter(meal => !meal.is_sport).map(meal => meal.products.map(prod => prod.id === p_id ? bar(e.r_100, prod.grams) : bar(prod.r_100, prod.grams)).reduce((acc, val) => acc + val, 0)).reduce((acc, val) => acc + val, 0),

            kcal: kcal(
                prevState.meals.filter(meal => !meal.is_sport).map(meal => meal.products.map(prod => prod.id === p_id ? bar(e.b_100, prod.grams) : bar(prod.b_100, prod.grams)).reduce((acc, val) => acc + val, 0)).reduce((acc, val) => acc + val, 0),
                prevState.meals.filter(meal => !meal.is_sport).map(meal => meal.products.map(prod => prod.id === p_id ? bar(e.a_100, prod.grams) : bar(prod.a_100, prod.grams)).reduce((acc, val) => acc + val, 0)).reduce((acc, val) => acc + val, 0),
                prevState.meals.filter(meal => !meal.is_sport).map(meal => meal.products.map(prod => prod.id === p_id ? bar(e.r_100, prod.grams) : bar(prod.r_100, prod.grams)).reduce((acc, val) => acc + val, 0)).reduce((acc, val) => acc + val, 0)
            ),

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
                    
                kcal: kcal(
                    meal.products.map(prod => prod.id === p_id 
                        ? bar(e.b_100, prod.grams)
                        : bar(prod.b_100, prod.grams)).reduce((acc, val) => acc + val, 0),
                    meal.products.map(prod => prod.id === p_id 
                        ? bar(e.a_100, prod.grams)
                        : bar(prod.a_100, prod.grams)).reduce((acc, val) => acc + val, 0),
                    meal.products.map(prod => prod.id === p_id 
                        ? bar(e.r_100, prod.grams)
                        : bar(prod.r_100, prod.grams)).reduce((acc, val) => acc + val, 0)
                ),

                products: meal.products.map(prod => prod.id === p_id ? {
                    ...prod,
                    title: e.label,
                    category: e.category,
                    sub_category: e.sub_category,
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

            kcal: kcal(
                prevState.meals.filter(meal => !meal.is_sport).map(meal => meal.products.map(prod => (meal.id === m_id && prod.id === p_id) ? bar(prod.b_100, e.target.value) : bar(prod.b_100, prod.grams)).reduce((acc, val) => acc + val, 0)).reduce((acc, val) => acc + val, 0),
                prevState.meals.filter(meal => !meal.is_sport).map(meal => meal.products.map(prod => (meal.id === m_id && prod.id === p_id) ? bar(prod.a_100, e.target.value) : bar(prod.a_100, prod.grams)).reduce((acc, val) => acc + val, 0)).reduce((acc, val) => acc + val, 0),
                prevState.meals.filter(meal => !meal.is_sport).map(meal => meal.products.map(prod => (meal.id === m_id && prod.id === p_id) ? bar(prod.r_100, e.target.value) : bar(prod.r_100, prod.grams)).reduce((acc, val) => acc + val, 0)).reduce((acc, val) => acc + val, 0)
            ),

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

                kcal: kcal(
                    meal.products.map(prod => prod.id === p_id ? bar(prod.b_100, +e.target.value) : bar(prod.b_100, prod.grams)).reduce((acc, val) => acc + val, 0),
                    meal.products.map(prod => prod.id === p_id ? bar(prod.a_100, +e.target.value) : bar(prod.a_100, prod.grams)).reduce((acc, val) => acc + val, 0),
                    meal.products.map(prod => prod.id === p_id ? bar(prod.r_100, +e.target.value) : bar(prod.r_100, prod.grams)).reduce((acc, val) => acc + val, 0)
                ),

                products: meal.products.map(prod => prod.id === p_id ? {
                    ...prod,
                    grams: +e.target.value.replace(',', '.')
                } : prod)
            } : meal)
        }));
    };

    const handleProdDelete = (e, m_id, p_id) => {
        onPlanUpdate('delete-product', {meal_id: m_id, prod_id: p_id});

        e.target.closest(`.${styles.prod}`).classList.add(styles.deletedProd);
        setTimeout(() => {
            setCurrentPlan(prevState => ({
                ...prevState,
                
                b: prevState.meals.map(meal => meal.id === m_id
                    ? mealProdBarSum(meal.products.filter(prod => prod.id !== p_id), 'b_100')
                    : mealProdBarSum(meal.products, 'b_100')
                ).reduce((acc, val) => acc + val, 0),

                a: prevState.meals.map(meal => meal.id === m_id
                    ? mealProdBarSum(meal.products.filter(prod => prod.id !== p_id), 'a_100')
                    : mealProdBarSum(meal.products, 'a_100')
                ).reduce((acc, val) => acc + val, 0),

                r: prevState.meals.map(meal => meal.id === m_id
                    ? mealProdBarSum(meal.products.filter(prod => prod.id !== p_id), 'r_100')
                    : mealProdBarSum(meal.products, 'r_100')
                ).reduce((acc, val) => acc + val, 0),   
                kcal: kcal(
                    prevState.meals.map(meal => meal.id === m_id
                        ? mealProdBarSum(meal.products.filter(prod => prod.id !== p_id), 'b_100')
                        : mealProdBarSum(meal.products, 'b_100')
                    ).reduce((acc, val) => acc + val, 0),

                    prevState.meals.map(meal => meal.id === m_id
                        ? mealProdBarSum(meal.products.filter(prod => prod.id !== p_id), 'a_100')
                        : mealProdBarSum(meal.products, 'a_100')
                    ).reduce((acc, val) => acc + val, 0),

                    prevState.meals.map(meal => meal.id === m_id
                        ? mealProdBarSum(meal.products.filter(prod => prod.id !== p_id), 'r_100')
                        : mealProdBarSum(meal.products, 'r_100')
                    ).reduce((acc, val) => acc + val, 0)
                ),         
                meals: prevState.meals.map(meal => meal.id === m_id ? {
                    ...meal,
                    b: mealProdBarSum(meal.products.filter(prod => prod.id !== p_id), 'b_100'),
                    a: mealProdBarSum(meal.products.filter(prod => prod.id !== p_id), 'a_100'),
                    r: mealProdBarSum(meal.products.filter(prod => prod.id !== p_id), 'r_100'),

                    kcal: kcal(
                        mealProdBarSum(meal.products.filter(prod => prod.id !== p_id), 'b_100'),
                        mealProdBarSum(meal.products.filter(prod => prod.id !== p_id), 'a_100'),
                        mealProdBarSum(meal.products.filter(prod => prod.id !== p_id), 'r_100')
                    ),

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
                    onPlanUpdate('delete-plan', {});
                }
            }}>
                <DeleteBin_icon icon={styles.planDeleteBtn} />
            </span>
            <div className={styles.title}>
                <input type='text' 
                    value={currentPlan.title}
                    name='title'
                    onBlur={e => {
                        onPlanUpdate('update-plan-title', {title: e.target.value});
                    }}
                    onChange={e => setCurrentPlan(prevState => ({...prevState, title: e.target.value}))}
                />
                <div className={styles.planBar}>
                    <span>B {currentPlan.b?.toFixed(0)}</span>
                    <span>A {currentPlan.a?.toFixed(0)}</span>
                    <span>R {currentPlan.r?.toFixed(0)}</span>
                    <span>Kcal {currentPlan.kcal?.toFixed(0)}</span>
                </div>
            </div>

            {currentPlan.meals.map(meal => 
                !meal.is_sport ? <div key={meal.id} className={styles.meal}>
                    <div className={styles.mealLeft}>
                        <input 
                            type='text' 
                            name='meal_time'
                            value={meal.meal_time} 
                            onChange={(e) => setCurrentPlan(prevState => ({
                                ...prevState,
                                meals: [...prevState.meals.map(m => m.id === meal.id ? {...m, meal_time: e.target.value} : m)]}))
                            }
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
                                        onChange={e => handleGramsChange(e, meal.id, prod.id)}
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
                        onChange={(e) => setCurrentPlan(prevState => ({
                            ...prevState,
                            meals: [...prevState.meals.map(m => m.id === meal.id ? {...m, meal_time: e.target.value} : m)]}))
                        }
                        onBlur={e => onPlanUpdate('update-meal-time', {meal_time: e.target.value, meal_id: meal.id})} 
                    />
                </div>
            )}
        </div>
    );
};

export default EditUserPlan;