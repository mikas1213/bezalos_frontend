export interface Video {
	image_s3_key: string;
	category: string;
	duration: number;
	title: string;
	description: string;
	created_at: string;
	participants: string;
	video_tags: string[];
	play_count: number;
	slug: string;
	comment_count: number;
	likes_count: number;
}
