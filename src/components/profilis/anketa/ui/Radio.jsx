import styles from './Radio.module.css';
import { useRef } from 'react';

const Radio = ({ formData, handleForm, name, value, className = '', size = 'm'}) => {
    console.log(className)
    const ref = useRef(null);
    const classes = [styles.marker, styles[`size_${size}`], className].join(' ');
    return (
        <div className={styles.radioBtn} onClick={() => handleForm(ref)}>
            <input 
                id={value}
                ref={ref}
                type='radio' 
                name={name}
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