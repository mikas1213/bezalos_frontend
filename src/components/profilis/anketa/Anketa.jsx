import styles from './Anketa.module.css';

const Anketa = ({ children }) => {
    
    return (
        <div className={styles.anketa}>
            {children}
        </div>
    );
};

export default Anketa;