import styles from './Textarea.module.css';
import { useState } from 'react';

const Textarea = ({ placeholder, maxLength, className = '' }) => {
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        if (e.target.value.length <= maxLength) {
            setValue(e.target.value);
        }
      };

    const customClass = [styles.textarea, className].join(' ');
    return (
        <div className={customClass}>
            <div>
                <textarea
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}

                />
                <div className={styles.counter}>
                    {value.length}/{maxLength}
                </div>
                
            </div>
            <div 
                className={styles.progressBar}
                style={{ width: `${(value.length / maxLength) * 100}%` }}
            />
      </div>
    );
};

export default Textarea;