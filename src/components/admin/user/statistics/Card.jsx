import { Ghost,LayoutList, Ruler, Weight } from 'lucide-react';

import styles from './Card.module.css';

const icons = {
    'SVORIS': <Weight className={styles.iconWeight} />,
    'APIMČIŲ SUMA': <Ruler className={styles.iconRuler} />, 
    'APIMTYS': <LayoutList className={styles.iconList} />
};

const Card = ({ label, isSumFake, children }) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                {icons[label]}
                <span className={styles.cardLabel}>{label}</span>
                {label === 'APIMČIŲ SUMA' && isSumFake && <Ghost className={styles.iconWrongSum} />}
            </div>
            {children}
        </div>
    );
};

export default Card;