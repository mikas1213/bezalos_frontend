import styles from './CheckBox.module.css';
import { useState } from 'react';

const CheckBox = ({ name, label, formData, handleForm, className = '' }) => {
    
    const [check, setCheck] = useState(formData[name]);
    const customClass = [styles.chbx, className].join(' ');
    
    const onChangeHandlre = () => {
        setCheck(!check);
        handleForm({name, value: !check});
    };

    return (
        <div className={customClass} onClick={onChangeHandlre}>
            <input 
                name={name}
                checked={check}
                type='checkbox' 
                onChange={setCheck}
            />
            <div className={styles.checkmark}></div>
            <span className={styles.label}>{ label }</span>
        </div>
    );
};

export default CheckBox;