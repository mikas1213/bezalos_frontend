import { useState } from 'react';

import { Box } from '../../../../../components/Shared';
import { useAuthentication } from '../../hooks/useAuthentication';
import { Footer } from '../Footer';
import { ForgotPassword } from '../ForgotPassword';
import { ForgotPasswordSuccess } from '../ForgotPasswordSuccess';
import { Header } from '../Header';
import { Login } from '../Login';
import { Signup } from '../Signup';

import styles from './Authentication.module.scss';

interface AuthenticationProps {
	onSuccess: () => void;
	onCancel: () => void;
}

export const Authentication = ({ onSuccess, onCancel }: AuthenticationProps) => {
	const { authMode } = useAuthentication();
	const [userEmail, setUserEmail] = useState<string>();

	return (
		<div className={styles.modalContainer}>
			<div className={styles.modalTopDecoration} />
			<Box padding={['1.5rem', '2rem', '1.5rem', '2rem']}>
				<Header onCancel={onCancel} />

				{authMode === 'login' && <Login onSuccess={onSuccess} />}
				{authMode === 'forgot' && <ForgotPassword setUserEmail={setUserEmail} />}
				{authMode === 'forgotSuccess' && <ForgotPasswordSuccess userEmail={userEmail} />}

				{authMode === 'signup' && <Signup />}
				{/* {authMode === 'initialTarget' && <InitialTarget />} */}

				{/* <Box padding={['1rem', '0rem', '1rem', '0rem']}>
					<button
						type="submit"
						form="auth-form"
						disabled={
							authMode === 'initialTarget' &&
							(!formData.initialTarget || !formData.acceptTerms)
						}
						className={styles.submit}
					>
						{authActions[authMode].btnLabel}
					</button>
				</Box> */}

				{authMode !== 'forgotSuccess' && <Footer />}
			</Box>
		</div>
	);
};
