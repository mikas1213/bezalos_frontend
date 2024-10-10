import { useState, useEffect } from 'react';
import useAxiosPrivate from '../useAxiosPrivate';
import toast from 'react-hot-toast';

export const usePlans = (filters) => {
    const [plans, setPlans] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const axiosPrivate = useAxiosPrivate();
    const query = Object.keys(filters).length ? '?' + new URLSearchParams(filters).toString() : '';
    
    useEffect(() => {
        const getData = async (signal) => {
            try {
                const { data } = await axiosPrivate.get(`admin/plans${query}`, { signal });
                const calculatedPlans = data.map(plan => ({
                    ...plan, 
                    b: plan.meals.filter(meal => !meal.is_sport).map(meal => meal.b).reduce((acc, val) => acc + val, 0),
                    a: plan.meals.filter(meal => !meal.is_sport).map(meal => meal.a).reduce((acc, val) => acc + val, 0),
                    r: plan.meals.filter(meal => !meal.is_sport).map(meal => meal.r).reduce((acc, val) => acc + val, 0)
                }));
                
                setPlans([...calculatedPlans]);
                setIsLoading(false);
            } catch (err) {
                toast.error('Klaida: \n'+err.response.data.message);
            }
        };
        const controller = new AbortController();
        getData(controller.signal);
        return () => controller.abort();

    }, [axiosPrivate, query]);
    return { plans, setPlans, isLoading };
};