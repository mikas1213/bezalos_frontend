import styles from './FilterChip.module.scss';

interface FilterChipProps {
	label: string;
	value: string;
	isChecked: boolean;
	onChange: (value: string) => void;
	onRemove?: () => void;
}

const FilterChip = ({ label, value, isChecked, onChange, onRemove }: FilterChipProps) => {
	const className = [styles.filterChip, isChecked ? styles.selected : '', onRemove ? styles.editable : '']
		.filter(Boolean)
		.join(' ');

	return (
		<span className={className} onClick={!onRemove ? () => onChange(value) : undefined}>
			<input type="checkbox" value={value} checked={isChecked} onChange={() => onChange(value)} />
			<span>{label}</span>
			{onRemove && (
				<button
					type="button"
					className={styles.removeBtn}
					onClick={(e) => {
						e.stopPropagation();
						onRemove();
					}}
				>
					×
				</button>
			)}
		</span>
	);
};

export default FilterChip;
