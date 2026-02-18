import { X } from 'lucide-react';

import { Logo } from '../../../../../components/Shared/Logo';
import { useAuthentication } from '../../hooks/useAuthentication';

import styles from './Header.module.scss';

export const Header = ({ onCancel }: { onCancel: () => void }) => {
	const { authMode, authActions } = useAuthentication();

	return (
		<>
			<button type="button" onClick={onCancel} className={styles.closeButton}>
				<X size={18} color="var(--dark-green-500)" />
			</button>

			{authMode !== 'forgotSuccess' && (
				<div className={styles.logoContainer}>
					<Logo />
				</div>
			)}

			<h2 className={styles.authTitle}>{authActions[authMode].title}</h2>

			<p className={styles.authSubTitle}>{authActions[authMode].subTitle}</p>
		</>
	);
};
