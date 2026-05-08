import toast from 'react-hot-toast';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import type { Socket } from 'socket.io-client';

import { axiosPrivate } from '../../../../api/axios';
import type { UploadVideoFormValues } from '../pages/types';
type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

interface UseUploadVideoParams {
	socket: Socket | null;
	action: 'insert' | 'update';
	isVideo: boolean;
	setUploadProgress: SetState<number>;
	setVideoProgress: SetState<number>;
	setMessage: SetState<string>;
	setUploading: SetState<boolean>;
	setUploadSuccess: SetState<boolean>;
	setUploadError: SetState<boolean>;
}

export const useUploadVideo = ({
	socket,
	action,
	isVideo,
	setUploadProgress,
	setVideoProgress,
	setMessage,
	setUploading,
	setUploadSuccess,
	setUploadError,
}: UseUploadVideoParams) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (formValues: UploadVideoFormValues) => {
			if (!socket || !socket.connected) {
				throw new Error('Socket.IO neprisijungęs. Bandykite dar kartą.');
			}

			console.log('🔌 Socket ID:', socket.id); // Debug log
			const formData = new FormData();
			formData.append('title', formValues.title);
			formData.append('imageS3Key', formValues.imageS3Key);
			formData.append('videoS3Key', formValues.videoS3Key);
			formData.append('videoS3SnippetKey', formValues.videoS3SnippetKey);
			formData.append('description', formValues.description);
			formData.append('participants', formValues.participants);
			formData.append('category', formValues.category);
			formData.append('duration', formValues.duration);
			formData.append('isActive', String(formValues.isActive));
			if (formValues.videoTags?.length) formData.append('videoTags', JSON.stringify(formValues.videoTags));
			if (formValues.video) formData.append('video', formValues.video);
			if (formValues.photo) formData.append('photo', formValues.photo);
			if (formValues.action) formData.append('action', formValues.action);

			const api = action === 'insert' ? `/admin/virtuve` : `/admin/virtuve/${formValues.id}`;
			console.log('📤 Sending to:', api); // Debug log
			const response = await axiosPrivate.post(api, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					'X-Socket-ID': socket?.id,
				},
				onUploadProgress: (progressEvent) => {
					const progress = Math.round((progressEvent.loaded * 100) / (progressEvent.total ?? progressEvent.loaded));
					setUploadProgress(progress);

					setMessage(
						progress < 100 ? `Siunčiama į serverį . . . ` : 'Failai gauti serveryje, pradedamas video upload į AWS...',
					);
				},
			});
			return response.data;
		},

		onMutate: () => {
			setUploading(true);
			setUploadProgress(0);
			setVideoProgress(0);
			setMessage('Pradedamas failų įkėlimas...');
		},
		onError: (error) => {
			console.error('❌ Upload error:', error); // Debug log
			const message = isAxiosError(error) ? error.response?.data?.message : error.message;
			toast.error(message || 'Klaida');
			setMessage('Klaida įkeliant failus ');
			setUploading(false);
			setUploadError(true);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['admin-videos'] });
			if (action === 'update' && !isVideo) {
				toast.success(`Video sėkmingai atnaujintas! ✅`);
				setUploading(false);
				setUploadSuccess(true);
			}
		},
	});
};
