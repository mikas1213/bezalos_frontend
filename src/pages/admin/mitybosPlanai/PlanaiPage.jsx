import { useState } from 'react';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';
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

const PlanaiPage = () => {

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
    
    const axiosPrivate = useAxiosPrivate();
    const handlePlanAdd = async () => {
        try {
            const { data: {id} } = await axiosPrivate.post('admin/plans');
            setPlans(prevState => ([{id, title: '-'}, ...prevState]));
        } catch (err) {
            toast.error('Klaida: \n'+err.response.data.message);
        }
    };

    const handlePlanEdit = async (plan_id, column, value) => {
        try {
            await axiosPrivate.patch('admin/plans', {plan_id, column, value})
        } catch (err) {
            toast.error('Klaida: \n'+err.response.data.message);
        }
    };

    const handlePlanDelete = async (id) => {
        const confirm = window.confirm('Trinti planą?');
        try {
            if(confirm) {
                setPlans(prevState => [...prevState.filter(plan => plan.id !== id)]);
                await axiosPrivate.delete('admin/plans', {data: {id}});
            }
        } catch (err) {
            toast.error('Klaida! \n'+err.response.data.message);
        }
    };

    const handleAddPlanMeal = async (plan_id, meal_id, is_sport) => {
        
        try {
            await axiosPrivate.post('admin/plans/plan/meals', {plan_id, meal_id, is_sport});
        } catch (err) {
            toast.error('Klaida!\n'+err.response.data.message);
        }
    };


    return (
        <>
            <Navbar>
                <AddNewBtn label='Naujas planas' Icon={ImPlus} fontSize='1rem' onHandleClick={handlePlanAdd} />
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
                />)}
            </Wrapper>
        </>
    );
};

export default PlanaiPage;