import { useEffect, useRef, useState } from 'react';

import { axiosPrivate } from '../../../../api/axios';
import { useAuth, useAuthModal } from '../../../auth';
import type { PaslaugaDto } from '../services/paslaugosService';
type HandleServiceCheckoutFn = (paslauga: PaslaugaDto, code?: string, isCodeApproved?: boolean) => Promise<void>;

interface UsePaslaugaCheckoutReturn {
	isLoading: boolean;
	handleServiceCheckout: HandleServiceCheckoutFn;
}

interface PendingCheckout {
	service: Record<string, unknown>;
	code: string;
	isCodeApproved: boolean;
}

export const usePaslaugaCheckout = (): UsePaslaugaCheckoutReturn => {
	const { user } = useAuth();
	const { authOpenModal } = useAuthModal();

	const user_role = user?.user_role;
	const user_id = user?.user_id ?? '';

	const [isLoading, setIsLoading] = useState(false);
	const pendingCheckoutRef = useRef<PendingCheckout | null>(null);
	const wasWaitingForLogin = useRef(false);

	const executeServiceCheckout = async (service: Record<string, unknown>, code: string, isCodeApproved: boolean) => {
		try {
			setIsLoading(true);
			const res = await axiosPrivate.post('/payments/service-checkout-session', {
				user_role,
				user_id,
				service,
				code,
				isCodeApproved,
			});
			window.location.href = res.data.session.url;
		} catch {
			setIsLoading(false);
		}
	};

	const handleServiceCheckout = async (paslauga: PaslaugaDto, code = '', isCodeApproved = false) => {
		const service = { ...paslauga } as Record<string, unknown>;
		delete service.image_s;
		delete service.image_m;
		delete service.image_l;

		if (!user_id) {
			// Store pending checkout and open auth modal
			pendingCheckoutRef.current = { service, code, isCodeApproved };
			wasWaitingForLogin.current = true;
			authOpenModal('auth');
			return;
		}
		await executeServiceCheckout(service, code, isCodeApproved);
	};

	useEffect(() => {
		if (user_id && wasWaitingForLogin.current && pendingCheckoutRef.current) {
			const pending = pendingCheckoutRef.current;
			pendingCheckoutRef.current = null;
			wasWaitingForLogin.current = false;

			if (pending) {
				const { service, code, isCodeApproved } = pending;
				executeServiceCheckout(service, code, isCodeApproved);
			}
		}
	}, [user_id]);

	return { handleServiceCheckout, isLoading };
};
