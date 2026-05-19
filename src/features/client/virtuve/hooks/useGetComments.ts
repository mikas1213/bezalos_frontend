import { useQuery } from '@tanstack/react-query';

import { useAuth } from '../../../auth';
import { type CommentDto, commentsService } from '../services/commentsService';
export const useGetComments = (video_id: string | undefined) => {
	const { user, isLoading } = useAuth();
	return useQuery<CommentDto[]>({
		queryKey: ['comments', video_id, user?.user_id],
		queryFn: () => commentsService.getComments(video_id!),
		enabled: !!video_id && !isLoading,
	});
};
