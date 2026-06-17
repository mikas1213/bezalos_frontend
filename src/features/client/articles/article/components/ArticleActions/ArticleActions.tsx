import { useEffect, useRef, useState } from 'react';

import { Heart, Link2, Share2 } from 'lucide-react';

import type { Article } from '../../../articles/services/articlesService';
import envelopeIcon from '../../../instructions/assets/icons/social/envelope.svg';
import facebookIcon from '../../../instructions/assets/icons/social/facebook.svg';
import instagramIcon from '../../../instructions/assets/icons/social/instagram.svg';
import { useArticleLike } from '../../hooks';

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
		<div className="bz-article-actions">
			<button type="button" className={`bz-like ${liked ? 'on' : ''}`} onClick={toggle} aria-pressed={liked}>
				<Heart size={20} fill={liked ? 'currentColor' : 'none'} />
				<span>Patinka</span>
				<span className="bz-like-count">{likeCount}</span>
			</button>

			<div className="bz-share-wrap" ref={shareRef}>
				<button
					type="button"
					className={`bz-share-btn ${shareOpen ? 'on' : ''}`}
					onClick={() => setShareOpen((open) => !open)}
				>
					<Share2 size={18} />
					<span>Dalintis</span>
				</button>

				{shareOpen && (
					<div className="bz-share-menu">
						<button type="button" className="bz-share-item" onClick={copyLink}>
							<span className="bz-share-ico">
								<Link2 size={18} />
							</span>
							<span>{copied ? 'Nuoroda nukopijuota!' : 'Kopijuoti nuorodą'}</span>
						</button>
						<a className="bz-share-item" href="#" onClick={(e) => e.preventDefault()}>
							<span className="bz-share-ico">
								<img src={facebookIcon} alt="" />
							</span>
							<span>Facebook</span>
						</a>
						<a className="bz-share-item" href="#" onClick={(e) => e.preventDefault()}>
							<span className="bz-share-ico">
								<img src={instagramIcon} alt="" />
							</span>
							<span>Instagram</span>
						</a>
						<a className="bz-share-item" href="#" onClick={(e) => e.preventDefault()}>
							<span className="bz-share-ico">
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
