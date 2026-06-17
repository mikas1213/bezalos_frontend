import { useEffect, useRef, useState } from 'react';

import cx from 'classnames';
import { Heart, Link2, Share2 } from 'lucide-react';

import type { Article } from '../../../articles/services/articlesService';
import envelopeIcon from '../../../assets/icons/social/envelope.svg';
import facebookIcon from '../../../assets/icons/social/facebook.svg';
import instagramIcon from '../../../assets/icons/social/instagram.svg';
import { useArticleLike } from '../../hooks';

import styles from './ArticleActions.module.scss';

interface ArticleActionsProps {
	article: Article;
}

export const ArticleActions = ({ article }: ArticleActionsProps) => {
	const { liked, likeCount, toggle } = useArticleLike(article.id, article.likes);
	const [shareOpen, setShareOpen] = useState(false);
	const [copied, setCopied] = useState(false);
	const shareRef = useRef<HTMLDivElement>(null);

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

	return (
		<div className={styles.articleActions}>
			<button type="button" className={cx(styles.like, liked && styles.on)} onClick={toggle} aria-pressed={liked}>
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
						<a className={styles.shareItem} href="#" onClick={(e) => e.preventDefault()}>
							<span className={styles.shareIco}>
								<img src={facebookIcon} alt="" />
							</span>
							<span>Facebook</span>
						</a>
						<a className={styles.shareItem} href="#" onClick={(e) => e.preventDefault()}>
							<span className={styles.shareIco}>
								<img src={instagramIcon} alt="" />
							</span>
							<span>Instagram</span>
						</a>
						<a className={styles.shareItem} href="#" onClick={(e) => e.preventDefault()}>
							<span className={styles.shareIco}>
								<img src={envelopeIcon} alt="" />
							</span>
							<span>El. paštu</span>
						</a>
					</div>
				)}
			</div>
		</div>
	);
};
