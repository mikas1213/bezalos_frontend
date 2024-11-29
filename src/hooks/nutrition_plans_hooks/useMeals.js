// import { useState, useEffect } from 'react';
// import useAxiosPrivate from '../useAxiosPrivate';
// import { bar } from '../../utils/calculationsHelpers';
// import toast from 'react-hot-toast';

// export const useMeals = (filters) => {
//     const [meals, setMeals] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const axiosPrivate = useAxiosPrivate();
//     let query = Object.keys(filters).length ? '?' + new URLSearchParams(filters).toString() : '';

//     useEffect(() => {
//         const getData = async (signal) => {
//             try {                
//                 const sum = (acc, val) => acc + val;
//                 const { data } = await axiosPrivate.get(`/admin/plans/meals${query}`, { signal });
//                 const currentMeals = data ? data.map(meal => {
//                     ['b', 'a', 'r'].forEach(char => {
//                         meal.products.map(prod => prod[char] = bar(prod[`${char}_100`], prod.grams))
//                         meal[char] = meal.products.map(prod => prod[char]).reduce(sum, 0)
//                     });
//                     return meal;    
//                 }) : [];
//                 setMeals([...currentMeals]);
//                 setIsLoading(false);
                
//             } catch (err) {
//                 toast('Klaida! \n'+err.message);
//             }
//         };
//         const controller = new AbortController();
//         getData(controller.signal);
//         return () => controller.abort();

//     }, [axiosPrivate, query]);

//     return {meals, setMeals, isLoading};
// };

import { useState, useEffect, useMemo } from 'react';
import useAxiosPrivate from '../useAxiosPrivate';
import { bar } from '../../utils/calculationsHelpers';
import toast from 'react-hot-toast';

export const useMeals = (filters) => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const axiosPrivate = useAxiosPrivate();

    // Memoize the query string
    const query = useMemo(() => {
        return Object.keys(filters).length ? '?' + new URLSearchParams(filters).toString() : '';
    }, [filters]);

    // Memoize the data fetching and processing function
    const getData = useMemo(() => async (signal) => {
        try {
            const sum = (acc, val) => acc + val;
            const { data } = await axiosPrivate.get(`/admin/plans/meals${query}`, { signal });
            const currentMeals = data ? data.map(meal => {
                ['b', 'a', 'r'].forEach(char => {
                    meal.products.map(prod => prod[char] = bar(prod[`${char}_100`], prod.grams))
                    meal[char] = meal.products.map(prod => prod[char]).reduce(sum, 0)
                });
                return meal;
            }) : [];
            setMeals([...currentMeals]);
            setIsLoading(false);
        } catch (err) {
            toast('Klaida! \n'+err.message);
        }
    }, [axiosPrivate, query]);

    useEffect(() => {
        const controller = new AbortController();
        getData(controller.signal);
        return () => controller.abort();
    }, [getData]);

    return {meals, setMeals, isLoading};
};