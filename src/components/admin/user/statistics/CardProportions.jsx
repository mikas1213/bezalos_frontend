import styles from './CardProportions.module.css';
import { Circle } from 'lucide-react';

const CardProportions = ({ label, newest, diff }) => {
    const trend = diff < 0 ? 'down' : diff > 0 ? 'up' : 'equal';

    return (
        <div className={styles[label]}>
            <div className={styles.row}>
                <Circle className={styles.icon} />
                <span className={styles.label}>{label}:</span>
                <span className={styles.newest}>{newest || '-'}</span>
                <span className={styles.unit}>cm</span>
                <span className={`${styles.diff} ${styles[trend]}`}>
                    <small>(</small>{diff || '-'}<small>)</small>
                </span>
            </div>
        </div>
    );
};

export default CardProportions;