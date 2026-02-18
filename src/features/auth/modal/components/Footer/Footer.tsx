import { Box } from '../../../../../components/Shared';
import { useAuthentication } from '../../hooks/useAuthentication';

import styles from './Footer.module.scss';

export const Footer = () => {
	const { authMode, setAuthMode, authActions } = useAuthentication();

	return (
		<Box padding={['0', '2rem']}>
			<p className={styles.switchAuth}>
				{authActions[authMode].authCta}{' '}
				<button
					type="button"
					onClick={() => setAuthMode(authActions[authMode].authAction)}
					className={styles.switchAuthButton}
				>
					{authActions[authMode].authCtaBtn}
				</button>
			</p>
		</Box>
	);
};
