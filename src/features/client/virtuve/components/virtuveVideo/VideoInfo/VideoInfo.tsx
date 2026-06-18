import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import cx from 'classnames';
import { Calendar, CirclePlay, Clock7, Eye, FolderDown, ThumbsUp, Users } from 'lucide-react';

import pdf_1 from '../../../../../../assets/pdf/kodel-as-persivalgau-1.pdf';
import pdf_2 from '../../../../../../assets/pdf/kodel-as-persivalgau-2.pdf';
import pdf_3 from '../../../../../../assets/pdf/kodel-as-persivalgau-3.pdf';
import { Cluster } from '../../../../../../components/Shared';
import { useToggleLike } from '../../../../../../hooks/useToggleLike';
import { useAuthModal } from '../../../../../auth';
import { queryKeys } from '../../../utils/queryKeys';
import { AccessToast } from '../AccessToast';
import { ACCESS_MESSAGES } from '../constants';

import type { VideoInfoProps } from './types';
import { formatLTDate } from './utils';

import styles from './VideoInfo.module.scss';

const pdfs = {
	'kodel-as-persivalgau-1': pdf_1,
	'kodel-as-persivalgau-2': pdf_2,
	'kodel-as-persivalgau-3': pdf_3,
};

export const VideoInfo = ({ user, video, actionAccess }: VideoInfoProps) => {
	const { mutate: toggleLike } = useToggleLike(video.id, 'videos', video.id, queryKeys.video(video.slug, user));
	const { authOpenModal } = useAuthModal();
	const [showMore, setShowMore] = useState(false);
	const navigate = useNavigate();
	const [showToast, setShowToast] = useState<boolean>(false);
	const [toastPosition, setToastPosition] = useState<{ top: number; left?: number; right?: number } | null>(null);

	const [desc1, desc2 = ''] = video.description.split(':');
	const desctList = desc2.trim().split('\n');

	const redirectUrl = video.isCourseMaterial ? '/paslaugos' : '/naryste';
	const forbiddenTitle = ACCESS_MESSAGES.like[actionAccess.forbidden].title;
	const forbiddenDescription = ACCESS_MESSAGES.like[actionAccess.forbidden].desc;

	const handleToggleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!actionAccess.allowed && actionAccess.forbidden === 'login') {
			authOpenModal('auth');
			return;
		} else if (actionAccess.forbidden === 'course' || actionAccess.forbidden === 'subscription') {
			const rect = e.currentTarget.getBoundingClientRect();
			const right = window.innerWidth - rect.right;
			setToastPosition({ top: rect.bottom + window.scrollY, right });
			setShowToast(true);
			return;
		}

		toggleLike();
	};

	return (
		<>
			<div style={{ position: 'relative' }}>
				<Cluster justify="space-between">
					<Cluster className={styles.tags} gap="0.5rem">
						<span className={styles.tag}>{video.category}</span>
						{video.videoTags.map((tag) => (
							<span key={tag} className={styles.tag}>
								{tag}
							</span>
						))}
					</Cluster>

					<button
						type="button"
						className={cx(styles.likeBtn, video.isLiked && styles.active)}
						onClick={handleToggleLike}
					>
						<ThumbsUp />
						{video.likesCount}
					</button>
				</Cluster>

				{toastPosition && (
					<AccessToast
						isOpen={showToast}
						position={toastPosition}
						title={forbiddenTitle}
						description={forbiddenDescription}
						onClose={() => setShowToast(false)}
						onPrimary={() => navigate(redirectUrl)}
					/>
				)}
			</div>

			<div className={styles.titleRow}>
				<h1>{video.title}</h1>
			</div>

			<div className={cx(styles.metaRow, !video.isSnippet && styles.hideMeda)}>
				{video.isSnippet && (
					<>
						<div className={styles.metaLeft}>
							<div className={styles.metaIcone}>
								<CirclePlay size={42} strokeWidth={1} color={'var(--dark-green-500)'} />
							</div>
							<div>
								<p className={styles.metaTitle}>Žiūrite nemokamą ištrauką</p>
								<p className={styles.metaDesc}>
									{video.isCourseMaterial
										? 'Visas video prieinamas tik įsigijus kursą.'
										: 'Pilnas įrašas ir 40+ kitų vebinarų prieinami prenumeratoriams.'}
								</p>
							</div>
						</div>
						<button type="button" onClick={() => navigate(redirectUrl)} className={styles.metaBtn}>
							Įsigyti prieigą
						</button>
					</>
				)}
			</div>

			<div
				className={styles.descriptionContainer}
				onClick={() => {
					if (desc2) {
						setShowMore((show) => !show);
					} else {
						return;
					}
				}}
			>
				<div className={styles.stats}>
					<span className={styles.statsItem}>
						<Eye size={18} color={'var(--dark-green-500)'} />
						{video.viewsTotal}
					</span>
					<span className={styles.dot}>·</span>
					<span className={styles.statsItem}>
						<Calendar size={16} color={'var(--dark-green-500)'} />
						{formatLTDate(video.createdAt)}
					</span>
					<span className={styles.dot}>·</span>
					<span className={styles.statsItem}>
						<Clock7 size={16} color={'var(--dark-green-500)'} />
						{video.duration}
					</span>

					{video.participants && (
						<>
							<span className={styles.dot}>·</span>
							<span className={styles.statsItem}>
								<Users size={16} color={'var(--dark-green-500)'} />
								{video.participants}
							</span>
						</>
					)}
				</div>

				<div>
					{desc1}
					{desc2 && ':'}
				</div>

				<div className={`${styles.description} ${showMore ? styles.show : ''}`}>
					<div className={styles.descriptionInner}>
						<ul className={styles.descList}>
							{desctList.map((listItem, i) => (
								<li key={i}>{listItem}</li>
							))}
						</ul>
						{video.isCourseMaterial && (
							<a
								className={styles.downloadPdf}
								href={pdfs[video.slug as keyof typeof pdfs]}
								download
								onClick={(e) => e.stopPropagation()}
							>
								<FolderDown />
								<span>Atsisiųsti failą</span>
							</a>
						)}
					</div>
				</div>

				{desc2 && (
					<button type="button" className={styles.descToggle}>
						{showMore ? '...mažiau' : '...daugiau'}
					</button>
				)}
			</div>
		</>
	);
};
