import type { VideoCard } from '../VideoCard/types';

export interface VideoListProps {
	videos: VideoCard[];
	isPending: boolean;
	isFetching: boolean;
	hasNextPage: boolean;
	isFetchingNextPage: boolean;
	onLoadMore: () => void;
}
