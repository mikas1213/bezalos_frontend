import cx from 'classnames';

import { useToggleLike } from '../../../../../../../hooks/useToggleLike';
import type { ActionAccess } from '../../../../pages/VirtuveVideoPage/VirtuveVideoPage';
import type { ReplyDto } from '../../../../service/commentsService';
import { formatTime, getInitials, getUserColor } from '../utils';

import styles from './ReplyItem.module.scss';

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

export type ReplyItemProps = {
	reply: ReplyDto;
	userId: string | undefined;
	videoId: string | undefined;
	isRemoving: boolean;
	actionAccess: ActionAccess;
	onDelete: (id: string) => void;
	onAccessDenied: (action: 'like' | 'comment', element: HTMLElement) => void;
};

export const ReplyItem = ({ reply, userId, videoId, isRemoving, actionAccess, onDelete, onAccessDenied }: ReplyItemProps) => {
	const { mutate: toggleLike, data } = useToggleLike(reply.id, 'comments', ['comment', reply.id], videoId);
	const rColor = getUserColor(reply.userId);
	const isLiked = data?.isLiked ?? reply.isLiked ?? false;
	const likesCount = data?.likesCount ?? reply.likesCount ?? 0;

	const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!actionAccess.allowed) {
			onAccessDenied('like', e.currentTarget);
			return;
		}
		toggleLike();
	};

	return (
		<div className={cx(styles.reply, { [styles.removing]: isRemoving })}>
			<div
				className={cx(styles.avatar, styles.avatarSm)}
				style={
					reply.displayName !== 'Be žalos'
						? { background: rColor.bg, color: rColor.cl }
						: { background: 'linear-gradient(135deg, hsl(100, 60%, 40%), #084747)', color: '#fff' }
				}
			>
				{getInitials(reply.displayName)}
			</div>
			<div className={styles.replyBubble}>
				<div className={styles.replyMeta}>
					<span className={styles.replyAuthor}>{reply.displayName}</span>
					<span className={styles.replyTime}>{formatTime(reply.createdAt)}</span>
				</div>
				<p className={styles.replyText}>{reply.comment}</p>
				<div className={styles.replyActions}>
					<button type="button" className={cx(styles.actBtn, { [styles.liked]: isLiked })} onClick={handleLike}>
						{thumbUp(isLiked, 11)}
						{likesCount}
					</button>
					{userId === reply.userId && (
						<button type="button" className={cx(styles.actBtn, styles.actDelete)} onClick={() => onDelete(reply.id)}>
							{trashIcon(11)} Trinti
						</button>
					)}
				</div>
			</div>
		</div>
	);
};
