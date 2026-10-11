import type { UserData } from '../services';

/**
 * Ar vartotojas turi aktyvią prenumeratą: per Stripe (`user_s_subscription`)
 * arba priskirtą rankiniu būdu (`user_subscription`).
 */
export const hasActiveSubscription = (user: UserData | null | undefined): boolean =>
	Boolean(user?.user_s_subscription || user?.user_subscription);
