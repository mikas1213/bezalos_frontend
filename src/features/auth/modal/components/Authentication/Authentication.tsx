import cx from 'classnames';
import { X } from 'lucide-react';

import { Box } from '../../../../../components/Shared';
import { useMediaQuery } from '../../../../../contexts/MediaQueryProvider';
import type { AuthMode } from '../../contexts/authentication.types';
import { useAuthentication } from '../../hooks/useAuthentication';
import { AccessDenied } from '../AccessDenied';
import { AuthStatusView } from '../AuthStatusView';
import { ForgotPassword } from '../ForgotPassword';
import { Login } from '../Login';
import { Signup } from '../Signup';

import styles from './Authentication.module.scss';

interface AuthenticationProps {
	onSuccess: () => void;
	onCancel: () => void;
}

export const Authentication = ({ onSuccess, onCancel }: AuthenticationProps) => {
	const mediaQuery = useMediaQuery();

	const { authMode } = useAuthentication();
	const authModes: AuthMode[] = ['signup', 'initialTarget'];
	const deniedModes: AuthMode[] = ['loginDenied', 'signupDenied'];
	const successModes: AuthMode[] = [
		'forgotSuccess',
		'signupSuccess',
		'loginAgain',
		'signupAgain',
	];

	const paddings = mediaQuery < 376 ? ['1.5rem', '1rem'] : ['1.5rem', '2rem'];

	return (
		<div className={styles.modalContainer}>
			<div
				className={cx(
					styles.modalTopDecoration,
					deniedModes.includes(authMode) && styles.denied,
				)}
			/>
			<button
				type="button"
				onClick={onCancel}
				className={cx(styles.closeButton, deniedModes.includes(authMode) && styles.denied)}
			>
				<X size={18} />
			</button>

			<Box padding={paddings}>
				{authMode === 'login' && <Login onSuccess={onSuccess} />}
				{authMode === 'forgot' && <ForgotPassword />}
				{authModes.includes(authMode) && <Signup />}
				{deniedModes.includes(authMode) && <AccessDenied />}
				{successModes.includes(authMode) && <AuthStatusView />}
			</Box>
		</div>
	);
};
