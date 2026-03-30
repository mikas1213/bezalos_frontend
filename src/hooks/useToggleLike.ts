import { useMutation, useQueryClient } from '@tanstack/react-query';

import { type LikeEntity, likesService, type ToggleLikeResponse } from '../services/likesService';

interface LikeableData {
	isLiked: boolean;
	likesCount: number;
}

const entityListQueryKey: Record<LikeEntity, string> = {
	videos: 'videos',
	recipes: 'recipes',
	comments: 'comments',
};

export function useToggleLike(entityId: string, entityType: LikeEntity, queryKey: unknown[], contextEntityId?: string) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => likesService.toggleLike(entityId, entityType, contextEntityId),
		onSuccess: (data: ToggleLikeResponse) => {
			queryClient.setQueryData<LikeableData>(queryKey, (old) => {
				if (!old) return old;
				return {
					...old,
					isLiked: data.isLiked,
					likesCount: data.likesCount,
				};
			});
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [entityListQueryKey[entityType]] });
		},
	});
}
