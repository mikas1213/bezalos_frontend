import { skipToken, useQuery } from '@tanstack/react-query';

import { profileService } from '../services/profileService';
import type { ProfileData, ProfileDto, UserPlan, UserRecipe } from '../types';
import { toAnketaForm } from '../utils/anketaMappers';
import { profileKeys } from '../utils/queryKeys';

const EMPTY_PLANS: UserPlan[] = [];
const EMPTY_RECIPES: UserRecipe[] = [];

/** Modulio lygio funkcija, kad React Query galėtų memoizuoti `select` rezultatą tarp render'ų. */
const selectProfile = (dto: ProfileDto): ProfileData => ({
	plans: dto.plans,
	recipes: dto.recipes,
	anketa: toAnketaForm(dto.anketa[0]),
});

/**
 * Vartotojo profilis: planai, receptai ir anketa iš vienos užklausos `GET /profile/:id`.
 * Kol `userId` nėra, užklausa nevykdoma (`skipToken`), o `isLoading` lieka true.
 */
export const useProfile = (userId: string | undefined) => {
	const query = useQuery({
		queryKey: profileKeys.profile(userId),
		queryFn: userId ? () => profileService.getProfile(userId) : skipToken,
		select: selectProfile,
	});

	return {
		plans: query.data?.plans ?? EMPTY_PLANS,
		recipes: query.data?.recipes ?? EMPTY_RECIPES,
		/** `undefined`, kol profilis nepakrautas. */
		anketa: query.data?.anketa,
		/** True, kol dar nėra duomenų (pirmas krovimas arba laukiama `userId`). */
		isLoading: query.isPending,
		isError: query.isError,
		/** True ir per pakartotinį krovimą (pvz. paspaudus „Bandyti dar kartą“). */
		isFetching: query.isFetching,
		error: query.error,
		refetch: query.refetch,
	};
};
