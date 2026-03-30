import { useInfiniteQuery } from '@tanstack/react-query';

import { virtuveService } from '../service/virtuveService';
import type { VirtuveFilterParams } from '../types';

export const useVirtuvePage = (params: VirtuveFilterParams) => {
	const query = useInfiniteQuery({
		queryKey: ['videos', params],
		queryFn: ({ pageParam }) => virtuveService.getVideos({ ...params, page: pageParam }),
		placeholderData: (previousData) => previousData,
		initialPageParam: 1,
		getNextPageParam: (lastPage) => {
			const page = Number(lastPage.page);
			const loaded = page * lastPage.limit;
			return loaded < lastPage.total ? page + 1 : undefined;
		},
	});

	const videos = query.data?.pages.flatMap((page) => page.data) ?? [];
	const videosTotal = query.data?.pages[0]?.total ?? 0;
	const videosDisplayed = videos.length;

	return {
		...query,
		videos,
		videosTotal,
		videosDisplayed,
	};
};
