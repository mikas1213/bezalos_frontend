import { axiosPrivate } from '../api/axios';
export type LikeEntity = 'videos' | 'recipes' | 'comments' | 'articles';

interface ToggleLikePayload {
	entityId: string;
	entityType: LikeEntity;
	contextEntityId?: string | undefined;
}
export interface ToggleLikeResponse {
	isLiked: boolean;
	likesCount: number;
}
const needsEntityType: LikeEntity[] = ['videos', 'comments'];

class LikesService {
	async toggleLike(entityId: string, entityType: LikeEntity, contextEntityId?: string): Promise<ToggleLikeResponse> {
		const apiEndPoint = needsEntityType.includes(entityType) ? `/like/${entityType}` : '/like';
		const response = await axiosPrivate.post<ToggleLikeResponse>(apiEndPoint, {
			entityId,
			entityType,
			contextEntityId,
		} satisfies ToggleLikePayload);

		return response.data;
	}

	async getLikesCount(entityId: string): Promise<ToggleLikeResponse> {
		const response = await axiosPrivate.get<ToggleLikeResponse>(`/like/${entityId}`);
		return response.data;
	}
}

export const likesService = new LikesService();
