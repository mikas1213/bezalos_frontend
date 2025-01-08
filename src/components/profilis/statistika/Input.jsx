import styles from './Input.module.css';

const Input = ({ placeholder, label = '', name, icon, setFormData, formData, error, setErrors }) => {
      
    return (
        <div className={styles.inputGroup}>

            {label && <span>{icon}{label}</span>}
            <input 
                id={name}
                name={name}
                type='text' 
                pattern='[0-9]+'
                autoComplete='off'
                maxLength='7'
                value={formData[name] || ''}
                onChange={e => setFormData(prevState => ({ ...prevState, [e.target.name]: e.target.value}))}
                
                // onChange={e => {
                //    handleForm(e);
                //    setErrors(prev => {
                //         const updated = {...prev};
                //         delete updated[name];
                //         return updated;
                //    });
                // }}
                placeholder={placeholder}
            />
            {!error && <span className={styles.error}>{error}</span>}
        </div>
    );
};

export default Input;