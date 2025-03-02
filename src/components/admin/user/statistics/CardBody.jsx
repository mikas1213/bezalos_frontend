import styles from './CardBody.module.css';

const CardBody = ({ diff, unit, newest, oldest }) => {
    const trendColor = diff < 0 ? 'down' : diff > 0 ? 'up' : 'equal';

    return (
        <>
            <div className={styles.cardBody}>
                <div className={styles.diff}>
                    <span className={`${styles.value} ${styles[trendColor]}`}>{diff || '-'}</span>
                    <span className={styles.unit}>{unit}</span>
                </div> 
                <div className={styles.records}>
                    <div className={styles.newest}>
                        <span className={styles.label}>Dabar:</span>
                        <span className={styles.value}>{newest || '-'}</span>
                        <span className={styles.unit}>{unit}</span>
                    </div>
                    <div className={styles.oldest}>
                        <span className={styles.label}>Pradžioje:</span>
                        <span className={styles.value}>{oldest || '-'}</span>
                        <span className={styles.unit}>{unit}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardBody;