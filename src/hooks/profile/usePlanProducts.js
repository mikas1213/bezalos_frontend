import { axiosPrivate } from '../../api/axios';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const usePlanProducts = () => {
    
    const [prodList, setProdList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        let isMounted = true;
        const getData = async () => {
            try {
                if (isMounted) {
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
    }, []);

    return { prodList, setProdList, isLoading}
};