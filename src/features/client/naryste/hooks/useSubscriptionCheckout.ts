import { useEffect, useRef, useState } from 'react';

import { axiosPrivate } from '../../../../api/axios';
import { useAuth } from '../../../auth';
import { useAuthModal } from '../../../auth';

import type { PendingCheckout, Period, PlanData, UseSubscriptionCheckoutReturn, Variant } from './types';
import { plans } from './types';

export const useSubscriptionCheckout = (): UseSubscriptionCheckoutReturn => {
	const { user } = useAuth();
	const { authOpenModal } = useAuthModal();

	const user_id = user?.user_id ?? '';
	const hasUserSubscription: boolean = user?.user_s_subscription ?? false;
	const [loadingVariant, setLoadingVariant] = useState<Variant | null>(null);
	const currentPeriodEnd = user?.current_period_end;
	const subscriptionPlan = user?.u_status;

	const pendingCheckoutRef = useRef<PendingCheckout | null>(null);
	const wasWaitingForLogin = useRef(false);

	const executeSubscriptionCheckout = async (planData: PlanData, variant: Variant) => {
		try {
			setLoadingVariant(variant);
			const res = await axiosPrivate.post('/payments/checkout-session', { ...planData, user_id });
			window.location.href = res.data.session.url;
		} catch {
			setLoadingVariant(null);
		}
	};

	const executeCustomerPortal = async (): Promise<void> => {
		try {
			const res = await axiosPrivate.post('/payments/customer-portal-session');
			window.location.href = res.data.session.url;
		} catch {
			// silent — portal redirect is best-effort
		}
	};

	const handleSubscriptionCheckout = async (period: Period, variant: Variant): Promise<void> => {
		if (!user_id) {
			pendingCheckoutRef.current = { planData: plans[period][variant] };
			wasWaitingForLogin.current = true;
			authOpenModal('auth');
			return;
		}
		await executeSubscriptionCheckout(plans[period][variant], variant);
	};

	useEffect(() => {
		if (user_id && wasWaitingForLogin.current && pendingCheckoutRef.current) {
			const pending = pendingCheckoutRef.current;
			pendingCheckoutRef.current = null;
			wasWaitingForLogin.current = false;

			if (hasUserSubscription) {
				executeCustomerPortal();
			} else if (pending.planData) {
				executeSubscriptionCheckout(pending.planData, pending.planData.plan_name as Variant);
			}
		}
	}, [user_id]);

	return { handleSubscriptionCheckout, loadingVariant, hasUserSubscription, currentPeriodEnd, subscriptionPlan };
};
