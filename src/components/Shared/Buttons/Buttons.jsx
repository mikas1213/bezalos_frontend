import styles from './Buttons.module.css';

export const ButtonCancel = ({ 
    label, 
    className = '',
    uploading,
    onClick
}) => {
    return (
        <button 
            disabled={uploading} 
            className={`${styles.button} ${styles.cancelButton} ${className}`}
            onClick={onClick}
        >{ label }</button>
    );
};

export const ButtonSave = ({ 
    label, 
    className = '',
    uploading,
    onClick
}) => {
    return (
        <button 
            disabled={uploading} 
            className={`${styles.button} ${styles.saveButton} ${className}`}
            onClick={onClick}
        >
            { label }
        </button>
    );
};

