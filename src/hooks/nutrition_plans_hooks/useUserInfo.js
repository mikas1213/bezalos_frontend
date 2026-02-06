import { useState, useEffect } from 'react';
import { useAxiosPrivate } from '../../features/auth';
import toast from 'react-hot-toast';

export const useUserInfo = (user_id) => {
    const axiosPrivate = useAxiosPrivate();
    const [user, setUser] = useState(null);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const { data } = await axiosPrivate.get(`/admin/user/${user_id}`);
                setUser(data);

                if(data.plans && data.plans.length > 0) {
                    setSelectedPlan(data.plans[0]);
                }
                setIsLoading(false);
            } catch (err) {
                toast.error(err.response.data.message || err.message);
            }
        };
        getData();
    }, [axiosPrivate, user_id]);

    return { user, setUser, selectedPlan, setSelectedPlan, isLoading };
};