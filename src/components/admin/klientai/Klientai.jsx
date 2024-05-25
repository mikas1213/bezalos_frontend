import styles from './Klientai.module.css';

const Klientai = ({ children }) => {
    
    return (
        <div className={styles.klientai}>
            {children}
        </div>
    );
};

export default Klientai;