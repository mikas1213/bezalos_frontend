import { axiosPublic } from '../../../../api/axios';
import type { Video } from '../types';

export interface VirtuveParams {
	c?: string;
	f?: string;
	s?: string;
}

export const virtuveService = {
	async getVideos(params: VirtuveParams = {}): Promise<Video[]> {
		const response = await axiosPublic.get('/virtuve/videos', { params });
		return response.data;
	},
};
