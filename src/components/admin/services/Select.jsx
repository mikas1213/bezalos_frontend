import styles from './Select.module.css';
import { ChevronLeft } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Check } from 'lucide-react';

const Select = ({ options, label, name, value, setNewItem }) => {
    
    const [selectOpen, setSelectOpen] = useState(false);
    const refOptions = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if(refOptions.current && !refOptions.current.contains(e.target)) {
                setSelectOpen(false);
            }
        }
        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    }, []);

    return (
        <div className={`${styles.select} ${styles[name]}`}>
            <span className={styles.inputLabel}>{label}</span>
            <div 
                className={`${styles.selectInput} ${selectOpen ? styles.open : ''}`} 
                onClick={(e) => { setSelectOpen(!selectOpen); e.stopPropagation() }}
            >
                <span>{value === true ? 'On' : 'Off'}</span>
                <ChevronLeft className={styles.selectIcon} />
            </div>

            <div 
                ref={refOptions} 
                className={`${styles.options} ${selectOpen ? styles.showOptions : ''}`}
            >
                {options.map(option => <div
                    key={option} 
                    className={styles.option} 
                    onClick={() => {
                        setNewItem(prev => ({...prev, [name]: option}));
                        setSelectOpen(false);
                    }}
                >
                        <span>{option === true ? 'On' : 'Off'}</span>
                        {option === value && <Check className={styles.icon} />}
                </div>)}
            </div>
        </div>
    );
};

export default Select;