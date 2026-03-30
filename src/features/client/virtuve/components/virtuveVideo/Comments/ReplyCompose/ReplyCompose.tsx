import { useEffect, useRef } from 'react';

import cx from 'classnames';
import { HatGlasses } from 'lucide-react';

import { getInitials, getUserColor } from '../utils';

import type { ReplyComposeProps } from './types';

import styles from './ReplyCompose.module.scss';

const Send = ({ active }: { active: string }) => (
	<svg className={`${styles.icon} ${active}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<g id="SVGRepo_bgCarrier" strokeWidth="0" />
		<g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
		<g id="SVGRepo_iconCarrier">
			<path d="M18.0693 8.50867L9.50929 4.22867C3.75929 1.34867 1.39929 3.70867 4.27929 9.45867L5.14929 11.1987C5.39929 11.7087 5.39929 12.2987 5.14929 12.8087L4.27929 14.5387C1.39929 20.2887 3.74929 22.6487 9.50929 19.7687L18.0693 15.4887C21.9093 13.5687 21.9093 10.4287 18.0693 8.50867ZM14.8393 12.7487H9.43929C9.02929 12.7487 8.68929 12.4087 8.68929 11.9987C8.68929 11.5887 9.02929 11.2487 9.43929 11.2487H14.8393C15.2493 11.2487 15.5893 11.5887 15.5893 11.9987C15.5893 12.4087 15.2493 12.7487 14.8393 12.7487Z" />
		</g>
	</svg>
);

export const ReplyCompose = ({
	user,
	commentId,
	replyInputs,
	postReply,
	actionAccess,
	setReplyInputs,
	openReplyCompose,
}: ReplyComposeProps) => {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		if (openReplyCompose.has(commentId)) {
			const timer = setTimeout(() => textareaRef.current?.focus(), 50);
			return () => clearTimeout(timer);
		}
	}, [openReplyCompose, commentId]);

	if (!actionAccess.allowed) return null;

	const value = replyInputs[commentId] ?? '';
	const userAvatarColor = getUserColor(user?.user_id);

	const handleSubmit = () => {
		postReply(commentId);
		if (textareaRef.current) textareaRef.current.style.height = 'auto';
	};

	return (
		<div
			className={cx(styles.replyCompose, {
				[styles.open]: openReplyCompose.has(commentId),
			})}
		>
			<div className={styles.replyComposeInner}>
				<div className={styles.replyComposeRow}>
					<div
						className={cx(styles.avatar, styles.avatarSm)}
						style={
							user && user?.user_role === 1213
								? { background: 'linear-gradient(135deg, hsl(100, 60%, 40%), #084747)', color: '#fff' }
								: { background: userAvatarColor.bg, color: userAvatarColor.cl }
						}
					>
						{user && user.user_role === 1213 ? 'BŽ' : user ? getInitials(user.displayName) : <HatGlasses />}
					</div>
					<div className={styles.replyForm}>
						<textarea
							ref={textareaRef}
							className={styles.replyInput}
							rows={1}
							placeholder="Atsakykite..."
							value={value}
							maxLength={1000}
							onChange={(e) => {
								setReplyInputs((p) => ({ ...p, [commentId]: e.target.value }));
								e.target.style.height = 'auto';
								e.target.style.height = `${e.target.scrollHeight}px`;
							}}
							onKeyDown={(e) => {
								if (e.key === 'Enter' && !e.shiftKey) {
									e.preventDefault();
									handleSubmit();
								}
							}}
						/>
						<button type="button" className={styles.sendBtn} onClick={handleSubmit}>
							<Send active={value ? styles.active : ''} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
