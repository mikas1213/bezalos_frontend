import type { ReactNode } from 'react';
import { useState } from 'react';

import type { AuthActions, AuthenticationContextValue, AuthMode } from './authentication.types';
import { AuthenticationContext } from './AuthenticationContext';

export const AuthenticationProvider = ({ children }: { children: ReactNode }) => {
	const [authMode, setAuthMode] = useState<AuthMode>('login');

	const authActions: Record<AuthMode, AuthActions> = {
		login: {
			title: 'Sveiki sugrįžę',
			subTitle: 'Prisijunkite prie savo paskyros',
			btnLabel: 'Prisijungti',
			authCta: 'Neturite paskyros?',
			authCtaBtn: 'Registruotis',
			authAction: 'signup',
		},
		forgotSuccess: {
			title: '',
			subTitle: '',
			btnLabel: '',
			authCta: '',
			authCtaBtn: '',
			authAction: 'forgotSuccess',
		},
		signup: {
			title: 'Pradėkime',
			subTitle: 'Užpildykite registracijos formą',
			btnLabel: 'Tęsti',
			authCta: 'Jau turite paskytą?',
			authCtaBtn: 'Prisijungti',
			authAction: 'login',
		},
		forgot: {
			title: 'Pamiršote slaptažodį?',
			subTitle:
				'Įveskite savo el. pašto adresą ir mes atsiųsime nuorodą slaptažodžiui atkurti',
			btnLabel: 'Siųsti nuorodą',
			authCta: 'Grįžti į',
			authCtaBtn: 'Prisijungimą',
			authAction: 'login',
		},
	};

	const value: AuthenticationContextValue = {
		authMode,
		authActions,
		setAuthMode,
	};

	return (
		<AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>
	);
};
