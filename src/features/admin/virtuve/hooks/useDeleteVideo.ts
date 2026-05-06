import toast from 'react-hot-toast';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { adminVirtuveService } from '../services/adminVirtuveService';
import type { DeletePayload } from '../types';

export function useDeleteVideo() {
	const queryClient = useQueryClient();

	return useMutation<void, Error, DeletePayload>({
		mutationFn: ({ videoId, imageS3Key, videoS3Key, videoS3SnippetKey }: DeletePayload) =>
			adminVirtuveService.deleteVideo({ videoId, imageS3Key, videoS3Key, videoS3SnippetKey }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['admin-videos'] });
		},
		onError: (err) => {
			toast.error(err.message || 'Klaida!');
		},
	});
}
