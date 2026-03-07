import type { Video } from '../../types';
import styles from './VideoCard.module.scss';

interface VideoCardProps {
	video: Video;
}

const formatDuration = (seconds: number) => {
	const m = Math.floor(seconds / 60);
	const s = seconds % 60;
	return `${m}:${String(s).padStart(2, '0')}`;
};

export const VideoCard = ({ video }: VideoCardProps) => {
	return (
		<article className={styles.card}>
			<div className={styles.thumbnail}>
				{video.image_s3_key ? (
					<img src={video.image_s3_key} alt={video.title} />
				) : (
					<div className={styles.thumbnailPlaceholder} />
				)}
				{video.duration && (
					<span className={styles.duration}>{formatDuration(video.duration)}</span>
				)}
			</div>
			<div className={styles.body}>
				{video.category && <span className={styles.category}>{video.category}</span>}
				<h3 className={styles.title}>{video.title}</h3>
				{video.participants && <p className={styles.participants}>{video.participants}</p>}
			</div>
			<div className={styles.footer}>
				<span>{video.play_count} peržiūrų</span>
				<span>{video.comment_count} komentarų</span>
				<span>{video.likes_count} patinka</span>
			</div>
		</article>
	);
};
