import { useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
import Navbar from '../../../components/admin/nutrition_plans/Navbar';
import { AddNewBtn } from '../../../components/admin/nutrition_plans/AddNewBtn';
import Wrapper from './Wrapper';
import Meal from '../../../components/admin/nutrition_plans/meals/Meal';
import { RadioFilters } from '../../../components/admin/nutrition_plans/RadioFilters';
import { CheckBoxFilters } from '../../../components/admin/nutrition_plans/CheckBoxFilters';
import { Divider } from '../../../components/admin/nutrition_plans/Divider';
import SearchInput from '../../../components/admin/nutrition_plans/SearchInput';
import { bar } from '../../../utils/calculationsHelpers';
import { LiaPizzaSliceSolid } from 'react-icons/lia';
import toast from 'react-hot-toast';
import { useMeals } from '../../../hooks/nutrition_plans_hooks/useMeals';

const MealsPage = () => {
    const axiosPrivate = useAxiosPrivate();
    const [searchString, setSearchString] = useState('');
    const [logicFilter, setLogicFilter] = useState('');
    const [intoleranceFilter, setIntoleranceFilter] = useState('');

    const logicOptions = [
        {value: 'A+B', label: 'A+B', color: '#30c040'},
        {value: 'B+R', label: 'B+R', color: '#245D6B'},
        {value: 'A+R', label: 'A+R', color: '#ec9f11'}
    ];

    const intoleranceOptions = [
        {value: false, label: 'be glitimo', name: 'is_gluten'},
        {value: false, label: 'be laktozės', name: 'is_lactose'}
    ];

    let filters = {};
    filters = logicFilter ? {...filters, logic: logicFilter} : filters;
    filters = intoleranceFilter && intoleranceFilter.is_gluten ? {...filters, is_gluten: intoleranceFilter.is_gluten} : filters;
    filters = intoleranceFilter && intoleranceFilter.is_lactose ? {...filters, is_lactose: intoleranceFilter.is_lactose} : filters;
    filters = searchString ? {...filters, search: searchString} : filters;
    
    const { meals, setMeals, isLoading } = useMeals(filters);

    const handleMealAdd = async () => {
        try {
            const { data: { new_meal_id } } = await axiosPrivate.post('admin/plans/meals');
            setMeals(prevState => [{
                id: new_meal_id,
                logic: '-',
                products: [],
                title: '-',
                b: 0, a: 0, r: 0
            }, ...prevState]);
            
        } catch (err) {
            toast.error('Valgis neprisidėjo!');
        }
    };

    const handleMealUpdate = async (meal_id, column, value) => {
        setMeals(prevMeals => prevMeals.map(meal => meal.id === meal_id 
            ? {...meal, [column]: value} 
            : meal
        ));
        try {
            await axiosPrivate.patch('admin/plans/meals', {meal_id, column, value});
        } catch (err) {
            console.log(err.message);
        }
    }
    
    const handleMealDelete = async meal_id => {
        try {
    
            await axiosPrivate.delete('admin/plans/meals', {data: {meal_id}});
            setMeals(prevState => ([
                ...prevState.filter(meal => meal.id !== meal_id)
            ]));
        } catch (err) {
            console.log(err.message);
        }
    };

    const handleMealProductAdd = async (new_prod) => {
        try {
            const {data: {data: {id: new_prod_id }}} = await axiosPrivate.post('admin/plans/meal/product', new_prod);

            setMeals(prevMeals => ([
                ...prevMeals.map(meal => meal.id === new_prod.meal_id ? {
                    ...meal,
                    products: [...meal.products, {
                        id: new_prod_id,
                        product_id: new_prod.value, 
                        meal_id: new_prod.meal_id,
                        title: new_prod.label,
                        b: 0, b_100: new_prod.b_100, 
                        a: 0, a_100: new_prod.a_100, 
                        r: 0, r_100: new_prod.r_100, 
                        grams: '',
                        isGramsFocus: true
                    }],
                } : meal)
            ]));

        } catch (err) {
            toast.error('Klaida!\nProduktas nebuvo pridėtas');
        }
    };
    
    const handleMealProductEdit = async (e_type, id, meal_id, title, prod_id, grams, b_100, a_100, r_100) => {
        try {
            if(!isNaN(grams)) {
                const sum = (acc, val) => acc + val;
                setMeals(prevMeals => ([
                    ...prevMeals.map(meal => meal.id === meal_id ? {
                        ...meal,
                        products: meal.products.map(prod => prod.id === id ? {
                            ...prod, grams, title, product_id: prod_id,
                            b_100, b: bar(b_100, grams), 
                            a_100, a: bar(a_100, grams),
                            r_100, r: bar(r_100, grams),
                        } : prod),
                        b: meal.products.map(prod => prod.id === id ? bar(b_100, grams) : prod.b).reduce(sum, 0),
                        a: meal.products.map(prod => prod.id === id ? bar(a_100, grams) : prod.a).reduce(sum, 0),
                        r: meal.products.map(prod => prod.id === id ? bar(r_100, grams) : prod.r).reduce(sum, 0),
                    } : meal)
                ]));   

                if(e_type !== 'change') {
                    await axiosPrivate.patch('admin/plans/meal/product', {id, prod_id, grams});
                }
            }
        } catch (err) {
            console.log(err.message);
        }
    };

    const handleMealProductDelete = async (id, meal_id) => {

        try {
            const sum = (acc, val) => acc + val;
            setMeals(prevMeals => ([
                ...prevMeals.map(meal => meal.id === meal_id ? {
                    ...meal,
                    products: meal.products.filter(prod => prod.id !== id),
                    b: meal.products.filter(prod => prod.id !== id).map(prod => prod.b).reduce(sum, 0),
                    a: meal.products.filter(prod => prod.id !== id).map(prod => prod.a).reduce(sum, 0),
                    r: meal.products.filter(prod => prod.id !== id).map(prod => prod.r).reduce(sum, 0),
                } : meal)
            ]));
            await axiosPrivate.delete('admin/plans/meal/product', {data: {id}});
        } catch (err) {
            toast.error('kažkas negerai 🤔');
        }
    };



    return (
        <>
            <Navbar>
                <AddNewBtn label='Naujas valgis' Icon={LiaPizzaSliceSolid} fontSize='1.4rem' onHandleClick={handleMealAdd} />
                <Divider />
                <RadioFilters options={logicOptions} setFilter={logicFilter} onSetFilter={setLogicFilter} />
                <Divider />
                <CheckBoxFilters options={intoleranceOptions} onSetFilter={setIntoleranceFilter} grow={1} />
                <SearchInput onChangeValue={setSearchString} />
            </Navbar>

            <Wrapper layout='meals'>
                {!isLoading && meals.map(meal => <Meal 
                    key={meal.id} 
                    meal={meal}
                    handleMealUpdate={handleMealUpdate} 
                    handleMealDelete={handleMealDelete}
                    handleMealProductAdd={handleMealProductAdd}
                    handleMealProductEdit={handleMealProductEdit}
                    handleMealProductDelete={handleMealProductDelete}
                />)}
            </Wrapper>
        </>
    );
};

export default MealsPage;