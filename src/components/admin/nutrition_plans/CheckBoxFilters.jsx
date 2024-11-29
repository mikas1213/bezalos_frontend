import { useState } from 'react';

const labelStyles = {
    fontWeight: 500,
    cursor: 'pointer',
    display: 'inline-block',
    order: 2,
    fontSize: '0.7rem',
    textWrap: 'nowrap',
    transition: 'color 0.1s ease-in-out'
};
const checkBoxStyles = {
    cursor: 'pointer',
    userSelect: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.3rem'
};
const inputStyles = {
    display: 'none',
    visibility: 'hidden',
};
const spanStyles = {
    position: 'relative',
    display: 'block',
    float: 'left',
    width: '18px',
    height: '18px',
    borderRadius: '4px',
    transition: 'all 0.15s ease'
};
const svgStyles = {
    position: 'absolute',
    top: '1.5px',
    left: '1.5px',
    fill: 'none',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeWidth: '1.5px',
    strokeDasharray: 17,
    transform: 'translate3d(0, 0, 0)',
    transition: 'all 0.15s ease'
};

export const CheckBoxFilters = ({options, color = '#245D6B', onSetFilter, grow = 0, setCurrentPage}) => {

    return (
        <div style={{display: 'flex', gap: '0.5rem', flexGrow: grow}}>
            {options.map((option, i) => <CheckBox 
                key={i} 
                color={color} 
                value={option.value} 
                label={option.label} 
                name={option.name}
                onSetFilter={onSetFilter}
                setCurrentPage={setCurrentPage}
            />)}
        </div>
    );
};

const CheckBox = ({color, value, label, name, onSetFilter, setCurrentPage}) => {
    const [isChecked, setIsChecked] = useState(false);
    const [isHover, setIsHover] = useState(false);

    const handleClick = () => {
        setCurrentPage(1);
        setIsChecked(on => !on);
        onSetFilter(prevState => ({...prevState, [name]: !isChecked}))
    };

    return (
        <div style={checkBoxStyles} onClick={handleClick}>
            <span 
                style={{
                    ...labelStyles, 
                    color: isChecked ? color : isHover ? '#777' : '#aaa'
                }}
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >{label}
            </span>
            <input 
                style={inputStyles} 
                type='checkbox' 
                value={value} 
                checked={isChecked} 
                onChange={() => setIsChecked(on => !on)}
            />

            <span 
                style={{
                    ...spanStyles, 
                    border: isChecked ? `1.5px solid ${color}` : isHover ? '1.5px solid #999' : '1.5px solid #bbb'
                }} 
            >
                <svg style={{
                    ...svgStyles, 
                    stroke: isChecked ? color : '#fff', 
                    strokeDashoffset: isChecked ? 0 : 17
                }} width='12px' height='11px' viewBox='0 0 12 11'>
                    <polyline points='1 6.29411765 4.5 10 11 1'></polyline>
                </svg>
            </span>
        </div>
    );
};

