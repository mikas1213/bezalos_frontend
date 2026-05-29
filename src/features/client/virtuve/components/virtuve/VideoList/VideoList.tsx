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
	pageSize,
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

	const thirtyDaysAgo = new Date();
	thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

	return (
		<div className={styles.wrapper}>
			<div className={styles.grid}>
				{videos.map((video, index) => (
					<VideoCard
						key={video.slug}
						video={video}
						index={index % pageSize}
						isNew={new Date(video.created_at) >= thirtyDaysAgo}
					/>
				))}
			</div>

			{(hasNextPage || isFetchingNextPage) && (
				<div className={styles.loadMore}>
					{isFetchingNextPage ? (
						<span style={{ color: 'var(--color-text-grey)', fontSize: 'var(--font-16)' }}>Kraunama...</span>
					) : (
						<button type="button" className={styles.loadMoreBtn} onClick={onLoadMore}>
							Rodyti daugiau
						</button>
					)}
				</div>
			)}
		</div>
	);
};
