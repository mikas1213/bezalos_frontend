export type Period = 'month' | 'year';
export type Variant = 'profilis' | 'virtuve' | 'virtuve_plus';

export interface PlanData {
	plan_price: string;
	plan_name: string;
	plan_name_lt: string;
	plan_period: string;
	price: string;
}
export interface PendingCheckout {
	planData?: PlanData;
}
export const plans: Record<string, Record<string, PlanData>> = {
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
		virtuve_plus: {
			plan_price: 'virtuve_plus',
			plan_name: 'virtuve_plus',
			plan_name_lt: 'Virtuvė Plus',
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

export interface UseSubscriptionCheckoutReturn {
	handleSubscriptionCheckout: (p: Period, v: Variant) => Promise<void>;
	loadingVariant: Variant | null;
	hasUserSubscription: boolean;
	currentPeriodEnd: string | undefined;
	subscriptionPlan: string | undefined;
}
