import styles from './CheckBox.module.css';
import { useState } from 'react';

const CheckBox = ({newRecipe, setNewRecipe, className = '' }) => {
    
    const [check, setCheck] = useState(newRecipe.is_vegetarian);
    const customClass = [styles.chbx, className].join(' ');
    
    const onChangeHandlre = () => {
        setCheck(!check);
        setNewRecipe(prev => ({... prev, is_vegetarian: !check}));
    };

    return (
        <div className={customClass} onClick={onChangeHandlre}>
            <input 
                name='is_vegetarian'
                checked={check}
                type='checkbox' 
                onChange={setCheck}
            />
            <div className={styles.checkmark}></div>
        </div>
    );
};

export default CheckBox;