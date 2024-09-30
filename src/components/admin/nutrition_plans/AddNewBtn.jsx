import { useState } from 'react';

const divStyle = {
    marginLeft: '0.5rem',
    cursor: 'pointer',
    display: 'flex',
    gap: '0.4rem',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.25rem 0.8rem',
    paddingRight: '1.05rem',
    height: '2rem',
    fontSize: '0.8rem',
    border: 'none',
    borderRadius: '5px',
    transition: 'all 0.1s ease-in-out',
};


export const AddNewBtn = ({ label, Icon, fontSize = '1rem', onHandleClick }) => {
    const [isHover, setIsHover] = useState(false);

    return (
        <div 
            style={{
                ...divStyle, 
                color: isHover ? '#fefefe' : '#fff',
                backgroundColor: isHover ? '#245D6Bee' : '#245D6B'
            }}
            onClick={onHandleClick}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            <Icon style={{
                color: '#fff',
                fontSize
            }} />
            <span>{ label }</span>
        </div>
    );
};