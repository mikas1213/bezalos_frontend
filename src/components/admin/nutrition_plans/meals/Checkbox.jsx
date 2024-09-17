import styles from './Checkbox.module.css';

const Checkbox = ({ id, label, value, name, onChangeValue }) => {
    
    return (
        <div className={styles.checkbox}>
            
            <label htmlFor={id+name}>{ label }</label>
            <input type='checkbox' id={id+name} value={value} name={name} checked={value} onChange={onChangeValue} />
            <span className={styles.cbx}>
                <svg width='12px' height='11px' viewBox='0 0 12 11'>
                    <polyline points='1 6.29411765 4.5 10 11 1'></polyline>
                </svg>
            </span>
        </div>
    );
};

export default Checkbox;
