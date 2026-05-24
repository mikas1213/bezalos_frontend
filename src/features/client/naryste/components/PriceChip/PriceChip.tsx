import { Check } from 'lucide-react';

import styles from './PriceChip.module.scss';

type PriceChipProps = {
	label: string;
};

export function PriceChip({ label }: PriceChipProps) {
	return (
		<span className={styles.chip}>
			<Check size={11} color="#FFFFFF" strokeWidth={4} aria-hidden />
			{label}
		</span>
	);
}
