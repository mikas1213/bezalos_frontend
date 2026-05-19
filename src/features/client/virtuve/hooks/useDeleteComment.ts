import { useMutation, useQueryClient } from '@tanstack/react-query';

import { commentsService } from '../services/commentsService';

export function useDeleteComment(queryKey: unknown[]) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (comment_id: string) => commentsService.deleteComment(comment_id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey });
		},
	});
}
