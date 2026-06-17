import cx from 'classnames';

import styles from './CategoryChips.module.scss';

interface CategoryChipsProps {
	categories: readonly string[];
	active: string;
	onChange: (category: string) => void;
}

export const CategoryChips = ({ categories, active, onChange }: CategoryChipsProps) => {
	return (
		<div className={cx(styles.chipRow, styles.artChipRow)}>
			{categories.map((category) => (
				<button
					key={category}
					type="button"
					className={cx(styles.chip, active === category && styles.active)}
					onClick={() => onChange(category)}
				>
					{category}
				</button>
			))}
		</div>
	);
};
