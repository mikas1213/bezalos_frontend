import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { type LikeEntity, likesService } from '../services/likesService';

/** Global key for the like-count query — the count is the same for every viewer. */
export const likesCountKey = (entityType: LikeEntity, entityId: string) =>
	[entityType, 'likesCount', entityId] as const;

/**
 * Fetches the like count and the current user's isLiked state for an entity.
 * The key deliberately omits the user identity: the count is global, so keeping a
 * single query (the caller refetches it on login/logout) lets keepPreviousData hold
 * the count and heart steady during the auth swap instead of blinking through a
 * fresh, empty per-user query. The entity-type prefix lets useToggleLike's
 * onSettled invalidation refetch it after a toggle.
 */
export function useLikesCount(entityId: string, entityType: LikeEntity) {
	return useQuery({
		queryKey: likesCountKey(entityType, entityId),
		queryFn: () => likesService.getLikesCount(entityId),
		enabled: !!entityId,
		placeholderData: keepPreviousData,
	});
}
