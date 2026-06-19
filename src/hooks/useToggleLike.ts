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
	articles: 'articles',
};

export function useToggleLike(entityId: string, entityType: LikeEntity, contextEntityId?: string, detailQueryKey?: unknown[]) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: () => likesService.toggleLike(entityId, entityType, contextEntityId),
		onSuccess: (data: ToggleLikeResponse) => {
			if (!detailQueryKey) return;

			// The detail is cached per-user (the key includes user identity), but likesCount is global.
			// Sync the count into every cached copy of this entity so a sibling entry (e.g. the
			// logged-out one) doesn't keep a stale count and flicker when the user switches.
			const root = detailQueryKey[0];
			const id = detailQueryKey[detailQueryKey.length - 1];
			queryClient.setQueriesData<LikeableData>(
				{ predicate: (query) => query.queryKey[0] === root && query.queryKey[query.queryKey.length - 1] === id },
				(old) => (old ? { ...old, likesCount: data.likesCount } : old),
			);

			// isLiked is per-user: only the current user's entry.
			queryClient.setQueryData<LikeableData>(detailQueryKey, (old) => (old ? { ...old, isLiked: data.isLiked } : old));
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: [entityListQueryKey[entityType]] });
		},
	});
}
