import { useQuery } from '@tanstack/react-query';
import axios from '../../api/axios';

const fetchData = async () => {
    try {
        const { data } = await axios.get('/recipes/favorite');
        return data;
    } catch (err) {
        throw new Error('Klaida');
    }
};

export const useFavoriteRecipes = () => {
    return useQuery({
        queryKey: ['favoriteRecipes'],
        queryFn: fetchData,
        retry: false,
        staletime: 5 * 60 * 1000
    });
};
