import type { Dispatch, SetStateAction } from 'react';

export type AuthMode =
	| 'login'
	| 'loginDenied'
	| 'loginAgain'
	| 'forgot'
	| 'forgotSuccess'
	| 'signup'
	| 'signupSuccess'
	| 'signupDenied'
	| 'initialTarget'
	| 'signupAgain';

export interface AuthenticationContextValue {
	authMode: AuthMode;
	setAuthMode: Dispatch<SetStateAction<AuthMode>>;
	userEmail: string | null;
	setUserEmail: Dispatch<SetStateAction<string | null>>;
	lockoutExpiresAt: number | null;
	setLockoutExpiresAt: Dispatch<SetStateAction<number | null>>;
}
