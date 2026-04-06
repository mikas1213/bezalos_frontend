import { axiosPrivate } from '../../../../api/axios';
import type { AdmninVirtuveDto } from '../types';

class AdminVirtuveService {
	async getAllVideos(): Promise<AdmninVirtuveDto[]> {
		const response = await axiosPrivate.get<AdmninVirtuveDto[]>('/admin/virtuve');
		return response.data;
	}

	async uploadVideo() {}
}

export const adminVirtuveService = new AdminVirtuveService();
