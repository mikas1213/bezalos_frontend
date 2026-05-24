import type { Period } from '../../hooks/types';

import styles from './SlidingToggle.module.scss';
const OPTIONS = [
	{ id: 'month' as Period, label: 'Mėnesinė' },
	{ id: 'year' as Period, label: 'Metinė', save: 'iki -50%' },
] as const;

type Props = {
	value: Period;
	onChange: (v: Period) => void;
};

export function SlidingToggle({ value, onChange }: Props) {
	return (
		<div className={styles.toggle}>
			<div className={`${styles.togglePill}${value === 'year' ? ` ${styles.togglePillRight}` : ''}`} />
			{OPTIONS.map((opt) => (
				<button
					key={opt.id}
					type="button"
					role="tab"
					aria-selected={value === opt.id}
					onClick={() => {
						onChange(opt.id);
					}}
					className={styles.btn}
				>
					{opt.label}
					{'save' in opt && opt.save && <span className={styles.saveChip}>{opt.save}</span>}
				</button>
			))}
		</div>
	);
}
