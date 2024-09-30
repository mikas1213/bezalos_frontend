import { useState } from 'react';

const radiosStyle = {
    display: 'flex',
    // flexGrow: 1,
    gap: '0.5rem',
    userSelect: 'none'
};
    
const labelStyle = {
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '5px',
    height: '2rem',
    padding: '0 0.5rem',
    transition: 'all 0.15s ease-in-out'
};

export const RadioFilters = ({ options, setFilter, onSetFilter }) => {
    
    return (
        <div style={radiosStyle}>
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
                style={{
                    ...labelStyle, 
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