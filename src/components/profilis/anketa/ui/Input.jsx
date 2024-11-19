import styles from './Input.module.css';

const Input = ({ handleForm, formData, placeholder, label = '', name, error }) => {
    
    return (
        <div className={styles.inputGroup}>
            {label && <span>{label}</span>}
            <input 
                id={name}
                name={name}
                type='text' 
                autoComplete='off'
                maxLength='5'
                value={formData[name] || ''}
                onChange={handleForm}
                placeholder={placeholder}
            />
            {error && <span className={styles.error}>{error}</span>}
        </div>
    );
};

export default Input;