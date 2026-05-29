import type { ReactNode } from 'react';

import cx from 'classnames';

import { useToggleLike } from '../../../../../../../hooks/useToggleLike';
import type { UserData } from '../../../../../../auth/core/services';
import type { ActionAccess } from '../../../../pages/VirtuveVideoPage/VirtuveVideoPage';
import type { CommentDto } from '../../../../services/commentsService';
import { ReplyCompose } from '../ReplyCompose';
import { formatTime, getInitials, getUserColor } from '../utils';

import styles from './CommentItem.module.scss';

const thumbUp = (isLiked: boolean, size: number) => (
	<svg
		width={size}
		height={size}
		fill={isLiked ? 'currentColor' : 'none'}
		stroke={isLiked ? 'none' : 'currentColor'}
		strokeWidth="2"
		viewBox="0 0 24 24"
	>
		<path d="M7 22V11M2 13v7a2 2 0 002 2h13.4a2 2 0 001.98-1.72l1.1-9A2 2 0 0018.5 9H14V5a3 3 0 00-3-3 1 1 0 00-1 1v.5L7.5 11" />
	</svg>
);

const trashIcon = (size: number) => (
	<svg width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
		<polyline points="3 6 5 6 21 6" />
		<path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
		<path d="M9 6V4h6v2" />
	</svg>
);

const replyIcon = (
	<svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
		<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
	</svg>
);

const chevron = (
	<svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
		<path d="m6 9 6 6 6-6" strokeLinecap="round" />
	</svg>
);

export type CommentItemProps = {
	comment: CommentDto;
	user: UserData | null;
	videoId: string | undefined;
	actionAccess: ActionAccess;
	isRemoving: boolean;
	openReplies: Set<string>;
	openReplyCompose: Set<string>;
	replyInputs: Record<string, string>;
	setReplyInputs: React.Dispatch<React.SetStateAction<Record<string, string>>>;
	postReply: (commentId: string) => void;
	toggleReplies: (commentId: string) => void;
	toggleReplyCompose: (commentId: string) => void;
	onDelete: (id: string) => void;
	onAccessDenied: (action: 'like' | 'comment', element: HTMLElement) => void;
	children?: ReactNode;
};

export const CommentItem = ({
	comment,
	user,
	videoId,
	actionAccess,
	isRemoving,
	openReplies,
	openReplyCompose,
	replyInputs,
	setReplyInputs,
	postReply,
	toggleReplies,
	toggleReplyCompose,
	onDelete,
	onAccessDenied,
	children,
}: CommentItemProps) => {
	const { mutate: toggleLike, data } = useToggleLike(comment.id, 'comments', ['comment', comment.id], videoId);
	const color = getUserColor(comment.userId);
	const totalReplies = comment.replies.length;
	const isLiked = data?.isLiked ?? comment.isLiked ?? false;
	const likesCount = data?.likesCount ?? comment.likesCount ?? 0;

	const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!actionAccess.allowed) {
			onAccessDenied('like', e.currentTarget);
			return;
		}
		toggleLike();
	};

	const handleReply = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!actionAccess.allowed) {
			onAccessDenied('comment', e.currentTarget);
			return;
		}
		toggleReplyCompose(comment.id);
	};

	return (
		<div className={cx(styles.comment, { [styles.removing]: isRemoving })}>
			<div
				className={cx(styles.avatar, styles.avatarLg)}
				style={
					comment.displayName !== 'Be žalos'
						? { background: color.bg, color: color.cl }
						: { background: 'linear-gradient(135deg, hsl(100, 60%, 40%), #084747)', color: '#fff' }
				}
			>
				{getInitials(comment.displayName)}
			</div>
			<div className={styles.commentThread}>
				<div className={styles.commentBubble}>
					<div className={styles.commentMeta}>
						<span className={styles.commentAuthor}>{comment.displayName}</span>
						<span className={styles.commentTime}>{formatTime(comment.createdAt)}</span>
					</div>
					<p className={styles.commentText}>{comment.comment}</p>
				</div>
				<div className={styles.commentActions}>
					<button type="button" className={cx(styles.actBtn, { [styles.liked]: isLiked })} onClick={handleLike}>
						{thumbUp(isLiked, 12)}
						{likesCount}
					</button>
					<button type="button" className={styles.actBtn} onClick={handleReply}>
						{replyIcon} Atsakyti
					</button>
					{user?.user_id === comment.userId && (
						<button type="button" className={cx(styles.actBtn, styles.actDelete)} onClick={() => onDelete(comment.id)}>
							{trashIcon(12)} Trinti
						</button>
					)}
				</div>
				<div className={styles.repliesWrap}>
					{totalReplies > 0 && (
						<button
							type="button"
							className={cx(styles.toggleReplies, { [styles.open]: openReplies.has(comment.id) })}
							onClick={() => toggleReplies(comment.id)}
						>
							{chevron} {totalReplies} {totalReplies === 1 ? 'atsakymas' : 'atsakymai'}
						</button>
					)}
					<div className={cx(styles.replies, { [styles.open]: openReplies.has(comment.id) })}>
						<div className={styles.repliesInner}>{children}</div>
					</div>
					<ReplyCompose
						user={user}
						commentId={comment.id}
						replyInputs={replyInputs}
						postReply={postReply}
						setReplyInputs={setReplyInputs}
						actionAccess={actionAccess}
						openReplyCompose={openReplyCompose}
					/>
				</div>
			</div>
		</div>
	);
};
