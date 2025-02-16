import useAxiosPrivate from './useAxiosPrivate';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';

const useAdminRecipes = () => {
    const axiosPrivate = useAxiosPrivate();
    const [isLoading, setIsLoading] = useState(true);
    const [adminRecipes, setAdminRecipes] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axiosPrivate.get('/admin/recipes');
                setAdminRecipes(data);
                setIsLoading(false);
            } catch (err) {
                toast.error(err.response.data.message || err.message);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [axiosPrivate]);

    return { isLoading, adminRecipes, setAdminRecipes }
};

export default useAdminRecipes;