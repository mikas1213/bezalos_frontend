import { useState } from 'react';

const SearchInput = ({ onChangeValue, setCurrentPage }) => {
    const [val, setVal] = useState('');
    const [inputStyle, setInputStyle] = useState({    
        cursor: 'pointer',
        border: '1px solid #ccc',
        color: '#777',
        borderRadius: '5px',
        height: '2rem',
        marginRight: '0.5rem',
        padding: '0 0.8rem',
        transition: 'all 0.1s ease-in-out'
    });

    return (
        <>
            <input 
                type='text' 
                name='search' 
                placeholder='Paieška' 
                value={val}
                style={inputStyle}
                onFocus={() => setInputStyle(prevStyle => ({...prevStyle, outline: 'none'}))}
                onChange={e => {
                    setVal(e.target.value);
                    onChangeValue(e.target.value);
                    setCurrentPage(1);
                }}
            />
        </>
    );
};

export default SearchInput;

