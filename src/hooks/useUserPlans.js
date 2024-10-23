import useAxiosPrivate from './useAxiosPrivate';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export const useUserPlans = (user_id) => {
    const axiosPrivate = useAxiosPrivate();
    const [plans, setPlans] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axiosPrivate.get(`/profile?id=${user_id}`);
                setPlans(data);
                setIsLoading(false);
                
            } catch (err) {
                toast.error('Klaida!\n'+err.response.data.message);
            }
        };

        getData();
    }, [axiosPrivate, user_id]);

    return { plans, setPlans, isLoading}
};