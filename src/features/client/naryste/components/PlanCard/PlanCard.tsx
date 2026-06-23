import { Star } from 'lucide-react';

import type { Period, Variant } from '../../hooks/types';
import { ProfilisIcon, VirtuveIcon } from '../../icons';
import { type Benefit, BenefitsList } from '../BenefitsList';
import { FeaturedBadge } from '../FeaturedBadge';
import { PlanCtaButton } from '../PlanCtaButton';
import { PriceChip } from '../PriceChip';

import styles from './PlanCard.module.scss';
const C = {
	ink: '#0E3D2E',
	cream: '#F4F1EA',
	accent: '#5CD45C',
	accentInk: '#0A2F22',
	muteOnDark: 'rgba(255,255,255,0.72)',
	muteOnLight: 'rgba(14,61,46,0.62)',
	hairlineOnDark: 'rgba(255,255,255,0.14)',
	hairlineOnLight: 'rgba(14,61,46,0.10)',
};

export type Plan = {
	id: Variant;
	icon: 'hands' | 'leaf' | 'sprout';
	title: string;
	description: string;
	price: { month: string; year: string };
	priceChip: { month: string; year: string };
	priceNote: { month: string; year: string };
	offerNote?: string;
	benefits: Benefit[];
	cta: string;
	featured?: boolean;
	badge?: string;
	showIn: { month: boolean; year: boolean };
};

function PlanIcon({ name, color }: { name: Plan['icon']; color: string }) {
	if (name === 'sprout') return <VirtuveIcon color={color} />;
	if (name === 'leaf') return <VirtuveIcon color={color} />;
	return <ProfilisIcon color={color} />;
}

function Desc({ text }: { text: string }) {
	return (
		<>
			{text.split('||').map((part, i) =>
				i % 2 === 1 ? (
					<strong key={i} style={{ fontWeight: 700, color: '#fff' }}>
						{part}
					</strong>
				) : (
					<span key={i}>{part}</span>
				),
			)}
		</>
	);
}

function OfferNoteBadge({ text }: { text: string }) {
	return (
		<div className={styles.offerNoteBadge}>
			<Star size={16} color={C.accent} strokeWidth={2} />
			<span>
				<Desc text={text} />
			</span>
		</div>
	);
}

type PlanCardProps = {
	plan: Plan;
	billing: Period;
	consent: boolean;
	isLoading?: boolean;
	hasUserSubscription: boolean;
	onSubscriptionCheckout: (p: Period, v: Variant) => void;
	onTryWithoutConsent: () => void;
};

export function PlanCard({
	plan,
	billing,
	consent,
	isLoading = false,
	hasUserSubscription,
	onSubscriptionCheckout,
	onTryWithoutConsent,
}: PlanCardProps) {
	const featured = !!plan.featured;
	const ink = featured ? C.cream : C.ink;
	const mute = featured ? C.muteOnDark : C.muteOnLight;
	const hairline = featured ? C.hairlineOnDark : C.hairlineOnLight;
	const iconBg = featured ? 'rgba(92,212,92,0.14)' : 'rgba(14,61,46,0.06)';
	const iconColor = featured ? C.accent : C.ink;
	const checkBg = featured ? C.accent : C.ink;
	const priceAccent = featured ? C.accent : C.ink;
	const mutedInk = featured ? 'rgba(255,255,255,0.40)' : 'rgba(14,61,46,0.38)';
	const noteColor = featured ? 'rgba(255,255,255,0.9)' : mute;

	const price = plan.price[billing];
	const priceChip = plan.priceChip[billing];
	const priceNote = plan.priceNote[billing];

	return (
		<div className={featured ? `${styles.card} ${styles.cardFeatured}` : styles.card}>
			{featured && plan.badge && <FeaturedBadge label={plan.badge} />}

			{/* Header */}
			<div className={styles.cardHeader}>
				<span className={styles.cardIconWrap} style={{ background: iconBg }}>
					<PlanIcon name={plan.icon} color={iconColor} />
				</span>
				<h3 className={styles.cardTitle}>{plan.title}</h3>
				<p className={styles.cardDesc} style={{ color: mute }}>
					<Desc text={plan.description} />
				</p>
			</div>
			{plan.offerNote && <OfferNoteBadge text={plan.offerNote} />}
			{/* Price */}
			<div className={styles.cardPriceBlock}>
				<div className={styles.cardPriceRow}>
					<span className={styles.cardPriceAmount} style={{ color: priceAccent }}>
						{price}
					</span>
					<span className={styles.cardPriceUnit} style={{ color: mute }}>
						/ mėn.
					</span>
				</div>

				{priceChip && <PriceChip label={priceChip} />}
				{priceNote && (
					<div className={styles.cardPriceNote} style={{ color: noteColor }}>
						{priceNote}
					</div>
				)}
			</div>

			{/* Divider */}
			<div style={{ height: 1, background: hairline, margin: '4px 0 2px' }} />

			<BenefitsList benefits={plan.benefits} ink={ink} mutedInk={mutedInk} checkBg={checkBg} featured={featured} />

			{!hasUserSubscription && (
				<PlanCtaButton
					label={plan.cta}
					variant={plan.id}
					billing={billing}
					featured={featured}
					consent={consent}
					isLoading={isLoading}
					onSubscriptionCheckout={onSubscriptionCheckout}
					onTryWithoutConsent={onTryWithoutConsent}
				/>
			)}
		</div>
	);
}
