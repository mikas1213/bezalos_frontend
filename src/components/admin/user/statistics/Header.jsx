import styles from './Header.module.css';
import { Divider } from '../../nutrition_plans/Divider';
import { User, Calendar } from 'lucide-react';


const renderHeaderItem = (icon, label, value) => {
    
    return  <div className={styles.headerItem}>
        {icon}
        <div className={styles.userInfo}>
            <span className={styles.label}>{label}</span>
            <span className={styles.value}>{value}</span>
        </div>
    </div>
};

const Header = ({ apimtys, name, email }) => {
    
    const date_newest = new Date(apimtys.date_newest);
    const date_oldest = new Date(apimtys.date_oldest);
    
    const newest = apimtys.date_newest ? date_newest.toLocaleDateString('lt-LT') : '-';
    const olders = apimtys.date_oldest ? date_oldest.toLocaleDateString('lt-LT') : '-';
    return (
        <div className={styles.header}>
            { renderHeaderItem(<User className={styles.iconUser} />, name, email) }
            <Divider />
            { renderHeaderItem(<Calendar className={styles.iconCalendarStart} />, 'Pradžia', olders) }
            <Divider />
            { renderHeaderItem(<Calendar className={styles.iconCalendarEnd} />, 'Pabaiga', newest) }
        </div>
    );
};

export default Header;