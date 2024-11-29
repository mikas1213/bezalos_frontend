import { useState, useEffect } from 'react';
import useAxiosPrivate from '../useAxiosPrivate';
import { bar } from '../../utils/calculationsHelpers';
import toast from 'react-hot-toast';

export const useMeals = (filters, currentPage) => {
    const pageSize = 8;
    const [totalPages, setTotalPages] = useState(0);
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const axiosPrivate = useAxiosPrivate();
    let query = Object.keys(filters).length ? `?page=${currentPage}&pageSize=${pageSize}&` + new URLSearchParams(filters).toString() : `?page=${currentPage}&pageSize=${pageSize}`;
    
    useEffect(() => {
        const getData = async (signal) => {
            try {                
                const sum = (acc, val) => acc + val;
                const {data: { data, totalPage } = []} = await axiosPrivate.get(`/admin/plans/meals${query}`, { signal });
                
                const currentMeals = data ? data.map(meal => {
                    ['b', 'a', 'r'].forEach(char => {
                        meal.products.map(prod => prod[char] = bar(prod[`${char}_100`], prod.grams))
                        meal[char] = meal.products.map(prod => prod[char]).reduce(sum, 0)
                    });
                    return meal;    
                }) : [];

                setMeals([...currentMeals]);
                setTotalPages(totalPage);
                setIsLoading(false);
                
            } catch (err) {
                toast('Klaida! \n'+err.message);
            }
        };
        const controller = new AbortController();
        getData(controller.signal);
        return () => controller.abort();

    }, [axiosPrivate, query, currentPage]);

    return {meals, setMeals, totalPages, isLoading};
};

