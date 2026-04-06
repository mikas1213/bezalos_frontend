import type { VideoCategory } from '../../../client/virtuve/components/virtuveVideo/VideoInfo/types';
export interface UploadVideoFormValues {
	action: 'insert' | 'update' | null;
	category: VideoCategory;
	description: string;
	duration: string;
	imageS3Key: string;
	isActive: boolean;
	participants: string;
	photo: File | null;
	title: string;
	video: File | null;
	videoS3Key: string;
	videoTags: string[];
}

export interface ModalState {
	isOpen: boolean;
	action: UploadVideoFormValues['action'];
}
