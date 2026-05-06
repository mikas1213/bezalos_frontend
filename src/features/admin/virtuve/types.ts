import type { VideoCategory } from '../../client/virtuve/components/virtuveVideo/VideoInfo/types';
export interface AdmninVirtuveDto {
	category: VideoCategory;
	commentsCount: number;
	createdAt: string;
	description: string;
	duration: string;
	id: string;
	isActive: true;
	likesCount: number;
	participants: string;
	title: string;
	imageS3Key: string;
	videoS3Key: string;
	videoS3SnippetKey: string;
	videoTags: string[];
	viewsFull: number;
	viewsSnippet: number;
	photo: File;
	video: File;
}

export interface DeletePayload {
	videoId: string;
	imageS3Key: string;
	videoS3Key: string;
	videoS3SnippetKey: string;
}
