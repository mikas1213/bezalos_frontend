import { axiosPrivate } from '../../../../api/axios';

export type ReplyDto = {
	id: string;
	userId: string;
	displayName: string;
	comment: string;
	createdAt: string;
	isLiked?: boolean;
	likesCount?: number;
};

export type CommentDto = ReplyDto & { replies: ReplyDto[] };

interface PostCommentPayload {
	videoId: string;
	userId: string;
	comment: string;
	parentId?: string;
}

class CommentsService {
	async postComment(payload: PostCommentPayload): Promise<void> {
		await axiosPrivate.post('/comments', payload);
	}

	async deleteComment(commentId: string): Promise<void> {
		await axiosPrivate.delete(`/comments/${commentId}`);
	}

	async getComments(videoId: string): Promise<CommentDto[]> {
		const response = await axiosPrivate.get<CommentDto[]>(`/comments/${videoId}`);
		return response.data;
	}
}

export const commentsService = new CommentsService();
export type { PostCommentPayload };
