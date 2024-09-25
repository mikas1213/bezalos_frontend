import styles from './CheckboxMeal.module.css';
const CheckboxMeal = ({ id, label, value, check, onEditMeal }) => {

    return (
        <div className={styles.checkbox}>
            
            <label htmlFor={value+'_'+id}>{ label }</label>
            <input type='checkbox' id={value+'_'+id} value={value} name='intolerance' checked={value === check} onChange={onEditMeal} />
            <span className={styles.cbx}>
                <svg width='12px' height='11px' viewBox='0 0 12 11'>
                    <polyline points='1 6.29411765 4.5 10 11 1'></polyline>
                </svg>
            </span>
        </div>
    );
};

export default CheckboxMeal;
