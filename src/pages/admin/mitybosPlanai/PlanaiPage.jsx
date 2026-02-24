import { useState } from 'react';
import { useAxiosPrivate } from '../../../features/auth';
import Navbar from '../../../components/admin/nutrition_plans/Navbar';
import Wrapper from './Wrapper';
import Plan from '../../../components/admin/nutrition_plans/planai/Plan';
import { AddNewBtn } from '../../../components/admin/nutrition_plans/AddNewBtn';
import { ImPlus } from 'react-icons/im';
import SearchInput from '../../../components/admin/nutrition_plans/SearchInput';
import { RadioFilters } from '../../../components/admin/nutrition_plans/RadioFilters';
import { CheckBoxFilters } from '../../../components/admin/nutrition_plans/CheckBoxFilters';
import { Divider } from '../../../components/admin/nutrition_plans/Divider';
import toast from 'react-hot-toast';
import { usePlans } from '../../../hooks/nutrition_plans_hooks/usePlans';
import { bar } from '../../../utils/calculationsHelpers';
import { useOutletContext } from 'react-router-dom';

const PlanaiPage = () => {

    const axiosPrivate = useAxiosPrivate();
    const { setStats } = useOutletContext();

    const localStoragePlanId = JSON.parse(localStorage.getItem('localPlan'))?.id;
    const mealsFiltersOptions = [
        {value: 4, label: '4 V'},
        {value: 5, label: '5 V'},
        {value: 6, label: '6 V'}
    ];
    const withoutMeatOptions = [
        {value: false, label: 'Be mėsos', name: 'is_vegetarian'}
    ];

    const [meal_count, setMealCount] = useState(null);
    const [is_vegetarian, setIsVegetarian] = useState(false);
    const [search, setSearch] = useState('');
    
    let filters = {};
    filters = meal_count ? {...filters, meal_count} : filters;
    filters = is_vegetarian && is_vegetarian.is_vegetarian ? {...filters, ...is_vegetarian} : filters;
    filters = search ? {...filters, search} : filters;

    const { plans, setPlans, isLoading } = usePlans(filters);

    const handlePlanAdd = async () => {
        try {
            const { data: {id} } = await axiosPrivate.post('admin/plans');
            setStats(prevState => ({ ...prevState, plans: prevState.plans + 1 }));
            setPlans(prevState => ([{
                id, 
                b: 0,
                a: 0,
                r: 0,
                kcal: 0,
                title: '-', 
                meals: [],
            }, ...prevState]));
        } catch (err) {
            toast.error('Klaida: \n'+err.response.data.message);
        }
    };

    const handlePlanEdit = async (plan_id, column, value) => {
        try {
            setPlans(prevPlans => ([...prevPlans.map(plan => plan.id === plan_id ? {...plan, [column]: value } : plan)]));
            await axiosPrivate.patch('admin/plans', {plan_id, column, value})
        } catch (err) {
            toast.error('Klaida: \n'+err.response.data.message);
        }
    };

    const handlePlanDelete = async (id) => {
        try {
            setPlans(prevState => [...prevState.filter(plan => plan.id !== id)]);
            setStats(prevState => ({ ...prevState, plans: prevState.plans - 1 }));
            await axiosPrivate.delete('admin/plans', {data: {id}});
        } catch (err) {
            toast.error('Klaida! \n'+err.response.data.message);
        }
    };

    const handleAddPlanMeal = async (plan_id, new_meal, is_sport) => {
        try {
            const { data: { id } } = await axiosPrivate.post('admin/plans/plan/meals', {plan_id, meal_id: new_meal.value, is_sport});
            setPlans(prevPlans => ([...prevPlans.map(plan => plan.id === plan_id ? {
                ...plan,
                ...(!is_sport && {b: [...plan.meals, {products: new_meal.products}].filter(meal => !meal.is_sport).map(meal => meal.products.map(prod => bar(prod.b_100, prod.grams)).reduce((acc, val) => acc + val, 0)).reduce((acc, val) => acc + val, 0)}),
                ...(!is_sport && {a: [...plan.meals, {products: new_meal.products}].filter(meal => !meal.is_sport).map(meal => meal.products.map(prod => bar(prod.a_100, prod.grams)).reduce((acc, val) => acc + val, 0)).reduce((acc, val) => acc + val, 0)}),
                ...(!is_sport && {r: [...plan.meals, {products: new_meal.products}].filter(meal => !meal.is_sport).map(meal => meal.products.map(prod => bar(prod.r_100, prod.grams)).reduce((acc, val) => acc + val, 0)).reduce((acc, val) => acc + val, 0)}),

                meals: [...plan.meals, (!is_sport ? {
                    id,
                    meal_id: new_meal.value,
                    logic: new_meal.logic,
                    title: new_meal.label,
                    products: new_meal.products,
                    b: new_meal.products.map(prod => bar(prod.b_100, prod.grams)).reduce((acc, val) => acc + val, 0),
                    a: new_meal.products.map(prod => bar(prod.a_100, prod.grams)).reduce((acc, val) => acc + val, 0),
                    r: new_meal.products.map(prod => bar(prod.r_100, prod.grams)).reduce((acc, val) => acc + val, 0)
                } : { 
                    id,
                    meal_id: new_meal.meal_id,
                    meal_time: '00:00',
                    products: []
                })]
            } : plan)]));
            
        } catch (err) {
            toast.error('Klaida!\n'+err.response.data.message);
        }
    };

    return (
        <>
            <Navbar>
                <AddNewBtn label='Sukurti šabloną' Icon={ImPlus} onHandleClick={handlePlanAdd} />
                <Divider />
                <RadioFilters 
                    options={mealsFiltersOptions} 
                    setFilter={meal_count}
                    onSetFilter={setMealCount}
                />   
                <Divider />
                <CheckBoxFilters grow={1} options={withoutMeatOptions} name='is_vegetarian' onSetFilter={setIsVegetarian} />
                <SearchInput onChangeValue={setSearch} />
            </Navbar>

            <Wrapper layout='plans'>
                {!isLoading && plans.map(plan => <Plan 
                    key={plan.id}
                    plan={plan}
                    handlePlanEdit={handlePlanEdit}
                    handlePlanDelete={handlePlanDelete}
                    handleAddPlanMeal={handleAddPlanMeal}
                    localStoragePlanId={localStoragePlanId}
                />)}
            </Wrapper>
        </>
    );
};

export default PlanaiPage;