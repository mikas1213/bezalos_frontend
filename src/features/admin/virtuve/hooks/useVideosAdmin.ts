import { useQuery } from '@tanstack/react-query';

import { adminVirtuveService } from '../services/adminVirtuveService';
import type { AdmninVirtuveDto } from '../types';

const useVideosAdmin = () => {
	return useQuery<AdmninVirtuveDto[]>({
		queryKey: ['admin-videos'],
		queryFn: () => adminVirtuveService.getAllVideos(),
		retry: false,
	});
};

export default useVideosAdmin;
