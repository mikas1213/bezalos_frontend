import useAxiosPrivate from '../useAxiosPrivate';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const usePlanProducts = (is_subscription) => {
    
    const axiosPrivate = useAxiosPrivate();
    const [prodList, setProdList] = useState([{test: 'test'}]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        let isMounted = true;
        const getData = async () => {
            try {
                if (isMounted && is_subscription) {
                    const { data } = await axiosPrivate.get(`/profile/products`);
                    setProdList(data);
                    setIsLoading(false);
                }           
            } catch (err) {
                if (isMounted) {
                    toast.error('Klaida!\n'+err.response.data.message);
                }
            }
        };

        getData();
        return () => { isMounted = false; };
    }, [axiosPrivate, is_subscription]);

    return { prodList, setProdList, isLoading}
};