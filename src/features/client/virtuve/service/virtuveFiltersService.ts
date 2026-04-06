import { axiosPublic } from '../../../../api/axios';
import type { FiltersDto } from '../types';

class VirtuveFiltersService {
	async getVirtuveFilters(): Promise<FiltersDto> {
		const response = await axiosPublic.get<FiltersDto>('/tags/virtuve');
		return response.data;
	}
}

export const virtuveFiltersService = new VirtuveFiltersService();
