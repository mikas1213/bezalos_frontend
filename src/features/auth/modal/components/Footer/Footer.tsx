import type { ReactNode } from 'react';

import cx from 'classnames';
import { ArrowLeft } from 'lucide-react';

import { Cluster } from '../../../../../components/Shared';
import type { AuthMode } from '../../contexts/authentication.types';
import { useAuthentication } from '../../hooks/useAuthentication';

import styles from './Footer.module.scss';
export const Footer = ({ children }: { children: ReactNode }) => {
	return (
		<Cluster className={styles.footer} justify="center">
			{children}
		</Cluster>
	);
};

interface FooterProps {
	footerLabel: string;
	actionLabel: string;
	mode: AuthMode;
}
const SwitchAuth = ({ footerLabel, actionLabel, mode }: FooterProps) => {
	const { authMode, setAuthMode } = useAuthentication();
	return (
		<p className={styles.switchAuth}>
			<span>{footerLabel}</span>{' '}
			<button
				type="button"
				onClick={() => setAuthMode(mode)}
				className={cx(
					styles.switchAuthButton,
					['loginDenied', 'signupDenied'].includes(authMode) && styles.denied,
				)}
			>
				{actionLabel}
			</button>
		</p>
	);
};

const BackToLogin = ({ actionLabel, mode }: Omit<FooterProps, 'footerLabel'>) => {
	const { setAuthMode } = useAuthentication();
	return (
		<button type="button" onClick={() => setAuthMode(mode)} className={styles.backToLogin}>
			<ArrowLeft size={16} />
			{actionLabel}
		</button>
	);
};

Footer.SwitchAuth = SwitchAuth;
Footer.BackToLogin = BackToLogin;
