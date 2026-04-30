import type { VideoCard } from '../components/virtuve/VideoCard/types';
import type { VideoCategory } from '../components/virtuveVideo/VideoInfo/types';
export interface VirtuveFilterParams {
	c?: string;
	f?: string;
	s?: string;
}

export interface FiltersDto {
	categories: string[];
	tags: string[];
}

export interface VideosPageDto {
	data: VideoCard[];
	total: number;
	page: number;
	limit: number;
}

export interface VideoComment {
	id: string;
	user_id: string;
	user_name: string;
	comment: string;
	created_at: string;
	replies: Omit<VideoComment, 'replies'>[];
}

export interface VideoPageDto {
	id: string;
	category: VideoCategory;
	createdAt: Date;
	description: string;
	duration: string;
	embedUrl: string;
	contentUrl: string | null;
	imageS3Key: string;
	likesCount: number;
	participants: string;
	slug: string;
	title: string;
	videoTags: string[];
	viewsTotal: number;
	isActive: true;
	isCourseMaterial: true;
	isSnippet: true;
	isLiked: false;
}
