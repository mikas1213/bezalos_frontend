import styles from './CheckBox.module.css';
import { useState } from 'react';

const CheckBox = ({ name, label, className = '' }) => {
    const [check, setCheck] = useState(false);
    const customClass = [styles.chbx, className].join(' ');
    return (
        <div className={customClass} onClick={() => setCheck(check => !check)}>
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