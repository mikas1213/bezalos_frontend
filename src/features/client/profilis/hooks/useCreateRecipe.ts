import toast from 'react-hot-toast';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import { profileService } from '../services/profileService';
import type { CreateRecipeInput, UserRecipe } from '../types';
import { getErrorMessage } from '../utils/getErrorMessage';
import { setProfileRecipes } from '../utils/profileCache';

/** Serveris grąžina tik `recipe_id`, todėl `UserRecipe` cache'ui sudedamas iš to, ką turėjo klientas. */
const toUserRecipe = (recipeId: string, input: CreateRecipeInput): UserRecipe => ({
	id: recipeId,
	title: input.title,
	logic: input.logic,
	b: input.b,
	a: input.a,
	r: input.r,
	kcal: input.kcal,
	products: input.products.map(({ id, product_id, title, proteins, carbs, fat, grams }) => ({
		id: id ?? crypto.randomUUID(),
		product_id,
		title,
		proteins,
		carbs,
		fat,
		grams,
	})),
});

/** Sukuria receptą ir įdeda jį į profilio cache sąrašo pradžioje. */
export const useCreateRecipe = (userId: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (recipe: CreateRecipeInput) => profileService.createRecipe(userId, recipe),
		onSuccess: ({ recipe_id }, recipe) => {
			setProfileRecipes(queryClient, userId, (recipes) => [toUserRecipe(recipe_id, recipe), ...recipes]);
		},
		onError: (error) => {
			// Tie patys tekstai kaip RecipeModal.jsx: 400 rodo serverio validacijos žinutę, visa kita bendrą.
			if (isAxiosError(error) && error.response?.status === 400) {
				toast.error(getErrorMessage(error));
			} else {
				toast.error('Tikriausia serverio klaida.\nBandykite vėliau');
			}
		},
	});
};
