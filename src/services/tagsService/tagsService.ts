import type { AxiosResponse } from 'axios';

import { axiosPublic } from '../../api/axios';

import type { Feature, TagsRequestDto, TagsResponseDto } from './types';

class TagsService {
	async getTags(feature: Feature): Promise<TagsResponseDto> {
		const response = await axiosPublic.post<TagsResponseDto, AxiosResponse<TagsResponseDto>, TagsRequestDto>('/tags', {
			feature,
		});
		return response.data;
	}
}

export const tagsService = new TagsService();
