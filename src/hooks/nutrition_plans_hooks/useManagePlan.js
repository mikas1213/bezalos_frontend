import useAxiosPrivate from '../useAxiosPrivate';
import { useState, useEffect } from 'react';

export const useManagePlan = (plan_id) => {
    const axiosPrivate = useAxiosPrivate();
    const [plan, setPlan] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const plan = JSON.parse(localStorage.getItem('plan'))
        const getData = async () => {
            const { data } = await axiosPrivate.get(`admin/plans/${plan_id}`);
            const currentPlan = {
                ...data, 
                b: data.meals.filter(meal => !meal.is_sport).map(meal => meal.b).reduce((acc, val) => acc + val, 0),
                a: data.meals.filter(meal => !meal.is_sport).map(meal => meal.a).reduce((acc, val) => acc + val, 0),
                r: data.meals.filter(meal => !meal.is_sport).map(meal => meal.r).reduce((acc, val) => acc + val, 0)
            }
            setPlan(() => !!plan && plan.id == plan_id ? plan : currentPlan);
            setIsLoading(false);
        };
        getData();
    }, [axiosPrivate, plan_id]);

    useEffect(() => {
        localStorage.setItem('plan', JSON.stringify(plan));
    }, [plan, setPlan]);

    return {plan, setPlan, isLoading};
};
