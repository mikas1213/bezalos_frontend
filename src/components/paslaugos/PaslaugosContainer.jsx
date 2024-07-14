import styles from './PaslaugosContainer.module.css';

const PaslaugosContainer = ({ children }) => {
    return <div className={styles.paslaugosContainer}>
        {children}
    </div>;
    
};

export default PaslaugosContainer;