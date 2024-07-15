import styles from './PirkimoTaisyklesFooter.module.css';

const PirkimoTaisyklesFooter = () => {
    return (
        <div className={styles.pirkimoTaisyklesFooter}>
            <div className={styles.footerDivider}></div>
                <div className={styles.footerBottom}>
                    <span className={styles.copy}>&copy;</span>
                    <span>2024 Be žalos</span>
                </div>
        </div>
    );
};

export default PirkimoTaisyklesFooter;