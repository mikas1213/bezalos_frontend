import type { ComponentType } from 'react';
import { useNavigate } from 'react-router-dom';

import type { LucideProps } from 'lucide-react';
import { ArrowRight, BadgePercent, Check, Star } from 'lucide-react';

import { Cluster } from '../../../../../../components/Shared';

import styles from './PriceCard.module.scss';

interface PriceCardProps {
	PriceIcon: ComponentType<LucideProps>;
	price: string;
	duration: string;
	codeDesc: string;
	code: string;
	trustSignals: string[];
	url: string;
}

export const PriceCard = ({ PriceIcon, price, duration, codeDesc, code, trustSignals, url }: PriceCardProps) => {
	const navigate = useNavigate();
	return (
		<div className={styles.priceCard}>
			<div className={styles.priceCardContent}>
				<div className={styles.price}>
					<div className={styles.priceTitle}>Investicija į save</div>
					<div className={styles.priceValue}>{price}</div>
					<div className={styles.priceSubNote}>
						<PriceIcon size={16} color="#718096" />
						<span className={styles.duration}>{duration}</span>
					</div>
				</div>

				<button type="button" onClick={() => navigate(url)} className={styles.ctaButton}>
					Pradėti transformaciją
					<ArrowRight size={20} strokeWidth={3} />
				</button>

				<div className={styles.discount}>
					<Cluster justify="center" align="center" gap="var(--s-8)">
						<BadgePercent size={18} color="var(--light-green-700)" />
						<span className={styles.discountCodeDesc}>{codeDesc}</span>
						<span className={styles.discountCode}>{code}</span>
					</Cluster>
				</div>

				<div className={styles.trustSignals}>
					{trustSignals.map((signal) => (
						<div key={signal} className={styles.signal}>
							<Check size={16} color="var(--light-green-500)" strokeWidth={3} />
							<span>{signal}</span>
						</div>
					))}
				</div>

				<div className={styles.ratings}>
					<div className={styles.ratingStars}>
						{[1, 2, 3, 4, 5].map((star) => (
							<Star key={star} size={18} fill="var(--light-green-500)" color="var(--light-green-500)" />
						))}
					</div>
					<p className={styles.reviewStats}>4.9/5 · Pagal 2500+ klientų atsiliepimus</p>
				</div>
			</div>
		</div>
	);
};
