import { useMutation, useQueryClient } from '@tanstack/react-query';

import { commentsService, type PostCommentPayload } from '../services/commentsService';

export function usePostComment(queryKey: unknown[]) {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (payload: PostCommentPayload) => commentsService.postComment(payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey });
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['videos'] });
		},
	});
}
