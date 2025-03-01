import styles from './Card.module.css';
import { TrendingDown, TrendingUp, Circle } from 'lucide-react';

const Card = ({ className, icon, label, diff, newest, oldest, unit, talija = ''}) => {
    const cardClass = `${styles.card} ${styles[className]}`;
    const talija_diff = talija.talija_diff < 0 ? 'down' : talija.talija_diff > 0 ? 'up' : 'equal';
    return (
        <div className={cardClass}>
            <div className={styles.cardHeader}>
                <span className={styles.icon}>{icon}</span>
                <span className={styles.cardLabel}>{label}</span>
                {diff > 0 && <TrendingUp style={{color: 'red'}} />}
                {diff < 0 && <TrendingDown />}
            </div>

            <div className={styles.cardBody}>
                <div className={styles.diff}>
                    {diff}
                    <small>kg</small>
                </div>

                <div className={styles.cardDiff}>
                    <div className={styles.newest}>
                        <span className={styles.label}>Dabar:</span>
                        <span className={styles.value}>{newest}</span>
                        <small>{unit}</small>
                    </div>
                    <div className={styles.oldest}>
                        <span className={styles.label}>Pradžia:</span>
                        <span className={styles.value}>{oldest}</span>
                        <small>{unit}</small>
                    </div>
                </div>
            </div>

            {talija && <div className={styles.cardFooter}>
                <div className={styles.footerContainer}>
                    <Circle className={styles.iconCircle} />
                    <span className={styles.talijaLabel}>Talija:</span>
                    <span className={styles.talijaValue}>
                        {talija.talija_newest}
                        <span className={styles.talijaUnit}>cm</span>
                    </span>
                    <span className={`${styles.talijaDiff} ${styles[talija_diff]}`}>({talija.talija_diff})</span>
                </div>
            </div>}
        </div>
    );
};

export default Card;