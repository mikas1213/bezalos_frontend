import styles from './Input.module.css';

const Input = ({ placeholder, label, name, value, dataValue = '', handleServiceForm }) => {
    return (
        <div className={styles.inputGroup}>
            <span className={styles.inputLabel}>{label}</span>
            <input 
                type='text' 
                name={name}
                value={value ?? ''}
                onChange={handleServiceForm}
                data-id={dataValue}
                className={`${styles.input} ${styles[name]}`} 
                placeholder={placeholder}
            />
        </div>
    );
};

export default Input;