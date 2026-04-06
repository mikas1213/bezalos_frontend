import cx from 'classnames';
import { Check, CirclePlay, CircleX, Heart, MessageCircle } from 'lucide-react';

import type { VideoRowProps } from './types';

import styles from './VideoRow.module.scss';
export const VideoRow = ({ video, setIsModalOpen, setFormValues, handleDeleteVideo }: VideoRowProps) => {
	const created_video = new Date(Date.parse(video.createdAt)).toLocaleString('lt-LT', {
		year: 'numeric',
		day: 'numeric',
		month: 'numeric',
	});

	return (
		<div className={cx(styles.row, styles.video)}>
			<img
				src={`https://bezalos.s3.us-east-1.amazonaws.com/${video.imageS3Key}`}
				className={styles.image}
				alt={video.title}
			/>

			<div
				className={`${styles.section} ${styles.title}`}
				onClick={() => {
					setIsModalOpen({ isOpen: true, action: 'update' });
					setFormValues({ ...video, action: 'update' });
				}}
			>
				<span>{video.title}</span>
			</div>

			<div className={styles.section}>{video.category}</div>

			<div className={styles.section}>{video.duration}</div>

			<div className={styles.section}>{created_video}</div>

			<div className={`${styles.section} ${styles.likes}`}>
				<Heart className={`${styles.icon} ${video.likesCount > 0 ? styles.liked : ''}`} />
				<span className={styles.value}>{video.likesCount}</span>
			</div>

			<div className={cx(styles.section, styles.playCountSection)}>
				<div className={styles.playCount}>
					<CirclePlay className={styles.icon} />
					<span className={styles.value}>{video.viewsSnippet}</span>
				</div>

				<div className={styles.divider}></div>
				<div className={styles.playCount}>
					<span className={styles.value}>{video.viewsFull}</span>
				</div>
			</div>

			<div className={`${styles.section} ${styles.center} ${styles.comments}`}>
				<MessageCircle className={`${styles.icon} ${video.commentsCount > 0 ? styles.filled : ''}`} />
				<span className={styles.value}>{video.commentsCount}</span>
			</div>

			<div className={`${styles.section} ${styles.center}`}>
				<span>
					{video.isActive ? (
						<Check className={`${styles.icon} ${styles.green}`} />
					) : (
						<CircleX className={`${styles.icon} ${styles.red}`} />
					)}
				</span>
			</div>

			<div
				className={`${styles.section} ${styles.deleteVideo}`}
				onClick={() => {
					const is_delete = window.confirm('Trinti paslaugą?');
					if (is_delete) {
						handleDeleteVideo.mutate(video);
					}
				}}
			>
				<CircleX className={styles.icon} />
			</div>
		</div>
	);
};

export const VideoRowHeader = () => {
	return (
		<div className={cx(styles.row, styles.header)}>
			<div className={styles.headerSection}></div>
			<div className={styles.headerSection}>Video</div>
			<div className={styles.headerSection}>Kategorija</div>
			<div className={styles.headerSection}>Trukmė</div>
			<div className={styles.headerSection}>Įkelta</div>
			<div className={styles.headerSection}>Likes</div>
			<div className={styles.headerSection}>Peržiūros</div>
			<div className={`${styles.headerSection} ${styles.center}`}>Komentarai</div>
			<div className={`${styles.headerSection} ${styles.center}`}>Aktyvus</div>
			<div className={styles.headerSection}></div>
		</div>
	);
};
