import { useEffect, useState } from 'react';

import { Lock } from 'lucide-react';

import { useAuthentication } from '../../hooks/useAuthentication';
import { Footer } from '../Footer';
import { InfoBox } from '../InfoBox';

import styles from './AccessDenied.module.scss';

export const AccessDenied = () => {
	const { lockoutExpiresAt, setAuthMode, authMode } = useAuthentication();

	const isSignup = authMode === 'signupDenied';

	const [secondsLeft, setSecondsLeft] = useState(() => {
		if (!lockoutExpiresAt) return 0;
		return Math.max(0, Math.ceil((lockoutExpiresAt - Date.now()) / 1000));
	});

	useEffect(() => {
		if (secondsLeft <= 0) {
			setAuthMode(isSignup ? 'signupAgain' : 'loginAgain');
			return;
		}
		const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
		return () => clearTimeout(timer);
	}, [secondsLeft, setAuthMode, isSignup]);

	const minutes = Math.floor(secondsLeft / 60);
	const seconds = secondsLeft % 60;

	return (
		<div>
			<div className={styles.titleWrapper}>
				<h2 className={styles.title}>
					{isSignup ? 'Registracija užblokuota' : 'Prisijungimas užblokuotas'}
				</h2>
			</div>
			<p className={styles.subtitle}>Per daug nesėkmingų bandymų</p>

			<div className={styles.lockIconWrapper}>
				<div className={styles.lockIconCircle}>
					<Lock />
				</div>
			</div>

			<div className={styles.countdownWrapper}>
				<span className={styles.countdown}>
					{minutes}:{seconds.toString().padStart(2, '0')}
				</span>
			</div>
			<p className={styles.countdownLabel}>Palaukite, kol galėsite bandyti dar kartą</p>

			<InfoBox
				title="Kodėl tai nutiko?"
				subTitle={
					isSignup
						? 'Po kelių nesėkmingų bandymų, dėl saugumo priežasčių registracija laikinai užblokuota.'
						: 'Po kelių nesėkmingų bandymų, dėl saugumo priežasčių prisijungimas laikinai užblokuotas. Tai apsaugo jūsų paskyrą nuo neleistinos prieigos.'
				}
				isDenied={true}
			/>

			<button type="button" onClick={() => setAuthMode('forgot')} className={styles.button}>
				Pamiršau slaptažodį
			</button>

			<Footer>
				<Footer.SwitchAuth
					footerLabel={isSignup ? 'Jau turite paskyrą?' : 'Neturite paskyros?'}
					actionLabel={isSignup ? 'Prisijungti' : 'Registruotis'}
					mode={isSignup ? 'login' : 'signup'}
				/>
			</Footer>
		</div>
	);
};
