import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { axiosPublic } from '../../../../../api/axios';

interface Product {
	id: number;
	title: string;
	grams: number;
}

export interface Recipe {
	id: number;
	slug: string;
	title: string;
	title_short?: string;
	image_l: string;
	image_s3?: string;
	duration: number;
	description: string;
	video_link: string | null;
	recipe_type?: string;
	created_at: string;
	steps?: string[];
	b: number;
	a: number;
	r: number;
	kcal: number;
	products: Product[];
}

export const useRecipe = (slug: string) => {
	const [recipe, setRecipe] = useState<Recipe | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		document.body.style.backgroundColor = '#fff';
		const fetchData = async () => {
			try {
				const { data } = await axiosPublic.get(`/recipes/${slug}`);
				setRecipe(data);
				setIsLoading(false);
			} catch (err: unknown) {
				const error = err as { status?: number; response?: { data?: { message?: string } } };
				if (error.status === 404) {
					toast.error(error.response?.data?.message || 'Error fetching recipes');
					setRecipe(null);
				} else {
					toast.error('Serverio klaida');
				}
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, [slug]);

	return { isLoading, recipe };
};
