import styles from './Radio.module.css';
import { useRef } from 'react';

const Radio = ({ type = '', name, value, formData, handleForm, className = '', size = 'm'}) => {
    const ref = useRef(null);
    const classes = [styles.marker, styles[`size_${size}`], className].join(' ');
    
    return (
        <div className={styles.radioBtn} onClick={() => handleForm(ref, type, formData.day_id)}>
            <input 
                id={value}
                ref={ref}
                type='radio'
                name={formData.day_id ? `${name}_${formData.day_id}` : name}
                value={value}
                checked={formData[name] === value} 
                onChange={handleForm}
            /> 
            <div className={classes} />
            <span className={className ? className : styles.radioLabel}>{value}</span>
        </div>
    );
};

export default Radio;