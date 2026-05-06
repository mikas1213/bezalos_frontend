import { axiosPrivate } from '../../../../api/axios';
import type { AdmninVirtuveDto } from '../types';

class AdminVirtuveService {
	async getAllVideos(): Promise<AdmninVirtuveDto[]> {
		const response = await axiosPrivate.get<AdmninVirtuveDto[]>('/admin/virtuve');
		return response.data;
	}

	async uploadVideo() {}

	async deleteVideo(video: AdmninVirtuveDto): Promise<void> {
		await axiosPrivate.delete(`/admin/virtuve/${video.id}`, {
			data: {
				videoS3Key: video.videoS3Key,
				imageS3Key: video.imageS3Key,
			},
		});
	}
}

export const adminVirtuveService = new AdminVirtuveService();
