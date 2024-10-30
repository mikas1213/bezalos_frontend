import styles from './RadioFilters.module.css';
import { useState } from 'react';

export const RadioFilters = ({ options, setFilter, onSetFilter }) => {
    
    return (
        <div 
            className={styles.radioFilters}>
            {options.map(option => <Radio 
                key={option.value} 
                val={option.value} 
                label={option.label}
                color={option.color}
                setFilter={setFilter}
                onSetFilter={onSetFilter}
            />)}
        </div>
    );
};

const Radio = ({ val, label, color = '#245D6B', setFilter, onSetFilter }) => {

    const [isClicked, setIsClicked] = useState(false);
    const isChecked = setFilter === val && isClicked;

    const handleOnClick = () => {
        onSetFilter(!isChecked ? val : '');
        setIsClicked(click => setFilter === val ? !click : true);
    };
    
    return (
        <>
            <input style={{display: 'none'}}
                type='radio'
                value={val}
                checked={isChecked}
                onChange={handleOnClick}
            />
            <span 
                className={styles.radioLabel}
                style={{
                    color: isChecked ? '#fff' : color, 
                    border: `1.5px solid ${color}`,
                    backgroundColor: isChecked ? color : '#fff'
                }}
                name='logic'
                onClick={handleOnClick}
            >{ label }</span>
        </>
    );
};