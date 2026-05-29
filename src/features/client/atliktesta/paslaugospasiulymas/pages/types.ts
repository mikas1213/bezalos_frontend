import type { LucideIcon } from 'lucide-react';

import { COOKIES, type CookieValues } from '../../../../../constants/cookies';

type Good = typeof COOKIES.TEST_RESULT.values.good;
type RawServiceType = CookieValues[typeof COOKIES.TEST_RESULT.name];
export type ServiceType = Exclude<RawServiceType, Good>;

interface Stat {
	value: string;
	label: string;
}

interface Feature {
	icon: LucideIcon;
	title: string;
	desc: string;
}

interface Service {
	title: string;
	subtitle: string;
	stats: Stat[];
	icon: string;
	tagline: string;
	description: string;
	mainBenefits: string[];
	features: Feature[];
	price: string;
	priceIcon: LucideIcon;
	duration: string;
	codeDesc: string;
	code: string;
	trustSignals: string[];
	url: string;
}

export type Services = Record<ServiceType, Service>;
