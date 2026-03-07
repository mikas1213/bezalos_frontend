import { useQuery } from '@tanstack/react-query';
import { virtuveService } from '../service/virtuveService';
import type { VirtuveParams } from '../service/virtuveService';

export const useAllVirtuveVideos = () => {
	return useQuery({
		queryKey: ['virtuve', 'videos', 'all'],
		queryFn: () => virtuveService.getVideos(),
		staleTime: 5 * 60 * 1000,
	});
};

export const useVirtuveVideos = (params: VirtuveParams) => {
	return useQuery({
		queryKey: ['virtuve', 'videos', params],
		queryFn: () => virtuveService.getVideos(params),
	});
};
