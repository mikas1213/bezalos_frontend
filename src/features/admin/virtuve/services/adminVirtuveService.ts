import { axiosPrivate } from '../../../../api/axios';
import type { AdmninVirtuveDto } from '../types';
import type { DeletePayload } from '../types';

class AdminVirtuveService {
	async getAllVideos(): Promise<AdmninVirtuveDto[]> {
		const response = await axiosPrivate.get<AdmninVirtuveDto[]>('/admin/virtuve');
		return response.data;
	}

	async uploadVideo() {}

	async deleteVideo({ videoId, imageS3Key, videoS3Key, videoS3SnippetKey }: DeletePayload): Promise<void> {
		await axiosPrivate.delete<void, void, Omit<DeletePayload, 'videoId'>>(`/admin/virtuve/${videoId}`, {
			data: {
				imageS3Key,
				videoS3Key,
				videoS3SnippetKey,
			},
		});
	}
}

export const adminVirtuveService = new AdminVirtuveService();
