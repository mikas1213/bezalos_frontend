import styles from './Filters.module.css';
import Select from 'react-select';
import { useState } from 'react';

const Filters = ({ handleSearchProduct }) => {
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: '1px solid #ccc',
            boxShadow: state.isFocused ? 'none' : state.borderColor,
            borderColor: state.isFocused ? 'none' : state.borderColor,
            '&:hover': {
                border: '1px solid #999',
                cursor: 'pointer'
            },
            fontSize: '13px',
            padding: 0,
            height: '30px',
            minHeight: '0px',
            minWidth: '165px',
            width: '100%'
            // '@media only screen and (max-width: 375px)': {
            //     ...baseStyles['@media only screen and (max-width: 375px)'],
            //     fontSize: '4.5rem',
            // },
        }),
        option:(provided, state) => ({
            ...provided,
            cursor: 'pointer',
            height: '2.1rem',
            fontSize: '0.8rem',
            backgroundColor: state.isSelected ? '#245D6B' : state.isFocused ? '#245D6B11' : '#fff',
            color: state.isSelected ? '#fff' : state.isFocused ? '#245D6B' : '#777',
            '&:hover': {
                backgroundColor: state.isSelected ? '#245D6B' : '#245D6B11',
                color: state.isSelected ? '#fff' : '#245D6B',
            }
        }),
        valueContainer: (provided) => ({
            ...provided,
            // minHeight: '50px',
            // height: '50px',
            paddingTop: 0,
            paddingBottom: 0,
        }),
        indicatorsContainer: (provided) => ({
            ...provided,
            minHeight: 0,
            height: '30px',
        })
    }
    const categoryOptions = [
        { value: 'Riebūs baltymai', label: 'Riebūs baltymai'},
        { value: 'Liesi baltymai', label: 'Liesi baltymai' },
        { value: 'Angliavandeniai', label: 'Angliavandeniai' },
        { value: 'Riebalai', label: 'Riebalai' },
        { value: 'Vaisiai/uogos', label: 'Vaisiai / uogos' }
    ];

    const [src, setSrc] = useState('');
    
    return (
        <div className={styles.filters}>
            <input type='text' 
                name='search'
                placeholder='Paieška' 
                onChange={e => {                    
                    setSrc(e.target.value)
                    handleSearchProduct({[e.target.name]: e.target.value})}
                }
                value={src}
            />
            <Select 
                name='filter'
                onChange={(e1, e2) => {
                    setSrc('')
                    handleSearchProduct({[e2.name]: e1.value})}
                }
                options={categoryOptions} 
                isSearchable={false}
                isMulti={false}
                placeholder='Kategorija'
                styles={customStyles}
            />
        </div>
    );
};

export default Filters;