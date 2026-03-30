import { useQuery } from '@tanstack/react-query';

import { virtuveFiltersService } from '../service/virtuveFiltersService';
import type { FiltersDto } from '../types';

export const useVirtuveFilters = () => {
	return useQuery<FiltersDto>({
		queryKey: ['filters'],
		queryFn: () => virtuveFiltersService.getVirtuveFilters(),
		placeholderData: (previousData: FiltersDto | undefined) => previousData,
		staleTime: 24 * 60 * 60 * 1000,
	});
};
