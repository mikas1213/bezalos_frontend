import styles from './Input.module.css';

const Input = ({ placeholder, label = '', name, icon, setFormData, formData, error, setErrors }) => {
    return (
        <div className={styles.inputGroup}>

            {label && <span>{icon}{label}</span>}
            <input 
                id={name}
                name={name}
                type='text' 
                maxLength='6'
                autoComplete='off'
                pattern='^-?\d*[.,]?\d+$'
                placeholder={placeholder}
                value={formData[name] || ''}
                onChange={e => {
                    setErrors(prevState => [...prevState.map(err => err.path === e.target.name || err.path === 'all' ? {} : err)])
                    setFormData(prevState => ({ ...prevState, [e.target.name]: e.target.value}))
                }}
            />
            {error && <span className={styles.error}>{error}</span>}
        </div>
    );
};

export default Input;