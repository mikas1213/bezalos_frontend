import type { Dispatch, SetStateAction } from 'react';

export type AuthMode = 'login' | 'signup' | 'forgot' | 'forgotSuccess';
export interface AuthActions {
	title: string;
	subTitle: string;
	btnLabel: string;
	authCta: string;
	authCtaBtn: string;
	authAction: AuthMode;
}

export interface AuthenticationContextValue {
	authMode: AuthMode;
	authActions: Record<AuthMode, AuthActions>;
	setAuthMode: Dispatch<SetStateAction<AuthMode>>;
}
