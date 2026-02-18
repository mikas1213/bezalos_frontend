import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { ArrowLeft, Check, CircleAlert, ExternalLink } from 'lucide-react';

import { Box, Cluster } from '../../../../../components/Shared';
import { useAuth } from '../../../core';
import { useAuthentication } from '../../hooks/useAuthentication';

import styles from './ForgotPasswordSuccess.module.scss';

export const ForgotPasswordSuccess = ({ userEmail }: { userEmail: string | undefined }) => {
	const [countdown, setCountdown] = useState(60);
	const [resent, setResent] = useState(false);
	const { forgotPassword } = useAuth();
	const { setAuthMode } = useAuthentication();

	const canResend = countdown <= 0;
	const maskedEmail = userEmail?.replace(
		/^(.{2})(.*)(@.*)$/,
		(_, start, middle, domain) => start + '•'.repeat(middle.length) + domain,
	);

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

	const formatTime = (s: number): string => {
		const min = Math.floor(s / 60);
		const sec = s % 60;
		return min > 0
			? `${min}:${sec.toString().padStart(2, '0')}`
			: `0:${sec.toString().padStart(2, '0')}`;
	};

	return (
		<Cluster justify="center" gap="1.5rem">
			<Box padding={['2rem', '0']}>
				<Cluster justify="center">
					<Cluster justify="center" align="center" className={styles.mainIconCircle}>
						<svg width="36" height="36" viewBox="0 0 24 24" fill="none">
							<rect
								x="2"
								y="5"
								width="20"
								height="14"
								rx="2"
								stroke="white"
								strokeWidth="1.5"
								fill="none"
							/>
							<path
								d="M2 7l10 6 10-6"
								stroke="white"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
								fill="none"
							/>
							{/* Animated check */}
							<circle
								cx="18"
								cy="8"
								r="5"
								fill="var(--dark-green-500)"
								stroke="var(--white-100)"
								strokeWidth="1.5"
							/>
							<path
								d="M15.5 8l1.5 1.5 3-3"
								stroke="var(--white-100)"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</Cluster>
				</Cluster>
			</Box>

			<Cluster className={styles.header} gap="0">
				<h2>Patikrinkite el. paštą</h2>
				<p className={styles.paragraph}>Slaptažodžio atkūrimo nuoroda išsiųsta adresu</p>
				<p className={styles.email}>{maskedEmail}</p>
			</Cluster>

			<Box padding={['1rem']} className={styles.infoBox}>
				<div className={styles.boxIcon}>
					<CircleAlert size={18} color="var(--dark-green-500)" strokeWidth={1.5} />
				</div>

				<p className={styles.description}>
					Nuoroda galioja <span>10 minučių</span>. Jei nerandate laiško, patikrinkite
					šlamšto (spam) aplanką.
				</p>
			</Box>

			<Cluster className={styles.resendSection} gap="0.75rem">
				{resent && (
					<Box padding={['0.5rem', '1rem']} className={styles.emailResend}>
						<Check size={14} strokeWidth={3} />
						Laiškas išsiųstas pakartotinai
					</Box>
				)}
				<p>
					Negavote laiško?{' '}
					{canResend ? (
						<button
							type="button"
							onClick={handleResend}
							className={styles.sendAgainBtn}
						>
							Siųsti dar kartą
						</button>
					) : (
						<span>Siųsti dar kartą ({formatTime(countdown)})</span>
					)}
				</p>
			</Cluster>

			<a
				href="https://mail.google.com"
				target="_blank"
				rel="noopener noreferrer"
				className={styles.openEmailBtn}
			>
				<ExternalLink size={18} />
				Atidaryti el. paštą
			</a>

			<button
				type="button"
				onClick={() => setAuthMode('login')}
				className={styles.backToLogin}
			>
				<ArrowLeft size={16} />
				Grįžti į prisijungimą
			</button>
		</Cluster>
	);
};
