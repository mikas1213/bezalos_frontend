import toast from 'react-hot-toast';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { tagsService } from '../../services/tagsService/tagsService';
import type { TagMutationDto } from '../../services/tagsService/types';

export const useDeleteTag = () => {
	const queryClient = useQueryClient();

	return useMutation<void, Error, TagMutationDto>({
		mutationFn: (payload) => tagsService.deleteTag(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tags'] });
		},
		onError: (err) => {
			toast.error(err.message || 'Nepavyko ištrinti tag\'o');
		},
	});
};
