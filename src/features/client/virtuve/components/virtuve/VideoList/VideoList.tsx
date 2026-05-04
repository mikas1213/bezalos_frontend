import { Film } from 'lucide-react';

import { VideoCard } from '../VideoCard';

import type { VideoListProps } from './types';

import styles from './VideoList.module.scss';

export const VideoList = ({
	videos,
	isPending,
	isFetching,
	hasNextPage,
	isFetchingNextPage,
	onLoadMore,
}: VideoListProps) => {
	if (isFetching && isPending) {
		return <div className={styles.state}>Kraunama...</div>;
	}

	if (videos.length === 0) {
		return (
			<div className={styles.state}>
				<Film color="var(--cool-grey-green-100)" size={100} />
				<h1 style={{ color: 'var(--cool-grey-green-200)' }}>Video įrašų nerasta</h1>
			</div>
		);
	}

	const newestSlug = videos.reduce((newest, video) =>
		new Date(video.created_at) > new Date(newest.created_at) ? video : newest
	).slug;

	return (
		<div className={styles.wrapper}>
			<div className={styles.grid}>
				{videos.map((video, index) => (
					<VideoCard key={video.slug} video={video} index={index} isNew={video.slug === newestSlug} />
				))}
			</div>

			{hasNextPage && (
				<div className={styles.loadMore}>
					<button
						type="button"
						className={styles.loadMoreBtn}
						onClick={onLoadMore}
						disabled={isFetchingNextPage}
					>
						{isFetchingNextPage ? 'Kraunama...' : 'Rodyti daugiau'}
					</button>
				</div>
			)}
		</div>
	);
};
