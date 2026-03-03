import { axiosPrivate } from '../../api/axios';
import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';

export const useManagePlan = (plan_id) => {
    
    const [plan, setPlan] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const getData = useCallback( async () => {
        try {
            const { data } = await axiosPrivate.get(`admin/plans/${plan_id}`);
            const currentPlan = {
                ...data, 
                b: data.meals.filter(meal => !meal.is_sport).map(meal => meal.b).reduce((acc, val) => acc + val, 0),
                a: data.meals.filter(meal => !meal.is_sport).map(meal => meal.a).reduce((acc, val) => acc + val, 0),
                r: data.meals.filter(meal => !meal.is_sport).map(meal => meal.r).reduce((acc, val) => acc + val, 0),
                kcal: data.meals.filter(meal => !meal.is_sport).map(meal => meal.kcal).reduce((acc, val) => acc + val, 0)
            }
            setPlan(currentPlan);
        } catch (err) {
            toast.error('Klaida, kažkas negerai..');
        } finally {
            setIsLoading(false);
        }
    }, [plan_id]);

    useEffect(() => {
        // const localPlan = JSON.parse(localStorage.getItem('localPlan'));
        // if(localPlan && localPlan.id == plan_id) {
        //     setPlan(localPlan);
        //     setIsLoading(false);
        // } else {
        //     getData();
        // }

        getData();
    }, [plan_id, getData]);

    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         localStorage.setItem('localPlan', JSON.stringify(plan));
    //     }

    // }, [plan]);

    return {plan, setPlan, isLoading};
};
