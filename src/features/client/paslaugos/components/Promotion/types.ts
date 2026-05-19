import type { Dispatch, SetStateAction } from 'react';

import type { PaslaugaDto } from '../../services/paslaugosService';
export interface PromotionProps {
	code: string;
	setCode: Dispatch<SetStateAction<string>>;
	paslauga: PaslaugaDto;
	setPaslauga: Dispatch<SetStateAction<PaslaugaDto | undefined>>;
	startPrice: string | undefined;
	isCodeApproved: boolean;
	setIsCodeApproved: Dispatch<SetStateAction<boolean>>;
}
