import styles from './Textarea.module.css';
import { useEffect, useRef } from 'react';

const   Textarea = ({ placeholder, label, name, maxLength = 200, value, dataValue = '', handleServiceForm }) => {
    const customClass = [styles.textarea, styles[name]].join(' ');
    const textareaRef = useRef(null);
    
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px'; 
        }
    }, [value]);
    
    return (
        <div className={customClass}>
            <div className={styles.inputGroup}>
                <span className={styles.inputLabel}>{label}</span>
                <textarea
                    ref={textareaRef}
                    name={name}
                    placeholder={placeholder}
                    value={value || ''}
                    data-id={dataValue}
                    maxLength={maxLength}
                    onChange={handleServiceForm}
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