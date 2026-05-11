import type { AxiosResponse } from 'axios';

import { axiosPrivate, axiosPublic } from '../../api/axios';

import type { Feature, TagMutationDto, TagsRequestDto, TagsResponseDto } from './types';

class TagsService {
	async getTags(feature: Feature): Promise<TagsResponseDto> {
		const response = await axiosPublic.post<TagsResponseDto, AxiosResponse<TagsResponseDto>, TagsRequestDto>('/tags', {
			feature,
		});
		return response.data;
	}

	async addTag(payload: TagMutationDto): Promise<void> {
		await axiosPrivate.post('/tags/tag', payload);
	}

	async deleteTag(payload: TagMutationDto): Promise<void> {
		await axiosPrivate.delete('/tags/tag', { data: payload });
	}
}

export const tagsService = new TagsService();
