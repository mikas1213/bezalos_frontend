import cx from 'classnames';
import {
	CircleCheckBig,
	KeyRound,
	Lock,
	LockOpen,
	type LucideIcon,
	MailCheck,
	UserCheck,
	UserPlus,
} from 'lucide-react';

import { Box, Cluster } from '../../../../../components/Shared';
import type { AuthMode } from '../../contexts/authentication.types';
import { useAuthentication } from '../../hooks/useAuthentication';

import styles from './Header.module.scss';
interface HeaderProps {
	title: string;
	subTitle: string;
}

export const Header = ({ title, subTitle }: HeaderProps) => {
	const { authMode } = useAuthentication();

	const authModes: Record<AuthMode, LucideIcon> = {
		login: UserCheck,
		loginAgain: LockOpen,
		forgot: KeyRound,
		forgotSuccess: MailCheck,
		signup: UserPlus,
		signupSuccess: CircleCheckBig,
		initialTarget: UserPlus,
		loginDenied: Lock,
		signupDenied: Lock,
		signupAgain: LockOpen,
	};
	const Icon = authModes[authMode];
	const headerClasses = cx(
		styles.headerIcon,
		['login', 'signup', 'initialTarget'].includes(authMode) && styles.shifted,
		authMode === 'forgotSuccess' && styles.forgotSucces,
	);

	return (
		<>
			<Box padding={['2rem', '0']} className={styles.header}>
				<Cluster justify="center">
					<Cluster justify="center" align="center" className={headerClasses}>
						<Icon strokeWidth={1.6} />
					</Cluster>
				</Cluster>
			</Box>

			<Cluster dir="column" align="center">
				<h2 className={styles.authTitle}>{title}</h2>
				<p className={styles.authSubTitle}>{subTitle}</p>
			</Cluster>
		</>
	);
};
