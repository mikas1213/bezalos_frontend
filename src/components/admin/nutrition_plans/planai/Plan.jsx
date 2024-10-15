import styles from './Plan.module.css';
import { useState } from 'react';
import useAxiosPrivate from '../../../../hooks/useAxiosPrivate';
import { DeleteX_icon } from '../../../../svg/icons';
import { LuVegan } from 'react-icons/lu';
import { SlSettings } from 'react-icons/sl';
import { ImPlus } from 'react-icons/im';
import { MdOutlineEditNote } from 'react-icons/md';
import { default as AddPlanSelect } from 'react-select/async';
import MealItem, { SportItem } from './MealItem';
import { kcal } from '../../../../utils/calculationsHelpers';
import { useNavigate } from 'react-router-dom';

const customAddProdStyles = {
    container: (provider) => ({
        ...provider,
        width: '100%'
    }),
    control: (provider, state) => ({
        ...provider,
        '&:hover': { cursor: 'pointer', 
            borderColor: !state.isFocused ? '#ccc' : '#245D6B', 
            boxShadow: !state.isFocused ? '#ccc' : '#245D6B'
        },
        boxShadow: state.isFocused ? '#245D6B' : '#ddd',
        borderColor: state.isFocused ? '#245D6B' : '#ddd',
        fontSize: 12,
        minHeight: 0,
        height: 28
    }),
    valueContainer: (provider) => ({
        ...provider,
        minHeight: 0,
        height: 28
    }),
    singleValue: (provider) =>({
        ...provider,
        color: '#999',
        minHeight: 0
    }),
    input: (provider) => ({
        ...provider,
        minHeight: 0
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

const Plan = ({ plan, handlePlanEdit, handlePlanDelete, handleAddPlanMeal, localStoragePlanId }) => {
    console.log(localStorage.getItem('localPlan'), JSON.stringify(plan))
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    const [title, setTitle] = useState(plan.title);
    const [addMeal, setAddMeal] = useState({
        label: 'ieškoti...', value: 'ieškoti'
    });
    const [isMenuOpen, setIsMenuOpen] = useState('');

    const loadMealsOptions = (inputValue, callback) => {
        
        if(inputValue && inputValue.length > 2) {
            axiosPrivate.get(`/admin/plans/meals?search=${inputValue}`).then(response => {
                const options = response.data.map(meal => ({
                    label: meal.title,
                    value: meal.id,
                    logic: meal.logic,
                    products: meal.products
                }));

                callback(options);
            }).catch(error => {
                console.error('Error fetching data:', error);
                callback([]);
            });
        }
    };
    
    const onAddNewMeal = e => {
        setAddMeal(e);
        handleAddPlanMeal(plan.id, e, false);
    };

    const onPlanDelete = (e, plan_id) => {
        const confirm = window.confirm('Trinti planą?');
        if(confirm) {
            e.target.closest('.plan').classList.add(styles.deleted)
            setTimeout(() => {
                handlePlanDelete(plan_id);
            }, 500);
        }
    };

    return (
        <div className={`${styles.plan} plan`}>
            <div className={styles.planHeader}>
                <form onSubmit={e => {
                    e.preventDefault();
                    e.target.querySelector('input').blur();
                }}>
                    <input 
                        type='text' 
                        name='title' 
                        value={title} 
                        onChange={e => setTitle(e.target.value)} 
                        onBlur={e => handlePlanEdit(plan.id, e.target.name, e.target.value)} 
                    />
                </form>
                {/* {localStoragePlanId === plan.id && <span className={styles.editedPlan}>
                    <MdOutlineEditNote />    
                </span>} */}
                <span 
                    style={{display: 'flex'}}
                    onClick={() => navigate(`/admin/planai/${plan.id}`, { replace: false })}
                >
                    <SlSettings className={styles.editIcon} />
                </span>
                <span style={{display: 'flex'}} 
                    onClick={() => handlePlanEdit(plan.id, 'is_vegetarian', !plan.is_vegetarian)}>
                    <LuVegan className={`${styles.vegaIcon} ${plan.is_vegetarian ? styles['vega'] : ''}`} />
                </span>
                <span 
                    style={{display: 'flex'}} 
                    onClick={e => onPlanDelete(e, plan.id)}><DeleteX_icon icon={styles.deletePlanIcon} />
                </span>
            </div>

            {plan.meals?.map(meal => (meal.meal_id ? <MealItem 
                key={meal.id} 
                meal={meal} 
            /> : <SportItem key={meal.id} sport={meal} />) )}

            <div className={styles.actions}>
                <AddPlanSelect
                    components={{ DropdownIndicator: null, IndicatorSeparator: null, LoadingIndicator: null }}
                    cacheOptions
                    menuPosition='fixed'
                    isSearchable={true}
                    loadOptions={loadMealsOptions} 
                    defaultOptions={false}
                    loadingMessage={() => null}
                    menuIsOpen={isMenuOpen.length > 2}
                    styles={customAddProdStyles}
                    onInputChange={setIsMenuOpen}
                    onChange={onAddNewMeal}
                    value={addMeal}
                />

                <button 
                    className={styles.addSportBtn} 
                    onClick={() => handleAddPlanMeal(plan.id, {meal_id: null}, true)}
                >
                    <ImPlus className={styles.addSportIcon}/>
                    sportas
                </button>
            </div>
            <div className={styles.bar}>
                <div><span>B</span><span>{plan.b.toFixed(0)}</span></div>
                <div><span>A</span><span>{plan.a.toFixed(0)}</span></div>
                <div><span>R</span><span>{plan.r.toFixed(0)}</span></div>
                <div><span>Kcal</span><span>{kcal(plan.b, plan.a, plan.r).toFixed(0)}</span></div>
            </div>
        </div>
    );
};

export default Plan;


