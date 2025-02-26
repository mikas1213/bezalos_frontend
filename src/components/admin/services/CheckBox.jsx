import styles from './CheckBox.module.css';
import { useRef } from 'react';

const CheckBox = ({ name, label, value, checked, handleServiceForm }) => {
    const checkRef = useRef(null);
    
    return (
        <div className={styles.chbxContainer} onClick={() => checkRef.current.click()}>
            <div className={styles.chbx}>
                <input 
                    ref={checkRef}
                    name={name}
                    value={value}
                    checked={checked}
                    type='checkbox' 
                    onChange={handleServiceForm}
                />
                <div className={styles.checkmark}></div>
            </div>
            <span className={styles.chbxLabel}>{label}</span>
        </div>
    );
};

export default CheckBox;