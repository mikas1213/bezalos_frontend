import styles from './Textarea.module.css';

const Textarea = ({ name, placeholder, maxLength, formData, handleForm, setErrors, className = '' }) => {
    const customClass = [styles.textarea, className].join(' ');
    
    return (
        <div className={customClass}>
            <div>
                <textarea
                    name={name}
                    placeholder={placeholder}
                    value={formData[name] || ''}
                    onChange={e => {
                        handleForm(e);
                        
                        setErrors(prev => {
                            const updated = {...prev};
                            delete updated[name];    
                            return updated;
                        });
                    }}

                />
                <div className={styles.counter}>
                    {formData[name]?.length || 0} / {maxLength}
                </div>
                
            </div>
            <div 
                className={styles.progressBar}
                style={{ width: `${((formData[name]?.length || 0) / maxLength) * 100}%` }}
            />
      </div>
    );
};

export default Textarea;