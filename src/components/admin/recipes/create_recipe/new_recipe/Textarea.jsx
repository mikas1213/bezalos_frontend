import styles from './Textarea.module.css';
import { useEffect, useRef } from 'react';

const Textarea = ({ placeholder, newRecipe, setNewRecipe, className = '' }) => {
    const customClass = [styles.textarea, className].join(' ');
    const textareaRef = useRef(null);
    const maxLength = 750;

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px'; 
        }
    }, [newRecipe.description]);
    
    return (
        <div className={customClass}>
            <div>
                <textarea
                    ref={textareaRef}
                    name='description'
                    placeholder={placeholder}
                    value={newRecipe.description}
                    maxLength={maxLength}
                    onChange={e => setNewRecipe(prev => ({...prev, description: e.target.value}))}
                />
                <div className={styles.counter}>
                    {newRecipe.description?.length || 0} / {maxLength}
                </div>
                
            </div>
            <div 
                className={styles.progressBar}
                style={{ width: `${((newRecipe.description?.length || 0) / maxLength) * 100}%` }}
            />
      </div>
    );
};

export default Textarea;