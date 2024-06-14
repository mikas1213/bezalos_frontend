import styles from "./PaslaugosTab.module.css";

const PaslaugosTab = ({ side, setSide }) => {
    return (
        <div className={styles.wrapper}>
            <div className={`${styles.tabSwitch} ${styles[side]} ${styles.textCenter}`}>
                <div className={`${styles.tab} ${side === 'naryste' ? styles.active : ''}`} onClick={() => setSide('naryste')}>Narystė</div>
                <div className={`${styles.tab} ${side === 'paslaugos' ? styles.active : ''}`} onClick={() => setSide('paslaugos')}>Paslaugos</div>
            </div>
        </div>
    );
};

export default PaslaugosTab;
