import { useQuery } from '@tanstack/react-query';

import type { PaslaugaDto } from '../services/paslaugosService';
import { paslaugosService } from '../services/paslaugosService';

const usePaslaugos = () => {
	return useQuery<PaslaugaDto[]>({
		queryKey: ['services'],
		queryFn: () => paslaugosService.getPaslaugos(),
		staleTime: 5 * 60 * 1000,
		retry: false,
	});
};

export default usePaslaugos;
