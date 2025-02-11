import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import axios from '../../api/axios';

export const useRecipe = (slug) => {
    
    const [recipe, setRecipe] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.body.style.backgroundColor = '#fff';

        const fetchData = async () => {
            try {
                const { data } = await axios.get(`/recipes/${slug}`);
                setRecipe(data);
                setIsLoading(false);
            } catch (err) {
                if(err.status === 404) {
                    toast.error(err.response?.data?.message || 'Error fetching recipes');
                } else {
                    toast.error('Serverio klaida');
                }
                
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
        
    }, [slug]);
    
    

    return { isLoading, recipe }
};