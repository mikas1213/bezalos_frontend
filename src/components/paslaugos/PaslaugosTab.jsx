import styles from './PaslaugosTab.module.css';

const PaslaugosTab = ({ currentTab, handleTabChange }) => {
    return (
        <div className={styles.wrapper}>
            <div className={`${styles.tabSwitch} ${styles[(currentTab !== 'naryste' && currentTab !== 'paslaugos') ? 'naryste' : currentTab]} ${styles.textCenter}`}>
                <div className={`${styles.tab} ${currentTab === 'naryste' ? styles.active : ''}`} onClick={() => {handleTabChange('naryste'); }}>Narystė</div>
                <div className={`${styles.tab} ${currentTab === 'paslaugos' ? styles.active : ''}`} onClick={() => { handleTabChange('paslaugos'); }}>Paslaugos</div>
            </div>
        </div>
    );
};

export default PaslaugosTab;
