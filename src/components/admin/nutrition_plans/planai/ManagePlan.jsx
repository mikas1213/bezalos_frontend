import styles from './ManagePlan.module.css';
import { useState, useEffect } from 'react';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import { default as MealSelect } from 'react-select/async';
import { default as ProdSelect } from 'react-select/async';
import { kcal } from '../../../../utils/calculationsHelpers';
import { LuWheatOff, LuMilkOff } from 'react-icons/lu';


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

const ManagePlan = ({ plan, setPlan }) => {
    const axiosPrivate = useAxiosPrivate();
    const [currentPlan, setCurrentPlan] = useState(plan);
    
    const [isMealMenuOpen, setIsMealMenuOpen] = useState('');
    const loadMealsOptions = (inputValue, callback) => {
        axiosPrivate.get(`/admin/plans/meals?search=${inputValue}`).then(response => {
            const options = response.data.map(meal => ({
                label: meal.title,
                value: meal.id,
                logic: meal.logic,
                // products: meal.products
            }));

            callback(options);
        }).catch(error => {
            console.error('Error fetching data:', error);
            callback([]);
        });
    };
    const loadProdOptions = (inputValue, callback) => {
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

    const [formData, setFormData] = useState({});
    // const handleInputChange = (e, e2) => {
    //     console.log(e)
    //     const { name } = e2;
        
    //     setFormData({
    //       ...formData,
    //       [name]: e
    //     });
    // };
    
    const handleSelectChange = (e, m_id) => {
        console.log(e, m_id);
        setFormData(e);
        // setCurrentPlan();
        // setPlan(prevState => ({
        //     ...prevState, 
        //     meals: prevState.meals.map(m => 
        //         m.meal_id === e.value ? {
        //         ...m,
        //         title: e.label,
        //         meal_id: e.value
        //     } : m)
        // }))
    };
    // useEffect(() => {
        // const [value, setValue] = useState(plan);
        // const savedValue = localStorage.getItem('plan');
        // if (savedValue) {
        //     setValue(savedValue);
        // }
        
    // }, []);

    // useEffect(() => {
    //     localStorage.setItem('plan', JSON.stringify(value));
    // }, [value]);

    // const handleChange = (event) => {
    //     setValue(event.target.value);
    // };

    return (
        <div className={styles.plan}>
            <div className={styles.title}>
                <input type='text' value={currentPlan.title} onChange={e => setCurrentPlan(prevState => ({...prevState, title: e.target.value}))}/>
                <div className={styles.planBar}>
                    <span>B {currentPlan.b.toFixed(0)}</span>
                    <span>A {currentPlan.a.toFixed(0)}</span>
                    <span>R {currentPlan.r.toFixed(0)}</span>
                    <span>Kcal {kcal(currentPlan.b, currentPlan.a, currentPlan.r).toFixed(0)}</span>
                </div>
            </div>

            {currentPlan.meals.map((meal, i) => 
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
                                    loadOptions={loadMealsOptions} 
                                    defaultOptions={false}
                                    loadingMessage={() => null}
                                    styles={mealStyles}
                                    menuIsOpen={isMealMenuOpen.length > 2}
                                    onInputChange={setIsMealMenuOpen}
                                    onChange={(e) => handleSelectChange(e, meal.meal_id)}
                                    defaultInputValue={meal.title}
                                    // name={`meal_${i}`}
                                    value={formData}
                                />

                                {meal.intolerance === 'gluten_free' && <LuWheatOff className={styles.intolerance}/>}
                                {meal.intolerance === 'lactose_free' && <LuMilkOff className={styles.intolerance}/>}

                            </div>

                            <div className={styles.bar}>
                                <span>B {meal.b.toFixed(0)}</span>
                                <span>A {meal.a.toFixed(0)}</span>
                                <span>R {meal.r.toFixed(0)}</span>
                                <span>Kcal {kcal(meal.b, meal.a, meal.r).toFixed(0)}</span>
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
                                    loadOptions={loadProdOptions}
                                    // defaultValue={{value: prod.id, label: prod.title}}
                                    value={{value: prod.id ,label: prod.title}}
                                />
                                <input type='text' value={prod.grams+' g'} />
                            </div>)}
                        </div>
                    </div>
                </div>
            :
                <div key={meal.id} className={styles.sport}>
                    <span>SPORTAS</span>
                    <input type="text" value={meal.meal_time}/>
                </div>
            )}
            <button onClick={() => setPlan(currentPlan)}>Keist</button>          
        </div>
    );
};

export default ManagePlan;

// const MealCard = ({ children }) => {
//     return (
//         <div className={styles.mealCard}>
//             <div className={styles.mealCardHeader}>
//                 {children}
//             </div>
//         </div>
//     );
// };