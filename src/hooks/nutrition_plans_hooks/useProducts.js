import { useState, useEffect } from 'react';
import { axiosPrivate } from '../../api/axios';

export const useProducts = (filters) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let query = Object.keys(filters).length || (filters.search && filters.search.length > 2) ? '?' + new URLSearchParams(filters).toString() : '';
    
    useEffect(() => {
        const getData = async (signal) => {
            try {
                const { data }  = await axiosPrivate.get(`/admin/plans/products${query}`, { signal });
                setProducts(data);
                setIsLoading(false);
        
            } catch (err) {
                console.log(err);
            }
        }
        const controller = new AbortController();
        getData(controller.signal);
        return () => controller.abort();

    }, [query]);
    return {products, setProducts, isLoading};
}