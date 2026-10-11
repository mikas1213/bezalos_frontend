import type { QueryClient } from '@tanstack/react-query';

import type { ProfileDto, UserRecipe } from '../types';

import { profileKeys } from './queryKeys';

/**
 * Atnaujina tik `recipes` cache'uotame profilyje (žalia `ProfileDto` forma, `select` persiskaičiuoja pats).
 * Jei profilio cache dar nėra, nieko nedaro: React Query ignoruoja `undefined` iš updater'io.
 */
export const setProfileRecipes = (
	queryClient: QueryClient,
	userId: string,
	updater: (recipes: UserRecipe[]) => UserRecipe[],
): void => {
	queryClient.setQueryData<ProfileDto>(profileKeys.profile(userId), (prev) =>
		prev ? { ...prev, recipes: updater(prev.recipes) } : prev,
	);
};
