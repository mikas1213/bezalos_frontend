export interface VideoCard {
	image_s3_key: string;
	category: string;
	duration: number;
	title: string;
	description: string;
	created_at: Date;
	video_tags: string[];
	views_total: number;
	slug: string;
	comment_count: number;
	likes_count: number;
}

export interface VideoCardProps {
	video: VideoCard;
	index?: number;
	isNew?: boolean;
}
