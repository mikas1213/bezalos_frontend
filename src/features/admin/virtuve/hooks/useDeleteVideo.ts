import toast from 'react-hot-toast';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { adminVirtuveService } from '../services/adminVirtuveService';
import type { AdmninVirtuveDto } from '../types';

export function useDeleteVideo() {
	const queryClient = useQueryClient();

	return useMutation<void, Error, AdmninVirtuveDto>({
		mutationFn: (video: AdmninVirtuveDto) => adminVirtuveService.deleteVideo(video),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['admin-videos'] });
		},
		onError: (err) => {
			toast.error(err.message || 'Klaida!');
		},
	});
}
