import { useState } from 'react';
import toast from 'react-hot-toast';

import { CalendarDays, Leaf, Settings } from 'lucide-react';

import { axiosPrivate } from '../../../../../api/axios';

import styles from './ManageSubscription.module.scss';
interface ManageSubscriptionProps {
	currentPeriodEnd: string | undefined;
	subscriptionPlan: string | undefined;
}

export const ManageSubscription = ({ currentPeriodEnd, subscriptionPlan }: ManageSubscriptionProps) => {
	const [isLoading, setIsLoading] = useState(false);

	const handleCustomerPortal = async (): Promise<void> => {
		if (isLoading) return;
		setIsLoading(true);
		try {
			const res = await axiosPrivate.post('/payments/customer-portal-session');
			window.location = res.data.session.url;
		} catch {
			toast.error('Nepavyko atidaryti narystės valdymo. Bandykite dar kartą.');
			setIsLoading(false);
		}
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.info}>
				<div className={styles.iconBox}>
					<Leaf size={18} strokeWidth={2} />
				</div>
				<div className={styles.text}>
					<p className={styles.planName}>
						Jūsų planas: <span className={styles.planHighlight}>{subscriptionPlan}</span>
					</p>
					<p className={styles.nextPayment}>
						<CalendarDays size={14} strokeWidth={2} />
						<span>
							Kitas mokėjimas —{' '}
							{currentPeriodEnd
								? new Date(currentPeriodEnd).toLocaleDateString('lt-LT', {
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									})
								: '—'}
						</span>
					</p>
				</div>
			</div>

			<button
				type="button"
				className={styles.manageBtn}
				onClick={handleCustomerPortal}
				disabled={isLoading}
				style={{ cursor: isLoading ? 'default' : undefined }}
			>
				{isLoading ? <span className={styles.spinner} /> : <Settings size={16} />}
				Tvarkyti narystę
			</button>
		</div>
	);
};
