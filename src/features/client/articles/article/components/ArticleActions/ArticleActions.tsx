import { useEffect, useRef, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import cx from 'classnames';
import { Heart, Link2, Share2 } from 'lucide-react';

import { likesCountKey, useLikesCount } from '../../../../../../hooks/useLikesCount';
import { useToggleLike } from '../../../../../../hooks/useToggleLike';
import { useAuth, useAuthModal } from '../../../../../auth';
import type { Article } from '../../../articles/services/articlesService';
import envelopeIcon from '../../../assets/icons/social/envelope.svg';
import facebookIcon from '../../../assets/icons/social/facebook.svg';

import styles from './ArticleActions.module.scss';

interface ArticleActionsProps {
	article: Article;
}

export const ArticleActions = ({ article }: ArticleActionsProps) => {
	const { user } = useAuth();
	const { authOpenModal } = useAuthModal();
	const queryClient = useQueryClient();
	const { mutate: toggleLike } = useToggleLike(article.id, 'articles');
	const { data: serverLike } = useLikesCount(article.id, 'articles');
	const liked = user?.user_id ? (serverLike?.isLiked ?? false) : false;
	const likeCount = serverLike?.likesCount ?? 0;

	const [shareOpen, setShareOpen] = useState(false);
	const [copied, setCopied] = useState(false);
	const shareRef = useRef<HTMLDivElement>(null);

	const handleToggleLike = () => {
		if (!user?.user_id) {
			authOpenModal('auth');
			return;
		}
		toggleLike(undefined, {
			onSuccess: (res) => queryClient.setQueryData(likesCountKey('articles', article.id), res),
		});
	};

	useEffect(() => {
		if (!shareOpen) return;
		const onMouseDown = (e: MouseEvent) => {
			if (shareRef.current && !shareRef.current.contains(e.target as Node)) setShareOpen(false);
		};
		document.addEventListener('mousedown', onMouseDown);
		return () => document.removeEventListener('mousedown', onMouseDown);
	}, [shareOpen]);

	const copyLink = () => {
		navigator.clipboard?.writeText(window.location.href).catch(() => {});
		setCopied(true);
		setTimeout(() => setCopied(false), 1800);
	};

	const shareToFacebook = () => {
		const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`;
		window.open(shareUrl, 'facebook-share', 'width=600,height=600,noopener,noreferrer');
		setShareOpen(false);
	};

	const shareByEmail = () => {
		const subject = encodeURIComponent(article.title);
		const body = encodeURIComponent(`${article.excerpt}\n\n${window.location.href}`);
		window.location.href = `mailto:?subject=${subject}&body=${body}`;
		setShareOpen(false);
	};

	return (
		<div className={styles.articleActions}>
			<button type="button" className={cx(styles.like, liked && styles.on)} onClick={handleToggleLike} aria-pressed={liked}>
				<Heart size={20} fill={liked ? 'currentColor' : 'none'} />
				<span>Patinka</span>
				<span className={styles.likeCount}>{likeCount}</span>
			</button>

			<div className={styles.shareWrap} ref={shareRef}>
				<button
					type="button"
					className={cx(styles.shareBtn, shareOpen && styles.on)}
					onClick={() => setShareOpen((open) => !open)}
				>
					<Share2 size={18} />
					<span>Dalintis</span>
				</button>

				{shareOpen && (
					<div className={styles.shareMenu}>
						<button type="button" className={styles.shareItem} onClick={copyLink}>
							<span className={styles.shareIco}>
								<Link2 size={18} />
							</span>
							<span>{copied ? 'Nuoroda nukopijuota!' : 'Kopijuoti nuorodą'}</span>
						</button>
						<button type="button" className={styles.shareItem} onClick={shareToFacebook}>
							<span className={styles.shareIco}>
								<img src={facebookIcon} alt="" />
							</span>
							<span>Facebook</span>
						</button>
						<button type="button" className={styles.shareItem} onClick={shareByEmail}>
							<span className={styles.shareIco}>
								<img src={envelopeIcon} alt="" />
							</span>
							<span>El. paštu</span>
						</button>
					</div>
				)}
			</div>
		</div>
	);
};
