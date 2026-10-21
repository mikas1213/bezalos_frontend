import { NavLink } from 'react-router-dom';

import styles from './ListItem.module.scss';

interface ListItemProps {
	to: string;
	label: string;
	/** Aktyvus tik tikslus kelias (pvz. `/profilis` neturi būti aktyvus `/profilis/anketa` puslapyje). */
	end?: boolean;
}

/** Vienas profilio subnav punktas. Aktyvus punktas gauna `aria-current="page"`. */
export const ListItem = ({ to, label, end = false }: ListItemProps) => {
	return (
		<li className={styles.item}>
			<NavLink to={to} end={end} className={({ isActive }) => (isActive ? styles.linkActive : styles.link)}>
				{label}
			</NavLink>
		</li>
	);
};
