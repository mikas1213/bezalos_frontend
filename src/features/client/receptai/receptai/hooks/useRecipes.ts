import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import { axiosPublic } from '../../../../../api/axios';

export interface Recipe {
	id: number;
	slug: string;
	image_m: string;
	image_s: string;
	title: string;
	duration: number;
	food_logic: string;
	like_count: number;
	liked: boolean;
	likes: number;
}

export interface RecipeFilters {
	search?: string;
	[key: string]: string | undefined;
}

interface RecipesPageDto {
	data: Recipe[];
	total_rows: number;
	total_pages: number;
	current_page: number;
}

const RECIPES_PER_PAGE = 15;

const fetchRecipes = async (filters: RecipeFilters, user_id: string | null, page: number): Promise<RecipesPageDto> => {
	const query = new URLSearchParams({
		...filters,
		page: String(page),
		limit: String(RECIPES_PER_PAGE),
	}).toString();
	const response = await axiosPublic.post<RecipesPageDto>(`/recipes?${query}`, { id: user_id });
	return response.data;
};

export const useRecipes = (filters: RecipeFilters, user_id: string | null) => {
	const queryClient = useQueryClient();
	const queryKey = ['recipes', filters, user_id];

	const query = useInfiniteQuery({
		queryKey,
		queryFn: ({ pageParam }) => fetchRecipes(filters, user_id, pageParam),
		placeholderData: (previousData) => previousData,
		initialPageParam: 1,
		getNextPageParam: (lastPage) =>
			lastPage.current_page < lastPage.total_pages ? lastPage.current_page + 1 : undefined,
	});

	const recipes = query.data?.pages.flatMap((page) => page.data) ?? [];
	const totalRows = query.data?.pages[0]?.total_rows ?? 0;

	const updateRecipeLike = (recipe_id: number, isLiked: boolean, likesCount: number) => {
		queryClient.setQueryData(queryKey, (oldData: typeof query.data) => {
			if (!oldData) return oldData;
			return {
				...oldData,
				pages: oldData.pages.map((page) => ({
					...page,
					data: page.data.map((recipe) =>
						recipe.id === recipe_id ? { ...recipe, liked: isLiked, likes: likesCount } : recipe,
					),
				})),
			};
		});
	};

	return {
		...query,
		recipes,
		totalRows,
		updateRecipeLike,
	};
};
