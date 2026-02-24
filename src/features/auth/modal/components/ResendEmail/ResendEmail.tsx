import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { Check } from 'lucide-react';

import { Box, Cluster } from '../../../../../components/Shared';
import { useAuth } from '../../../core';
import { useAuthentication } from '../../hooks/useAuthentication';

import styles from './ResendEmail.module.scss';

export const ResendEmail = () => {
	const [countdown, setCountdown] = useState(90);
	const [resent, setResent] = useState(false);
	const { forgotPassword } = useAuth();
	const { setAuthMode, userEmail } = useAuthentication();
	const canResend = countdown <= 0;

	useEffect(() => {
		if (countdown <= 0) return;
		const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
		return () => clearTimeout(timer);
	}, [countdown]);

	const handleResend = async () => {
		if (!canResend) return;
		if (!userEmail) {
			toast.error('El. pašto adresas nerastas. Bandykite iš naujo.');
			setAuthMode('forgot');
			return;
		}
		setCountdown(60);
		try {
			await forgotPassword(userEmail);
			setResent(true);
		} catch {
			setCountdown(0);
		}
	};

	const formatTime = (s: number): [string, string] => {
		const min = Math.floor(s / 60);
		const sec = s % 60;
		return [min.toString().padStart(2, '0'), sec.toString().padStart(2, '0')];
	};
	return (
		<Cluster className={styles.resendSection} gap="0.75rem" justify="center">
			{resent && (
				<Box padding={['0.5rem', '1rem']} className={styles.emailResend}>
					<Check size={14} strokeWidth={3} />
					Laiškas išsiųstas pakartotinai
				</Box>
			)}
			<p>
				Negavote laiško?{' '}
				{canResend ? (
					<button type="button" onClick={handleResend} className={styles.sendAgainBtn}>
						Siųsti dar kartą
					</button>
				) : (
					<span>
						Siųsti dar kartą
						<span className={styles.num}>{formatTime(countdown)[0]}</span>:
						<span className={styles.num}>{formatTime(countdown)[1]}</span>
					</span>
				)}
			</p>
		</Cluster>
	);
};
