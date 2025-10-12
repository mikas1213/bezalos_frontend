import styles from './Hamburger.module.css';
import { Cluster } from '../../../Shared';
import { type HamburgerProps } from '../types';

const Hamburger = ({ page, isScroll, isOpenBurger, setIsOpenBurger }: HamburgerProps) => {

    const hamburgerClasses = [
        styles.hamburger,
        isOpenBurger && styles.open,
        (page === 'home' && !isScroll) && styles.invertColor
    ].filter(Boolean).join(' ');

	return (
		<Cluster 
            justify='center'
            align='flex-start'
			className={hamburgerClasses}
			onClick={() => setIsOpenBurger((on) => !on)}
		>
			<div className={styles.lineTop}></div>
			<div className={styles.lineMiddle}></div>
			<div className={styles.lineBottom}></div>
		</Cluster>
	);
};

export default Hamburger;
