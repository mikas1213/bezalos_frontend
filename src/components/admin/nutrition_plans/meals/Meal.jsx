import styles from './Meal.module.css';
import ProdItem from './ProdItem';
import Select from 'react-select';
import { useState, useRef } from 'react';
import Checkbox from './Checkbox';
import { kcal } from '../../../../utils/calculationsHelpers';
import { DeleteX_icon } from '../../../../svg/icons';
import { GoPlus } from 'react-icons/go';

const Meal = ({ 
    meal, 
    handleMealUpdate, 
    handleMealDelete, 
    handleMealProductAdd,
    handleMealProductEdit,
    handleMealProductDelete
}) => {
    let color = '';
    const form = useRef(null);
    const deletedMealRef = useRef(null);

    switch(meal.logic) {
        case 'A+B':
            color = '#30c040';
            break;
        case 'B+R':
            color = '#245D6B';
            break;
        case 'A+R':
            color = '#ec9f11';
            break;
        default:
            color = '';
    }

    const options = [
        {value: 'A+B', label: 'A+B', name: 'logic'},
        {value: 'B+R', label: 'B+R', name: 'logic'},
        {value: 'A+R', label: 'A+R', name: 'logic'}
    ];
    
    const customStyles = {
        control: (provided) => ({
            ...provided,
            '&:hover': { cursor: 'pointer', },
            borderWidth: 2,
            boxShadow: color,
            borderColor: color,
            fontSize: 16,
            fontWeight: 600,
            minWidth: 50,
            minHeight: 0,
            height: 28,
        }),
        valueContainer: (provided) => ({
            ...provided,
            padding: 0,
        }),
        singleValue: (provided) =>({
            ...provided,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color,
        }),
        menu: (provided) => ({
            ...provided,
            padding: 0,
            marginTop: 8,
            boxShadow: '0 2px 10px rgba(0,0,0,.2)',
        }),
        option: (provider, state) => ({
            ...provider,
            fontSize: '0.9rem',
            // fontWeight: 500,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 30,

            // margin: 0, 
            // padding: 5,
            backgroundColor: state.isSelected ? color : state.isFocused ? '#245D6B11' : '#fff',
            // color: state.isSelected ? '#fff' : state.isFocused ? '#245D6B' : '#777',
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: state.isSelected ? color : '#245D6B11',
                color: state.isSelected ? '#fff' : '#333',
            }
        })
    }

    const [mealData, setMealData] = useState({
        logic: { value: meal.logic, label: meal.logic, name: 'logic'},
        is_gluten: meal.is_gluten,
        is_lactose: meal.is_lactose,
        title: meal.title
    });
    
    const onChangeValue = e => {
        const name = e?.name || e.target.name;
        switch(name) {
            case 'logic':
                setMealData(prevState => ({...prevState, logic: e}));
                handleMealUpdate(meal.id, name, e.value);
                break;
            case 'is_gluten':
            case 'is_lactose':
                setMealData(prevState => ({...prevState, [e.target.name]: !prevState[e.target.name]}));
                handleMealUpdate(meal.id, name, !mealData[name]);
                break;
            case 'title':
                setMealData(prevState => ({...prevState, title: e.target.value}));
                break;
            default:
                return;
        }
    }
    const onDeleteMeal = meal_id => {
        const confirm = window.confirm('Trinti?');
        if(confirm) {
            setTimeout(() => {
                handleMealDelete(meal_id);
            }, 500);
            deletedMealRef.current.classList.add(styles.deleted);
        }
    };
    
    return (
        <div ref={deletedMealRef} className={styles.meal}>
            <div className={styles.mealHeader}>
                <div className={styles.mealParams}>
                    <Select 
                        isSearchable={false}
                        components={{ DropdownIndicator: null, IndicatorSeparator: null }}
                        styles={customStyles}
                        defaultOptions={[mealData.logic]}
                        name='logic'
                        options={options}
                        onChange={onChangeValue}
                        value={mealData.logic}
                    />

                    <Checkbox id={meal.id} label='be glitimo' value={mealData.is_gluten} name='is_gluten' onChangeValue={onChangeValue} />
                    <Checkbox id={meal.id} label='be laktozės' value={mealData.is_lactose} name='is_lactose' onChangeValue={onChangeValue} />
                    <span onClick={() => onDeleteMeal(meal.id)}><DeleteX_icon icon={styles.icon} /></span>
                </div>
                <form className={styles.title} onSubmit={e => {
                    form.current.blur();
                    e.preventDefault();
                    // handleMealUpdate(meal.id, 'title', mealData.title);
                }}>
                    <input 
                        ref={form} 
                        type='text' 
                        name='title' 
                        value={mealData.title} 
                        onChange={onChangeValue} 
                        onBlur={e => handleMealUpdate(meal.id, e.target.name, e.target.value)} 
                    />
                </form>
            </div>

            <div className={styles.products}>
                {meal.products.map(prod => <ProdItem 
                    key={prod.id} 
                    prod={prod} 
                    handleMealProductEdit={handleMealProductEdit}
                    handleMealProductDelete={handleMealProductDelete}
                />)}
                 <div className={styles.addProduct}>
                    <span onClick={() => handleMealProductAdd(meal.id)}><GoPlus className={styles.icon}/></span>
                </div>
            </div>

            <div className={styles.bar}>
                <div>
                    <span>B</span>
                    <span>{Math.round(meal.b)} g</span>
                </div>
                <div>
                    <span>A</span>
                    <span>{Math.round(meal.a)} g</span>
                </div>
                <div>
                    <span>R</span>
                    <span>{Math.round(meal.r)} g</span>
                </div>
                <div className={styles.kcal}>
                    <span>Kcal</span>
                    <span>{Math.round(kcal(meal.b, meal.a, meal.r))} kcal</span>
                </div>
            </div>
        </div>
    );
};

export default Meal;