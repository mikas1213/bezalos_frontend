import { PROFILIS_NAVBAR_LINKS, type ProfilisNavbarLink } from '../../constants/ProfilisNavbarLinks';
import { ProfilisNavbarItem } from '../ProfilisNavbarItem';

import styles from './ProfilisNavbar.module.scss';

interface ProfilisNavbarProps {
	links?: ProfilisNavbarLink[];
}

/**
 * Profilio skilčių navigacija. Plačiame ekrane – viena „pill“ eilutė centre,
 * siauresniame punktai be horizontalaus slinkimo persikelia į kitą eilutę nuo kairės.
 */
export const ProfilisNavbar = ({ links = PROFILIS_NAVBAR_LINKS }: ProfilisNavbarProps) => {
	return (
		<nav aria-label="Profilio skiltys" className={styles.navbar}>
			<ul className={styles.list}>
				{links.map((link) => (
					<ProfilisNavbarItem key={link.to} to={link.to} label={link.label} end={link.end} />
				))}
			</ul>
		</nav>
	);
};
