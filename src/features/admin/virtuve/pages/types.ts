import type { VideoCategory } from '../../../client/virtuve/components/virtuveVideo/VideoInfo/types';

export interface UploadVideoFormValues {
	id?: string;
	action: 'insert' | 'update' | null;
	category: VideoCategory;
	description: string;
	duration: string;
	imageS3Key: string;
	videoS3Key: string;
	videoS3SnippetKey: string;
	isActive: boolean;
	participants: string;
	photo: File | null;
	title: string;
	video: File | null;
	videoTags: string[];
}

export interface ModalState {
	isOpen: boolean;
	action: UploadVideoFormValues['action'];
}
