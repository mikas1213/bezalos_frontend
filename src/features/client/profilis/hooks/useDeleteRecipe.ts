import toast from 'react-hot-toast';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { profileService } from '../services/profileService';
import { getErrorMessage } from '../utils/getErrorMessage';
import { setProfileRecipes } from '../utils/profileCache';

/** Tiek trunka UserRecipe.jsx `.deleted` animacija; receptas iš sąrašo dingsta tik jai pasibaigus. */
const DELETE_ANIMATION_MS = 500;

/** Ištrina receptą ir pašalina jį iš profilio cache. */
export const useDeleteRecipe = (userId: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (recipeId: string) => profileService.deleteRecipe(recipeId),
		onSuccess: async (_data, recipeId) => {
			await new Promise((resolve) => setTimeout(resolve, DELETE_ANIMATION_MS));
			setProfileRecipes(queryClient, userId, (recipes) => recipes.filter((recipe) => recipe.id !== recipeId));
		},
		onError: (error) => {
			toast.error(getErrorMessage(error));
		},
	});
};
