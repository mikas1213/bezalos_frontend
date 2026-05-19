import { useContext, useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { axiosPrivate } from '../api/axios';
import Spinner from '../components/UI/Spinner';
import { useAuth } from '../features/auth';
import { useAuthModal } from '../features/auth';
import type { PaslaugaDto } from '../features/client/paslaugos/services/paslaugosService';

import { PaymentContext } from './PaymentContext';

const CheckoutOverlay = () => (
	<div
		style={{
			position: 'fixed',
			inset: 0,
			zIndex: 9999,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			pointerEvents: 'all',
		}}
	>
		<Spinner />
	</div>
);

interface PlanData {
	plan_price: string;
	plan_name: string;
	plan_name_lt: string;
	plan_period: string;
	price: string;
}

interface PendingCheckout {
	type: 'subscription' | 'service';
	planData?: PlanData;
	serviceData?: {
		service: Record<string, unknown>;
		code: string;
		isCodeApproved: boolean;
	};
}

const plans: Record<string, Record<string, PlanData>> = {
	month: {
		profilis: {
			plan_price: 'profilis_month',
			plan_name: 'profilis',
			plan_name_lt: 'Profilis',
			plan_period: 'mėnesiui',
			price: '6,90',
		},
		virtuve: {
			plan_price: 'virtuve_month',
			plan_name: 'virtuve',
			plan_name_lt: 'Virtuvė',
			plan_period: 'mėnesiui',
			price: '16,90',
		},
	},
	year: {
		profilis: {
			plan_price: 'profilis_year',
			plan_name: 'profilis',
			plan_name_lt: 'Profilis',
			plan_period: 'metams',
			price: '69,90',
		},
		virtuve: {
			plan_price: 'virtuve_year',
			plan_name: 'virtuve',
			plan_name_lt: 'Virtuvė',
			plan_period: 'metams',
			price: '99,90',
		},
	},
};

export const PaymentProvider = () => {
	const { user } = useAuth();
	const { authOpenModal } = useAuthModal();

	const user_role = user?.user_role;
	const user_id = user?.user_id ?? '';

	const [period, setPeriod] = useState<string>('month');
	const [variant, setVariant] = useState<string>('virtuve');
	const [isLoading, setIsLoading] = useState(false);
	const selectedPlan = plans[period][variant];
	const plan = plans[period];

	// Ref to store pending checkout - survives re-renders
	const pendingCheckoutRef = useRef<PendingCheckout | null>(null);
	const wasWaitingForLogin = useRef(false);

	// Execute subscription checkout
	const executeSubscriptionCheckout = async (planData: PlanData) => {
		try {
			setIsLoading(true);
			const res = await axiosPrivate.post('/payments/checkout-session', { ...planData, user_id });
			window.location.href = res.data.session.url;
		} catch (err) {
			setIsLoading(false);
		}
	};

	// Execute service checkout
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
		} catch (err) {
			setIsLoading(false);
		}
	};

	const handleSubscriptionCheckout = async () => {
		if (!user_id) {
			// Store pending checkout and open auth modal
			pendingCheckoutRef.current = { type: 'subscription', planData: selectedPlan };
			wasWaitingForLogin.current = true;
			authOpenModal('auth');
			return;
		}
		await executeSubscriptionCheckout(selectedPlan);
	};

	const handleServiceCheckout = async (paslauga: PaslaugaDto, code = '', isCodeApproved = false) => {
		const service = { ...paslauga } as Record<string, unknown>;
		delete service.image_s;
		delete service.image_m;
		delete service.image_l;

		if (!user_id) {
			// Store pending checkout and open auth modal
			pendingCheckoutRef.current = { type: 'service', serviceData: { service, code, isCodeApproved } };
			wasWaitingForLogin.current = true;
			authOpenModal('auth');
			return;
		}
		await executeServiceCheckout(service, code, isCodeApproved);
	};

	// Execute pending checkout when user becomes available
	useEffect(() => {
		if (user_id && wasWaitingForLogin.current && pendingCheckoutRef.current) {
			const pending = pendingCheckoutRef.current;
			pendingCheckoutRef.current = null;
			wasWaitingForLogin.current = false;

			if (pending.type === 'subscription' && pending.planData) {
				executeSubscriptionCheckout(pending.planData);
			} else if (pending.type === 'service' && pending.serviceData) {
				const { service, code, isCodeApproved } = pending.serviceData;
				executeServiceCheckout(service, code, isCodeApproved);
			}
		}
	}, [user_id]);

	return (
		<PaymentContext.Provider
			value={{ isLoading, period, setPeriod, variant, setVariant, plan, handleSubscriptionCheckout, handleServiceCheckout }}
		>
			{isLoading && <CheckoutOverlay />}
			<Outlet />
		</PaymentContext.Provider>
	);
};

export const usePayment = () => {
	const context = useContext(PaymentContext);
	if (context === undefined) throw new Error('PaymentContext was used outside of the PaymentProvider');
	return context;
};
