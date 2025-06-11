import styles from './Textarea.module.css';
import { useEffect, useRef } from 'react';

const Textarea = ({ placeholder, value, name, formValues, handleFormInput, maxLength = 750, className = ''}) => {
    const textareaRef = useRef(null);
    

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px'; 
        }
    }, [formValues.description]);
    
    return (
        <div className={`${styles.textarea} ${className}`}>
            <div>
                <textarea
                    ref={textareaRef}
                    name={name}
                    placeholder={placeholder}
                    value={value || ''}
                    maxLength={maxLength}
                    onChange={handleFormInput}
                />
                <div className={styles.counter}>
                    {value?.length || 0} / {maxLength}
                </div>
            </div>
            <div 
                className={styles.progressBar}
                style={{ width: `${((value?.length || 0) / maxLength) * 100}%` }}
            />
      </div>
    );
};

export default Textarea;