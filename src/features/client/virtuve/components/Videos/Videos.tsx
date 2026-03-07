import type { Video } from '../../types';
import { VideoCard } from '../VideoCard';
import styles from './Videos.module.scss';

interface VideosProps {
	videos: Video[];
	isLoading: boolean;
}

export const Videos = ({ videos, isLoading }: VideosProps) => {
	if (isLoading) {
		return <div className={styles.state}>Kraunama...</div>;
	}

	if (videos.length === 0) {
		return <div className={styles.state}>Įrašų nerasta</div>;
	}

	return (
		<div className={styles.grid}>
			{videos.map(video => (
				<VideoCard key={video.slug} video={video} />
			))}
		</div>
	);
};
