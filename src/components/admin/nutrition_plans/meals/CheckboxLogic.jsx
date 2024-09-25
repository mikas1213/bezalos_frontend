import styles from './CheckboxLogic.module.css';
import { useState } from 'react';

const CheckboxLogic = ({ id, label, clickedLogic, setClickedLogic, setFilters }) => {
    const [isClicked, setIsClicked] = useState(false);
    
    const isOn = clickedLogic == label && isClicked;
    const onClickHandle = (e) => {
        setIsClicked(onOff => clickedLogic == label ? !onOff : true);

        setClickedLogic(e.target.innerText);
        setFilters(prevState => ({
            ...prevState, logic: !isOn ? label : ''
        }));
        
    };
    
    return (
        <div 
            onClick={onClickHandle}
            className={`${styles.checkbox} ${styles[id.replace('+', '_')]}`}
        >
            <input 
                id={id}
                name='logic'
                type='checkbox'
                onChange={setClickedLogic}
                checked={isOn}
            />
            <span>{label}</span>
        </div>
    );
};

export default CheckboxLogic;