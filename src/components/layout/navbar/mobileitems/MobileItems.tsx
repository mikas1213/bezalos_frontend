import useNavbar from '../hooks/useNavbar';
import { type ItemsProps } from '../types';

import styles from './MobileItems.module.css';

const MobileItems = ({ children, isOpenBurger }: ItemsProps) => {
	const { user_id } = useNavbar('default');
	const mobileItemsClasses = [styles.navMobile, user_id ? styles.items8 : styles.items7, isOpenBurger && styles.show]
		.filter(Boolean)
		.join(' ');

	return (
		<div className={mobileItemsClasses}>
			<ul className={styles.navListMobile}>{children}</ul>
		</div>
	);
};

export default MobileItems;
