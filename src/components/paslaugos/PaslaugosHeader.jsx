import styles from './PaslaugosHeader.module.css';

const PaslaugosHeader = ({ currentTab }) => {
    
    return (
        <div className={styles.titleContainer}>
            <div className={styles.title}>Keliaukime į pokyčius kartu!</div>

            {currentTab === 'naryste' && <div className={styles.paragraph}>Rinktis narystės planą</div>}
        </div>
    );
};

export default PaslaugosHeader;