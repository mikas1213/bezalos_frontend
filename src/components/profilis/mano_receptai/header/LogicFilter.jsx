import styles from './LogicFilter.module.css';
import { useState } from 'react';

const LogicFilter = ({ options, setFilter, onSetFilter, setCurrentPage = () => {}}) => {
    
    return (
        
        <div 
            className={styles.logicFilter}>
            {options.map(option => <Radio 
                key={option.value} 
                val={option.value} 
                label={option.label}
                color={option.color}
                setFilter={setFilter}
                onSetFilter={onSetFilter}
                setCurrentPage={setCurrentPage}
            />)}
        </div>
    );
};

const Radio = ({ val, label, color = '#245D6B', setFilter, onSetFilter, setCurrentPage = () => {} }) => {
    
    const [isClicked, setIsClicked] = useState(false);
    const isChecked = setFilter === val && isClicked;

    const handleOnClick = () => {
        setCurrentPage(1);
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
                className={`${styles.filterLabel} ${styles[val.replace('+', '_')]}`}
                style={{
                    color: isChecked ? color : 'var(--grey-dark)', 
                    backgroundColor: isChecked ? 'var(--color-background-secondary)' : '#fff',
                }}
                name='logic'
                onClick={handleOnClick}
            >{ label }</span>
        </>
    );
};

export default LogicFilter;