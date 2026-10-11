import { useQuery } from '@tanstack/react-query';

import { profileService } from '../services/profileService';
import type { Product } from '../types';
import { profileKeys } from '../utils/queryKeys';

const EMPTY_PRODUCTS: Product[] = [];

/** Bendras produktų sąrašas. Keičiasi retai, todėl laikomas šviežiu 30 min. */
export const useProducts = () => {
	const query = useQuery({
		queryKey: profileKeys.products(),
		queryFn: () => profileService.getProducts(),
		staleTime: 30 * 60 * 1000,
	});

	return {
		products: query.data ?? EMPTY_PRODUCTS,
		isLoading: query.isPending,
		isError: query.isError,
		error: query.error,
	};
};
