import styles from './CheckboxCustom.module.css';
import { useState } from 'react';

const CheckboxCustom = ({ id, label }) => {
    const [checkBoxVal, setCheckBoxVal] = useState(false);

    return (
        <div 
            onClick={() => setCheckBoxVal(onOff => !onOff)}
            className={`${styles.checkbox} ${styles[id.replace('+', '_')]}`}
        >
            <input 
                id={id}
                name='logic'
                type='checkbox'
                onChange={setCheckBoxVal} 
                checked={checkBoxVal}
            />
            <span>{label}</span>
        </div>
    );
};

export default CheckboxCustom;