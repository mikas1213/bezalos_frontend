import { useState } from 'react';

import { Container } from '../../../../../components/Shared';
import { Header, VideoList } from '../../components/virtuve';
import { useVirtuvePage } from '../../hooks/useVirtuvePage';

export const VirtuvePage = () => {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [selectedTag, setSelectedTag] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState('');

	const params = {
		...(selectedCategory ? { c: selectedCategory } : {}),
		...(selectedTag ? { f: selectedTag } : {}),
		...(searchQuery ? { s: searchQuery } : {}),
	};

	const {
		videos,
		videosTotal,
		videosDisplayed,
		isPending,
		isFetching,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
	} = useVirtuvePage(params);

	const handleTagChange = (tag: string | null) => {
		setSelectedTag((prev) => (prev === tag ? null : tag));
	};

	return (
		<Container as="section" maxWidth="var(--content-width)">
			<Header
				videosTotal={videosTotal}
				videosDisplayed={videosDisplayed}
				selectedCategory={selectedCategory}
				selectedTag={selectedTag}
				searchQuery={searchQuery}
				onCategoryChange={setSelectedCategory}
				onTagChange={handleTagChange}
				onSearchChange={setSearchQuery}
			/>

			<VideoList
				videos={videos}
				isPending={isPending}
				isFetching={isFetching}
				hasNextPage={!!hasNextPage}
				isFetchingNextPage={isFetchingNextPage}
				onLoadMore={fetchNextPage}
			/>
		</Container>
	);
};

export default VirtuvePage;
