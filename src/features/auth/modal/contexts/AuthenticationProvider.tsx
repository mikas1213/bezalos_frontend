import type { ReactNode } from 'react';
import { useState } from 'react';

import type { AuthenticationContextValue, AuthMode } from './authentication.types';
import { AuthenticationContext } from './AuthenticationContext';

export const AuthenticationProvider = ({ children }: { children: ReactNode }) => {
	const [authMode, setAuthMode] = useState<AuthMode>('login');
	const [userEmail, setUserEmail] = useState<string | null>(null);
	const [lockoutExpiresAt, setLockoutExpiresAt] = useState<number | null>(null);

	const value: AuthenticationContextValue = {
		authMode,
		setAuthMode,
		userEmail,
		setUserEmail,
		lockoutExpiresAt,
		setLockoutExpiresAt,
	};

	return (
		<AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>
	);
};
