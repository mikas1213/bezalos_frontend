import styles from './Input.module.css';

const Input = ({ handleForm, formData, placeholder, label = '', name }) => {
    return (
        <div className={styles.inputGroup}>
            {label && <span>{label}</span>}
            <input 
                id={name}
                name={name}
                type='text' 
                autoComplete='off'
                value={formData[name]}
                onChange={handleForm}
                placeholder={placeholder}
            />
        </div>
    );
};

export default Input;