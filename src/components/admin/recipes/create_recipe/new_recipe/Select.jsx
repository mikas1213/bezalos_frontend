import { useEffect, useRef,useState } from 'react';

import { ChevronLeft } from 'lucide-react';
import { Check } from 'lucide-react';

import styles from './Select.module.css';

const Select = ({ options, field, newRecipe, setNewRecipe }) => {
    
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
        <div className={`${styles.select} ${styles[field]}`}>
            <div 
                className={`${styles.selectInput} ${selectOpen ? styles.open : ''}`} 
                onClick={(e) => { setSelectOpen(!selectOpen); e.stopPropagation() }}
            >
                <span>{newRecipe[field]}</span>
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
                        setNewRecipe(prev => ({...prev, [field]: option}));
                        setSelectOpen(false);
                    }}
                >
                        <span>{option}</span>
                        {option === newRecipe[field] && <Check className={styles.icon} />}
                </div>)}
            </div>
        </div>
    );
};

export default Select;