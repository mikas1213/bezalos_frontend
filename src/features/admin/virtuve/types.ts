import type { VideoCategory } from '../../client/virtuve/components/virtuveVideo/VideoInfo/types';
export interface AdmninVirtuveDto {
	category: VideoCategory;
	commentsCount: number;
	createdAt: string;
	description: string;
	duration: string;
	id: string;
	imageS3Key: string;
	isActive: true;
	likesCount: number;
	participants: string;
	title: string;
	videoS3Key: string;
	videoTags: string[];
	viewsFull: number;
	viewsSnippet: number;
	photo: File;
	video: File;
}
