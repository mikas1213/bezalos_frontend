import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { useAuth } from '../../../auth';
import type { UserData } from '../../../auth/core/services';
import { virtuveService } from '../service/virtuveService';
import type { VideoPageDto } from '../types';
import { queryKeys } from '../utils/queryKeys';

export const useVirtuveVideoPage = (
	user: UserData | null,
	slug: string | undefined,
): UseQueryResult<VideoPageDto, Error> => {
	const { isLoading } = useAuth();

	return useQuery({
		queryKey: queryKeys.video(slug, user),
		queryFn: () => virtuveService.getOneVideo(slug),
		enabled: !isLoading,
	});
};
