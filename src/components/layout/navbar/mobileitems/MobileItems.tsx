import styles from './MobileItems.module.css';
import { type ItemsProps } from '../types';
import useNavbar from '../hooks/useNavbar';

const MobileItems = ({ children, isOpenBurger }: ItemsProps) => {

    const { user_id } = useNavbar('default');
    const mobileItemsClasses = [
        styles.navMobile,
        user_id ? styles.items5 : styles.items4,
        isOpenBurger && styles.show
    ].filter(Boolean).join(' ');

    return (
        <div className={mobileItemsClasses}>
            <ul className={styles.navListMobile}>
                { children }
            </ul>
        </div>
    )                
};

export default MobileItems;