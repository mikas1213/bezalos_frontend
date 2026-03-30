import { axiosPrivate, axiosPublic } from '../../../../api/axios';
import type { VideoPageDto, VideosPageDto, VirtuveFilterParams } from '../types';

class VirtuveService {
	async getVideos(params: VirtuveFilterParams & { page?: number } = {}): Promise<VideosPageDto> {
		const response = await axiosPublic.get('/virtuve', { params });
		return response.data;
	}

	async getOneVideo(slug: string | undefined): Promise<VideoPageDto> {
		const response = await axiosPrivate.get<VideoPageDto>(`/virtuve/${slug}`);
		return response.data;
	}

	async updateVideoViews(id: string | undefined, isSnippet: boolean | undefined) {
		const response = await axiosPublic.post(`virtuve/${id}`, {
			isSnippet,
		});

		return response.data;
	}
}

export const virtuveService = new VirtuveService();
