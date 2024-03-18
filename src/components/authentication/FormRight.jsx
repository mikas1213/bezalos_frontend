import styles from './FormRight.module.css';

const FormRight = ({children}) => {
    return (
        <div className={styles.formRight}>
            {children}
        </div>
    );
};

export default FormRight;