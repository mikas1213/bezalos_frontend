import styles from './Input.module.css';
import { limits } from '../../../../utils/anketaFieldLimits';

const Input = ({ handleForm, formData, placeholder, label = '', name, error, setErrors }) => {
      
    return (
        <div className={styles.inputGroup}>
            {label && <span>{label}</span>}
            <input 
                id={name}
                name={name}
                type='text' 
                autoComplete='off'
                maxLength={limits[name]}
                value={formData[name] || ''}
                onChange={e => {
                   handleForm(e);
                   setErrors(prev => {
                        const updated = {...prev};
                        delete updated[name];
                        return updated;
                   });
                }}
                placeholder={placeholder}
            />
            {error && <span className='anketaError'>{error}</span>}
        </div>
    );
};

export default Input;