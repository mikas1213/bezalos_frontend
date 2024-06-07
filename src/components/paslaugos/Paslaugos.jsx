import styles from './Paslaugos.module.css';

const Paslaugos = ({ children }) => {
    return (
        <div className={styles.paslaugos}>
            {children}
        </div>
    );
};

export default Paslaugos;