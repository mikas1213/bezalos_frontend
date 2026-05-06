import { useQuery } from '@tanstack/react-query';

import { tagsService } from '../../services/tagsService/tagsService';
import type { Feature, TagsResponseDto } from '../../services/tagsService/types';
export const useTags = (feature: Feature) => {
	return useQuery<TagsResponseDto>({
		queryKey: ['tags'],
		queryFn: () => tagsService.getTags(feature),
		placeholderData: (previousData: TagsResponseDto | undefined) => previousData,
		staleTime: 24 * 60 * 60 * 1000,
	});
};
