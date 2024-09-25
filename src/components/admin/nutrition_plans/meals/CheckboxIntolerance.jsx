import styles from './CheckboxMeal.module.css';

const CheckboxIntolerance = ({ id, label, name, onSetFilter }) => {
    
    return (
        <div className={styles.checkbox}>
            
            <label htmlFor={id}>{ label }</label>
            <input 
                type='checkbox' 
                id={id} 
                name={name} 
                onChange={e => onSetFilter(prevState => ({...prevState, [e.target.name]: e.target.checked}))} 
            />
            <span className={styles.cbx}>
                <svg width='12px' height='11px' viewBox='0 0 12 11'>
                    <polyline points='1 6.29411765 4.5 10 11 1'></polyline>
                </svg>
            </span>
        </div>
    );
};

export default CheckboxIntolerance;
