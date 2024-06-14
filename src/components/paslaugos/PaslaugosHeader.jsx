import styles from './PaslaugosHeader.module.css';

const PaslaugosHeader = ({ paragraph }) => {
    return (
        <div className={styles.titleContainer}>
            <div className={styles.title}>
                Keliaukime į pokyčius kartu!
            </div>
            <div className={styles.paragraph}>
                {paragraph}
            </div>
        </div>
    );
};

export default PaslaugosHeader;