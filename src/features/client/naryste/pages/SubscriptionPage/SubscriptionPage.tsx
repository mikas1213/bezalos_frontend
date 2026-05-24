import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';

import { Box, Container, Grid, Stack } from '../../../../../components/Shared';
import { ReviewCard } from '../../../../../components/Shared/ReviewCard/RevievCard';
import { SectionTitle } from '../../../../../components/Shared/SectionTitle/SectionTitle';
import { ConsentBox } from '../../components/ConsentBox/ConsentBox';
import { ManageSubscription } from '../../components/ManageSubscription';
import { PlanCard } from '../../components/PlanCard';
import { SlidingToggle } from '../../components/SlidingToggle/SlidingToggle';
import { SubscriptionHeader } from '../../components/SubscriptionHeader';
import type { Period } from '../../hooks/types';
import { useSubscriptionCheckout } from '../../hooks/useSubscriptionCheckout';
import { PLANS, REVIEWS } from '../constants';

import styles from './SubscriptionPage.module.scss';

const SubscriptionPage = () => {
	const [billing, setBilling] = useState<Period>('month');
	const [consent, setConsent] = useState(false);
	const [attention, setAttention] = useState(false);
	const consentRef = useRef<HTMLDivElement>(null);
	const attentionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
	const { handleSubscriptionCheckout, loadingVariant, hasUserSubscription, currentPeriodEnd, subscriptionPlan } =
		useSubscriptionCheckout();

	useEffect(() => {
		return () => {
			if (attentionTimer.current) clearTimeout(attentionTimer.current);
		};
	}, []);

	const handleTryWithoutConsent = () => {
		if (attentionTimer.current) clearTimeout(attentionTimer.current);
		flushSync(() => setAttention(false));
		setAttention(true);

		if (consentRef.current) {
			const r = consentRef.current.getBoundingClientRect();
			const inView = r.top > 0 && r.bottom < window.innerHeight;
			if (!inView) {
				const targetY = window.scrollY + r.top - (window.innerHeight - r.height) / 2;
				window.scrollTo({ top: targetY, behavior: 'smooth' });
			}
		}
		attentionTimer.current = setTimeout(() => setAttention(false), 1800);
	};

	const visiblePlans = PLANS.filter((p) => p.showIn[billing]);

	return (
		<section className={styles.page}>
			<div aria-hidden className={styles.ambientTop} />
			<div aria-hidden className={styles.ambientBottom} />

			<Container>
				<div className={styles.header}>
					<SubscriptionHeader />
					<SlidingToggle
						value={billing}
						onChange={(period) => {
							setBilling(period);
							setConsent(false);
						}}
					/>
				</div>

				<div className={styles.cardsGrid}>
					{visiblePlans.map((plan) => (
						<PlanCard
							key={plan.id}
							plan={plan}
							billing={billing}
							consent={consent}
							hasUserSubscription={hasUserSubscription}
							isLoading={loadingVariant === plan.id}
							onSubscriptionCheckout={handleSubscriptionCheckout}
							onTryWithoutConsent={handleTryWithoutConsent}
						/>
					))}
				</div>

				{!hasUserSubscription ? (
					<ConsentBox ref={consentRef} checked={consent} onChange={setConsent} attention={attention} />
				) : (
					<ManageSubscription currentPeriodEnd={currentPeriodEnd} subscriptionPlan={subscriptionPlan} />
				)}
			</Container>

			<Container>
				<Box padding={['2rem', '0', '0', '0']}>
					<Stack space="2rem">
						<SectionTitle title="Klientų patirtys" subTitle="Išbaldžiusių Valgau be žalos | Virtuvę" size="md" />
						<Grid>
							{REVIEWS.naryste.map(({ title, text }) => (
								<ReviewCard key={title} title={title} text={text} />
							))}
						</Grid>
					</Stack>
				</Box>
			</Container>
		</section>
	);
};

export default SubscriptionPage;
