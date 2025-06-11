import styles from './FilterChip.module.css';

const FilterChip = ({ label, value, isChecked, onChange }) => {
    return (
        <span className={styles.filterChip} onClick={() => onChange(value)}>
            <input 
                type='checkbox'
                value={value} 
                checked={isChecked}
                onChange={() => onChange(value)}
            />
            <span>{label}</span>
        </span>
    );
};

export default FilterChip;