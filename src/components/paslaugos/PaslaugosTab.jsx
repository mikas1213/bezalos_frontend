import styles from './PaslaugosTab.module.css';

const PaslaugosTab = ({ side, setSide, handleTabChange }) => {
    return (
        <div className={styles.wrapper}>
            <div className={`${styles.tabSwitch} ${styles[(side !== 'naryste' && side !== 'paslaugos') ? 'naryste' : side]} ${styles.textCenter}`}>
                <div className={`${styles.tab} ${side === 'naryste' ? styles.active : ''}`} onClick={() => {setSide('naryste'); handleTabChange('naryste'); }}>Narystė</div>
                <div className={`${styles.tab} ${side === 'paslaugos' ? styles.active : ''}`} onClick={() => {setSide('paslaugos'); handleTabChange('paslaugos'); }}>Paslaugos</div>
            </div>
        </div>
    );
};

export default PaslaugosTab;
