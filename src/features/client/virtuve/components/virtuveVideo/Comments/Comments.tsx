import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDeleteComment } from '../../../hooks/useDeleteComment';
import { useGetComments } from '../../../hooks/useGetComments';
import { usePostComment } from '../../../hooks/usePostComment';
import { AccessToast } from '../AccessToast';
import { ACCESS_MESSAGES } from '../constants';

import { CommentCompose } from './CommentCompose';
import { CommentItem } from './CommentItem';
import { DeleteModal } from './DeleteModal';
import { ReplyItem } from './ReplyItem';
import type { CommentsProps } from './types';
import { getCommentsCount } from './utils';

import styles from './Comments.module.scss';

export const Comments = ({ user, videoId, actionAccess, onOpenAuthModal }: CommentsProps) => {
	const navigate = useNavigate();
	const commentsQueryKey = ['comments', videoId, user?.user_id];
	const { data: comments = [] } = useGetComments(videoId);
	const { mutate: postComment } = usePostComment(commentsQueryKey);
	const { mutate: deleteComment } = useDeleteComment(commentsQueryKey);

	const [openReplies, setOpenReplies] = useState<Set<string>>(new Set());
	const [openReplyCompose, setOpenReplyCompose] = useState<Set<string>>(new Set());
	const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});
	const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
	const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());
	const [toastAction, setToastAction] = useState<'like' | 'comment' | null>(null);
	const [modalPosition, setModalPosition] = useState<{ top: number; left: number } | null>(null);

	const handleAccessDenied = (action: 'like' | 'comment', element: HTMLElement) => {
		if (actionAccess.forbidden === 'login') {
			onOpenAuthModal();
		} else {
			const rect = element.getBoundingClientRect();
			const left = window.innerWidth <= 440 ? 16 : rect.left + window.scrollX;
			setModalPosition({ top: rect.bottom + window.scrollY, left });
			setToastAction(action);
		}
	};

	const toggleReplies = (id: string) =>
		setOpenReplies((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});

	const toggleReplyCompose = (id: string) =>
		setOpenReplyCompose((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});

	const postReply = (commentId: string) => {
		const text = (replyInputs[commentId] ?? '').trim();
		if (!text || !user || !videoId) return;
		postComment({
			videoId,
			userId: user.user_id,
			comment: text,
			parentId: commentId,
		});
		setReplyInputs((prev) => ({ ...prev, [commentId]: '' }));
		setOpenReplyCompose((prev) => {
			const next = new Set(prev);
			next.delete(commentId);
			return next;
		});
		setTimeout(() => {
			setOpenReplies((prev) => (prev.has(commentId) ? prev : new Set([...prev, commentId])));
		}, 280);
	};

	const deleteItem = (id: string) => setPendingDeleteId(id);

	const confirmDelete = () => {
		if (!pendingDeleteId) return;
		const id = pendingDeleteId;
		setPendingDeleteId(null);
		setRemovingIds((prev) => new Set([...prev, id]));
		setTimeout(() => {
			deleteComment(id);
		}, 180);
	};

	const toastConfig = toastAction ? ACCESS_MESSAGES[toastAction][actionAccess.forbidden] : null;
	const toastRedirect = actionAccess.forbidden === 'course' ? '/paslaugos' : '/naryste';

	return (
		<>
			<div className={styles.root}>
				<div className={styles.header}>
					<span className={styles.headerTitle}>Komentarai</span>
					<span className={styles.headerCount}>{getCommentsCount(comments)} komentarų</span>
				</div>

				<CommentCompose
					user={user}
					actionAccess={actionAccess}
					onSubmit={(text) => {
						if (user && videoId) {
							postComment({ videoId: videoId, userId: user.user_id, comment: text });
						}
					}}
					onOpenAuthModal={onOpenAuthModal}
				/>

				<div id="comment-list">
					{comments.map((comment) => (
						<CommentItem
							key={comment.id}
							comment={comment}
							user={user}
							videoId={videoId}
							actionAccess={actionAccess}
							isRemoving={removingIds.has(comment.id)}
							openReplies={openReplies}
							openReplyCompose={openReplyCompose}
							replyInputs={replyInputs}
							setReplyInputs={setReplyInputs}
							postReply={postReply}
							toggleReplies={toggleReplies}
							toggleReplyCompose={toggleReplyCompose}
							onDelete={deleteItem}
							onAccessDenied={handleAccessDenied}
						>
							{comment.replies.map((reply) => (
								<ReplyItem
									key={reply.id}
									reply={reply}
									userId={user?.user_id}
									videoId={videoId}
									isRemoving={removingIds.has(reply.id)}
									actionAccess={actionAccess}
									onDelete={deleteItem}
									onAccessDenied={handleAccessDenied}
								/>
							))}
						</CommentItem>
					))}
				</div>
			</div>
			<DeleteModal pendingDeleteId={pendingDeleteId} setPendingDeleteId={setPendingDeleteId} confirmDelete={confirmDelete} />
			{toastConfig && modalPosition && (
				<AccessToast
					isOpen={toastAction !== null}
					position={modalPosition}
					title={toastConfig.title}
					description={toastConfig.desc}
					onClose={() => setToastAction(null)}
					onPrimary={() => navigate(toastRedirect)}
				/>
			)}
		</>
	);
};
