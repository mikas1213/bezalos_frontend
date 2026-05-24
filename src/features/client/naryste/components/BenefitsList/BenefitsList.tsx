import { CircleCheck, CircleX } from 'lucide-react';

import { HelpTip } from '../HelpTip';

import styles from './BenefitsList.module.scss';

export type Benefit = { label: string; tooltip: string; included: boolean };

type BenefitsListProps = {
	benefits: Benefit[];
	ink: string;
	mutedInk: string;
	checkBg: string;
	featured: boolean;
};

export function BenefitsList({ benefits, ink, mutedInk, checkBg, featured }: BenefitsListProps) {
	return (
		<ul className={styles.list}>
			{benefits.map((b, i) => (
				<li key={i} className={styles.item} style={{ color: b.included ? ink : mutedInk }}>
					{b.included ? (
						<CircleCheck className={styles.icon} size={20} color={checkBg} strokeWidth={1.8} />
					) : (
						<CircleX className={styles.icon} size={20} color={mutedInk} strokeWidth={1.8} />
					)}
					<span className={styles.label}>{b.label}</span>
					<HelpTip text={b.tooltip} featured={featured} dim={!b.included} />
				</li>
			))}
		</ul>
	);
}
