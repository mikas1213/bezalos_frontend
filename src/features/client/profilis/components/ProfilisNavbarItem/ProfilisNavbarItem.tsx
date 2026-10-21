import { NavLink } from 'react-router-dom';

import styles from './ProfilisNavbarItem.module.scss';

interface ProfilisNavbarItemProps {
	to: string;
	label: string;
	/** Aktyvus tik tikslus kelias (pvz. `/profilis` neturi būti aktyvus `/profilis/anketa` puslapyje). */
	end?: boolean;
}

/** Vienas profilio navbar'o punktas. Aktyvus punktas gauna `aria-current="page"`. */
export const ProfilisNavbarItem = ({ to, label, end = false }: ProfilisNavbarItemProps) => {
	return (
		<li className={styles.item}>
			<NavLink to={to} end={end} className={({ isActive }) => (isActive ? styles.linkActive : styles.link)}>
				{label}
			</NavLink>
		</li>
	);
};
