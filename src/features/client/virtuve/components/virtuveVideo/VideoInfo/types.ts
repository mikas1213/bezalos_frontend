import type { UserData } from '../../../../../auth/core/services';
import type { ActionAccess } from '../../../pages/VirtuveVideoPage/VirtuveVideoPage';
export type VideoCategory = 'Kursai' | 'Nemokamas' | 'Pokalbis' | 'Trumpai' | 'Vebinaras';
export type SubscriptionTypes = 'virtuve' | 'Virtuvė' | 'Cancel_virtuve';

interface VideoInfo {
	category: VideoCategory;
	createdAt: Date;
	description: string;
	duration: string;
	id: string;
	isCourseMaterial: boolean;
	isLiked: boolean;
	isSnippet: boolean;
	likesCount: number;
	participants: string;
	slug: string;
	title: string;
	videoTags: string[];
	viewsTotal: number;
}

export interface VideoInfoProps {
	user: UserData | null;
	video: VideoInfo;
	actionAccess: ActionAccess;
}
