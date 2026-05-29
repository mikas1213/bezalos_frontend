import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

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

export const useRecipes = (filters: RecipeFilters, user_id: string | null) => {
	const recipesPerPage = 15;
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [totalRows, setTotalRows] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [recipes, setRecipes] = useState<Recipe[]>([]);
	const isFirstRender = useRef(true);

	const query = new URLSearchParams({
		...filters,
		page: String(currentPage),
		limit: String(recipesPerPage),
	}).toString();

	useEffect(() => {
		document.body.style.backgroundColor = '#fff';
		document.title = 'Be žalos | Receptai';

		const fetchData = async () => {
			try {
				const {
					data: { data, total_rows, total_pages, current_page },
				} = await axiosPublic.post<{
					data: Recipe[];
					total_rows: number;
					total_pages: number;
					current_page: number;
				}>(`/recipes?${query}`, { id: user_id });
				setCurrentPage(current_page);
				setTotalPages(total_pages);
				setTotalRows(total_rows);
				setRecipes(data);
				setIsLoading(false);
			} catch (err: unknown) {
				const message =
					err instanceof Error
						? err.message
						: (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
				toast.error(message || 'Error fetching recipes');
			} finally {
				setIsLoading(false);
			}
		};

		if (isFirstRender.current) {
			fetchData();
			isFirstRender.current = false;
		} else {
			const timeoutId = setTimeout(fetchData, 200);
			return () => clearTimeout(timeoutId);
		}
	}, [query, user_id]);

	return {
		isLoading,
		recipes,
		setRecipes,
		currentPage,
		setCurrentPage,
		totalPages,
		totalRows,
	};
};
