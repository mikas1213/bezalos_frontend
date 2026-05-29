import { useQuery } from '@tanstack/react-query';

import { axiosPrivate } from '../../../../../api/axios';

export interface FavoriteRecipe {
	id: number;
	slug: string;
	image_s: string;
	title: string;
	duration: number;
	food_logic: string;
	like_count: number;
}

const fetchData = async (): Promise<FavoriteRecipe[]> => {
	try {
		const { data } = await axiosPrivate.get<FavoriteRecipe[]>('/recipes/favorite');
		return data;
	} catch {
		throw new Error('Klaida');
	}
};

export const useFavoriteRecipes = () => {
	return useQuery({
		queryKey: ['favoriteRecipes'],
		queryFn: fetchData,
		retry: false,
		staleTime: 5 * 60 * 1000,
	});
};
