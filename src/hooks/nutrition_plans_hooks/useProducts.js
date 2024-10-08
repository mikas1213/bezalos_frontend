import { useState, useEffect } from 'react';
import useAxiosPrivate from '../useAxiosPrivate';

export const useProducts = (filters) => {
    const axiosPrivate = useAxiosPrivate();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let query = Object.keys(filters).length ? '?' + new URLSearchParams(filters).toString() : '';

    useEffect(() => {
        
        const getData = async (signal) => {
            try {
                const data = await axiosPrivate.get(`/admin/plans/products${query}`, { signal });
                setProducts(data?.data?.data);
                setIsLoading(false);
            } catch (err) {
                console.log(err);
            }
        }
        const controller = new AbortController();
        getData(controller.signal);
        return () => controller.abort();

    }, [axiosPrivate, query]);
    return {products, setProducts, isLoading};
}