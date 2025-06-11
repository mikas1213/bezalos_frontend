import styles from './Input.module.css';

const Input = ({ label, placeholder, name, value, dataValue = '', handleFormInput, className = ''}) => {
    return (
        <div className={`${styles.inputGroup} ${className}`}>
            <span className={styles.inputLabel}>{label}</span>
            <input 
                type='text' 
                name={name}
                value={value}
                onChange={handleFormInput}
                data-id={dataValue}
                className={styles.input}
                placeholder={placeholder}
            />
        </div>
    );
};

export default Input;