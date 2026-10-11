import { useMutation, useQueryClient } from '@tanstack/react-query';

import { profileService } from '../services/profileService';
import type { AnketaForm } from '../types';
import { profileKeys } from '../utils/queryKeys';

/**
 * Išsaugo anketą ir perkrauna profilį, kad cache'e būtų tikra DB eilutė (su `user_id` ir sutvarkytais skaičiais).
 * Serveris negrąžina eilutės `id`, todėl rankinis `setQueryData` čia netinka.
 * Klaidų apdorojimas (`toast.promise`, 400 su `page` ir `field`) lieka AnketaPage, čia tik mutacija.
 */
export const useSaveAnketa = (userId: string) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (anketa: AnketaForm) => profileService.saveAnketa(userId, anketa),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: profileKeys.profile(userId) }),
	});
};
