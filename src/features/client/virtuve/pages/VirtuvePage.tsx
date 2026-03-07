import { useMemo, useState } from 'react';

import { Container } from '../../../../components/Shared';
import { Header } from '../components/Header';
import { Videos } from '../components/Videos';
import { useAllVirtuveVideos, useVirtuveVideos } from '../hooks/useVirtuveVideos';

const FIXED_TAGS = ['emocinis valgymas'];

export const VirtuvePage = () => {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [selectedTag, setSelectedTag] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState('');

	const params = {
		...(selectedCategory ? { c: selectedCategory } : {}),
		...(selectedTag ? { f: selectedTag } : {}),
		...(searchQuery ? { s: searchQuery } : {}),
	};

	const { data: allVideos = [] } = useAllVirtuveVideos();
	const { data: filteredVideos = [], isLoading } = useVirtuveVideos(params);

	const categories = useMemo(
		() => [...new Set(allVideos.map((v) => v.category).filter(Boolean))].slice(0, 3),
		[allVideos],
	);

	const tags = useMemo(() => {
		const dynamic = [...new Set(allVideos.flatMap((v) => v.video_tags))]
			.filter((t) => !FIXED_TAGS.includes(t))
			.slice(0, 2);
		return [...FIXED_TAGS, ...dynamic];
	}, [allVideos]);

	const handleTagChange = (tag: string) => {
		setSelectedTag((prev) => (prev === tag ? null : tag));
	};

	return (
		<Container as="section" maxWidth="var(--content-width)">
			<Header
				categories={categories}
				tags={tags}
				selectedCategory={selectedCategory}
				selectedTag={selectedTag}
				searchQuery={searchQuery}
				totalCount={allVideos.length}
				filteredCount={filteredVideos.length}
				onCategoryChange={setSelectedCategory}
				onTagChange={handleTagChange}
				onSearchChange={setSearchQuery}
			/>
			<Videos videos={filteredVideos} isLoading={isLoading} />
		</Container>
	);
};

export default VirtuvePage;
