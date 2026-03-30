import { axiosPrivate } from '../api/axios';
export type LikeEntity = 'videos' | 'recipes' | 'comments';

interface ToggleLikePayload {
	entityId: string;
	entityType: LikeEntity;
	contextEntityId?: string | undefined;
}
export interface ToggleLikeResponse {
	isLiked: boolean;
	likesCount: number;
}

class LikesService {
	async toggleLike(entityId: string, entityType: LikeEntity, contextEntityId?: string): Promise<ToggleLikeResponse> {
		const response = await axiosPrivate.post<ToggleLikeResponse>(`/like/${entityType}`, {
			entityId,
			entityType,
			contextEntityId,
		} satisfies ToggleLikePayload);

		return response.data;
	}
}

export const likesService = new LikesService();
