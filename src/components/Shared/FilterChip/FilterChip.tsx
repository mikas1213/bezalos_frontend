import styles from './FilterChip.module.scss';
interface FilterChipProps {
	label: string;
	value: string;
	isChecked: boolean;
	onChange: (value: string) => void;
}
const FilterChip = ({ label, value, isChecked, onChange }: FilterChipProps) => {
	return (
		<span className={styles.filterChip} onClick={() => onChange(value)}>
			<input type="checkbox" value={value} checked={isChecked} onChange={() => onChange(value)} />
			<span>{label}</span>
		</span>
	);
};

export default FilterChip;
