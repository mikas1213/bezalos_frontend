import type { Dispatch, SetStateAction } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import type { PaslaugaDto } from '../services/paslaugosService';
import { paslaugosService } from '../services/paslaugosService';

const usePaslauga = (slug: string | undefined) => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const queryKey = ['paslauga', slug];

	const {
		data: paslauga,
		isLoading,
		isError,
	} = useQuery({
		queryKey,
		queryFn: () => paslaugosService.getPaslauga(slug),
		enabled: !!slug,
	});

	const setPaslauga: Dispatch<SetStateAction<PaslaugaDto | undefined>> = (updater) => {
		queryClient.setQueryData<PaslaugaDto>(queryKey, (prev) => (typeof updater === 'function' ? updater(prev) : updater));
	};

	useEffect(() => {
		if (isError || (!isLoading && !paslauga)) {
			navigate('/paslaugos');
		}
	}, [isError, isLoading, paslauga, navigate]);

	return { paslauga, setPaslauga, isLoading };
};

export default usePaslauga;
